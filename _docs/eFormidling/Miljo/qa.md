---
title: QA
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Ved å bruke eFormidlings testmiljø (QA) når, og nås, integrasjonspunktet av test-virksomheter og test-innbyggere.

Se mer om testing av eFormidling på:

- [Testing](../Testing/)

For å bruke eFormidlings testmiljø kreves et test-virksomhetssertifikat utstedt.

Integrasjonspunktet må konfigureres til å bruke testmiljøet:

- [Konfigurasjon av miljø (produksjon eller QA)](../installasjon/installasjon#miljø-produksjon-eller-qa)

Følgende tjenester brukes av integrasjonspunktets QA-miljø og må kunne nås:

| DNS-navn                                  | IPv4-adresse                                        | Port  | Tjeneste | Beskrivelse                                                                              | Inn-/utgående trafikk |
|-------------------------------------------|-----------------------------------------------------|-------|----------|------------------------------------------------------------------------------------------|-----------------------|
| qa-meldingsutveksling.difi.no             | 51.144.60.111 <br/> 51.105.206.80                   | 443   | Alle     | eFormidling, diverse tjenester, adresseoppslag m.m.                                      | utgående              |
| qa-stream-meldingsutveksling.difi.no      | 40.74.39.255                                        | 443   | Alle     | eFormidling, logging                                                                     | utgående              |
| oidc-ver1.difi.no                         | 146.192.252.121                                     | 443   | Alle     | ID-porten oidc-provider, verifikasjon 1-miljøet                                          | utgående              |
| oidc-ver2.difi.no                         | 146.192.252.152                                     | 443   | Alle     | ID-porten oidc-provider, verifikasjon 2-miljøet                                          | utgående              |
| test.maskinporten.no                      | 139.105.36.128/27 <br/> 139.105.36.132              | 443   | Alle     | Maskinporten                                                                             | utgående              |
| efm-dpe-qa.servicebus.windows.net         | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 | 443   | DPE      | Azure Service Bus, HTTP/REST API                                                         | utgående              |
| efm-dpe-qa.servicebus.windows.net         | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 | 5671  | DPE      | Azure Service Bus, AMQP med TLS                                                          | utgående              |
| altinn.no                                 | 89.250.123.0                                        | 443   | DPO      | Altinn formidlingstjeneste                                                               | utgående              |
| tt02.altinn.no                            | 89.250.123.40                                       | 443   | DPV      | Altinn formidlingstjeneste                                                               | utgående              |
| qaoffentlig.meldingsformidler.digipost.no | 51.105.206.80/28                                    | 443   | DPI      | Meldingsformidler for DPI-meldinger                                                      | utgående              |
| crl.test4.buypass.no | 185.62.163.56                                    | 80   | DPI      | Buypass CRL-liste                                                      | utgående              |
| crl.test4.buypassca.com | 185.62.163.191                                    | 80   | DPI      | Buypass CRL-liste SEID 2.0                                                     | utgående              |
| krr-ver1.digdir.no | 146.192.252.121                                    | 443   | DPI      | Kontakt-og reservasjonsregisteret                                                     | utgående              |
| srest.qa.dataplatfor.ms                   | 51.120.52.137 og 51.120.49.231                                       | 443   | DPI      | For ny transportinfrastruktur i Digital postkasse, rest-endepunkt aksesspunkt i hjørne 2 | utgående              |
| test.svarut.ks.no                         | 137.221.25.65 <br/> 137.221.28.65                   | 443   | DPF      | KS SvarUt og SvarInn                                                                     | utgående              |
