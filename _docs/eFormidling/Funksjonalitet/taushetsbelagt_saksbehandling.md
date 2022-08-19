---
title: Taushetsbelagt saksbehandling
description: ""
summary: ""
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

Taushetsbelagt saksbehandling lar mottaker knytte ekstra tilgangskontroller til meldinger for å begrense tilgang til de
som har tjenestlig behov til å lese meldingene.

Regler for behandling av taushetsbelagte opplysninger finnes i forvaltningsloven og personopplysningsloven  med
tilpasninger fra regelverk for ulike områder som for eksempel barnevern. Sentrale krav inkluderer å sikre at mottaker
har tjenestlig behov til behandling av opplysningene og å ikke behandle flere opplysninger enn det som er nødvendig. 

Taushetsbelagt saksbehandling representeres med følgende prosess for mottaker:

| **Prosessnavn** | **Prosessidentifikator**                               |
|-----------------|--------------------------------------------------------|
| Taushetsbelagt  | urn:no:difi:profile:arkivmelding:taushetsbelagt:ver1.0 |

Taushetsbelagt saksbehandling representeres med følgende prosess for avsender:

| **Prosessnavn**      | **Prosessidentifikator**                         |
|----------------------|--------------------------------------------------|
| Arkivmelding-respons | urn:no:difi:profile:arkivmelding:response:ver1.0 |

Vanligvis opptrer en virksomhet både som avsender og mottaker, men det er også mulig å bare opptre som avsender.

## Meldingsinnhold

Det er bare en dokumenttype som støttes for taushetsbelagt saksbehandling.

| **Dokumenttype**                                        | **Meldingstjenester**                                                     |
|---------------------------------------------------------|---------------------------------------------------------------------------|
| [Arkivmelding](../Utvikling/Dokumenttyper/arkivmelding) | [Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post) |

I tillegg forventer avsender en kvittering fra mottaker som en bekreftelse på at en melding er levert helt frem til
mottakers system (ikke bare til mottakers integrasjonspunkt).

| **Dokumenttype**                                                             | **Meldingstjenester**                                                     |
|------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| [Arkivmelding-kvittering](../Utvikling/Dokumenttyper/arkivmeldingkvittering) | [Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post) |

## Adressere meldinger

Meldinger adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

Taushetsbelagte meldinger blir utelukkende sendt til Altinn Digital Post, som har spesielt utviklet funksjonalitet for
behandling av taushetsbelagte meldinger.

## Sende meldinger

Først gjøres et kapabilitetsoppslag for å se hvilke dokumenttyper mottakeren støtter for taushetsbelagt saksbehandling.
Virksomhetens fagsystem bygger så en melding med ønsket dokumenttype. Til slutt sendes meldingen til
integrasjonspunktet, som sørger for at meldingen rutes til foretrukket meldingstjeneste.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant F as Altinn Digital Post
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>B: Utgående melding `arkivmelding`
B->>F: Utgående melding `arkivmelding`
</div>

Før sending fra fagsystem må det informeres om at det er viktig å utforme meldingen slik at mottaker enkelt kan se hva
meldingen gjelder slik at det er så enkelt som mulig for mottaker å rute meldingen videre til rette vedkommende i
mottakerens organisasjon uten å måtte åpne meldingens innhold.

Nærmere beskrivelse av de aktuelle meldingstjenestene finnes på:
- [eFormidlings meldingstjeneste](../Utvikling/Meldingstjenester/eformidlings_meldingstjeneste)
- [KS SvarUt og SvarInn](../Utvikling/Meldingstjenester/ks_svarut_og_svarinn)
- [Altinn Digital Post](../Utvikling/Meldingstjenester/altinn_digital_post)

## Varsling

Avsenders system mottar statusmeldinger når en melding blir levert. Avsenders system mottar også statusmeldinger ved
feilsituasjoner og når en melding ikke blir levert innenfor den definerte levetiden. Avsenders system kan varsle
avsenderen om både vellykkede sendinger og avvik.

eFormidling sender i tillegg epost-varsel om eventuelle avvik til avsenders definerte varslingspunkt. Varsel samles opp
og sendes periodisk.

Ved mottak til Altinn Digital Post varsles virksomheten om mottak av melding. Les mer på:

- [Krav til varsling ved taushetsbelagt post](https://altinn.github.io/docs/utviklingsguider/digital-post-til-virksomheter/overorndet-funksjonalitet/#krav-til-varsling-ved-taushetsbelagt-post) (ekstern lenke)
- [Varsling i Altinn Digital Post](https://altinn.github.io/docs/utviklingsguider/varsling/)

## Forutsetninger

- Bruk av Altinn Digital Post krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:
 
- [Minimumskonfigurasjon av integrasjonspunktet](../installasjon/installasjon#minimumskonfigurasjon)
- [Konfigurasjon av Altinn Digital Post](../installasjon/installasjon#konfigurere-altinn-digital-post-dpv)

## Utvikling

- [Eksempel på taushetsbelagt saksbehandling](../Utvikling/Eksempel/taushetsbelagt_saksbehandling)
