---
title: Bevisgenerator, testverktøy for å lage bevis
description:

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder_bevisgenerator
---

Bevisgenerator er et verktøy for å lage bevis i testmiljøet. Du kan lage dine egne bevis og deretter utstede dem til en
lommebok.  Bevisgeneratoren bruker mønsteret for [kjeldestyrt utstedelse](lommebok_digdir_utsteder_kjeldestyrt).

## Brukargrensesnitt

Bevisgenerator har et web-grensesnitt der du kan velge mellom å administrere bevistyper eller utstede bevis for
testformål.

Tjenesten er åpen og det vil se at alle kan se, utstede og redigere bevisdefinisjoner. Lag dine egne bevisdefinisjoner
og la de andre være i fred...

Bevisgenerator kan testes ut på [https://bevisgenerator.test.eidas2sandkasse.net/](https://bevisgenerator.test.eidas2sandkasse.net/).  


## Legge til eller redigere bevistyper

Bevistypene i testmiljøet administreres ved å redigere en JSON-struktur som beskriver bevistypen. En enklere metde for å
redigere bevisene er under utvikling.

Når et bevis skal legges til, vil bevisgeneratoren gi et utkast som kan redigeres. Bevisdefinisjonen må inneholde:

- `credential_metadata` som beskriver strukturen på beviset. Dette inkluderer både krav til datatyper og krav til hvordan dataene skal vises i
  lommeboka. Du må følge [datamodellen som er spesifisert i Openid4VCI-standarden](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-1_0-wg-draft.html#section-12.2.4-2.11.2.6.1)
- `credential_type` som er en unik identifikator for beviset
- `format` som beskriver formatet på beviset som skal utstedes (`dc+sd-jwt` eller `mso_mdoc`).
- `example_credential_data` som er et eksempel på hvordan dataene i beviset kan se ut. Dette er nyttig for å teste
  utstedelse og visning av beviset.
- `scope` som er det nødvendige oauth2-scopeet for å kunne utstede dette beviset. Om beviset skal utstedes via
  Bevisgeneragtoren, må dette være uendret.

Utkastet ser slik ut:

```json
{
  "credential_metadata": {
    "display": [
      {
        "name": "Namn på mitt bevis",
        "locale": "no",
        "background_color": null,
        "text_color": null
      }
    ],
    "claims": [
      {
        "path": "family_name",
        "type": "string",
        "mandatory": true,
        "display": [
          {
            "name": "Etternavn",
            "locale": "no",
            "background_color": null,
            "text_color": null
          }
        ]
      },
      {
        "path": "given_name",
        "type": "string",
        "mandatory": true,
        "display": [
          {
            "name": "Fornavn",
            "locale": "no",
            "background_color": null,
            "text_color": null
          }
        ]
      }
    ]
  },
  "credential_type": "your-credential-type (automatically generated)",
  "example_credential_data": {
    "given_name": "Kari",
    "family_name": "Normann"
  },
  "format": "dc+sd-jwt",
  "scope": "eudiw:eidas2sandkasse:dynamicvc"
}
```

Når beviset er lagt til, vil det innen ett minutt dukke opp i metadata-endepunktet til Bevisgeneratorens utsteder
på [https://utsteder.test.eidas2sandkasse.net/bevisgenerator](https://utsteder.test.eidas2sandkasse.net/bevisgenerator)
og være tilgjengelig for utstedelse.

## Utstede bevis

Velg bevis som skal utstedes fra lista. Bevisgenerator vil legge opp et utkast til innhold i beviset basert på eksempelet som
finnes i bevisdefinisjonen. Dette kan redigeres før utstedelse. Velg også hvilken bruker som skal eie beviset. Dette må
endres 2 steder, både inne i JSON og i feltet over.

```json
{
  "credential_issuer" : "https://utsteder.test.eidas2sandkasse.net/bevisgenerator",
  "credential_configuration_id" : "net.eidas2sandkasse:svv_trafikalt_grunnkurs_sd_jwt_vc",
  "subject" : {
    "identifier" : "50917500484"
  },
  "credential_data" : {
    "valid_from" : "01.01.2026",
    "given_name" : "Kari",
    "family_name" : "Normann",
    "valid_to" : "-"
    }
}
```

Når du starter utstedelsesprosessen, vil data bli sendt til utstederen.  Bevisgeneratoren vil vise en QR-kode som kan skannes med en lommebok og en knapp som kan klikkes på om du er på mobilen, for å utstede bevise til lommeboka.

Interaksjonen mellom bevisgeneratoren og utstederen vises nederst på siden, og du kan følge med på hva som skjer i bakgrunnen. Når beviset er utstedt, vil det dukke opp i lommeboka.

## Presentere og verifisere bevis

Med et bevis i lommeboka, kan beviset presenteres til brukersteder som spør etter beviset.  Se [Ta i bruk som brukerstad](lommebok_taibruk_brukarstad) for mer informasjon om dette.

