---
title: Produksjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Ved å bruke eFormidlings produksjonsmiljø når, og nås, integrasjonspunktet av ekte virksomheter og innbyggere.

For å bruke eFormidlings produksjonsmiljø kreves et virksomhetssertifikat.

Integrasjonspunktet benytter produksjonsmiljøet som standard:

- [Konfigurasjon av miljø (produksjon eller QA)](../installasjon/installasjon#miljø-produksjon-eller-qa)

Følgende tjenester brukes av integrasjonspunktets produksjonsmiljø og må kunne nås:

| DNS-navn                            | IPv4-adresse                                        | Port | Tjeneste | Beskrivelse                                                                              | Inn-/utgående trafikk |
|-------------------------------------|-----------------------------------------------------|------|----------|------------------------------------------------------------------------------------------|-----------------------|
| meldingsutveksling.difi.no          | 51.144.60.163                                       | 443  | Alle     | eFormidling, diverse tjenester, adresseoppslag m.m.                                      | utgående              |
| eformidling.no, logs.eformidling.no (ny plattform)                      | 139.105.36.141                                      | 443  | Alle     | eFormidling, diverse tjenester, adresseoppslag m.m.                                      | utgående              |
| stream-meldingsutveksling.difi.no   | 40.74.39.254                                        | 443  | Alle     | eFormidling, logging                                                                     | utgående              |
| maskinporten.no                     | 139.105.36.164                                      | 443  | Alle     | Maskinporten                                                                             | utgående              |
| efm-dpe-prod.servicebus.windows.net | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 <br/> 20.82.244.139 | 443  | DPE      | Azure Service Bus, HTTP/REST API                                                         | utgående              |
| efm-dpe-prod.servicebus.windows.net | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 <br/> 20.82.244.139 | 5671 | DPE      | Azure Service Bus, AMQP med TLS                                                          | utgående              |
| altinn.no                           | 89.250.123.0                                        | 443  | DPO/DPV  | Altinn formidlingstjeneste                                                               | utgående              |
| crl.buypass.no       | 185.62.162.145 og 185.62.160.145                                 | 80  | DPI      | Buypass CRL-liste                                        | utgående              |
| crl.buypassca.com       | 185.62.162.185 og 185.62.160.185                               | 80  | DPI      | Buypass CRL-liste SEID2.0                              | utgående              |
| kontaktregisteret.no | 139.105.36.169 | 443  | DPI | Kontakt-og reservasjonsregisteret (fom. 18.09.2023) | utgående |
| srest.dataplatfor.ms                | 51.120.55.214 og 51.107.214.212                                        | 443  | DPI      | Digital postkasse, rest-endepunkt, aksesspunkt | utgående              |
| svarut.ks.no                        | 137.221.25.66 <br/> 137.221.28.66                   | 443  | DPF      | KS FIKS meldingformidler                                                                 | utgående              |
