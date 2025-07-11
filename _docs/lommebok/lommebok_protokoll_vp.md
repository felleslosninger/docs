---
title: Protokoll-flyt for å motta bevis
description: Protokoll-flyt for OpenID4VP

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_protokoll_vp
---

På denne sida forsøker me å forklara flyten du må følgje som brukastad når du ynskjer at innbyggeren skal presentere eit bevis til deg.

Protokollen som vert nytta heiter [OpenID for Verifiable Presentations (OpenID4VP)](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html).

Før du kan starte flyten må du har utført dette:

- Brukerstaden (relying party) må først registrere seg hjå ein Registrar 
 
Sjølve flyten er enkel, og består av fylgjande steg:

1. Brukerstaden konstruerer ein sokalla VP-request og sender denne til lommeboka.
2. Brukaren opnar lommeboka og godkjenner presentasjon av beviset.
3. Lommeboka sender bevis-presentasjonen (VP-response) attende til brukerstaden.

## Oppsett og registrering

Alle brukerstader skal vere registrert på førehand. Krava rundt registrering finn me i [rettsakt for RP-registerering, C/2025/2621](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32025R0848&qid=1749119392688), og der informasjonen som skal registrerast finn du i Annex I.  I praksis er dette organisasjonsnamn, organisasjonsnummer, og eit par andre felt. 

Ein kan spesielt merke seg at det skal registrerast kva **persondata** (bevistype, eller enkeltattributter frå bevis) som brukerstaden kjem til å førespørje, og **formålet** ved å etterspørje desse dataene. 

For sandkassen registrerer du deg førebels ved å sende epost til Digdir (servicedesk@...), men på sikt vil det kome ei sjølvbetjeningsløysing.  Som del av registreringsprosessen vil du motta to sertifikater som må brukast når du etterspør bevis frå lommebøkene til innbyggarane:  

 - Eitt **tilgangssertifikat** (Relying Party Access Certificate, RPAC) som vert nytta til å autentisere deg opp mot lommeboka
 - Eitt **registreringssertikat** (Relying Party Registration Certificate, RPRC)  som fortel kva data du har registrert at du vil førespørje.

