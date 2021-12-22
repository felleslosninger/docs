---
title: Virksomhetssertifikat
description: Virksomhetssertifikat
summary: "Håndtering av virksomhetssertifikatet"

product: eFormidling
sidebar: eformidling_sidebar
---

### Om virksomhetssertifikat

Per i dag så benytter vi Java Key Store (JKS). Vi jobber med en virtuell HSM-løsning som alternativ til JKS. Vi har valgt å pensjonere Windows Certificate Store løsningen fordi den ikke støtter alle former for eFormidling. Om du allerede bruker WCS og trenger støtte, ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

Hvordan du legger inn sertifikatet i JKS finner du nedenfor. Etter at du har lagt sertifikatet i keystoren må det sendes til Digitaliseringsdirektoratet på denne adressen <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> slik at vi kan laste det opp.

> * NB! Testmiljø krever **test virksomhetssertifikat**. Produksjonsertifikat vil ikke virke i test  
> * NB2! I produksjon **må** en ha produksjon **virksomhetssertifikat**. 
> * NB3! Bruk sertifikatet merket som **Autentiseringssertifikatet**   
> * NB4! Sertifikatet **må** være utstedt til deres organisasjonsnummer(samme som integrasjonspunktet bruker)
> * NB5! Sertifikatet kan ikke være et wildcard sertifikat.
> * NB6! alias = entry name. Entry name er namnet på alias(namnet på sertifikatet) i keystore explorer. Integrasjonspunkt.local.properties fila bruker alias som namn på sertifikatet
> * NB7! eSegl sertifikater er ikke egnet for bruk i eFormidling. 

Integrasjonspunktet bruker virksomhetssertifikat til kryptering og signering av meldinger som går mellom integrasjonpunkter.
Virksomhetssertifikat som kan benyttes leveres av [Commfides](https://www.commfides.com/e-ID/Bestill-Commfides-Virksomhetssertifikat.html) og [Buypass](https://www.buypass.no/hjelp/virksomhetssertifikat)

### Legge sertifikatet i Java Key Store (JKS)

I dette kapittelet finner du informasjon om hvordan du konverterer en .p12-keystore (filformatet mottatt ved bestilling av virksomhetssertifikat) til en java key store.

Når du har fått sertifikatet, må det legges inn på serveren du kjører integrasjonspunket. Noter deg lokasjonen for sertifikatet, samt brukernavn og passord. Dette skal senere legges inn i integrasjonspunkt-local.properties filen som er en del av [neste steg av installasjonen.]({{site.baseurl}}/docs/eFormidling/installasjon/eformidling_properties_config)


**NB!** Passord på keystore og sertifikat **MÅ** være like

**NB!** Unngå æøå i alias-navn.

Virksomhetssertifikatet **må** ligge i en Java key store. 

Konvertering av sertifikat kan gjøres via kommando i kommandovindu, eller ved bruk av gratis programvare
[keystore explorer.](http://keystore-explorer.org/downloads.html) 

**konvertere sertifikat i keystore explorer**

Dersom du har p12 sertifikat
1. Åpne sertifikatet i Keystore Explorer 
2. På arbeidslinjen på toppen av vinduet:
    - Tools
    - Change Keystore type
     - Velg: JKS.
     - Fil -> Lagre som -> velg namn og lagre som jks. feks "keystore.jks"
  
**Endre passord på sertifikat eller keystore:**

Det er viktig at passordet på keystore er likt passordet på sertifikatet for at integrasjonspunktet skal fungere. Her er veiledning for å endre passord på begge to.

*Endre keystore passord*
1. Åpne opp keystoren i JKS.
2. På arbeidslinjen på toppen av vinduet:
    - Tools
    - Set KeyStore password
    - skriv inn nytt passord
  
*Endre sertifikat passord*
1. Åpne opp keystore i JKS. 
2. Høgreklikk på valgt sertifikat og velg "set password" i menyen.
3. Skriv inn nytt passord.
  

**konvertere sertifikat vha kommando kan det gjøres slik: **
Dersom du har p12 sertifikat kan dette konverteres til jks format slik:

```
keytool -importkeystore -srckeystore [MY_FILE.p12] -srcstoretype pkcs12
 -srcalias [ALIAS_SRC] -destkeystore [MY_KEYSTORE.jks]
 -deststoretype jks -deststorepass [PASSWORD_JKS] -destalias [ALIAS]
```

forklaring på bruk av kommandoen finnes [her](https://www.tbs-certificates.co.uk/FAQ/en/626.html)

Keytool finner du i

```
%JAVA_HOME%/bin
```

(f.eks C:\Program Files\Java\jre1.8.0_101\bin)



### Eksportere public delen av virksomhetssertifikatet

NB! Zip sertifikatfila før du sender den.

For at Digitaliseringsdirektoratet skal vite hvem sitt Integrasjonspunkt det er så må sertifikatet lastes opp hos Digitaliseringsdirektoratet. Dette gjøres ved å sende 
Public key (.cer fil) på e-post til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

<!-- Public key (.cer fil) lastes opp til [virksomhetssertifikatserveren for test](https://beta-meldingsutveksling.difi.no/virksomhetssertifikat/) og [virksomhetssertifikatserveren for produksjon](https://meldingsutveksling.difi.no/virksomhetssertifikat/) -->

**eksportere public key fra keystore explorer**
1. Åpne opp JKS-keystoren i keystore explorer. 
2. Høgreklikk på valgt sertifikat og velg "export->Certificate" eller "certificate chain" i menyen.
    - Om du velger Certificate Chain så må du markere for "head only" i det neste vinduet.
    - Marker også av for export format "X.509"
3. Marker for PEM format.
4. Naviger til valgt mappe og lagre som .cer fil.

**public key kan eksporteres fra keystore med kommandoen**

```
keytool -export -keystore [MY_KEYSTORE.jks] -alias [ALIAS] -file [FILENAME.cer]
```

Spørsmål rundt integrasjonspunktet installasjon eller forslag til forbedringer av installasjonsbeskrivelsen kan sendes til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>
