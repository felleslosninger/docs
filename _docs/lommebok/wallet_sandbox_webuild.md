---
title: Webuild and norwegian sandbox

sidebar: lommebok
product: lommebok
redirect_from: /wallet_sandbox_webuild
---

These pages contain brief documentation on how WeBuild-partners can use the Norwegian PID Issuer. 


## About the Norwegian Sandbox

Please read [the generic introduction on the Norwegian sandbox](wallet_sandbox_summary).

## About Norwegian PID for Webuild.

The PID issuer URL is `https://utsteder.test.eidas2sandkasse.net/webuild`.

The PID is only available using authorization code flow.  (ETSI 119 472-3 requirement ?)

Static credential offer for a Norwegian PID
```
openid-credential-offer://?credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2Futsteder.test.eidas2sandkasse.net%2Fwebuild%22%2C%22credential_configuration_ids%22%3A%5B%22no.digdir.eudiw.webuild.pid_sd_jwt_vc%22%5D%2C%22grants%22%3A%7B%22authorization_code%22%3A%7B%7D%7D%7D
```

## How to get a Norwegain PID ?

Step 1: open the offer on your wallet

Step 2: an end-user authentication session is started in the browser. 

Step 3: Choose "TestID" as eID-provider

Step 4: Click "Find tilfeldig person" (Find random user).

Step 5: The authentication should redirect you back to the wallet.
