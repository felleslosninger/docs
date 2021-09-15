---
title: REST-API for administrasjon av OIDC-integrasjoner
description: API som gir tjenesteleverandørar mulighet til å administrere sine OIDC-integrasjoner.
permalink: oidc_api_admin.html
sidebar: oidc
product: ID-porten
---

Dette REST-grensesnittet gir kunder og leverandører mulighet til å selvbetjene sine integrasjoner i ID-porten og Maskinporten.

For å kunne bruke APIet må kunden sette opp en egen **selvbetjenings-klient** som kun brukes til dette formålet.  Selvbetjeningsklienten må bruke virksomhetssertifikat opp mot Digdir for å sikre en "ubrutt" juridisk tillitskjede mellom selvbetjente integrasjoner og kunde. Siden denne klienten får svært vide fullmakter på vegne av organisasjonen, er det viktig at denne er godt sikret i eget miljø.

Dersom du bare har en håndfull integrasjoner, er det kanskje best å heller bruke web-basert selvbetjening.


<div class="mermaid">
graph LR
  subgraph Digitaliseringsdirektoratet
    subgraph Fellesløsninger
      idp[ID-porten / Maskinporten]
      end
    subgraph Administrasjon
      web[Innlogget selvbetjening]
      api[SelvbetjeningsAPI]
      end
    konfig[Konfigurasjonsdatabase]
  end
  subgraph Kunde
     admin[Selvbetjeningsklient]
     intern[Tjenester on-prem]
     sky[Tjenester i sky]
  end
  admin --  REST  --- api

  api --> konfig
  web --> konfig
  konfig --> idp

  intern --  OIDC/oauth2 ---idp
  sky --  OIDC/oauth2 ---idp

</div>

 APIet muliggjør for eksempel:
* Kunde kan opprette/endre nye klienter knyttet til eget org.nummer
* Leverandør kan opprette/endre selvstendige klienter knyttet til egne kunder
* Leverandør kan opprette/endre onbehalfof-klienter på vegne av egne kunder

## Hvordan få tilgang ?

Ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> for å få tilgang til å bruke tjenesten.

### Tilgangstyring av APIet {#scopes}

