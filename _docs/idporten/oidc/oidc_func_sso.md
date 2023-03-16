---
title: SSO og SLO
description: SSO og SLO
summary: "ID-porten tilbyr Single Signon (SSO) og Single Logout (SLO)"

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_sso
---


## Om funksjonaliteten


ID-porten har siden oppstarten tilbudt single-signon (SSO), ved at alle tjenestene i føderasjonen tilhører samme Circle-of-Trust (CoT). Dette er en viktig funksjonalitet for å at innbygger skal ha en friksjonsfri opplevelse ved bruk av offentlige digitale tjenester, ved at man slipper hyppig re-autentisering.  Spesielt for samensatte tjenester, for eksempel såkalte lenketjenester, der innbygger "hopper" mellom ulike etater som del av en komplett tjenesteleveranse, er SSO en nøkkelfunksjonalitet.

Like viktig som single singon er single logout.  Det er vesentlig for sikkerheten til innbygger at hen blir logget ut av alle tjenester når hen klikker logout. **En feilkonfigurert logout-håndtering hos én kunde kan ødelegge for utlogging hos andre kunder, og gjøre innbygger sårbar for angrep.**


<div class="mermaid">
graph LR
  subgraph Digitaliseringsdirektoratet
    IDP[ID-porten]
    SAML[SAML-proxy]
  end
  subgraph Kunde
     sp[SAML-tjeneste SP]
     rp[OIDC-tjeneste RP]
  end
  rp --  OIDC  --- IDP
  sp --  SAML2 ---SAML
  SAML -- OIDC ---IDP
</div>

ID-porten tilbyr SSO mellom SAML og OIDC-integrasjoner.


## Single Signon (SSO)

SSO-sesjonen blir styrt av ID-porten OIDC-grensesnitt. Dette medfører at innbyggere kan få SSO ikke bare mellom OIDC-baserte tjenester, men også mellom OIDC og SAML2-baserte tjenester. Sesjonslevetid er felles for alle tjenester uavhengig av sikkerhetsnivå, og denne er da 30 minutter, men kan forlenges uten brukerinteraksjon inntil maksimalt 120 minutter, ved å sende en ny autentiseringsforespørsel.

Alle tjenester er i utgangspunktet med i samme circle-of-trust, men tjenester kan tvinge frem re-autentisering ved å sette attributten *prompt* til `login` i [autentiseringsforespørselen](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) (tilsvarende *forceAuth* i SAML2)

Det er også mulig å konfigurere en integrasjon til å bruke [SSO-fri innlogging]({{site.baseurl}}/docs/idporten/oidc/oidc_func_nosso).

Merk at levetiden på SSO-sesjonen ikke har noen sammenheng med levetiden på utstedte tokens.

## Single Logout (SLO)

SLO i OpenID Connect skiller seg noe fra SAML2, og er etter Digitaliseringsdirektoratets  vurdering en mer robust metode enn SAML2 sin kjede av redirects.

Alle OIDC-integrasjoner mot ID-porten må implementere støtte for følgende to utloggings-scenario:

