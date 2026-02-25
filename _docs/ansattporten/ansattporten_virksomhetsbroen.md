---
title: Virksomhetsbroen
description:  

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_virksomhetsbroen
---

Virksomhetsbroen er grensesnittet hvor arbeidsgivere kan konfigurere hvilke domener, entra-grupper og e-postadresser som kan representere virksomheten der EntraID benytes til innlogging i Ansattporten.

Virksomhetsbroen er en av flere autoritative kilder for representasjon i Ansattporten, og er tiltenkt scenarioer der det ikke er behov for det høye sikkerhetsnivået som tilbys ved bruk av Altinn Autorisasjon.

* TOC
{:toc}

## Funksjonell modell

Virksomhetsbroen har en "additiv" modell for representasjon.  Arbeidsgiver legger inn enn en eller flere regler (filter) som gir tilganger for representasjon.  Reglene gir tilgang basert på ulike identifikator-typer som epost-domene, entra-grupper eller invidivudelle epost-adresser, og tilgangene kan gis til alle tjenester, eller til utvalgte tjenester.

Det er viktig å være klar over at dersom en bruker har fått en tilgang gjennom en spesifikk regel, vil ikke andre regler kunne hindre tilgang.

## Tjenestespesifikke rettigheter

En tjenesteeier kan velge å assosiere ulike *tjenestespesifikke rettigheter* ved en klient som bruker Virksomhetsbroen, for eksempel `les` eller `rapporter`.  Dette er fritekstverdier som da gir kontekstuell mening kun inne i tjenesteeiers tjeneste, for eksempel brukt til tilgangstyring inne i tjenesten.  Tjenesteeier må i sin dokumentasjon fortelle arbeidsgivere at tjenesten støtter og/eller krever slike tjenestespefikke rettigheter, og hvilke verdier som brukes.

De ordinære filter-reglene i Virksomhetsbroen gir *ikke* tilgang til tjenestespesifikke rettigheter.  I stedet må Arbeidsgiver eksplisitt opprette et "tillat"-filter for denne ene spesifikke klient-id'en, og legge på den spesifikke rettigheten.


## Hvordan administere Virksomhetsbroen ?

Den som skal konfigurere dette på vegne av virksomheten må få tildelt rettigheten "Administrere organisasjonstilknytning i Ansattporten" i Altinn. Rettigheten er forhåndstildelt til følgende roller i Enhetsregisteret, men kan delegeres videre:
- Bestyrende reder
- Daglig leder
- Innehaver

## Innlogging

Konfigurasjonen kan utføres via grafisk grensesnitt, og konfigureres per miljø.

For oppsett i Ansattporten sitt PROD-miljø, benytt virksomhetsbroen.samarbeid.digdir.no.

For oppsett i Ansattporten sitt test-miljø, benytt virksomhetsbroen.test.samarbeid.digdir.no

Har du den korrekte rettigheten for flere virksomheter eller underenheter, så vil du få et valg om hvilken virksomhet eller underenhet du vil representere når du logger inn.

## Konfigurasjon

Konfigurasjonen kan skje på forskjellige identifikator-typer.

**E-postadresse:** Brukes for å la enkelte e-postadresser representere virksomheten i Ansattporten. F.eks ansatt.person@digdir.no

**Domene:** Brukes for å la brukere kan representere virksomheten på domenenivå. F.eks digdir.no

**Gruppe:** Brukes for å la brukere representere virksomheten ved hjelp av EntraID-grupper. F.eks ea123b45d-9yt1-iu78-0a0a-99aabbcc999a

Velg hvilken identifikator-type du vil legge til, ved hjelp av fanene.

![Skjermbilde som viser de tilgjenglige fanene]({{site.baseurl}}/assets/ansattporten_virkbro_identifikatortype_fane.png)

## Filtertyper

Filtertyper brukes for fingranulere konfigurasjonen. Per i dag så finnes det 3 filtertyper.

### Tillat alle (Tillatt for alle tjenester)

"Ingen filter" lar brukerne representere virksomheten på alle tjenester i Ansattporten som godtar EntraID.

### Tillat kun (Tillatt for bare angitte tjenester)

"Tillat"-filteret benyttes for å avgrense hvilke klienter brukeren kan representere virksomheten på i Ansattporten.

### Tillat alle utenom (Tillat for alle tjenester utenom X)

"Nekt"-filteret brukes for å angi spesifikke klienter der brukeren ikke kan representere virksomheten på. Da må det legges inn klientID for at filteret skal ha effekt.

## Eksempler på konfigurasjon

### Tillate representasjon (e-postadresse)

