---
title: Informasjon til innbygger
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling lar din virksomhet sende informasjon til innbygger.

1. TOC
{:toc}

## Introduksjon

Informasjon til innbygger er alt utenom vedtak og andre viktige henvendelser til innbygger.

eFormidlings støtte for å sende informasjon til innbygger gjør det enkelt å sende informasjon til innbygger uten
tilleggskravene vedtak og andre viktige henvendelser medfører.

Informasjon til innbygger representeres med følgende prosess for mottaker:

| **Prosessnavn** | **Prosessidentifikator**                    |
| --------------- | ------------------------------------------- |
| Info            | urn:no:difi:profile:digitalpost:info:ver1.0 |

## Meldingsinnhold

Tilsvarer [Meldingsinnhold for vedtak til innbygger](vedtak_til_innbygger#meldingsinnhold)

## Adressere meldinger

Meldinger adresseres fra avsenders organisasjonsnummer til mottakers fødselsnummer.

For mottakere som har valgt digital postkasse foretrekkes denne. For mottakere som ikke har valgt postkasse må avsender
selv velge om meldingen kan sendes til Altinn Digital Post eller om den må sendes som fysisk post. Ved sending av fysisk
post kan avsender velge å bruke utskriftstjenesten i Digital Post til Innbyggere eller håndtere disse meldingene med
egen utskriftstjeneste.

<div class="mermaid">
graph LR
A{Har valgt<br>digital postkasse?}
B("a) Utskriftstjenesten i Digital Post til Innbyggere<br>b) Altinn Digital Post")
C(Digital Postkasse)
A -->|Ja| C
A -->|Nei| B
</div>

## Sende meldinger

Tilsvarer [Sende meldinger for vedtak til innbygger](vedtak_til_innbygger#sende-meldinger)

## Varsling

Tilsvarer [Varsling for vedtak til innbygger](vedtak_til_innbygger#varsling)

## Forutsetninger

Tilsvarer [Forutsetninger for vedtak til innbygger](vedtak_til_innbygger#forutsetninger)

## Konfigurasjon

Tilsvarer [Konfigurasjon for vedtak til innbygger](vedtak_til_innbygger#konfigurasjon)

## Utvikling

- [Eksempel på informasjon til innbygger](../Utvikling/Eksempel/informasjon_til_innbygger)
