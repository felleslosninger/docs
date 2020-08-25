---
title: "Datadeling for innlogget bruker"
description: "Datadeling for innlogget bruker"
summary: 'I forbindelse med en innlogging i ID-porten kan brukeren også gi tjenesten mulighet til å hente innbyggers data fra APIer tilbudt av 3.dje-part'
permalink: oidc_auth_oauth2.html
sidebar: oidc
product: ID-porten
---


## Overordna beskrivelse av scenariet

I dette scenariet har tjenesten behov for å hente data om den innlogga brukeren fra et API som ligger hos en 3dje-part.  Dette er den klassiske Oauth2-flyten, der innbyggeren godkjenner - enten eksplisitt eller implisitt - til at tjenesten kan bruke et API på vegne av seg selv.

Det kan være flere grunner til å bruke denne flyten:

* En ønsker at brukeren selv skal kontrollere deling av sine data.
* Misbrukspotensialet sett fra API-tilbyders side er redusert, siden en ikke åpner for tilgang til hele datasettet, men kun for brukere som faktisk er tilstede i ID-porten.
* En ønsker å legge til rette for







 I ID-porten-sammenheng vil vanligvis samtykket være implisitt, siden det er autentiseringshandlingen som i seg selv tolkes som det informerte samtykket ("Ved å logge inn i tjenesten godtar du at vi henter opplysninger om deg fra NAV"). Vi bruker derfor begrepet *autentiseringsnær autorisasjon*.

For eksplisitte samtykker som skal vare "lenge" ("jeg samtykker til at Banken min kan hente inntektsopplysninger hos Skatteetaten de neste 3 årene") henviser vi til bruk av Samtykkeløsningen i Altinn.


Samtykket, eller autorisasjonen, blir av ID-porten utlevert som et _access_token_ (datadelingstoken). Tjenesten bruker så dette access_tokenet når den skal aksessere APIet.

## Godkjenningsdialog

Hvilket API/ressurs som skal aksesseres, er styrt av [_scopes_](oidc_protocol_scope.html).  Klienten må vite hvilke(t) scope som hører til den aktuelle API-operasjonen, og må forespørre dette scopet i autorisasjonsforespørselen.   Dersom scopet har egenskapen `requires_user_consent` satt, vil ID-porten vise en enkel godkjennings-dialog til innbygger når autentisering er fullført.  Se eksempel under:

![grynt](/felleslosninger/images/idporten/oidc/samtykkedialog2.png)



## Aktører


<div class="mermaid">
graph LR
  subgraph 3djepart
    API
  end
  subgraph Digitaliseringsdirektoratet
    OIDC[OIDC Provider]
  end
  subgraph Kunde
     ny[Tjeneste]
  end
  OIDC -->|3.utsteder token|ny
  Sluttbruker ---|2.autentiserer og autoriserer|OIDC
  ny -->|1. forspør tilgang|OIDC
  ny -->|4.bruker token mot|API
</div>

Følgende aktører inngår:

 Aktør | Beskrivelse | Begrep OIDC | Begrep Oauth2 | Begrep SAML2
 -|-|-|-|-|
 Sluttbruker | Ønsker å logge inn til en offentlig tjeneste | End User | User | End User
 Nett-tjeneste | Sluttbruker-tjeneste tilbudt av en offentlig etat | Relying Party (RP) | Client | Service Provider (SP) |
 ID-porten | ID-porten sin OpenID Connect provider som usteder *access_token* til aktuelle tjenesten| OpenID Provider (OP) | Authorization server (AS) | Identity Provider (IDP)
 API | 3.part, som tilbyr et API som sluttbrukertjenesten ønsker å benytte | - | Resource server (RS) | -


## Beskrivelse av Oauth2-flyten


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


Starten av flyten er identisk med [autorisasjonskode-flyten for autentisering](oidc_auth_codeflow.html).
* I **autentiseringsresponsen** fra OpenID Provider får klient også utlevert et *access_token* (og eventuelt et *refresh_token*) som gir tilgang til forespurte scopes.  
* Etter innlogging kan da klienten bruke access_tokenet opp mot det relevante APIet.  
  * Access_token har vanligvis kort levetid (30 sekunder). Dersom tokenet er utløpt, kan klienten forespørre nytt acess_token ved å bruke *refresh_tokenet* mot token-endepunktet til OpenID Provideren.  Det gjennomføres da en klient-autentisering, for å sikre at tokens ikke blir utlevert til feil part.

