---
title: European eSeals
description: European eSeals

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_func_european_eseals
---


{% include note.html content="Maskinporten is currently piloting support for authentication of European businesses holding a certificate for electronic seal. There may be introduced breaking changes during the testing period." %}


## Information to European organizations

Maskinporten is an Oauth2 Authorization Server operated by The Norwegian Digitalisation Agency and used by other Norwegian Public Sector agencies to perform access control for machine-to-machine communication towards their APIs. See [more about Maskinporten here](maskinporten_summary).

A European organization is termed a **consumer** of those APIs. In technical terms, the software system operated by the consumer is an [Oauth2 **client**](https://datatracker.ietf.org/doc/html/rfc6749#section-1.1).

The client asks Maskinporten for an access token, and that token is then used in subsequent calls to the API.  See details below.

The client must hold a valid certicate for electronic seal issued by an [approved Trust Service Provider listed on the EU Trust List](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls/search/type?step=3&searchCriteria=eyJzZXJ2aWNlU2NvcGUiOiJBTEwiLCJjb3VudHJ5Q29kZXMiOlsiQVQiLCJCRSIsIkJHIiwiSFIiLCJDWSIsIkNaIiwiREsiLCJFRSIsIkZJIiwiRlIiLCJERSIsIkVMIiwiSFUiLCJJUyIsIklFIiwiSVQiLCJMViIsIkxJIiwiTFQiLCJMVSIsIk1UIiwiTkwiLCJOTyIsIlBMIiwiUFQiLCJSTyIsIlNLIiwiU0kiLCJFUyIsIlNFIiwiVUsiXSwic2VydmljZUxlZ2FsVHlwZXMiOlsiUV9DRVJUX0VTRUFMIiwiQ0VSVF9FU0VBTCJdfQ%3D%3D). Some APIs may requied this certificate to be **qualified** (highest security requirements).


Please also note the following:

- Support for authentication of European eSeals is disabled by default, and must be activated by the owner of the API on a per-API (oauth2 scope) basis.
- Please consult the documentation from the API owner to find scope values and terms for using this funtionality.
- You do NOT need to log in to "Samarbeidsportalen" and register a client.
- You must use a production certificate even for testing (as there are no EU-wide test trust-list) 

## Informasjon til norske API-tilbydere

Funksjonaliteten gjer det mogeleg for europeiske verksemder å få token frå Maskinporten basert på utanlandske verksemdsertifikat, basert på ein forenkla tillitsmodell.

API-tilbydar må sjølv aktivere støtte for europeiske verksemder for sitt API-scope via Sjølvbetening (kjem ila hauset, ta kontakt med oss inntil vidare.) Ved å aktivere funksjonaliteten aksepterer du også den forenkla tillitsmodellen.

Den forenkla tillitsmodellen er basert på at Maskinporten full-automatisk ut frå EU sin Trust List kan stole på [godkjende utstedarar (TSP) av europeiske verksemdsertifikat (segl) ihht eIDAS](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls/search/type?step=3&searchCriteria=eyJzZXJ2aWNlU2NvcGUiOiJBTEwiLCJjb3VudHJ5Q29kZXMiOlsiQVQiLCJCRSIsIkJHIiwiSFIiLCJDWSIsIkNaIiwiREsiLCJFRSIsIkZJIiwiRlIiLCJERSIsIkVMIiwiSFUiLCJJUyIsIklFIiwiSVQiLCJMViIsIkxJIiwiTFQiLCJMVSIsIk1UIiwiTkwiLCJOTyIsIlBMIiwiUFQiLCJSTyIsIlNLIiwiU0kiLCJFUyIsIlNFIiwiVUsiXSwic2VydmljZUxlZ2FsVHlwZXMiOlsiUV9DRVJUX0VTRUFMIiwiQ0VSVF9FU0VBTCJdfQ%3D%3D).  Vidare føreset me at sjølve sertifikata føl dei definerte sertifikatprofilane ihht ETSI, dvs. me føreset at alle sertifikat er like, uavhengig av kven som har utstedt dei. Det er pt. 156 godkjende TSPar i EU, og me har ikkje mogelegheit til å lage custom-tilpassingar for kvar einskild av dei.

For å forenkle onboardingsbyrden for den utanlandske verksemda, så treng dei ikkje logge inn i  Samarbeidsportalen for å lage ein klient-registrering.  Samstundes tyder dette at europeiske verksemder ikkje har same mogelegheit som norske til å utføre "orden i eige hus" ved å dataminimere tilgang til enkeltsystemer.  Alle gyldige verksemdsertifikat utstedt til den aktuelle europeiske verksemda vil kunne få token til ditt scope.  Det betyr også at dei utanlandske verksemdene ikkje har godteke noko bruksvilkår med eller har noko "kundeforhold" til Digdir, slik at du lyt sjølv ta deg av all dialog med den utanlandske verksemda, og evt. vurdere behov for eigne, bilaterale avtaler med dei.

Det er heller ingen sentral tilgangstyring i Maskinporten for dei utanlandske verksemdene, som betyr at alle europeiske verksemder i prinsippet kan få token til ditt API.  Dette sidan me trur det vil vere stor variasjon i ulike koding av organisasjonsidentifikator mellom land og sertifikatutstedarar, og det vil vere vanskeleg for deg som API-tilbydar å kjenne rett formattering på førehand, og det er då betre å ha lokal block-liste i APIet. 

Maskinporten gjer ikkje noko omsetjing eller tilpassing av organisasjonsidentifikatoren, og vidareformidler berre denne "rått" slik den er registrert i sertifikatet.  Me inkluderer også eventuelle namn på verksemda og evt. undereining som me finn i `Subject`-feltet.

Europeiske verksemdsertifikat kan - som i Norge - utstedast på ulike sikkerheitsnivå.  P.t. er me usikre på kor lett det er å skilje desse i valideringa.

## Request

The client creates a [JWT grant](maskinporten_protocol_jwtgrant), signs it with the eSeal, and POSTs it to the [/token endpoint](maskinporten_protocol_token) in Maskinporten.

- The `iss` claim must be present, but the value is ignored. We recommend to put the name of the organization and/or system here
- Note that `x5c` must be an array containing the full certificate chain, not just the eseal alone.  See [Maskinporten's own signing key x5c-claim](https://maskinporten.no/jwk) for an example.
- For the PoC, only scopes prefixed with `toll:` or the scope `digdir:verksemd.eu` is supported. And only in the test environments.

Example JWT grant:
```
{
  "x5c": [
    "pem_encoded_eseal_certificate_public_key_base64",
  ],
  "alg": "RS256"
},
{
  "aud": "https://maskinporten,dev/",
  "scope": "digdir:verksemd.eu",
  "iss": "mycompany_test_client_that_isnt_registered_in_maskinporten",
  "exp": 1756282474,
  "iat": 1756282354,
  "jti": "5e9a72a3-4342-44b2-8ae8-221b3e0ba10b"
},
{signature with private key of the eSeal certificate}
```
## Response

An access token for a European organization is similar to a regular Maskinporten token, with the following exceptions:

The formatting of the `consumer` identity is different:
- The `Authority` claim is set to `etsi_en_119_612`
- The `ID` claim contains the identity. It is copied verbatim from the `organizationIdentifer`  attribute from the `Subject` of the certificate.
- Optional fields from the certificate Subject is included (using the X.509 naming. TODO list them)

The `client_amr` is set to `CForeSeals`  or `QRForeSeals`

Example response:
```
{
  "scope" : "digdir:verksemd.eu",
  "iss" : "https://maskinporten:dev/",
  "client_amr" : "CForESeal",
  "token_type" : "Bearer",
  "exp" : 1756282475,
  "iat" : 1756282355,
  "client_id" : "eidas-serialnumberofcertificateused",
  "jti" : "QushYW3BqEqeFFC0Vl1I5kTK5wKpQxqEFDrjX83tfH4",
  "consumer" : {
    "commonName" : "Your company AS",
    "organizationName" : "Your company AS",
    "organizationalUnitName" : "Your company's unit",
    "authority" : "etsi-en-319-412",
    "ID" : "NTRNO-555555555",
    "countryName" : "NO"
  }
}
```