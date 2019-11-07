---
title: Bruk av ID-porten for innlogging til webtjenester
description: 
summary: 
permalink: idporten_bruksomrade_webtjenester.html
sidebar: idporten_sidebar
product: ID-porten
---

## Overordna beskrivelse av bruksområdet

ID-porten tilbyr funksjonalitet for autentisering av sluttbrukere. Det er to tilgjenglige grensesnitt i ID-porten for dette formålet: 
OpenID Connect og SAML2. OpenID Connect er den anbefalte protokollen for alle nye integrasjoner. SAML2 er tilgjenglig for de som ikke
kan bruke OpenID Connect-grensesnittet. Dokumentasjonen på denne siden vil i hovedsak ta utgangspunkt i OpenID Connect protokollen. 
Se egen beskrivelse av SAML2 grensesnittet for dokumentasjon av dette.

Måten du integrerer mot ID-porten på vil variere alt etter hvilket bruksområde eller type tjeneste du som tjenesteleverandør ønsker å tilby.
Med bruksområdet "innlogging til webjenester" som beskrevet på denne siden mener vi tradisjonelle webtjenester der mesteparten av
applikasjonslogikken blir håndtert på serversiden, i motsetning til single-page javascriptapplikasjoner (SPA'er) eller mobilapplikasjoner.

Autentiseringen blir utført av ID-porten sin OpenID Connect provider som utsteder ID Token til den aktuelle tjenesten.

<div class="mermaid">
graph LR
  end_user(Sluttbruker)
  OP(OpenID Connect provider)
  RP(Nett-tjeneste)
  end_user -. autentiserer seg hos .-> OP
  OP -. utsteder id_token .-> RP
  end_user -. logger inn i  .-> RP
</div>

Følgende aktører inngår:

| Aktør | Beskrivelse | Begrep i OpenID Connect |
| -|-|-|
| Sluttbruker | Ønsker å logge inn til en offentlig tjeneste | End User |
| Nett-tjeneste | Sluttbruker-tjeneste tilbudt av en offentlig etat | Relying Party (RP) / Client |
| ID-porten | ID-porten sin autentiseringstjeneste som usteder *ID Token* til aktuelle tjenesten| OpenID Provider (OP) |

