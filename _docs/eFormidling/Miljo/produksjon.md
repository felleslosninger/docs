---
title: Produksjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling og integrasjonspunktet har to miljøer tilgjengeliggjort for brukerne: *staging* og *production*. Begge miljø krever bruk av en reell virksomhet som er registrert i Brønnøysundregistrene og har et organisasjonsnummer. I tillegg kreves det at virksomheten har et virksomhetssertifikat. Her skilles det på test-sertifikat og prod-sertifikat for å kunne kjøre integrasjonspunktet i forskjellige miljø.



|    Beskrivelse    | IPv4-adresse | IPv6-adresse | Tjeneste |
| ------------- |:-------------:| :-----:| :------:|
| **meldingsutveksling.difi.no** | **51.144.60.163:443** | - | **Alle** |
| **stream-meldingsutveksling.difi.no** | 	**40.74.39.254:443**  | - | **Alle** |
| oidc.difi.no | 146.192.252.54:443	 | - | Alle |
| maskinporten.no | 146.192.252.50:443 | - | Alle |
| move-dpe.servicebus.windows.net	 | 13.69.253.135:443 | - | DPE | 
| move-dpe-prod.servicebus.windows.net	 | 52.169.10.235:443 | - | DPE | 
| www.altinn.no | 89.250.123.0:443 | - | DPO/DPV |
| meldingsformidler.digipost.no (IP-range) | 51.124.140.176/28:443| -  | DPI |
| svarut.ks.no | 137.221.25.66:443 og 137.221.28.66:443 | - | DPF |

> **NB!** Maskinporten.no adressa gjeld berre for dei som skal ta i bruk versjon 2.2.1 eller nyare!



For å kjøre integrasjonspunktet i produksjonsmiljø-miljøet er det påkrevd at virksomheten har et virksomhetssertifikat (Bestilles hos Buypass/Commfides). Den offentlige delen av nøkkelen må sendes til Digdir på e-post  <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. Digdir må også gi dere tilganger til miljøet for alle eFormidling-tjenestene dere skal bruke.

For å starte integrasjonspunktet med production profil angis følgende argument:
```-Dspring.profiles.active=production```
