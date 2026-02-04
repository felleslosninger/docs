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

1. Logg inn til admin webklienten med root og passordet du satte i .env-fila di.
2. Opprett ny tenant. Gi tenanten rollene: clients:manage, presentation:manage og presentation:offer
3. Du finner klientID og passord ved å trykke på knappen "Copy login url" i lista over klienter under detaljvisninga for tenanten.


### 3.Konfigurerere aksessertifikat for brukerstaden

1. Logg inn i webklienten med klienten til den nye tenanten du har oppretta 

2. Opprett ny nøkkel ved å trykke "+ Create key" under "Getting started". Eksporter privatnøkkelen og lagre denne i fila access.key.jwk


3. Konvertere privatnøkkelen frå JWK til PEM. Til dette kan du bruke verktøyet jwker som kan installeres via homebrew

```
brew install jphastings/tools/jwker

jwker access.key.jwk > access.key.pem
```

4. Bruk openssl til å lage ein CSR basert på denne privatnøkkelen

```
openssl req -new -key access.key.pem -subj /CN="brukersted" -out access.csr 
```

5. Registrer ny brukerstad via [sjolvbetening.test.eidas2sandkasse.net](https://sjolvbetening.test.eidas2sandkasse.net) og lag aksessertifikat ved å registrere inn CSRen 

6. Installer aksessertifikatet i EUDIPLO . Sertifikatet må registrerast frå detaljvisningsida for nøkkelen du oppretta. Velg "access" som usage og lim inn det PEM-enkoda sertifikatet som du lasta ned frå sjølvbetjeningsløysinga til sandkassen.

### 4. Opprette presentasjonskonfigurasjon.

For å kunne forespørre eit gitt bevis må det opprettes ein presentasjonskonfigurasjon. Her er framgangsmåten for å opprette ein konfigurasjon for PID-dokumenter i SD-JWT-VC format. Kva bevis ein forespør, bevisformat og forespurte attributter blir angitt gjennom ei DCQL-spørring som blir registrert på presentasjonskonfigurasjonen.

1. Under "Presentation Configuration" velg "+ Add config"
2. Velg ein passende id og beskrivelse for konfigurasjonen
3. Bruk følgende DCQL-spørring (Andre valg i konfigurasjonen kan beholde standardverdiene sine.):

```
{
  "$schema": "https://raw.githubusercontent.com/openwallet-foundation-labs/eudiplo/refs/heads/main/schemas/DCQL.schema.json",
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
      },
      "trusted_authorities": [
        {
          "type": "etsi_tl",
          "values": [
            "https://eudiplo-api.eidas2sandkasse.dev/sandkasse-tillitsliste/trust-list/8e059cf5-48da-4a8c-ae50-a9d5044f1e94"
          ]
        }
      ]
    }
  ]
}
```
Siste elementet "trusted_authorities" angir tillitslista som EUDIPLO bruker til å finne tillitsankeret som blir brukt til å validere signaturen over det mottatte beviset. Denne verdien vil være lik for alle presentasjonskonfigurasjoner i sandkassa.

## Bruke EUDIPLO for å generere presentasjonsforespørsler og lese responser frå lommeboka

EUDIPLO-Backend tilbyr APIer for å generere nye presentasjonsforespørsler til lommeboka, samt å sjekke status og lese respons på disse forespørslene.

Følgende api-kall er relevante:

```
POST /verifier/offer

GET /session/{id}
```

Sjå OpenAPI-spesifikasjonen tilgjengelig under /api på backend-tjenesten for detaljer om korleis dette APIet skal brukast. 

Når ein oppretter eit nytt "presentation offer" så blir det returnert ein request-URI samt ein request-Id. request-URIen blir brukt til å sende sjølve forespørselen til lommmebok-appen. Dette skjer enten ved å trigge URIen direkte dersom brukarstaden blir brukt fra samme enhet som lommeboka er installert på ("same-device"), eller ved å generere ein QR-kode av URIen som så kan skannast frå lommebok-appen dersom denne er på ein anna enhet ("cross-device"). Det er brukarstaden sitt ansvar å presentere denne URIen på ein hensiktsmessig måte for brukaren.

Request-IDen kan brukasr mot /session-endepunktet på backend-tjenesten for å sjekke status på forespørselen, og lese dataene frå det delte beviset.

Ein kan også teste presentasjonsforespørsler direkte frå webklienten til EUDIPLO. Velg "+ Create Offer" under Preswntation Configuration for å generere ein ny forespørsel.
