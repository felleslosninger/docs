---
title: Saksbehandling
description: ""
summary: ""
permalink: eformidling_funksjonalitet_saksbehandling.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling lar din virksomhet sende og motta meldinger som del av saksbehandling.

1. TOC
{:toc}

## Introduksjon

Saksbehandling er prosessen fra en utløsende hendelse frem til et vedtak. Mulige utløsende hendelser inkluderer å
sende en søknad eller å få barn. Forvaltningsloven definerer et vedtak som _en avgjørelse som treffes under utøving av
offentlig myndighet og som generelt eller konkret er bestemmende for rettigheter eller plikter til private personer
(enkeltpersoner eller andre private rettssubjekter)_. Saksbehandlingsregler for offentlige myndigheter finnes i
Forvaltningsloven med tilpasninger fra regelverk for ulike områder som for eksempel barnevern.

Offentlige virksomheter bruker vanligvis saksbehandlingssystemer for å legge til rette for effektiv saksbehandling og
etterlevelse av saksbehandlingsregler. Mange av saksbehandlingssystemene inneholder støtte for journalføring og
arkivering og kalles gjerne sak- og arkivsystemer. Det finnes også mange saksbehandlingssystem tilpasset spesifikke
områder (for eksempel barnevern) som gjerne kalles fagsystemer.

Som del av saksbehandlingen vil det ofte være behov for kommmunikasjon mellom flere virksomheter. Eksempel inkluderer:
- Innhenting av dokumentasjon
- Klagebehandling
- Kvalitetssikring

I disse tilfellene er det vanligvis ønskelig at kommunikasjonen går direkte mellom virksomhetenes saksbehandlingssystem
slik at dokumentene som sendes og mottas automatisk kan knyttes til den aktuelle saken. eFormidlings støtte for
saksbehandling gir effektiv kommunikasjon om saker mellom ulike saksbehandlingssystem. eFormidling kan også brukes for
å legge til rette for (del-)automatisert saksbehandling.

Saksbehandling representeres med følgende prosesser:

| **Prosessnavn**               | **Prosessidentifikator**                                          |
| ----------------------------- | ----------------------------------------------------------------- |
| Administrasjon                | urn:no:difi:profile:arkivmelding:administrasjon:ver1.0            |
| Helse, sosial og omsorg       | urn:no:difi:profile:arkivmelding:helseSosialOgOmsorg:ver1.0       |
| Kultur, idrett og fritid      | urn:no:difi:profile:arkivmelding:kulturIdrettOgFritid:ver1.0      |
| Natur og miljø                | urn:no:difi:profile:arkivmelding:naturOgMiljoe:ver1.0             |
| Næringsutvikling              | urn:no:difi:profile:arkivmelding:naeringsutvikling:ver1.0         |
| Oppvekst og utdanning         | urn:no:difi:profile:arkivmelding:oppvekstOgUtdanning:ver1.0       |
| Plan, bygg og geodata         | urn:no:difi:profile:arkivmelding:planByggOgGeodata:ver1.0         |
| Skatter og avgifter           | urn:no:difi:profile:arkivmelding:skatterOgAvgifter:ver1.0         |
| Tekniske tjenester            | urn:no:difi:profile:arkivmelding:tekniskeTjenester:ver1.0         |
| Trafikk, reiser og samferdsel | urn:no:difi:profile:arkivmelding:trafikkReiserOgSamferdsel:ver1.0 |

Hvilke prosesser en mottaker støtter er opp til mottakeren og fremgår av mottakerens kapabiliteter. Mottakeren kan på
sin side velge å håndtere ulike prosesser ulikt. For eksempel ved å rute meldingene til ulike fagsystem eller til ulike
arbeidslister i samme system.

## Meldingsinnhold

Hvilket innhold som kan sendes avhenger av hvilke dokumenttyper mottakeren støtter for saksbehandling. En
dokumenttype støttes av en eller flere meldingstjenester.

| **Dokumenttype**                                                     | **Meldingstjenester**                                                                                                                                                                                      |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Arkivmelding](eformidling_utvikling_dokumenttype_arkivmelding.html) | [Altinn Formidling](eformidling_utvikling_altinn_formidling.html)<br>[KS SvarUt](eformidling_utvikling_ks_svarut_og_svarinn.html)<br>[Altinn Digital Post](eformidling_utvikling_altinn_digital_post.html) |

## Adressere meldinger

Meldinger adresseres fra avsenders organisasjonsnummer til mottakers organisasjonsnummer.

For mottakere som selv bruker eFormidling blir Altinn Formidling foretrukket. For mottakere som ikke bruker eFormidling
blir KS SvarUt foretrukket dersom mottaker bruker denne tjenesten. For alle andre mottakere foretrekkes Altinn Digital
Post.