* Utlogging initiert fra egen tjeneste (/endsession)[
* Utlogging initiert fra andre tjenester (front-channel logout)

Merk at ID-porten ikke støtter back-channel logout.

### 1: Utlogging fra egen tjeneste (/endsession)

Når brukeren vil logge ut fra din tjeneste, må du sende en redirect til ID-portens endsession-endepunkt.  Adressen til endepunktet er definert i [well-known-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_func_wellknown).  

Følgende attributer kan være del av requesten:

|attributt|kardinalitet | beskrivelse|
|---|---|---|
|```id_token_hint``` | anbefalt | Settes lik mottatt id-token.  Nødvendig for å kunne sende brukeren tilbake til tjenesteeiers *post_logout_redirect_uri* etter endt utlogging.|
|```post_logout_redirect_uri```| anbefalt | Må være forhåndsregistrert på klient som id_token er utstedt til |
|```state``` | valgfri | Verdi som klient kan bestemme selv.  ID-porten vil inkludere denne tilbake i redirecten tilbake til utloggings-urlen |


Eksempel:
```
https://oidc-ver2.difi.no/idporten-oidc-provider/endsession
	?id_token_hint=eyJraWQiOiJpZ2I1Q3lGT...
	&post_logout_redirect_uri=<min registrerte post-logout uri >
	&state=fe93c125-4d69-4ee3-8ca5-299ac6e3e499
```

Ved mottak av endsession-redirect, vil ID-porten logge brukeren ut av alle andre tjenester i aktiv SSO-sesjon, både OIDC og SAML. Til slutt vil ID-porten redirecte brukeren til *post_logout_redirect_uri* er oppgitt i request dersom denne er angitt og definert for klient, og *id_token_hint* er inkludert.  Dersom disse mangler, vil brukeren ende opp i ID-porten.

Utlogging fra egen tjeneste er basert på OIDC Session Management](http://openid.net/specs/openid-connect-session-1_0.html)-spesifikasjonen.

#### Samspill mellom sesjoner og tokens ved utlogging

ID-porten vil også invalidere alle tokens som tilhører rene innlogginger (dvs. som kun har scopene "openid" og/eller "profile"). Merk at dette betyr at tokens som inneholder ytterligere scopes, fremdeles vil være aktive etter utlogging.  Motivasjonen bak denne oppførselen er at en utlogging fra netttjeneste tilhørende virksomhet A, ikke naturlig skal føre til at langt-levende app-tilgang tilhørende virksomhet B skal trekkes tilbake, om disse to tilfeldigvis ble utstedt med utgangspunkt i samme sso-sesjon.


#### Ang. validering av state

* Regex for validering: ^[\x20-\x7E]+$
* Godtar dermed gyldige ascii-tegn med hex-verdi mellom 20 og 7E, ref. f.eks. http://www.asciitable.com/



### 2: Håndtere utlogging fra ID-porten (front-channel logout)

Dersom brukeren logger ut fra en annen tjeneste, vil ID-porten trigge utlogging fra alle andre tjenester, dvs. både OIDC-tjenester som er konfigurert med støtte for Front Channel Logout.  

ID-porten OIDC Provider samler opp informasjon om hvilke tjenester en bruker benytter innenfor en sesjon.  For OIDC-klienter som støtter Front Channel Logout, sender ID-porten OIDC Provider en GET-forespørsel til klientens *frontchannel_logout_uri*.  Parameterne *iss* og *sid* inkluderes for klienter som krever *frontchannel_logout_session_required*.  *sid* har samme verdi som claim *sid* i id_token.  ID-porten lager en dynamisk side der hver innlogget OIDC-klient får sin egen iframe og blir sendt et front-channel logout-kall i parallell.

Merk at siden browser-aktørene stadig strammer inn på tilgangen til 3djeparts-cookies, kan man ikke lenger forvente at egen cookie følger med i front_channel_logout-kallet. Bruk av `sid`er derfor eneste fremtidsrettede løsning for å finne igjen egen, lokale brukersesjon.

Klienten som starter utlogging med kall på endsession-endepunktet, mottar **ikke** også melding via front channel logout (merk at spec'en sier at dette er tillatt, men ikke påkrevd oppførsel.)

Dersom en klient ikke er konfigurert med Front Channel Logout, vil klienten ikke motta utloggingsforespørsel fra ID-porten dersom brukeren logger ut fra en annen tjeneste i circle-of-trust.  

Eksempel på kall fra ID-porten til klient:
```
GET https://client.example.com/myapp/logout
     ?iss=https://test.idporten.no/
     &sid=D8Fgz-jEXG7JXP_VAORmAm1sKB0LjZyA3wAy-rVyMYc=
```
`sid` er ID-porten OIDC sin sesjons-id som klient også har mottatt som claim i id-token.


Front-channel logout i ID-porten er basert på  [OIDC Front Channel Logout](http://openid.net/specs/openid-connect-frontchannel-1_0.html)-spesifikasjonen.



## Samspill mellom SAML SLO og OpenID Connect SLO

For Nye ID-porten så er ikke dette ferdig spesifisert ennå.
