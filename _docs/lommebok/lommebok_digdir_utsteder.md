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

Utstedaren vår er laga for kunne dekke fylgjande 4 bruksmønster:

1. [Datakjelde styrer flyten, push av bevis-innhald](lommebok_digdir_utsteder_kjeldestyrt)
2. [Datakjelde styrer flyten, pull av bevis-innhald over API](lommebok_digdir_utsteder_kjeldestyrt)
3. Utstedar styrer flyten
4. Lommeboka styrer flyten

Klikk på lenke ovanfor for å få ytterlegare dokumentasjon av desse bruksmønstra.

## Funksjonalitet
Me ynskjer at utstedaren skal følge Final-versjonen av OpenID4VCI.  Dog testar me primært mot  EU sin demolommebok, og denne ligg litt "bakpå", so det kan vere at noko av vår protokoll-støtte enno er for gamal.

Features som er støtta no:
- ISO mdoc bevis-format
- Pre-authorization code 
- Authorization-code flow 
- Bruksmønster 1,2,3,4

Framtidig funksjonalitet:
- tx_code
- SD-JWT bevis-format
- Web-grensesnitt for sluttbrukar
- key binding
- Bevis-type-spesifikke signeringssertifikat
- Autentisering og autorisasjon av lommebøker basert på WUA
- verifisering mot [OpenID conformance test suites](https://openid.net/certification/conformance-testing-for-openid-for-verifiable-credential-issuance/)


## Bruksmønster 1: Datakjelde styrer flyten, push-basert bevis-innhald

I dette bruksmønsteret so er det datakjelda som styrer flyten:
1. Sluttbrukar er innlogga på ei nett-teneste hjå datakjelda og ynskjer få eit bevis. 
1. Datakjelda klargjer bevis-innhaldet og sender til utstedar
1. Responsen er eit Credential Offer som datakjelda rendrar som ein brukerspesifikk QR-kode
1. Brukaren scanner QR-koden med lommeboka si og får beviset utlevert

Flyten vist som eit sekvensdiagram:

<div class="mermaid">
sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant t as Teneste
  participant u as Utstedar

  note over b,t: loggar inn på teneste og startar bevis-utstedelse

  t->>+u: /start-issuance-transaction(bevis-type, {bevis-innhald})
  u-->>-t: Credential Offer m/ pre-auth code
  t-->>t: rendre QR 

  note over b,t: scann QR med lommebok
  l->>+u: /token (pre-auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>

I praksis treng du som data-kjelde berre sende eitt enkelt backend-kall til utstedar sitt [/start_issuance-endepunkt](https://utsteder.test.eidas2sandkasse.net/swagger-ui/index.html#/eudiw-issuer-api-v1/startIssuanceEndpoint) for å setje igang flyten.

Dette endepunktet er sikra med access-token frå anten Maskinporten eller ID-porten alt etter bevis-type. Det er også ulike scopes for ulike bevis-typar, desse finn du i [credential metadata](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer). 

Sidan utstedaren i dette bruksmønsteret ikkje har noko browser-interaksjon med sluttbrukar, betyr det at utstedar stoler fullt og heilt på at datakjelda tek ansvar for at sluttbrukaren er nyleg innlogga hjå dei, og at sluttbrukar er informert om og har til hensikt å utstede bevis av aktuell type.  Tilliten kan aukast, ved at bevis-typen blir konfigurert til å vere sikra med [ID-porten-scope med samtykke](oidc_auth_oauth2) istadenfor Maskinporten.

Ta kontakt med oss for å avtale at me legger til støtte for nye bevis-typar.

#### Protokoll og testing
For å realisere denne flyten er det [pre-authorization code flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-pre-authorized-code-flow) som er i bruk.

Pt. er ikkje tx_code støtta.

Me har laga ein hendig [teknisk retta demo-klient](https://demo-ui-utsteder.test.eidas2sandkasse.net/) for dette bruksmønsteret.  Du limer inn ein json som passar med den aktuelle bevistypen, og so vil demo-klienten rendre ein QR-kode som du kan scanne med ei lommebok. 


## Bruksmønster 2: Datakjelde styrer flyten, pull-basert bevis-innhald

Som i førre døme, så er det også sluttbrukaren allereie innlogga hjå ei nett-teneste hjå data-kjelda, og det denne tenesta som rendrar QR-koden:
1. Sluttbrukar er innlogga på ei nett-teneste hjå datakjelda og ynskjer få eit bevis. 
1. Datakjelda ber utstedar laga eit bevis av ein gitt type
1. Utstedar hentar bevis-innhaldet frå eit eksisterande hjå datakjelda
1. Responsen er eit Credential Offer som datakjelda rendrar som ein brukerspesifikk QR-kode
1. Brukaren scanner QR-koden med lommeboka si og får beviset utlevert


Flyten vist som eit sekvensdiagram:

<div class="mermaid">
sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant t as Teneste
  participant a as API
  participant u as Utstedar

  note over b,t: loggar inn på teneste og startar bevis-utstedelse

  t->>+u: /start-issuance-transaction(bevis-type, fødselsnummer )
  u->>a: hent bevis-innhald
  u-->>-t: Credential Offer m/ pre-auth code
  t-->>t: rendre QR 

  note over b,t: scann QR med lommebok
  l->>+u: /token (pre-auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>

Også her er det pre-authroization code flow som blir brukt.




## Bruksmønster 3: Utstedar styrer flyten

I dette bruksmønsteret treng du som datakjelde berre tilby eit API der utstedaren kan hente bevis-data.  All interaksjon med sluttbrukar skjer gjennom utstadaren si innlogga web-grensesnitt.

1. Sluttbrukar loggar inn til utstedaren
1. Sluttbruker velger eit bevis hen vil ha,
1. Utstedaren hentar bevis-innhaldet frå eit API hjå datakjelda
1. Utstedaren rendrer ein brukerspesifikk QR-kode
1. Brukaren scanner QR-koden med lommeboka si og får beviset utlevert



<div class="mermaid">
sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant u as Utstedar
  participant a as API

  note over b,u: loggar inn i Utstedar og startar bevis-utstedelse

  u->>a: hent bevis-innhald
  u-->>u: rendre QR 

  note over b,u: scann QR med lommebok
  l->>+u: /token (pre-auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>

Også her er det pre-authroization code flow som blir brukt mot lommeboka.



## Generelt

I både bruksmønster 3 og 4 so kan datakjelde "guide" sluttbrukar i riktig retning ved å tilby statiske QR-koder eller lenker som startar den aktuelle flyten. 

## Metadata

Du bør finne alt som trengs for å kunne samhandle med utstederen via credential metadata-endepunktet:
[https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer)

## Kjeldekode og arkitektur

Kjeldekode for utstedaren finn du på [sandkassen sitt Github-område](https://github.com/eudi-wallet-no).   Utstedaren består av fleire mikrotenester:

- *eudiw-issuer-server*: backend som er hovudmotoren i utstedaren
- *eudiw-auth-server* Ein Oauth2 autorisasjonsserver spesialtdesigna for utstedaren
- *eudiw-issuer-ui*: brukargrensesnitt for innbyggar
  
