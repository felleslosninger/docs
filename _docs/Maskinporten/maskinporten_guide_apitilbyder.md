---
title: Slik bruker du Maskinporten som API-tilbyder
description: API-sikring med Maskinporten
summary:
permalink: maskinporten_guide_apitilbyder.html
sidebar: maskinporten_sidebar
product: Maskinporten
---

### Overordnet prosedyre for API-sikring

En full verdikjede for API-sikring med Maskinporten består av følgende steg:

1. API-tilbyder blir manuelt tildelt et API-prefiks i Maskinporten
2. API-tilbyder oppretter et API
3. API-tilbyder gir tilgang til en konsument
4. Konsument oppretter en Maskinporten-integrasjon (oauth2-klient) og registrer  scopet til denne.

Tilgang er nå etablert.  Når API'et så skal brukes run-time, gjennomføres følgende steg:

5. Konsumenten sin Oauth2-klient forespør token fra Maskinporten
6. Konsumenten inkluderer token i kall til APIet.
7. API-tilbyder validerer tokenet, utførerer evt. fin-granulert tilgangskontroll og returnerer forespurt ressurs.

## Prosedyre for API-tilbyder

### 1: Manuell tildeling av prefix

Første gang du skal ta i bruk Maskinporten, må du bli manuelt satt opp som API-tilbyder:  Du må bestemme:
* et `scope-prefix` du ønsker bruke for dine APIer
* ditt `organisasjonsnummer`

Send inn skjema: [https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5ka_Oknk2ND5DhEKnqlTuZMlUMVNWWVYwSlhTWlpRTjQwWEVDS09EUFVWWS4u](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5ka_Oknk2ND5DhEKnqlTuZMlUMVNWWVYwSlhTWlpRTjQwWEVDS09EUFVWWS4u)

#### Beskrivelse av APIer

I Maskinporten-sammenheng er et API det samme som et Oauth2 scope. Digitaliseringsdirektoratet ønsker å gi API-tilbydere stor frihet til å selv bestemme sin semantikk for API-sikring innenfor rammene av Oauth2-standardene. Samtidig er det behov for noen regler for å sikre interoperabilitet.  

Følgende syntax brukes:

```
scope ::= prefix ':' subscope
```

der `prefix` er en tekststreng som blir manuelt tildelt API-tilbyderen. En API-tilbyder kan ha flere prefix.  Eksempel på prefix kan være `nav` eller `skatt`. Å bruke organisasjonnummer som prefix kan i mange sammenhenger være nyttig, siden det kan legge til rette for automatiserte prosesser. I andre sammenhenger vil ikke organisasjonsnummer være tilstrekkelig granulært for store virksomheter.

- Subscope bør beskrive ressursen best mulig (`trygdeopplysninger` eller `adresse`).  
- Subscope kan gjerne ha ulike postfix for å skille på lese- og skrive-tilgang til ressursen (`nav:trygdeopplysninger.write`)
     - fravær av postfix bør i utgangspunktet tolkes som kun lese-tilgang


#### Synlighet

Attributtet `visibilty` brukes for å angi scopets synlighet:

|verdi|beskrivelse|
|-|-|
|PUBLIC | Scopet er synlig for alle på /scopes/all endepunkt.    |
|PRIVATE| Scopet er ikke synlig for andre enn API-tilbyder og de konsuementer som har fått tilgang |Konsument må bli fortalt at scopet finnes    |
|INTERAL | Inten bruk i Digitaliseringsdirektoratet   |   

Merk at det er ingen integrasjon med API-katalogen, slik at API-tilbyder selv må sikre at scopet ikke havner i API-katalogen dersom denne benyttes.

#### Scope-begrensninger

Det anbefales at man setter en begrensning på bruk av scopet. Ved å sette attributtet  `allowed_integration_types`, vil man begrense bruken til de integrasjonstypene som er inkludert i attributtet. F.eks kan man begrense bruken til kun å kunne brukes med maskinporten- (server til server) eller idportenklienter (brukerinnlogging).

