---
title: QA
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Ved å bruke eFormidlings testmiljø når, og nås, integrasjonspunktet av test-virksomheter og test-innbyggere.

For å bruke eFormidlings testmiljø kreves et test-virksomhetssertifikat utstedt.

- TODO syntetisk vs ekte organisasjonsnumer

Integrasjonspunktet må konfigureres til å bruke testmiljøet:

- [Konfigurasjon av miljø (produksjon eller QA)](../installasjon/installasjon#miljø-produksjon-eller-qa)

Følgende tjenester brukes av integrasjonspunktets QA-miljø og må kunne nås:

| Beskrivelse                                          | IPv4-adresse                           | IPv6-adresse | Tjeneste |
|------------------------------------------------------|----------------------------------------|--------------|----------|
| qa-meldingsutveksling.difi.no                        | 51.144.60.111:44* og 51.105.206.80:443 | -            | Alle     |
| qa-stream-meldingsutveksling.difi.no                 | 40.74.39.255:443                       | -            | Alle     |
| oidc-ver1.difi.no                                    | 146.192.252.121:443                    | -            | Alle     |
| oidc-ver2.difi.no                                    | 146.192.252.121:443                    | -            | Alle     |
| ver1.maskinporten.no                                 | 146.192.252.118:443                    | -            | Alle     |
| move-dpe.servicebus.windows.net                      | 13.69.253.135:443                      | -            | DPE      | 
| www.altinn.no                                        | 89.250.123.0:443                       | -            | DPO      |
| tt02.altinn.no                                       | 89.250.123.40:443                      | -            | DPV      |
| qaoffentlig.meldingsformidler.digipost.no (IP-range) | 51.105.206.80/28:443                   | -            | DPI      |
