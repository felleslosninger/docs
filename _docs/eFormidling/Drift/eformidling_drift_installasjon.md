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

## Neste steg

Det neste som må gjøres for å installere integrasjonspunktet kan være å sikre at all konfigurasjon er på plass og om så, starte opp integrasjonspunktet 

+ [Integrasjonspunktet konfigurasjon / minimal konfigurasjon ](eformidling_konfigurasjon_minimal.html)
+ [Integrasjonspunktet konfigurasjon / tilgjengelig tjenester ](eformidling_konfigurasjon_tilgjengelige_tjenester.html)
+ [Integrasjonspunktet kjøring / Start og stopp ](eformidling_drift_start_og_stopp.html#integrasjonspunktet)

---

## Installasjon av KOSMOS

> Hva er KOSMOS? Kontinuerlige oppdateringar for sikker meldingsutveksling i offentleg sektor. [Les mer her](eformidling_introduksjon.html#kosmos) 

Før du installerer KOSMOS forutsettes det at du har en gyldig integrasjonspunkt-local.properties fil fra før. Dvs at du har konfigurert et fungerende integrasjonspunkt på maskinen hvor KOSMOS skal installeres for å oppdatere dette integrasjonspunktet. Minimum er at du må ha .properties fil og keystore knyttet til denne, for integrasjonspunkt-[versjon].jar filen vil KOSMOS laste ned.


### Last ned siste versjon

[Siste versjon av KOSMOS finn du her](eformidling_introduksjon_last_ned.html#last-ned-kosmos)

### Last ned offentleg nøkkel

En må laste ned Digitaliseringsdirektoratet sin offentlege nøkkel og legge i samme mappe som kosmos-[versjon].jar filen og kosmos-local.properties filen. 

[Nedlasting av offentleg nøkkel finn du her](eformidling_introduksjon_last_ned.html#last-ned-kosmos)

Om du ønsker å manuelt verifisere .jar fil ved å bruke sertifikatet kan du benytte [denne rettleiinga](eformidling_drift_sertifikatadministrasjon.html#verifisere-sertifikatet)


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

Ein kan fjerne ein blokklista versjon ved å slette den frå katalogen. Filnamn er til dømes ```integrasjonspunkt-versjonsnr.blocklisted```. Denne har standard levetid på 2 timar om aktivert, så etter levetid er utløpt vil applikasjonen fjerne den og forsøke å oppdatere igjen ved neste [schedulerte tidspunkt.](####Setje-tidspunkt-for-oppdatering)

## Neste steg

+ [KOSMOS konfigurasjon / minimal konfigurasjon ](eformidling_konfigurasjon_tilgjengelige_tjenester.html#minimal-konfigurasjon)
+ [KOSMOS konfigurasjon / tilgjengelig konfigurasjon ](eformidling_konfigurasjon_tilgjengelige_tjenester.html#tilgjengelig-konfigurasjon)
+ [KOSMOS kjøring / Start og stopp ](eformidling_drift_start_og_stopp.html#kosmos)
