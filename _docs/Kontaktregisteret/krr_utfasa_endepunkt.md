---
title: Utfasede endepunkt og IP-adresser
description: REST-API for Kontakt- og Reservasjonsregisteret

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_utfasa_endepunkt
---

## Utfasede endepunkt:

 |miljø|url|
 |-|-|
 |VER1|[https://oidc-ver1.difi.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc-ver1.difi.no/kontaktinfo-oauth2-server/rest/v1/personer)|
 |VER2|[https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc-ver2.difi.no/kontaktinfo-oauth2-server/rest/v1/personer)|
 |YT2|[https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc-yt2.difi.eon.no/kontaktinfo-oauth2-server/rest/v1/personer)|
 |PROD|[https://oidc.difi.no/kontaktinfo-oauth2-server/rest/v1/personer](https://oidc.difi.no/kontaktinfo-oauth2-server/rest/v1/personer)|


## Utfasede IP-adresser

### Produksjon

| DNS-navn                      | IPv4-adresse                   | Port | Tjeneste | Beskrivelse                                                                       | Inn-/utgående trafikk |
|-------------------------------|--------------------------------|------|----------|-----------------------------------------------------------------------------------|-----------------------|
| krr.digdir.no                       |  146.192.252.54          | 443  | Oppslagstjenesten KRR     | Utfaset 18.09.2023   | utgående |


### Test

| DNS-navn                      | IPv4-adresse                   | Port | Tjeneste | Beskrivelse                                                                       | Inn-/utgående trafikk |
|-------------------------------|--------------------------------|------|----------|-----------------------------------------------------------------------------------|-----------------------|
| krr-ver2.digdir                     | 146.192.252.152   | 443 | Oppslagstjenesten KRR | Dersom i bruk. Utfaset 18. august 2023 | utgående |
| krr-ver1.digdir.no                  | 146.192.252.121  | 443 | Oppslagstjenesten KRR | Utfaset 31.05.2023 | utgående |


## Utfaset Swagger 
OpenAPI-dokumentasjon for endepunkter. 

|miljø|url|
|-|-|
|VER2|[https://oidc-ver2.difi.no//kontaktinfo-oauth2-server/swagger-ui/index.html](https://oidc-ver2.difi.no//kontaktinfo-oauth2-server/swagger-ui/index.html)|
