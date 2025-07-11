---
title: Digdir sin utsteder
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder
---

Digdir tilbyr ein enkel utsteder i sandkassen.  

Den er primært laga for å utstede PID-dokumentet, men har ein modulær arktiktur so den skal vere lett å integere mot andre datakjelder.

Som for demo-utstedaren, so fokuserer me primært på å få den til å virke mot EU sin demolommebok, og har ikkje brukt noko særleg tid på teste mot andre lommebøker.  Det er ei klar målsetning at utstedaren skal støtte siste draft av OpenID4VCI, og Final-versjonen når denne er klar.

Features som er støtta no:
- ISO mdoc-format

Framtidig funksjonalitet:
- SD-JWT-format
- Autentisering og autorisasjon av lommebøker basert på WUA



## Brukargrensesnitt:

Under arbeid.

## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer)

