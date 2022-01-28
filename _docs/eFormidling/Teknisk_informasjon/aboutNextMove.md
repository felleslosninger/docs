---
title: eFormidling 2.0
description: Beskrivelse av forretningsmeldinger
summary: ""
permalink: eformidling_nm_about.html
product: eFormidling
sidebar: eformidling_sidebar
---

Under utarbeidelse av 2015:3 rapporten ble det identifisert at et viktig kriteria for suksess var mulighet for hurtig utbredelse uten endringer i lokale installasjoner. Dette gjorde at man i første omgang reimplementerte BEST/EDU grensesnittet som allerede var støttet i de mest brukte Sak-/Arkivløsningene. 
Det at dette er en relativ gammel "standard", som setter en del begrensninger i forhold til dagens behov, har gjort det nødvendig å komme med et nytt grensesnitt mot integrasjonspunktet, som bøter på utfordringer man opplever med BEST/EDU.

Hovedsakelig dreier dette seg om:
- Behov for flere avleverende og mottakende systemer innenfor virksomhetene
- Behov for å kunne sende til privatpersoner
- Behov for nye meldingstyper
- Begrensinger på meldingsstørrelse
- Behov for bedre statusoppdateringer

eFormidling 2.0 er arbeidsnavnet på neste generasjons grensesnitt mot integrasjonspunktet.

Adresseringen er i likhet med DPI og PEPPOL, SBDH med en fortetningsmelding.
Hver melding blir i utgangspunktet en unik ressurs i grensesnittet, og kan i løpet av livsløpet sitt spores og endres gjennom denne ressurslenken. 
For å sikre høyest mulig kvalitet så tilbyr grensesnittet oppslag mot hvilke typer meldinger det lokale endepunktet støtter, samt tilby mulighet til å hente ut maler/prototyper på meldinger. I praksis er dette de to ytterste lagene i meldingsstrukturen, det vil si konvolutten (SBDH) og det forretningsmeldingsformatet som er assosiert med meldingstypen. Innholdet som skal frem til mottaker blir lagt til med et egne kall, slik at det i fremtiden er mulig å støtte flere forskjellige løsninger (mellom annet tilpasse for opplasting av store filer).

Tanken med denne løsningsarkitekturen er at man skal kunne integrere individuelle/tilpassede valideringsløsninger for hver meldingstype. Et annet motiv er at man skal eliminere behovet for virksomhetssertifikater andre plasser enn i integrasjonspunktet.



_**Grensesnittet, implementasjonen og dokumentasjonen er fremdeles under utvikling, så endringer må påberegnes**_



