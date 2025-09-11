---
title: returPostHaandtering

sidebar:
redirect_from: /2returposthaandtering
---

| ---- | ---- |
| Identifikator |  |
| Term | returPostHaandtering |
| Definisjon | Definerer hvordan fysisk post som ikke blir levert til mottaker skal håndteres. |
| Datatype | string |
| Kilde | Digdir |
| Kommentar | Valg av håndteringmetode for retur post. Dette blir valgt når post sendes til utskrift og avgjør hvordan returadresse og EA logo m.m. behandles. | 
| Gyldige verdier | DIREKTE_RETUR ; MAKULERING_MED_MELDING |


### Beskrivelse av gyldige verdier


| ---- | ---- |
| **Verdi** | **Beskrivelse** | 
| DIREKTE_RETUR | Returpost blir sendt direkte til adressen angitt som returpostadressen, ingen videre oppfølging. |
| MAKULERING_MED_MELDING | All post får lagt på et EA merke og en strekkode. Returpost blir sendt til Utskriftsleverandøren sin EA tjeneste der strekkoden blir scannet, melding om returpost blir sendt til Avsender og brevet blir makulert. Viktig merknad! Innimellom er det tilfeller der innbygger misforstår utskriftsleverandøren sin returpost-adresse og tror dette er adressen et svar på mottatt brev kan sendes til. Det er derfor viktig at avsendervirksomheter definerer en eventuell svar-adresse i brevmalen sin |


