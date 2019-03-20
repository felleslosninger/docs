---
title: eIDAS
description: eIDAS-søtte over OIDC
summary: "Klienter kan også motta europeiske brukere ihht eIDAS-reguleringen fra ID-portens OIDC-provider. "
permalink: oidc_func_eidas.html

layout: page
sidebar: oidc
---

## Om eIDAS

ID-porten er knyttet til EUs infrastruktur for autentisering på tvers av landegrenser.  For mer info om eIDAS, se  [https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITAL/How+does+it+work+-+eIDAS+solution](https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITAL/How+does+it+work+-+eIDAS+solution).  

Funksjonaliteten har blitt utviklet med støtte fra EU-kommisjonen, se [Connecting Europe Facility Norge](https://www.difi.no/fagomrader-og-tjenester/digitalisering-og-samordning/europeisk-infrastruktur/cef-digital).


{% include image.html file="oidc_func_eidas-931dea0a.png" url="https://www.difi.no/fagomrader-og-tjenester/digitalisering-og-samordning/europeisk-infrastruktur/cef-digital" alt="CEF logo" max-width="200" %}

## Overordnet om eIDAS-støtte


ID-porten tilbyr to typer eidas-støtte over OIDC:

* **Enkel**: Her sees eIDAS på lik linje med en norsk eID, slik at tjenesten kun vil motta innlogginger der eIDAS-brukeren er blitt entydig gjenkjent i Folkeregisteret med F/D-nummer. De fleste tjenester vil ønske denne oppførselen.
* **Avansert**:  Tjenesten kan selv styre hvilken eIDAS-oppførsel de vil ha, ved å sende ulike parametre som del av autentiseringsforespørselen.


Alternativene er oppsummert i følgende tabell:

|Alternativ | |	Parametre tilstades i autentiseringsforespørsel	||||Respons||
|Flyt	|Krever gjenkjenning (1)|eidas-støtte<br> (login_hint) | utlevere eidas-kjerneattributter<br>(scope = eidas)| tilleggsgjenkjenningsalgoritmer<br> (claims{identitymatch} ) | sektor-spesifikke attributter <br>(claims {eidas_*} )|Benytta gjenkjenningsalgoritme <br>(eidas_identitymatch )|Sikkerhetsnivå <br>(acr) |
| --- |:---:| --- |--- | --- | --- | --- | --- |
|Enkel| JA    |ja |nei |nei  | nei |tom  (2)|	Level3 Level4|
|Avansert	|JA|	ja|	ja	|nei|	mulig|	tom (2)	|Level3 Level4 |
|||||BEST_EFFORT| mulig | UNAMBIGUOUS BEST_EFFORT|Level3 Level4 |
|Avansert	|NEI	|ja	|ja	|NOT_FOUND	|mulig| UNAMBIGUOUS NOT_FOUND ERROR |Level3 Level4|
|||||NOT_FOUND BEST_EFFORT|	mulig|UNAMBIGUOUS BEST_EFFORT NOT_FOUND ERROR|Level3 Level4|

(1) Ved "krever gjenkjenning", vil ID-porten vise en feilside dersom bruker ikke ble gjenkjent ihht forespurt gjenkjenningsstyrke

(2) UNAMBIGUOUS vil bli brukt, men IdentityMatch returneres ikke dersom ikke den er forspurt.



## Tilgjengelig eIDAS-funksjonalitet i autentiseringsforespørsel

Se http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest for korrekt syntax og valideringsregler for en autentiseringsforespørsel.

### 1: eIDAS-støtte

Alle som vil motta eidas-pålogging sender inn `eidas:true` som "login_hint".

Standard gjenkjenningsalgoritme basert på entydig, identifikator-basert gjenkjenning ('UNAMBIGUOUS')  vil bli forsøkt. Dersom ingen folkeregisterperson ble gjenkjent, vil innloggingsflyten da stoppe med at ID-porten OIDC-provider viser en feilmelding ("This service require a norwegian D-number, but none could be found" (Denne oppførselen kalles "kreve gjenkjenning").

eIDAS sikkerhetstnivå "high" mappes til "Level4" og nivå "substantial" mappes til "Level3" i acr-claimet i id_token.

Det er ingen sentral tilgongsstyring i OIDC provider på kven som skal ha tilgong, alle klienter kan sende login_hint. Ein gong i fremtida (2020?) vil ID-porten aktivere enkel eidas-støtte for alle OIDC-tenester.

```
https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
 ...
  login_hint=eidas:true
 ...
```



### 2: Utlevere eidas kjerneattributter

Ved å sende 'eidas' som et scope i autentiseringsforespørsel, vil eidas kjerneattributter (Minimum Data Set) verte utlevert i id_token:

* 4 obligatoriske eidas attributter (PersonIdentifier, fornavn, etternavn, fødselsdato)
* 5 valfrie eidas attributter (om desse eksisterer) (todo)

Denne funksjonaliteten medfører implisitt aktivering av "avansert" eidas-oppførsel, der mao: resterende funksjonalitet i dette kan avsnittet kan også då benyttast.

Den aktuelle Oauth2-klienten må pre-registreres med tilgang til 'eidas'-scope, for at dette skal virke.

#### Eksempel:

```
https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
 ...
  scope=openid profile eidas
  login_hint=eidas:true
 ...
```



### 3: Forespørre tilleggsgjenkjenningsalgoritmer  (herunder "kreve gjenkjenning")

Klienter kan forespørre ekstra gjenkjenningsalgoritmer, som vil bli forsøkt i tillegg til standard-oppførselen med entydig identifikator-basert gjenkjenning ('UNAMBIGUOUS').

Dette gjøres ved å bruke standard OIDC-funksjonalitet for å forespørre claims i id_token, se [http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter](http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter) .  Klienten må inkludere en array over ønska identitymatch-verdier, slik:

```
claims=
{
  "id_token":
     {
      "identitymatch":  { "values": ["BEST_EFFORT", "NOT_FOUND"] }
     }
}

```


Følgende verdier er per idag mulig å sende inn i forespørsel

* BEST_EFFORT: Dersom unambiguous ikke gir treff, vil gjenkjenning bli forsøkt basert på navn+fødselsdato.
* NOT_FOUND: Deaktivere "kreve gjenkjenning", mao: vil motta eIDAS-brukere som ikke er gjenkjent
* NOT_FOUND BEST_EFFORT: En kombinasjon av de to foregående.

Den algoritmen som ligger til grunn for norsk personidentifikator i reponsen vil bli utlevert i id_token som et claim `eidas_identitymatch`. Verdien "ERROR" kan også utleveres, her har det skjedd en feil i gjenkjenningsprosedyren og/eller integrasjonen mellom ID-porten og Folkeregisteret, og klienten kan ikke tolke fravær av norsk folkeregisteridentifikator som at eidas-brukeren ikke har F/D-nummer.

Dersom verdien "NOT_FOUND" er tilstede i array'en over forespurte gjenkjenningsalgoritmer, medfører dette at standardoppførselen "kreve gjenkjenning" blir deaktivert, og tjenesten vil også kunne motta ikkje-gjenkjente eIDAS-brukere. Claimet "pid" vil da ikke nødvendigvis være tilstede i id_token. Ikke-gjenkjente eIDAS-brukeres sikkerhetsnivå mappes fremdeles til norske nivåer. 'sub'-claimet vil være en pairwise verdi basert på eidas-PersonIdentifier, som medfører at dersom samme eidas-brukere senere blir gjenkjent, vil 'sub' endre seg.

#### Eksempel:

```
https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?
 ...
  scope=openid profile eidas&
  login_hint=eidas:true&
  claims={"id_token": { "identitymatch": { "values": ["BEST_EFFORT", "NOT_FOUND"] }}}
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
   &claims={"idtoken":{"eidas_sector_att_1":null, "eidas_sector_att_2":null, "identitymatch": { "values": ["BEST_EFFORT", "NOT_FOUND"] } }}      
    ...                                          
```




## Autentiserings-respons

Ved enkel eidas-oppførsel vil tjenesteeier kunne identifisere eidas-pålogginger ved å se at claimet `acr` har verdien "eidas":

| claim | verdi  | beskrivelse |
| --- | --- | --- |
| acr | eidas | Pålogging utført av eIDAS-bruker |

Brukers folkeregisteridentifikator utleveres i `pid`-claimet på vanlig måte.


###  eIDAS kjerneattributter

Se [eIDAS SAML Attribute Profile ]( https://ec.europa.eu/cefdigital/wiki/download/attachments/46992719/eIDAS%20SAML%20Attribute%20Profile%20v1.1_2.pdf?version=1&modificationDate=1497252920100&api=v2) for beskrivelse av eIDAS kjerneattributter.

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
| BEST_EFFORT | Attributter fra utenlandsk eID er benyttet til koble mot sannsynlig identitet i Det Sentrale Folkeregister.   (For eksempel: navn og fødselsdato stemmer med en person i DSF). Metoden har risiko for feil-kobling. |
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

## Integrerte land i produksjonsmiljøet

Per Januar 2019 er Estland koblet på i produksjonsmiljøet.    Vi forventer å ha Tyskland, Italia, Portugal, Spania og Luxemburg i løpet av 2019, etterhvert som de blir formelt *notifisert* og fagfellevurdert av EU-kommisjonen.  For en oppdatert status, se EU-kommisjonen sin side: [https://ec.europa.eu/cefdigital/wiki/display/EIDCOMMUNITY/Overview+of+pre-notified+and+notified+eID+schemes+under+eIDAS](https://ec.europa.eu/cefdigital/wiki/display/EIDCOMMUNITY/Overview+of+pre-notified+and+notified+eID+schemes+under+eIDAS)

I testmiljøet har vi for tiden 19 land integrert.
