---
title: Tenester i sandkassen

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_tjenester
---

På denne sida finn du linkar til dei mest nytta tenesten som inngår i sandkassen.   

Digdir jobbar med å laga ei web-basert innsynsteneste som gjere det mogeleg å sjå kva tenester som er registrert i tillitslista.


## Utstedere

* [Digdir utsteder](lommebok_digdir_utsteder).  
*  [https://issuer.eudiw.dev/](https://issuer.eudiw.dev/).  EU-kommisjonen tilbyr ein relativt teknisk orientert utstedar av PID og mobilt førarkort. Den er ikkje integrert med sandkassen si tillitsliste, men er nyttig å bruka i eigen utvikling.
* [Digdir demo utsteder](lommebok_demo_utsteder).  Dette er ein tidleg poc-teneste som kan utstede PID-dokument, eit fullmakts-bevis og eit dagleg-leiar-bevis.  Du kan også sjå på protokoll-flyten.


## Brukarstader

* [Digdir demo brukarstad](lommebok_demo_brukarstad)  Her kan du teste aldersverifisering basert på PID,  og fullmaktsinnlogging basert på fullmaktsbevis.  Du får kan også studere protokoll-flyten.
* [ID-porten](https://demo-client.test.idporten.no/)  I testmiljøet til ID-porten er det mogeleg å logge inn med eit PID-dokument som er utstedt av demo-utstedaren vår. 
* [EU-kommisjonen demo-brukerstad](https://verifier.eudiw.dev/home) Ein teknisk fokusert demo-brukastad frå EU-kommisjonen. 

## Lommebøker
* [Digdir demo lommebok](lommebok_demo_app)  Her kan du teste utstedelse og bruk av bevis i sandkassen.

## Testing

OpenID Foundation tilgjengeleggjer conformance test suites som kan nyttast i din eigen utvikling av tenester.  Du kan velge om du skal teste utsteder, lommebok, eller brukerstad.  Sjå meir info på [How to Run Conformance Tests for OpenID for Verifiable Presentations](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-presentations/).
