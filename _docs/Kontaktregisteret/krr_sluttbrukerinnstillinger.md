---
title: MinProfil og gotoURL
description: 

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_sluttbrukerinnstillinger
---


## Oppdatering av kontaktinfo i MinProfil

I MinProfil kan sluttbrukeren oppdatere sine kontaktopplysninger (mobilnummer, e-post, digital postkasse, reservasjon mot kommunikasjon på nett, språk/målform). Du som kunde (virksomhet) kan lenke til MinProfil i din tjeneste, for få oppdatert kontaktinfo til dine brukere:

1)	testmiljøet:          [https://minprofil.test.kontaktregisteret.no/](https://minprofil.test.kontaktregisteret.no/)
2)	produksjonsmiljøet:	  [https://minprofil.kontaktregisteret.no/](https://minprofil.kontaktregisteret.no/)

Hvordan du som kunde kan sende sluttbrukeren tilbake til din tjenesten blir omtalt i avsnittet "gotoUrl" under.


## Oppgradert tjeneste og ny URL for MinProfil

Tidligere kunne sluttbrukeren oppdatere sin kontaktinformasjon i tjenesten Brukerprofil (brukerprofil.difi.no/minprofil). Denne tjenesten er nå oppgradert og erstattet med MinProfil (se URLer i avsnittet over). 


## "gotoURL"

Etter at sluttbrukeren har oppdatert sine kontaktopplysninger i MinProfil, kan du som kunde (virksomhet) sende sluttbrukeren tilbake til din tjeneste. Dette skjer ved å ta i bruk tjenesten "gotoUrl". For å kunne benytte tjenesten må virksomheten sende inn gyldig URL til servicedesk@digdir.no. Merk innsendingen med «KRR – gotoUrl». 


### Input data

Tjenesten "gotoURL" har følgende http request parameter som kan benyttes:

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
