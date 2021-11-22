---
title: Sertifikatadministrasjon
description: ""
summary: ""
permalink: eformidling_drift_sertifikatadministrasjon.html
product: eFormidling
sidebar: eformidling_sidebar
---

Integrasjonspunktet i eFormidling benytter virksomhetssertifikat for ende-til-ende sikring av meldingen og for å etablere tillit mellom avsender og mottaker. 

## Integrasjonspunktet

### Om virksomhetssertifikat

Integrasjonspunktet benytter Java Key Store (JKS) som standard for nøkkelhåndtering, men støtter det fleste "kjente" typer, inkl PKSC12. Det er også mulig å bruke Azure Vault er støttet via Akv2K8s. [Se eksempeloppsett her](eformidling_drift_installasjon_aks.html#5-azure-key-vault-og-azure-key-vault-env-injector). 

Vi har valgt å pensjonere Windows Certificate Store løsningen fordi den ikke støtter alle former for eFormidling. Om du allerede bruker WCS og trenger støtte, ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

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

Når du har fått sertifikatet, må det legges inn på serveren du kjører integrasjonspunket. Noter deg lokasjonen for sertifikatet, samt brukernavn og passord. Dette skal senere legges inn i integrasjonspunkt-local.properties filen, [se konfigurasjon her](eformidling_konfigurasjon_minimal.html)


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

Forklaring på bruk av kommandoen finnes [her](https://www.tbs-certificates.co.uk/FAQ/en/626.html)

Keytool finner du i

```
%JAVA_HOME%/bin
```

(f.eks C:\Program Files\Java\jre1.8.0_101\bin)



### Eksportere public delen av virksomhetssertifikatet

NB! Zip sertifikatfila før du sender den.

For at Digitaliseringsdirektoratet skal vite hvem sitt Integrasjonspunkt det er så må sertifikatet lastes opp hos Digitaliseringsdirektoratet. Dette gjøres ved å sende 
Public key (.cer fil) på e-post til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 


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

## Neste steg

Virksomhetssertifkatet er på plass i keystoren og konfigurasjonen må oppdateres for å fortelle integrasjonspunktet hvor den skal finne keystoren.

- [Integrasjonspunktet konfigurasjon / minimal konfigurasjon ](eformidling_konfigurasjon_minimal.html)
- [Integrasjonspunktet konfigurasjon / tilgjengelig tjenester ](eformidling_konfigurasjon_tilgjengelige_tjenester.html)
- [Integrasjonspunktet installasjon / installere integrasjonspunktet](eformidling_drift_installasjon.html#installasjon-av-integrasjonspunktet)
- [Integrasjonspunktet kjøre / Start og stopp ](eformidling_drift_start_og_stopp.html#integrasjonspunktet)


## KOSMOS

### Verifisere sertifikatet

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

> Denne offentlege nøkkelen skal ligge i samme mappe som ```kosmos-[versjon].jar```, ```kosmos-local.properties``` og ```integrasjonspunkt-local.properties```

Den offentlege nøkkelen vår har fingeravtrykket: 
```
AEF2 7AA6 948A 3856 932A  F98E CA56 4339 3753 ECE3
```
Vi anbefalar at ein sjølv gjer ein manuell sjekk etter byte av nøkkel for å verifisere at fingeravtrykket er korrekt. Om du har GnuPG installert kan du køyre denne one-lineren: 
```
gpg --import-options show-only --import --fingerprint <path-to-downloaded-public-key-file>
```
Om du ikkje har GnuPG frå før eller ynskjer meir utdjupande forklaring om korleis sjekke fingeravtrykket: [Sjå her](https://github.com/felleslosninger/efm-kosmos/tree/feature_MOVE-2144_code_signing#verify-your-download-recommended)