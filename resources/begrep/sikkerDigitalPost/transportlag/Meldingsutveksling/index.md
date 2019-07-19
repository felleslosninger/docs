---

title: Meldingsutveksling  
permalink: sdp_index_meldingsutveksling.html
sidebar:
---

## {{page.title}}

## Spesifikasjon for meldingutveksling i Sikker digital Post

Postforsendelsen skal overføres fra Databehandler ved bruk av en ebMS
3.0 Message Service Handler (MSH).  
MSH’en er virksomhetens tilgangpunkt inn til ebMS 3.0 rammeverket som er
ansvarlig for videre transport.  
Avsender sin MSH skal støtte [The AS4 Light Client Conformance
Profile](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/profiles/AS4-profile/v1.0/os/AS4-profile-v1.0-os.html#__RefHeading__26166_1909778835)

Det er flere forskjellige scenarier for hvordan MSH blir tatt i bruk av
(eller integrert inn i) avsender sine løsninger.  
Det er opp til avsender om man vil fullintegrere MSH inn i eksisterende
løsning, benytte seg av en standard “hyllevare” løsning med lokal
integrasjon eller benytte seg av tredjepart som MSH.

Les mer om [meldingsidentifikatorer](../MeldingsIdentifikatorer.md)

### AS4 Light Client profilen

ebMS benytter konseptet P-Mode (Processing Mode) til å beskrive en
samling parameterer som definerer hvordan en melding er utvekslet mellom
to Message Serivce Handlers (MSH). P-Mode paramtererne er delt inn i
flere undergrupper for generelle, protokoll, forretningsinfo,
feilhåndtering, pålitlighet og sikkerhet.

AS4 Light client profilen definerer hvilke av disse som en
implementasjon skal støtte.

### Grensesnitt mellom avsender og MF

Grensesnittet mellom avsender og meldingsformidler har to sett med
P-Mode parametere:

  - [FormidleDigitalPostForsendelse](FormidleDigitalPostForsendelse.md) -
    benyttes ved sending av en digital post forsendelse fra avsender til
    meldingsformidler
  - [KvitteringsForespoersel](KvitteringsForespoersel.md) - benyttes av
    avsender for å sjekke om det er forretningskvitteringer som kan
    hentes

#### Message Partition Channel (mpc)

Sentralt i utvekslingsmønsteret er (Link til Message Partition Channel
skla her(../UserMessage/mpc)) som blir brukt til å angi informasjon om
hvilken kø man formidler/sjekker informasjon i. Denne blir brukt til å
angi prioritet på meldingen, samt støtte at en teknisk avsender har
håndterer flere avsendere.

#### Mellomlagring av meldinger i Meldingsformidler

Meldingsformidler mellomlagrer meldinger i en tidsperiode for å skjule
kompeksitet for avsender.  
Det mest aktuelle scenariet for Digitalpost meldinger er relatert til
planlagt/ikke planlagt nedetid mellom eller hos leverandører av
komponenter i infrastrukturen, for eksempel nedetid hos er
postkasseleverandør.  
For kvitteringsmeldinger mellomlagrer meldingsformidler meldingene i en
kø til de blir hentet av avsender.  
Målsetningen er at infrastrukturen i høyest mulig grad skal fungere
normalt for avsender når denne type hendelser blir håndtert.

Normalt vil meldinger til Postkasseleverandørene mellomlagres i sekunder
eller opp til noen minutter (10 til 15 minutter).  
For kvitteringsmeldinger til Avsender så er mellomlagringstiden avhengig
av hvor ofte Avsender henter kvitteringene, les mer om dette i
kapittelet nedenfor.

Maksimal tid for mellomlagring er definert slik:

  - normal melding  
    Mellomlagres i opptil 25+5 dager
  - prioritert melding  
    Mellomlagres i opptil 24 timer

Denne lange mellomlagringstiden er kun aktuell i spesielle tilfeller der
en aktør har en feil, eller det på annen måte er behov for manuell
oppfølging av en melding for å få ferdigbehandlet den.

#### Intervall mellom kvitteringsforespørsler

Ved [KvitteringsForespoersel](KvitteringsForespoersel.md) så er det
forventet at man respekterer følgende intervaller mellom hver
forespørsel når forrige forespørsel returnerte at det er ikke er
meldinger å hente:

  - normal  
    Vent minst 10 minutter før neste forespørsel
  - prioritert  
    Vent minst 1 minutter før neste forespørsel

#### Duplikate meldinger/resending av mendlinger

Automatisk resending av en melding som ikke er kommet fram er en valgfri
opsjon i AS4. Dersom en avsendervirksomhet benytter seg av denne type
funksjonalitet, så skal denne gjøres i henhold til AS4 profilen.

Merk at det er et klart skille mellom å resende en melding automatisk i
AS4/MSH og resending fra fagsystemet/avsender. Dersom fagsystemet
resender en melding så er dette en ny melding for
meldingsutvekslingsrammeverket og skal ikke ha samme MessageId som
forrige melding.

Duplikatsjekk skjer i henhold til AS4 standarden ved at MessageId skal
være unik. Det blir ikke gjort semantisk/innholdssjekk for å finne
duplikater.

### Eksempler

Det er utarbeidet eksempler på SOAP meldinger knyttet til flyt
diagrammet over.  
Eksemplene finnes (Link til eksempler her(../../eksempler/soap/)).
