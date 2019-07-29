---
title: returPostHaandtering
permalink: returposthaandtering.html
sidebar:
---

| ---- | ---- |
| Identifikator |  |
| Term | returPostHaandtering |
| Definisjon | Definerer hvordan fysisk post som ikke blir levert til mottaker skal håndteres. |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | Valg av håndteringmetode for retur post. Dette blir valgt når post sendes til utskrift og avgjør hvordan returadresse og EA logo m.m. behandles. | 
| Gyldige verdier | DIREKTE_RETUR ; MAKULERING_MED_MELDING |


### Beskrivelse av gyldige verdier


| ---- | ---- |
| **Verdi** | **Beskrivelse** | 
| DIREKTE_RETUR | Returpost blir sendt direkte til adressen angitt som returpost adressen, ingen videre oppfølging. |
| MAKULERING_MED_MELDING | All post får lagt på et EA merke og en strekkode. Returpost blir sendt til Posten sin EA tjeneste der strekkoden blir scannet, melding om returpost blir sendt til Avsender og brevet blir makulert. |


