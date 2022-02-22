---
title: Ny transportinfrastruktur  
permalink: dpi_nyinfrastruktur.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png)
Denne og flere av de sidene under "Ny infrastruktur" er under arbeide og det vil derfor kunne komme hyppige oppdateringer både på sider og i spesifikasjon. Sidene det gjelder vil ha under "Under construction" bildet. 
Dette bildet vil fjernes etter hvert som gjeldende side/spesifikasjon blir ferdigstilt -->


# Bakgrunn

Den proprietære transportinfrastrukturen for Digital Postkasse til innbyggere skal erstattes med en standard-infrastruktur for meldingsutvekling i det offentlige, dvs 4-hjørnes-modell med CEF eDelivery/PEPPOL. Følgende aktører inngår:
- Hjørne 1: Avsender (og evt. avsender sin leverandør/databehandler)
- Hjørne 2: Avsenders aksesspunkt-leverandør
- Hjørne 3: Postkasse- og utskriftsleverandørs aksesspunktleverandør
- Hjørne 4: Postkasse- og utskriftsleverandør

Vi ser altså at den sentraliserte Meldingsformidleren blir erstattet av et distribuert nettverk av aksesspunkt-leverandører.

Av sikkerhetsgrunner må derfor:
- meldingsformatet i DPI endres noe

samt noen av Meldingsformidlers oppgaver flyttes til tjenesteleverandører i hjørne 4:
- validere ende-til-ende integritet på sendte meldinger
- validere at avsender har tillatelse til å sende digital post
- dersom en melding er sendt av en databehandler, validere at databehandler har lov til å opptre på vegne av avsender
- sørge for at kvitteringer blir sendt tilbake til rett system uavhengig av om avsender bruker databehandler eller ikke


Det må etableres en ny transport-protokoll mellom hjørne 1 og hjørne 2.  I tradisjonell PEPPOL-tenking er dette noe som markedsaktørene selv skal ta fram - dvs i prinsippet er dette opp til aksesspunktleverandørene selv å bestemme. Siden Digdir ønsker å gjøre en anskaffelse av aksesspunktleverandørtjenester for formidling av digital post, som de fleste avsendere kommer til å benytte, er det hensiktismessig at Digdir kravstiller en protokoll som skal brukes av denne leverandøren.  Det hindrer ikke andre aktører å implementere andre, egne protokoller.

Protokoll mellom hjørne 2 og 3 er bestemt av PEPPOL, og heter AS4.
Protokoll mellom hjørne 3 og tjenesteleverandører i hjørne 4 bør avtales bilateralt mellom disse aktørene i samarbeid med Digdir.



# Revidert meldingsformat- og transportformat i DPI

Motivasjon bak revidert meldings- og transportformat i DPI:

* Minst mulig endringer på eksisterende format, da både avsender-systemer og postkasse-leverandører støtter dette.
* Må ta høyde for at en aksesspunktleverandør i PEPPOL kan bli kompromittert av en angriper som vil forsøke å injisere falske meldinger
* Fjerne ebMS 3.0 som transportformat mellom Databehandler og Meldingsformidler, da erfaring viser at denne er relativt komplisert å ta i bruk, og vil være lite attraktiv for potensielle aksesspunktleverandører å måtte implementere,  og heller innføre en moderne og sikker lettvektsprotokoll som REST.
* Gjenbrukbart format også for andre meldinger i eMeldingsinfrastrukturen
* Utviklervenlig format med høyt rammeverk- og produktstøtte, for å gjøre det så lett som mulig å sende meldinger fra hjørne 1.

