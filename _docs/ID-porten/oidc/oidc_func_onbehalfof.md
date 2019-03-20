---
title: OnBehalfOf
description: OnBehalfOf - leverandør-støtte
summary: "OnBehalfOf gir en leverandør mulighet til å gjenbruke en  OIDC-integrasjon på vegne av mange kunder."
permalink: oidc_func_onbehalfof.html

layout: page
sidebar: oidc
---

## Om funksjonaliteten

*Onbehalfof* gjer det mogleg for tjenesteleverandørar å tilby tjenester til ulike tjenesteeiere over samme føderasjon.

* Gir mulighet til å ha ulike navn, logo og tilbake-url
* Statistikk / fakturering går til riktig tjenesteeier

## Bruk

Autentiseringsrequest må inneholde ekstra parameter ```onbehalfof```:

```
https:/…./authorize?client_id=test_client&onbehalfof=leikanger_kommune&...
```

Returnert ID-token vil då innehalde eit nytt claim ```client_onbehalfof```:

```
{
  …
  aud: "test_client"
  aud_onbehalfof: "leikanger_kommune"
  …
}
```

Klient må validere at returnert "client_onbehalfof" stemmer overens med forespurt onbehalfof-verdi.

Kombinasjonen av client og client_onbehalfof må vere pre-registrert hjå ID-porten. Me held på med å utarbeide eit API for automatisering av dette.
