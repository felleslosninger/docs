---
title: Registrering av OIDC klienter
description: Registrering av OIDC klienter
summary: "ID-porten støtter flere typer klienter. Klienter må forhåndsregisteres, og korrekt registering av klient er viktig at sikkerheten skal være ivaretatt."
permalink: oidc_func_clientreg.html
sidebar: oidc
product: ID-porten
---

## Typer klienter

ID-porten støtter flere typer klienter, og det er kundens ansvar å sørge for at det faktiske bruksmønsteret er i samsvar med registreringen. Korrekt registrering er spesielt viktig for klienter som konsumerer APIer tilbudt av andre, og ID-porten og API-tilbyders bruksavtaler regulerer dette ansvarsforholdet.

Valg av klient-type er en sikkerhetsvurdering kunden skal utføre.  Vi kategoriserer klienter ved hvordan de autentiserer og identifiserer seg opp mot ID-porten. Dette er i sin tur avhengig av kjøretidsmiljøet til klienten. Vi legger til grunn  på definisjonene fra  [Oauth2 kap 2.1](https://tools.ietf.org/html/rfc6749#section-2.1).

Difi forutsetter at
**skriv noko om rutiner for utstedelse, identifikasjon,  oppbevaring av nøkler**

### 1: Standard-klient

Typisk en server-side nett-tjeneste som er plassert i et sikkert driftsmiljø  ("web application" ihht. Oauth2).   Disse skal bruke autorisasjonskodeflyten.  De aller fleste av ID-portens kunder skal bruke denne klient-typen.

Det er sterkt anbefalt, men ikke påkrevd, å bruke PKCE, samt state- og nonce-parametrene for standardklienter.

Vi tilbyr tre ulike metoder for klientautentisering for slike klienter:

|Metode|Beskrivelse|
|-|-|
| Statisk hemmelighet | En statisk hemmelighet (*client_secret*) som Difi genererer og blir utvekslet manuelt, eller tilgjengeliggjort via selvbetjening.  Maks tillatt levetid er satt til 180 dager. Det er kundens ansvar å få rotert hemmeligheten før utløp for å sikre kontinuerlig tjenesteleveranse. |
| Virksomhetssertifikat   |  Klienten bruker et gyldig virksomhetssertifikat fra Buypass eller Commfides. Organisasjonsnummeret i sertifikatet må stemme med klient-registreringa. Kunden kan valgfritt velge å "låse" klienten til bare et spesifikt virksomhetssertifikat. |
| Asymmetrisk nøkkel  | Den offentlige nøkkelen fra et egen-generert asymmetrisk nøkkelpar blir registrert på klient, og klienten bruker privatnøkkelen til å autentisere seg.  For å få lov til å registere slike klienter, må kunden etablere en [egen  selvbetjeningsapplikasjon](oidc_api_admin.html) (som selv må bruke virksomhetssertifikat)  |

Difi anbefaler bruk av virksomhetssertifikat til klientautentisering,  da prosedyren for utstedelsen av slike er grundig regulert i lovverk, og gitt at eieren oppbevarer sertifikatet i henhold til beste praksis, gir dette både Difi og API-tilbydere en god og sikker identifisering av kunden.   

Maskin-til-maskin klienter faller alltid i 'standardklient'-kategorien, men her tillates ikke statiske hemmeligheter.


### 2: Brower-basert applikasjon / SPA

Typisk en javascript-klient som fullt og helt lever i brukerens browser.  En slik klient kan ikke beskytte en klient-hemmelighet/virksomhetssertfikat, og blir derfor en *public* klient.

Vi følger [de siste anbefalingene fra IETF](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-00), som sier at slike klienter skal bruke autorisasjonskodeflyten, og at både PKCE og state-parameter er påkrevd.

Merk at vi tidligere støttet *implicit* flyt for slike klienter.  Denne støtten vil bli faset ut.   Vi støtter heller ikke prompt=none.


### 3: Mobil-app

En mobil-app kalles *native app* i Oauth2-spesifikasjonene.  [RFC8252](https://tools.ietf.org/html/rfc8252) gir anbefaling om hvordan slike applikasjoner skal sikres.

Mobil-apper skal bruke autorisasjonskodeflyten og bruk av PKCE er påkrevd.

[Les mer om mobil-app'er](oidc_auth_app.html).

#### Oppsummert: tabell over klient-typer

Tabellen viser hvordan de ulike klient-typene vil se ut ved registrering over selvbetjeningsapi:

![klienttyper](assets/oidc_func_clientreg-1ef33602.png)

## Metadata

Følgende metadata registreres på klient:

Felles metadata:

|attributt|Påkrevd?|beskrivelse|
|-|-|-|
| client_id | Ja |Unik identifikator for klienten. Vil bli tildelt av Difi. |
| client_orgno | Ja |Klientens organisasjonsnummer.   |
| scopes | Ja |Liste over scopes som klienten kan forespørre. For OpenID Connect er aktuelle scope *openid*.  For API-sikring, ta kontakt med oss. |

For innloggings-klienter trengs i tilegg følgende:

|attributt|Påkrevd?|beskrivelse|
|-|-|-|
| display_name | Ja |Klientens organisasjonsnavn som benyttes ved visning på web |
| redirect_uris | Ja| Liste over gyldige url'er som provideren kan redirecte tilbake til etter vellykket autorisasjonsforespørsel. |
| post_logout_redirect_uris | Ja |Liste over url'er som provideren redirecter til etter fullført egen-initiert utlogging. |
| frontchannel_logout_uri | Nei|  URL som provideren sender request til ved utlogging trigget av annen klient i samme sesjon |
| frontchannel_logout_session_required | Nei |Flagg som bestemmer om parameterne for issuer og sesjons-id skal sendes med frontchannel_logout_uri |
| logo | Nei |Logo som vises i innloggingsbildete utveksles p.t. manuelt |

For klienter (både innlogging og maskin) som mottar *access_token* til API-sikring kan man registrere følgende:

| attributt | beskrivelse |
|-|-|
| authorization_lifetime | Levetid for registrert autorisasjon. |
| access_token_lifetime | Levetid for utstedt access_token |
| refresh_token_lifetime |Levetid for utstedt refresh_token |






## Registreringsmåter:

Vi har 3 måter du kan få registrert din klient:

- Manuelt, ved å sende epost til idporten@difi.no
- Selvbetjening, ved å logge inn på [Samarbeidsportalen](https://samarbeid.difi.no/)
- Selvbetjening, ved å bruke vårt [selvbetjenings-API](oidc_api_admin.html)


## Well-known endepunkt

Metadata om ID-porten er tilgjengelig på vårt .well-known-endepunkt ihht. [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).  På endepunktet finner du lenke til vårt JWK-endepunkt, der  ID-portens signeringssertifikat publiseres.  Vi anbefaler kunder sterkt om å bruke endepunktet til dynamisk egen-konfigurasjon for å sikre kontinuerlig tjeneste-leveranse når ID-porten bytter signeringssertifikat.

|Miljø|URL|
|-|-|
|VER1|[https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|
|VER2|[https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-ver2.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|
|YT2|[https://oidc-yt2.difi.eon.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc-yt2.difi.eon.no/idporten-oidc-provider/.well-known/openid-configuration)|
|PROD|[https://oidc.difi.no/idporten-oidc-provider/.well-known/openid-configuration](https://oidc.difi.no/idporten-oidc-provider/.well-known/openid-configuration)|
