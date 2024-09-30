---
title: eIDAS
description: eIDAS-støtte over OIDC
summary: "OIDC-integrerte tjenester i ID-porten kan få pålogging fra europeiske brukere ihht eIDAS-forordningen."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_eidas
---



{% include note.html content="Ny eIDAS-løsning blir lansert oktober 2024. Denne er teknisk og funksjonelt ulik den gamle løsningen. Vi vil fortløpende koble på nye land.  Kunder kan se oppdatert tilkoblingsstatus på [EU sitt eIDAS Dashboard](https://eidas.ec.europa.eu/efda/browse/notification/eid-chapter-contacts/NO) " %}


## Om eIDAS

ID-porten er knyttet til EUs infrastruktur for autentisering på tvers av landegrenser. Det betyr at europeiske brukere med "EU-godkjent" eID kan logge seg på norske offentlige tjenester.  

For å bli integert i produksjon, må et land bli formelt *notifisert* og fagfellevurdert av EU-kommisjonen. 

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
2. Utenlandsk identifikator finnes i Folkregisteret fra før (typisk registrert ved søknad om d-nummer, kilde er passet/id-bevis som ble vist ved identitetskontroll)
3. Landet sender samme identifikator i eidas-pålogging som er registrert i pkt. 2

Dersom gjenkjenning ikke var vellykka, så vil ID-porten likevel logge inn brukeren, men id_tokenet vil mangle `pid`-claimet.




## Hvordan aktivere eIDAS-pålogging?

En tjeneste aktiverer eIDAS-knappen i ID-porten sitt påloggingsvindu ved å inkludere verdien `eidas-loa-high` eller `eidas-loa-substantial` i `acr`-attributtet i påloggingsforespørselen. 

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


Ved en eIDAS-pålogging vil utlevert tokens være litt ulikt ordinære tokens:

- `acr` blir satt til `eIDAS`
- De 4 kjerneattributtene i eIDAS vil inkluderes, prefiket med "eidas"
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
 
  "eidas_identifier" : "CA/NO/11111",
  "eidas_lastname" : "Phil",
  "eidas_firstname" : "claude",
  "eidas_date_of_birth" : "1965-01-01",
 
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

Kjerneattributtene prefixes av ID-porten med "eidas_".  Det er 4 obligatoriske attributter som alltid vil være tilstede:

| claim | eIDAS attributt | beskrivelse |
| --- |  --- | --- |
| eidas-personidentifier | PersonIdentifier | eidas-identifikator ("as persistent as possible") |
| eidas-dateofbirth |DateOfBirth| Fødselsdato|
| eidas-firstname |FirstName|Fornavn|
| eidas-familityname |FamilyName|Etternavn|

Merk at "eIDAS-identifkatoren" har et litt spesielt syntaks `xx/NO/yyyy` der:
-  `xx` er 2-bokstavkode for landet der brukeren har sin elektroniske ID (Merk at dette ikke er garantert å også være brukeren sitt hjemland/statsborgerskap) 
- `yyyyy` er en variable-lengde identifikator i det aktuelle landet.


## Utenlandske testbrukere

Det er dessverre ikke mange land som tilbyr dedikerte testbrukere ennå.  Vi anbefaler tjenesteeiere å velge *Sverige* som innloggingsland, og deretter velge "Test ID-tjänst",  her vil man få en nedtrekksliste med tilgjengelige testbrukere.  

