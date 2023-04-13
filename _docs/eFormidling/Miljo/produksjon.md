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
| stream-meldingsutveksling.difi.no   | 40.74.39.254                                        | 443  | Alle     | eFormidling, logging                                                                     | utgående              |
| oidc.difi.no                        | 146.192.252.54	                                     | 443  | Alle     | ID-porten oidc-provider                                                                  | utgående              |
| maskinporten.no                     | 146.192.252.50                                      | 443  | Alle     | Maskinporten                                                                             | utgående              |
| maskinporten.no (f.o.m. 07.02.2023) | 139.105.36.164                                      | 443  | Alle     | Maskinporten                                                                             | utgående              |
| efm-dpe-prod.servicebus.windows.net | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 | 443  | DPE      | Azure Service Bus, HTTP/REST API                                                         | utgående              |
| efm-dpe-prod.servicebus.windows.net | 13.74.107.66 <br/> 13.69.227.68 <br/> 52.138.226.67 | 5671 | DPE      | Azure Service Bus, AMQP med TLS                                                          | utgående              |
| altinn.no                           | 89.250.123.0                                        | 443  | DPO/DPV  | Altinn formidlingstjeneste                                                               | utgående              |
| meldingsformidler.digipost.no       | 51.124.140.176/28                                   | 443  | DPI      | Meldingsformidler for DPI-meldinger (16 adresser)                                        | utgående              |
| crl.buypass.no       | 185.62.160.145                                   | 80  | DPI      | Buypass CRL-liste                                        | utgående              |
| krr.digdir.no      | 146.192.252.54                                 | 443  | DPI      | Kontakt-og reservasjonsregisteret                                       | utgående              |
| srest.dataplatfor.ms                | 51.120.55.214 og 51.107.214.212                                        | 443  | DPI      | For ny transportinfrastruktur i Digital postkasse, rest-endepunkt aksesspunkt i hjørne 2 | utgående              |
| svarut.ks.no                        | 137.221.25.66 <br/> 137.221.28.66                   | 443  | DPF      | KS FIKS meldingformidler                                                                 | utgående              |
