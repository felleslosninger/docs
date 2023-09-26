---
title: MinProfil - tjeneste der sluttbruker kan oppdatere kontaktinfo
description: 

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_sluttbrukerinnstillinger
---

## Bruksområde

Kunde (virksomhet) kan lenke til tjenesten MinProfil, der sluttbruker kan oppdatere sin kontaktinformasjon:
1)	testmiljøet:          [https://minprofil.test.kontaktregisteret.no/](https://minprofil.test.kontaktregisteret.no/)
2)	produksjonsmiljøet:	  [https://minprofil.kontaktregisteret.no/](https://minprofil.kontaktregisteret.no/)


## Ta i bruk

For å ta i bruk tjenesten må kunde melde inn gyldig URL til servicedesk@digdir.no. Merk innsendingen med «KRR – gotoUrl».


### Input data
Tjenesten har følgende http request parameter som kan benyttes:

| request parameter | beskrivelse |
|-|-|
| gotoUrl | Lenke (URL) for tjenesten som sluttbruker skal bli sendt tilbake til |

> Merk! 
- request parameter er ikke påkrevd.
- Dersom ingenting blir sendt inn blir tjenesten lenket til "Logg ut" i ID-porten. 
- Request parameter må URL-encodes.
- Gammel request parameter "goto" er erstattet med "gotoUrl" (https://minprofil.kontaktregisteret.no/?gotoUrl=https://www.teneste.no)


### Validering av gotoURL

Eksempelverdi: http://www.tjenesteeier.no/tjeneste-for-innsending-som-jeg-var-i

Valideringsregler:
- Gyldig URL med protokoll.
- All input skal være lower case.
