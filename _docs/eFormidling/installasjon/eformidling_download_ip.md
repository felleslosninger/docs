---
title: Installasjonsveiledning for integrasjonpunktet
description: Hvordan komme i gang med integrasjonspunktet
summary: "Hvordan man oppgraderer integrasjonspunktet til ny versjon."

permalink: eformidling_download_ip.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

### Siste versjon av integrasjonspunktet kan lastes ned her
 
### [Integrasjonspunktet 2.2.1 (JAR)](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/2.2.1/integrasjonspunkt-2.2.1.jar)

### [Integrasjonspunktet 2.2.1 (Docker container image) ](https://hub.docker.com/layers/digdir/integrasjonspunkt/2.2.1/images/sha256-cfa5b7907[…]05e86e31daa16c9a0da893cd3d32fbc2c4068a941fdea?context=explore)
___
### [OBS. F.o.m versjon 2.2.1 kreves det ny brannmuråpning](https://docs.digdir.no/eformidling_forutsetninger.html#brannmur%C3%A5pninger-i-produksjon)

### [Endringslogg](../eformidling_releasenotes.html)
___
### Versjonering 

eFormidling følger semantisk versjonering https://semver.org/ for å vise hvor omfattende endringer mellom forskjellige versjoner er. 


En distribusjon av integrasjonspunktet inneholder navnet på komponenten, versjonsnummer og filtype som i dette eksemplet:
integrasjonspunkt-2.0.7.jar

![versjonsnummerbild](/images/eformidling/ipversjon.PNG)


Versjonsnummer er angitt i formatet MAJOR.MINOR.PATCH

**PATCH** inneholder bakoverkompatible bug fixer. Med bugfix menes intern endring av uønsket oppførsel eller feil. Dette er versjoner man kan installere uten at man vil merke endringer 

**MINOR** har ny funksjonalitet, men er bakover kompatibel. Her er det lagt til ny funksjonalitet eller gjort endring på eksisterende funksjonalitet uten at dette påvirker konsumenter av API'et. Denne vil også økes dersom det det er funksjonalitet som er ønsket fjernet i senere versjon (deprecated). En MINOR-oppdatering vil ikke endre eksisterende integrasjoner, men det kan være nyttig å teste ny funksjonalitet dersom dette er tilgjengelig gjennom integrasjonen man bruker.

**MAJOR** har endringer som ikke er bakover kompatible.  Dette kan være endringer i hvordan API'et brukes eller fjerning av funksjonalitet, som tidligere er signalisert at vil fjernes gjennom Minor-release og API-kommentar.En Major-oppdatering vil føre til at hele eller deler av funksjonaliteten man bruker ikke lenger virker og vil derfor være viktig å forsikre seg om at det man trenger virker som forventet gjennom testing eller dialog med leverandør av fagsystemet som integrerer mot integrasjonspunktet.


## Komme igang

For å ta ibruk integrasjonspunktet må du gjennomføre listen under

1. Installere Java 8
2. Anskaffe virksomhetssertifikat for test og produksjon
3. Skru på ekspederingskanal for BestEdu i Sak-/Arkivsystemet (Gjelder ikke for eInnsyn)
4. Gjøre lokalt oppsett for integrasjonpunktet
5. Sørg for å holde server i Sync med NTP

