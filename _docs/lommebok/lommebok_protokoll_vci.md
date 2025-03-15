---
title: Protokoll-flyt for å laga bevis
description: Protokoll-flyt for OpenID4VCI

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_protokoll_vci
---

På denne sida forsøker me å forklara protokoll-flyten du må følgje når ein utstedar skal laga eit bevis som skal inn i lommeboka.

Protokollen er basert på [OpenID4VCI-standarden](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-wg-draft.html). Standarden er framleis under utvikling, men er planlagd å nå Final innan sumaren 2025.  Firmaet Authlete har publisert ein veldig god og detaljert [tutorial for bruk av VCI-standarden](https://www.authlete.com/developers/oid4vci/).


Ein VCI-flyt er i praksis ein vanleg OpenID Connect-flyt som er utvida med eit ekstra steg der klienten (=lommeboka) hentar sjølve beviset frå ein **Credential Issuer**.  

## I praktisk bruk

Lommeboka må på ein eller annan måte få kunnskap om KVAR den kan få tak i eit bevis av ein gitt type. Dette kan i hovsak skje på to måtar:

1. For "populære" bevis, som t.d. førarkort eller digital pass, so forventer me at lommebøkene vil kome med **førehandskonfigurerte lenker**, slik at brukaren t.d. klikkar på "Hent førarkortet mitt" inni appen for å starte protokoll-flyten. 
2. For andre bevis so må brukaren logge inn til ei nett-teneste tilhøyrande bevis-utstedar.   Lommeboka vil bli trigga til å starte protokoll-flyten anten ved at brukaren scanner ein QR-kode, eller ved direkte-kommunisjon vha. [Digital Credentials](https://wicg.github.io/digital-credentials/) browser-APIet, eventuelt via nærleiksdeteksjon via NFC eller bluetooth-LE. 


FORSØK Å GJE EI GOD FORKLARING AV CREDENTIAL OFFER.  BØR DEI BRUKE DET, ELLER IKKJE ?

FORKLARE KEY BINDING OG KORLEIS EIN (KANKSJE) TRENG FUNKSJONELL STØTTE I AS (les ID-porten) FOR Å KUNNE UTSTEDE DETTE. 
KAN EIN OPPNÅ KEY BINDING BASERT PÅ PID-PRESENTASJON ? (KORLEIS HANDTERE  KEYBINDING AV t.d. 1 FØRARKORT MOT MASSE-UTSTEDTE PID )


LEGG FLYTSKJEMA

LAGE EKSEMPLER



Standarden opnar for at  Credential Issuer anten kan vere ein sjølvstendig komponent, eller kan også vere innbygd funksjonalitet i ein eksisterande autorasasjons-server (som ID-porten).



