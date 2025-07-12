---
title: Digdir sin demo-utsteder
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_demo_utsteder
---

Demo-utstederen er ein tidleg proof-of-concept på utstedelse, og er no (juni 2025) basert på snarvegar og utdaterte pre-releaser av OpenID4VCI-specen.

Den er primært laga for å utstede PID-dokumentet, men har per idag også høve til å utstede eit fullmaktsbevis og eit dagleg-leiar-bevis.  Me har fokusert på å få den til å virke mot EU sin demolommebok, og har ikkje brukt noko særleg tid på teste mot andre lommebøker.  Den kan idag ustede berre i mdoc-format.

Det blir ikkje jobba vidare med denne frå Digdir si side, me held på med å lage ein [meir robust utsteder](lommebok_digdir_utsteder).

## Brukargrensesnitt:

Du kan gå til [https://demo-utsteder.test.eidas2sandkasse.net/](https://demo-utsteder.test.eidas2sandkasse.net/)  for å teste utstedelse.

## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://demo-utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer](https://demo-utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer)