Forskjellen på *autentisering* (OpenIDConnect) og *autorisasjon* med "plain" Oauth2 er altså minimal:
1. For å sikre at autentisering-oppførselen blir ihht. OpenID Connect-spesifikasjonen **må** man benytte 'openid'-scopet
2. OpenID Connect forholder seg ikke til ressurs-servere /API-er, men man kan fint forespørre ekstra scopes i en OIDC autentiseringsforespørsel, og således oppnå kombinert autorisasjon og autentisering.



## Typer access_token og validering av disse

ID-porten kan utstede to typer access_token.  Ressursservere som mottar access_token som del av en API-forespørsel må validere disse før API-operasjonen kan utføres.

|Type token|Beskrivelse|
|-|-|
|by reference| Tokenet inneholder kun en referanse til autorisasjonen internt i ID-porten.  Ressursserveren må sjekke opp mot tokeninfo-endpunktet til ID-porten for å få om tokenet fremdeles er gyldig, hvem brukeren er, hvilke scopes som ble forespurt, og hvilken klient (inkludert dennes org.nr.) det var utstedt til. |
|by value | Tokenet er såkalt self-contained, dvs. det inneholder all informasjon som man ellers kunne sjekke mot tokeninfo-endpunktet.  Slike tokens kan ikke trekkes tilbake, og bør derfor ha kort levetid |

## Struktur på "by value" access token

Når "by value" access token benyttes er det returnerte tokenet en signert JWT struktur med følgende struktur:


Access tokenets header:

| claim | verdi |
| --- | --- |
| kid | "Key identifier" - unik identifikator for signeringsnøkkel brukt av provideren. Nøkkel og sertifikat hentes fra providerens JWK-endepunkt |
| alg | "algorithm" - signeringsalgoritme, Id-porten støtter kun RS256 (RSA-SHA256) |


Access tokenets body:

| claim | verdi |
| --- | --- |
| sub | "subject identifier" - unik identifikator for den autentiserte brukeren. Verdien er her *pairwise* - dvs en klient får alltid samme verdi for samme bruker. Men ulike klienter vil få ulik verdi for samme bruker |
| aud | "audience" - client_id til klienten som er mottaker av dette tokenet |
| client_orgno | Klienten sitt organisasjonsnummer |
| scope | Liste over de scopes som dette access tokenet er bundet mot |
| pid | Personidentifikator - fødselsnummer/d-nummer på den autentiserte sluttbrukeren. MERK: Dette claimet blir ikke utlevert dersom scopet no_pid er benyttet |
| token_type | Type token. pr. nå¨støttes kun "Bearer" |
| iss | Identifikator for provideren som har utstedt token'et. For ID-porten sitt ext-test miljø er dette *https://eid-exttest.difi.no/idporten-oidc-provider/* |
| exp | Expire - Utløpstidspunktet for tokenet. Klienten skal ikke akseptere token'et etter dette tidspunktet |
| iat | Tidspunkt for utstedelse av tokenet |
| jti | jwt id - unik identifikator for det aktuelle Id tokenet |


## Bruk av tokeninfo-endepunktet

ID-porten tilbyr endepunkt for validering av token basert på RFC7662  OAuth 2.0 Token Introspection.

Bruken av dette endepunktet er [dokumentert i detalj her](oidc_protocol_tokeninfo.html).

Endepunktet vil fortelle deg om et gitt token fremdeles er gyldig (`active=true`) eller ikke.  Du vil også få utlevert de fleste metadata som hører til tokenet.


*Eksempel på request:*

```
POST /tokeninfo
Content-type: application/x-www-form-urlencoded

token=fK0dhs5vQsuAUguLL2wxbXEQSE91XbOAL3foY5VR0Uk=
```

*Eksempel på en respons ved suksessfull validering av token:*

```
{
    "active": true,
    "token_type": "Bearer",
    "expires_in": 556,
    "exp": 1477990301,
    "iat": 1477989701,
    "scope": "global/kontaktinformasjon.read",
    "client_id": "test_rp",
    "client_orgno": "991825827"
}
```

Eksempel på en respons ved feilet validering av token:

```
{
    "active": false
}  
```
