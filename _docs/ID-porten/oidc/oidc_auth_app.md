---
title: Autentisering til mobil-app'er
description: Bruk av Idporten sin OpenID Connect provider til autentisering til mobil-app'er
summary: "Ved innlogging til en mobil-app, er det anbefalt å bruke PKCE sammen med autorisasjonskode-flyten"
permalink: oidc_auth_app.html
sidebar: oidc
product: ID-porten
---

## Overordna beskrivelse av bruksområdet

Tilsvarende [Single-page applikasjoner](oidc_auth_spa.html), så kan ikke en mobil-app beskytte hemlighetene sine på en tilfredstillende måte. Den er altså en Oauth2 public klient, og kalles ofte **native app** i oauth2-dokumentasjonen.

I [OAuth 2.0 for Native Apps](https://tools.ietf.org/html/draft-ietf-oauth-native-apps-12) er det gitt anbefalinger for hvordan bruke Oauth2/OpenID Connect på mobil-app'er. Vi anbefaler kunder  å studere dette dokumentet nøye. Vi vil trekke frem følgende:
* Autentisering må skje i ekstern browser (ikke embedded web-view).
* PKCE må brukes for å beskytte seg mot app'er som kan sniffe trafikken og stjele dialogen.
* Implisittflyt er _ikke_ anbefalt for mobil-app'er.

En mobil-app vil typisk integerere med kundens eget API ("app backend"). Det er opp til kunden om han vil bruke ID-porten sine access_token til sikring av dette APIet direkte, eller omsette ID-portens token til sine egne tokens.

Vanligvis er det backend-en som er registrert som klient i ID-porten, ikke selve app'en.

## Sentral oversikt og revokasjon

 Digitaliseringsdirektoratet krever at kunder som omsetter punkt-autentiseringen fra ID-porten til en langt-levende innlogging, oppfyller følgende krav:

* Har lokal sikring av app vha. touchID, ansiktsgjenkjenning el. lignende
* Aktive innlogginger skal vises på sentrale oversikt i ID-portens brukerprofil
* Håndterer sentral innbygger-initiert revokasjon av innloggingen fra ID-portens brukerprofil

Oversikt over innlogginger med revokasjonsmulighet for innlogget innbygger er også tilgjengelig [på et eget API](oidc_api_autorisasjoner.html), slik at kunden kan velge å også tilby slik funksjonalitet integrert i egen selvbetjeningsløsning.

### Teknisk beskrivelse

Den enkleste måten å håndtere kravene ovenfor, er å bruke et **langt-levende access_token** som manifestasjon av den lange innloggingen.  I praksis vil dette medføre:
1. Kunde registrerer et eget *oauth2 scope* i ID-porten.  Dette må ha følgende egenskaper:
    - en innbygger-vennlig beskrivelse
    - en levetid, basert på kundens egen risikovurdering
    - flagg som bestemmer om ID-porten skal spørre innbyggeren om et samtykke til den lange innloggingen.
2. Ved innlogging mottar klienten et *access_token* knyttet til innbyggeren med dette scopet og lagrer dette trygt i egen backend så lenge innloggingen er gyldig.  
3. Validerer at access_tokenet fremdeles er gyldig ved å sjekke det mot ID-portens /tokeninfo-endepunkt ved brukerhandlinger. Alternativt kan /revokelist-endepunktet brukes for bulkoversikt over revokerte access token, filtreres på clientId.
4. På grunn av den lange levetiden, bør ikke ID-portens token flyte ut til app'en, men istedet omsettes til egne token for sikring mellom app og egen backend.

Alternativt  kan kunden bruke en variant med kort-levde access_token i kombinasjon med refresh_tokens.

## Beskrivelse av innloggingsflyten for mobil-app'er

Flyten er identisk som for [autorisasjonskode-flyten](oidc_auth_codeflow.html), men med bruk av [PKCE](oidc_func_pkce.html):

I tilegg må kunden forespørre eget scope som hører til den langt-levende innloggingen og behandle dette som forklart i forrige avsnitt.


## Struktur på token

ID-tokenet er identisk som ved bruk av [autorisasjonskode-flyten](oidc_auth_codeflow#idtoken).  Selv om det er access_tokenet som skal benyttes videre, må kunden først validere id_tokenet ihht vanlig beste praksis for OIDC.

Access_tokenet vil inneholde fødseslnummer på innbyggeren, scopet som er registrert, og utløpstiden på tokenet.
