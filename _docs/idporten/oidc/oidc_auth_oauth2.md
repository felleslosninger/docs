---
title: "Brukerstyrt datadeling"
description: "Brukerstyrt datadeling"
summary: 'I forbindelse med en innlogging i ID-porten kan brukeren også gi tjenesten mulighet til å hente innbyggers data fra APIer tilbudt av 3.dje-part'

sidebar: oidc
product: ID-porten
redirect_from: /oidc_auth_oauth2
---


## Overordna beskrivelse av scenariet

I dette scenariet logger en innbygger inn til en tjeneste, og tjenesten har behov for å hente data om den innlogga brukeren fra et API som ligger hos en 3dje-part.  Man er selvsagt ikke begrenset til kun lese-operasjoner, enhver API-operasjon som API-tilbyderen tilrettelegger for at skal kunne integreres i eksterne tjenester kan realiseres med dette løsningsmønsteret.

Slike scenario realiseres i ID-porten ved den klassiske Oauth2-flyten, der innbyggeren godkjenner - enten eksplisitt eller implisitt - til at tjenesten kan bruke et API på vegne av seg selv.

* Ved implisitt samtykke er det autentiseringshandlingen som i seg selv tolkes som samtykket ("Ved å logge inn i tjenesten godtar du at vi henter opplysninger om deg fra NAV").  Vi bruker derfor begrepet *autentiseringsnær autorisasjon* om dette løsningsmønsteret.

* Ved eksplisitt samtykke er det brukeren selv som godkjenner om tjenesten får agere på dennes vegne opp mot APIet.  Vi bruker derfor begrepet *brukerstyrt datadeling* om dette løsningsmønsteret.



For eksplisitte samtykker som skal vare "lenge" ("jeg samtykker til at Banken min kan hente inntektsopplysninger hos Skatteetaten de neste 3 årene") henviser vi til bruk av Samtykkeløsningen i Altinn.


 <div class="mermaid">
 graph LR
   subgraph 3djepart
     API
   end
   subgraph Digdir
     OIDC[ID-porten]
   end
   subgraph Kunde
      ny[Tjeneste]
   end
   Sluttbruker ---|1. Vil bruke|ny
   OIDC -->|3.utsteder token|ny
   Sluttbruker ---|2. logger inn i  |OIDC
   ny -->|4.bruker token mot|API
 </div>


Hvilket API/ressurs som skal aksesseres, er styrt av [_scopes_]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_scope).  Klienten må vite hvilke(t) scope som hører til den aktuelle API-operasjonen, og må forespørre dette scopet i autorisasjonsforespørselen.   Dersom scopet har egenskapen `requires_user_consent` satt, vil ID-porten vise en enkel godkjennings-dialog til innbygger når autentisering er fullført.  Se eksempel under:

![tilgangsdialog]({{site.baseurl}}/images/idporten/oidc/samtykkedialog3.png)

Selve autorisasjonen blir av ID-porten utlevert som et _access_token_ (datadelingstoken).   Tjenesten bruker så dette access_tokenet når den skal aksessere APIet.  Dersom brukeren ikke godtar, vil det aktuelle scopet ikke bli inkludert i access_tokenet


## Motivasjon

Det er flere gode grunner for API-tilbydere til å bruke dette samhandlingsmønsteret:

* En ønsker at brukeren selv skal kontrollere deling av sine data.
* En ønsker å tilrettelegge for standardisert samhandling med eksterne parter, og kan gjøre dette på samme måte både mot ordinære nett-tjenester og mot sluttbrukersystemer som PC-programmer eller mobil-app'er.
* Gir mulighet for at private virksomheter kan få tilgang til offentlige API/data, kontrollert av innbygger selv. Ved å kombinere med pseudonymisert innlogging, slipper den private virksomheten behandlingsansvar for fødselsnummer.
* Misbrukspotensialet sett fra API-tilbyders side blir redusert ifht maskin-til-maskin-scenario, siden en ikke åpner for tilgang til hele datasettet, men kun for de brukere som faktisk er tilstede i utvalgte tjenester hos ID-porten.

