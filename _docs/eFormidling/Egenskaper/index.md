---
title: Egenskaper
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_nm_sikkerhet
---

Formålet med denne siden er å gi en oversikt over hvilke egenskaper eFormidling har.

1. TOC
{:toc}

## Funksjonell egnethet

Behovet eFormidling ønsker å dekke er helt overordnet beskrevet under:

> Løsningen bidrar til en mer sikker, samordnet og effektiv meldingsutveksling. eFormidling gjør det mulig å kommunisere
> på en enkel måte, uten å måtte ta hensyn til om mottakeren er en privat virksomhet, offentlig virksomhet eller
> innbygger.

De grunnleggende oppgavene eFormidling løser for virksomhetene er å sende og motta meldinger i de sammenhenger
virksomheten har behov for og med de krav til meldingsinnhold og funksjon virksomheten har i den enkelte sammenheng.

Digdir erfarer at eFormidling i mange tilfeller dekker oppgavene og målene virksomhetene har innenfor
meldingsutveksling. Samtidig er det - ofte for større virksomheter - en del oppgaver og mål som per i dag ikke
dekkes godt:

- eFormidling mangler en mer finkornet adressering slik at mindre enheter i en virksomhet kan opptre som seg selv og
  slik at det er enklere å fordele meldinger til ulike fagsystem hos virksomheten - dette er et hinder for enkelte
  brukstilfeller
- Virksomhetene mangler mulighet for selv å eksplisitt bestemme hvor de ønsker å motta meldinger i ulike sammenhenger,
  og må derfor forholde seg til valgene eFormidlings forretningslogikk gjør på vegne av virksomhetene
- Private virksomheter mangler enkelt tilgjengelig mulighet for å sende meldinger til virksomheter som bruker eFormidling
- Innbyggere mangler enkelt tilgjengelig mulighet for å sende meldinger til virksomheter som bruker eFormidling

Funksjonaliteten som tilbys av eFormidling fungerer i stor grad som den skal. Det er likevel noen unntak knyttet til
sporadiske feilsituasjoner:

- Meldinger som sendes mellom eFormidling og KS FIKS må gjennom en transformasjon som har medført enkelte problemer for
  enkelte fagsystem
- Fagsystem med mangelfulle integrasjoner mot eFormidling har medført enkelte problemer

Funksjonaliteten i eFormidling legger til rette for effektiv gjennomføring av oppgavene og målene virksomhetene har, men
kan på noen områder bli bedre:

- Enklere feilsøking
- Enklere onboarding
- Selvbetjening

Digdir jobber kontinuerlig med å gjøre eFormidling enda mer egnet til å dekke behovene løsningen skal dekke.

## Ytelse og effektivitet

eFormidlings ytelse og effektivitet er nært knyttet til ytelse og effektivitet for meldingstjenestene som brukes av
eFormidling.

Reell responsivitet målt en vanlig uke (fra og med 2022-05-17 til og med 2022-05-24):

| Tjeneste                      | Bekreftet sendt | Bekreftet levert | Antall levert |
|-------------------------------|-----------------|------------------|---------------|
| Altinn Digital Post           | ~ 8 s           | ~ 43 s           | 11 818        |
| Digital Post til Innbyggere   | ~ 1 s           | ~ 52 s           | 26 335        |
| eInnsyns meldingstjeneste     | ~ 1 s           | ~ 1 t 12 m 3 s   | 156 662       |
| eFormidlings meldingstjeneste | ~ 1 s           | ~ 1 m 44 s       | 2 800         |
| FIKS IO                       | -               | -                | -             |
| KS SvarUt og SvarInn          | ~ 3 s           | ~ 31 s           | 2 767         |

Integrasjonspunktet har relativt beskjeden ressursbruk:

| Ressurs | Anbefaling                                                                                                                                                                                                                                                                                                                                     |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CPU     | Ved vanlig bruk kan integrasjonspunktet fint dele en standard CPU med andre applikasjoner. Ved store meldingsvolum over kort tid (masseutsendelser) medfører kryptooperasjonene samlet at integrasjonspunktet bruker mer CPU. For slike tilfeller anbefales det å gjøre en praktisk test for å utelukke at tilgjengelig CPU er en begrensning. |
| Minne   | 2GB anbefales til integrasjonspunktets JVM. Ved bruk av grensesnittet BEST/EDU er det en klar sammenheng mellom avsatt minne og hvor store meldinger som kan sendes og mottas av integrasjonspunktet og en kan oppleve at integrasjonspunktet krasjer dersom en har for lite avsatt minne.                                                     |
| Disk    | 2 GB dekker omtrent 1 million meldinger ved bruk av intern database og meldingskø                                                                                                                                                                                                                                                              |

Kapasiteten i eFormidling er nær knyttet mot kapasiteten for meldingstjenestene som brukes av eFormidling. I noen få
brukstilfeller er meldingsstørrelse en utfordring. En liten oversikt over terskelverdier:

| Terskelverdi                  | Meldingsstørrelse                                                        |
|-------------------------------|--------------------------------------------------------------------------|
| Altinn Digital Post           | 200 MB                                                                   |
| Digital Post til Innbyggere   | 150 MB                                                                   |
| eInnsyns meldingstjeneste     | 1 MB                                                                     |
| eFormidlings meldingstjeneste | 1 GB dersom både avsender og mottaker bruker eFormidling 2, ellers 75 MB |
| FIKS IO                       | 2 GB                                                                     |
| KS SvarUt og SvarInn          | 1 GB                                                                     |

Throughput er begrenset til throughput for meldingstjenestene som brukes, men dette har ikke vært en utfordring per dags
dato.

## Kompatibilitet

Integrasjonspunktet støttes på alle plattformer som kan kjøre Java eller Docker: Windows, Linux og så videre.
Integrasjonspunktet kjører fint sammen med annen programvare og kan konfigureres til å bruke alternative
nettverksporter, filstier og annet ved eventuelle konflikter.

eFormidling utvikles med tanke på kompatibilitet:

- Kompatibilitet mellom grensesnittene BEST/EDU og eFormidling 2 slik at brukere med det ene grensesnittet kan samhandle
  med brukere av det andre
- Kompatibilitet mellom ulike versjoner av integrasjonspunktet slik at brukere med en versjon kan samhandle med brukere
  av en annen versjon
- Kompatibilitet med andre meldingstjenester slik som KS SvarUt og SvarInn

Likevel er det enkelte utfordringer knyttet til kompatibilitet i eFormidling

- Noen ganger krever ny funksjonalitet som utvikles at alle virksomheter er på en minimumsversjon før den nye
  funksjonaliteten kan tas i bruk
- Ikke alle metadata kan transformeres fra BEST/EDU til eFormidling 2, fra eFormidling til KS SvarUt, og så videre

## Brukervennlighet

I de fleste tilfeller er det enkelt for en virksomhet å se om eFormidling vil dekke deres behov eller ikke, selv om det
i noen tilfeller har vært krevende at eFormidling er en mellomvare. I enkelte tilfeller kan det oppleves uklart om og
hvordan:

- den enkelte funksjonalitet i eFormidling tilbys av fagsystemene som tar i bruk eFormidling
- den enkelte funksjonalitet i meldingstjenestene eFormidling bruker tilbys av eFormidling

eFormidling tilbyr testmiljø som gjør det mulig å lære løsningen risikofritt. I hvilken grad testmiljøet er tilgjengelig
for virksomhetens sluttbrukere avhenger av fagsystemet virksomheten bruker eFormidling fra.

eFormidling tilbyr en godt gjennomarbeidet dokumentasjon blant annet med tanke på å lære eFormidling. Denne
dokumentasjonen er rettet mot arkitekter, utviklere og driftspersonell. I hvilken grad dokumentasjon rettet mot
virksomhetens sluttbrukere er tilgjengelig avhenger av fagsystemet virksomheten bruker eFormidling fra.

