---
title: Skyporten - Maskinporten for deling av skyressurser
description:  Skyporten - Maskinporten for deling av skyressurser
summary: 'Her finner du en beskrivelse av Skyporten og hvordan den kan brukes'

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_skyporten
---

---
* TOC
{:toc}

## Hva er Skyporten?
  
Skyporten lar deg bruke Maskinporten for å dele tilgang til skyressurser.

![Skyporten komponenter]({{site.baseurl}}/images/maskinporten/skyporten_komponenter.png)

Det er en metode som setter sammen

* Maskinporten som identity provider
* Identity federation-hyllevare hos skyleverandørene
* Tilgangsstyringsmønstre for å spesifisere tilgang til ressurser i skyen

Kortversjonen er at du står fritt til å **dele hva du vil fra din sky til et organisasjonnummer med minimal konfigurasjon**.

Du kan altså bruke Maskinporten og samarbeidsportalen som i dag for å tilgangsstyre skyressurser som f.eks. en BigQuery-tabell, en S3-filbøtte, eller en strøm.

Konsument-eksempel i GCP:

``````bash
# Create login credentials with a maskinporten client token
$ gcloud iam workload-identity-pools create-cred-config $PROVIDER_FULL_IDENTIFIER --service-account=$SAEMAIL --credential-source-file=$MASKINPORTEN_TOKEN_FILE --output-file=credentials.json
Created credential configuration file [credentials.json].

# Log into gcloud with the maskinporten token
$ gcloud auth login --cred-file=credentials.json

Authenticated with external account credentials for: [skyportenstorageconsumer@skyporten-poc.iam.gserviceaccount.com].
Your current project is [skyporten-poc].

# Consume file from storage bucket
$ gcloud storage ls gs://$BUCKET
gs://skyportenbucket/foo_remote.txt

$ gcloud storage cp gs://$BUCKET/foo_remote.txt foo_local.txt
Copying gs://skyportenbucket/foo_remote.txt to file://foo_local.txt
  Completed files 1/1 | 4.0B/4.0B
``````

Skyporten er spesielt nyttig for deling av skyressurser ut av eller mellom skyleverandører.

## Kan jeg ta det i bruk?

Ja. Skyporten som konsept testes ut av Digitaliseringdirektoratet og [Tverrsektorielt datasamarbeid i samferdselssektoren](http://samferdselsdata.no/) og sammen med utvalgte tilbydere og konsumenter. Det dekkes ennå ikke av SLA eller, og piloten må evalueres for videreføring.  All kontakt og bruk øker sjansen for at dette videreføres, [så ta kontakt med oss](#kontakt).

## Hvordan kan jeg ta det i bruk?

### Well-known meta-data

Metadata om Skyporten er tilgjengelig på følgende .well-known-endepunkt.

|Miljø| Issuer                             |URL|
|-|------------------------------------|-|
|TEST| `https://test.sky.maskinporten.no` | [https://test.sky.maskinporten.no/.well-known/openid-configuration](https://test.sky.maskinporten.no/.well-known/openid-configuration)|
|PROD| `https://sky.maskinporten.no`              | [https://sky.maskinporten.no/.well-known/openid-configuration](https://sky.maskinporten.no/.well-known/openid-configuration)|

Merk: om du bruker Maskinporten i dag, har Maskinporten trailing slash i issuer, men dette er pt ikke tilfelle i Skyporten pga forskjellige leverandørimplementasjoner.

### Tilgang til Skyporten for tilbydere

Skyporten bruker Maskinporten, og du må derfor først [komme i gang med Maskinporten som API-tilbyder]({{site.baseurl}}/docs/Maskinporten/maskinporten_guide_apitilbyder).

Se også guidene under for oppsett knyttet til hver enkelt skyleverandør.

### Tilgang til Skyporten  for konsumenter

Skyporten bruker Maskinporten, så for å hente noe delt via Skyporten, trenger du også en integrasjon (oauth2-client). 
Et godt alternativ er å benyttet [forenklet onboarding til Maskinporten med nøkler](https://onboarding.maskinporten.no/guide). 
Mer utfyllende [dokumentasjon finnes her]({{site.baseurl}}/docs/Maskinporten/maskinporten_guide_apikonsument).

Det finnes flere kode-eksempler som kan hjelpe deg i gang med å generere accesstokens til Maskinporten:

* [Digdirs eget java-eksempel](https://github.com/felleslosninger/jwt-grant-generator)
* [node-eksempel](https://github.com/entur/exploratory-maskinporten-token)
* [Nav sin Maskinporten-client](https://github.com/navikt/maskinporten-client)

[Ta kontakt med oss]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#kontakt) om du vil ha hjelp til å sette i gang.


## Hvilke skyleverandør må jeg ha som tilbyder?

### GCP

Alt ok! Tilgang med differensiert på orgnummer og/eller scope støttes. Se [guide her]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten_gcp).

### Azure

Alt ok! Tilgang med orgnr og scopes støttes, ved at skyporten legger på scope på slutten av sub-feltet i tokenet. Se [guide her]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten_azure).

### AWS

Alt ok! Tilgang med orgnr og scopes støttes, ved at skyporten legger på scope på slutten av sub-feltet i tokenet. Se guide for konsument og tilbyder [her]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten_aws).

### Annet

Dersom du har en leverandør som støtter workload identity federation, kan det være nok til at du også kan dele gjennom Skyporten. Ta gjerne [kontakt med oss](#kontakt) for å komme i gang.

## Arkitektur

Sentrale aspekter av arkitekturen:

* Gir tilgang til skyressurser basert på konsument sitt organisasjonsnummer
* Bruker nasjonal felleskomponent (Maskinporten) for autorisert tilgang
* Sikkerheten og infrastruktur driftes fullstendig av DigDir og skyleverandør
* Muliggjør effektiv deling av store analytisk datasett
* Hos Skyleverandøren benyttes OIDC-basert ID-federering
* Konsument gis ikke en epost eller bruker i din leverandørs skykonto
* Standard-basert (OIDC/oauth2)
* Ingen nøkler eller andre hemmeligheter må deles fra dataleverandørens skykonto


### Autoriseringsflyt for konsument

![Skyporten autoriseringsflyt]({{site.baseurl}}/images/maskinporten/skyporten_autorization_flow.png)

### Eksempel-kode for Token generering

Du kan se [eksempel-kode for token-generering i node.js her](https://github.com/entur/exploratory-maskinporten-token/).

## Kontakt

Vi oppfordrer alle som er interesserte til snakke med oss på [Slack](https://offentlig-paas-no.slack.com/archives/C050R0TRU2Z) eller mail kontakt@samferdselsdata.no dersom du er interessert eller har spørsmål.
