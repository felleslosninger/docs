---
title: Skyporten med Databricks - Maskinporten for deling av skyressurser
description:  Skyporten med Databricks - Maskinporten for deling av skyressurser
summary: 'Oppskrift for konsument og tilbyder for å benytte Skyporten med Databricks'

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_skyporten
---

---
* TOC
{:toc}

## For deg som skal tilby via Databricks

### Oppsett


## For deg som skal konsumere fra Databricks

### Oppsett

Prosjektet krever at man har et ekte Maskinporten-token mot det rette miljøet.
[Her er informasjon om hvordan du kommer i gang med Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#tilgang-til-maskinporten).  [Her er et node.js eksempel på token-generering for skyporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#eksempel-kode-for-token-generering).

Ettersom databricks har integrert pålogging og uthenting av data, krever denne pt signering med nøkler, og ikke virksomhetssertifikat. Konsumentbiten er opensource og pull requests er ønsket!

### Create a Databricks profile

``````json
{
    "shareCredentialsVersion": 2,
    "type": "oauth_jwt_bearer_private_key_jwt",
    "endpoint": "[PROVIDED FROM CLIENT]",
    "auth": {
        "tokenEndpoint": "[SKYPORTEN TOKEN ENDPOINT]",
        "clientId": "[SKYPORTEN CLIENT ID]",
        "issuer": "[SKYPORTEN ISSUER]",
        "audience": "[AUDIENCE SET IN DATABRICKS]",
        "scope": "[SKYPORTEN  SCOPE]",
        "privateKey": {
            "privateKeyFile": "[PATH TO PRIVATE KEY FILE]",
            "keyId": "[SKYPORTEN KEY ID]",
            "algorithm": "RS256"
        }
    }
}
``````

### Run 