Du må sjølv lage privatnøkkel til desse sertifikata før du gjennomfører registreringa, og basert på denne lage ei [CSR-fil](https://en.wikipedia.org/wiki/Certificate_signing_request) som du inkluderer med søknaden.

Merk at lommebok-økosystemet føretrekk EC-baserte nøkler (ikkje RSA) og at CSRen p.t. må angje ein SAN-extension som skal matche client_id.  Denne skal fortrinnsvis skal peike på det domenet som du køyrer applikasjonen/brukerstaden din på, men det er lov å bruke t.d. localhost under utvikling.

**Døme på å lage CSR med keytool:**
```
#1. opprett ein keystore og lag eit nøkkelpar i den:
keytool -genkeypair -alias rp-access -keyalg EC -groupname secp256r1 -sigalg SHA256withECDSA  -validity 365 -storetype pkcs12 -keystore rp-access.p12 -dname "CN=eudiw-verifier-demo.idporten.dev,OU=eudiw-verifier-demo.idporten.dev,C=no"

#2. lag CSR med SAN-extension:
keytool -certreq -keyalg EC -alias rp-access -ext san=dns:eudiw-verifier-demo.idporten.dev -file rp-access.csr -keystore rp-access.p12
```



## Steg 1: Lage ein VP-request

Brukarstaden lagar ein VP-request for å fortelje kva bevis/attributt den ynskjer å motta frå lommeboka.  

Du må ta stilling til fleire tema når du bygger opp VP-requesten din:

- kva bevis-typar eller enkelt-attributter treng du ?
- kva sikkerheitskrav og tillitsrammeverk gjeld for desse ?
- ynskjer du at brukaren skal ta stilling til transaksjons-spesifikke data ved godkjenninga ?
- teknisk skildring av brukarstaden din.
- korleis ynskjer du å transportere request og respons?


#### Tema 1.a: Kva data treng eg ?

Du må kjenne identifikatoren på beviset du ynskjer.  

For "høgverdige" bevis som [digital grunnidentitet (den sokalla "PID'en")](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/annexes/annex-3/annex-3.01-pid-rulebook/) eller [digitalt førarkort (mobile driver licence - mDL)](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/annexes/annex-3/annex-3.02-mDL-rulebook/) so vil EU publisere sokalla rulebooks der bevis-typane vert definert. EU skal også bygge opp ein sentral katalog over bevis og attributter (sokalla "catalogue of attestations" og "catalogue of schemes", ref [utkast til rettsakt](https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/14402-European-digital-identity-framework-verification-of-electronic-attestation-of-attributes_en). 

Ofte vil du vite kva verksemd som er utstedar av beviset, eller du kan finne det frå [innsynstjenesten til sandkassa](lommebok_tjenester). Du kan då sjekke [metadata-endepunktet til Credential Issueren](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-wg-draft.html#name-credential-issuer-metadata) for å finne kva `credential_configuration_id`'ar som er støtta. 

Eit bevis kan vere utsted på 3 ulike kvalitetsnivå.  Det høgaste nivået er sokalla **kvalifiserte** bevis (QEAA), so er det ein mellomnivå for offentleg sektor som heiter **Pub-EAA**, medan resten av bevisa er **ikkje-kvalifiserte**.   Det er valfritt for utstedar å publisere ikkje-kvalifiserte bevis i bevis-katalogen, so slike kan du måtte skaffe deg kjennskap om på anna vis.


Iallefall, når du kjenner type-identifaktoren på beviset, kan du konstruere den tilhøyrande DQCL-spørringa.  Merk at du brukar bevistypen som ein referanse i `meta` delen av DCQL-spørringa, og ikkje i `id`-claimet.


** Døme på aldersverifiseringsspørring, der anten mobilt førarkort eller PID kan nyttast som bevis-kjelde**:
```
"dcql_query" = {
  "credentials": [
    {
      "id": "mdl",
      "format": "mso_mdoc",
      "meta": {
        "doctype_value": "org.iso.18013.5.1.mDL"
      },
      "claims": [  {"id": "age_over_18", "path": ["org.iso.18013.5.1", "age_over_18"] }      ]
    },{
      "id": "pid",
      "format": "dc+sd-jwt",
      "meta": {
        "vct_values": "urn:eudi:pid:1"
      },
      "claims": [ {"id": "age_over_18", "path": ["age_equal_or_over", "18"]  }  ]
    }
  ],
  "credential_sets": [
    { "options": [ "mdl", "pid"] }
  ] }
```



Sjå [døme i spec'en](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html#more_dcql_query_examples) for meir inspirasjon.

<!-- TODO: kva med scope istadenfor dcql_query, vil det bli brukt i EUDIW-økosystemet ? -->

#### Tema 1.b:  Sikkerheitskrav / rammeverk

TBD.
(treng eg sjekke WUA, treng eg sjekke bevis-katalogen, er det X.509 eller openid-federation tillit eller anna?)

#### Tema 1.c: Transaksjonsspesifikke data

Spec'en opnar for at brukaren skal kunne ta samtykke til transaksjonsspesifikke data som ikkje er del av eit bevis.   Til dømes kan brukerstaden forespørje eit "betalingsbevis" frå ein bank-utstedar kombinert med eit beløp knytta til ein transaksjon.  Transaksjonsdataene blir då signert av lommeboka, medan beviset som vanleg er signert av utstedaren.  Dette lyt inkluerast i førespurnaden i claimet [`transaction_data`](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html#section-5.1-2.8.1).

Tenkt tilfelle der norsk banksektor har blitt samde om ein `type` for betaling av mindre beløp i kiosk: 
```
"transaction_data": {
  "type": "kiosksalg",
  "credential_ids": [ "urn:no:smaa_betalings_bevis"],
  "vare":  "1 pølse i brød",
  "belop": "45"
}
```

#### Tema 1.d: Skildre brukerstaden din

VP-spec'en bygger på Oauth2, der brukstaden opptrer som oauth-klient, og lommeboka spelar rolla som autorisasjonsserver. Ulikt Oauth2 so skal dei tekniske eigenskapane til brukarstaden ikkje registrerast på førehand, men vert derimot 



#### Tema 1.c: Bestemme deg for korleis du vil sende VP-requesten


Ein [VP-førespurnad](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html#name-authorization-request) er ein modifisert OpenID-connect autorisasjonsførespurnad.  Brukarstaden er vanlegvis ei browserbasert web-teneste, og den vil normalt rendre VP-requesten som ein QR-kode, som brukaren so anten scanner med lommeboka (cross-device) eller lommeboka vert opna direkte (same-device).


Sidan VP-requestar fort kan bli store risikerer du også at QR-kodane kan bli vanskeleg å lese. Det er difor mogeleg å sende ein VP-request på ulike måtar til lommeboka:

1. **Redirect**: Her lagar du ein komplett VP-request basert på query-parametre, som du så redirecter direkte til lommeboka. 
2. **Request Object via redirect**: Som over, men du pakkar requesten inn i ein JWT slik at den blir eit [Request Object ihht RFC9101](https://www.rfc-editor.org/rfc/rfc9101.html)
3. **Referert Request Object via GET**: Du lagar VP-requesten som ein JWT og tilgjengleggjer på ein unik url, og ber lommeboka om å laste den ned derifrå.
4. **Referert Request Object via POST**: Som #3, men her kan lommeboka POSTe inn sine tekniske kapabiliteter, som mogeleggjer at du synkront kan laga ein tilpassa VP-request.

Alternativ #1 er det enklaste å realisere, medan alternativ #4 nok er det mest robuste.  Merk at ikkje alle lommebøker er påkrevd å støtte POST, så om du går for #4, må du vurdere å implementere #3 som fallback.

Det er også mogeleg å sende requesten over det nye [W3C Digital Credentials APIet](https://www.w3.org/TR/digital-credentials/) som vil gje betre brukaropplevelse, spesielt i cross-device brukstilfelle eller scenario der brukaren har fleire lommebok-appar innstallert på telefonen, men her er det førebels veldig lav støtte i browsere for denne protokollen. Sjå [Appendix A i OpenID4VP](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html#appendix-A) for detaljar.

|Alternativ|Kva parametre styrer oppførsel? |
|-|-|
|#1: Direkte redirect|(ingen)|
|#2: Request Object via redirect|`request=<jwt>`|
|#3: Referert Request Object via GET|`request_uri=https://verifier.example.com/request_objects/1234-1234-1234-1234`|
|#4: Referert Request Object via POST|`request_uri_method=POST&request_uri=https://verifier.example.com/request_objects/1234-1234-1234-1234`|


#### Steg 1.b: Bestemme kor du vil ha responsen tilbake frå lommeboka

Reponsen frå lommeboka er ein ny type token, det sokalla `vp_token`-et.

Sidan VP-spec'en bygger på Oauth2, har du også fleire valg for korleis du ynskje å motta VP-responsen frå lommeboka.  

1. **Redirect**: Lommeboka redirecter vp_tokenet attende til deg gjennom nettlesar som eit fragment på oppgitt `redirect_uri`.
2. **direct_post**: Lommeboka POSTer vp_tokenet til oppgitt `response_uri`.  Deretter må du instruere lommeboka kvar den skal redirekte brukaren vidare frå lommebok til brukarstaden i nettlesaren.


|Alternativ|Kva parametre styrer oppførsel? |
|-|-|
|#1: Redirect|`reponse_type=vp_token&response_mode=fragment`|
|#2: direct_post|`reponse_type=vp_token&response_mode=direct_post`|

Det er også mogeleg å få responsen kryptert, då brukar du ein variant som heiter [`direct_post.jwt](https://openid.github.io/OpenID4VP/openid-4-verifiable-presentations-wg-draft.html#name-response-mode-direct_postjw).









Her er eit døme på å etterspørre kun "er over 18 år"-attributtet frå ID-beviset til innbyggaren:

```
  // Kva attributter og bevis du vil ha ?
  "presentation_definition" : {
    "input_descriptors" : [ {
      "purpose" : "We need to verify your identity",
      "name" : "EUDI PID",
      "format" : {
        "mso_mdoc" : {
          "alg" : [ "RS256", "ES256", "ES384" ]
        }
      },
      "id" : "eu.europa.ec.eudi.pid.1",
      "constraints" : {
        "fields" : [ {
          "intent_to_retain" : false,
          "path" : [ "$['eu.europa.ec.eudi.pid.1']['age_over_18']" ]
        } ]
      }
    } ],
    "id" : "3787345f-9460-4d14-acff-28e3b2217e1a"
  },

  // metadata for ditt brukersted:
  "client_metadata" : {
    "authorization_encrypted_response_alg" : "ECDH-ES",
    "authorization_encrypted_response_enc" : "A128CBC-HS256",
    "jwks_uri" : "https://demo-brukersted.test.eidas2sandkasse.net/jwks",
    "vp_formats" : {
      "mso_mdoc" : {
        "alg" : [ "RS256", "ES256", "ES384" ]
      }
    },
    "id_token_signed_response_alg" : "RS256"
  },

  //oauth-spesifikke claims for 

  "client_id" : "x509_san_dns:demo-brukersted.test.eidas2sandkasse.net",
  "response_uri" : "https://demo-brukersted.test.eidas2sandkasse.net/response",
  "client_id_scheme" : "x509_san_dns",
  "aud" : "https://self-issued.me/v2",

  "iss" : "issuer",
  "response_type" : "vp_token",
  "nonce" : "nonceval",
  "response_mode" : "direct_post.jwt",

  // oauth2-spesifikke claims for akkurat denne forespørselen:
  "state" : "2c7e983b-ebde-49ff-974e-7aea1dbd0189",
  "exp" : 1749120685,
  "iat" : 1749120565,
  "jti" : "f376e4a1-2c2e-4976-b322-f9c1a115f66d"



}
```


