---
title: Tilgjengelige tjenester
description: ""
summary: ""
permalink: eformidling_konfigurasjon_tilgjengelige_tjenester.html
product: eFormidling
sidebar: eformidling_sidebar
---


eFormidling støtter flere forskjellige tjenester som deler konfigurasjon og hver enkelt har sitt eget sett med tilgjengelig konfigurasjon.

## Innhold

1. [eInnsyn](#eInnsyn)
2. [Digital post til virksomheter](#eformidling---digital-post-til-virksomheter)
3. [DPV](#DPV)
4. [DPO](#DPO)
5. [DPF](#DPF)
6. [DPFIO](#DPFIO)
7. [DPI](#eformidling---digital-post-til-innbyggere)
8. [Ekstern database](#ekstern-database)
9. [Diverse properties](#diverse-properties)
10. [Kjøreregler](#kjøreregler)
11. [Hashicorp Vault](#hashicorp-vault)



### eInnsyn 

eInnsyn er aktivert som standard i alle integrasjonspunkt ved at ```difi.move.feature.enableDPE=true``` er aktivert uten at du selv trenger sette det. Minimum konfigurasjon for eInnsyn er som følgende: 

{% include eformidling/properties/jks_generell.html %} 


Om en ønsker å skru av eInnsyn funksjonalitet i tilfeller der en ikke skal bruke eInnsyn så kan en sette følgende property: ```difi.move.feature.enableDPE=false```

### eFormidling - Digital Post til virksomheter

Når en virksomhet sender digital post til virksomheter kan virksomheten sende både til og motta fra andre virksomheter som har et integrasjonspunkt. Eller sende til virksomheter som ikke har integrasjonspunkt. 


> Om du **ikke** bruker eInnsyn må du i tillegg legge inn ```difi.move.feature.enableDPE=false``` for å skru av eInnsyn. Ellers får du feilmeldinger.

> **NB!** Sørg for å fjerne  alle whitespace bak hver linje.

---

Når du skal ta i bruk DPV/DPO/DPF/DPFIO må du legge inn en rekke properties og fylle ut desse. Se etter DPV/DPO/DPF/DPFIO i tabellen under og legg inn konfigurasjon som kreves for denne tjenesten. Se under tabellen for unntak.

### Generell

Generelle properties som er minimum konfigurasjon for alle integrasjonspunkt. 

  {% include eformidling/properties/jks_generell.html %} 

### DPV
  
  {% include eformidling/properties/dpv.html %}

### DPO

  {% include eformidling/properties/dpo.html %}

### DPF

  {% include eformidling/properties/dpf.html %}

### DPFIO

  {% include eformidling/properties/dpfio.html %}
  
 ---


### eFormidling - Digital post til innbyggere

  {% include eformidling/properties/jks_generell.html %} 
  {% include eformidling/properties/dpi.html %}
  

### Ekstern database

Det er mulig å kjøre integrasjonspunktet med en ekstern database (dvs annen enn standard H2 ). Støttede databaser inkludrerer MySQL, MSSQL og PostgreSQL. Det er mulig å støtte flere relasjonsdatabaser også, men da må en manuelt legge til connector på classpath. 

{% include eformidling/properties/database.html %}

### Diverse properties
Integrasjonspunktet har støtte for mange flere properties enn de som er nevnt over som er knyttet til ulike tjenester. Denne listen er ikke (per 01.10.21) helt utfyllende for alle properties, men vil bli utvidet: 

  {% include eformidling/properties/ip_properties.html %}


--- 

### Kjøreregler
Alle innstillinger for gitt type forsendelse(DPO/DPF/DPV) må legges inn, men det finnes noen unntak.

#### DPF
Du trenger alle innstillinger utenom ```difi.move.fiks.inn.fallbackSenderOrgNr=```. Denne er for at eFormidling skal kunne videresende post fra SvarInn som kommer fra virksomheter som ikke sender med orgnummer i metadata. Her setter du et helt valgfritt og fiktivt organisasjonsnummer. AppReceipts tilbake til dette orgnummeret blir discardet og dermed ikke sendt. 

Ved bruk av denne propertyen så vil all post se ut til å komme fra samme fiktive orgnummer, så her må arkivar lese i meldingen for å se hvem den ekte avsenderen er.

#### DPO
Av erfaring så er av og til ikke følgende properties brukt. Dette kommer an på sak-arkivsystemet og lokalt oppsett. ```difi.move.noarkSystem.username``` , ```difi.move.noarkSystem.password=```, ```difi.move.noarkSystem.domain=``` 

#### DPV og DPF
Ikke et unntak, men også viktig å merke seg. For å koble sak-arkivsystemet til integrasjonspunktet for DPV- og DPF-forsendelser så **må** DPO være aktivert. ```difi.move.feature.enableDPO=true```. Altså for å få feks  ```difi.move.noarkSystem.endpointURL``` til å fungere

#### DPI
```difi.move.feature.enableDPI=true``` Må settes til true om du skal bruke DPI. Ingen andre DPI-spesifikke properties kreves, men en har mulighet til å overstyre ved å sette de. 

**NB!** En forutsetning for å bruke DPI gjennom eFormidling er at sak/arkiv/fagsystem er integrert mot eFormidling 2.0 grensesnittet. Spør din leverandør om dette. Les mer [her.](https://difi.github.io/felleslosninger/eformidling_nm_about.html)

--- 

### HashiCorp Vault
Integrasjonspunktet støtter HashiCorp Vault for innlesing av properties og filer. Dokumentasjon på installasjon og oppsett finnes her: <https://www.vaultproject.io/>

|Property|Eksempelverdi|Beskrivelse|
|--------|-------------|-----------|
|vault.uri|http://localhost:8200|Adresse til tjeneste|
|vault.token|s.7NP3IvIjdpHqaInbNQD4NpIY|Token for autentisering|
|vault.path|secret/move|Sti til Key/Value secrets|
|vault.resource-path|secret/resource|Sti til secrets som vil lastes som filer, må være Base64-encoded. Disse kan referes i properties med prefix "vault:"|

#### Eksempelkonfigurasjon
Følgende eksempel viser hvordan man kan benytte vault til å referere keystore og passord.


Legg til ønskede properties og keystore i vault:
```console
$ vault kv put secret/move difi.move.org.keystore.password=p4ss0rD difi.move.dpo.password=h3mm3L16
$ vault kv put secret/resource keystore="$(base64 keystore.jks)"
```
> Filer **må** legges under egen ressurs, referert av *vault.resource-path*, med Base64-encoded verdi.

Keystore kan nå refereres i integrasjonspunkt-local.properties med følgende syntaks:
```console
...
difi.move.org.keystore.alias=fiktivtalias
difi.move.org.keystore.path=vault:keystore
...
```

Integrasjonspunktet støtter kun token-autentisering. Token kan angis som et JVM-argument:
```console
$ java -Dvault.token=s.7NP3IvIjdpHqaInbNQD4NpIY ... -jar integrasjonspunkt-2.2.5.jar
```
---