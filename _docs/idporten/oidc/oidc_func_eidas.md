---
title: eIDAS
description: eIDAS-søtte over OIDC
summary: "Klienter kan også motta europeiske brukere ihht eIDAS-reguleringen fra ID-portens OIDC-provider. "

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_eidas
---

## Om eIDAS

ID-porten er knyttet til EUs infrastruktur for autentisering på tvers av landegrenser. Det betyr at europeiske brukere med "EU-godkjent" eID kan logge seg på norske offentlige tjenester.  Per februar 2020 er følgende land koblet på i produksjonsmiljøet:
- Belgia
- Kroatia
- Estland
- Italia
- Latvia
- Luxembourg
- Portugal
- Spania
- Sverige

For å bli integerte i produksjon, må et land bli formelt *notifisert* og fagfellevurdert av EU-kommisjonen.  For en oppdatert status over denne prosessen, se EU-kommisjonen sin side: [https://ec.europa.eu/cefdigital/wiki/display/EIDCOMMUNITY/Overview+of+pre-notified+and+notified+eID+schemes+under+eIDAS](https://ec.europa.eu/cefdigital/wiki/display/EIDCOMMUNITY/Overview+of+pre-notified+and+notified+eID+schemes+under+eIDAS)

For mer informasjon om eIDAS, se  [https://ec.europa.eu/cefdigital/wiki/pages/viewpage.action?pageId=82773030](https://ec.europa.eu/cefdigital/wiki/pages/viewpage.action?pageId=82773030).  

## Hvordan aktivere eIDAS-pålogging?

ID-porten tilbyr to typer eidas-støtte over OIDC:

* **Enkel**: Her sees eIDAS på lik linje med en norsk eID, slik at tjenesten kun vil motta innlogginger der eIDAS-brukeren er blitt entydig gjenkjent i Folkeregisteret med F/D-nummer. De fleste tjenester vil ønske denne oppførselen.
* **Avansert**:  Tjenesten kan selv styre hvilken eIDAS-oppførsel de vil ha, ved å sende ulike parametre som del av autentiseringsforespørselen.

Per idag er ikkje eIDAS-pålogging aktivert som standard, slik at dette må aktiveres per tjeneste.

### Hva må jeg gjøre for å motta enkel eIDAS-pålogging over OIDC?

- du må sende en mail til ID-porten og be om at OIDC-integrasjonen blir aktivert for eidas i den såkalte 'eid-selector'

En gang i fremtiden vil ID-porten aktivere enkel eidas-støtte for alle OIDC-tjenester

## Hvordan motta avansert eIDAS-pålogging over OIDC ?

P.t er avansert eIDAS kun tilgjenglig ved at du må i egen løsning lage to "innganger" til tjenesten din, dvs.  en "logg på med eidas"-knapp, og en "logg på med norsk eID"-knapp.  På auteniseringsforespørselen fra "eidas-knappen" har du 4 valg:

- /autorize-kallet må inneholde `eidas:true` i `login_hint`
- For å få du utlevert eidas-attributter, kan du forespørre om scopet `eidas`
- Du kan styre gjenkjenning-prosessen mot Folkeregisteret ved å forespørre `identitymatch` som oidc-claims
- Du kan be om sektor-spesifikke eidas-attributter ved å forespørre disse i som oidc-claims


Disse valgene er nærmere detaljert i egne avsnitt nedenfor:


### 1: eIDAS-støtte

Avansert eidas-pålogging trigges ved å sende inn `eidas:true` som "login_hint" i /authorize-kallet.

eIDAS sikkerhetstnivå "high" mappes til "Level4" og nivå "substantial" mappes til "Level3" i acr-claimet i id_token.

Det er ingen sentral tilgongsstyring i OIDC provider på kven som skal ha tilgong, alle klienter kan sende login_hint.

```
https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
 ...
  login_hint=eidas:true
 ...
```



### 2: Utlevere eidas kjerneattributter

Ved å sende 'eidas' som et scope i autentiseringsforespørsel, vil eidas kjerneattributter bli utlevert i id_token:

* 4 obligatoriske eidas attributter (PersonIdentifier, fornavn, etternavn, fødselsdato)
* Dersom medlemslandet også sender med noen av de valgfrie edias kjerneattributtene, vil disse også utleveres: Navn ved fødsel, fødested, nåværende addresse, kjønn.

Den aktuelle Oauth2-klienten må også registreres med 'eidas'-scope i selvbetjeningsløsningen for at dette skal virke.

#### Eksempel:

```
https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
 ...
  scope=openid profile eidas
  login_hint=eidas:true
 ...
```



### 3: Styre gjenkjenning mot folkeregisteret

ID-porten vil alltid forsøke å finne norsk fødsels/d-nummer på den europeiske brukeren, ved å søke i Folkeregisteret etter den utenlandske identifikatoren (eidas-personidentifier).  En vellykka gjenkjenning er avhengig av at:
1. Personen finnes i Folkeregisteret fra før
2. Utenlandsk identifikator finnes i Folkregisteret fra før (typisk registrert ved søknad om d-nummer, kilde er passet/id-bevis som ble vist ved identitetskontroll)
3. Landet sender samme identifikator i eidas-pålogging som er registrert i pkt. 2 (noen land sender av personvernhensyn andre identifikatorer enn de som er trykt på fysiske id-bevis)

Dersom gjenkjenning ikke var vellykka, vil ID-porten vise en feilside.  

For å slippe å vise denne feilsiden, for eksempel hvis din tjeneste fint kan håndtere brukere uten norsk f/d-nummer, må du eksplisitt be om alternative algoritme for gjenkjenning, såkalt `identitymatch`.  Dette gjøres ved å bruke standard OIDC-funksjonalitet for å forespørre spesifikke claims i id_token, se [http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter](http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter) .  Klienten må inkludere en array over ønska identitymatch-verdier, slik:

```
claims=
{
  "id_token":
     {
      "identitymatch":  { "values": [ "NOT_FOUND"] }
     }
}

```

Følgende verdier er per idag mulig å sende inn i forespørsel

* NOT_FOUND: Deaktivere "kreve gjenkjenning", mao: vil motta eIDAS-brukere som ikke er gjenkjent

Den algoritmen som ligger til grunn for norsk personidentifikator i reponsen vil bli utlevert i id_token som et claim `eidas_identitymatch`. Følgende responser er da mulige:

|`eidas_identitymatch`|Beskrivelse|
|-|-|
|UNAMBIGUOUS| Entydig gjenkjenning av norsk f/d-nummer basert på utenlansk id|
|NOT_FOUND| Vi klarte ikke finne norsk personidentifikator |
|ERROR| Det har skjedd en feil i gjenkjenningsprosedyren og/eller integrasjonen mellom ID-porten og Folkeregisteret.  Klienten kan ikke tolke fravær av norsk folkeregisteridentifikator som at eidas-brukeren ikke har F/D-nummer|


Ikke-gjenkjente eIDAS-brukeres sikkerhetsnivå mappes fremdeles til norske nivåer. 'sub'-claimet vil være en pairwise verdi basert på eidas-PersonIdentifier, som medfører at dersom samme eidas-bruker senere blir gjenkjent, vil 'sub' ikke endre seg.





#### Eksempel:

```
https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
 ...
  scope=openid profile eidas&
  login_hint=eidas:true&
  claims={"id_token": { "identitymatch": { "values": [ "NOT_FOUND"] }}}
 ...
```




###  4: Forespørre sektor-spesifikke attributter

eIDAS-infrasturen kan transparent overføre attributter som ikke er del av eIDAS-spesifikasjonen, såkalte sektor-spesifikke attributter.  En klient forespør slike attributter ved å prefixe dem med "eidas_" og be om dem som i claims i autentiseringsforespørselen, se forrige avsnitt. Dette er kun mulig dersom scope=eidas også er forespurt.

ID-porten vil da be om disse attributtene fra den utenlandske IDP'en. Ikke alle land/IDPer kan fremskaffe attributtene, men de som ID-porten eventuelt mottar, vil bli utlevert i ID-token.


#### Eksempel på request
```
https://oidc.difi.no/authorize?             
   ...              
   &scopes=openid eidas             
   &login_hint=eidas:true             
   &claims={"idtoken":{"eidas_sector_att_1":null, "eidas_sector_att_2":null, "identitymatch": { "values": [ "NOT_FOUND"] } }}      
    ...                                          
```




## Autentiserings-respons

Ved enkel eidas-oppførsel vil tjenesteeier kunne identifisere eidas-pålogginger ved å se at claimet `acr` har verdien "eidas":

| claim | verdi  | beskrivelse |
| --- | --- | --- |
| acr | eidas | Pålogging utført av eIDAS-bruker |

Brukers folkeregisteridentifikator utleveres i `pid`-claimet på vanlig måte.


###  eIDAS kjerneattributter

Se [eIDAS eID Profile ]( https://ec.europa.eu/digital-building-blocks/wikis/display/DIGITAL/eIDAS+eID+Profile) for beskrivelse av eIDAS kjerneattributter.

Kjerneattributtene prefixes av ID-porten med "eidas_".  Det er 4 obligatoriske attributter som alltid vil være tilstede:

| claim | eIDAS attributt | beskrivelse |
| --- |  --- | --- |
| eidas-personidentifier | PersonIdentifier | eidas-identifikator ("as persistent as possible") |
| eidas-dateofbirth |DateOfBirth| Fødselsdato|
| eidas-firstname |FirstName|Fornavn|
| eidas-familityname |FamilyName|Etternavn|

og 4 valgfrie attributter som kanskje vil følge med:

| claim | eIDAS attributt | beskrivelse |
| --- |  --- | --- |
| eidas-birthname|BirthName| Fullt navn ved fødsel |
| eidas-placeofbirth |PlaceOfBirth| Fødested |
| eidas-currentaddress |CurrentAddress| Nåværende addresse|
| eidas-gender|Gender| Kjønn|

Kjerneattributter utleveres kun for eIDAS-brukere.

### Benyttet gjenkjenningsalgoritme

Dersom en tilleggsgjenkjenningsalgoritme *ikke* var forespurt, vil ID-porten alltid bruke entydig gjenkjenning ( `UNAMBIGUOUS` ).


Dersom en tilleggsgjenkjenningsalgoritmer var forspurt, vil claimet `identitymatch` fortelle hvilken algoritme som ligger til grunn for gjenkjenning:

| IdentityMatch | forklaring |
| --- | --- |
| UNAMBIGUOS | Identifikator fra utenlandsk eID'en har en entydig kobling mot identitet i Det Sentrale Folkeregister |
| CACHED | Kobling mot norsk personidentifikator er basert på lagret informasjon i ID-porten, og ikke som del av denne innloggingen.  (dette kan typisk skje ved midlertidige integrasjonsfeil mellom ID-porten og DSF)|
| ERROR | Det oppstod en feil ved forsøket på å koble utenlandsk eID mot norsk personidentifikator (Dette kan skje feks ved feil i kommuniksajonen mellom ID-porten og Det Sentrale Folkeregisteret|
|NOT_FOUND | Ingen treff ved forsøk på kobling av utenlandsk eID mot norsk personidentifikator i Det Sentrale Folkeregister)|
|SELF_DECLARED | Norsk personidentifikator er basert på opplysninger som brukeren selv har oppgitt (Brukeren har for eksempel koblet sin Facebook-konto med ID-porten|


Ved bruk av tilleggsgjenkjenningsalgoritmer vil  tjenesteeier kunne motta to identifikatorer på brukerne:


  | acr | eidas-personidentifier | pid |  Beskrivelse |
  | --- | ---- | --- | --- | --- |
  | eidas | xx/NO/yyyyy… | <tomt> |  Personen har autentisert seg med europeisk eID. Norsk D-nummer ble ikke funnet.|
  | eidas | xx/NO/yyyyy… | norsk folkeregisteridentifikator | Personen har autentisert seg med europeisk eID og har norsk D/F-nummer. |
  | [En av disse](https://begrep.difi.no/ID-porten/SAMLAssertionV1)| <tomt> | norsk folkeregisteridentifikator | Personen har autentisert seg med vanlig norsk eID. |



Merk av ved bruk av tilleggsgjenkjenningsalgoritmer, vil fravær av verdi i feltet *pid* ikke  garantere at personen ikke har fått tildelt d/f-nummer.

## Utenlandske testbrukere

Det er dessverre ikke mange land som tilbyr dedikerte testbrukere ennå.  Vi anbefaler tjenesteeiere å velge *Sverige* som innloggingsland, og deretter velge "Test ID-tjänst",  her vil man få en nedtrekksliste med tilgjengelige testbrukere.  

Den først i lista, Mohamed Al Samed, er hardkoda i den norske eIDAS Noden til å bli  entydig gjenkjent med norsk D-nummer 59125502061.  ID-token for en autentisering på eidas-nivå 'substantial' vil se slik ut:

```
 "amr" : [ "eIDAS" ],
 "pid" : "59125502061",
 "eidas-identitymatch" : "UNAMBIGUOUS",
 "eidas-personidentifier" : "SE/NO/199008199391",
 "eidas-firstname" : "Mohamed",
 "eidas-familyname" : "Al Samed",
 "eidas-dateofbirth" : "1990-08-19",
 "acr" : "Level3",
 ```

I testmiljøet har vi for tiden 19 land integrert.
