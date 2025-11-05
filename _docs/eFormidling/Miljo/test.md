---
title: Test
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Ved å bruke eFormidlings testmiljø når, og nås, integrasjonspunktet av test-virksomheter og test-innbyggere.

Se mer om testing av eFormidling på:

- [Testing](../Testing/)

For å bruke eFormidlings testmiljø kreves et test-virksomhetssertifikat utstedt.

Integrasjonspunktet må konfigureres til å bruke testmiljøet:

- [Konfigurasjon av miljø (produksjon eller test)](../installasjon/installasjon#miljø-produksjon-eller-test)

Følgende tjenester brukes av integrasjonspunktets test-miljø og må kunne nås:

| DNS-navn                                  | IPv4-adresse                                        | Port  | Tjeneste | Beskrivelse                                                                              | Inn-/utgående trafikk |
|-------------------------------------------|-----------------------------------------------------|-------|----------|------------------------------------------------------------------------------------------|-----------------------|
| qa-meldingsutveksling.difi.no (fases ut)            | 139.105.36.141                   | 443   | Alle     | eFormidling, diverse tjenester, adresseoppslag m.m.                                      | utgående              |
| test.eformidling.no                       | 139.105.36.141                                      | 443  | Alle     | eFormidling, diverse tjenester, adresseoppslag m.m.                                      | utgående              |
| test-logs.eformidling.no                       | 139.105.36.147                                     | 80/443  | Alle     | eFormidling, logging.                                      | utgående              |
| qa-stream-meldingsutveksling.difi.no (fases ut)      | 139.105.36.145                                        | 443   | Alle     | eFormidling, logging                                                                     | utgående              |
| test.maskinporten.no                      | 139.105.36.128/27 <br/> 139.105.36.132              | 443   | Alle     | Maskinporten                                                                             | utgående              |
| efm-dpe-qa.servicebus.windows.net         | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 <br/> 20.82.244.139 | 443   | DPE      | Azure Service Bus, HTTP/REST API                                                         | utgående              |
| efm-dpe-qa.servicebus.windows.net         | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 <br/> 20.82.244.139 | 5671  | DPE      | Azure Service Bus, AMQP med TLS                                                          | utgående              |
| altinn.no                                 | 89.250.123.0                                        | 443   | DPO (utgår i IPv4)      | Altinn formidlingstjeneste                                                               | utgående              |
| tt02.altinn.no                                 | 89.250.123.40                                        | 443   | DPO (IPv4)      | Altinn formidlingstjeneste                                                               | utgående              |
| tt02.altinn.no                            | 89.250.123.40                                       | 443   | DPV      | Altinn formidlingstjeneste                                                               | utgående              |
| crl.test4.buypass.no | 185.62.163.56                                    | 80   | DPI      | Buypass CRL-liste                                                      | utgående              |
| crl.test4.buypassca.com | 185.62.163.191                                    | 80   | DPI      | Buypass CRL-liste SEID 2.0                                                     | utgående              |
| test.kontaktregisteret.no | 139.105.36.137 | 443  | DPI | Kontakt-og reservasjonsregisteret | utgående |
| srest.qa.dataplatfor.ms                   | 51.120.52.137 og 51.120.49.231                                       | 443   | DPI      | Digital postkasse, rest-endepunkt, aksesspunkt | utgående              |
| Legal: https://crl.test.commfides.com/G3/CommfidesLegalPersonCA-G3-TEST.crl                         | 91.232.83.136                  | 80   | Commfides-CRL      | Commfides-CRL                                                                      | utgående              |
