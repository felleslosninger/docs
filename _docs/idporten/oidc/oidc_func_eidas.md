---
title: eIDAS
description: eIDAS-støtte over OIDC
summary: "OIDC-integrerte tjenester i ID-porten kan få pålogging fra europeiske brukere ihht eIDAS-forordningen."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_eidas
---

## Om eIDAS

ID-porten er knyttet til EUs infrastruktur for autentisering på tvers av landegrenser. Det betyr at europeiske brukere med "EU-godkjent" eID kan logge seg på norske offentlige tjenester.  Tjenestene må aktivt selv aktivere støtte for internasjonale brukere.

For å bli integert i produksjon, må et land bli formelt *notifisert* og fagfellevurdert av EU-kommisjonen. 

Kunder kan se oppdatert status på hvilke land som er tilkoblet på [EU sitt eIDAS Dashboard](https://eidas.ec.europa.eu/efda/browse/notification/eid-chapter-contacts/NO)

Fra [denne demo-tjenesten](https://demo-client.eidasnode.no/)  kan du verifisere - i produksjon - om et annet land er koblet til Norge.  Trykk "Login"-knappen, velg så land, og dersom du havner på en tilsynelatenede fungerende side i det aktuelle landet, kan du anta at landets borgere vil kunne logge inn til deg.

Single-sign-on (SSO) er foreløpig ikke støttet ved eIDAS-pålogging. 

## Hvilken informasjon får jeg om eidas-brukere ?

Ved en eIDAS-pålogging følger det med følgende kjerne-attributter:

* Fornavn
* Etternavn
* Fødselsdato
* eIDAS-identifikator, unik og "as persistent as possible"

Det er ikke gitt føringer om hvilken identifikator som skal brukes som eIDAS-indentifikator. Hvert medlemsland bestemmer selv.   
Dette har ført til at noen land har fokusert på interoperabilitet (som Estland) og sender en identifikator som også finnes på fysiske ID-bevis eller i registre, typisk nasjonal personnummer eller pass-nummer.
Andre land har fokusert på personvern (som Tyskland), og sender avledede identifikatorer.

I noen av landene er det slik at eidas-identifikatoren er koblet til eID'en. Dette kan medføre at for noen land så vil brukeren få ny eIDAS-identifikator dersom vedkommende fornyer sin eID.

## Kan jeg få norsk fødsels- eller D-nummer ?

ID-porten vil normalt forsøke å finne norsk fødsels/d-nummer på den europeiske brukeren, ved å søke i Folkeregisteret etter eIDAS-identifikatoren.

En vellykka gjenkjenning er avhengig av at:
1. Personen finnes i Folkeregisteret fra før
2. Utenlandsk identifikator finnes i Folkeregisteret fra før (typisk registrert ved søknad om d-nummer, kilde er passet/id-bevis som ble vist ved identitetskontroll)
3. Landet sender samme identifikator i eidas-pålogging som er registrert i pkt. 2

Dersom gjenkjenning ikke var vellykka, så vil ID-porten likevel logge inn brukeren, men pålogginga vil mangle norsk personidentifikator.




## Hvordan aktivere eIDAS-pålogging?

En tjeneste aktiverer eIDAS-knappen i ID-porten sitt påloggingsvindu ved å inkludere verdien `eidas-loa-high` eller `eidas-loa-substantial` i `acr`-attributtet i påloggingsforespørselen.  

Dersom kun eidas-verdien er oppgitt i acr, vil ID-porten hoppe direkte til landvelgeren. På denne måten kan tjenesten lage egen login-knapp for eidas-brukere om dette skulle være ønskelig.

Per idag er ikke eIDAS-pålogging aktivert som standard, slik at dette må aktiveres per tjeneste.


#### Eksempel på request:

```
https://login.test.idporten.no/authorize?
ui_locales=nb&
scope=openid+profile&
acr_values=idporten-loa-substantial+eidas-loa-substantial&
response_type=code&
redirect_uri=https%3A%2F%2Fdemo-client.test.idporten.no%2Fcallback&
state=qaR_c1DI0XotfAcvUUqOVafi4C8KoR3HXBTC5UIvVpA&
code_challenge_method=S256&
nonce=w4EGogkl8AwguhpAUyUMTxVPUhaTIiUhRDOXyGxTkYs&
client_id=democlient_idporten_test&
code_challenge=TE9ih9je36hXuvSyr3hRt8srV6ttER4dyT9e9tWY8zQ
```


Ved en eIDAS-pålogging vil utleverte tokens være litt ulike ordinære tokens:

- `amr` blir satt til `eIDAS`
- De 4 kjerneattributtene i eIDAS vil inkluderes, prefikset med "eidas"
- Norsk personidentifikator `pid` kun vil bli inkludert dersom gjenkjenning mot Folkeregisteret var vellykket

#### Eksempel på respons:

```
{
  "sub" : "q4dQzb7XHPSGQ_eKZ9s8VWZ4fujNx-TT_9MNjAkd_FFVM7lORzIBuc2KfdGcFWOyZmIL2vjlG2gP87x_LnAnhBLQRUgx5a0",
  "amr" : [ "eIDAS" ],
  "iss" : "https://test.idporten.no",
  "locale" : "nb",
  "nonce" : "w4EGogkl8AwguhpAUyUMTxVPUhaTIiUhRDOXyGxTkYs",
  "sid" : "oHsw69uUSq-F7rQl5gYULlVpGueFKN_GCpRmXR7-EH8",
  "aud" : "democlient_idporten_test",
  "acr" : "eidas-loa-substantial",
 
  "eidas_person_identifier" : "CA/NO/11111",
  "family_name" : "Phil",
  "given_name" : "claude",
  "birthdate" : "1965-01-01",
 
  "auth_time" : 1727693610,
  "exp" : 1727693730,
  "iat" : 1727693610,
  "jti" : "mR5RhSGm-ig"
}
```


## Kan jeg be om ekstra-attributter tilhørende utenlandsk bruker ?

Ikke per idag.


###  eIDAS kjerneattributter

Se [eIDAS eID Profile ]( https://ec.europa.eu/digital-building-blocks/wikis/display/DIGITAL/eIDAS+eID+Profile) for beskrivelse av eIDAS kjerneattributter.

Kjerneattributtene består av standard oidc-claims, mens den eidas-spesifikke personidenifikatoren prefixes av ID-porten med "eidas_". 
Dersom det blir match mot folkeregisteret, vil ID-porten inkludere PID-claimet i tokenet.
Det er 4 obligatoriske attributter som alltid vil være tilstede:

| claim                   | eIDAS attributt   | beskrivelse                                       |
|-------------------------|-------------------|---------------------------------------------------|
| eidas_person_identifier | PersonIdentifier  | eidas-identifikator ("as persistent as possible") |
| birthdate               | DateOfBirth       | Fødselsdato                                       |
| given_name              | CurrentGivenName  | Fornavn                                           |
| familiy_name            | CurrentFamilyName | Etternavn                                         |

Merk at "eIDAS-identifkatoren" har et litt spesielt syntaks `xx/NO/yyyy` der:
-  `xx` er 2-bokstavkode for landet der brukeren har sin elektroniske ID (Merk at dette ikke er garantert å også være brukeren sitt hjemland/statsborgerskap) 
- `yyyyy` er en variabel-lengde identifikator i det aktuelle landet.


## Utenlandske testbrukere - innlogging til norsk test-tjeneste

Det er dessverre ikke mange land som tilbyr dedikerte testbrukere for innlogging til norsk tjeneste med utenlandsk e-ID.

### Sverige
Vi anbefaler tjenesteeiere å velge *Sverige* som innloggingsland, og deretter velge "Test ID-tjänst",  her vil man få en nedtrekksliste med tilgjengelige testbrukere.  

### Danmark
For testing med dansk eID på sikkerhetsnivå betydelig (substantial), velg fanen «Test login» når du kommer til dansk IDP, og logg inn med brukernavn: `eidas-testuser1` og passord: `Test1234!`. For testing med LoA high, må en ta kontakt med Digdir.

### Lituaen
Bruk i loginbilde e-ID'en "VIISP BANKAS". Her vil en finne en nedtrekksliste med tilgjengelige testbrukere.  

## Innlogging med norsk e-ID på utenlandsk tjeneste
Det er (pr 19.08.2026) ikke mulig å logge på med norsk e-ID på utenlandske tjenester i produksjonsmiljøet i EUs infrastruktur for autentisering pga manglende notifisering av norske eIDer. Prosess pågår. (I testmiljøet er dette mulig)

