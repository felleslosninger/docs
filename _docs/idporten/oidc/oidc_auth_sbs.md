---
title: Autentisering til tykke klienter
description: Autentisering til tykke klienter
summary: "Tykke klienter er applikasjoner som installeres og kjøres lokalt på en datamaskin. De er må bruke autorisasjonskodeflyt med loopback redirection ved innlogging."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_auth_sbs
---

## Overordna beskrivelse av bruksområdet

Med tykke klienter mener vi applikasjoner som installeres og kjøres lokalt på en datamaskin. Eksempler på dette er Microsoft .Net WPF eller Winforms.

I Oauth2-sammenheng, er dette en *native* klient, siden den ikke kan beskytte en klienthemmelighet/virksomhetssertifikat, og [behandles på samme måte som innlogging til mobil-app'er]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_app).


Tykke klienter bør:
* registreres med `application_type=native`
* registreres med felles client_id for alle instanser
* autentisering skal skje i ekstern browser
* bruke loopback interface redirection (se nedenfor)


## Loopback interface redirection

ID-porten støtter [RFC8252, kap 7.3](https://tools.ietf.org/html/rfc8252#section-7.3).

Dersom application_type er `native`, får man lov til å registrere ein redirect_uri som starter med `http://127.0.0.1:0/` på klienten (altså http uten s og :0 som portnummer).

Når en instans av den tykke klienten starter opp, må det forespørre eierskap til en gitt portnummer av operativsystemet.  Klient bruker så det tildelte portnummeret i autorisasjonsforespørselen:
`https://idporten.no/authorize?redirect_uri=http://127.0.0.1:35432/min_callback&...`

Samme portnummer må også oppgis på token-kallet.

## Beskrivelse av innloggingsflyten for tykke klienter

Flyten er identisk som for [autorisasjonskode-flyten]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_codeflow), men med bruk av [PKCE]({{site.baseurl}}/docs/idporten/oidc/oidc_func_pkce):

Normal vil klienten trenge tilgang til APIer fra 3-dje-part,  [se nærmere dokumentasjon av brukerstyrt datadeling]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2)


## Struktur på token

ID-tokenet er identisk som ved bruk av [autorisasjonskode-flyten](oidc_auth_codeflow#idtoken).  Selv om det er access_tokenet som skal benyttes videre, må kunden først validere id_tokenet ihht vanlig beste praksis for OIDC.

Access_tokenet vil inneholde fødseslnummer på innbyggeren, scopet som er registrert, og utløpstiden på tokenet.
