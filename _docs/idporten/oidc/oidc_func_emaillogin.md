---
title: epost-innlogging
description: epost-innlogging-støtte over OIDC
summary: "OIDC-integrerte tjenester i ID-porten kan få pålogging fra brukere med selvregistrert e-post."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_emaillogin
---

## Om epost-innlogging

Epost-innlogging er en "lettvekts-innlogging", tiltenkt bruksområder med begrensa krav til sikkerhet.  

Epost-innlogging har ikke noe formelt sikkerhetsnivå ihht [selvdeklarasjonsforskriften](https://lovdata.no/dokument/SF/forskrift/2019-11-21-1578).  Identifikasjon av brukeren skjer kun ved selvregistrert epost-adresse som brukeren må kontrollere.  Autentisering skjer ved at det blir sendt en kort kode til den aktuelle epost-adressa hver gang brukeren forsøker å logge på.

## Hvilken informasjon får jeg om epost-innloggingsbrukere ?

Ved en epost-innlogging følger det med følgende kjerne-attributter:

* epost-adresse

Hver bruker bestemmer selv hvilken epost-adresse de bruker. 


## Kan jeg få norsk fødsels- eller D-nummer ?

Nei, ID-porten vil ikke forsøke å finne norsk fødsels- eller D-nummer på epost-innloggingsbrukere. epost-innloggingsbrukere er selvregistrerte brukere som ikke nødvendigvis har noen tilknytning til Folkeregisteret.

## Hvordan aktivere epost-innlogging-pålogging?

En tjeneste aktiverer epost-innloggings-knappen i ID-porten sitt påloggingsvindu ved å inkludere verdien `selfregistered-email` eller `selfregistered-email idporten-loa-substantial` i `acr`-attributtet i påloggingsforespørselen.  

Dersom kun epost-innloggingsverdien er oppgitt i acr, vil ID-porten hoppe direkte til epost-innlogging. På denne måten kan tjenesten lage egen login-knapp for epost-innlogging-brukere om dette skulle være ønskelig.

Per idag er ikke epost-innlogging aktivert som standard, slik at dette må aktiveres per tjeneste.


#### Eksempel på request:

```
https://login.test.idporten.no/authorize?
ui_locales=nb&
scope=openid+profile&
acr_values=selfregistered-email idporten-loa-substantial&
response_type=code&
redirect_uri=https%3A%2F%2Fdemo-client.test.idporten.no%2Fcallback&
state=qaR_c1DI0XotfAcvUUqOVafi4C8KoR3HXBTC5UIvVpA&
code_challenge_method=S256&
nonce=w4EGogkl8AwguhpAUyUMTxVPUhaTIiUhRDOXyGxTkYs&
client_id=democlient_idporten_test&
code_challenge=TE9ih9je36hXuvSyr3hRt8srV6ttER4dyT9e9tWY8zQ
```


Ved en epost-innlogging-pålogging vil utleverte tokens være litt ulike ordinære tokens:

- `acr` blir satt til `selfregistered-email`
- `amr` blir satt til `Selfregistered-email`
- `sub` blir en unik identifikator basert på epost adresse og klient-id.

#### Eksempel på respons:

```
{
  "sub" : "0K8ZrC1DzgfH4AUOgP6CDW-IOTGwTElLBkvIU7N89Or0qYN0aM7h6UaX45rWbZrgxn4OXcYPPNMyqLMQBVojl9UwMADvhUMt4g",
  "amr" : [ "Selfregistered-email" ],
  "iss" : "https://test.idporten.no",
  "locale" : "nb",
  "nonce" : "w4EGogkl8AwguhpAUyUMTxVPUhaTIiUhRDOXyGxTkYs",
  "sid" : "oHsw69uUSq-F7rQl5gYULlVpGueFKN_GCpRmXR7-EH8",
  "aud" : "democlient_idporten_test",
  "acr" : "selfregistered-email",
 
  "email" : "test@test.no",
 
  "auth_time" : 1727693610,
  "exp" : 1727693730,
  "iat" : 1727693610,
  "jti" : "mR5RhSGm-ig"
}
```