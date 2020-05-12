---
title: Opprette brukere til eFormidling
description: Informasjon om hvordan man oppretter brukere for DPF, DPO og DPV
summary: "Informasjon om hvordan man oppretter brukere for DPF, DPO og DPV"
permalink: eformidling_create_users.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

## Det finnes forskjellige brukere

DPO og DPV har hver sin egen bruker. DPF har to, både for SvarInn og SvarUt. 

## Opprette DPO-bruker (Altinn formidlingstjeneste)

(Gjelder bare for digital post til offentlige virksomheter)
Integrasjonspunktet kjører som [datasystem](https://www.altinn.no/no/Portalhjelp/Datasystemer/) mot AltInn's meldingsformidler. Integrasjonspunktet må registeres som et datasystem AltInn's portal. Informasjon om hvordan dette gjøres finnes [her](https://www.altinn.no/no/Portalhjelp/Datasystemer/Registrere-datasystem/). En person som representerer virksomheten må logge inn på Altinn for å gjøre dette.

Når du oppretter datasystemet er det viktig at det gjøres av person som kan representere virksomheten. Hvordan man representerer virksomheten kan du lese [her](https://www.altinn.no/no/Portalhjelp/Hvordan-representere-andre/).

Under opprettelse av datasystem velger du passord og får tildelt brukerid (ID), disse skal senere brukes i properties filen som beskrives lenger nede. Dette er propertyene ```difi.move.dpo.username=``` og ```difi.move.dpo.password=```.

### Eksempel

> Du kan gi datasystemet akkurat det navnet du ønsker. Vi har valgt å kalle den "move". Kall den gjerne eformidling_dittOrganisasjonsnummer eller annet valgfritt navn.

> I nedtrekksmenyen velger du "Formidling"

> Id'en du får er brukernavnet som skal inn i integrasjonspunkt-local.properties. Passordet du velger skal også inn i denne filen. Dette gjelder DPO. 

**Registrere datasystem:**
![](/felleslosninger/images/eformidling/altinnDatasystemRegistrer.PNG)

___

**Datasystem registrert:**


![](/felleslosninger/images/eformidling/altinnDatasystemRegistrert.PNG)

___

Informasjon om hvordan du logger på Altinn portal finner du <a href="https://www.altinn.no/hjelp/innlogging/">https://www.altinn.no/hjelp/innlogging/</a>.

---

## Opprette DPF brukere (SvarInn og SvarUt)

 Når beskrivelsen under er utført må brukernamn/passord for både SvarUt og SvarInn legges inn i integrasjonspunkt-local.properties. I tillegg til alt som er beskrevet i [tabellen her under "Spesifikk for Digital post til kommuner (DPF)"](https://difi.github.io/felleslosninger/eformidling_properties_config.html#digital-post-til-virksomheter). 

Se [Samarbeidsportalen](https://samarbeid.difi.no/felleslosninger/eformidling) for alt om avtaler, begrunnelser, sammenhenger og lignende ikke teknisk. Avtaler må være på plass før en begynner å konfigurere

### Konfigurering av KS SvarUt-forvaltning(avsender)

Forvaltningsgrensesnittet som administrator får tilgang til (informeres om av KS) er laget for kommuner og andre som tar i bruk alle funksjonene i SvarUt og SvarInn.  

KS vil sende påloggingsadresse til administrator etter at virksomheten er opprettet som bruker. Etter pålogging har administrator forskjellige valg: 
 
![bilde1](/felleslosninger/images/eformidling/01_FIKS.png)
 
> Alle eksemplene og skjermbildene er hentet fra oppsettet til FM Nordland. Det gjelder tilsvarende for din virksomhet – bare med deres eget navn og organisasjonsnummer. Det er bare opplysninger som nevnes heretter må utfylles i konfigureringen. 

---

1. Start med «konfigurasjon» (konfigurerer SvarUt-funksjonene) 

**Klikk på «overordnet organisasjon» og legg inn fakturaopplysninger:**

![bilde2](/felleslosninger/images/eformidling/02_FIKS.png)
 
**Klikk så på «underordnet» organisasjonsnivå**

Menypunktene du ser markert med grønn hake skal du klikke deg gjennom og fylle ut. I dette tilfellet er brukernamnet for svarut brukeren vist venstre side av skjermbildet, altså "fm_nordland". Feks: ```difi.move.fiks.ut.username=fm_nordland```.
 
![bilde3](/felleslosninger/images/eformidling/03_FIKS.png) 
 

### ReturAdresse/forside
**Legg inn organisasjonsnummer og adresse. Forsidetekst må ikke fylles ut.** 

### Altinn
**Velg «ingen varsling»** 
 
![bilde4](/felleslosninger/images/eformidling/04_FIKS.png)

### Print
**Velg «manuell print»** 

![bilde5](/felleslosninger/images/eformidling/05_FIKS.png)

### Servicepassord
**Dette er passord nr. 1 dere må notere dere. Passord generes ved å klikke på «generer nytt servicepassord». Pass på at du ikke endrer dette senere ved å klikke på «generer» på nytt!**
 
![bilde6](/felleslosninger/images/eformidling/06_FIKS.png) 

### Tilganger
**Her kan administrator legge til flere brukere som skal ha administratorrettigheter i SvarUt-forvaltning. Sett i så fall hake i alle tilganger.** 

![bilde7](/felleslosninger/images/eformidling/07_FIKS.png)
 
Dere ser bort fra punktene SDP, Edialog og Admin. 

--- 

## Konfigurering av SvarInn (mottakersystem)

**Klikk på «mottakersystem» i menyen på toppen og så på organisasjonen din i menyen på venstre side** 

 
![bilde8](/felleslosninger/images/eformidling/08_FIKS.png) 

---

### Service
**Dette er passord nr. 2 dere må notere dere. Passord generes ved å klikke på «generer nytt servicepassord». Pass på at du ikke endrer dette senere ved å klikke på «generer» på nytt!**  

#### Offentlig nøkkel / virksomhetssertifikat
**Her må en også laste opp den offentlige-nøkkelen til et virksomhetssertifikatet, det kan godt være den samme som integrasjonspunktet bruker.**
 
![bilde9](/felleslosninger/images/eformidling/09_FIKS2.PNG)
 
### Administrasjon
**Dette feltet skal være utfylt på forhånd. Sjekk at e-postadressene er lagt inn rett. De brukes til varsel om driftsproblemer eller hvis KS vil varsle dere om noe de fanger opp som avvik.** 

![bilde10](/felleslosninger/images/eformidling/10_FIKS.png)
  
### Tilganger
**Også her kan det legges til andre brukere.**

### Organisasjoner
**Her legger du inn organisasjonsnummer til virksomheten og eventuelle underenheter. Dette sørger for at elektronisk SvarUt-post sendt til organisasjonsnummer til en underenhet også blir importert til sak/arkiv systemet. Hvis man ikke gjør dette vil slik post fortsette å komme til Altinn. Oversikt over underenhetene og organisasjonsnumre finner du i Altinn.**

> Per i dag støtter ikke eFormidling forsendelser fra underenheter, kun til orgnummeret som er registrert i integrasjonspunktet. Så forsendelser til Svarinn på underorgnummer må hentes manuelt i Svarinn. Funksjonalitet for dette vil komme. Etter planen vil dette være første kvartal 2019.

Man må vente med å legge inn organisasjonsnumrene til konfigurasjon av integrasjonspunktet er utført, fordi SvarUt vil prøve å sende til integrasjonen når numrene er lagt inn. De kan bare legges inn av administrator som har gyldig post/arkiv-rolle for alle organisasjonsnumrene.  
 
![bilde11](/felleslosninger/images/eformidling/11_FIKS.png)

### Sjekke om DPF passord er riktig
Naviger til [KS forsendelseservice](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV6). Her blir du bedt om brukernavn og passord. Tast inn brukernavn og det passordet dere mener å ha fått. Dersom det resulterer i at servicen igjen ber om brukernavn og passord, er passordet galt. Om dere har oppgitt riktig brukernavn og passord får dere en respons som kan variere litt fra nettleser til nettleser.

## Opprette DPV bruker

Dette gjøres av Altinn etter atDigitaliseringsdirektoratet sender bestilling. For atDigitaliseringsdirektoratet skal sende bestillingen må kunden fylle ut et informasjonsskjema. Passord mottas på SMS.

[Informasjonsskjema](https://forms.office.com/Pages/ResponsePage.aspx?id=dV4PJZxZFEaXBwztYRT_xpi569dsKKZOkO1f2ClqM-VUQzlQTzNVSUdLTjVGWFpJNk1ITjBWTkNKSy4u)

[Mer info](https://samarbeid.difi.no/felleslosninger/eformidling/ta-i-bruk-eformidling/1-forberedelser)

--- 
