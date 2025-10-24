---
title: Digdir sin utsteder, Bevisporten
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder
---

Digdir tilbyr ein enkel utsteder i sandkassen.  

Den er laga både for å utstede PID-dokumentet, men har ein modulær arktiktur slik at den skal vere lett å integere mot andre datakjelder for å utstede bevis på deira vegne.  Ta kontakt med oss for å starte dialog dersom du ynskjer me skal produsere bevis for deg.

## Brukargrensesnitt

Per idag har utstedaren eit [ope web-grensesnitt](https://bevisporten.test.eidas2sandkasse.net/) der sluttbrukar kan få laga QR-koder som kan scannast for å initiere ein utstedelsesprosess. 

Utstedaren vil på sikt tilby eit web-grensesnitt der sluttbrukar kan logge inn og få utstedt bevis til seg sjølv.


## Bruksmønster

Utstedaren vår er laga for kunne dekke fylgjande 3 bruksmønster:

1. [Datakjelde styrer flyten](lommebok_digdir_utsteder_kjeldestyrt)
3. [Utstedar styrer flyten](lommebok_digdir_utsteder_utstederstyrt)
4. [Lommeboka styrer flyten](lommebok_digdir_utsteder_lommebokstyrt)


Me trur desse 3 variantane dekkjer dei fleste behova som offentleg sektor har for å kunne utstede bevis.  Klikk på lenkene ovanfor for å få ytterlegare dokumentasjon om kvart einskild bruksmønster.


## Funksjonalitet
Me ynskjer at utstedaren skal følge Final-versjonen av OpenID4VCI.  Dog testar me primært mot  EU sin demolommebok, og denne ligg litt "bakpå", so det kan vere at noko av vår protokoll-støtte enno er for gamal.

Features som er støtta no:
- ISO mdoc bevis-format
- Pre-authorization code 
- Authorization-code flow 
- Bruksmønster 1,2,3

Framtidig funksjonalitet:
- tx_code
- SD-JWT bevis-format
- Web-grensesnitt for sluttbrukar
- key binding
- Bevis-type-spesifikke signeringssertifikat
- Autentisering og autorisasjon av lommebøker basert på WUA
- verifisering mot [OpenID conformance test suites](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-credential-issuance/)



## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer)

## Kjeldekode og arkitektur

Kjeldekode for utstedaren finn du på [sandkassen sitt Github-område](https://github.com/eudi-wallet-no).   Utstedaren består av fleire mikrotenester:

- *eudiw-issuer-server*: backend som er hovudmotoren i utstedaren
- *eudiw-auth-server* Ein Oauth2 autorisasjonsserver spesialtdesigna for utstedaren
- *eudiw-issuer-ui*: brukargrensesnitt for innbyggar

