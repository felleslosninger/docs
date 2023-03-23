---
title: Introduksjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_nm_about
---

Dette er den tekniske dokumentasjonen for eFormidling. Formålet er å støtte arkitekter, utviklere og driftspersonell hos
offentlige virksomheter og deres leverandører i innføring og bruk av eFormidling.

1. TOC
{:toc}

Se gjerne Samarbeidsportalen for en helt overordnet ikke-teknisk introduksjon til eFormidling:

- [Dette er eFormidling](https://samarbeid.digdir.no/eformidling/dette-er-eformidling/46) (ekstern lenke)
- [Ta i bruk eFormidling](https://samarbeid.digdir.no/eformidling/ta-i-bruk-eformidling/98) (ekstern lenke)

## Hva er eFormidling?
eFormidling lar din virksomhet:
- sende meldinger til mottakende virksomhets foretrukne kanal
- sende meldinger til mottakende innbyggers foretrukne kanal
- motta innkommende meldinger på ønsket kanal

Alle norske virksomheter og innbyggere kan nås gjennom eFormidling.

> For å forenkle tilknytning til eksisterende infrastrukturer for meldingsutveksling til andre offentlige virksomhet,
> innbyggere og virksomheter, bør eFormidling benyttes.
>
> [Digitaliseringsrundskrivet](https://www.regjeringen.no/no/dokumenter/digitaliseringsrundskrivet/id2895185/) (ekstern lenke)

Funksjonaliteten i eFormidling kan tas i bruk
gjennom:

- [fagsystem som allerede støtter integrasjon med eFormidling](fagsystem)
- [egne integrasjoner direkte mot eFormidling](../Utvikling/)

## I hvilke sammenhenger kan eFormidling brukes?
Meldinger kan sendes i mange ulike sammenhenger og må i mange tilfeller behandles ulikt avhengig av sammenhengen. For
eksempel vil mottakeren i noen sammenhenger ønske å:

- Rute meldinger til ulike fagsystem
- Knytte enkelte meldinger til strengere tilgangskontroller
- Legge meldinger i ulike arbeidskøer 

Alle meldinger i eFormidling sendes derfor som del av en gitt sammenheng. I eFormidling kalles disse sammenhengene
prosesser. En mottaker støtter meldingsutveksling i forbindelse med en eller flere prosesser. En mottaker støtter en
gitt prosess gjennnom en eller flere dokumenttyper som igjen støttes av en eller flere meldingstjenester. Dokumenttypene
definerer hvilket innhold som kan sendes. I tilfeller der en prosess støttes gjennom flere dokumenttyper må avsender ta
stilling til hvilken dokumenttype som ønskes brukt. I tilfeller der samme dokumenttype støttes av flere meldingstjenester
sikrer eFormidling at mottakers foretrukne meldingstjeneste blir brukt. Prosesser, meldingstjenester og dokumenttyper
utgjør mottakerens kapabiliteter.

Prosesser som støttes av eFormidling inkluderer:

| **Prosess**                                                                         | **Dokumenttyper**                                                                                                                                   | **Meldingstjenester**                                                                                                                                                                                                                          |
|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Saksbehandling](../Funksjonalitet/saksbehandling)                                  | [Arkivmelding](../Utvikling/Dokumenttyper/arkivmelding)                                                                                             | [eFormidlings meldingstjeneste](../Utvikling/Meldingstjenester/eformidlings_meldingstjeneste)<br>[KS SvarUt](../Utvikling/Meldingstjenester/ks_svarut_og_svarinn)<br>[Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post) |
| [Taushetsbelagt<br>saksbehandling](../Funksjonalitet/taushetsbelagt_saksbehandling) | [Arkivmelding](../Utvikling/Dokumenttyper/arkivmelding)                                                                                             | [eFormidlings meldingstjeneste](../Utvikling/Meldingstjenester/eformidlings_meldingstjeneste)<br>[KS SvarUt](../Utvikling/Meldingstjenester/ks_svarut_og_svarinn)<br>[Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post) |
| [Informasjon til innbygger](../Funksjonalitet/informasjon_til_innbygger)            | [Digital](../Utvikling/Dokumenttyper/digital)<br>[Print](../Utvikling/Dokumenttyper/print)<br>[Digital DPV](../Utvikling/Dokumenttyper/digital_dpv) | [Digital Post til Innbyggere](../Utvikling/Meldingstjenester/digital_post_til_innbyggere)<br>[Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post)                                                                         |
| [Vedtak til innbygger](../Funksjonalitet/vedtak_til_innbygger)                      | [Digital](../Utvikling/Dokumenttyper/digital)<br>[Print](../Utvikling/Dokumenttyper/print)<br>[Digital DPV](../Utvikling/Dokumenttyper/digital_dpv) | [Digital Post til Innbyggere](../Utvikling/Meldingstjenester/digital_post_til_innbyggere)<br>[Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post)                                                                         |
| [Innsynskrav fra eInnsyn](../Funksjonalitet/innsynskrav)                            | [Innsynskrav](../Utvikling/Dokumenttyper/innsynskrav)                                                                                               | [eInnsyns meldingstjeneste](../Utvikling/Meldingstjenester/einnsyns_meldingstjeneste)                                                                                                                                                          |
| [Journalpost til eInnsyn](../Funksjonalitet/journalpost)                            | [Publisering](../Utvikling/Dokumenttyper/publisering)                                                                                               | [eInnsyns meldingstjeneste](../Utvikling/Meldingstjenester/einnsyns_meldingstjeneste)                                                                                                                                                          |
| [Møte til eInnsyn](../Funksjonalitet/mote)                                          | [Publisering](../Utvikling/Dokumenttyper/publisering)                                                                                               | [eInnsyns meldingstjeneste](../Utvikling/Meldingstjenester/einnsyns_meldingstjeneste)                                                                                                                                                          |
| [Avtalt meldingsutveksling](../Funksjonalitet/avtalt)                               | [Avtalt](../Utvikling/Dokumenttyper/avtalt)                                                                                                         | [eFormidlings meldingstjeneste](../Utvikling/Meldingstjenester/eformidlings_meldingstjeneste)                                                                                                                                                  |
| [FIKS IO-meldingsutveksling](../Funksjonalitet/fiks_io)                             | [FIKS IO](../Utvikling/Dokumenttyper/fiks_io)                                                                                                       | [FIKS IO](../Utvikling/Meldingstjenester/ks_fiks_io)                                                                                                                                                                                           |

## Hva kan sendes og mottas med eFormidling?
eFormidling støtter meldinger med både strukturert og ustrukturert innhold. Meldinger med egendefinert innhold kan også
sendes. Hvilket innhold som støttes avhenger av sammenhengen en melding sendes i og mottakerens kapabiliteter. Mulig
innhold inkluderer:

- XML-baserte format
- JSON-baserte format
- PDF-filer
- Tekstfiler

## Hvordan fungerer eFormidling?

eFormidling er ikke i seg selv en meldingstjeneste, men leverer derimot en mellomvare (integrasjonspunktet) som gir
fagsystem ett enkelt grensesnitt for meldingsutveksling uavhengig av prosess, dokumenttype og meldingstjeneste.
Integrasjonspunktet installeres hos virksomhetene (eller deres leverandører) og integreres mot et eller flere fagsystem.
Fagsystem kan benytte integrasjonspunktet over følgende grensesnitt:

- [eFormidling 2](../Utvikling/integrasjonspunkt_eformidling2_api)
- [BEST/EDU](../Utvikling/integrasjonspunkt_bestedu_api) (fases ut)

I tillegg leverer eFormidling:

- en sentral adressetjeneste (service registry) som brukes av integrasjonspunktet for å slå opp foretrukket kanal for 
  mottaker
- diverse støttetjenester (administrasjon, overvåking, feilsøking, ol)

Før en virksomhet sender en melding gjøres et kapabilitetsoppslag for å se om mottakeren støtter den aktuelle prosessen
meldingen skal sendes som del av og i så fall med hvilke dokumenttyper mottakeren støtter denne. Virksomheten bygger så
meldingen med ønsket dokumenttype før den sendes til integrasjonspunktet. Integrasjonspunktet ruter meldingen til
foretrukket meldingstjeneste (f.eks. KS SvarUt) for mottakeren.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant D as Meldingstjeneste<br>(f.eks. KS SvarUt)
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>B: Utgående melding
B->>D: Utgående melding
</div>

Virksomhetens fagsystem mottar kontinuerlig innkommende meldinger fra virksomhetens integrasjonspunkt som igjen mottar
meldingene fra meldingstjenestene virksomheten bruker.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant D as Meldingstjeneste<br>(f.eks. KS SvarInn)
D->>B: Innkommende melding
B->>A: Innkommende melding
</div>

## Neste steg

- [Kom i gang](kom_i_gang)
