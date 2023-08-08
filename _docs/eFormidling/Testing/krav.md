---
title: Krav og testbeskrivelser - UTKAST
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Formålet med denne siden er å gi en oversikt over krav til integrasjoner mot eFormidling, med tilhørende testbeskrivelser.

Informasjon om nødvendig testoppsett finnes på [Kom i gang med testing](https://docs.digdir.no/docs/eFormidling/Testing/).

1. TOC
{:toc}

## Felleskrav

Disse kravene gjelder uavhengig av hvilke prosess(er) som støttes.

### Støtter visning av siste status for sendt melding (MÅ)

1. Verifiser at bruker som sendte meldingen kan se siste status for denne

### Støtter varsling av avsender for meldinger som får status feilet eller levetid utløpt (MÅ)

1. Fyll inn utilstrekkelige eller feil  metadata for melding i egen løsning
2. Send melding til annen mottaker som bruker eFormidling
3. Verifiser at meldingen blir markert som feilet i egen løsning
4. Verifiser at bruker som sendte meldingen får beskjed om at melding feilet uten å kreve at bruker selv aktivt sjekker status for meldingen

Pass på at følgende kategorier feil håndteres:

- synkron feil, for eksempel dersom adresseoppslag feiler
- asynkron feil, for eksempel dersom autentisering feiler mot aktuell meldingstjeneste
- levetid utløpt, for eksempel dersom mottaker lar være/klarer ikkje behandle melding, send f.eks. til qa-integrasjonspunkt og vent til levetid utløper

### Støtter visning av sendte meldinger og status for disse (MÅ)

1. Fyll inn utilstrekkelige eller feil  metadata for melding i egen løsning
2. Send melding til annen mottaker som bruker eFormidling
3. Verifiser at bruker selv kan vise en liste over forsendelser som har feilet
4. Verifiser at den feilede meldingen er i denne listen

### Bruker grensesnittet eFormidling 2 som beskrevet i dokumentasjonen (MÅ)

1. Verifiser at integrasjonspunktets API (eFormidling 2) brukes
2. Verifiser at integrasjonspunktets gamle API (BEST/EDU) ikke brukes
3. Verifiser at en har en gjennomtenkt strategi for å sende meldinger
4. Verifiser at en har en gjennomtenkt strategi for å følge med på status for sendte meldinger
5. Verifiser at en har en gjennomtenkt strategi for å motta meldinger
6. Verifiser at en har lagt til rette for feilsøking ved å oppgi navn og versjon for eget system ved oppretting av melding
7. Verifiser at en ikke bruker ettstegs strategi for sending av små meldinger dersom en skal sende meldinger over 5mb
8. Verifiser at polling brukes ved mottak av innkommende statuser (webhook-abonnement er bare et supplement)
9. Verifiser at polling brukes ved mottak av innkommende meldinger (webhook-abonnement er bare et supplement)
10. Verifiser at en ikke behandler vellykket bekreftelse på at melding er lagt på kø for sending som at meldingen er sendt eller levert vellykket
11. Verifiser at en ikke behandler vellykket bekreftelse på at melding er sendt som at meldingen er levert vellykket

### Dersom på-vegne-av brukes, så er dette oppsettet testet (MÅ)

1. Verifiser at aktuelle tester er gjennomført med på-vegne-av-oppsett

### Dersom kanal brukes, så er dette oppsettet testet (MÅ)

1. Verifiser at aktuelle tester er gjennomført med kanal-oppsett

### Produserer og konsumerer meldinger som forventet (MÅ)

1. Verifiser at kommunikasjon fungerer også med andre løsninger enn ens egen
2. Verifiser at spesialtegn fungerer som forventet i titler, filnavn, osv
3. Verifiser at begrensninger som lengder på tekstfelt fungerer som forventet
4. Verifiser at sending og mottak fungerer når bare påkrevd informasjon er oppgitt
5. Verifiser at sending og mottak fungerer når all mulig informasjon er oppgitt
6. Verifiser at kommunikasjon fungerer med ønskede filstørrelser
7. Verifiser at kommunikasjon fungerer med ønskede filformat
8. Verifiser at gyldige meldinger produseres både når all informasjon er oppgitt og når bare påkrevd informasjon er oppgitt
9. Verifiser at innkommende meldinger ikke valideres strengt og at en kan ta imot innkommende meldinger med mangler
10. Verifiser at en ikke sender filer med navn som inneholder tegn som ikke fungerer bra i filnavn, for eksempel kolon

## Krav til eventuell drift av integrasjonspunkt

Disse kravene gjelder eventuell drift av integrasjonspunkt.

### Har tilfredsstillende tilgangskontroll og sikring av grensesnitt, meldinger og hemmeligheter (MÅ)

1. Verifiser at installsjon og konfigurasjon er gjort i henhold til beskrivelser
2. Verifiser at transport er tilstrekkelig sikret, f.eks. med hjelp av transportsikring
3. Verifiser at tilgang til grensesnittet er tilstrekkelig sikret, f.eks. med hjelp av HTTP basic auth
4. Verifiser at hemmeligheter beskyttes tilfredsstillende, f.eks. med hjelp av Hashicorp Vault
5. Verifiser at integrasjonspunktets grensesnitt bare er tilgjengelig for autoriserte brukere og system

### Har rutiner for å holde integrasjonspunktet oppdatert (MÅ)

1. Verifiser at det finnes en rutine for jevnlig oppdatering av integrasjonspunktet

### Har automatiserte rutiner for å holde integrasjonspunktet oppdatert (KAN)

1. Verifiser at automatisk oppdatering er konfigurert
2. Verifiser at oppdateringstidspunkt er gjennomtenkt

## Saksbehandling

Disse kravene gjelder dersom [saksbehandling](../Funksjonalitet/saksbehandling) støttes.

### Støtter sending til mottakere med eFormidling (DPO) (MÅ)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som bruker  eformidling
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til annen løsning
5. Verifiser at innholdet i annen løsning er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning
7. Marker melding som lest i annen løsning (varierer fra løsning til løsning hvordan - f.eks. først ved tilordning av saksnummer)<br>8. Verifiser at meldingen blir markert som lest i egen løsning

### Støtter sending til mottakere med KS SvarUt/SvarInn (DPF) (MÅ)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som bruker  KS SvarUt/SvarInn
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til annen løsning
5. Verifiser at innholdet i annen løsning er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning
7. Marker melding som lest i annen løsning (varierer fra løsning til løsning hvordan - f.eks. først ved tilordning av saksnummer)
8. Verifiser at meldingen blir markert som lest i egen løsning

### Støtter sending til mottakere med Altinn Digital Post (DPV) (MÅ)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som bruker  Altinn Digital Post
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til annen løsning
5. Verifiser at innholdet i annen løsning er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning
7. Marker melding som lest i annen løsning (varierer fra løsning til løsning hvordan - f.eks. først ved tilordning av saksnummer)
8. Verifiser at meldingen blir markert som lest i egen løsning

### Støtter mottak fra avsendere med eFormidling (DPO) (MÅ)

1. Fyll inn ønsket metadata for melding i annen løsning som bruker eFormidling (husk 1.7)
2. Send melding til mottaker som bruker egen løsning
3. Verifiser at meldingen blir markert som sendt i annen løsning
4. Verifiser at meldingen kommer frem til egen løsning
5. Verifiser at innholdet i egen løsning er som forventet (husk 1.7)
6. Verifisert at meldingen blir markert som mottat og etterhvert levert i annen løsning
7. Marker melding som lest i egen løsning<br>8. Verifiser at meldingen blir markert som lest i annen løsning

### Støtter mottak fra avsendere med KS SvarUt/SvarInn (DPF) (MÅ)

1. Fyll inn ønsket metadata for melding i annen løsning som bruker SvarUt (husk 1.7)
2. Send melding til mottaker som bruker egen løsning
3. Verifiser at meldingen blir markert som sendt i SvarUt
4. Verifiser at meldingen kommer frem til egen løsning
5. Verifiser at innholdet i egen løsning er som forventet (husk 1.7)
6. Verifisert at meldingen blir markert som mottat og etterhvert levert i SvarUt
7. Marker melding som lest i egen løsning
8. Verifiser at meldingen blir markert som lest i SvarUt

### Støtter å motta svar direkte på sak og journalpost (BØR)

1. Fyll inn ønsket metadata for melding i egen løsning
2. Send melding til annen mottaker som bruker eFormidling
3. Verifiser at meldingen kommer frem til annen løsning
4. Svar på meldingen fra annen løsning
5. Verifiser at svaret kommer frem til egen løsning, koblet til sak og journalpost som forventet

### Støtter å sende svar direkte til sak og journalpost (BØR)

1. Fyll inn ønsket metadata for melding i annen løsning som bruker eFormidling
2. Send melding til mottaker som bruker egen løsning
3. Verifiser at meldingen kommer frem til egen løsning
4. Svar på meldingen fra egen løsning
5. Verifiser at svaret kommer frem til annen løsning, koblet til sak og journalpost som forventet

## Taushetsbelagt saksbehandling

Disse kravene gjelder dersom [taushetsbelagt saksbehandling](../Funksjonalitet/taushetsbelagt_saksbehandling) støttes.

### Støtter sending av taushetsbelagt melding (MÅ)

1. Verifiser at sending av melding fungerer på samme måte som ved saksbehandling
2. Verifiser at det er mulig å oppgi varslingstekst for taushetsbelagt melding

### Støtter mottak av taushetsbelagt melding (MÅ)

1. Verifiser at mottak av melding fungerer på samme måte som ved saksbehandling

## Vedtak til innbyggere

Disse kravene gjelder dersom [vedtak til innbyggere](../Funksjonalitet/vedtak_til_innbygger) støttes.

### Støtter sending til mottakere med DPI (MÅ)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Verifiser at det er mulig å oppgi varslingstekst
3. Send melding til mottaker som bruker  DPI
4. Verifiser at meldingen blir markert som sendt i egen løsning
5. Verifiser at meldingen kommer frem til DPI
6. Verifiser at innholdet i DPI er som forventet (husk 1.7)
7. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning

### Støtter sending til mottakere med Altinn Digital Post (DPV) (BØR)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Verifiser at det er mulig å oppgi varslingstekst
3. Send melding til mottaker som bruker  DPV
4. Verifiser at meldingen blir markert som sendt i egen løsning
5. Verifiser at meldingen kommer frem til DPV
6. Verifiser at innholdet i DPV er som forventet (husk 1.7)
7. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning

### Støtter sending til mottakere med postadresse (print) (BØR)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til mottaker som verken bruker DPI eller DPV
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til print
5. Verifiser at innholdet i print er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning

### Støtter sending til mottaker med postadresse (print) og ukjent fødselsnummer (BØR)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som verken bruker DPI eller DPV
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til print
5. Verifiser at innholdet i print er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning

### Støtter DPI-utvidelsen "lenke utenfor brev" (KAN)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som bruker DPI
3. Verfiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til DPI
5. Verifiser at innholdet i meldingen er som forventet (husk 1.7)
6. Verifiser at lenke utenfor brev fungerer som forventet

### Støtter DPI-utvidelsen "bevis" (KAN)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som bruker DPI
3. Verfiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til DPI
5. Verifiser at innholdet i meldingen er som forventet (husk 1.7)
6. Verifiser at bevis fungerer som forventet

### Støtter DPI-utvidelsen "arrangement" (KAN)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til annen mottaker som bruker DPI
3. Verfiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til DPI
5. Verifiser at innholdet i meldingen er som forventet (husk 1.7)
6. Verifiser at arrangement fungerer som forventet

### Støtter konfigurasjon av avsenderidentifikator for DPI (MÅ)

1. Verifiser at det er mulig å konfigurere avsenderidentifikator for DPI

## Publisering av møte til eInnsyn

Disse kravene gjelder dersom [publisering av møte til eInnsyn](../Funksjonalitet/mote) støttes.

### Støtter publisering av møte til eInnsyn (MÅ)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til eInnsyn
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til eInnsyn
5. Verifiser at innholdet i eInnsyn er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning

## Publisering av journalpost til eInnsyn

Disse kravene gjelder dersom [publisering av journalpost til eInnsyn](../Funksjonalitet/journalpost) støttes.

### Støtter publisering av journalpost til eInnsyn (MÅ)

1. Fyll inn ønsket metadata for melding i egen løsning (husk 1.7)
2. Send melding til eInnsyn
3. Verifiser at meldingen blir markert som sendt i egen løsning
4. Verifiser at meldingen kommer frem til eInnsyn
5. Verifiser at innholdet i eInnsyn er som forventet (husk 1.7)
6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning

## Mottak av innsynskrav fra eInnsyn

Disse kravene gjelder dersom [mottak av innsynskrav fra eInnsyn](../Funksjonalitet/innsynskrav) støttes.

### Støtter mottak av innsynskrav fra eInnsyn (MÅ)

1. Send innsynskrav fra eInnsyn
2. Verifiser at innsynskravet kommer frem til egen løsning
3. Verifiser at innholdet i innsynskravet er som forventet (husk 1.7)
