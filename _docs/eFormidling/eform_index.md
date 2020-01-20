---
title: eFormidling
description:Digitaliseringsdirektoratets  løsning for meldingsutveksling i offentlig forvalting
summary: "Difis løsning for meldingsutveksling i offentlig forvalting"
permalink: eformidling_index.html
sidebar: main_sidebar
---

## Bakgrunn

eFormidling er et konsept for sikker og effektiv meldingsutveksling i offentlig sektor. eFormidling vil tilrettelegge for videre samspill på tvers av offentlig sektor.

Digitaliseringsdirektoratet har utviklet integrasjonspunktet for eFormidling, som er en løsning som bidrar til en mer sikker, samordnet og effektiv meldingsutveksling, primært i offentlig sektor. Arkitekturen som ligger til grunn i eFormidling vil gjøre det enkelt å ta i bruk CEF-eDelivery for meldingsutveksling. Løsningen er i produksjon og er allerede tatt i bruk av flere virksomheter.

Kort fortalt gjør eFormidling det mulig å kommunisere med virksomheter (etterhvert også innbyggere) på en enkel og sikker måte, uten å måtte ta hensyn til om mottakeren er en privat eller offentlig virksomhet.

## Slik fungerer eFormidling

{% include image.html file="/eformidling/illustrasjon_eformidling_hvit.png"  alt="eFormidling skisse over flyt" caption="eFormidling flyt" %}

Illustrasjonen over viser hvordan en melding i eFormidling blir forflyttet fra sak/arkivsystemet eller et annet fagsystem i din virksomhet, gjennom integrasjonspunktet, via en meldingsformidler, og gjort tilgjengelig for mottaker. Mottakeren vil få meldingen enten gjennom sitt sak/arkivsystem eller i virksomheten sin meldingsboks i Altinn. På sikt vil du også kunne sende til innbyggers digitale postkasse, Digipost eller eBoks.

**DPO** = Digital post offentlig virksomhet - meldinger mellom offentlige virksomheter som bruker integrasjonspunktet

**DPV** = Digital post til virksomhet - meldinger til en virksomhets postboks hos Altinn

**DPF** = Digital post til FIKS meldingsformidler - meldinger til kommuner og andre virksomheter som bruker FIKS meldingsformidler

**DPI** = Digital post til innbygger - meldinger sendt til innbyggers digitale postkasse (ikke tilgjengelig via eFormidling pr. i dag)
 

​​​​​​**A - Avsender av meldinger**
* Til venstre ser du «huset» som representerer din virksomhet. Her har du et sak-/arkiv system og flere fagsystemer.

* I «døråpningen» ligger det lokale integrasjonspunktet installert. Ansvar for drift av lokalt integrasjonspunkt ligger hos virksomheten.

 

**B - Infrastruktur - slik sendes meldinger i eFormidling**
* Integrasjonspunktet gjør adresseoppslag, ut fra organisasjonsnummer (eventuelt fødselsnummer).

* Ulike meldingsformidlere benyttes, avhengig av mottakeren.

DPO og DPF har piler i begge retninger i illustrasjonen over. Dette kaller vi toveis kommunikasjon, altså kan mottaker også besvare meldingen.

 

**C - Mottaker av meldinger**
•Dere kan sende til alle som har et organisasjonsnummer som er registrert i enhetsregisteret. Mottaker kan dermed være en statlig eller privat virksomhet, frivillig organisasjon, kommune eller fylkeskommune.

•Pr. i dag er det ikke mulig å sende til innbygger via eFormidling (for andre enn pilotvirksomheter). For å sende til innbygger gjør integrasjonspunktet adresseoppslag basert på fødselsnummer.
