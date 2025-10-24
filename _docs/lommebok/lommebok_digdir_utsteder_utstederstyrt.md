---
title: Bevisporten: utstedelse styrt av utstedar
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder_utstedarstyrt
---

Denne sidan dokumenterer bruksmønsteret for **utstedare-styrt utstedelse** ved bruk av Digdir sin bevis-utstedar, Bevisporten.

Denne flyten er hensiktmessig for verksemder som ynskjer å overlate det meste av jobben med bevisutstedelse til ein leverandør.  
Du ynskjer ikkje å gjere endringar i eigne tenester for å lage ein utstedelseskapabilitet.  Det kan også vere hensiktsmessig å starte utprøving av bevisutstedelse med denne flyten, og so migrere til ein av dei andre brukermønstra seinare. 

Den funksjonelle skilnaden på denne flyten og [lommebok-styrt utstedelse](lommebok_utsteder_lommebokstyrt) er berre kvar brukaren startar.


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





## Grensesnittsdefinisjon 

Du som datakjelde må stille eit API tilgjengeleg som utstedaren kan hente data om brukaren frå.   Digdir må lage ein plugin i utstedaren som integrerer mot dette APIet.

Mange datakjelder har allereie eit slik API frå før, då treng du i praksis ikkje gjere noko anna enn å ta kontakt med oss for å drøfte korleis me kan kome igang saman. 

## Protokoll og testing

Ved bruk av denne brukerreisa so vert det nytta [pre-authorization code flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-pre-authorized-code-flow).



Demo-lommeboka til Digdir er integrert mot utstedaren, slik at du kan teste dette ved å trykke plus-symbolet i lommeboka, og so velge ditt bevis.
