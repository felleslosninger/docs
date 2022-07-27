---
title: Installasjonsveiledning for integrasjonpunktet
description: Hvordan komme i gang med integrasjonspunktet
summary: "Hvordan man oppgraderer integrasjonspunktet til ny versjon."


product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_download_ip
---

### Siste versjon av integrasjonspunktet
 

### [Integrasjonspunktet 2.8.2 (JAR)](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/2.8.2/integrasjonspunkt-2.8.2.jar)

### [Integrasjonspunktet 2.8.2 (Docker container image) ](https://hub.docker.com/layers/integrasjonspunkt/digdir/integrasjonspunkt/2.8.2/images/sha256-9fab05b1216e8e6df56ee75208d1d94d89450efbc7729cd2464f3ab0040f4ce0?context=explore)

```docker pull digdir/integrasjonspunkt:2.8.2```


[OBS. F.o.m versjon 2.2.1 kreves det ny brannmuråpning.](https://docs.digdir.no/eformidling_forutsetninger.html#brannmur%C3%A5pninger-i-produksjon)

___

### [Endringslogg]({{site.baseurl}}/docs/eFormidling/Selvhjelp/eformidling_releasenotes)
___

### Versjonering 

eFormidling følger [semantisk versjonering](https://semver.org) for å vise endringer mellom forskjellige versjoner. 


En distribusjon av integrasjonspunktet inneholder navnet på komponenten, versjonsnummer og filtype som i dette eksempelet:
integrasjonspunkt-2.0.7.jar

![versjonsnummerbild]({{site.baseurl}}/images/eformidling/ipversjon.PNG)


Versjonsnummer er angitt i formatet MAJOR.MINOR.PATCH

**PATCH** inneholder bakoverkompatible bug fixer. Med bugfix menes intern endring av uønsket oppførsel eller feil. Dette er versjoner man kan installere uten at man vil merke endringer 

**MINOR** har ny funksjonalitet, men er bakoverkompatibel. Her er det lagt til ny funksjonalitet eller gjort endring på eksisterende funksjonalitet uten at dette påvirker konsumenter av API'et. Denne vil også økes dersom det det er funksjonalitet som er ønsket fjernet i senere versjon (deprecated). En MINOR-oppdatering vil ikke endre eksisterende integrasjoner, men det kan være nyttig å teste ny funksjonalitet dersom dette er tilgjengelig gjennom integrasjonen man bruker.

**MAJOR** har endringer som ikke er bakoverkompatible.  Dette kan være endringer i hvordan API'et brukes eller fjerning av funksjonalitet, som tidligere er signalisert at vil fjernes gjennom Minor-release og API-kommentar. En Major-oppdatering vil føre til at hele eller deler av funksjonaliteten man bruker ikke lenger virker, og det vil derfor være viktig å forsikre seg om at det man trenger virker som forventet gjennom testing eller dialog med leverandør av fagsystemet som integrerer mot integrasjonspunktet.


## Komme igang

For å ta i bruk integrasjonspunktet må du gjennomføre listen under:

1. Installere Java 8
2. Anskaffe virksomhetssertifikat for test og produksjon
3. Skru på ekspederingskanal for BestEdu i Sak-/Arkivsystemet (Gjelder ikke for eInnsyn)
4. Gjøre lokalt oppsett for integrasjonpunktet
5. Sørg for å holde server i Sync med NTP

