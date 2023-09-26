---
title: MinProfil - tjeneste der sluttbruker kan oppdatere kontaktinfo
description: 

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_sluttbrukerinnstillinger
---

## Bruksområde

Kunde (virksomhet) kan lenke til tjenesten MinProfil, der sluttbruker kan oppdatere sin kontaktinformasjon
1)	testmiljøet:          [https://minprofil.test.kontaktregisteret.no/](https://minprofil.test.kontaktregisteret.no/)
2)	produksjonsmiljøet:	  [https://minprofil.kontaktregisteret.no/](https://minprofil.kontaktregisteret.no/)


## Ta i bruk

For å ta i bruk tjenesten må kunde melde inn gyldig URL til servicedesk@digdir.no. Merk innsendingen med «KRR – gotoURL».

> I testmiljøet støtter oppslagstjenesten token fra [test.maskinporten.no](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_wellknown) (ikke ver2.maskinporten.no) 

### Input data
Tjenesten har følgende http request parameter som kan benyttes:

| request parameter | beskrivelse |
|-|-|
| gotoURL | Lenke (URL) til tjeneste til tjenesteeier som sluttbruker skal bli sendt tilbake til |

> Merk! 
- request parameter er ikke påkrevd.
- Dersom ingenting blir sendt inn bil lenketjenesten lenke til "Logg ut" i ID-porten. 
- Reuest parameter må URL-encodes.
- Gammel request parameter "goto" er erstattet med "gotoUrl":
https://minprofil.kontaktregisteret.no/?gotoUrl=https://www.teneste.no


> Nye Oppslagstjenesten - Lokal Kopi (endringsmeldinger) vil ha endrings-ID som er større enn 200 000 000.


### Validering av gotoURL

Eksempelverdi: http://www.tjenesteeier.no/tjeneste-for-innsending-som-jeg-var-i

Valideringsregler:
- Gyldig URL med protokoll
- All input skal være lower case.
