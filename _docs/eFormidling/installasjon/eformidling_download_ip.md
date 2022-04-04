---
title: Installasjonsveiledning for integrasjonpunktet
description: Hvordan komme i gang med integrasjonspunktet
summary: "Hvordan man oppgraderer integrasjonspunktet til ny versjon."


product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_download_ip
---

### Siste versjon av integrasjonspunktet
 

### [Integrasjonspunktet 2.5.0 (JAR)](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/2.5.0/integrasjonspunkt-2.5.0.jar)

### [Integrasjonspunktet 2.5.0 (Docker container image) ](https://hub.docker.com/layers/integrasjonspunkt/digdir/integrasjonspunkt/2.5.0/images/sha256-ed1ba301e7d673dc3b1d56dcffa04c9a1515078b26887852e3ae227a93f47b6d?context=explore)



[OBS. F.o.m versjon 2.2.1 kreves det ny brannmuråpning.](https://docs.digdir.no/eformidling_forutsetninger.html#brannmur%C3%A5pninger-i-produksjon)

___

### [Endringslogg]({{site.baseurl}}/docs/eFormidling/Selvhjelp/eformidling_releasenotes)
___

### Versjonering 

eFormidling følger [semantisk versjonering](https://semver.org) for å vise endringer mellom forskjellige versjoner. 


En distribusjon av integrasjonspunktet inneholder navnet på komponenten, versjonsnummer og filtype som i dette eksemplet:
integrasjonspunkt-2.0.7.jar

![versjonsnummerbild]({{site.baseurl}}/images/eformidling/ipversjon.PNG)


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

