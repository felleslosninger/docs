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

export ANSATTPORTEN_URI=https://test.ansattporten.no


```

Sett opp en klient i samarbeidsportalen i rett miljø: https://selvbetjening-samarbeid-ver2.difi.no/integrations
og bruk redirect url som printes over. Type er `client_secret_basic`.

![opprettet klient](/images/idporten/oidc/ansattporten-allmennsky-oppsett.png)

```
export ANSATTPORTEN_CLIENT_ID=<verdi fra nyopprettet client>
export ANSATTPORTEN_SECRET=<verdi fra nyopprettet client secret>

```
Se [integrasjonsguide](ansattporten_guide.html) for issuer i andre miljøer.

```
# Create OIDC provider to let Ansattporten be part of the Workforce Pool

gcloud iam workforce-pools providers create-oidc $WORKFORCE_PROVIDER_ID \
	--workforce-pool=$WORKFORCE_POOL_ID \
	--display-name="GCP Ansattporten OIDC provider" \
	--description="GCP Ansattporten OIDC provider" \
	--issuer-uri="$ANSATTPORTEN_URI" \
	--client-id="$ANSATTPORTEN_CLIENT_ID" \
	--client-secret-value="$ANSATTPORTEN_SECRET" \
	--web-sso-response-type="code" \
	--web-sso-assertion-claims-behavior="only-id-token-claims" \
	--attribute-mapping="attribute.ansattportenscope"="assertion.scope","google.subject"="assertion.sub" \
	--location=global
```


#### Gi tilgang til brukere innlogget via Ansattporten

Man kan spesifisere rettigheter til federerte brukere ved å referere til `principalSet` i IAM policies. [Se dokumentasjon](https://cloud.google.com/iam/docs/configuring-workforce-identity-federation). 

Dette kan f.eks. gjøres med gcloud, eller direkte i BigQuery-grensesnittet.

Med gcloud kan prosjekt-tilgang f.eks. gjøres slik:

``````bash
gcloud projects add-iam-policy-binding my-project \
    --role="roles/storage.objectViewer" \
    --member="principalSet://iam.googleapis.com/locations/global/workforcePools/$WORKFORCE_POOL_ID/*"
``````

### I Azure
Testet ut med PowerPages og PowerBI-embedded.

### I AWS

Ikke påbegynt
