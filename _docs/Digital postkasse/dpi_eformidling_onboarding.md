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

Denne guiden er en steg-for-steg guide for hvordan en installerer integrasjonspunktet som en Windows tjeneste. 

Dette må gjøres før du går i gang med installering.

- Installere Java 8 på serveren der integrasjonspunktet skal kjøre fra.
Den kan lastes ned [her](https://adoptopenjdk.net/?variant=openjdk8&jvmVariant=hotspot) og er gratis.

![Sånn installerer du OpenJDK](/images/eformidling/OpenJDK.png)

- Installere Key Store Explorer for håndtering av virksomhetssertifikat (gratis). [Last ned.](http://keystore-explorer.org/downloads.html)

- Påse at serveren har minimum 2GB tilgjengelig minne. Det kan gjøres ved å sjekke 'Systeminformasjon'.

- Sjekk at serveren er synkronisert med NTP (Network Time Protocol). Kan gjøres ved å trykke [her.](https://time.is/)

- Bestille virksomhetssertifikat til din virksomhet fra enten [Commfides](https://www.commfides.com/commfides-virksomhetssertifikat/bestilling-commfides-virksomhetssertifikat/) eller [Buypass](https://www.buypass.no/produkter/virksomhetssertifikat-esegl/virksomhetssertifikat-for-norge).


### Brannmuråpninger

Digdirs endepunkter er eksponert ut mot Internett, men det må åpnes for trafikk inn og ut mot disse IP-adressene fra server:

|    Beskrivelse    | IP-adresse |
| ------------- |:-------------:|
| meldingsutveksling.difi.no | 51.144.60.163:443 |
| stream-meldingsutveksling.difi.no | 40.74.39.254:443 |
| oidc.difi.no | 146.192.252.54:443 |
| maskinporten.no | 146.192.252.50:443 |
| meldingsformidler.digipost.no (IP-range) | 51.124.140.176/28:443 |

## Håndtering av virksomhetssertifikat

Når du mottar virksomhetssertifikatet(p12-format) fra Buypass eller Commfides får du det i 2 eller 3 deler, samt tilhørende passord. Det som skal brukes er autentiseringsdelen.

Sertifikatet må legges inn i en JKS (Java Key Store) og det gjøres slik:

1. Åpne Key Store Explorer.
2. Trykk 'File' og 'Open'. Naviger til der sertifikatet ligger og åpne.
3. Trykk 'Tools' og så 'Change KeyStore type'. Velg JKS.
4. Trykk 'File' og 'Save As'. Lagre filen som navn.jks. 
Eksempel: *MinKeystore.jks*
5. Sjekk at filen er lagret som .JKS, ikke .KS!

Vi anbefaler at dere beholder passordet som kom med sertifikatet.

### Eksportering av public key

Som en del av autentiseringen må Digdir ha public key av sertifikatet. 
Det kan eksporteres slik i Key Store Explorer:

1. Åpne JKSen du nettopp laget i Key Store Explorer.
2. Høyreklikk på sertifikatet som ligger i keystoren, finn 'Export' og trykk så på 'Export Certificate Chain'.
3. La alt stå som det er og lagre som en .cer fil. 
Eksempel: *MittPublicSertifikat.cer*

![Slik eksporterer du public key](/images/eformidling/JKS.png)

Send så filen til servicedesk@digdir.no.

## Nedlasting av integrasjonspunktet og andre ressurser

For å installere og kjøre integrasjonspunktet må en laste ned disse ressursene:

- [Integrasjonspunktet (.jar)](https://docs.digdir.no/eformidling_download_ip.html#integrasjonspunktet-221-jar)
- [Winsw (.exe)](https://github.com/winsw/winsw/releases/download/v2.11.0/WinSW.NET4.exe)
- [Konfigurasjonsfil (.xml](https://github.com/difi/felleslosninger/blob/gh-pages/resources/eformidling/integrasjonspunkt_dpi.xml)
- [Propertiesfil (.properties)](https://github.com/difi/felleslosninger/blob/gh-pages/resources/eformidling/integrasjonspunkt_dpi.properties)

## Oppsett og intallasjon av integrasjonspunktet

Begynn med å lage en ny mappe der du legger alle ressursene du lastet ned. Anbefaler at dere også legger JKSen der, men det er valgfritt.
Følg så stegene under:

1. Navngi xml-og exe-filen slik at de har samme navn. Det er viktig at disse er like.
2. Gå gjennom propertiesfilen og fyll inn verdiene som mangler. Lagre filen. Disse verdiene må være fylt ut:
3. Integrasjonspunktmappen bør se slik ut nå:
![Mappen pre-install](/images/eformidling/mappe%20pre-install.png)
4. Åpne kommandovindu som administrator. Naviger frem til integrasjonspunktmappen.
5. Kjør denne kommandoen for installasjon:
```
mitt-integrasjonspunkt.exe install
```
6. For å starte integrasjonspunktet bruk denne kommandoen:
```
mitt-integrasjonspunkt.exe start
```
Du kan se om tjenesten kjører i Windows Services. Den kan du også bruke til å stoppe/starte integrasjonspunktet.

Etter installering og oppstart bør integrasjonspunktmappen se slik ut:
![Mappen post-install](/images/eformidling/mappe%20post-install.png)

## FAQ (Blir oppdatert fortløpende)

### Hvordan avinstallere/reinstallere tjenesten?

For avinstallere må du først stoppe tjenesten, så bruke denne kommandoen:
```
mitt-integrasjonspunkt.exe uninstall
```
### Hvor kan en lese logger?

Loggene til integrasjonspunktet finner du i integrasjonspunktmappen under *integrasjonspunkt-logs -> application.log*.
De nyeste loggene legger seg nederst i tekstfilen.

### Hvordan kan jeg se status på mine forsendelser?

Etterhvert vil det mulig å se dette i sak/arkivsystemet, men enn så lenge kan du bruke *ttp://localhost:serverport/conversations*.
Mer info finner du [her](https://docs.digdir.no/eformidling_api.html#sjekke-forsendelser---grafisk-brukergrensesnitt)



### Har du andre spørsmål eller innspill? Ta kontakt med servicedesk@digdir.no!
