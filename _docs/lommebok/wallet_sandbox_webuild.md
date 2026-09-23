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


Step 3: Choose "TestID" as eID-provider.

<img width="589" height="99" alt="image" src="https://github.com/user-attachments/assets/24893fdf-a661-488b-ac0b-a6c5579c7e1a" />


Step 4: Click "Hent tilfeldig daglig leder" (Find random CEO). Click "Autentiser".

<img width="486" height="206" alt="image" src="https://github.com/user-attachments/assets/740621c6-f614-4a03-962f-0498cd1fa54c" />


Step 5: The authentication process should redirect you back to the wallet.

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
