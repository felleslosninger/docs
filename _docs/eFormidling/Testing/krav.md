---
title: Krav og testbeskrivelser
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Formålet med denne siden er å gi en oversikt over krav til integrasjoner mot eFormidling, med tilhørende testbeskrivelser.


1. TOC
{:toc}

TODO henvisninger fra kravtabell til relevante sider i dokumentasjonen

## Felleskrav

Disse kravene gjelder uavhengig av hvilke prosess(er) som støttes.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |
| Støtter visning av siste status (opprettet, sendt, mottatt, levert, levetid utløpt, feil, lest) for sendte meldinger | Må | Dekkes gjennom andre tester | |
| Støtter varsling av avsender for meldinger som får status feilet eller levetid utløpt | Må | 1. Fyll inn utilstrekkelige eller feil  metadata for melding i egen løsning<br>2. Send melding til annen mottaker som bruker eFormidling<br>3. Verifiser at meldingen blir markert som feilet i egen løsning<br>4. Verifiser at bruker som sendte meldingen får beskjed om at melding feilet uten å kreve at bruker selv aktivt sjekker status for meldingen | Pass på at følgende feil håndteres<br>- synkron feil, for eksempel dersom adresseoppslag feiler<br>- asynkron feil, for eksempel dersom autentisering feiler mot aktuell meldingstjeneste<br>- levetid utløpt, for eksempel dersom mottaker lar være/klarer ikkje behandle melding, send f.eks. til qa-integrasjonspunkt og vendt til levetid utløper |
| Støtter visning av sendte meldinger og status for disse (for eksempel alle meldinger som har status feil og levetid utløpt) | Må | 1. Fyll inn utilstrekkelige eller feil  metadata for melding i egen løsning<br>2. Send melding til annen mottaker som bruker eFormidling<br>3. Verifiser at bruker selv kan vise en liste over feilede forsendelser<br>4. Verifiser at den feilede meldingen er i denne listen | |
| Bruker grensesnittet eFormidling 2 som beskrevet i dokumentasjonen | Må | 1. Verifiser at integrasjonspunktets API (eFormidling 2) brukes<br>2. Verifiser at integrasjonspunktets gamle API (BEST/EDU) ikke brukes<br>3. Verifiser at en har en gjennomtenkt strategi for å sende meldinger<br>4. Verifiser at en har en gjennomtenkt strategi for å følge med på status for sendte meldinger<br>5. Verifiser at en har en gjennomtenkt strategi for å motta meldinger<br>6. Verifiser at en har lagt til rette for feilsøking ved å oppgi navn og versjon for eget system ved oppretting av melding | Unngå:<br>- ettstegs strategi for sending av små meldinger dersom en skal sende meldinger over 5mb<br>- å bare bruke supplerende webhook-abonnement for innkommende statuser<br>- å bare bruke supplerende webhook-abonnement for innkommende meldinger<br>- å behandle vellykket bekreftelse på melding lagt på kø for sending som at meldingen er sendt eller levert vellykket<br>- å behandle vellykket bekreftelse på melding sendt som at meldingen er levert vellykket |
| Dersom på-vegne-av brukes, så er dette oppsettet testet | Må | 1. Verifiser at på-vegne-av er testet | |
| Dersom kanal brukes, så er dette oppsettet testet | Må | 1. Verifiser at kanal er testet | |

## Krav til eventuell drift av integrasjonspunkt

Disse kravene gjelder eventuell drift av integrasjonspunkt.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |
| Har tilfredsstillende tilgangskontroll og sikring av grensesnitt, meldinger og hemmeligheter | Må | 1. Verifiser at installsjon og konfigurasjon er gjort i henhold til beskrivelser<br>2. Verifiser at transport er tilstrekkelig sikret, f.eks. med hjelp av transportsikring<br>3. Verifiser at tilgang til grensesnittet er tilstrekkelig sikret, f.eks. med hjelp av HTTP basic auth<br>4. Verifiser at hemmeligheter beskyttes tilfredsstillende, f.eks. med hjelp av Hashicorp Vault | Unngå:<br>- å eksponere grensesnittet for brukere og system som ikke er autorisert for tilgang til grensesnittet |
| Har rutiner for å holde integrasjonspunktet oppdatert | Må | 1. Verifiser at det finnes en rutine for jevnlig oppdatering av integrasjonspunktet | |
| Har automatiserte rutiner for å holde integrasjonspunktet oppdatert | Kan | 1. Verifiser at automatisk oppdatering er konfigurert<br>2. Verifiser at oppdateringstidspunkt er gjennomtenkt | |

## Saksbehandling

Disse kravene gjelder dersom saksbehandling støttes.

