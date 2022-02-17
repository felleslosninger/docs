---
title: Taushetsbelagt saksbehandling
description: ""
summary: ""
permalink: eformidling_funksjonalitet_taushetsbelagt_saksbehandling.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling lar din virksomhet sende og motta meldinger som del av taushetsbelagt saksbehandling.

1. TOC
{:toc}

## Introduksjon


Taushetsbelagt saksbehandling er behandling av saker som inkluderer taushetsbelagte opplysninger. Taushetsbelagte
opplysninger inkluderer:

- sensitive personopplysninger
- forretningshemmeligheter
- saker av betydning for rikets sikkerhet


Taushetsbelagt saksbehandling følger samme flyt som vanlig saksbehandling, men lar mottaker knytte ekstra
tilgangskontroller til meldinger for å begrense tilgang til de som har tjenestlig behov til å lese meldingene.

Regler for behandling av taushetsbelagte opplysninger finnes i forvaltningsloven og personopplysningsloven  med
tilpasninger fra regelverk for ulike områder som for eksempel barnevern. Sentrale krav inkluderer å sikre at mottaker
har tjenestlig behov til behandling av opplysningene og å ikke behandle flere opplysninger enn det som er nødvendig. 

Taushetsbelagt saksbehandling representeres med følgende prosess:

| **Prosessnavn**               | **Prosessidentifikator**                                          |
| ----------------------------- | ----------------------------------------------------------------- |
| Taushetsbelagt                | urn:no:difi:profile:arkivmelding:taushetsbelagt:ver1.0            |

## Meldingsinnhold

Tilsvarer [Meldingsinnhold for saksbehandlig](eformidling_funksjonalitet_saksbehandling.html#meldingsinnhold)

## Adressere meldinger

Tilsvarer [Adressere meldinger for saksbehandling](eformidling_funksjonalitet_saksbehandling.html#adressere-meldinger)

## Sende meldinger

Tilsvarer [Sende meldinger for saksbehandling](eformidling_funksjonalitet_saksbehandling.html#sende-meldinger), med noen
tilleggskrav.

Før sending fra fagsystem må det informeres om at det er viktig å utforme meldingen slik at mottaker enkelt kan se hva
meldingen gjelder slik at det er så enkelt som mulig for mottaker å rute meldingen videre til rette vedkommende i
mottakerens organisasjon.

## Motta meldinger

Tilsvarer [Motta meldinger for saksbehandling](eformidling_funksjonalitet_saksbehandling.html#motta-meldinger), med noen
tilleggskrav.

Ved mottak til fagsystem må mottakende system sikre nødvendig begresning av hvem som kan lese meldingen.

Ved mottak til Altinn Digital Post sikres nødvendig begresning av hvem som kan lese meldingen. Les mer
på:

- [Tilgang til taushetsbelagt post](https://www.altinn.no/nyheter/tilgang-til-taushetsbelagt-post/) (ekstern lenke)

## Varsling

Tilsvarer [Varsling for saksbehandling](eformidling_funksjonalitet_saksbehandling.html#varsling), med noen tilleggskrav.

Ved mottak til fagsystem må mottakende system sikre nødvendig varsling om mottak av taushetsbelagt melding slik at
meldingen ikke risikerer å bli liggende ulest. Varslingen må presenteres slik at den vil bli lest. Varslingen må
inneholde beskrivelse av hva skal til for å gi tilgang til å lese den taushetsbelagte meldingen.

Ved mottak til Altinn Digital Post varsles virksomheten om mottak av melding. Varsel går til virksomhetens registrerte
kontaktinformasjon på Altinn. Les mer på:

- [Krav til varsling ved taushetsbelagt post](https://altinn.github.io/docs/utviklingsguider/digital-post-til-virksomheter/overorndet-funksjonalitet/#krav-til-varsling-ved-taushetsbelagt-post) (ekstern lenke)

## Forutsetninger

Tilsvarer [Forutsetninger for saksbehandlig](eformidling_funksjonalitet_saksbehandling.html#forutsetninger)

## Konfigurasjon

Tilsvarer [Konfigurasjon for saksbehandling](eformidling_funksjonalitet_saksbehandling.html#konfigurasjon)

## Utvikling

- [Eksempel på taushetsbelagt saksbehandling](eformidling_utvikling_eksempel_taushetsbelagt_saksbehandling.html)
