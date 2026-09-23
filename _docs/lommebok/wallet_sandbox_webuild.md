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

Here you can find the [Norwegain PID issuer metadata](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer/webuild).

To test issuance, please go to: [https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc](https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc).

The PID is only available using authorization code flow.  The issuer signs metadata with a webuild WRPAC.  We are p.t. waiting for approval to be registrered on hte trust list.   

Static credential offer for a Norwegian PID:
```
openid-credential-offer://?credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2Futsteder.test.eidas2sandkasse.net%2Fwebuild%22%2C%22credential_configuration_ids%22%3A%5B%22no.digdir.eudiw.webuild.pid_sd_jwt_vc%22%5D%2C%22grants%22%3A%7B%22authorization_code%22%3A%7B%7D%7D%7D
```

## How to get a Norwegian PID ?

Step 1: open the offer on your wallet.  You can go here: [https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc](https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc).

Step 2: an end-user authentication session is started in the browser. 

Step 3: Choose "TestID" as eID-provider

Step 4: Click "Hent tilfeldig person" (Find random user). Click "Autentiser".

Step 5: The authentication process should redirect you back to the wallet.
