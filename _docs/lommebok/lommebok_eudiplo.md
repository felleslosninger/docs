---
title: EUDIPLO som brukarstad mot sandkassa
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_demo_brukarstad
---

EUDIPLO er eit OpenWallet Foundation prosjekt for å lage eit middelvare-lag for å kunne integrere eksisterande infrastruktur / tjenester mot EU Digital Identity Wallet-økosystemet. 

![EUDIPLO sin overordna arkitektur ](https://raw.githubusercontent.com/openwallet-foundation-labs/eudiplo/refs/heads/main/docs/overview.excalidraw.svg)

Sjå: [GitHub - openwallet-foundation-labs/eudiplo: Your diplomatic layer for EUDI Wallet integration](https://github.com/openwallet-foundation-labs/eudiplo)


## Komme i gang

Her følger ein beskrivelse av korleis du kan konfigurerere EUDIPLO som brukerstad mot lommeboka i sandkassen.

### 1. Installer EUDIPLO backend og webklient for administrasjon 

Følg [quick-start guiden](https://openwallet-foundation.github.io/eudiplo/latest/getting-started/quick-start/) fram til at du har tenestene køyrande og helseendepunktet viser "up"

Du skal no ha to tenester: ein backend-tjeneste og ein webklient.

### 2. Opprett ny tenant for din brukarstad

1. Logg inn i admin webklienten med `AUTH_CLIENT_ID` og `AUTH_CLIENT_SECRET`.
2. Opprett ein ny tenant. Gje tenanten rollene: clients:manage, presentation:manage og presentation:offer
3. Hugs å ta vare på tenant id og passord, dei blir berre viste når du opprettar tenanten.


### 3.Konfigurere aksessertifikat for brukarstaden
Vi skal no generera nøkler og få knytta oss til tillitskjeden i sandkassa. Nytt ditt føretrekte terminalverktøyt for å køyre kommandoar

1. Generer nøklar:
 ```
openssl genpkey -algorithm EC -out eckey.pem \
       -pkeyopt ec_paramgen_curve:P-256 \
       -pkeyopt ec_param_enc:named_curve
  ```
2. Lag CSR-fil:
```
openssl req -new -key eckey.pem -subj /CN="brukersted" -out access.csr
```

3. Registrer ny brukarstad via [sjolvbetening.test.eidas2sandkasse.net](https://sjolvbetening.test.eidas2sandkasse.net) og lag aksessertifikat ved å registrere CSRen. Last ned sertifikatet.

4. Konverter privatnøkkelen din frå pem til jwk-format. Dette kan gjerast med eit verktøy du kan lasta ned via homebrew:
```
    brew install jphastings/tools/jwker
    jwker eckey.pem > my-key.jwk
```

### 4. Installer aksessertifikatet i eudiplo

 1. Gå til swagger-endepunktet til API-et (http://localhost:3000/api)
 2. Authorize med tenant id og client id til tenanten din
 3. Gå til endepunktet: /api/key-chain/import
 4. Legg inn informasjonen som blir etterspurd der (din privatnøkkel generert til dette formål på jwk format og sertifikatet du fikk i sjolvbetjeningsløysinga.). Det er viktig at du veljer:  "usageType": "access".

  Eksempeldata:
  
```
  {
"key": {
    "kty": "EC",
    "d": "innhold",
    "crv": "P-256",
    "kid": "innhold",
    "x": "innhold",
    "y": "innhold",
    "alg": "ES256"
},
  "description": "aksess-sertifikat",
  "usageType": "access",
  "crt": [
    "-----BEGIN CERTIFICATE-----\nSERTIFIKAT\n-----END CERTIFICATE-----"
  ],
  "rotationPolicy": {
    "enabled": false,
    "intervalDays": 90,
    "certValidityDays": 365
  }
}
```

Dersom førespurnaden er i orden, så vil du få returnert 201. Nøkkelen skal da også dukke opp under "keys" i eudiplo, og dersom ein trykkjer på auge ved nøkkelen så skal subject og issuer være utfylte under "Active certificate"
     
### 5. Opprette presentasjonskonfigurasjon.

Logg inn i webklienten med innloggingsinformasjonen frå punkt 2.

For å kunne forespørre eit gitt bevis må det opprettast ein presentasjonskonfigurasjon. Her er framgangsmåten for å opprette ein konfigurasjon for PID-dokument i SD-JWT-VC format. Kva bevis ein forespør, bevisformat og førespurde attributter blir angitt gjennom ei DCQL-spørring som blir registrert på presentasjonskonfigurasjonen.

1. Under "Verification configs", vel + - ikonet i høyre hjørne
2. Vel ein passende id og beskrivelse for konfigurasjonen
3. Vel den nøkkelen du dyttet inn der du kan velje "access key chain"
4. Bruk følgjande DCQL-spørring (Andre valg i konfigurasjonen kan behalde standardverdiene sine.):

```
{
  "credentials": [
    {
      "id": "eudi-pid-sd-jwt-vc",
      "format": "dc+sd-jwt",
      "claims": [
        {
          "path": [
            "family_name"
          ]
        },
        {
          "path": [
            "given_name"
          ]
        },
        {
          "path": [
            "birthdate"
          ]
        },
        {
          "path": [
            "place_of_birth"
          ]
        },
        {
          "path": [
            "nationalities"
          ]
        }
      ],
      "meta": {
        "vct_values": [
          "urn:eudi:pid:1"
        ]
      }
    }
  ]
}
```


## Bruke EUDIPLO for å generere presentasjonsforespurnader og lese responser frå lommeboka

EUDIPLO-Backend tilbyr API-ar for å generere nye presentasjonsførespurnader til lommeboka, samt å sjekke status og lese respons på desse førespurnadane.

Følgende api-kall er relevante:

```
POST /api/verifier/offer

GET /api/session/{id}
```

Sjå OpenAPI-spesifikasjonen tilgjengeleg under /api på backend-tjenesten for detaljer om korleis dette APIet skal brukast. 

Når ein opprettar ein ny presentation request så blir det returnert ein request-URI samt ein request-Id. request-URIen blir brukt til å sende sjølve førespurnaden til lommmebok-appen. Dette skjer enten ved å trigge URIen direkte dersom brukarstaden blir brukt frå samma eining som lommeboka er installert på ("same-device"), eller ved å generere ein QR-kode av URIen som så kan skannast frå lommebok-appen dersom denne er på ein anna enhet ("cross-device"). Det er brukarstaden sitt ansvar å presentere denne URIen på ein hensiktsmessig måte for brukaren.

Request-IDen kan brukasr mot /session-endepunktet på backend-tjenesten for å sjekke status på førespurnaden, og lese data frå det delte beviset.

Ein kan også teste presentasjonsførespurnader direkte frå webklienten til EUDIPLO. Vel pluss-teiknet under new verification, og vel konfigurasjon som du har oppretta for å generere ein ny førespurnad.
