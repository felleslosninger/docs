---
title: Konfigurering av integrasjonspunkt-local.properties
description: Konfigurering av integrasjonspunkt-local.properties-filen.
summary: "Konfigurering av integrasjonspunkt-local.properties-filen."
permalink: eformidling_properties_config.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

Denne delen av veiledningen er delt opp slik at du først finner litt generell informasjon før du deretter finner eksempler på integrasjonspunkt-local.properties oppsett spesifikt for den tjenesten du skal ta i bruk. 

### Anbefalt rekkefølge for installasjon av eFormidling

Vi anbefaler å konfigurere integrasjonspunktet i følgende rekkefølge.

1. Minimumskonfigurasjon for å få starte integrasjonspunktet. 
2. Konfigurere sak-arkivsystem til å prate med integrasjonspunktet (under DPO innstillinger i tabellen under)
3. Konfigurere DPO innstillinger (brukernavn og passord) eller DPI.
4. Konfigurere DPV/DPF innstillinger

Vi anbefaler dere å konfigurere DPO før DPV/DPF for å unngå å motta post fra svarUt til virksomhetens SvarInn innboks. Ved å konfigurere DPO først vil dere motta post i sak-arkivsystemet. Om ønsket kan en også sette opp DPI først.

Husk å melde fra til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> når dere har konfigurert slik at Digitaliseringsdirektoratet kan åpne opp tilganger. Ellers vil du få 400 Bad request feil. 


### Integrasjonspunkt-local.properties

Her laster du ned [integrasjonspunkt-local.properties-filen](/resources/eformidling/integrasjonspunkt-local.txt) Per i dag så benytter vi Java Key Store (JKS). Vi jobber med en virtuell HSM-løsning som alternativ til JKS. Vi har valgt å pensjonere Windows Certificate Store løsningen fordi den ikke støtter alle former for eFormidling. Om du allerede bruker WCS og trenger støtte, ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

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

> i integrasjonspunkt-local.properties-filen må du fjerne bortkommentering for den typen eformidling du skal bruke.
> keystore.alias er case-sensitivt

**NB:** Benytt skråstrek (/) eller dobbel omvendt skråstrek (\\\\) som ressursdeler når dere angir filbaner.

Eksempler på konfigurering finner du lenger nede under hver enkelt tjeneste.


### eFormidling - Digital Post til virksomheter

Når en virksomhet sender digital post til virksomheter kan virksomheten sende både til og motta fra andre virksomheter som har et integrasjonspunkt. Sende til virksomheter som ikke har. 


> Om du **ikke** bruker eInnsyn må du i tillegg legge inn ```difi.move.feature.enableDPE=false``` for å skru av eInnsyn. Ellers får du feilmeldinger.

> **NB!** Sørg for å fjerne  alle whitespace bak hver linje.

---

Når du skal ta i bruk DPF/DPO/DPV må du legge inn en rekke properties og fylle ut desse. Se etter DPV/DPO/DPF i tabellen under og legg inn innstillinger som kreves for denne tjenesten. Se under tabellen for unntak.

  {% include eformidling/properties/jks_generell.html %} 
  
  {% include eformidling/properties/dpv.html %}
  
 ---

### eInnsyn 

  {% include eformidling/properties/jks_generell.html %} 

### eFormidling - Digital post til innbyggere

  {% include eformidling/properties/jks_generell.html %} 
  {% include eformidling/properties/dpi.html %}
  

### Valgfrie properties
Integrasjonspunktet har støtte for mange flere properties enn de som er nevnt over. Denne listen er ikke (per 01.10.21) helt utfyllende for alle properties, men vil bli utvidet: 

  {% include eformidling/properties/ip_properties.html %}


--- 

### Regel:
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

### Hvordan opprette brukere for DPO/DPF/DPV?

[Denne delen er flyttet](/eformidling_create_users.html)

> For DPI kreves ingen bruker, da benyttes virksomhetssertifikatet.

--- 
