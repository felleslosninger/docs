---
title: Digdir sin utsteder
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_demo_utsteder
---

Digdir tilby ein enkel demo-utsteder i sandkassen.  

Den er primært laga for å utstede PID-dokumentet, men har per idag også høve til å utstede eit fullmaktsbevis og eit dagleg-leiar-bevis.  Me har fokusert på å få den til å virke mot EU sin demolommebok, og har ikkje brukt noko særleg tid på teste mot andre lommebøker.  Den kan idag ustede berre i mdoc-format.

Me jobbar med å generalisere denne, slik at den lettare kan hekte seg på andre datakjelder og tilby fleire bevis.  Me vil også utvide den til å utstede bevis i SD-JWT VC-format.


## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://demo-vc-issuer.test.idporten.no/.well-known/openid-credential-issuer](https://demo-vc-issuer.test.idporten.no/.well-known/openid-credential-issuer])

