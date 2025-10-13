---
title: Tenester i sandkassen

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_tjenester
---

På denne sida finn du linkar til dei mest nytta tenesten som inngår i sandkassen.   

Du kan sjå alle som er registert via [innsynstenesta](https://innsyn.test.eidas2sandkasse.net/). På sikt vil denne informasjonen også bli tilgjengeleg over [eit standardisert API](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts5-common-formats-and-api-for-rp-registration-information.md#32-api-methods-for-registrar-queries-open-api).



## Utstedere

* [Digdir utsteder](lommebok_digdir_utsteder).  Dette er Digdir sin nye utstedar for sandkassen. Den kan utstede fleire bevis av ulike typar, frå ulike autorative kjelder, og signere med ulike typar sertifikat.
*  [https://issuer.eudiw.dev/](https://issuer.eudiw.dev/).  EU-kommisjonen tilbyr ein relativt teknisk orientert utstedar av PID og mobilt førarkort. Den er ikkje integrert med sandkassen si tillitsliste, men er nyttig å bruka i eigen utvikling.

## Brukarstader

* [Digdir demo brukarstad](lommebok_demo_brukarstad)  Her kan du teste aldersverifisering basert på PID,  og fullmaktsinnlogging basert på fullmaktsbevis.  Du får kan også studere protokoll-flyten.
* [ID-porten](https://demo-client.test.idporten.no/)  I testmiljøet til ID-porten er det mogeleg å logge inn med eit PID-dokument som er utstedt av utstedaren vår. 
* [EU-kommisjonen demo-brukerstad](https://verifier.eudiw.dev/home) Ein teknisk fokusert demo-brukastad frå EU-kommisjonen. 

## Lommebøker
* [Digdir demo lommebok](lommebok_demo_app)  Her kan du teste utstedelse og bruk av bevis i sandkassen.

## Testing

OpenID Foundation tilgjengeleggjer conformance test suites som kan nyttast i din eigen utvikling av tenester.  Du kan velge om du skal teste utsteder, lommebok, eller brukerstad.  Sjå meir info på [How to Run Conformance Tests for OpenID for Verifiable Presentations](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-presentations/).
