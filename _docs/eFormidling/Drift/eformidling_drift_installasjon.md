---
title: Installasjon
description: ""
summary: ""
permalink: eformidling_drift_installasjon.html
product: eFormidling
sidebar: eformidling_sidebar
---

Installasjonsveiledning for integrasjonspunktet og KOSMOS.

## Installasjon av Integrasjonspunktet

### Anbefalt rekkefølge for installasjon av eFormidling

Vi anbefaler å konfigurere integrasjonspunktet i følgende rekkefølge.

1. Minimumskonfigurasjon for å få starte integrasjonspunktet. 
2. Konfigurere sak-arkivsystem til å prate med integrasjonspunktet (under DPO innstillinger i tabellen under)
3. Konfigurere DPO innstillinger (brukernavn og passord) eller DPI.
4. Konfigurere DPV/DPF innstillinger

> [Properties for konfigurasjon finner du her](eformidling_konfigurasjon_minimal.html)

Vi anbefaler dere å konfigurere DPO før DPV/DPF for å unngå å motta post fra svarUt til virksomhetens SvarInn innboks. Ved å konfigurere DPO først vil dere motta post i sak-arkivsystemet. Om ønsket kan en også sette opp DPI først.

Husk å melde fra til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> når dere har konfigurert slik at Digitaliseringsdirektoratet kan [gi tilganger](eformidling_drift_bestille_tilganger.html). Ellers vil du få 400 Bad request feil. 

### Integrasjonspunkt-local.properties