Revidert meldings- og transportformat i DPI innebærer derfor:
1. [*Dokumentpakken*, dvs ASiC-pakken](https://docs.digdir.no/dokumentpakke_index.html) beholdes uendret
2. [*Forretningsmeldingene*](https://docs.digdir.no/sdp_index.html) beholdes også stort sett uendret, men:
  * Formatet skal endres fra XML til JSON for å bli mer tilpasset vanlig REST-bruk
    * json-schema følge dagens xsd så langt det lar seg gjøre.
  * Strukturen er fremdeles en SBD, dvs. består av  
    * Først en [*SBDH*](https://docs.digdir.no/standardbusinessdocument_index.html), nå JSON-ifisert.
    * Så selve forretningsmeldinga (eks. digitalpostmelding), også JSON-ifisert
 * Maskinporten-token må inkluderes i forretningsmeldinga slik at PK-leverandør kan motta dette som bevis på tillatelse til å sende post
 * Hele SBD'en må signeres på meldingsnivå for å sikre ende-til-ende integritet, og den må defor da bli en JWT.


# Grensesnittsdefinisjoner

## REST-api mellom Avsender og Hjørne 2

Aksesspunkt-leverandør i hjørne 2 skal tilby et enkelt REST-endepunkt som Avsender bruker for å sende post og hente kvitteringer.

REST-grensesnittet skal sikres med Bearer tokens fra Maskinporten, se: https://docs.digdir.no/maskinporten_auth_server-to-server-oauth2.html.  Informasjon om godkjente avsendere og deres eventuelle databehandlere blir kodet inn i dette tokenet.

Aksesspunkt-leverandør skal tilby 2 endepunkt:

### Sende post

Post sendes som multipart/form-data og inneholder både forretningsmelding og dokumentpakke. Det oppfordres til å bruke strømming for å støtte sending av store filer.
```
POST /messages/out
Authorization: Bearer <maskinporten_token>

Body:
<multipart/form-data med forretningsmelding (JWT) og dokumentpakke (kryptert ASICE)>
```

### Hente kvitteringer og marker som lest

URL på formen
```
GET /messages/in
GET /messages/in/{messageId}
POST /messages/in/{messageId}/read
```
### Se status på en melding
Gir en statuskode på hva som har skjedd med den sendte meldingen.
```
GET /messages/out/{messageId}/statuses
```

### API-definisjoner
Se [DPI skjema](dpi_skjema.html) 

## PEPPOL (hjørne 2-> 3)
Se [DPI skjema](dpi_skjema.html)

Se [Peppol eDelivery network specifications](https://peppol.eu/downloads/the-peppol-edelivery-network-specifications/)

## Hjørne 3 -> Tjenesteleverandører i hjørne 4 (postkasse- og utskriftsleverandører)

Dette avtales bilateralt mellom de to partene i samarbeid med Digdir.


# Forutsetninger:

### System-oppsett

Digdir oppretter maskinporten-scopet `digitalpostinnbygger:send`. Tilgang til dette scopet betyr at Avsender har inngått bruksvilkår for Digital Postkasse til Innbygger.  Digdir settes som eier av Maskinporten-scopet, som betyr at det er Digdir som administrerer hvem som får tilgang. Faktura for konsumentene (= alle avsendere) går til Digdir selv og faktureres ikke.

Ved bruk av Altinn Autorisasjon til delegering må det opprettes et "delegationScheme" i Altinn som muliggjør at Behandlingsansvarlig kan delegere til Databehandler.   Digdir blir eier av delegationSchemet, og Digdir vil motta faktura for bruk av Altinn.

Nødvendige prosesser og dokumenttyper registreres for mottaker i ELMA av mottakers Peppol-aksesspunkt.

Se [prosesser og dokumenttyper](identifiers.html)

### Oppsett av postkasse- og utskriftsleverandør

Tjenesteleverandørene i hjørne 4 registreres i ELMA som mottakere av aktuelle processer og dokumenttyper. Må utføres av Hjørne 3.


### Oppsett av ny Avsender

Digdir gir Avsender tilgang i Maskinporten til oauth2-scopet `digitalpostinnbygger:send`  når bruksvilkår for Digital Postkasse er inngått.

Alt 1: Avsender som skal sette opp sitt eget system, må få tilgang til Samarbeidsportalen (i Prod) og registere en maskinporten-integrasjon med det aktuelle scopet.  Fagsystemet/oauth2-klieten må konfigureres med den genererte `client_id` og Avsender sitt virksomhetssertifikat.  Avsender som bruker integrasjonspunktet trenger ikke å gjennomføre dette, men må følge de retningslinjer som gjelder for å få satt opp et integrasjonspunkt.

Alt 2: Avsender som benytter systemleverandør/databehandler må i stedet logge inn i Altinn for å delegere tilgangen til å sende DPI videre til systemleverandør.   Systemleverandør må få tilgang til Samarbeidsportalen og lage Maskinporten-integrasjon på samme måte som selvstendige avsendere. Merk at systemleverandør autentiserer seg mot Maskinporten med sitt eget virksomhetsertifikat, og trenger ikke å ha sertifikatet til Avsender.

Avsender (evt. systemleverandør) inngår så en avtale med en aksesspunkt-leverandør.  Fagsystemet blir konfigureret og integerert mot aksesspunktleverandør.

Avsender må bli satt opp i ELMA som mottaker av DPI-kvitteringsmeldinger. Dette gjør aksesspunktleverandør.

PK-leverandør mottar beskjed manuelt fra Digdir om at det er etablert en ny Avsender.




## Meldingsflyt

**(dersom du ikke ser et sekvensdiagram under her, må du åpne dokumentet i noe som kan vise mermaid inline grafikk)**


<div class="mermaid">
sequenceDiagram
  participant A as Avsender
  participant F as Fagsystem
  participant MP as Maskinporten
  participant ELMA
  participant AA as Altinn Autorisasjon
  participant K as Kontaktregisteret

  participant C2 as Hjørne 2
  participant C3 as Hjørne 3
  participant PK as Postkasse-leverandør

  note over F: signeringssertikat (tilhører enten Avsender eller Databehandler)

  note over A, PK: Oppsett
  A->>MP: Digdir gir tilgang til Avsender
  A->>C2: Inngå avtale med aksesspunktleverandør
  C2->>ELMA: Hjørne 2 oppretter Avsender i ELMA
  A->>PK: Digdir forteller PK at ny Avsender er opprettet (manuell prosess)

  opt Dersom Avsender ønsker å bruke en leverandør/Databehandler
    A->>AA: Bemyndiget ansatt hos Avsender delegerer til Databehandler (valgfritt, asynkront)
  end
  note over A, PK: Runtime

  activate F
  F->>K: Forespør innbyggers postkasse
  activate K
  K-->>F: orgno pk-leverandør, krypteringssertifikat
  deactivate K
  F->>MP: Forespør token
  activate MP
  opt Dersom Fagsystem ikke tilhører Avsender
    MP->>AA: Sjekker om tilgang er delegert Databehandler
  end
  MP-->>F: maskinporten_token
  deactivate MP
  F->>C2: POST /messages/out (Forretningmelding og Dokumentpakke)
  activate C2
  C2->>C2: validere
  C2-->>F: 200 OK
  deactivate F
  C2->>ELMA: oppslag (meldingstype + orgno til postkasse)
  activate ELMA
  ELMA-->>C2: adresse til Hjørne 3
  deactivate ELMA

  C2->>C2: pakke om melding til PEPPOL-format
  C2->>C3: PEPPOL-melding over AS4
  activate C3
  C3-->>C2: akseptert
  deactivate C2
  C3->>PK: levere melding (bilateral protokoll)
  deactivate C3

  note over  PK: validere og putte i innbyggers postkasse

  note over PK,A: kvitteringer

  PK->>C3: kvittering til Avsender (bilateral protokoll)
  activate C3
  C3->>ELMA: oppslag (meldingstype=kvittering, orgno til avsender)
  ELMA-->>C3: adresse til hjørne 2

  C3->>C2: PEPPOL-melding over AS4
  activate C2
  C2-->>C3: akseptert
  deactivate C3
  F->>MP: Forespør token
  activate F
  activate MP
  opt Dersom Fagsystem ikke tilhører Avsender
    MP->>AA: Sjekker om tilgang er delegert Databehandler
  end
  MP-->>F: maskinporten_token
  deactivate MP
  F->>C2: poller på kvitteringer (GET /status/{conversationid} )
  deactivate C2
  deactivate F

</div>

## 1:  Avsender henter token fra maskinporten

Fagsystem lager en JWT grant som etterspør `digitalpostinnbygger:send`-scopet, signerer denne ( se https://docs.digdir.no/maskinporten_protocol_jwtgrant.html, sender dette til Maskinporten og får  et access_token i retur.

Ved utstedelse av token vil Maskinporten kontrollere:
- at Avsender har lov til å bruka DPI.
- Viss Avsender har databehandler, sjekkar Maskinporten mot Altinn Autorisasjon at aktuell autentisert Databehandlar har fått lov til å opptre på vegne av Avsender for sending av DPI.


Døme på payload i JWT access token
```
{
  "iss": "https://maskinporten.no",
  "scope": "digitalpostinnbygger:send",
  "aud": "https://api.aksesspunktleverandør.no/"
  "consumer": {
      "Authority": "iso6523-actorid-upis",
      "ID": "0192:991825827"      // Alltid Avsenders orgno
  }
  "supplier": {
      "Authority": "iso6523-actorid-upis",
      "ID": "0192:999888777"      // Eventuell Databehandler.
  }
  "iat": <timestamp>
  "exp": <iat-verdi + 30 sec>
}
```

Dersom avsender er sin egen Databehandler så mangler tokenet `supplier`-claimet.


## 2:   Avsender sender post-melding

Avsender slår opp i KRR og finner hvilken PK-leverandør som innbygger benytter - og vet derigjennom om det skal sendes digital eller fysisk post.

Avsender kan nå konstruere korrekt **forretningsmelding** (DigitalPostMelding) etter [dagens regler](https://docs.digdir.no/sdp_digitalpostmeldinger.html), men med følgende tillegg/endringer:

* Format skal være JSON, og følge skjema-definisjonen her på [https://docs.digdir.no/schemas/dpi/innbyggerpost_dpi_digital_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_digital_1_0.schema.json)
* Strukturen er fremdeles en SBD, dvs. består av  
  * Først en [*SBDH*](https://docs.digdir.no/standardbusinessdocument_index.html), nå JSON-ifisert.
  * Så selve forretningsmeldingen (eks. digitalpostmelding), også JSON-ifisert
* Token mottatt fra Maskinporten inkluderes i et felt `maskinporten_token` under `digitalpost`
* Hele SBD'en må signeres på meldingsnivå for å sikre ende-til-ende integritet, og den må defor da bli en JWT.
  * Databehandler må signere forretningsmeldingen med samme sertifikat som benyttes til å signere Dokumentpakke.
  

Regler for hvilke organisasjonsnummer som skal på ulike steder i meldingsstrukturen videreføres, se [eksempelet om Bunadsrådet og Acos i eksisterende dokumentasjon](https://docs.digdir.no/sdp_meldingsformat.html?h=bunadsr%C3%A5det#p%C3%A5vegne-eksempel).

**Eksempel på forretningsmeldinger**:
* Se [https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_digital_1_0.json](https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_digital_1_0.json) for et eksempel med digital post. `receiver` er her PK-leverandør sitt orgno.
* Se [https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_utskrift_1_0.json](https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_utskrift_1_0.json) for eksempel med fysisk post. `receiver` er her org.no til printtjeneste-leverandør.



Avsender lager nå til slutt en unik meldingsid, og sender så posten :
```
POST /messages/out
Host: api.aksesspunktleveradandør.no
Content-Type: application/jwt
Authorization: Bearer <maskinporten_token>

Body:
<forretningsmelding (JWT) og dokumentpakke (kryptert ASICE)>
```

### 3: Aksesspunkt-leverandør mottek melding

Aksesspunktleverandør (APL) må gjennomføre en teknisk validering av Maskinporten-tokenet ihht Oauth-standarden (ustedt av Maskinporten, gyldig signatur, ikke utløpt).  
- Utgått token medfører 401-respons
- Gyldig token men som mangler "digitalpostinnbygger:send"-scope eller avsender med manglende avtale med APL -> 403 repons

Aksesspunktleverandør må videre validere at:
* `consumer`-claimet i token stemmer med Avsender i forretningsmelding.
* [`aud`-claimet i token](https://docs.digdir.no/maskinporten_func_audience_restricted_tokens.html) stemmer med eget API-endepunkt
* `maskinporten_token` i forretningsmelding er identisk med det som ble brukt som Bearer token det aktuelle API-kallet
* `meldingsid` ikke er forsøkt brukt tidligere.


Aksesspunktleverandør lagrer meldingsid, konversasjonsid og tilhørende avsender/databehandler og avsenderidentifikator, slik at kvitteringsmeldinger og feilmeldinger relatert til meldingen kan håndteres, og fagsystemet kan etterspørre status.


### 4: Aksesspunkt-leverandør i hjørne 2 sender meldingen videre til hjørne 3

APL mapper `documentIdentification/type` i SBDH-delen av forretningmelding til riktig processid ihht PEPPOL
APL slår opp i ELMA på processid og PK-leverandørs orgno (=receiver i SBDH-delen av forretningsmeldinga) og får hvem som er hjørne 3 for den aktuelle PK-leverandøren.

APL kan nå konstrurere en PEPPOL-melding. Dvs:  
* Pakke forretningmelding og dokumentpakke om til avtalt payload-format
  *
* Lage PEPPOL-konvolutt ("ytre" SBDH)
  * SBDH `Receiever` settes lik pk-leverandør orgno (?)
  * SBDH `processid` settes lik `processid`
  * SBDH `Sender` settes lik  (TODO: Avsender eller Databehandler)?

**Eksempel**: Transport-format i PEPPOL ser ut som her: https://github.com/joergenb/dpi_transport/blob/main/Samples/DIGITALPOST_DPI_1_0_Minimal_Sample.xml




### 5: Hjørne 3 mottar meldingen, og sender videre til hjørne 4

Leverandør i C3 og mottaker i hjørne 4 avtaler protokoll seg i mellom i samarbeid med Digdir.  

De står fritt til å bruke PEPPOL payload-formatet direkte, eller dele opp forretningsmelding/dokumentpakke slik det er gjort over Avsender->Hjørne 2-grensesnittet, eller andre hensiktsmessige protokoller.  Det må dog være enkelt og entydig for PK-leverandør å koble dokumentpakke og forretningsmelding sammen.

Partene bestemmer selv hvilken sikringsmekanisme de vil ha (feks egen oauth2 autorisasjonsserver, bruke 2-vegs tls, eller noe annet). Vi anbefaler ikke at de bruker maskinporten-tokenet, da dette kan ha utløpt undervegs.


### 6: Hjørne 4 mottar meldingen og putter i postkassen til innnbygger eller skriver ut og sender meldingen

Ved mottak av melding, må postkasse-leverandør/utskriftsleverandør validere ende-til-ende integritet, dvs:

a: at DigitalPostMelding er signert av Avsender(eller Databehandler) og inneholder en digest for tilhørende dokumentpakke
b: at dokumentpakken er signert av Avsender(eller Databehandler)
c: regne ut digest av dokumentpakken og kontrollere at utregnet digest stemmer med påstått verdi i forretningsmeldingen


d: validere at Avsender i forretningsmeldinger stemmer med `consumer`-claimet i `maskinporten_token` i forretningsmeldingen.
e: validere at virksomhetssertifikatet som er brukt til å signere både Dokumentpakke og DigitalPostMelding stemmer med autorisert avsender (dvs maskinporten-token)
  * lik `supplier`s orgno, dersom dette claimet finnes i maskinporten_token
  * lik `consumer`s orgno ellers


# Kvitteringer

PK-leverandør må kunne asynkront sende kvittering tilbake i C3 -> C2 -> C1.  (dvs C3 må tilby et API eller mekanisme der PK-leverandør kan overføre kvitteringer, og dette må ta høyde for at slik kvitteringslevering skal kunne skje asynkront ifht levering av digitalpostmelding C3->C4.)

Feltet `conversation_id` kobler sammen en kvittering med tilhørende DigitalPostMelding. Det er lov å sende flere kvitteringer tilhørene en og samme conversation_id.

PK-leverandør lager en **forretningsmelding** (LeveringsKvittering, VarslingFeilet, Mottak, ReturPost) etter dagens regler, men med endring tilsvarende det som ble skissert i steg 2. Dvs.:
* Format skal være JSON, og følge skjema-definisjonen.
  * PK-leverandør legger til Avsenders orgno i feltet `Avsender`
  * PK-leverandør legger til evt. Databehandlers orgno i feltet `Databehandler`

* Strukturen er fremdeles en SBD, dvs. består av
    * Først en SBDH, nå JSON-ifisert.
    * Så selve forretningsmeldinga (eks. leveringskvittering), også JSON-ifisert
* Hele SBD'en må signeres på meldingsnivå for å sikre ende-til-ende integritet, og den må defor da bli en JWT.
* PK-Leverandør må signere forretningsmeldingen med sitt virksomhetssertifikat.


PK-leverandør ber så om at C3 sender kvitteringa til Avsender.



C3 slår opp i ELMA og finner hvem som er C2 for Avsender.
C3 lager en PEPPOL-melding til C2.
C2 mottar kvitteringa, og legger den i kø.  Venter på at Avsenders system poll'er på kvitteringer med riktig conversation-id.  Verifiserer at Avsender som forsøker å hente kvittering, er den samme som sendte digitalpostmeldingen.






# 2-vegs svar

TODO - Beskrivelse av 2-vegs-svar vil komme dersom funskjonaliteten vedtas og utvikles.

