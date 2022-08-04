---
title: Kom i gang med integrasjonspunktet
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Formålet med denne siden er å hjelpe arkitekter, utviklere og driftspersonell med å tilby funksjonaliteten i eFormidling.

1. TOC
{:toc}

## Kom i gang med integrasjonspunktet

eFormidling er et fleksibelt nettverk og det er flere måter å ta del i nettverket på.

Virksomheter tar del i nettverket med hjelp av en mellomvare, integrasjonspunktet, som installeres hos virksomheten
eller virksomhetens leverandør(er). Ett integrasjonspunkt er knyttet til en virksomhet og kan også opptre på vegne av
andre virksomheter. eFormidling kan benyttes for offentlige virksomheter som kan få utstedt virksomhetssertifikat. I
tillegg kan virksomheten ved bruk av eInnsyn og digital post til innbyggere opptre som en selvdefinert underenhet.

En virksomhet kan ha ett integrasjonspunkt for all funksjonalitet eller fordele funksjonaliteten på flere
integrasjonspunkt. Ett integrasjonspunkt kan konfigureres til å støtte en eller flere av de følgende funksjonalitetene:

- eInnsyn
- Saksbehandling og avtalt meldingsutveksling
- Informasjon og vedtak til innbygger
- FIKS IO-meldingsutveksling

En virksomhet kan ha ett hovedintegrasjonspunkt som kan både sende og motta per funksjonalitet. I tillegg kan
virksomheten ha flere integrasjonspunkt som er konfigurert til bare å støtte sending.

Uavhengig av hvilke funksjonalitet ett integrasjonspunkt støtter kan denne gjøres tilgjenglig for virksomheten på flere
måter:

- Virksomheten drifter integrasjonspunktet selv
- En tjenesteleverandør drifter integrasjonspunktet for virksomheten
- En tjenesteleverandør drifter sitt eget integrasjonspunkt som opptrer på vegne av virksomheten (og andre virksomheter)

Ett enkelt integrasjonspunkt kan ha mange konsumenter så lenge hver konsument bare konsumerer det som tilhører den.

## Hvordan kan en tjenesteleverandør tilby funksjonalitet til flere virksomheter?

Både fagsystem og integrasjonspunkt installeres og kjøres lokalt hos den enkelte virksomhet:

<div class="mermaid">
graph TD
subgraph Virksomhet A
  F1(Fagsystem)
  I1(Integrasjonspunkt)
end
subgraph Virksomhet B
  F2(Fagsystem)
  I2(Integrasjonspunkt)
end
F1 --> I1
F2 --> I2
</div>

Fagsystem kjører hos tjenesteleverandør, mens integrasjonspunkt kjøres hos den enkelte virksomhet:

<div class="mermaid">
graph TD
subgraph Virksomhet A
  I1(Integrasjonspunkt)
end
subgraph Virksomhet B
  I2(Integrasjonspunkt)
end
subgraph Leverandør
  F(Fagsystem)
end
F --> I1
F --> I2
</div>

Fagsystem og et integrasjonspunkt per virksomhet kjøres hos tjenesteleverandør:

<div class="mermaid">
graph TD
subgraph Leverandør
  F(Fagsystem)
  I1(Integrasjonspunkt for<br>virksomhet A)
  I2(Integrasjonspunkt for<br>virksomhet B)
end
F --> I1
F --> I2
</div>

Fagsystem og et felles integrasjonspunkt kjøres hos tjenesteleverandør:

<div class="mermaid">
graph TD
subgraph Leverandør
  F(Fagsystem)
  I(Integrasjonspunkt for leverandør<br>på vegne av virksomhet A og B)
end
F --> I
</div>

## Hvordan kan en virksomhet ta i bruk funksjonalitet fra flere tjenesteleverandører?

En enkelt virksomhet kan benytte ulike leveransemodeller for ulike funksjonaliteter:

<div class="mermaid">
graph TD
subgraph Virksomhet
  F1(Fagsystem)
  I1(Integrasjonspunkt)
end
F1 --> |Digital post til innbyggere| I1

subgraph Leverandør 1
F2(Fagsystem)
end
F2 --> |eInnsyn| I1

subgraph Leverandør 2
F3(Fagsystem)
I2(Integrasjonspunkt for leverandør<br>på vegne av virksomhet)
end
F3 --> |Saksbehandling| I2

</div>

En virksomhet kan benytte flere tjenesteleverandører for samme funksjonalitet. Virksomheten må bestemme hvilke
tjenesteleverandør som skal motta innkommende meldinger:

<div class="mermaid">
graph TD
subgraph Virksomhet
  F1(Fagsystem)
  I1(Integrasjonspunkt)
end
F1 --> |Saksbehandling<br>Sende og motta| I1

subgraph Leverandør 1
F2(Fagsystem)
I2(Integrasjonspunkt for leverandør<br>på vegne av virksomhet)
end
F2 --> |Saksbehandling<br>Bare sende| I2

subgraph Leverandør 2
F3(Fagsystem)
I3(Integrasjonspunkt for leverandør<br>på vegne av virksomhet)
end
F3 --> |Saksbehandling<br>Bare sende| I3

</div>

## Hvordan kan flere fagsystem dele ett integrasjonspunkt?

Flere fagsystem kan dele ett integrasjonspunkt. Det krever at hvert fagsystem oppfører seg fint og bare konsumerer
innkommende meldinger og kvittering som tilhører det enkelte fagsystem. Dersom et av fagsystemenes integrasjon fungerer
slik at den leser alle innkommende meldinger og kvitteringer vil denne "stjele" meldinger og kvitteringer som egentlig
skulle behandles av de andre fagsystemene.

<div class="mermaid">
graph TD
I(Integrasjonspunkt)
F1(Fagsystem A)
F2(Fagsystem B)
F3(Fagsystem C)
F1 --> |Saksbehandling| I
F2 --> |eInnsyn| I
F3 --> |Digital post til innbyggere| I
</div>

## Hvordan kan integrasjonspunktet kjøres?

Integrasjonspunktet leveres som Java-arkiv (JAR) og som Docker-image.

Integrasjonspunktet kan kjøres som en prosess på Windows eller Linux, med intern database og meldingskø:

<div class="mermaid">
graph TD
subgraph Windows, Linux, el. annet
  subgraph Integrasjonspunkt
    M("Database (H2 fildatabase)")
    A("Meldingskø (ActiveMQ)")
  end
end
</div>

Integrasjonspunktet kan kjøres som en prosess på Windows eller Linux, med ekstern database og meldingskø:

<div class="mermaid">
graph TD
M("Database (MySQL)")
A("Meldingskø (ActiveMQ)")
subgraph Windows, Linux, el. annet
  I(Integrasjonspunkt)
end
I --> M
I --> A
</div>

Integrasjonspunktet kan kjøres som en kontainer på en Docker-plattform:

<div class="mermaid">
graph TD
subgraph Docker-plattform
  I(Integrasjonspunkt)
  M("Database (MySQL)")
  A("Meldingskø (ActiveMQ)")
end
I --> M
I --> A
</div>

Ved bruk av ekstern database og meldingskø er det mulig å kjøre flere integrasjonspunkt i parallell.

## Neste steg

- [Bestille tilganger](bestille_tilganger)
