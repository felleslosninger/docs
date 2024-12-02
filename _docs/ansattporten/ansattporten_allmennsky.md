---
title: Pilot - Ansattporten som innlogging til skyen
description: Ansattporten er en kopi av ID-porten men der funksjonaliteten er tilpasset innlogging i ansatt/representasjonskontekst.

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_allmennsky
---

Sammen med tverrsektorielt datasamarbeid foregår det en pilot med uttesting av Ansattporten 
som innlogging til skyplatformer. Målet er å kunne dele data ut av egen virksomhet ved å benytte de 
nasjonale tillittsløsningene til å bekrefte identitet og ansettelsesforhold. Ansettelsesforholdet bestemmes av 
roller i Altinn. 

Se under for status og oppsett hos den aktuelle skyleverandøren. 

| Platform                                                                                                     | Status juni20204                                                                                                    |
|--------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| [Google Cloud Platform]({{site.baseurl}}/docs/idporten/oidc/ansattporten_allmennsky#i-google-cloud-platform) | Støttet med [enkelte produktbegrensninger](https://cloud.google.com/iam/docs/federated-identity-supported-services) |
| [Azure]({{site.baseurl}}/docs/idporten/oidc/ansattporten_allmennsky#i-azure)                                 | Ikke støttet                                                                                                        |
| [Databricks/Azure]({{site.baseurl}}/docs/idporten/oidc/ansattporten_allmennsky#databricks)                   | Ikke støttet                                                                                                        |
| [AWS]({{site.baseurl}}/docs/idporten/oidc/ansattporten_allmennsky#i-aws)                                     | Ikke testet                                                                                                         |

PT er ikke valg av organisasjon du ønsker å representer med i flyten hos noen av skyleverandørene, men dette ønsker vi 
å få på plass så snart som mulig. Dette forutsetter endringer i Ansattporten for å at leverandører som ikke støtter
[Rich Authorization Requests (RAR) Proposed Standard](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) skal kunne være 
fremoverkompatible.

## I Google Cloud Platform

Produktet i bruk heter *workforce indentity federation* og er [kostnadsfritt](https://cloud.google.com/workforce-identity-federation#pricing) i seg selv.
Tilgang blir gitt både til en [federert versjon av google cloud console](https://cloud.google.com/iam/docs/workforce-console-sso) 
og [programmatisk tilgang via api eller cli](https://cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials). 
Begge disse krever informasjon om `workforce_pool_provider_id`, for eksempel `locations/global/workforcePools/myorg-ansattportenpool/providers/myorg-ansattportenprovider` 

### Oppsett av workforce indentity federation

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

export CLOUD_SIGNIN_URL="https://auth.cloud.google/signin/$WORKFORCE_PROVIDER_NAME?continueUrl=https://console.cloud.google/"

echo "Cloud sign in url will be:"
echo "$CLOUD_SIGNIN_URL"

# Inntil ansattporten-integrasjon er produksjonssatt hos DigDir kan man benytt testmiljøet ansattporten.dev:
export ANSATTPORTEN_URI=https://ansattporten.dev
```

Sett opp en klient i samarbeidsportalen i rett miljø: https://sjolvbetjening.test.samarbeid.digdir.no
og bruk redirect url som printes over. Type er `client_secret_basic`.

![opprettet klient](/images/idporten/oidc/ansattporten-allmennsky-oppsett.png)

```
export ANSATTPORTEN_CLIENT_ID=<verdi fra nyopprettet client>
export ANSATTPORTEN_SECRET=<verdi fra nyopprettet client secret>

```
Se [integrasjonsguide](ansattporten_guide.html) for issuer i andre miljøer.


### Gi prosjekttilgang

Det er nødvendig å gi brukeren prosjekttilgang.

Vi oppnådde det ved å gi rollen `storage.objectViewer`. Det bør være mulig å stramme dette mer inn, og det jobber vi med å få til. Vi foreslår å forsøke med rollen `roles/browser`, som skal gi mindre tilgang.

For å utføre tilgangsendringen benyttes følgende kommando:

``````bash
gcloud projects add-iam-policy-binding $PROJECT_ID \
   --role="roles/browser" \
   --member="principalSet://iam.googleapis.com/locations/global/workforcePools/ansattportenpoc/attribute.orgno/0192:311046349"
``````

Hvis det ikke fungerer, så forsøk med `storage.objectViewer`. Hvis du har et bedre forslag, så si ifra til oss.

### Begrens til login fra kun en spesifikk organisasjon

Tilgang til innlogging kan begrensens med ```attribute-condition```.
Dette er valgfritt, men kan være fornuftig å begrense tilgangen.
Alternativt kan man benytte attributten orgno definert (`attribute.orgno`) under i IAM rolle-styring.

```
export CLIENTORGNO="0192:311046349"
```

### Lag OIDC provider for å Ansattporten være en del av Workforce Pool (`ansattportenpoc`)

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


### Eksempel på innhold i en id-token fra ansattporten

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


### Gi BigQuery tilgang til brukere innlogget via Ansattporten

Man kan spesifisere rettigheter til federerte brukere ved å referere til `principalSet` i IAM policies. [Se dokumentasjon](https://cloud.google.com/iam/docs/configuring-workforce-identity-federation).

Dette kan f.eks. gjøres med kommandolinje-verktøyet bq, eller direkte i BigQuery-grensesnittet.

Dette må gjøres med en json-definisjon. Først bør man hente ned eksisterende rettigheter i json for prosjektet og datasettet.

Vi forutsetter at et datasett som heter navn_2022 finnes i GCP prosjektet ditt.

``````bash
# PROJECT_ID er GCP prosjektnavn
export PROJECT_ID=skyportendemo
# DATASET er bigquery dataset
export DATASET=navn_2022
``````

Se eksisterende json:

```
bq show --format=prettyjson "$PROJECT_ID:$DATASET"
{
  "access": [
    {
      "role": "WRITER",
      "specialGroup": "projectWriters"
    },
    {
      "role": "OWNER",
      "specialGroup": "projectOwners"
    },
    {
      "role": "OWNER",
      "userByEmail": "foo@foo.com"
    },
    {
      "role": "READER",
      "specialGroup": "projectReaders"
    }
  ],
  "datasetReference": {
    "datasetId": "navn_2022",
    "projectId": "skyportendemo"
  },
  ...
}
```

Til denne json-strukturen må det legges til noen rader under access.

### Gi tilgang kun til ansatte fra organisasjon med orgnr. 311046349

Man kan gi tilgang til alle fra en workforce pool, eller avgrense med orgnr.
Her er eksemplet for å gi tilgang begrenset til orgnr. Andre attributter kan også benyttes.
[Se dokumentasjon](https://cloud.google.com/iam/docs/configuring-workforce-identity-federation).

Husk at vi over allerede har begrenset workforce deltakelse på organisasjonsnummer.

``````
  ...
  "access": [
  ...
    {
      "iamMember": "principalSet://iam.googleapis.com/locations/global/workforcePools/ansattportenpoc/attribute.orgno/0192:311046349",
      "role": "READER"
    },
    {
      "iamMember": "principalSet://iam.googleapis.com/locations/global/workforcePools/ansattportenpoc/attribute.orgno/0192:311046349",
      "role": "roles/bigquery.user"
    }
  }
  ...
``````

Her er eksemplet for å gi tilgang til alle fra en workforce pool:


``````
  ...
  "access": [
  ...
    {
      "iamMember": "principalSet://iam.googleapis.com/locations/global/workforcePools/$WORKFORCE_POOL_ID/*",
      "role": "READER"
    },
    {
      "iamMember": "principalSet://iam.googleapis.com/locations/global/workforcePools/$WORKFORCE_POOL_ID/*",
      "role": "roles/bigquery.user"
    }
  }
  ...
``````

Lagre den nye json-strukturen i `dataset_access.json`.

For å utføre tilgangsendringen benyttes følgende kommando:

``````bash
bq update --source dataset_access.json "$PROJECT_ID:$DATASET"
``````


### Ferdig innlogget bruker med synlig navn

Innlogging kan testes på følgende URL:

``````bash
echo "$CLOUD_SIGNIN_URL"
``````

Her er et screenshot som viser bruker ferdig innlogget i google cloud (`https://console.cloud.google`):

![Ansattporten innlogget i GCP](/images/ansattporten/ansattporten_gcp_logged_in.png)


## I Azure

Azure er en populær offentlig skyplattform i Norge og det er derfor gjort en vurdering av hvordan denne kan fungere sammen med Ansattporten. Microsofts tilbud var omfattende allerede før Azure og ambisjonene er å dekke "alle" behov en organisasjon har rundt infrastruktur for IT-løsninger. Gjennomgangen dekker dermed både noen begrepsavklaringer og evaluering av spesifikke tjenester.

Denne dokumentasjonen dekker både varianter som fungerer og elementer som ikke er egnet for integrasjon med Ansattporten med tanken om at begge deler kan gi verdi å vite om før man selv setter seg ned og tester.

Gjennomgangen er basert på hva som er offentlig tilgjengelig i Azure mai 2024. Det er ikke vurdert hva som eventuelt kommer eller kan være under utvikling.

### Azure TL;DR
Det er ikke en quick fix for universal integrasjon mellom Azure og Ansattporten, men det finnes som beskrevet under Microsoft-støttet funksjonalitet for å koble de to entitetene sammen. 
Fokuset fra Microsoft pr i dag er ikke å tilby dette som ferdig funksjonalitet på tjenestenivå, derimot rettes støtten på plattformnivå mot de som ønsker å lage egenutviklede applikasjoner og der er det ikke lagt inn noen sperrer for å hindre deling eller uttrekk av data. 
Google sin tilnærming som baserer seg på integrasjon direkte i det "vanlige" administrasjonsgrensesnittet er mer brukervennlig i så måte, men disse to skyleverandørene har valgt forskjellige veier hvor Microsoft skiller tydeligere mellom administrasjon av ressurser og konsumering av data.

### Scope
Azure er en utviklingsplattform og har et rikt sett med muligheter for å eksponere data via APIer levert av Microsoft eller APIer en organisasjon selv utvikler. Det er i så måte mulig å få til det meste gitt tilgjengelighet av tid og budsjetter. Bakteppet i denne sammenhengen er hva som finnes av lett tilgjengelige mekanismer for deling av data lagret i Azure.

Autentisering og autorisasjon på generelt nivå i Azure (altså uavhengig av hvilken tjeneste/ressurs som benytter det) er samlet under områdenavnet Entra. (Det som tidligere het Azure Active Directory er nå Entra ID.) Det er sett på mulighetene for å benytte produkter  for å lage overliggende koblinger mellom den enkelte organisasjons Azure-oppsett og Ansatt/ID-porten.

Det er mulig for produkt-team hos Microsoft å lage elementer i sine tjenester som kommer i tillegg til, eller i stedet for, de generiske Entra-mulighetene for å dele og gi tilgang. En fullstendig gjennomgang av Azure-porteføljen er i overkant omfattende, men det er forsøkt å se nærmere på mulighetene i utvalgte data-tjenester og utvalgte tjenester i Entra.

Det tas tilsvarende forbehold om at det kan være detaljer vi ikke har fått med oss eller videre utvikling etter denne dokumentasjonen ble utarbeidet som endrer bildet.

### Tilgangsmodeller

Azure har en modell for tilgang som er sentrert rundt konseptene "kontrollplan" og "dataplan". Kontrollplan er rettighetene for å opprette og administrere ressursene i Azure; eksempelvis det å opprette en SQL-server, knytte den til et privat nettverk, etc. Men det å kunne administrere serveren databasene kjører på gir ikke rettigheter til å behandle dataene - dette krever dataplan-tilgang. Snudd den andre veien så betyr ikke det at du har mulighet for å analysere data i en database at du skal kunne gjøre innstillinger på serveren.

Hvis du har kontrollplan rettigheter kan det (avhengig av hvilke andre mekanismer som er konfigurert) være mulig å gi seg selv rettigheter på dataplanet, men det er ikke mulig den andre retningen.

Denne modellen gjelder internt i en organisasjon og er noe en må være bevisst, men legger andre hindringer for ekstern tilgang. I et scenario hvor en tredjepart administrerer Azure behøver disse tilgang på kontrollplanet og Azure har et sett med tjenester for å muliggjøre dette. For å dele innhold er det altså dataplanet en forholder seg til, men mekanismene for denne delingen er ikke en speiling av administrasjonsmulighetene.

Uavhengig om det er kontrollplan eller dataplan det skal tildeles roller for skiller Azure også mellom interaktiv og ikke-interaktiv bruk; altså fysiske personer som logger inn kontra direkte programmatisk innlogging.

Tilgangsmodeller blir fort en teknisk diskusjon, men i tillegg er det også en dimensjon rundt behovet for deling på tvers. En adresseliste i Outlook er ikke tenkt delt utenfor organisasjonen, mens et offentlig datasett kan tenkes delt "for hele verden". Hvem data deles med legger ikke Microsoft seg opp i på overordnet basis, men en tjeneste kan være utformet basert på hva som er tenkte bruksområder (som kan være annerledes enn hva en gitt organisasjon har vurdert).

### Entra

Identitetshåndtering er en stor del av Azure som en essensiell del av å kontrollere hvem som har tilgang til hva, og inngår også som navet i begrepsbruk som "Zero Trust Architecture" (innen Microsoft-sfæren).

Det er flere nivåer av delingstyper i Azure/Entra:
- Innenfor samme tenant/organisasjon. Dette er antatt å fungere for samtlige tjenester så det har ikke inngått i testing eller evaluering.
- Mellom forskjellige organisasjoner hvor begge parter benytter Azure/Entra og koblingen foregår gjennom Microsofts egenutviklede mekanismer.
- Mellom forskjellige organisasjoner hvor partene er på forskjellige plattformer men det er en form for pre-integrasjon utført av Microsoft - type "klikk her for å logge inn med Google".
- Mellom forskjellige organisasjoner hvor koblingen skjer via standard protokoller (uavhengig av hvilke plattformer de benytter) - type "klikk her for å logge inn med OAuth".

Punkt to og tre kan være funksjonelt gode løsninger, men implementering av disse faller utenfor scope i denne sammenhengen og vil være opp til den enkelte organisasjon å evaluere nærmere.

### Fabric
Fabric er en egen plattform for datatjenester med forskjellige underliggende datakilder og tjenester for både behandling og eksponering av data. Det ville derfor være naturlig at det på plattform-nivå var muligheter for ekstern deling uavhengig av tjeneste, men pr i dag er det ikke tilgjengelig på overordnet nivå i Fabric. Eventuelle muligheter må derfor finnes i den enkelte tjeneste.

Merk at for både Fabric og de tilhørende tjenester er det kontinuerlig utvikling av nye egenskaper så det kan hende dette kommer etter hvert.
#### OneLake
OneLake er der data "dumpes". Det er her muligheter for inntrekk av data fra både Azure/Microsoft-kilder og Google/AWS samt Snowflake. Dette er dog på maskinnivå via servicekontoer. Det er mulig å se oversikten over hva som ligger i OneLake ved å logge inn i Fabric-portalen (som interaktiv bruker i din egen organisasjon), men det er ikke tenkt som et eksternt delbart grensesnitt.

I de tilfellene OneLake utveksler data via to-veis integrasjoner kan det selvfølgelig være muligheter i den andre enden for tilgjengeliggjøring til eksterne parter. Organisasjon A kan da benytte sine Azure-kontoer for å logge inn mens organisasjon B benytter sine Google-kontoer. Mulighetene for skalering er da flere 1:1-koblinger uten en sentral innlogging så det blir en administrativ overhead.

### Databricks
Databricks er et tredjeparts produkt hvor Microsoft står for tilretteleggingen av en versjon som kjører i Azure. 
Her er det muligheter for deling av data, men med litt forskjellige use cases. 
Eksempelvis kan det benyttes en servicekonto for å kopiere data fra en kilde til en egen kopi hvor det kan benyttes en annen katalog for innlogging enn Entra. 
Det er også støttet direkte i Databricks at man provisjonerer inn brukere via [SCIM](https://docs.databricks.com/en/admin/users-groups/scim/aad.html) eller setter opp [OIDC uavhengig av Entra](https://docs.databricks.com/en/admin/account-settings-e2/single-sign-on/oidc.html).

Her ser vi heller ingen gode integrasjonsmuligheter, ettersom Ansattporten ikke kommer til å støtte SCIM, og fordi Databrick kun støtter *en* ekstern OIDC-provider, som vi naturlig antar at vil være eierorganisasjonen sin.

### Power BI
Delingsmodellen for Power BI er litt spesiell i den forstand at den er tett knyttet til lisensmodellen for produktet. For deling direkte mellom brukere forutsettes det at begge har lisens til Power BI - dette fungerer bra internt i en organisasjon og til en viss grad på tvers av organisasjoner (som også er i Azure). Det er derimot ikke egnet for deling via mekanismer som ikke har et forhold til lisenser, slik som Ansattporten.

For deling uavhengig av brukertildelte lisenser er det mulig å anskaffe kapasitet for "Power BI embedded". Det er litt forskjellige nyanser her - dette kan eksempelvis benyttes for å lage offentlig tilgjengelige dashboard (uten innlogging) samt å pakke inn enkeltkomponenter på websider med eller uten innlogging. For websider man selv koder fra bunn av hvor Power BI bare er en datakilde er det uproblematisk å integrere mot Ansattporten, men det er da ikke via ferdige mekanismer i Azure.

Selve Power BI portalen (https://app.powerbi.com) med tilhørende "workspaces" er dermed ikke tilgjengelig for innlogging via Ansattporten pr i dag. Dette gjelder også den nyere innpakningen via Fabric-portalen.
### Power Pages

Microsoft tilbyr en low-code/no-code mulighet for eksponering av Power BI gjennom produktet Power Pages. Det krever også korrekt lisensiering for embedded, men det er mulig å lage en enkel webside samt via konfigurasjon benytte andre innloggingstjenester. I konfigurasjon for websiden (https://make.powerpages.microsoft.com) kan man opprette andre "identitetsleverandører":
![Lowcode powerpages](/images/ansattporten/azure/PP_IdP_01.png)

Her er det naturlig å velge OpenID direkte som tilkoblingsmetode og peke rett mot Ansattporten. Men dette vil ikke fungere da Power Pages vil trigge en innlogging basert på Implicit Flow. Denne flyten er ikke støttet av Ansattporten. (Implicit flow var tidligere mye brukt i SPA, men er nå frarådet å benytte. Power Pages benytter denne ettersom funksjonaliteten har vært der i flere år og den ikke har blitt oppdatert på dette punktet i ettertid.)

Hvis man har en annen løsning for innlogging (Auth0, Okta, etc.) så kan disse integreres via OIDC, men det er utenfor scope i denne artikkelen.

Det innebygde alternativet vil være å benytte Azure Active Directory B2C. (Konfigurasjon av dette er et eget punkt.) Dette er testet fungerende. Konfigurasjonen i Power Pages vil da være som dette:
![powerpages konfigurasjon](/images/ansattporten/azure/PP_IdP_02.png)


Eksempel-verdier

| Felt                         | Verdi                                                                                     | Beskrivelse                                                                                                                       |
|------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Tillatelse                   | `https://contoso.b2clogin.com/66274fff-e123-4c61-a246-f16926b3ffa7/B2C_1_AnsattSuSi/v2.0/`| Url for metadata i formatet `https://{b2c-tenant-name}.b2clogin.com/{b2c-tenant-id}/{b2c-policy-name}` og hentes fra Azure AD B2C |
| Klient ID                    | `b36a4c29-50bb-4986-b9fe-642a3e4f322d`                                                    | App registration fra Azure AD B2C                                                                                                 |
| URL-adresse for omdirigering | `https://site-a8b8c.powerappsportals.com/signin-aad-b2c_1`                                | Denne vil genereres av Power Pages og må registreres i Azure AD B2C                                                               | 
| ID for standardpolicy        | `B2C_1_AnsattSuSi`                                                                        | Navnet på user flow/custom policy i Azure AD B2C                                                                                  |


Standardverdiene som hentes ut er epost, fornavn og etternavn, men det er også mulig å hente ut ekstra verdier fra token (fra B2C)

![Ekstra verdier fra token](/images/ansattporten/azure/PP_IdP_03.png)

Attributtene er på kontakt-objektet i Power Pages og verdien er `claim` i JWT. (Power Pages tillater også å lage egendefinerte attributter hvis man har de behovene.) Ansattporten returnerer ikke epost så hvis man ikke implementerer logikk i Azure AD B2C for dette betyr det at bruker blir spurt om epost-addresse i Power Pages etter innlogging.

Merk at Ansattporten og Azure AD B2C gjør bare innloggingsdelen her og tilgangsstyringen vil ligge i Power Pages. 
Konfigurasjon av dette er utenfor scope her, men vær oppmerksom på at avhengig av hvilke data man ønsker å dele er det mulig dette ikke er finkornet nok.
Eksempelvis kan enkelte attributter enkelt redigeres av brukeren og selv om claims kan innhentes på nytt ved ny login er det ikke en faktisk synkronisering eller sanntidsevaluering.

### Entra-tjenester relevante for deling av data/ressurser
#### Workload Identity Federation
Bruksområdet for Workload Identity Federation er sammenkobling av Azure med andre Identity Providers og treffer dermed bra med Digdirs formål. 
Dette er i Azure en tjeneste for å understøtte applikasjoner og er et verktøy for maskin-til-maskin federering. 
Det er derfor ikke ment for interaktiv innlogging av brukere, men er i stedet beskrevet nærmere under [Maskinporten]({{site.baseurl}}/docs/maskinporten/maskinporten_skyporten_azure).

#### B2B Direct Connect / Cross-tenant access
Denne tjenesten er ment for å konfigurere hvordan to organisasjoner som begge benytter Azure/Entra kan logge inn på hverandres ressurser. Dette kan ikke kobles sammen med Ansattporten.

#### B2B Federation
Denne tjenesten kan benyttes for føderert innlogging mellom to organisasjoner hvor ikke begge er på Azure/Entra, men har begrensede støtte for identity providers. Det kan her velges mellom Google, Facebook og SAML. SAML er i teorien en mulig vei, men dette er en protokoll som generelt er på vei ut og det er foretrukket å benytte OAuth/OIDC på nye implementeringer. Ansattporten støtter ikke SAML så dermed utgår det som en opsjon her.

#### Entra ID Multitenant Organization
For enklere samhandling og ekstern deling i eksempelvis Teams og Microsoft 365 finnes denne funksjonen. Denne funksjonen er primært tiltenkt hvor en organisasjon har flere tenants - eksempelvis et konsern med datterselskaper, selskaper som har forskjellige juridiske enheter pr land, etc. Det blir dermed litt på siden av det som Ansattporten løser.

#### External Authentication Methods (EAM)
Navnemessig høres denne tjenesten riktig ut, men er ikke helt match likevel. Tjenesten er en videreutvikling av "Custom Controls" (som vil bli faset ut) og er tenkt for at en organisasjon kan benytte en annen multifaktor-løsning enn Microsoft sine innebygde (tredjeparts-løsninger eller egenutviklet). Primærfaktor må fremdeles være i organisasjonens Entra-tenant så det er dermed ikke enkelt å bruke på tvers av organisasjoner.
Denne tjenesten er basert på OpenID Connect så i teorien kan den benytte Ansattporten som en ekstra faktor, men akkurat nå er det ikke mulig pga:
- Ansattporten er ikke en SSO-løsning og støtter ikke implicit flow som EAM krever som betyr at en løsning mellom er påkrevd.
- En mulig løsning for å koble EAM mot Ansattporten kunne ha vært Azure AD B2C, men B2C sine JWKS (signeringsnøkler) eksponerer ikke k5c-elementet i metadata-endepunktet som er påkrevd av EAM så det vil ikke fungere.

### Entra Verified ID
Verified ID er tenkt som et elektronisk id-kort som kan benyttes til å verifisere seg på tvers av kontekster. Overordnet kan det se ut som noe av det samme som idporten/Ansattporten, men det tekniske ligger nærmere eIDAS-standardiseringene rundt desentralisert identitet. Dette er ikke innenfor mulighetsrommet per nå.


### Azure AD B2C
Navnet på denne tjenesten er noe misvisende da det opprinnelig var tenkt som en tjeneste for å enkelt kunne la sluttkunder logge inn via Google, Facebook, og lignende i web apper uten å implementere alt selv. Men ettersom det er mulig å legge til egne identity providers er det mulig å benytte dette som en løsning for flere brukergrupper. Overordnet sett har Azure AD B2C sammenfallende funksjonalitet med Ansattporten (som et mellomledd for flere identitetsløsninger) og for egenutviklede løsninger vil det derfor være en vurderingssak om det er enklere/bedre å integrere direkte med Ansattporten. Azure AD B2C er dog en fullverdig løsning og leverer mer omfattende tilpasningsmuligheter enn det Ansattporten kan tilby som standard så det kan gi en merverdi å ha som et mellomledd.

Konfigurasjon av Azure AD B2C kan i seg selv være en omfattende ting, men det relevante i denne settingen er at det er to veier til mål for å sette opp integrasjon med Ansattporten; "User flows" og "Custom policies".

Denne artikkelen beskriver [hvordan legge til en generisk OpenId Connect tilbyder](https://learn.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-generic-openid-connect?pivots=b2c-user-flow).

Følgende verdier vil fungere (for Ansattportens testmiljø):

| Felt           | Verdi                                                       |
|----------------|-------------------------------------------------------------|
| Metadata       | https://test.ansattporten.no/.well-known/openid-configuration |
| Client ID      | Hentes fra https://sjolvbetjening.test.samarbeid.digdir.no/ |
| Client secret  | Hentes fra https://sjolvbetjening.test.samarbeid.digdir.no/ |
| Scope          | openid profile ansattporten:sjef                            |
| Response type  | code                                                        |
| Response mode  | form_post                                                   |
| Claims mapping |                                                             |
| User ID        | sub                                                         |
| Display name        | name                                                        |

Hvis du logger inn basert på denne vil du få et token utsted fra Azure AD B2C med claims tilhørende B2C. Selve tokenet fra Ansattporten vil være i et claim kalt `idp_access_token` med unntak av de claims en har mulighet til å mappe i grensesnittet. Det er her ikke mulig å gjøre mer avanserte ting direkte basert på claims (i integrasjoner som er forhåndsdefinert som eksempelvis Power Pages), men hvis du har kontroll på koden kan du hente ut token og prosessere på "vanlig" måte.

Den andre måten å konfigure Ansattporten som tilbyder i Azure AD B2C er ved å benytte nevnte "Custom policies". Dette er en litt mer omstendelig prosedyre basert på at man produserer XML-filer som man laster opp til B2C-instansen sin. (Kan også gjøres fra Azure DevOps/GitHub for integrasjon med CI/CD-prosessene en har.)

Mer om custom policies:
* [Beskrivelse](https://learn.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview)
* [Hvordan konfigurere OpenID Connect tilbydere via custom policies, samme verdier som user flows](https://learn.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-generic-openid-connect?pivots=b2c-custom-policy)

Den generelle fordelen med å produsere disse XML-filene er at det gir muligheten for svært finkornet kontroll av innloggingsprosessen, men med ulempen at det er en viss innsats som kreves for å gjøre et fullverdig oppsett. I konteksten av Ansattporten gir dette muligheten for å tilpasse claims tilsvarende finkornet:
- Det er mulig å mappe flere claims enn tilbudt i grensesnitt. Eksempelvis hvis vi ønsker å hente ut `pid` og legge det inn som `person_id` kan dette gjøres via en output claim:
  `OutputClaim ClaimTypeReferenceId="person_id" PartnerClaimType="pid"`
- Det er mulig å legge inn logikk i flyten og legge inn ekstra API-kall underveis. Eksempelvis gir Ansattporten et claim som sier hvilken organisasjon du representerer - hvis din applikasjon benytter interne identifikatorer som `&firmaId=x` i url kan det gjøres en oversettelse fra navn/generisk id til korrekt intern id.
- Ansattporten returnerer roller som en JSON-struktur og dette krever tilpasninger for å parse. [Her er et eksempel](https://medium.com/the-new-control-plane/using-nested-json-in-a-rest-api-call-with-azure-ad-b2c-886872e7776)

### Entra External ID
Azure AD B2C som produkt videreutvikles ikke lenger og skal på sikt fases ut til fordel for Entra External ID. Dette er et produkt som håndterer eksterne identiteter uavhengig av om det er B2C, B2B eller B2E. Det er ikke støtte for egne identity providers her ennå (må velge fra en predefinert liste) og derfor er det ikke mulig å benytte Ansattporten med dette produktet pr i dag. Hvis dette blir støttet på et senere tidspunkt ser dette ut som en mulig løsning for å logge inn i egne web-apper via Digdir.

## I AWS

Ikke påbegynt - ta kontakt med servicedesk@digdir.no eller kontakt@samferdselsdata.no 
om du ønsker å teste dette ut 
