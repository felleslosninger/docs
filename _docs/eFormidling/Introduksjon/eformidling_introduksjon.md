---
title: Introduksjon
description: ""
summary: ""
permalink: eformidling_introduksjon.html
product: eFormidling
sidebar: eformidling_sidebar
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
- sende meldinger til mottakende innbygggers foretrukne kanal
- motta innkommende meldinger på ønsket kanal

Alle norske virksomheter og innbyggere kan nås gjennom eFormidling.

> For å forenkle tilknytning til eksisterende infrastrukturer for meldingsutveksling til andre offentlige virksomhet,
> innbyggere og virksomheter, bør eFormidling benyttes.
>
> [Digitaliseringsrundskrivet](https://www.regjeringen.no/no/dokumenter/digitaliseringsrundskrivet/id2895185/)

Funksjonaliteten i eFormidling kan tas i bruk
gjennom:

- [fagsystem som allerede støtter integrasjon med eFormidling](eformidling_introduksjon_fagsystem.html)
- [egne integrasjoner direkte mot eFormidling](eformidling_utvikling.html)

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
stilling til hvilke dokumenttype som ønskes brukt. I tilfeller der samme dokumenttype støttes av flere meldingstjenester
sikrer eFormidling at mottakers foretrukne meldingstjeneste blir brukt. Prosesser, meldingstjenester og dokumenttyper
utgjør mottakerens kapabiliteter.

Prosesser som støttes av eFormidling inkluderer:

| **Prosess**                                                                                       | **Dokumenttyper**                                                                                                                                                                          | **Meldingstjenester**                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Avtalt meldingsutveksling](eformidling_funksjonalitet_avtalt.html)                               | [Avtalt](eformidling_utvikling_dokumenttype_avtalt.html)                                                                                                                                   | [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html)                                                                                                                                          |
| [FIKS IO-meldingsutveksling](eformidling_funksjonalitet_fiks_io.html)                             | [FIKS IO](eformidling_utvikling_dokumenttype_fiks_io.html)                                                                                                                                 | [FIKS IO](eformidling_utvikling_ks_fiks_io.html)                                                                                                                                                           |
| [Informasjon til innbygger](eformidling_funksjonalitet_informasjon_til_innbygger.html)            | [Digital](eformidling_utvikling_dokumenttype_digital.html)<br>[Print](eformidling_utvikling_dokumenttype_print.html)<br>[Digital DPV](eformidling_utvikling_dokumenttype_digital_dpv.html) | [Digital Post til Innbyggere](eformidling_utvikling_digital_post_til_innbyggere.html)<br>[Altinn Digital Post](eformidling_utvikling_altinn_digital_post.html)                                             |
| [Innsynskrav fra eInnsyn](eformidling_funksjonalitet_innsynskrav.html)                            | [Innsynskrav](eformidling_utvikling_dokumenttype_innsynskrav.html)                                                                                                                         | [eInnsyns meldingstjeneste](eformidling_utvikling_einnsyns_meldingstjeneste.html)                                                                                                                          |
| [Journalpost til eInnsyn](eformidling_funksjonalitet_journalpost.html)                            | [Publisering](eformidling_utvikling_dokumenttype_publisering.html)                                                                                                                         | [eInnsyns meldingstjeneste](eformidling_utvikling_einnsyns_meldingstjeneste.html)                                                                                                                          |
| [Møte til eInnsyn](eformidling_funksjonalitet_mote.html)                                          | [Publisering](eformidling_utvikling_dokumenttype_publisering.html)                                                                                                                         | [eInnsyns meldingstjeneste](eformidling_utvikling_einnsyns_meldingstjeneste.html)                                                                                                                          |
| [Saksbehandling](eformidling_funksjonalitet_saksbehandling.html)                                  | [Arkivmelding](eformidling_utvikling_dokumenttype_arkivmelding.html)                                                                                                                       | [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html)<br>[KS SvarUt](eformidling_utvikling_ks_svarut_og_svarinn.html)<br>[Altinn Digital Post](eformidling_utvikling_altinn_digital_post.html) |
| [Taushetsbelagt<br>saksbehandling](eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html) | [Arkivmelding](eformidling_utvikling_dokumenttype_arkivmelding.html)                                                                                                                       | [eFormidlings meldingstjeneste](eformidling_utvikling_eformidlings_meldingstjeneste.html)<br>[KS SvarUt](eformidling_utvikling_ks_svarut_og_svarinn.html)<br>[Altinn Digital Post](eformidling_utvikling_altinn_digital_post.html) |
| [Vedtak til innbygger](eformidling_funksjonalitet_vedtak_til_innbygger.html)                      | [Digital](eformidling_utvikling_dokumenttype_digital.html)<br>[Print](eformidling_utvikling_dokumenttype_print.html)<br>[Digital DPV](eformidling_utvikling_dokumenttype_digital_dpv.html) | [Digital Post til Innbyggere](eformidling_utvikling_digital_post_til_innbyggere.html)<br>[Altinn Digital Post](eformidling_utvikling_altinn_digital_post.html)                                             |

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

- [eFormidling 2](eformidling_utvikling_integrasjonspunkt_eformidling2_api.html)
- [BEST/EDU](eformidling_utvikling_integrasjonspunkt_bestedu_api.html) (fases ut)

I tillegg leverer eFormidling:

- en sentral adressetjeneste (service registry) som brukes av integrasjonspunktet for å slå opp foretrukket kanal for 
  mottaker
- diverse støttetjenester (administrasjon, overvåking, feilsøking, ol)

Før en virksomhet sender en melding gjøres et kapabilitetsoppslag for å se om mottakeren støtter den aktuelle prosessen
meldingen skal sendes som del av og i så fall med hvilke dokumenttyper mottakeren støtter denne. Virksomheten bygger så
meldingen med ønsket dokumenttype før den sendes til integrasjonspunktet. Integrasjonspunktet ruter meldingen til
foretrukket meldingstjeneste (f.eks KS SvarUt) for mottakeren.

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

- [Kom i gang](eformidling_introduksjon_kom_i_gang.html)