APIet er basert på en [etablert standard for å vedlikeholde Oauth2-integrasjoner, dvs. RFC7591](https://datatracker.ietf.org/doc/html/rfc7591) og er sikret vha. [server-til-server Oauth2](https://difi.github.io/idporten-oidc-dokumentasjon//oidc_auth_server-to-server-oauth2.html), med tokens utstedt av ID-porten (dessverre ikke støtte for Maskinporten-tokens ennå).

Selvbetjeningsklienten må få tildelt scopes for å få tilgang til APIet:

| scope | beskrivelse |
|-|-|
|idporten:dcr.read|Gir tilgang til å lese klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr.modify|Gir tilgang til å endre klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr.write|Gir tilgang til å opprette nye klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr/onbehalfof:write|Gir tilgang til å vise, opprette, endre og slette onbehalfofregistreringer tilhørende en gitt klient. Gir ikke mulighet til å endre andre parametere på selve klienten.|
|idporten:dcr.supplier|Gir leverandører tilgang til å vise, opprette, endre og slette selvstendige OIDC-integrasjoner for andre organisasjoner. Eget org.no blir koblet til disse integrasjonene.  |



### Endepunkter



|Miljø|URL|
|-|-|
|VER1|[https://integrasjon-ver1.difi.no/clients/](https://integrasjon-ver1.difi.no/clients/)|
|VER2|[https://integrasjon-ver2.difi.no/clients/](https://integrasjon-ver2.difi.no/clients/)|
|YT2|[https://integrasjon-yt2.difi.eon.no/clients/](https://integrasjon-yt2.difi.eon.no/clients/)|
|PROD|[https://integrasjon.difi.no/clients/](https://integrasjon.difi.no/clients/)|

Se Open-API dokumentasjon her: [https://integrasjon.difi.no/swagger-ui.html?urls.primaryName=External%20OIDC](https://integrasjon.difi.no/swagger-ui.html?urls.primaryName=External%20OIDC)

## Opprette en integrasjon

Man kan opprette ulike typer integrasjoner over APIet, dvs. klienter for hhv. ID-porten,  Maskinporten eller Kontaktregisteret.  Dette styres av attributtet `integration_type`, som da setter videre begrensninger på hvilke kombinasjoner av andre oauth2-egenskaper som er lovlige. Se [klient-registrering](oidc_func_clientreg.html) for detaljer.

Her er et minimums-eksempel på hvordan opprette en klient:

```
POST /clients HTTP/1.1
Host: integrasjon-ver2.difi.no
Content-Type: application/json
Authorization: Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZiUzRSVEQ0IiwiYWxnIjoiUlMyNTYifQ.eyJzY29wZSI6ImlkcG9ydGVuOmRjci53cml0ZSBpZHBvcnRlbjpkY3IucmVhZCIsImlzcyI6Imh0dHBzOlwvXC9vaWRjLXZlcjIuZGlmaS5ub1wvaWRwb3J0ZW4tb2lkYy1wcm92aWRlclwvIiwiY2xpZW50X2FtciI6InZpcmtzb21oZXRzc2VydGlmaWthdCIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJleHAiOjE2MzE2NTI4OTEsImlhdCI6MTYzMTY0NTY5MSwiY2xpZW50X2lkIjoiaWYyMDE4X3NlbGZzZXJ2aWNlX2NsaWVudCIsImNsaWVudF9vcmdubyI6Ijk5MTgyNTgyNyIsImp0aSI6IlpCOGRnbXJyWmRZVl9xejZSdUxUV2gxNUl2czNEMnFLX0llTjAtaWEzdnciLCJjb25zdW1lciI6eyJhdXRob3JpdHkiOiJpc282NTIzLWFjdG9yaWQtdXBpcyIsIklEIjoiMDE5Mjo5OTE4MjU4MjcifX0.VEaeccnoBNG88U3IwiOxO0u09CKBa-SIq31oEAzMk7_SsksIgNC1NDqqyejHoo5HHgzzgnCVDL2PBFvoSAO0C0my2cZr-FlE6rN9g2abawTIX2cYsk3yBWGBNrZTheQs-QTuwmg4iVQbO6TuAo7nCEnMTY13IYngK829-rtZiz32F-AEoFy0T1Fk7ZVafBtm9Ij1N4rDn25AqHrLYqkWKz9E8GnEk7QEK820oevH3BEE-5iKPNkdoEnJCfMV65dbsQ6OeRHTfmHU2RQ6gj8DjUbOlXnJlxnjyPK52bTnE7kyPBKIBaKtlgC0ePBbj6AMUSSrJjxbria05HJuLreQZQ

{
   "integration_type": "api_klient",
   "application_type": "native",

   "client_name": "Turboskatt",
   "description": "Versjon 3.1 av app'en Turboskatt",
   "client_uri": "https://www.turboskatt.no",

   "scopes": [
       "skatteetaten:skattemelding"
   ],
   "redirect_uris": [
       "https://127.0.0.1:*/callback"
   ],
   "grant_types": [
       "refresh_token",
       "authorization_code"
   ],
   "token_endpoint_auth_method": "none"
}
```
Responsen er en json-struktur med den komplette klientmodellen som ble registrert.  
Merk også at APIet vil opprette og returnere client_id og eventuell client_secret for klienter som opprettes, og at sistnevnte returneres i klartekst.

Eksempelet ovenfor oppretter en ID-porten-klient for [brukerstyrt datadeling på vegne av innlogget bruker](oidc_auth_oauth2.html) (`integration_type=api_klient`), den er et sluttbrukersystem som er tenkt installert lokalt på en PC (`application_type=native` kombinert med en [redirect-uri som peker på en lokal port](oidc_auth_sbs.html) )

### Eierskap til integrasjoner

Normalt blir kunden selv automatisk eier (`client_orgno`) av integrasjoner som opprettes via selvbetjenings-API basert på organisasjonsnummeret i virksomhetssertifikatet som brukes.

Dersom du er leverandør har du flere muligheter til hvordan du skal registere dine kunders integrasjoner. [Se egen side med leverandør-informasjon](oidc_admin_leverandør.html).

## Endring av integrasjon

Endring skjer ved PUT-kall på en gitt klient-id.  Merk at man ikke får lov til å endre integrasjonstype på en eksisterende integrasjon.

Klient-hemmelighet (client_secret) blir ikke resatt ved endringer, men dersom man endrer klient-autentiseringsmetode, vil den blir fjernet.

### Rotering av client_secret

For integrasjoner som bruker symmetrisk nøkkel (client_secret) som klientautentiseringsmetode, kan man generere ny secret ved å kalle [/clients/{client_id}/secret](https://integrasjon-ver2.difi.no/swagger-ui.html#/oidc-client-controller/updateSecretUsingPOST)

Merk: Digitaliseringsdirektoratet vil på sikt innføre maks-levetid på client_secret.

## Bruk av asymmetrisk nøkkel

Asymmetrisk nøkkel er den mest sikre og anbefalte klient-autentiseringsmekanismen.

Man kan sende inn en [JWKS-struktur (RFC7517)](https://tools.ietf.org/html/rfc7517), dvs. et Set som er en array av flere (inntil 5) JWK-representasjoner.

Vi har valgt å modellere disse som egen ressurs under klient `/clients/{client_id}/jwks`

Man kan ikke gjøre operasjoner på enkelt-nøkler, kun hele settet, dvs. både POST og PUT erstatter evt. eksisterende JWKS.

Kun RS256 med nøkkellenge 2048 støttes som algoritme.

Man må alltid sende inn nøkkeldefinisjonen (kty,alg,use,e,n).  

Dersom man ønsker å "låse" integrasjonen til et spesifikt virksomhetssertifikat, må i tillegg inkludere sertifikatet i et `x5c`-claim. Da vil vi runtime validere revokasjon mot Buypass/Commfides.
Eksempel på å legge inn en nøkkel:
```
POST /clients/{client_id}/jwks

{
  [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "minorganisasjon_sakarkivsystemet_2021_Q1",
      "alg": "RS256",
      "n": "lGc-dGnl9l9pCSb6eW5Mf23Aiss09q7Mxre9q9dazSiN9IjQJmkWDySpoYW3g_rSX2a74cg_q3iTSM0Co9iJ0LQp8gjoIi9I8syi6anBKK6fISr1adZbsGGrM1-zMRRNVsJ811snTdkbgx8ZxVRJM4F6D2KwL3TEnv0CRRVtphO0sRmimKBVVBdawPYQC64SQDvARy6xIlPhD-Da2n2Cl6vRQbVns7dYD8-C2TeYGgB_tAsrVSorx9GF5cZ-hlNHfIgg2qQYZzaljyfOWPPG5rybp9bAWg9vFllUFd_Y6vvZ0tqVfAyj67nFz_w4Rxy-MdRgERKHJcq81GkmVzq5fQ"
    }
  ]
}
```

Nøkkelidentifikatoren `kid` velges av kunde selv, og må være unik innenfor alle ID-porten/Maskinportens kunder.

Ved klient-autentisering mot /token-endepunktet, og ved bruk av JWT bearer grants, **må** klienter som har registrert en nøkkel bruke `kid`-parameteren i jwt-headeren istedenfor x5c.

## Registrering av scopes

Se [dokumentasjon av klient-registrering](oidc_func_clientreg.html) for detaljer om hvilke regler som gjelder for å få lov til å registrere Oauth2 scopes tilhørende Digdir eller 3djeparter på en integrasjon.

## Run-time provisjonering / sky

Selvbetjenings-APIet skal legge tilrette for automatisering hos kunder som har hyppige endringer i egen applikasjonsinfrastruktur, typisk der man skalerer tjenester dynamisk opp og ned, flytter en tjeneste fra en skyplatform til en annen, eller man er en leverandør som dynamisk provisjonerer nye sky-instanser for hver nye kunde.

Hvordan APIet konkret skal brukes slik, vil variere mye mellom ulike kunder alt etter hvilket applikasjonslandskap de har, men et "typisk" anbefalt bruksmønster som Digdir ser for seg er slik:

<div class="mermaid">
sequenceDiagram
  participant A as Eget administrasjonssystem
  participant C as Applikasjon i sky / pod
  participant S as SelvbetjeningsAPI
  participant I as ID-porten

  note over A, I: 1: Administrasjonssystemet vil starte en ny applikasjon:
  A ->> C: Oppstartskommando (feks kubectl)
  note over C: Applikasjonen generer selv et nøkkelpar
  C ->> A: public-nøkkel

  note over A, I: 2: Administrasjonssystemet registrerer den nye applikasjonen hos Digdir
  A ->> S: POST /clients  
  S ->> A: 200 OK (client_id)
  A ->> S: POST /clients/{client_id}/jwks
  A ->> C: her er din client_id
  S -->> I: Overføring av integrasjonskonfigurasjon, 0-2 minutter

  note over A, I: 3: Sluttbrukere kan nå logge inn i den nye applikasjonen

  C ->> I: Token-forespørsel signert med privat-nøkkel
</div>




Merk at vi anbefaler at kunden bruker asymmetriske nøkler for klient-autentisering, og at nøkkel-paret blir generert ute hos applikasjonen i stedet for sentralt i admininstrasjonssytestemet, på denne måten minimerer man risiko for misbruk siden privatnøkkel aldri sendes over nettet, og det ikke finst noe sentralt system som sitter på en kopi av alle organisasjonen sine nøkler.

Et godt eksempel på slik bruk er [NAV sin kubernetes-operator Digdirator](https://github.com/nais/digdirator).
