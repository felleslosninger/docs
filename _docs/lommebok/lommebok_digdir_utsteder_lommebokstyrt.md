---
title: Bevisporten, utstedelse styrt av lommeboka
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder_lommebokstyrt
---

Denne sidan dokumenterer bruksmønsteret for **lommebok-styrt utstedelse** ved bruk av Digdir sin bevis-utstedar, Bevisporten.

Denne flyten er hensiktmessig for verksemder som ynskjer å overlate det meste av jobben med bevisutstedelse til ein leverandør.  
Du ynskjer ikkje å gjere endringar i eigne tenester for å lage ein utstedelseskapabilitet.  Det kan også vere hensiktsmessig å starte utprøving av bevisutstedelse med denne flyten, og so migrere til ein av dei andre brukermønstra seinare. 

## Bruksmønster 3: Lommeboka styrer flyten

I dette bruksmønsteret so startar flyten i lommeboka:

1. Sluttbrukar opnar lommeboka og velgjer aktuelt bevis frå ei liste 
1. Lommeboka opnar nettlesaren og sender den til utstedaren
1. Sluttbrukar autentiserer seg mot utstedaren
1. Utstedaren hentar bevis-innhaldet frå eit API hjå datakjelda
1. Utstedaren si nett-teneste sender brukaren attende til lommeboka
1. Lommeboka hentar beviset frå utstedaren

Merk at steg 2-5 i nokre tilfelle kan opplevast automatisk dersom brukaren har ein aktiv SSO-sesjon hjå utstedaren. 


<div class="mermaid">
sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant n as Nettleser
  participant u as Utstedar
  participant a as API

  b-->>l: åpner lommebok, velger bevis
  l->>u: /authorize-kall med bevistype
  u-->>n: redirect som åpner nettleser
  note over b,u: logger inn

  u->>+a: hent bevis-innhald
  a-->>-u: data

  u-->>l: redirect tilbake

  l->>+u: /token (auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>

Sjølv om datakjelda ikkje utviklar noko eigen funksjonalitet, so kan du "guide" sluttbrukar i riktig retning ved å tilby statiske QR-koder eller lenker som startar den aktuelle flyten. 



## Grensesnittsdefinisjon 

Du som datakjelde må stille eit API tilgjengeleg som utstedaren kan hente data om brukaren frå.   Digdir må lage ein plugin i utstedaren som integrerer mot dette APIet.

Mange datakjelder har allereie eit slik API frå før, då treng du i praksis ikkje gjere noko anna enn å signere Samarbeidsavtalen for å kunne kome i gang med bevisutstedelse.

Ta kontakt med oss for å drøfte mogelegheiter for å kome igong.


## Protokoll og testing
Ved bruk av denne brukerreisa so vert det nytta [authorization code flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-authorization-code-flow)
  
Demo-lommeboka til Digdir er integrert mot utstedaren, slik at du kan teste dette ved å trykke plus-symbolet i lommeboka, og so velge ditt bevis.