For å åpne for at enkelte e-postadresser kan representere virksomheten i EntraID, angi e-postadresse og sett filtertype til "Ingen filter".

I dette eksempelet vil brukeren med e-postadresse ansatt.person@digdir.no kunne representere virksomheten med EntraID i Ansattporten.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_epost_1.png)

### Tillate representasjon på spesifikk klient (e-postadresse)

Dersom du vil la en enkelt e-postadresse representere virksomheten på spesifikke klienter, angi e-postadresse, sett filtertype til "Tillat" og angi KlientID i en kommaseparert liste.

I dette eksempelet vil brukeren med e-postadresse ansatt.person@digdir.no kunne representere virksomheten på klientID 9a99e96d-b56c-4f74-a689-f936f71c8819 med EntraID.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_epost_2.png)

### Tillate representasjon på alle klienter utenom X (e-postadresse)

Dersom du vil la en enkelt e-postadresse representere virksomheten med noen unntak, angi e-postadresse, sett filtertype til "Nekt" og angi KlientID i en kommaseparert liste.

I dette eksempelet vil brukeren med e-postadresse ansatt.person@digdir.no kunne representere virksomheten på alle klienter utenom 9a99e96d-b56c-4f74-a689-f936f71c8819 med EntraID.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_epost_3.png)

### Tillate representasjon (domene)

For å åpne for at alle brukere med et gitt domene kan representere virksomheten, angi domene og sett filtertype til "Ingen filter".

I dette eksempelet vil alle brukere med digdir.no domene kunne representere virksomheten med EntraID i Ansattporten.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_domene_1.png)

### Tillate representasjon kun på spesifikk klient (domene)

Dersom du vil la brukere representere virksomheten på spesifikke klienter,angi domene, sette filtertype til "Tillat" og angi KlientID i en kommaseparert liste.

I dette eksempelet vil brukere med digdir.no domene kunne logge på klientID 9a99e96d-b56c-4f74-a689-f936f71c8819 med EntraID.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_domene_2.png)

### Tillate representasjon på alle klienter utenom X (domene)

For å la brukere representere virksomheten på alle tjenester utenom X, angi domene, sett filtertype til "Nekt" og angi KlientID i en kommaseparart liste.

I dette eksempelet vil brukere med digir.no domene kunne bruke EntraID til å representere virksomheten på alle klienter utenom 9a99e96d-b56c-4f74-a689-f936f71c8819.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_domene_3.png)

### Tillate representasjon (gruppe)

For å åpne for at alle brukere med i en gitt EntraID-gruppe kan representere virksomheten, angi GUID for gruppen og sett filtertype til "Ingen filter".

I dette eksempelet vil alle brukere som ligger i gruppen med ID 1111-1111-1111 kunne representere virksomheten med EntraID i Ansattporten.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_gruppe_1.png)

### Tillate representasjon på spesifikk klient (gruppe)

Dersom du vil la brukere i en utvalgt EntraID-gruppe representere virksomheten på spesifikke klienter, angi GUID for gruppen, sett filtertype til "Tillat" og angi KlientID i en kommaseparert liste.

I dette eksempelet vil alle brukere som ligger i gruppen med ID 1111-1111-1111 kunne representere virksomheten på klientID 9a99e96d-b56c-4f74-a689-f936f71c8819 med EntraID.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_gruppe_2.png)

### Tillate representasjon på alle klienter utenom X (gruppe)

Dersom du vil la brukere i en utvalgt EntraID-gruppe representere virksomheten med noen unntak, angi GUID for gruppen, sett filtertype til "Nekt" og angi KlientID i en kommaseparert liste.

I dette eksempelet vil alle brukere som ligger i gruppen med ID 1111-1111-1111 kunne representere virksomheten på alle klienter utenom 9a99e96d-b56c-4f74-a689-f936f71c8819 med EntraID.

![Skjermbilde som illustrerer den nevnte konfigurasjonen]({{site.baseurl}}/assets/ansattporten_virkbro_gruppe_3.png)

## Relevante spørsmål

### Kan brukere fra virksomheten min logge inn på alle tjenester i Ansattporten med EntraID?

Nei, det er eier av Ansattporten-tjenesten som bestemmer om EntraID kan benyttes til innlogging.

### Jeg jobber i en virksomhet med flere underenheter, kan jeg tilgangsstyre hver enkelt underenhet?

Ja, når du logger inn på virksomhetsbroen kan du velge hvilket organisasjonsnummer du vil konfigurere. Vi støtter både hoved- og underenheter.

### Hvordan vet jeg hvilken klientID jeg skal legge inn i konfigurasjonen?

Ta kontakt med eier av Ansattporten-tjenesten dersom du skal gi tilgang på klientnivå.
