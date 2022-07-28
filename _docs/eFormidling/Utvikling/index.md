---
title: Kom i gang med utvikling
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Formålet med denne siden er å hjelpe utviklere i gang med å ta i bruk funksjonaliteten i eFormidling.

1. TOC 
{:toc}

## Kom i gang med utvikling

Det aller første en bør gjøre er å lese introduksjon til eFormidling og den overordnede beskrivelsen av funksjonaliteten
en skal ta i bruk.

- [Introduksjon til eFormidling](../Introduksjon/)

eFormidling leverer en mellomvare (integrasjonspunktet) som gir fagsystem ett enkelt grensesnitt for meldingsutveksling
uavhengig av hvilke typer meldinger som utveksles med hvem. Før en kan komme i gang med utvikling bør en ha tilgang til
et integrasjonspunkt å utvikle mot. eFormidling tilbyr et offentlig testmiljø sammen med meldingstjenestene som brukes i
eFormidling, og integrasjonspunktet må konfigureres med nødvendige tilganger til disse. Se gjerne:

- [Kom i gang med integrasjonspunktet](../Drift/)
- [QA-miljø](../Miljo/qa)

I noen sjeldne tilfeller ønsker en virksomhet å kommunisere med virksomheter på eFormidling uten selv å kjøre et
integrasjonspunkt. Dette er mulig, men ikke anbefalt. Se gjerne:

- [Kom i gang med eFormidling uten integrasjonspunkt](#kom-i-gang-med-eformidling-uten-integrasjonspunkt)

Integrasjonspunktet tilbyr to programmeringsgrensesnitt. Grensesnittet `eFormidling 2` anbefales for all nyutvikling.
Det andre grensesnittet, `BEST/EDU`, fases ut og omtales derfor ikke mer på denne siden. Grensesnittene er i
utgangspunktet ikke beskyttet, men kan konfigureres med HTTP basic auth og HTTPS.

`eFormidling 2` er JSON-basert og støtter helt overordnet følgende funksjonalitet:

- motta meldinger
- sende meldinger
- se status for sendte meldinger

De samme API-kallene brukes uavhengig av aktuelle prosesser, dokumenttyper og meldingstjenester som er involvert. For
eksempel følger en publisering til eInnsyn samme flyt som en forsendelse til innbygger. Dette legger til rette for at
klientimplementasjoner kan benytte programmeringsmodeller som gjør det enkelt å utvide til nye brukstilfeller.   

For å støtte denne modellen bygges alle meldinger med samme grunnleggende struktur.

<div class="mermaid">
graph LR
subgraph Melding
  subgraph Standard Business Document 
    el1[<b>Standard Business Document Header</b><br>Standard adresseringsinformasjon]  
    el2[<b>Forretningsmelding</b><br>Ekstra adresseringsinformasjon og instruksjoner avhengig av dokumenttypen]
  end
  subgraph Kryptert dokumentpakke
    el3[<b>Associated Signature Container Extended</b><br>Signert ZIP-arkiv med strukturert og/eller ustrukturert innhold]
  end
end
</div>

Se mer om eFormidlings standard business document (SBD) på:

- [Standard business document](Dokumenttyper/standard_sbd)

Se mer om eFormidlings dokumentpakke på:

- [Dokumentpakke](Dokumenttyper/standard_dokumentpakke)

Se mer om integrasjonspunktets programmeringsgrensesnitt på:

- [eFormidling 2](integrasjonspunkt_eformidling2_api)

Eksempler er ofte en god måte å komme i gang på. Se eksempler på bruk av de ulike prosessene i eFormidling:

- [Eksempler](eksempler)
- [Eksempel-klient på GitHub](https://github.com/felleslosninger/efm-eformidling-klient) (ekstern lenke)

## Utvikling for tjenesteleverandører

eFormidling har funksjonalitet for å legge til rette for tjenesteleverandører som tilbyr eFormidling som del av sine
tjenester.

- En leverandør kan sende meldinger på vegne av flere virksomheter slik at det ikke er nødvendig med ett
integrasjonspunkt for hver enkelt avsendervirksomhet
- En enkelt virksomhet kan bruke flere integrasjonspunkt til ulike formål slik at en virksomhets tjenester kan fordeles
på flere tjenesteleverandører

Les mer om leveransemodeller i eFormidling:

- [Kom i gang med integrasjonspunktet](../Drift/)

## Kom i gang med eFormidling uten integrasjonspunkt

I noen sjeldne tilfeller ønsker en virksomhet å kommunisere med virksomheter på eFormidling uten selv å kjøre et
integrasjonspunkt. Dette er mulig, men ikke anbefalt.

For å ta i bruk eFormidling uten integrasjonspunkt:

- Oppslag mot eFormidlings adressetjeneste (service registry) må implementeres for å vite hvilke virksomheter som kan motta hvilket innhold (se [Adressetjenestens (Service Registry) API](serviceregistry_api))
- Forretningsregler som skal sikre at meldinger sendes dit mottaker ønsker dem, påkrevd varsling, osv må implementeres
- Det må settes opp en integrasjon mot eFormidlings meldingstjeneste (se [eFormidlings meldingstjeneste](Meldingstjenester/eformidlings_meldingstjeneste))
- Flyten i ønsket prosess må implementeres (og eventuelt integrasjoner med øvrige meldingstjenester som kreves av en prosess)
- Levering av meldingsstatuser til eFormidlings meldingsstatustjeneste må implementeres (for statistikk og sentral varslingsfunksjonalitet)
- Eventuell øvrig meldingsfunksjonalitet (køing, feilhåndtering, ...) som ønskes må implementeres

## Støtte ved utvikling

1. eFormidling på Digdir Docs
2. Generell støtte til eFormidling tilbys av servicedesk@digdir.no
3. eFormidling ønsker ved behov å tilby utvidet støtte til de som implementerer integrasjoner mot eFormidling. Ta
   kontakt med servicedesk@digdir.no og spør om mulighet for å få en Slack-kanal inn mot eFormidlings team.

## Utvikling av eFormidling

eFormidling utvikles løpende ihht. gjeldende strategi. Nye behov og konkrete endringsønsker tas imot og prioriteres 
løpende.

## Åpen kildekode

Det meste av eFormidling er tilgjengelig som åpen kildekode:

- [Integrasjonspunktet på GitHub](https://github.com/felleslosninger/efm-integrasjonspunkt) (ekstern lenke)
- [Adressetjenesten (Service Registry) på GitHub](https://github.com/felleslosninger/efm-service-registry) (ekstern lenke)
- [Alt fra eFormidling på GitHub](https://github.com/orgs/felleslosninger/repositories?language=&q=efm-&sort=&type=all) (ekstern lenke)
- [Implementasjon av Associcated Signature Container Extended (ASiC-e) på GitHub](https://github.com/difi/asic) (ekstern lenke)