#### Inaktive entiteter

For å sikre juridisk logging og statistikk, vil Digitaliseringsdirektoratet aldri slette scopes og tilganer (eller integrasjoner), men heller deaktivere disse ved DELETE-kall.

Deaktiverte entiteter vil ikke komme opp i GET utlistinger som default, men kan hentes ved å sette `inactive=TRUE` som query parameter. Deaktiverte entiteter vil ikke reaktiveres ved POST og man får 409 Conflict isteden.

## Administrasjon av API

API'ene kan administreres på 2 måter. Enten ved bruk av Oauth2-klient eller ved bruk av web-grensesnitt via Samarbeidsportalen.

### 1a: Opprette et API - via Samarbeidsportalen

 - Gå til "Min profil" på https://samarbeid.difi.no/ . Velg "Virksomhetens tjenester" og "Administrasjon av tjenester" på venstresiden i menyen.

- Velg "Mine API" i det miljøet du vil opprette API'et i.

- Trykk på "Nytt scope"

- Velg prefix fra nedtrekksmenyen, om denne er tom, så er det ikke tildelt noe prefix til organiasjonsnummeret du representerer. Ta da kontakt på <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. Organisasjonsnummeret for virksomheten din vil være pre-utfyllt i skjemaet.

- Fyll ut resten av parameterene og trykk "lagre". Subscopet vil nå vise i listen over "Mine API".

