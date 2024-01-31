---
title: Ansattporten som innlogging til skyen
description: Ansattporten er en kopi av ID-porten men der funksjonaliteten er tilpasset innlogging i ansatt/representasjonskontekst.

sidebar: oidc
product: ID-porten
redirect_from: /ansattporten_allmennsky
---

Sammen med tverrsektorielt datasamarbeid foregår det en pilot med uttesting av Ansattporten 
som innlogging til skyplatformer. Målet er å kunne dele data ut av egen virksomhet ved å benytte de 
nasjonale tillittsløsningene til å bekrefte identitet og ansettelsesforhold. Ansettelsesforholdet bestemmes av 
roller i Altinn. 

## Overordna beskrivelse

Se under for status og oppsett hos den aktuelle skyleverandøren. 

PT er ikke valg av organisasjon du ønsker å representer med i flyten hos noen av skyleverandørene, men dette ønsker vi 
å få på plass så snart som mulig. Dette forutsetter endringer i Ansattporten for å at leverandører som ikke støtter
[Rich Authorization Requests (RAR) Proposed Standard](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) skal kunne være 
fremoverkompatible.

### I Google Cloud Platform

Produktet i bruk heter *workforce indentity federation* og er [kostnadsfritt](https://cloud.google.com/workforce-identity-federation#pricing) i seg selv.
Tilgang blir gitt både til en [federert versjon av google cloud console](https://cloud.google.com/iam/docs/workforce-console-sso) 
og [programmatisk tilgang via api eller cli](https://cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials). 
Begge disse krever informasjon om `workforce_pool_provider_id`, for eksempel `locations/global/workforcePools/myorg-ansattportenpool/providers/myorg-ansattportenprovider` 

#### Oppsett av workforce indentity federation

Oppsett av provider pool og provider skjer på følgende måte

```
# gcp org
export ORG_ID=123456789012

gcloud iam workforce-pools list --location=global --organization=$ORG_ID

# Create workforce pool

export WORKFORCE_POOL_ID=ansattportenpoc

# Let session last two hours
export SESSION_DURATION="7200s"

gcloud iam workforce-pools create $WORKFORCE_POOL_ID \
	--organization=$ORG_ID \
	--description="Ansattporten workforce pool poc" \
	--session-duration=$SESSION_DURATION \
	--location=global

export WORKFORCE_PROVIDER_ID=ansattportenpocprovider

export WORKFORCE_PROVIDER_NAME=locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$WORKFORCE_PROVIDER_ID

echo "$WORKFORCE_PROVIDER_NAME"


echo "Redirect url will be:"
echo "https://auth.cloud.google/signin-callback/$WORKFORCE_PROVIDER_NAME"

export CLOUD_SIGNIN_URL="https://auth.cloud.google/signin/locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/$WORKFORCE_PROVIDER_NAME?continueUrl=https://console.cloud.google/"

echo "Cloud sign in url will be:"
echo "$CLOUD_SIGNIN_URL"

# Inntil ansattporten-integrasjon er produksjonssatt hos DigDir kan man benytt testmiljøet ansattporten.dev:
export ANSATTPORTEN_URI=https://ansattporten.dev
```

Sett opp en klient i samarbeidsportalen i rett miljø: https://selvbetjening-samarbeid-ver2.difi.no/integrations
og bruk redirect url som printes over. Type er `client_secret_basic`.

![opprettet klient](/images/idporten/oidc/ansattporten-allmennsky-oppsett.png)

```
export ANSATTPORTEN_CLIENT_ID=<verdi fra nyopprettet client>
export ANSATTPORTEN_SECRET=<verdi fra nyopprettet client secret>

```
Se [integrasjonsguide](ansattporten_guide.html) for issuer i andre miljøer.

#### Begrens til login fra kun en spesifikk organisasjon

Tilgang til innlogging kan begrensens med ```attribute-condition```.
Dette er valgfritt, men kan være fornuftig å begrense tilgangen.
Alternativt kan man benytte attributten orgno definert (`attribute.orgno`) under i IAM rolle-styring.

```
export CLIENTORGNO="0192:311046349"
```

#### Lag OIDC provider for å Ansattporten være en del av Workforce Pool (`ansattportenpoc`)

Scope "ansattporten:sjef", benyttet i web-sso-additional-scopes under, trigger orgvalg hos ansattporten.
Kun organisasjoner hvor du er Altinn hovedadminstrator vil vises i organisajonsvelger. DigDir vil kunne
raffinere denne funksjonaliteten etterhvert, men er slik i den nåværende testfasen.

```

gcloud iam workforce-pools providers create-oidc $WORKFORCE_PROVIDER_ID \
	--workforce-pool=$WORKFORCE_POOL_ID \
	--display-name="GCP Ansattporten OIDC provider" \
	--description="GCP Ansattporten OIDC provider" \
	--issuer-uri="$ANSATTPORTEN_URI" \
	--client-id="$ANSATTPORTEN_CLIENT_ID" \
	--client-secret-value="$ANSATTPORTEN_SECRET" \
	--web-sso-response-type="code" \
	--web-sso-assertion-claims-behavior="only-id-token-claims" \
	--web-sso-additional-scopes="ansattporten:sjef" \ # trigger organisasjonsvelger
	--attribute-mapping=google.display_name="assertion.name","google.subject"="assertion.sub",attribute.orgno="assertion.authorization_details[0].reportees[0].ID" \
	--attribute-condition="attribute.orgno=='$CLIENTORGNO'" \ # begrenser tilgang til et spesifikt organisasjonsnummer
	--location=global
```


#### Eksempel på innhold i en id-token fra ansattporten

Feltene i tokenet kan benyttes til attribute-mapping og attribute-condition.

``````json
{
  "sub" : "A_-1aaa....",
  "amr" : [ "TestID" ],
  "iss" : "https://ansattporten.dev",
  "pid" : "10850199405",
  "locale" : "nb",
  "nonce" : "A_Bcd1.....",
  "aud" : "testclient_ansattporten_openshift_azure",
  "acr" : "substantial",
  "authorization_details" : [ {
    "resource" : "urn:altinn:resource:2480:40",
    "type" : "ansattporten:altinn:service",
    "resource_name" : "Produkter og tjenester fra Brønnøysundregistrene",
    "reportees" : [ {
      "Rights" : [ "Read", "ArchiveDelete", "ArchiveRead" ],
      "Authority" : "iso6523-actorid-upis",
      "ID" : "0192:311046349",
      "Name" : "EKTE TOPP TIGER AS"
    } ]
  } ],
  "auth_time" : 1706617032,
  "name" : "NEPE SKRAVLETE",
  "exp" : 1706617159,
  "iat" : 1706617039,
  "jti" : "61pDTNwdOy0"
}

``````

`pid` er personnummer. Om det er ansvarlig å benytte dette i google.subject må vurderes av tilbyderen.
Vi har valgt å benytte `sub` for å unngå at personnummer flyter rundt i GCP.


#### Gi tilgang til brukere innlogget via Ansattporten

Man kan spesifisere rettigheter til federerte brukere ved å referere til `principalSet` i IAM policies. [Se dokumentasjon](https://cloud.google.com/iam/docs/configuring-workforce-identity-federation).

Dette kan f.eks. gjøres med gcloud, eller direkte i BigQuery-grensesnittet.

Med gcloud kan prosjekt-tilgang f.eks. gjøres slik:

``````bash
gcloud projects add-iam-policy-binding my-project \
    --role="roles/storage.objectViewer" \
    --member="principalSet://iam.googleapis.com/locations/global/workforcePools/$WORKFORCE_POOL_ID/*"
``````

#### Ferdig innlogget bruker med synlig navn

Her er et screenshot som viser bruker ferdig innlogget i google cloud (`https://console.cloud.google`):

![Ansattporten innlogget i GCP]({{site.baseurl}}/images/ansattporten/ansattporten_gcp_logged_in.png)

### I Azure
Testet ut med PowerPages og PowerBI-embedded.

### I AWS

Ikke påbegynt
