---
title: Introduksjon
description: ""
summary: ""
permalink: eformidling_introduksjon.html
product: eFormidling
sidebar: eformidling_sidebar
---

Title (fra header) havner i Google "Tittel \| eFormidling - Digdir Docs \|".

Title (fra header) blir også overskrift så treng ikkje gjenta det.

Det øverste innholdet havner i Google og bør beskrive innholdet på sida godt.

Description (fra header) og summary (fra header) ser ikkje ut til å bli brukt og kan med fordel stå tomt.




## KOSMOS

Kontinuerlege oppdateringar for sikker meldingsutveksling i offentleg sektor - KOSMOS er ein Java-applikasjon (JAR) som køyrer som ei teneste, side om side med eit integrasjonspunkt (også JAR). Den fungerar i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege versjon hjå Digdir.
2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten. 
3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen. Dersom den nye versjonen ikkje startar, rullar KOSMOS attende.

[Sjå eiga rettleiing for utdjupande informasjon]()

### Funksjonalitet
KOSMOS køyrer periodiske sjekkar i rekkefølge beskriven her. Innstillinga ```kosmos.schedulerCronExpression``` avgjer kor ofte dette skjer. 

1. Finne noværande versjon av integrasjonspunktet.
2. Finne siste versjon av integrasjonspunktet.
3. Sjekk av versjon-kompabilitet.
4. Nedlasting av siste lanserte versjon.
5. Validere autentisitet på nedlasta versjon.
6. Stopp av gammalt integrasjonspunkt.
7. Oppstart av ny versjon.

Ein kan sjølv velge tidspunkt for når ny versjon skal starte opp. Standard verdiane er kl 05:30, 19:30 og 21:30.

### Krav til integrasjonspunkt som skal verta oppdatert
Det anbefales å begynne med eit fungerande oppsett for integrasjonspunktet, men ved nyinstallasjon av både KOSMOS og integrasjonspunktet er det også mulig å bruke KOSMOS til å laste ned integrasjonspunktet for så å konfigurere både integrasjonspunkt og KOSMOS.
+ Alle nødvendige portopningar for integrasjonspunktet er satt opp i brannmur(ar) som beskytter dette. [Sjå dokumentasjon](eformidling_drift_forberede_installasjon.html#brannmur%C3%A5pninger). Om du allereie køyrer integrasjonspunktet er desse på plass og du treng ikkje åpne noko nytt for å bruke KOSMOS.
+ Følgande endepunkt må være internt eksponerte i integrasjonspunktet. 
  1. Shutdown-endepunktet: ```/manage/shutdown```. Dette gjer at KOSMOS kan stoppa integrasjonspunktet når ein ny versjon er tilgjengeleg.
  2. Info-endepunktet: ```/manage/info```. For bestemming av inneværande versjon.
  3. Helse-endepunktet: ```/manage/health```. For at KOSMOS skal kunna avgjera om applikasjonen køyrer eller ikkje.

Om du har skrudd desse av i integrasjonspunktet kan du skru det på ved denne propertyen ```management.endpoints.enabled-by-default=true```





## Etter det første innholdet kan vi ha første header, på nivå 2

[Lær Markdown](https://www.markdownguide.org/cheat-sheet/)

## Kanskje ein tabell?

| A | B | C |
| 1 | 2 | 3 |

## Kanskje ein kodesnutt?

```
public static void main(String[] args) {
  System.out.println("Hello world");
}
```

## Kanskje eit diagram?

[Lær Mermaid](https://mermaid-js.github.io/mermaid/#/)

<div class="mermaid">
sequenceDiagram
A->>B: Noen
B->>C: Saker
A->>C: Skjer
C->>B: Sekvensielt
</div>

<div class="mermaid">
graph TD
    A[Boks A] --> B[Boks B]
    B --> C{Valg}
    C -->|Alternativ 1| D[Boks D]
    C -->|Alternativ 2| E[Boks E]
</div>