[![Opprette API](https://samarbeid.difi.no/sites/samarbeid2/files/opprette-api.png)](https://samarbeid.difi.no/sites/samarbeid2/files/opprette_api.mp4 "Opprette API")

### 1b: Tilgangsstyring - via Samarbeidsportalen

 - Gå til "Min profil" på https://samarbeid.difi.no/ . Velg "Virksomhetens tjenester" og "Administrasjon av tjenester" på venstresiden i menyen.

- Velg "Mine API" i det miljøet du vil tilgangsstyre i.

- Velg API'et du vil tilgangsstyre.

- Gå til "Tilganger" under skjemaet.

- For å legge til ny tilgang, trykk på "+ legg til ny tilgang" og registrer organisasjonsnummeret til virksomheten som skal få tilgang.

- For å revokere tilgang, trykk på "Slette" i listen over tilganger.

[![Tilgangsstyre API](https://samarbeid.difi.no/sites/samarbeid2/files/tilgangsstyre-api-png.png)](https://samarbeid.difi.no/sites/samarbeid2/files/tilgangsstyre_api.mp4 "Tilgangsstyre API")

### 2a. Opprette APIer - Oauth2-selvbetjeningsklient

Dersom du vil automatisere administrasjonen av scopes og tilganger fra egen API management-løsning, må du lage en Oauth2-klient som benytter selvbetjeningsAPIet til Maskinporten.  Se [oidc_api_admin_maskinporten.html](oidc_api_admin_maskinporten.html) for detaljer.

#### Eksempel på å opprette scope

```
POST /scopes HTTP/1.1
Host: integrasjon-ver2.difi.no
Content-Type: application/json
Authorization: Bearer 0pLY6hwU6tkzBPoGTVlObex-QfIBw_yU9tXy7SKrgOU=
cache-control: no-cache
{
	"prefix": "difi",
	"subscope": "api3",
	"description": "Difi sitt API nummer 3 for demo-formål"
}
```



### 2b. Tilgangsstyring - Oauth2-selvbetjeningsklient

Tilgang gis og fjernes ved enkle REST-kall:  

#### Eksempel på å gi tilgang

```
PUT /scopes/access/889640782?scope=difi:api3 HTTP/1.1
```
som gir organisasjonsnummer `889640782` tilgang til scopet `difi:api3`.

Send DELETE for å trekke tilbake en tilgang.

#### Eksempel på å se tilganger
Request:
```
GET /scopes/access?scope=difi:api3 HTTP/1.1
```
Respons:
```
[
    {
        "scope": "difi:api3",
        "state": "APPROVED",
        "prefix": null,
        "created": "2018-11-28T14:11:35+01:00",
        "consumer_orgno": "889640782",
        "last_updated": "2018-11-28T14:11:35+01:00",
        "owner_orgno": "991825827"
    }
]
```


Vi har valgt å legge scope som query-parameter, da det innen noen sektorer finnes spesifikke standarder som krever bruk av slash "/" i scope-definisjonen, og dette vil bli unødig tungvindt for brukere av APIet å skulle støtte dette som del av path-komponenten.


### 3. Gi konsument beskjed om å lage en integrasjon

Du kan nå gi konsumenten beskjed om at han må lage en Maskinporten-integrasjon med det aktuelle API-scopet. Denne prosessen er dokumentert i [guide for API-konsument](maskinporten_guide_apikonsument.html).



### 4: Validere token

Når en konsument bruker Maskinporten-token mot ditt API, må du gjøre en skikkelig validering av dette.  Oauth2 og JWT-spec'ene spesifiserer i detalj hva du skal gjøre.  

Dersom token er self-contained :
- sjekke at 'issuer' stemmer med Maskinporten ("https://maskinporten.no/" i prod)
- validere signering, og at signeringsertifikat stemmer med det Maskinporten publiserer på sitt JWK-endepunkt
- verifisere at scope stemmer med ditt aktuelle  API-endepunktet
- validere at token ikke er utløpt (exp)


#### Eksempel på token:


```
{
  "aud" : "unspecified",
  "scope" : "difitest:test2",
  "iss" : "https://ver2.maskinporten.no/",
  "client_amr" : "virksomhetssertifikat",
  "token_type" : "Bearer",
  "exp" : 1584694565,
  "iat" : 1584693565,
  "jti" : "IYRtIEzOYb8fHiIMEaqVHq_tXYGWe6OEOjOdsK-P_30",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:991825827"
  }
}
```
Det er `consumer`-claimet som forteller hvilken konsument som har fått tokenet.
Merk:  Du skal ikke bruke client_id eller client_org til tilgangstyring, disse er gamle claims som vil bli fjernet.


Dersom konsumenten bruker leverandør, vil du i tillegg få to ekstra claims, de fleste API-tilbydere trenger ikke ta tilgangsbeslutninger basert på leverandør, men det kan være nyttig å logge informasjon for sporbarhet.
```
...
  "supplier" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:991825827"
  },
  "delegation_source" : "https://tt02.altinn.no/",
...
```


## Bruke delegering i Altinn

Dersom du ønsker at konsumenter av ditt API skal kunne bruke Altinn til å delegere tilgangen videre til en systemleverandør, må du opprette et såkalt delegeringsoppsett (delegationScheme) som må tilknyttes et eller flere av dine Oauth2 scopes i Maskinporten.  Dette fordrer at du er tjenesteeier i Altinn.

Prosedyren er nærmere dokumentert i [funksjonalitetsbeskrivelse for ekstern delegering](maskinporten_func_delegering.html).


1. Først oppretter du et scope i Maskinporten på vanlig måte (se ovenfor), men passe på å sette at dette scopet har en **delegeringskilde** knyttet til seg.


2. Du så må lage en "delegerbar ressurs" i Altinn med det aktuelle scopet:
  * Be Altinn om å få tilgang til `altinn:maskinporten/delegationschemes.write` scope.
  * Lag en maskinporten-klient som har dette admin-scopet registrert.
  * Denne klienten må be et token fra Maskinporten, og så opprette ressursen ved et POST-kall til `https://tt02.altinn.no/maskinporten-api/delegationSchemes`


3. Til slutt gir du tilgang til konsumenter på vanlig måte. Merk at leverandøren aldri må gis direkte tilgang.

Merk:
* Maskinporten-scopes som mangler delegeringskilde, vil ikke kunne benytte Altinn til delegering
* Maskinporten-scopes som har delegeringskilde, vil ikke kunne konsumeres av leverandører som benytter ID-porten/Maskinportens interne delegeringsfunksjonalitet (onbehalfof)