Her laster du ned [integrasjonspunkt-local.properties-filen](/resources/eformidling/integrasjonspunkt-local.txt). Integrasjonspunktet benytter Java Key Store (JKS) som standard for nøkkelhåndtering, men støtter det fleste "kjente" typer, inkl PKSC12. WCS er ikke lenger støttet for andre tjenester enn eInnsyn. Det er også mulig å bruke Azure Vault er støttet via Akv2K8s. [Se eksempeloppsett her](eformidling_drift_installasjon_aks.html#5-azure-key-vault-og-azure-key-vault-env-injector). 

1. Start med å opprette en mappe med navn integrasjonspunkt på for eksempel c:\
2. Last så ned integrasjonspunkt-local.properties filen. den kan lastes ned [her ](/resources/eformidling/integrasjonspunkt-local.txt) og lagre i overnevnte mappe
3. last ned integrasjonspunkt[versjonsnummer].jar filen. Den finner du [her](eformidling_download_ip.html)

Når du er ferdig skal strukturen på området se slik ut:
```
c:/
|-- integrasjonspunkt/
   |-- integrasjonspunkt-local.properties
   |-- integrasjonspunkt[versjon].jar
```

#### Oppretting via shell

En kan eventuelt opprette mappe og .properties-filen manuelt vha shell kommandoer om det er preferrert:

##### Unix

``` bash
mkdir integrasjonspunkt
cd integrasjonspunkt
touch integrasjonspunkt-local.properties
```

##### Powershell

``` powershell
mkdir integrasjonspunkt
cd integrasjonspunkt
New-Item -ItemType file integrasjonspunkt-local.properties
```


## Installasjon av KOSMOS

> Hva er KOSMOS? Kontinuerlige oppdateringar for sikker meldingsutveksling i offentleg sektor. [Les mer her](eformidling_introduksjon.html#kosmos) 

Før du installerer KOSMOS forutsettes det at du har en gyldig integrasjonspunkt-local.properties fil fra før. Dvs at du har konfigurert et fungerende integrasjonspunkt på maskinen hvor KOSMOS skal installeres for å oppdatere dette integrasjonspunktet. Minimum er at du må ha .properties fil og keystore knyttet til denne, for integrasjonspunkt-[versjon].jar filen vil KOSMOS laste ned.

sett inn properties fil info samme som IP
Eiga fil for start og stopp av begge 
konfig i eiga fil 




### Last ned siste versjon

[Siste versjon av KOSMOS finn du her](eformidling_introduksjon_last_ned.html#last-ned-kosmos)


### Kosmos-local.properties
Før KOSMOS kan automatisk laste ned ny versjon og oppdatere ditt køyrande integrasjonspunkt må den setjast opp ved å konfigurere properties og velge ein katalog det skal køyre frå. 

Det er anbefalt (minst konfigurasjon) å køyre både integrasjonspunkt.jar og kosmos.jar frå samme katalog, om ønska køyre frå forskjellige katalog [sjå her](https://github.com/felleslosninger/efm-kosmos#running-kosmos-and-integrasjonspunkt-from-different-folders).


1. Legg inn jar-fila og ```kosmos-local.properties``` i ønska katalog.
2. Sett opp naudsynte konfigurasjonar i ```kosmos-local.properties```. Sjå under.
3. [Laste ned Digdir sin offentlege nøkkel](/resources/eformidling/public_keys/eformidling-key.asc) og lagre valgt katalog.

#### Oppretting via shell

Ein kan eventuelt opprette mappe og .properties-filen manuelt vha shell kommandoer om det er preferrert:

##### Unix

*Forutsatt namn på mappen er integrasjonspunkt fordi det eksisterer ein integrasjonspunkt installasjon frå før*

``` bash
cd integrasjonspunkt
touch kosmos-local.properties
```

##### Powershell

*Forutsatt namn på mappen er integrasjonspunkt fordi det eksisterer ein integrasjonspunkt installasjon frå før*

``` powershell
cd integrasjonspunkt
New-Item -ItemType file kosmos-local.properties
```

#### Konfigurere properties fil
Åpne ```kosmos-local.properties``` i katalogen du skal køyre ```.jar``` fila frå sett inn følgande properties. (anbefalt å være samme katalog som integrasjonspunktet)

```java
# Replace hosts and ports of URL with the location
# of your integrasjonspunkt.
kosmos.integrasjonspunkt.baseURL=http://localhost:9093

# Your organisationnumber. Should be the same as in integrasjonspunkt-local.properties
difi.move.org.number=

# E-mail is optional. Please specify these properties 
# to receive e-mails when KOSMOS updates the integrasjonspunkt-application.
kosmos.mail.recipient=someone@yourdomain.no
kosmos.mail.from=noreply@yourdomain.no

spring.mail.host=smtp.yourdomain.no
spring.mail.port=<set-your-port-here>

# Digitaliseringsdirektoratet public key paths. i.e: file:keyname.asc
kosmos.verification.publicKeyPaths[0]=file:eformidling-key.asc
```
*[Last ned properties-fila her](/resources/eformidling/kosmos-local.properties)*

> [Sjå her for ei utfyllande liste av tilgjengelege properties for KOSMOS](eformidling_konfigurasjon_automatisk_oppdatering.html)

#### Setje tidspunkt for oppdatering
*Valgfritt*

Ein kan setje tidspunkt for kortid applikasjonen vil forsøke å oppdatere integrasjonspunktet om ein ikkje ynskjer å benytte standard-verdiane. 

Her er nokre døme som viser korleis ein kan styre tidspunkt for oppdatering.

```java
#Standard verdi: Sjekkar etter oppdatering mandag-fredag kl 05:30, 19:30 og 21:30.
kosmos.schedulerCronExpression=0 30 5,19,21 * * MON-FRI

#Sjekkar etter oppdatering kvar dag kl 06:00.
kosmos.schedulerCronExpression=0 0 6 * * ?

#Sjekkar etter oppdatering kvar dag kl 23:15.
kosmos.schedulerCronExpression=0 15 23 ? * *

#Sjekkar etter oppdatering kvar laurdag og søndag kl 12:00.
kosmos.schedulerCronExpression=0 0 12 ? * SAT,SUN

#Sjekkar etter oppdatering kvart tredje minutt kvar time.
kosmos.schedulerCronExpression=0 0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57 * ? * *
```

### Blokkere versjonar
*Valgfritt*

Det finnes funksjonalitet for å la applikasjonen blokkliste versjonar om den ikkje er godkjend eller klarer starte. Standard verdien til denne er false, men kan aktivere ved å endre properties. Det kan være fornuftig å bruke om ein ynskjer hyppig polling på kor ofte applikasjonen skal sjekke etter ny versjon.

```
kosmos.blocklist.enabled=true
```

Ein kan fjerne ein blokklista versjon ved å slette den frå katalogen. Filnamn er til dømes ```integrasjonspunkt-versjonsnr.blocklisted```. Denne har standard levetid på 2 timar om aktivert, så etter levetid er utløpt vil applikasjonen fjerne den og forsøke å oppdatere igjen ved neste [schedulerte tidspunkt.](###Setje-tidspunkt-for-oppdatering)

### Verifisere sertifikatet
*Valgfritt*

Når Digitaliseringsdirektoratet publiserer eit nytt integrasjonspunkt vil dette være signert med vår privat nøkkel. For å verifisere denne signaturen kan du laste ned vår offentlege nøkkel og sjekke om fingeravtrykket på signaturen er likt som nøkkelen. Det er viktig å verifisere signatur på *kosmos.jar*, og dersom ein velger å laste ned integrasjonspunktet manuelt er det viktig å verifisere denne .jar fila også. Om du allereie har ein køyrande versjon av integrasjonspunktet som er tidlegare enn 2.2.1 så vil ikkje den være signert. 

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGB+plUBEAC1kbZMrCUXorAHiUxOfatbwkY0oANS9cLF3dRyWhfIFbkv+rxs
R/5EMo3wNEfpNQ76bNxRvprQWOGmqg30DVfAomGhO2j2o7gmZPcPvcDEokz+rEqt
enVkqdizc5ABWQHvtX42Cl+9G1iYXV9u5m4ET9HGb2nCqvi4gb0l7751Hv9Y2RAC
YHAYJhYpnA3WokZEUxIf1SmvjhYj5tWxOYFr5Tj2N5VIXY19bz4pdppGWsT9gB6+
5jIKNWWEwNE6LyjA9YkT+C6cITcL7x2Ad1tvUfMJEBE7Ib45TGc1BS4QbWnC7Fw0
G09Kbp4ZJ9vOhysWquT1pVsKeIP1Hrc63XiS3hXf5hlJzqdTaswSNk0jSeGcETRR
pu6CueiewF2LNUm49iO3r3rPcAKPeokYLFc4/tbCADXSom8pq2fpgqBUvvfRPFy3
QB7Imn4/Robqw0K2mlguACv1tz2z0+Ygn39nmXIyUzJUJ0p694l/O5wmeukSc5r8
Dc83GUJOCIxMapuVgib9qYVh8QMVbmy0XUjyZDw7Gsw112fPfsCG4FXcqUAVcNeT
ERgfzdowPY2LU+TCpONYRy6CgBdKqJQU9FYeMvZAEiMzMmC7mzinCXPOpujNfthD
YllEAY+aZt4b2pfvwLk1TZefNOQTbzShjfwNLiy7UwmYS0QueN46YdHi6wARAQAB
tHpLb2Rlc2lnbmVyaW5nIGVGb3JtaWRsaW5nIChEaWdpdGFsaXNlcmluZ3NkaXJl
a3RvcmF0ZXRzIG7DuGtrZWwgZm9yIGtvZGVzaWduZXJpbmcgZm9yIGVGb3JtaWRs
aW5nKSA8c2VydmljZWRlc2tAZGlnZGlyLm5vPokCVAQTAQgAPhYhBK7yeqaUijhW
kyr5jspWQzk3U+zjBQJgfqZVAhsDBQkJZgGABQsJCAcCBhUKCQgLAgQWAgMBAh4B
AheAAAoJEMpWQzk3U+zjoSkP/RXi6pXz/ZK5eP2aXcmGRuVKo3c6f15Zq2TW2yWH
Wqozpn1DXT/c5u40WjI7UYabHIJfQqzs4XD9qYFXrgb73zdu8cRkCz2FoBCrzfQB
3jtC16vyPfuCBzFWg1CQ9QB/y4XThSIXHiVyB/nLLecp+V3JXX7rgImAP9loFXg2
W/ifxtyuV9LX7c5wraZEI/tTYhGev6pS5OXuY5z2TEcJ6fodoEZujZXLnmDNZgFr
IKOU3IJOEBpP4zD11C/IKEbYv0J7zuET+mnArxma/9dym8OcBnNvYr8caOK6qa2v
y/Q5UnBLZNuydaDTl70qTWcuZRqobUqtaSvrtIopwTFhZXzQ3Y06Xpv7e21tq/ew
SNCA3DI7EA/hLlwwF9NEZTyGSez6TBGwjGgV8J/CyOLnuD5X9cqSIYFtjUtQQ3oM
KXv2Q+vELUHUBuNRhrZiUKITEB7ubJQuAjgGDTTJrXJDZRRiJ8eGP0dYj/GfNu8i
vi+E+ZL/cn6J48IIOLS7IZS/NqZjq0t48fBKcyisEzQdvji68GKOipv1vdxj9z1c
t4IBv4qlDXFQoCjh/aEM7n6xRFGYb9600xiSA1P45h2yBDiGUedwde2ai9OtVwar
j9yTMuCrbrLOdlG2cNrhnSJS48WrEbk1blsyJrH7zFvsxRj723HdXdtpB+c5OsYo
o1Dt
=QEfX
-----END PGP PUBLIC KEY BLOCK-----
```

[Last ned offentleg nøkkel](/resources/eformidling/public_keys/eformidling-key.asc)

Den offentlege nøkkelen vår har fingeravtrykket: 
```
AEF2 7AA6 948A 3856 932A  F98E CA56 4339 3753 ECE3
```
Vi anbefalar at ein sjølv gjer ein manuell sjekk etter byte av nøkkel for å verifisere at fingeravtrykket er korrekt. Om du har GnuPG installert kan du køyre denne one-lineren: 
```
gpg --import-options show-only --import --fingerprint <path-to-downloaded-public-key-file>
```
Om du ikkje har GnuPG frå før eller ynskjer meir utdjupande forklaring om korleis sjekke fingeravtrykket: [Sjå her](https://github.com/felleslosninger/efm-kosmos/tree/feature_MOVE-2144_code_signing#verify-your-download-recommended)
