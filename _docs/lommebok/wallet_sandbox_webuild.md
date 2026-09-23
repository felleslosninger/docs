---
title: Webuild and Norwegian sandbox

sidebar: lommebok
product: lommebok
redirect_from: /wallet_sandbox_webuild
---

These pages contain brief documentation on how WeBuild-partners can use the Norwegian PID Issuer. 


## About the Norwegian Sandbox

Please read [the generic introduction on the Norwegian sandbox](wallet_sandbox_summary).

## About Norwegian PID for Webuild.

We have setup a dedicated issuer for WeBuild to issue Norwegian PIDs.  Here is [issuer metadata](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer/webuild).

To start issuance, please go to: [https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc](https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc) to get a QR code.

The PID is only available using authorization code flow.  The issuer signs metadata with a webuild WRPAC, and the credential is signed by a webuild certificate present on the webuild pid-provider trust lists.

Static credential offer for a Norwegian PID:
```
openid-credential-offer://?credential_offer=%7B%22credential_issuer%22%3A%22https%3A%2F%2Futsteder.test.eidas2sandkasse.net%2Fwebuild%22%2C%22credential_configuration_ids%22%3A%5B%22no.digdir.eudiw.webuild.pid_sd_jwt_vc%22%5D%2C%22grants%22%3A%7B%22authorization_code%22%3A%7B%7D%7D%7D
```

## How to get a Norwegian PID ?

Step 1: open the offer on your wallet.  You can go here: [https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc](https://bevisporten.test.eidas2sandkasse.net/start-issuance?credential_configuration_id=no.digdir.eudiw.webuild.pid_sd_jwt_vc).

Step 2: an end-user authentication session is started in the browser. 


Step 3: Choose "TestID" as eID-provider.

<img width="589" height="99" alt="image" src="https://github.com/user-attachments/assets/24893fdf-a661-488b-ac0b-a6c5579c7e1a" />


Step 4: Click "Hent tilfeldig daglig leder" (Find random CEO). Click "Autentiser".

<img width="486" height="206" alt="image" src="https://github.com/user-attachments/assets/740621c6-f614-4a03-962f-0498cd1fa54c" />


Step 5: The authentication process should redirect you back to the wallet.


## How to revoke a PID

- you need to remember the user-id (national ID) of the test user.

- go to the "revoke" section of [our test tool](https://bevisgenerator.test.eidas2sandkasse.net/revoke),
  - select "Personidentifikator"
  - select the credential type you want to revoke (normallay "Norsk ID-bevis Webuild SD-JWT")
  - enter the user-id into the "Personidentifaktor" field
  - press "Revoker bevis" button.
 
<img width="894" height="652" alt="image" src="https://github.com/user-attachments/assets/f02c319b-583f-4039-8d29-7b11d18c9c8a" />


## About test users

The PID issuer is connected to the Test Population Registry and the Test Business Registry in Norway, containing a lot of synthentic persons and companies. 

So when you click "Hent tilfeld person" a random test user is fetched runtime from the Test Population Registry.  But you can also write a user-id directly if you prefer.  

The button "Hent tilfeldig daglig leder" fetches a person who is also a CEO for a company in the Test Business Registry, so you can use them to get an EBWOID for that company later.  Norwegian EBWOIDs can be issued from [https://brg.apps.tt02.altinn.no/brg/lommebok-v1/](https://brg.apps.tt02.altinn.no/brg/lommebok-v1/). 

Here is 10 static users which could be used, if your use case can not deal with being assigned a random user.

| national id | name | organization id | organization name |
|-|-|-|-|
|12865398148 |EKSAKT KARIES| 312545020| STRAFFET SUBJEKTIV MINK ANS|
|10876698493 |GYLDEN BUSK|  312739267|  KUNST MINIMALISTISK APE|
|28926899513 |FREDELIG LIST|  310513385|  HEVNGJERRIG FANTASIFULL TIGER AS|
|04897399712 |REALISTISK BEFAL|  313629872|  ALTERNATIV UGLESETT TIGER AS|
|19877296701 |OPPLYST BLOKKFLØYTE|  213446762|  SKJØNN VIKTIG KATT KRAMPE|
|06815896732 |TILGIVENDE KONTINGENT|  314094212|  TAPPER TYDELIG TIGER AS|
|11853349366 |SAMTIDIG KATETER|  314189728|  HEL KNUSLETE TIGER AS|
|29917398036 |DEMOKRATISK ASSOSIASJON|  312259591|  NETT MORSK TIGER AS|
|29836599118 |SELVTILFREDS MANDOLIN|  311129422|  UTÅLMODIG SALT ISBJØRN SA|
|14846599313 |FLAT STJERNE|  312153831|  INTUITIV NY INSEKT|