<div class="mermaid">
graph LR
A{Bruker mottaker<br>eFormidling?}
B{Bruker mottaker<br>KS SvarUt?}
U(Altinn Formidling)
V(KS SvarUt)
W(Altinn Digital Post)
A -->|Ja| U
A -->|Nei| B
B -->|Ja| V
B -->|Nei| W
</div>

## Sende meldinger

Først gjøres et kapabilitetsoppslag for å se hvilke dokumenttyper mottakeren støtter for saksbehandling. Virksomhetens
fagsystem bygger så en melding med ønsket dokumenttype. Til slutt sendes meldingen til integrasjonspunktet, som sørger
for at meldingen rutes til foretrukket meldingstjeneste.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Adressetjeneste
participant D as Altinn Formidling
participant E as KS SvarUt
participant F as Altinn Digital Post
A->>B: Kapabilitetsoppslag
B->>C: Kapabilitetsoppslag
A->>+B: Utgående melding `arkivmelding`
B->>D: Alt 1)
B->>E: Alt 2)
B->>-F: Alt 3)
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [Altinn Formidling](eformidling_utvikling_altinn_formidling.html)
- [KS SvarUt og SvarInn](eformidling_utvikling_ks_svarut_og_svarinn.html)
- [Altinn Digital Post](eformidling_utvikling_altinn_digital_post.html)

## Motta meldinger

eFormidling lar din virksomhet motta meldinger i forbindelse med saksbehandling. eFormidling støtter mottak av meldinger
fra andre virksomheter som bruker eFormidling og meldinger sendt til din virksomhets konto hos KS SvarInn. Sistnevnte
mulighet lar kommunene kommunisere effektivt med virksomhetene som bruker eFormidling.

Virksomhetens fagsystem mottar kontinuerlig innkommende meldinger fra virksomhetens integrasjonspunkt som igjen mottar
meldingene fra meldingstjenestene virksomheten bruker.

<div class="mermaid">
sequenceDiagram
participant A as Virksomhetens<br>fagsystem
participant B as Virksomhetens<br>integrasjonspunkt
participant C as Altinn Formidling
participant D as KS SvarInn
C->>B: Innkommende melding
D->>B: Innkommende melding
B->>A: Innkommende melding
</div>

Detaljert beskrivelse av meldingsflyten i de aktuelle meldingstjenestene finnes på:
- [Altinn Formidling](eformidling_utvikling_altinn_formidling.html)
- [KS SvarUt og SvarInn](eformidling_utvikling_ks_svarut_og_svarinn.html)

## Varsling

Avsenders system mottar statusmeldinger når en melding blir levert. Avsenders system mottar også statusmeldinger ved
feilsituasjoner og når en melding ikke blir levert innenfor den definerte levetiden. Avsenders system kan varsle
avsenderen om både vellykkede sendinger og avvik.

eFormidling sender i tillegg epost-varsel om eventuelle avvik til avsenders definerte varslingspunkt. Varsel samles opp
og sendes periodisk.

Ved mottak til fagsystem kan mottakende system gjøre varsling om mottak av melding slik at meldingen ikke risikerer å
bli liggende ulest.

Ved mottak til Altinn Digital Post kan virksomheten varsles om mottak av melding. Varsel går til virksomhetens
registrerte varslingsadresse i Enhetsregisteret.

## Forutsetninger

- Bruk av Altinn Formidling krever avtale
- Bruk av KS SvarUt og SvarInn krever avtale
- Bruk av Altinn Digital Post krever avtale

## Konfigurasjon

Følgende konfigurasjon er nødvendig for full funksjonalitet:

- [Minimal konfigurasjon av integrasjonspunktet](eformidling_konfigurasjon_minimal.html)
- [Konfigurasjon av Altinn Formidling](eformidling_konfigurasjon_altinn_formidling.html) 
- [Konfigurasjon av KS SvarUt og SvarInn](eformidling_konfigurasjon_ks_svarut_og_svarinn.html)
- [Konfigurasjon av Altinn Digital Post](eformidling_konfigurasjon_altinn_digital_post.html)

Det er også støtte for delvis konfigurasjon. Delvis konfigurasjon medfører at en ikke når alle mottakere. For eksempel
trenger en ikke konfigurere KS SvarUt dersom en bare skal nå statlige virksomheter. En trenger heller ikke konfigurere
KS SvarInn dersom en ikke ønsker å motta fra avsendere som bruker KS SvarUt.

## Utvikling

- [Eksempel på saksbehandling](eformidling_utvikling_eksempel_saksbehandling.html)