Integrasjonspunktet er designet for å være drifts- og utviklervennlig. Konfigurasjonsstyring og
programmeringsgrensesnitt er utformet i tråd med god praksis. Konfigurasjon og API-kall valideres for å hjelpe
driftspersonell og utviklere med å unngå feilsituasjoner. Det jobbes kontinuerlig med å forbedre validering og
feilmeldinger. Brukervennligheten for sluttbrukere avhenger av fagsystemet virksomheten bruker eFormidling fra: hvor
enkelt det er å bruke og kontrollere, hvor godt brukerne beskyttes mot å gjøre feil, i hvilke grad brukergrensesnittet
gir en tilfredsstillende interaksjon for brukerne og hvor godt egnet løsningen er til å oppnå ønsket mål.

## Pålitelighet

Under normal drift er det få feilsituasjoner som oppstår i eFormidling. De vanligste feilsituasjonene er knyttet til
feil konfigurasjon av integrasjonspunktet, feil bruk av integrasjonspunktets grensesnitt og nedetid hos
meldingstjenestene som eFormidling bruker. I tillegg må meldinger som sendes mellom eFormidling og KS FIKS gjennom en
transformasjon som har medført enkelte problemer for enkelte fagsystem.

eFormidlings sentrale komponenter har høy tilgjengelighet og kjører hos profesjonelle driftsleverandører med høye krav
til oppetid. Det samme gjelder meldingstjenestene eFormidling benytter. Integrasjonspunktet kjører svært stabilt så
lenge det er satt av tilstrekkelig minne og brukes et stabilt miljø.

eFormidling er designet for å tåle nedetid i meldingstjenestene som benyttes. Ved mange feilsituasjoner (for
eksempel nettverksrelaterte) vil integrasjonspunktet prøve å sende på nytt i en definert levetid slik at midlertidige
problem ikke krever at avsender må sende på nytt. Etter at levetiden er utgått kastes meldingen og avsender får tilbake
en kvittering om at levetid er utløpt og må håndtere dette ved å sende på nytt eller på annen måte. Avsender styrer selv
levetid.

Integrasjonspunktet leverer statuser for meldinger til en sentral statustjeneste i eFormidling, som lar eFormidling
varsle avsender om eventuelle feilsituasjoner.

eFormidlings sentrale komponenter benytter seg av automatisering, sikkerhetskopier og annet som lar løsningen komme seg
raskt tilbake til normal drift etter en feil. Integrasjonspunktet lar seg sikkerhetskopiere og har helse-endepunkt som
kan benyttes til raskt å oppdage feilsituasjoner slik at det ligger til rette for at den enkelte virksomhet kan reagere
på egen nedetid.

## Sikkerhet

Følgende elementer er i bruk av eFormidling:

- adresseinformasjon inkludert mobiltelefon, e-postadresse og postadresse for innbyggere (behandles også sentralt)
- meldinger som kan inneholde taushetsbelagt eller annen sensitiv informasjon om innbyggere og virksomheter
- meldingsmetadata
- virksomhetssertifikat med privat nøkkel
- brukernavn og passord for enkelte meldingstjenester
- loggdata (behandles også sentralt)

De fleste elementene behandles bare av avsender og mottaker, men noen behandles også sentralt hos eFormidling.

Alle disse elementene har behov for sikring. eFormidlings sikringstiltak er designet ut fra risiko- og sårbarhets-
analyser som gjøres ved jevnlige mellomrom, og etterprøves blant annet ved hjelp av ekstern sikkerhetstest. eFormidling
har en utviklings- og leveranseprosess som vektlegger sikkerhet ved hjelp av kompetanse, testautomatisering,
kontinuerlige sårbarhetsanalyser, kodesignering og mer.

eFormidling er designet for konfidensialitet. Meldinger som sendes med eFormidlings meldingstjeneste eller eInnsyns
meldingstjeneste blir ende-til-ende-kryptert fra avsenders integrasjonspunkt til mottakers integrasjonspunkt. Meldinger
som sendes med Digital Post til Innbyggere blir ende-til-ende-kryptert fra avsenders integrasjonspunkt til mottakers
postkasse-leverandør. De andre meldingstjenestene støtter ikke ende-til-ende-kryptering av meldinger. Meldinger
mellomlagres i kryptert form av integrasjonspunktet ved sending og mottak. Krypteringsnøkler og andre hemmeligheter kan
også lagres i kryptert form. HTTPS transportsikring brukes ved sikring av transport i alle ledd.

