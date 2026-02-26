---
title: Tenester i sandkassen

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_tjenester
---

På denne sida finn du linkar til dei mest nytta tenesten som inngår i sandkassen.   

Du kan sjå alle som er registert via [innsynstenesta](https://innsyn.test.eidas2sandkasse.net/). På sikt vil denne informasjonen også bli tilgjengeleg over [eit standardisert API](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts5-common-formats-and-api-for-rp-registration-information.md#32-api-methods-for-registrar-queries-open-api).


## Utstedere

* [Bevisporten til Digdir](lommebok_digdir_utsteder).  Bevisporten er Digdir sin nye utstedar for sandkassen. Den kan utstede fleire bevis av ulike typar, frå ulike autoritative kjelder, og signere med ulike typar sertifikat.
* [Utstedelse av virksomhetsidentifikator](https://brreg.eudiw.no/) - Brønnøyundregistra sin teneste for utstedelse av virksomhetsidentifikatorar for organisasjonar registrert foretaksregisteret.
* [Symfoni Virksomhetslommebok (utsteder)](https://symfoni.dev/) — Symfoni si virksomhetslommebok kan utstede digitale bevis til personar og andre organisasjonar. Er du med i sandkassen, tek du kontakt med Digdir eller Symfoni for å få tilgang.

## Brukarstader

* [Digdir demo brukarstad](lommebok_demo_brukarstad)  Her kan du teste aldersverifisering basert på PID,  og fullmaktsinnlogging basert på fullmaktsbevis.  Du får kan også studere protokoll-flyten.
* [ID-porten](https://demo-client.test.idporten.no/)  I testmiljøet til ID-porten er det mogeleg å logge inn med eit PID-dokument som er utstedt av utstedaren vår.
* [Symfoni Virksomhetslommebok (brukarstad)](https://symfoni.dev/) — Symfoni si virksomhetslommebok kan ta imot og verifisere bevis frå person- og virksomhetslommebøker.  Er du med i sandkassen, tek du kontakt med Digdir eller Symfoni for å få tilgang.


## Person-lommebøker
* [Digdir demo lommebok](lommebok_demo_app)   Digdir tilbyr en lommebok for iOS og Android som primært er tiltenkt at deltakerne i sandkassen kan få teste sine usecase/brukerhistorier.
* Symfoni ID — Personleg digital lommebok frå [Symfoni AS](https://www.symfoni.dev/) for å ta imot, lagre og presentere digitale bevis. Brukes i skarp pilot, med ekte tilflyttere, av UDI og UIO i [Kompetansespor](https://lnkd.in/dgEUnctn), vinner av [Fyrlyktprisen 2025](https://www.nokios.no/#:~:text=Symfoni). Tilgjengeleggjerast Q2, 2026.

## Virksomhetslommebøker
* [Symfoni Virksomhetslommebok](https://symfoni.dev/) — Digital lommebok frå Symfoni AS for organisasjonar (juridiske personar). Handterer verifiserbare virksomheitsbevis som firmaattest, skatteattest og bevillingar. Kan også fungere som brukarstad (motta bevis) og utsteder. Utvikla i partnarskap med Brønnøysundregistrene. Integrert med Digdirs felleskomponenter. Pilotert i Oslo kommune ([«Enkel Servering](https://aktuelt.oslo.kommune.no/naeringsetaten-utforsker-fremtidens-it-losninger-kan-effektivisere-saksbehandling-og-soknadsprosesser)») og av Skatteetaten ([Born Digital](https://www.skatteetaten.no/globalassets/om-skatteetaten/analyse-og-rapporter/rapporter/born-digital-digitale-samhandlingsmonstre.pdf)). Er du med i sandkassen, tek du kontakt med Digdir eller Symfoni for å få tilgang.

## Signeringsleverandører

## Testing

OpenID Foundation tilgjengeleggjer conformance test suites som kan nyttast i din eigen utvikling av tenester.  Du kan velge om du skal teste utsteder, lommebok, eller brukerstad.  Sjå meir info på [How to Run Conformance Tests for OpenID for Verifiable Presentations](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-presentations/).

[https://issuer.eudiw.dev/](https://issuer.eudiw.dev/).  EU-kommisjonen tilbyr ein relativt teknisk orientert utstedar av PID og mobilt førarkort. Den er ikkje integrert med sandkassen si tillitsliste, men er nyttig å bruka i eigen utvikling.

[EU-kommisjonen demo-brukerstad](https://verifier.eudiw.dev/home) Ein teknisk fokusert demo-brukastad frå EU-kommisjonen. 




