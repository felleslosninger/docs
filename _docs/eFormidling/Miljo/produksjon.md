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

| Beskrivelse                              | IPv4-adresse                           | IPv6-adresse | Tjeneste   |
|------------------------------------------|----------------------------------------|--------------|------------|
| meldingsutveksling.difi.no               | 51.144.60.163:443                      | -            | Alle       |
| stream-meldingsutveksling.difi.no        | 40.74.39.254:443                       | -            | Alle       |
| oidc.difi.no                             | 146.192.252.54:443                     | -            | Alle       |
| maskinporten.no                          | 146.192.252.50:443                     | -            | Alle       |
| move-dpe.servicebus.windows.net          | 13.69.253.135:443                      | -            | DPE        | 
| move-dpe-prod.servicebus.windows.net	    | 52.169.10.235:443                      | -            | DPE        | 
| www.altinn.no                            | 89.250.123.0:443                       | -            | DPO og DPV |
| meldingsformidler.digipost.no (IP-range) | 51.124.140.176/28:443                  | -            | DPI        |
| svarut.ks.no                             | 137.221.25.66:443 og 137.221.28.66:443 | -            | DPF        |
