---
title: Autentisering til sluttbrukersystemer
description: Autentisering til sluttbrukersystemer
summary: "Såkalte sluttbrukersystemer er typisk tykk-klienter og programmer som installeres på brukers PC. De må bruke loopback redirection i autentiseringsflyten."
permalink: oidc_auth_sbs.html
sidebar: oidc
product: ID-porten
---

## Overordna beskrivelse av bruksområdet

Et sluttbrukersystem er en tykk-klient / PC-program som innstalleres på en PC.  

I Oauth2-sammenheng, er dette en *native* klient, siden den ikke kan beskytte en klienthemmelighet/virksomhetssertifikat, og [behandles på samme måte som innlogging til mobil-app'er](oidc_auth_app.html).


Sluttbrukerstystemer bør:
* registreres med `application_type=native`
* registreres med felles client_id for alle instanser
* autentisering skal skje i ekstern browser
* bruke [loopback interface redirection ihht. RFC8252](https://tools.ietf.org/html/rfc8252#section-7.3)


## Loopback interface redirection

ID-porten støtter [RFC8252, kap 7.3](https://tools.ietf.org/html/rfc8252#section-7.3).

Dersom application_type er `native`, får man lov til å registrere ein redirect_uri som starter med `http://127.0.0.1:0/` på klienten (altså http uten s og :0 som portnummer).

Når en instans av et sluttbrukersystem starter opp, må det forespørre eierskap til en gitt portnummer av operativsystemet.  Klient bruker så det tildelte portnummeret i autorisasjonsforespørselen:
`https://oidc.difi.no/idporten-oidc-provider/authorize?redirect_uri=http://127.0.0.1:35432/min_callback&...`

Samme portnummer må også oppgis på token-kallet.

Både ipv6 og ipv4 er støtta.

## Beskrivelse av innloggingsflyten for sluttbrukersystemer

Flyten er identisk som for [autorisasjonskode-flyten](oidc_auth_codeflow.html), men med bruk av [PKCE](oidc_func_pkce.html):

Normal vil sluttbrukersystemet trenge tilgang til APIer fra 3-dje-part,  [se nærmere dokumentasjon av brukerstyrt datadeling](oidc_auth_oauth2.html)


## Struktur på token

ID-tokenet er identisk som ved bruk av [autorisasjonskode-flyten](oidc_auth_codeflow#idtoken).  Selv om det er access_tokenet som skal benyttes videre, må kunden først validere id_tokenet ihht vanlig beste praksis for OIDC.

Access_tokenet vil inneholde fødseslnummer på innbyggeren, scopet som er registrert, og utløpstiden på tokenet.
