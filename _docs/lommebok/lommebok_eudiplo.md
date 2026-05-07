---
title: EUDIPLO som brukerstad mot sandkassa
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

Følg [quick-start guiden](https://openwallet-foundation-labs.github.io/eudiplo/latest/getting-started/quick-start/) fram til at du har tjenestene køyrande og helseendepunktet viser "up"

Du skal no ha to tjenester: ein backend-tjeneste og ein webklient.

### 2. Opprett ny tenant for din brukarstad

1. Logg inn til admin webklienten med `AUTH_CLIENT_ID` og `AUTH_CLIENT_SECRET`.
2. Opprett ny tenant. Gi tenanten rollene: clients:manage, presentation:manage og presentation:offer
3. Husk å ta vare på tenant id og passord, det vises kun når du oppretter det.


### 3.Konfigurerere aksessertifikat for brukerstaden

1. Logg inn i webklienten med klienten til den nye tenanten du har oppretta 


2. Generer nøkkel:
 ```
openssl genpkey -algorithm EC -out eckey.pem \
       -pkeyopt ec_paramgen_curve:P-256 \
       -pkeyopt ec_param_enc:named_curve
  ```
4. lag CSR-fil:
```
openssl req -new -key eckey.pem -subj /CN="brukersted" -out access.csr
```

6. Registrer ny brukerstad via [sjolvbetening.test.eidas2sandkasse.net](https://sjolvbetening.test.eidas2sandkasse.net) og lag aksessertifikat ved å registrere inn CSRen. Last ned sertifikatet.

7. Konverter privatnøkkelen din fra pem til jwk-format. Dette kan gjøre slik, med et verktøy du kan laste ned via homebrew:
```
    brew install jphastings/tools/jwker
    jwker eckey.pem > my-key.jwk
```

### 4. Installer aksessertifikatet i eudiplo

 1. Gå til swagger-endepunktet til API-et (http://localhost:3000/api)
 2. Authorize med din tenant sin tenant id og client id
 3. Gå til endepunktet: /api/key-chain/import
 4. Dytt inn informasjonen de forespør der (din privatnøkkel generert til dette formål på jwk format og sertifikatet du fikk i sjolvbetjeningen.). Det er viktig at du setter:  "usageType": "access".

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
  "kmsProvider": "string",
  "rotationPolicy": {
    "enabled": false,
    "intervalDays": 90,
    "certValidityDays": 365
  }
}
```

Dersom forespørselen er i orden, så vil du få returnert 201. Nøkkelen skal da også dukke opp under "keys" i eudiplo, og dersom man trykker på øyet ved nøkkelen så skal subject og issuer være fylt ut under "Active certificate"
     
### 5. Opprette presentasjonskonfigurasjon.

For å kunne forespørre eit gitt bevis må det opprettes ein presentasjonskonfigurasjon. Her er framgangsmåten for å opprette ein konfigurasjon for PID-dokumenter i SD-JWT-VC format. Kva bevis ein forespør, bevisformat og forespurte attributter blir angitt gjennom ei DCQL-spørring som blir registrert på presentasjonskonfigurasjonen.

1. Under "Verification configs" velg + - ikonet i høyre hjørne
2. Velg ein passende id og beskrivelse for konfigurasjonen
3. Velg den nøkkelen du dyttet inn der du kan velge "access key chain"
4. Bruk følgende DCQL-spørring (Andre valg i konfigurasjonen kan beholde standardverdiene sine.):

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


## Bruke EUDIPLO for å generere presentasjonsforespørsler og lese responser frå lommeboka

EUDIPLO-Backend tilbyr APIer for å generere nye presentasjonsforespørsler til lommeboka, samt å sjekke status og lese respons på disse forespørslene.

Følgende api-kall er relevante:

```
POST /api/verifier/offer

GET /api/session/{id}
```

Sjå OpenAPI-spesifikasjonen tilgjengelig under /api på backend-tjenesten for detaljer om korleis dette APIet skal brukast. 

Når ein oppretter ein ny presentation request så blir det returnert ein request-URI samt ein request-Id. request-URIen blir brukt til å sende sjølve forespørselen til lommmebok-appen. Dette skjer enten ved å trigge URIen direkte dersom brukarstaden blir brukt fra samme enhet som lommeboka er installert på ("same-device"), eller ved å generere ein QR-kode av URIen som så kan skannast frå lommebok-appen dersom denne er på ein anna enhet ("cross-device"). Det er brukarstaden sitt ansvar å presentere denne URIen på ein hensiktsmessig måte for brukaren.

Request-IDen kan brukasr mot /session-endepunktet på backend-tjenesten for å sjekke status på forespørselen, og lese dataene frå det delte beviset.

Ein kan også teste presentasjonsforespørsler direkte frå webklienten til EUDIPLO. Velg pluss-tegnet under new verification, og velg konfigurasjon som du har oppretta for å generere ein ny forespørsel.
