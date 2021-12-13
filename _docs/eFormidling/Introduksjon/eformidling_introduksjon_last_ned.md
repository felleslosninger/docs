---
title: Last ned
description: ""
summary: ""
permalink: eformidling_introduksjon_last_ned.html
product: eFormidling
sidebar: eformidling_sidebar
---

Last ned Integrasjonspunktet som .jar-fil eller Docker image. Last ned KOSMOS som .jar-fil. 

## Integrasjonspunktet

> [**Integrasjonspunktet 2.2.6 (JAR)**](https://repo1.maven.org/maven2/no/difi/meldingsutveksling/integrasjonspunkt/2.2.6/integrasjonspunkt-2.2.6.jar)

> [**Integrasjonspunktet 2.2.6 (Docker container image)** ](https://hub.docker.com/layers/digdir/integrasjonspunkt/2.2.6/images/sha256-2b462e7d699b2dfbc0495e58c2dc54cb289d641611ae8f48240620594e769153?context=explore)


[OBS. F.o.m versjon 2.2.1 kreves det ny brannmuråpning.](https://docs.digdir.no/eformidling_forutsetninger.html#brannmur%C3%A5pninger-i-produksjon)


---

## KOSMOS

> [**KOSMOS 1.1.0 (JAR)**](https://repo1.maven.org/maven2/no/difi/move/kosmos/1.1.0/kosmos-1.1.0.jar)

> [**Signaturen finn du her**](https://repo1.maven.org/maven2/no/difi/move/kosmos/1.1.0/kosmos-1.1.0.jar.asc)

> [**Last ned offentleg nøkkel**](/resources/eformidling/public_keys/eformidling-key.asc)

---

## Versjonering 

eFormidling følger [semantisk versjonering] (https://semver.org) for å vise endringer mellom forskjellige versjoner. 


En distribusjon av integrasjonspunktet inneholder navnet på komponenten, versjonsnummer og filtype som i dette eksemplet:
integrasjonspunkt-2.0.7.jar

![versjonsnummerbild](/images/eformidling/ipversjon.PNG)


Versjonsnummer er angitt i formatet MAJOR.MINOR.PATCH

**PATCH** inneholder bakoverkompatible bug fixer. Med bugfix menes intern endring av uønsket oppførsel eller feil. Dette er versjoner man kan installere uten at man vil merke endringer 

**MINOR** har ny funksjonalitet, men er bakover kompatibel. Her er det lagt til ny funksjonalitet eller gjort endring på eksisterende funksjonalitet uten at dette påvirker konsumenter av API'et. Denne vil også økes dersom det det er funksjonalitet som er ønsket fjernet i senere versjon (deprecated). En MINOR-oppdatering vil ikke endre eksisterende integrasjoner, men det kan være nyttig å teste ny funksjonalitet dersom dette er tilgjengelig gjennom integrasjonen man bruker.

**MAJOR** har endringer som ikke er bakover kompatible.  Dette kan være endringer i hvordan API'et brukes eller fjerning av funksjonalitet, som tidligere er signalisert at vil fjernes gjennom Minor-release og API-kommentar. En Major-oppdatering vil føre til at hele eller deler av funksjonaliteten man bruker ikke lenger virker og vil derfor være viktig å forsikre seg om at det man trenger virker som forventet gjennom testing eller dialog med leverandør av fagsystemet som integrerer mot integrasjonspunktet.

## Neste steg

Første gang du installerer integrasjonspunktet? Her finner du informasjon om hvordan installere eller oppgradere eksisterende integrasjonspunkt.

- [Integrasjonspunktet installasjon / installere integrasjonspunktet](eformidling_drift_installasjon.html#installasjon-av-integrasjonspunktet)
