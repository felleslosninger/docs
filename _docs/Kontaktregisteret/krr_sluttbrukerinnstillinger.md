---
title: Lenke til MinProfil (sluttbrukerinnstillinger) og "gotoURL"-funksjonalitet
description: 

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_sluttbrukerinnstillinger
---


## Bruksområde

I tjenesten MinProfil kan sluttbruker oppdatere sin kontaktinformasjon:
1)	testmiljøet:          [https://minprofil.test.kontaktregisteret.no/](https://minprofil.test.kontaktregisteret.no/)
2)	produksjonsmiljøet:	  [https://minprofil.kontaktregisteret.no/](https://minprofil.kontaktregisteret.no/)

Kunde (virksomhet) kan lenke sluttbruker til MinProfil og sende sluttbruker tilbake til sin tjeneste. Hvordan kunde kan sender sluttbruker tilbake til tjenesten blir omtalt i avsnittet "gotoUrl" under.


## Ny URL for MinProfil

Tidligere kunne sluttbruker oppdatere sin kontaktinformasjon i tjenesten Brukerprofil på URLen brukerprofil.difi.no/minprofil. Denne tjenesten er nå erstattet med MinProfil (se URLer i avsnittet over). 


## "gotoURL"

Etter at sluttbrukeren har oppdatert kontaktinformasjon på MinProfil kan kunde sende sluttbrukeren tilbake til sin tjeneste. For å ta i bruk denne såkalte "gotoUrl"-tjenesten, må kunde melde inn gyldig URL til servicedesk@digdir.no. Merk innsendingen med «KRR – gotoUrl». 


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

Eksempelverdi: http://www.tjenesteeier.no/tjeneste-for-innsending-som-sluttbruker-var-i

Valideringsregler:
- Gyldig URL med protokoll.
- All input skal være lower case.
