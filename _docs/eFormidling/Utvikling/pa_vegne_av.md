---
title: På vegne av
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

En leverandør kan benytte ett integrasjonspunkt til å opptre på vegne av en eller flere virksomheter.

Et slikt oppsett krever at:

- Integrasjonspunktet konfigureres med leverandørens virksomhetssertifikat og organisasjonsnummer
- Leverandøren får nødvendige tilganger fra eFormidling
- Leverandøren får delegert tilganger fra virksomhetene leverandøren skal opptre på vegne av
- Integrasjonspunktets grensesnitt [eFormidling 2](integrasjonspunkt_eformidling2_api) brukes
- Ved sending av en melding må det angis hvilke av virksomhetene som er avsender
- Ved mottak av en meldingsstatus må den knyttes til rett melding hos rett avsender
- Ved mottak av en melding må den knyttes til rett melding hos rett avsender

For en beskrivelse av hvordan avsender angis, se `sender.identifier.value` under:
- [Standard Business Document Header (SBDH)](Dokumenttyper/standard_sbd#standard-business-document-header)

Hvordan en konfigurere på-vegne-av avhenger av den aktuelle meldingstjenesten.

## På vegne av for Altinn Digital Post (DPV)

Ved bruk av Altinn Digital Post har alle autoriserte avsendere lov å sende på vegne av andre. Altinn Digital Post
støtter derfor på vegne av uten noen som helst konfigurasjon eller delegering av tilganger.

## På vegne av for Digital Post til Innbyggere (DPI)

Ved bruk av Digital Post til Innbyggere benyttes autorisasjonsbevis fra Maskinporten til å autorisere avsender. Disse
autorisasjonsbevisene kan Maskinporten utstede til en leverandør på vegne av en kunde. Dette forutsetter at:

- Digdir har tildelt leverandøren tilgang til å sende Digital Post til Innbyggere
- Digdir har tildelt kunden tilgang til å sende Digital Post til Innbyggere
- Kunden har delegert sin tilgang til å sende Digital Post til Innbyggere til leverandøren
- Leverandøren har gitt Digdir beskjed om delegeringsforholdet mellom leverandøren og kunden

Oppsettet krever ingen ekstra konfigurasjon av integrasjonspunktet.

Virksomheten må delegere følgende tilgang til leverandøren ved hjelp av Altinn:

- `Delegere rettighet til å sende DPI-meldinger på vegne av virksomheten`

## På vegne av for KS SvarUt og SvarInn (DPF)

KS SvarUt og SvarInn har ikke innebygd støtte for at en leverandør kan opptre på vegne av en kunde. En slik delegering
løses i praksis ved at kunden gir sitt brukernavn og passord til KS SvarUt og SvarInn til leverandøren. Dette støttes av
integrasjonspunktet ved at en kan konfigurere mange brukernavn og passord for KS SvarUt og SvarInn.

Organisasjonsnummer, brukernavn og passord for virksomhetene som integrasjonspunktet skal sende og motta på vegne av må
oppgis i konfigurasjon. Se `difi.move.fiks.ut.paa-vegne-av.*` og `difi.move.fiks.inn.paa-vegne-av.*` under:

- [Konfigurere KS SvarUt og SvarInn](../installasjon/installasjon#konfigurere-ks-svarut-og-svarinn-dpf)

> NB: På vegne av for KS Svarut og SvarInn kan først tas i bruk ved versjon 2.9.0 av integrasjonspunktet.

## På vegne av for eFormidlings meldingstjeneste (DPO)

Hvordan dette settes opp er avhengig av hvilken versjon av integrasjonspunktet en bruker.

### Oppsett for eFormidling 4.0

Denne tar utgangspunkt i at en allerede har satt opp [system og systembruker](https://docs.digdir.no/docs/eFormidling/installasjon/opprette_brukere#opprette-bruker-for-altinn-formidling-kreves-av-eformidlings-meldingstjeneste) for orgnummeret som brukes i integrasjonspunktet.
Når det er gjort kan du følge denne guiden stegvis.

**JWT generator**<br>
Last ned Digdir sin [JWT generator](https://github.com/felleslosninger/jwt-grant-generator). Denne trengs for å generere access token.
En kan gjenbruke JKS/P12 sertifikat som en bruker i integrasjonspunktet.
<br>

Propertiesfilen skal se slik ut:
```
issuer=MOVE_IP_<orgnummer-inn-her>
audience=https://maskinporten.no/
scope=altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write

keystore.file=path-til-din-keystore
keystore.password=keystore-passord
keystore.alias=keystore-alias
keystore.alias.password=alias-passord

token.endpoint=https://maskinporten.no/token
```
Kommando for å bygge å kjøre generatoren:
```
mvn package
java -jar target\jwt-grant-generator-1.1.0-SNAPSHOT-jar-with-dependencies.jar din-properties-fil.properties
```

Du vil da få et accesstoken som du skal bruke i forespørselen mot Altinn.
![]({{site.baseurl}}/images/eformidling/access_token.png)
<br>

**Systembrukerforespørsel**<br>
For systemID bruker du orgnummeret som systemet er opprettet på. For partyOrgNr bruker du orgnummeret du skal sende på-vegne-av.
```
curl -X POST "https://platform.altinn.no/authentication/api/v1/systemuser/request/vendor" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer DITT_ACCESS_TOKEN" \
  -d '{
  "externalReference": "",
  "systemId": "<orgnummer-inn-her>_integrasjonspunkt",
  "partyOrgNo": "<orgnummer-inn-her>",
  "rights": [],
"accesspackages": [
    {
        "urn": "urn:altinn:accesspackage:informasjon-og-kommunikasjon"
    }
],
  "redirectUrl": ""
}'
```
Responsen skal være `201`:
```
{
    "id": "4f8078cf-da52-4455-a809-6951f455fb1e",
    "integrationTitle": "Integrasjonspunkt",
    "externalRef": "211056142",
    "systemId": "910999559_integrasjonspunkt",
    "partyOrgNo": "211056142",
    "rights": [],
    "accessPackages": [
        {
            "urn": "urn:altinn:accesspackage:informasjon-og-kommunikasjon"
        }
    ],
    "status": "New",
    "redirectUrl": "",
    "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=4f8078cf-da52-4455-a809-6951f455fb1e&DONTCHOOSEREPORTEE=true",
    "escalated": false,
    "created": "0001-01-01T00:00:00",
    "timedOut": false
}
```
<br>
På-vegne-av virksomheiten må så bruke `confirmUrl`til å godkjenne tilgangene (krever rollen Tilgangsstyring eller Daglig Leder). En kan bare sende URLen i klartekst.

Når tilgangene er bekreftet kan en legge på-vegne-av orgnummeret inn i propertiesfila slik:
```
difi.move.dpo.reportees[0].orgId=0192:311694049
difi.move.dpo.reportees[0].name=311694049

difi.move.dpo.reportees[1].orgId=0192:313711218
difi.move.dpo.reportees[1].name=313711218
```

### Oppsett for eFormidling 2.0 eller 3.0

For å sende på vegne av en annen virksomhet ved bruk av eFormidlings meldingstjeneste så må leverandøren opprette 
systembruker på leverandørens system i Altinn for hver av virksomhetene som leverandøren skal opptre på vegne av.

Organisasjonsnummer og systembruker for virksomhetene som integrasjonspunktet skal sende og motta på vegne av må oppgis i konfigurasjon.

Se `difi.move.dpo.reportees` under:

- [Konfigurere eFormidlings meldingstjeneste](../installasjon/installasjon#konfigurere-eformidlings-meldingstjeneste-dpo)

## På vegne av for eInnsyns meldingstjeneste (DPE)

I motsetning til de andre meldingstjenestene, så må leverandøren oppgis som avsender i SBDH ved bruk av eInnsyns
meldingstjeneste. På-vegne-av forholdet spesifiseres i forretningsmeldingen for publiseringen. Se:

- [Publisering](Dokumenttyper/publisering#forretningsmeldingen)

Leverandøren må gi eInnsyn beskjed om delegeringsforholdet mellom leverandøren og kunden.

Oppsettet krever ingen ekstra konfigurasjon av integrasjonspunktet.

## På vegne av for KS FIKS IO

KS FIKS IO adresserer på systemnivå slik at på vegne av ikke er relevant.
