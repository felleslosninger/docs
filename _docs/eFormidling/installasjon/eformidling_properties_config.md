---
title: Konfigurering vha. integrasjonspunkt-local.properties
description: Konfigurering vha. integrasjonspunkt-local.properties-filen.
summary: "Konfigurering vha. integrasjonspunkt-local.properties-filen."
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_properties_config
---

Denne delen av veiledningen er delt opp slik at du først finner generell informasjon, før du deretter finner eksempler på spesifikke innstillinger i integrasjonspunkt-local.properties for den tjenesten du skal ta i bruk. 

### Anbefalt rekkefølge for installasjon av eFormidling

Vi anbefaler å konfigurere integrasjonspunktet i følgende rekkefølge:

1. Minimumskonfigurasjon for å få starte integrasjonspunktet. 
2. Konfigurere sak-arkivsystem til å prate med integrasjonspunktet (under DPO innstillinger i tabellen under)
3. Konfigurere DPO-innstillinger (brukernavn og passord) eller DPI.
4. Konfigurere DPV-/DPF-innstillinger

Vi anbefaler dere å konfigurere DPO før DPV/DPF for å unngå å motta post fra svarUt til virksomhetens SvarInn innboks. Ved å konfigurere DPO først vil dere motta post i sak-arkivsystemet. Om ønsket kan en også sette opp DPI først.

Husk å melde fra til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> når dere har konfigurert slik at Digitaliseringsdirektoratet kan åpne opp tilganger. Ellers vil du få "HTTP 400 Bad Request"-feil. 


### integrasjonspunkt-local.properties

Her laster du ned [integrasjonspunkt-local.properties-filen]({{site.baseurl}}/resources/eformidling/integrasjonspunkt-local.txt) Per i dag så benytter vi Java Key Store (JKS). Vi jobber med en virtuell HSM-løsning som alternativ til JKS. Vi har valgt å pensjonere Windows Certificate Store løsningen fordi den ikke støtter alle former for eFormidling. Om du allerede bruker WCS og trenger støtte, ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

1. Start med å opprette en mappe med navn integrasjonspunkt på for eksempel c:\
2. Last så ned integrasjonspunkt-local.properties filen. den kan lastes ned [her ]({{site.baseurl}}/resources/eformidling/integrasjonspunkt-local.txt) og lagre i overnevnte mappe
3. last ned integrasjonspunkt[versjonsnummer].jar filen. Den finner du [her]({{site.baseurl}}/docs/eFormidling/installasjon/eformidling_download_ip)

Når du er ferdig skal strukturen på området se slik ut:
```
c:/
|-- integrasjonspunkt/
   |-- integrasjonspunkt-local.properties
   |-- integrasjonspunkt[versjon].jar
```

> i integrasjonspunkt-local.properties-filen må du fjerne utkommentering av den typen eformidling du skal bruke.
> keystore.alias er case-sensitivt

**NB:** Benytt skråstrek (/) eller dobbel omvendt skråstrek (\\\\) som ressurs-deler når dere angir filbaner.

Eksempler på konfigurasjoner finner du lenger nede under hver enkelt tjeneste.


### eFormidling - Digital Post til virksomheter

Når en virksomhet sender digital post til virksomheter, kan virksomheten både sende til og motta fra andre virksomheter som har et integrasjonspunkt, samt sende til virksomheter som ikke har. 


> Om du **ikke** bruker eInnsyn må du i tillegg legge inn ```difi.move.feature.enableDPE=false``` for å skru av eInnsyn. Ellers får du feilmeldinger.

> **NB!** Sørg for å fjerne alle whitespace-karakterer på slutten av hver linje.

---

### Properties DPF/DPO/DPV

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
Integrasjonspunktet har støtte for mange flere properties enn de som er nevnt over. Denne listen er ikke  helt utfyllende (per 01.10.21) for alle properties, men vil bli utvidet: 

  {% include eformidling/properties/ip_properties.html %}



--- 

### Regel:
Alle innstillinger for gitt type forsendelse(DPO/DPF/DPV) må legges inn, men det finnes noen unntak.

#### DPF
Du trenger alle innstillinger utenom ```difi.move.fiks.inn.fallbackSenderOrgNr=```. Denne finnes for at eFormidling skal kunne videresende post fra SvarInn som kommer fra virksomheter som ikke sender med orgnummer i metadata. Her setter du et helt valgfritt og fiktivt organisasjonsnummer. AppReceipts tilbake til dette orgnummeret blir discardet og dermed ikke sendt. 

Ved bruk av denne innstillingen vil all post se ut til å komme fra samme fiktive orgnummer, så her må arkivar lese i meldingen for å se hvem den ekte avsenderen er.

#### DPO
Av erfaring så er av og til ikke følgende properties brukt. Dette kommer an på sak-arkivsystemet og lokalt oppsett. ```difi.move.noarkSystem.username``` , ```difi.move.noarkSystem.password=```, ```difi.move.noarkSystem.domain=``` 

#### DPV og DPF
Ikke et unntak, men også viktig å merke seg: For å koble sak-arkivsystemet til integrasjonspunktet for DPV- og DPF-forsendelser så **må** DPO være aktivert. ```difi.move.feature.enableDPO=true```. Altså for å få feks  ```difi.move.noarkSystem.endpointURL``` til å fungere.

#### DPI
```difi.move.feature.enableDPI=true``` Må settes til true om du skal bruke DPI. Ingen andre DPI-spesifikke properties kreves, men en har mulighet til å overstyre standard-innstillingene.

**NB!** En forutsetning for å bruke DPI gjennom eFormidling er at sak/arkiv/fagsystem er integrert mot eFormidling 2.0 grensesnittet. Spør din leverandør om dette. Les mer [her.](https://difi.github.io/felleslosninger/eformidling_nm_about.html)

---

### Hvordan opprette brukere for DPO/DPF/DPV?

[Denne delen er flyttet]({{site.baseurl}}/docs/eFormidling/installasjon/eformidling_create_users)

> For DPI kreves ingen bruker, da benyttes virksomhetssertifikatet.

--- 

### HashiCorp Vault
Integrasjonspunktet støtter HashiCorp Vault for innlesing av properties og filer. Dokumentasjon på installasjon og oppsett finnes her: <https://www.vaultproject.io/>

|Property|Eksempelverdi|Beskrivelse|
|--------|-------------|-----------|
|vault.uri|http://localhost:8200|Adresse til tjeneste|
|vault.token|s.7NP3IvIjdpHqaInbNQD4NpIY|Token for autentisering|
|vault.path|secret/move|Sti til Key/Value secrets|
|vault.resource-path|secret/resource|Sti til secrets som vil lastes som filer, må være Base64-encoded. Disse kan referes i properties med prefix "vault:"|

#### Eksempel på konfigurasjon
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
