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

### OIDC Oppsett

For å sette opp Databricks til å bruke Maskinporten, kan man bruke deres oppsett for M2M OIDC delta sharing, se oppsett [her](https://docs.databricks.com/aws/en/delta-sharing/create-recipient-oidc-fed#create-a-recipient-that-uses-an-oidc-federation-policy).

`OIDC Federation Policy` må være satt opp på følgende måte:

* Policy name: Valgfritt
* Issuer URL: Skyporten issuer url, se .well-known [her](https://docs.digdir.no/docs/Maskinporten/maskinporten_skyporten.html#well-known-meta-data)
* Subject claim: `sub`
* Subject: sub på skyportens format `0192:[RECIPIENT ORGNO];[SKYPORTEN SCOPE]` feks: `0192:310175838;difitest:test2`
* Audiences: Valgfritt, feks https://difitest.no

Tildel tabeller til den nyopprettede recipienten som ved vanlig delta sharing

## For deg som skal konsumere fra Databricks

### Oppsett

Prosjektet krever at man har et ekte Maskinporten-token mot det rette miljøet.
[Her er informasjon om hvordan du kommer i gang med Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#tilgang-til-maskinporten).  [Her er et node.js eksempel på token-generering for skyporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#eksempel-kode-for-token-generering).

Ettersom databricks har integrert pålogging og uthenting av data, krever denne pt signering med nøkler, og ikke virksomhetssertifikat. Konsumentbiblioteket er opensource og pull requests er ønsket!

Pakken for automatisert uthenting gjennom python er releaset [her](https://github.com/delta-io/delta-sharing/releases/tag/py-v1.4.0)

```
pip3 install delta-sharing
```

### Create a Databricks profile

Følgende må oppgis fra tilbyder basert på oppsett i pakken : 
* endpoint
* audience
* scope


Lagre som `oauth_config.share`
``````json
{
    "shareCredentialsVersion": 2,
    "type": "oauth_jwt_bearer_private_key_jwt",
    "endpoint": "[FROM PROVIDER]",
    "auth": {
        "tokenEndpoint": "[SKYPORTEN TOKEN ENDPOINT]",
        "clientId": "[SKYPORTEN CLIENT ID]",
        "issuer": "[SKYPORTEN ISSUER]",
        "audience": "[AUDIENCE SET IN PROVIDERS DATABRICKS OIDC Federation Policy]",
        "scope": "[PROVIDER SCOPE]",
        "privateKey": {
            "privateKeyFile": "[PATH TO PRIVATE KEY FILE]",
            "keyId": "[SKYPORTEN KEY ID]",
            "algorithm": "RS256"
        }
    }
}
``````

### Run 

Kjør pakken med følgende kommandoer i et python-miljø eller som en del av en notebook

``````python
import delta_sharing

# Point to the profile file. It can be a file on the local file system or a file on a remote storage.
 profile_file = "oauth_config.share"

 # Create a SharingClient.
 client = delta_sharing.SharingClient(profile_file)
 #
 # List all shared tables.
 tables = client.list_all_tables()

 print(tables)
``````
