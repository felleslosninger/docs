---
title: Skyporten med GCP - Maskinporten med for deling av skyressurser
description:  Skyporten med GCP - Maskinporten for deling av skyressurser
summary: 'Oppskrift for å benytte Skyporten med GCP'

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_skyporten
---

---
* TOC
{:toc}

## For deg som skal tilby via GCP

På GCP er det [workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation) som brukes for Skyporten sin Oauth2/OIDC-integrasjon.

Nå følger en oppskrift på hvordan det kan gjøres via gcloud. [Ta kontakt med oss]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#kontakt) om du vil ha hjelp til å sette i gang.


### Logg inn i gcloud

Her må du logge inn med den skybrukeren din organisasjon har gitt deg. Den bør ha brede nok privilegier ([roller](https://cloud.google.com/iam/docs/understanding-roles#workload-identity-pools-roles), policies)
til å kunne utføre oppgavene under.

```
gcloud auth login
```

### Sett Google project

Dette er navnet på GCP prosjektet du ønsker å sette opp skyporten-tilgangen i.

```
export GCP_PROJ=<dittprosjekt>
gcloud config set project "$GCP_PROJ"
```


### Opprett en ny workload identity pool

Det er denne som benyttes for å få tilgang med Maskinporten ved hjelp av OIDC.

```
# Du kan gjerne bytte ut navnet skyportenpoc
export WORKLOAD_POOL_ID=skyportenpoc

gcloud iam workload-identity-pools create "$WORKLOAD_POOL_ID" \
    --location="global" \
    --description="pool for skyporten poc" \
    --display-name="skyportenpoc try"
```

### Definer OIDC identity pool provider

Legg merke til at vi her spesifiserer `REQUIRED_AUDIENCE="https://skyporten.<mydomain>"`. Et spesifisert audience er påkrevd
av GCP og dermed anbefaler vi å velge en skyporten-prefiks til ditt eget domene. Dette behover ikke å være et fungerende
domene.

Dette tvinger konsumenter til å spesfisere at Maskinporten-tokenet skal ha `"https://skyporten.<mydomain>"`. Dette spesifiseres
i `resource` når konsumenten bygger opp sin [JWT-grant](https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant#request).

```
export REQUIRED_AUDIENCE="https://skyporten.<mydomain>"
export PROVIDER_ID=skyportenprovider

gcloud iam workload-identity-pools providers create-oidc $PROVIDER_ID \
    --location="global" \
    --workload-identity-pool=$WORKLOAD_POOL_ID \
    --attribute-mapping="attribute.maskinportenscope"="assertion.scope","google.subject"="assertion.consumer.ID","attribute.clientaccess"="\"client::\" + assertion.consumer.ID + \"::\" + assertion.scope" \
    --issuer-uri="https://test.sky.maskinporten.no" \
    --allowed-audiences=$REQUIRED_AUDIENCE \
    --description="OIDC identity pool provider for Maskinporten"
```

Definisjonene under `--attribute-mapping` mapper over til følgende eksempler. `991825827` er her organisasjonsnummer til
konsumentorganisasjon. Disse kan brukes i til policies, for å tildele service account til enten et organisasjonsnummer,
et scope, eller kombinasjonen av organisasjon og scope. Se under [policy binding]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten_gcp#create-policy-binding)
for eksempler

```
google.subject=0192:991825827
attribute.maskinportenscope=entur:skyporten.demo
attribute.clientaccessclient::0192:991825827::entur:skyporten.demo
```

### Opprett en service account som skal benyttes i poolen

```
export SERVICE_ACC='skyportenstorageconsumer'
gcloud iam service-accounts create $SERVICE_ACC \
    --description="Skyporten storage consumer" \
    --display-name="skyportenstoragesa"
```

Extract the email from the created SA

```
gcloud iam service-accounts list
skyportenstoragesa                         skyportenstorageconsumer@[project_id].iam.gserviceaccount.com        False

export SAEMAIL="skyportenstorageconsumer@[project_id].iam.gserviceaccount.com"
```

#### Create policy binding

Hent prosjektnummeret for prosjektet til workload identity poolen

```
# find proj num in projects list
gcloud projects list

# Export project number
export PROJNUM=[ number ]
```

Knytt sammen scope og organisasjonsnunmmer fra federert pålogging til service account og sett rollen `roles/iam.workloadIdentityUser`
som gjør det mulig å *impersonate* service account.

I eksemplet under gies tilgangen til organisasjonsnummer definert i `MASKINPORTENCLIENTID` og scope i `MASKINPORTENSCOPE`.

```
export MASKINPORTENCLIENTID="0192:991825827"
export MASKINPORTENSCOPE="entur:skyporten.demo"
gcloud iam service-accounts add-iam-policy-binding $SAEMAIL \
    --member="principalSet://iam.googleapis.com/projects/$PROJNUM/locations/global/workloadIdentityPools/$WORKLOAD_POOL_ID/attribute.clientaccess/client::$MASKINPORTENCLIENTID::$MASKINPORTENSCOPE" \
    --role="roles/iam.workloadIdentityUser"
```

Dette er det mest fingranulerte tilgangsstyringen i Skyporten, hvor man får en service account per konsument og per scope.
Det gir mulighet til å trekke tilbake tilganger fra konsumenter som misbruker, uten å påvirke andre konsumenter.

Alternativer for definisjoner av principal set:

| Attribute | Mapping                                             | Beskrivelse                                                                                                   |
|-----------|-----------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| attribute.clientaccess | `client::$MASKINPORTENCLIENTID::$MASKINPORTENSCOPE` | Gir tilgang til service account for akkurat en bestemt organisasjon når de identifiserer seg med dette scopet |   
| attribute.maskinportenscope | `$MASKINPORTENSCOPE`                                  | Gir tilgang til service account for alle organisasjoner når de identifiserer seg med dette scopet             |
| google.subject  | `$MASKINPORTENCLIENTID`                               | Gir tilgang til service account for en bestemt organisasjon uavhengig av scopet som sendes                    |


### Definer ressursen som skal deles

For å vise hvordan man kan dele en skyressurss, viser vi videre her med en nyopprettet bøtte.
Dersom du allerede har opprettet ressursen som skal deles, kan du hoppe over denne.

```
export BUCKET="skyportenbucket2"
gcloud storage buckets create gs://$BUCKET --location="EUROPE-WEST4"
```

Og laster opp en fil for å demonstrere

```
echo "bar" > foo.txt
gcloud storage cp foo.txt gs://$BUCKET/foo_remote.txt
Copying file://foo.txt to gs://skyportenbucket/foo_remote.txt
  Completed files 1/1 | 4.0B/4.0B

gcloud storage ls gs://$BUCKET
gs://skyportenbucket/foo_remote.txt
```

### Knytt service account sammen med ressursen som skal deles

Her gir vi service-accounten tilgang til ressursen som skal deles. Dersom du skal dele noe eksisterende trenger du kun å
gjøre dette steget for at service account skal ha rett rolle eller permission på den aktuelle ressurssen.

Eksempelet her viser at vi gir den service accounten rett rolle for tilgang til den nyopprettede bøtta.

```
gcloud storage buckets add-iam-policy-binding gs://$BUCKET --member=serviceAccount:$SAEMAIL --role=roles/storage.objectViewer

```

### Enable IAM Service Account Credentials API

For at konsumenter skal kunne bruke impersonation, må IAM Service Account Credentials API enables for prosjektet

```
echo "https://console.developers.google.com/apis/api/iamcredentials.googleapis.com/overview?project=${PROJNUM}"
```

## For deg som skal konsumere fra GCP

### Oppsett

Prosjektet krever at man har et ekte Maskinporten-token mot det rette miljøet.
[Her er informasjon om hvordan du kommer i gang med Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#tilgang-til-maskinporten).

[Her er et node.js eksempel på token-generering for skyporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#eksempel-kode-for-token-generering).

### Autentisering med Maskinporten-token med gcloud

Enten kan du få en `credentials.json`-fil som er output fra `glcloud iam workload-identity-pools create-cred-config` fra tilbyder,
eller du kan lage en selv gitt informasjon om følgende variable fra tilbyder

```
export PROJNUM=[number]
export SAEMAIL="<service account email>"
export WORKLOAD_POOL_ID="<pool id>"
export PROVIDER_ID="<provider id>"

export PROVIDER_FULL_IDENTIFIER=projects/${PROJNUM}/locations/global/workloadIdentityPools/${WORKLOAD_POOL_ID}/providers/${PROVIDER_ID}

export MASKINPORTEN_TOKEN_FILE=token.json
gcloud iam workload-identity-pools create-cred-config $PROVIDER_FULL_IDENTIFIER --service-account=$SAEMAIL --credential-source-type=json --credential-source-field-name=access_token --credential-source-file=$MASKINPORTEN_TOKEN_FILE --output-file=credentials.json
```

Nå vil credentials json se ut som eksempelt her

```json
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/projects/***/locations/global/workloadIdentityPools/***/providers/***",
  "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
  "token_url": "https://sts.googleapis.com/v1/token",
  "credential_source": {
    "file": "token.json",
    "format": {
      "type": "json",
      "subject_token_field_name": "access_token"
    }
  },
  "service_account_impersonation_url": "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/***@***.iam.gserviceaccount.com:generateAccessToken"
}
```

Nå må fila `MASKINPORTEN_TOKEN_FILE` inneholde kun json-responsen fra Maskinporten med selve tokenet i `access_token`. Dette kan du se eksempler på i
[disse kode-eksemplene]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#kode-eksempler-for-maskinporten).

Dersom du har en annen tekstfil med kun accesstoken i kan du [endre parameterne](https://cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/create-cred-config) til `create-cred-config`

Pålogging med gcloud vil da se ut som følger

``````bash
gcloud auth login --cred-file=credentials.json
Authenticated with external account credentials for: [skyportenstorageconsumer@external-test-foo-333333.iam.gserviceaccount.com].
Your current project is [external-test-foo-333333]
``````

Og uthenting av eksempelfil

``````bash
gcloud storage ls gs://$BUCKET
gs://[bucket name]/foo_remote.txt

gcloud storage cp gs://$BUCKET/foo_remote.txt foo_local.txt
Copying gs://[bucket name]/foo_remote.txt to file://foo_local.txt
  Completed files 1/1 | 4.0B/4.0B
``````

### Eksempel for konsument

Dersom du ønsker å teste ut å konsumere fra en filbøtte, finnes det et åpent scope i Maskinporten sitt test-miljø som du
kan benytte.

Scopet heter `entur:skyporten:demo` og er et offentlig scope som ikke trenger noen form for tildeling.

Required audience i Maskinporten-tokenet er `https://skyporten.entur.org`. `credentials.json` ligger på [Slack](https://offentlig-paas-no.slack.com/archives/C050R0TRU2Z/p1696852093603749)
og forventer at fila token.json finnes og inneholder Maskinporten-token i atributtet `access_token`.

Kjør deretter og velkommen!
🎉
```bash
export BUCKET="skyporten-public-demo"
gcloud auth login --cred-file=credentials.json
gcloud storage ls gs://$BUCKET
gcloud storage cp gs://$BUCKET/velkommen.txt velkommen_local.txt
```

## Feilsøking

### Invalid JWT claim

Dette kan skyldes avsluttende skråstrek i `audience`.

Når JWT-token genereres med audience `https://test.sky.maskinporten.no`, så må det gjøres uten avsluttende skråstrek (trailing slash).

Hvis spørringen mot Maskinporten har trailing slash i Token for `aud` verdien vil man få feilen:

``````json
{
    "message": "Http response code: 400, url: 'https://test.sky.maskinporten.no/token', message: '{\"error\": \"invalid grant\",\"error description\":\"Invalid assertion. Client authentication failed.
Invalid JWT claim aud. (trace_id: 5d5d5d5d5d5d5d5d5d5d5d5d5d5d5d)\"}'",
``````

Løsningen er altså å fjerne avsluttende skråstrek i audience når man genererer JWT-token.