eFormidling er designet for integritet. Ved bruk av eFormidlings meldingstjeneste eller eInnsyns meldingstjeneste
signeres meldinger av avsenders integrasjonspunkt og signaturen valideres av mottakers integrasjonspunkt. Ved bruk av
Digital Post til Innbyggere signeres meldinger av avsenders integrasjonspunkt og signaturen valideres av mottakers
postkasse-leverandør. De andre meldingstjenestene støtter ikke signering av meldinger. Mekanismene for tilgangsstyring
av hvem som er autorisert til å sende meldinger varierer avhengig av meldingstjenesten. eFormidlings meldingstjeneste,
eInnsyns meldingstjeneste og Digital Post til Innbyggere benytter OAuth 2.0 med JSON web tokens fra Maskinporten. De
andre meldingstjenestene benytter brukernavn og passord. Integrasjonspunktet er designet for å kjøre i et lukket
miljø som bare gir autoriserte system og brukere tilgang til grensesnittene som tilbys av integrasjonspunktet.
Integrasjonspunktets grensesnitt kan beskyttes av transportsikring og autentisering. Tilgangsstyring for hvem som kan
sende og motta hvilke meldinger implementeres i det enkelte fagsystemet som bruker eFormidling.

En melding kvitteres som levert etter at mottaker har mottatt, validert og lagret meldingen. Dette gjør det sammen med
bruk av signaturer mulig å bevise for avsender at en gitt melding har blitt mottatt og for mottaker at en gitt melding
har blitt sendt.

## Vedlikeholdbarhet

eFormidlings er designet for at prosesser, meldingstjenester eller dokumenttyper kan vedlikeholdes uavhengig av
hverandre, og at de vedlikeholdes et sted istedenfor hos hver enkelt virksomhet. Når meldingstjenestene som
brukes en sjelden gang faser ut eller bryter sine grensesnitt vil eFormidling implementere endringene slik at det eneste
virksomheten må gjøre er å oppgradere integrasjonspunktet. Det samme gjelder regelverksendringer (for eksempel endringer
i eForvaltningsforskriften) og endringer i god praksis (for eksempel anbefalinger fra Digitaliseringsrundskrivet).

eFormidling har sentralisert funksjonalitet for varsling, logg og overvåkning i tillegg til at integrasjonspunktene hos
virksomhetene har funksjonalitet som lar virksomhetene benytte egne system for varsling, logg og overvåking av egne
integrasjonspunkt. Dette gjør det mulig å effektivt feilsøke, vurdere påvirkning av en endring på løsningen, med mer.

De sentrale komponentene i eFormidling oppdateres uten nedetid. Oppgradering av virksomhetens integrasjonspunkt medfører
en kort nedetid for det aktuelle integrasjonspunktet. Automatisk oppgradering av integrasjonspunktet på
forhåndsdefinerte tidspunkt støttes. Integrasjonspunktet utvikles med mål om ikke å bryte API-grensesnitt eller
konfigurasjon fra versjon til versjon.

Testmiljø, dokumentasjon og testkriterier legger til rette for effektiv testing av eFormidling. 

## Portabilitet

Integrasjonspunktet kan kjøres i alle miljø som kan kjøre Java eller Docker. Virksomheten kan kjøre et eller flere
integrasjonspunkt selv, eller lar en leverandør opptre på vegne av seg. Integrasjonspunktet lar seg enkelt
installere, avinstaller og flytte. Direkteintegrasjoner mot enkelte av meldingstjenestene kan erstattes med
integrasjonspunktet ved ønske om å ta i bruk eFormidlings funksjonalitet eller dra nytte av eFormidlings egenskaper.

## Neste steg

- [Kom i gang](../Introduksjon/kom_i_gang)
