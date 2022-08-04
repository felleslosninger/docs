---
title: QA
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling og integrasjonspunktet har to miljøer tilgjengeliggjort for brukerne: *staging* og *production*. Begge miljø krever bruk av en reell virksomhet som er registrert i Brønnøysundregistrene og har et organisasjonsnummer. I tillegg kreves det at virksomheten har et virksomhetssertifikat. Her skilles det på test-sertifikat og prod-sertifikat for å kunne kjøre integrasjonspunktet i forskjellige miljø.



Når du installerer den typen eFormidling du skal ta i bruk så må du åpne opp noen brannmuråpninger.
<!--
En kan også åpne DNS mot domenet ```lb.difi.no``` som dekker alle 3 lastbalansererene. DNS for logging er ```stream.difi.no``` som er utgående TCP. 
-->


|    Beskrivelse    | IPv4-adresse | IPv6-adresse | Tjeneste |
| ------------- |:-------------:| :-----:| :------:|
| **qa-meldingsutveksling.difi.no** | **51.144.60.111:443** <br/> **51.105.206.80:443 f.o.m 18.08.2020**	 | - | **Alle** |
| **qa-stream-meldingsutveksling.difi.no** | 	**40.74.39.255:443**  | - | **Alle** |
| oidc-ver1.difi.no | 146.192.252.121:443		 | - | Alle |
| oidc-ver2.difi.no | 146.192.252.121:443	 | - | Alle |
| ver1.maskinporten.no | 146.192.252.118:443	 | - | Alle |
| move-dpe.servicebus.windows.net	 | 13.69.253.135:443 | - | DPE | 
| www.altinn.no | 89.250.123.0:443 | - | DPO |
| tt02.altinn.no | 89.250.123.40:443 | - | DPV |
| qaoffentlig.meldingsformidler.digipost.no (IP-range) | 51.105.206.80/28:443  | -  | DPI |


For å kjøre integrasjonspunktet i staging-miljøet er det påkrevd at virksomheten har et test-virksomhetssertifikat (Bestilles hos Buypass/Commfides). Den offentlige delen av nøkkelen må sendes til Digdir på e-post  <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. Digdir må også gi dere tilganger til miljøet for alle eFormidling-tjenestene dere skal bruke.

For å starte integrasjonspunktet med staging profil angis følgende argument:
```-Dspring.profiles.active=staging```
