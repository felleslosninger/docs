---
title: Veiledning for DPI gjennom eFormidling
description: Hvordan komme i gang med integrasjonspunktet
summary: "Hvordan en installerer integrasjonspunktet og setter opp DPI gjennom eFormidling."

permalink: dpi_eformidling_onboarding.html
product: eFormidling
sidebar: 
---

## Bakgrunn

TODO: Kvifor virksomheiter må gå over til å bruke integrasjonspunktet.

## Krav og forutsetninger

Dette må gjøres før du går i gang med installering.

- Installere Java 8 på serveren der integrasjonspunktet skal kjøre fra.
Den kan lastes ned [her](https://adoptopenjdk.net/?variant=openjdk8&jvmVariant=hotspot) og er gratis.

- Installere Key Store Explorer for håndtering av virksomhetssertifikat (gratis). [Last ned.](http://keystore-explorer.org/downloads.html)

- Påse at serveren har minimum 2GB tilgjengelig minne. Det kan gjøres ved å sjekke 'Systeminformasjon'.

- Sjekk at serveren er synkronisert med NTP (Network Time Protocol). Kan gjøres ved å trykke [her.](https://time.is/)

### Brannmuråpninger

Digdirs endepunkter er eksponert ut mot Internett, men det må åpnes for trafikk inn og ut mot disse IP-adressene fra server:

|    Beskrivelse    | IP-adresse |
| ------------- |:-------------:|
| meldingsutveksling.difi.no | 51.144.60.163:443 |
| stream-meldingsutveksling.difi.no | 40.74.39.254:443 |
| oidc.difi.no | 146.192.252.54:443 |
| maskinporten.no | 146.192.252.50:443 |
| meldingsformidler.digipost.no (IP-range) | 51.124.140.176/28:443 |

## Installering

## Oppsett og oppstart av integrasjonspunktet