Eksempler på bruk av løsningsmønsteret:
 * [Oppdatere innbyggers preferert språk i Kontaktregisteret]({{site.baseurl}}/docs/Kontaktregisteret/Brukerspesifikt-oppslag_rest#spraak)
 * [Ansatt hos kommune som skal ha tilgang til data som ligger lagret hos Fiks-plattformen til KS](https://ks-no.github.io/fiks-plattform/sikkerhet/#autentisering-og-autorisering)



## Beskrivelse av Oauth2-flyten

{% include note.html content="I 2022 kommer det [ikke-bakoverkompatible endringer i ID-porten](oidc_protocol_nye_idporten.html)." %}



Følgende aktører inngår:

 Aktør | Beskrivelse | Begrep OIDC | Begrep Oauth2 | Begrep SAML2
 -|-|-|-|-|
 Sluttbruker | Ønsker å logge inn til en tjeneste | End User | User | End User
 Nett-tjeneste | Sluttbruker-tjeneste tilbudt av en privat eller offentlig etat | Relying Party (RP) | Client | Service Provider (SP) |
 ID-porten | ID-porten sin OpenID Connect provider som usteder *access_token* til aktuelle tjenesten| OpenID Provider (OP) | Authorization server (AS) | Identity Provider (IDP)
 API | 3.part, som tilbyr et API som sluttbrukertjenesten ønsker å benytte | - | Resource server (RS) | -





<div class="mermaid">
sequenceDiagram
  Sluttbruker ->> Klient: Klikker login-knapp
  Klient ->> Sluttbruker: Redirect med autentiseringsforespørsel
  Sluttbruker ->> OpenID Provider: følg redirect...
  note over Sluttbruker,OpenID Provider: Sluttbruker autentiserer seg (og evt. samtykker til førespurte scopes)
  OpenID Provider ->> Sluttbruker: Redirect med autorisasjonscode
  Sluttbruker ->> Klient: følg redirect...
  Klient ->> OpenID Provider: forespørre token (/token)
  OpenID Provider ->> Klient: id_token + access_token (evt. refresh_token)
  note over Sluttbruker,Klient: Innlogget i tjenesten
  Klient ->> API: bruke API med access_token
  API ->> OpenID Provider: validere token
  OpenID Provider ->> API: token informasjon
  API->>Klient: Resultat av API-operasjon
</div>


Starten av flyten er identisk med [autorisasjonskode-flyten for autentisering]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_codeflow) (se denne for detaljer), med følgende tillegg:

* I **autentiseringsresponsen** fra OpenID Provider får klient også utlevert et *access_token* (og eventuelt et *refresh_token*) som gir tilgang til forespurte scopes.  
* Etter innlogging kan da klienten bruke access_tokenet opp mot det relevante APIet.  
  * Access_token har vanligvis kort levetid (30 sekunder). Dersom tokenet er utløpt, kan klienten forespørre nytt acess_token ved å bruke *refresh_tokenet* mot token-endepunktet til OpenID Provideren.  Det gjennomføres da en klient-autentisering, for å sikre at tokens ikke blir utlevert til feil part.

Forskjellen på *autentisering* (OpenIDConnect) og *autorisasjon* med "plain" Oauth2 er altså minimal:
1. For å sikre at autentisering-oppførselen blir ihht. OpenID Connect-spesifikasjonen **må** man benytte 'openid'-scopet
2. OpenID Connect forholder seg ikke til ressurs-servere /API-er, men man kan fint forespørre ekstra scopes i en OIDC autentiseringsforespørsel, og således oppnå kombinert autorisasjon og autentisering.

For nærmere detaljer om innholdet i access_token, se [grensesnittsdefinisjon av /token-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_access_token).   Se også [dokumentasjon av scopes](oidc_protocol_scopes.html).