TODO omstrukturere slik at ein slepp samme kommentar for alt (kommentar "som over")

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |
| Støtter sending til mottakere med eFormidling (DPO) | Må | 1. Fyll inn ønsket metadata for melding i egen løsning<br>2. Send melding til annen mottaker som bruker  eformidling <br>3. Verifiser at meldingen blir markert som sendt i egen løsning<br>4. Verifiser at meldingen kommer frem til annen løsning<br>5. Verifiser at innholdet i annen løsning er som forventet<br>6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning<br>7. Marker melding som lest i annen løsning (varierer fra løsning til løsning hvordan - f.eks. først ved tilordning av saksnummer)<br>8. Verifiser at meldingen blir markert som lest i egen løsning | Pass på:<br>- Verifiser at det fungerer også med andre løsninger enn sin egen<br>- Verifiser at spesialtegn fungerer som forventet i titler, filnavn, osv<br>- Verifiser at begrensninger som lengde på tekstfelt fungerer som forventet<br>- Verifiser at det fungerer når bare påkrevd informasjon er  oppgitt<br>- Verifiser at det fungerer når all påkrevd informasjon er  oppgitt<br>- Verifiser at det fungerer med ønska filstørrelser<br>- Verifiser at det fungerer med ønska filformat<br>- Verifiser at det produseres gyldig arkivmelding ihht. beskrivelse på<br><br>- unngå streng validering av innkommende melding, sikre at utgående melding validerer<br>- unngå tegn som ikkje fungerer bra i filnavn<br>- verifiserer at SBD og arkivmelding validerer ihht dokumenttype, ibåde når all informasjon er oppgitt og når bare påkrevd informasjon er oppgitt<br>- verifiser at en kan ta imot innhold med mangler |
| Støtter sending til mottakere med KS SvarUt/SvarInn (DPF) | Må | 1. Fyll inn ønsket metadata for melding i egen løsning<br>2. Send melding til annen mottaker som bruker  KS SvarUt/SvarInn <br>3. Verifiser at meldingen blir markert som sendt i egen løsning<br>4. Verifiser at meldingen kommer frem til annen løsning<br>5. Verifiser at innholdet i annen løsning er som forventet<br>6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning<br>7. Marker melding som lest i annen løsning (varierer fra løsning til løsning hvordan - f.eks. først ved tilordning av saksnummer)<br>8. Verifiser at meldingen blir markert som lest i egen løsning | Som over |
| Støtter sending til mottakere med Altinn Digital Post (DPV) | Må | 1. Fyll inn ønsket metadata for melding i egen løsning<br>2. Send melding til annen mottaker som bruker  Altinn Digital Post<br>3. Verifiser at meldingen blir markert som sendt i egen løsning<br>4. Verifiser at meldingen kommer frem til annen løsning<br>5. Verifiser at innholdet i annen løsning er som forventet<br>6. Verifiser at meldingen blir markert som mottatt og etterhvert levert i egen løsning<br>7. Marker melding som lest i annen løsning (varierer fra løsning til løsning hvordan - f.eks. først ved tilordning av saksnummer)<br>8. Verifiser at meldingen blir markert som lest i egen løsning | Som over |
| Støtter mottak fra avsendere med eFormidling (DPO) | Må | 1. Fyll inn ønsket metadata for melding i annen løsning som bruker eFormidling<br>2. Send melding til mottaker som bruker egen løsning<br>3. Verifiser at meldingen blir markert som sendt i annen løsning<br>4. Verifiser at meldingen kommer frem til egen løsning<br>5. Verifiser at innholdet i egen løsning er som forventet<br>6. Verifisert at meldingen blir markert som mottat og etterhvert levert i annen løsning<br>7. Marker melding som lest i egen løsning<br>8. Verifiser at meldingen blir markert som lest i annen løsning | Som over |
| Støtter mottak fra avsendere med KS SvarUt/SvarInn (DPF) | Må | 1. Fyll inn ønsket metadata for melding i annen løsning som bruker SvarUt<br>2. Send melding til mottaker som bruker egen løsning<br>3. Verifiser at meldingen blir markert som sendt i SvarUt<br>4. Verifiser at meldingen kommer frem til egen løsning<br>5. Verifiser at innholdet i egen løsning er som forventet<br>6. Verifisert at meldingen blir markert som mottat og etterhvert levert i SvarUt<br>7. Marker melding som lest i egen løsning<br>8. Verifiser at meldingen blir markert som lest i SvarUt | Som over |
| Støtter å motta svar direkte på sak og journalpost | Bør | 1. Fyll inn ønsket metadata for melding i egen løsning<br>2. Send melding til annen mottaker som bruker eFormidling <br>3. Verifiser at meldingen kommer frem til annen løsning<br>4. Svar på meldingen fra annen løsning<br>5. Verifiser at svaret kommer frem til egen løsning, koblet til sak og journalpost som forventet | Som over |
| Støtter å sende svar direkte til sak og journalpost | Bør | 1. Fyll inn ønsket metadata for melding i annen løsning som bruker eFormidling<br>2. Send melding til mottaker som bruker egen løsning<br>3. Verifiser at meldingen kommer frem til egen løsning<br>4. Svar på meldingen fra egen løsning<br>5. Verifiser at svaret kommer frem til annen løsning, koblet til sak og journalpost som forventet | Som over |

## Taushetsbelagt saksbehandling

Disse kravene gjelder dersom taushetsbelagt saksbehandling støttes.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |

## Vedtak og annen viktig informasjon til innbyggere

Disse kravene gjelder dersom vedtak og annen viktig informasjon til innbyggere støttes.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |


## Publisering av møte til eInnsyn

Disse kravene gjelder dersom publisering av møte til eInnsyn støttes.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |



## Publisering av journalpost til eInnsyn

Disse kravene gjelder dersom publisering av journalpost til eInnsyn støttes.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |

# Mottak av innsynskrav fra eInnsyn

Disse kravene gjelder dersom mottak av innsynskrav fra eInnsyn støttes.

| Krav | Må/bør/kan | Testbeskrivelse | Kommentar |
| ---- | ---------- | --------------- | --------- |

