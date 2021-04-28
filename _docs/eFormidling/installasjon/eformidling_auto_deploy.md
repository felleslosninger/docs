---
title: Automatisk oppdatering av integrasjonspunkt
description: Korleis sette opp og bruke deploy manager<tbd>
summary: "Sette opp deploy manager<tbd> for automatisk oppdatering av integrasjonspunktet"
permalink: eformidling_auto_deploy.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

> Denne applikasjonen og veiledninga er tiltenkt **lokal drift** av integrasjonspunkt. Den er ikkje for å nytte i skymiljø som til dømes Azure, Google eller AWS.


# Introduksjon
Deploymanager<tbd> er ein Spring Boot-støtta applikasjon (JAR) som køyrer som ei teneste, side om side med eit integrasjonspunkt (også JAR). Den fungerar i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege i Maven-repositoriet til Digdir.
2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten. 
3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen. Dersom den nye versjonen ikkje startar, rullar Deploymanager attende.

## Funksjonalitet
Deploymanager<tbd> køyrer periodiske sjekkar i rekkefølge beskriven her. Innstillinga ```deploymanager.schedulerCronExpression``` avgjer kor ofte dette skjer. 

1. Finne noværande versjon av integrasjonspunktet.
2. Finne siste versjon av integrasjonspunktet.
3. Sjekk av versjon-kompabilitet.
4. Nedlasting av siste lanserte versjon.
5. Validering av nedlasta artefakt.
6. Stopp av gammalt integrasjonspunkt.
7. Oppstart av ny versjon.

Ein kan sjølv velge tidspunkt for når ny versjon skal starte opp. Standard verdiane er kl 05:30, 19:30 og 21:30.

## Krav til integrasjonspunkt som skal verta oppdatert
+ Integrasjonspunktet har alle naudsynte portåpningar definert, jf. tilhøyrande dokumentasjon.
+ Shutdown-endepunktet til det køyrande integrasjonspunktet må vera eksponert hjå klienten (ikkje eksternt mot Internett). Dette gjer at Deploymanager kan stoppa integrasjonspunktet når ein ny versjon er tilgjengeleg.
+ Info-endepunktet til integrasjonspunktet må vera internt eksponert, for bestemming av inneværande versjon.
+ Helse-endepunktet til integrasjonspunktet må vera internt eksponert, for at deploymanager skal kunna avgjera om applikasjonen køyrer eller ikkje.

*Som standard er desse endepunkta eksponerte lokalt i integrasjonspunktet*

---

# Installasjon
Før deploymanager<tbd> kan automatisk laste ned ny versjon og oppdatere ditt køyrande integrasjonspunkt må den setjast opp ved å konfigurere properties og velge ein katalog det skal køyre frå. 

Det er anbefalt (minst konfigurasjon) å køyre både integrasjonspunkt.jar og deploymanager.jar<tbd> frå samme katalog, om ønska køyre frå forskjellige katalog [sjå her](https://github.com/felleslosninger/efm-deploy-manager#running-deploymanager-and-integrasjonspunkt-from-different-folders).


1. Legg inn jar-fila og ```deploymanager-local.properties``` i ønska katalog.
2. Sett opp naudsynte konfigurasjonar i ```deploymanager-local.properties```. Sjå under.
3. [Laste ned Digdir sin offentlege nøkkel](/resources/eformidling/public_keys/eformidling-key.asc) og lagre valgt katalog.

## Konfigurere properties fil
Åpne ```deploymanager-local.properties``` i katalogen du skal køyre ```.jar``` fila frå sett inn følgande properties.

```java
# Replace hosts and ports of URL with the location
# of your integrasjonspunkt.
deploymanager.integrasjonspunkt.baseURL=http://localhost:9093

# E-mail is optional. Please specify these properties 
# to receive e-mails when the deploy-manager updates the integrasjonspunkt-application.
deploymanager.mail.recipient=someone@yourdomain.no
deploymanager.mail.from=noreply@yourdomain.no

spring.mail.host=smtp.yourdomain.no
spring.mail.port=<set-your-port-here>

# Digitaliseringsdirektoratet public key paths. i.e: file:keyname.gpg.
deploymanager.verification.publicKeyPaths[0]=file:eformidling-key.gpg
```
*[Last ned properties-fila her](/resources/eformidling/deploymanager-local.properties)*

### Setje tidspunkt for oppdatering
*Valgfritt*

Ein kan setje tidspunkt for kortid applikasjonen vil forsøke å oppdatere integrasjonspunktet om ein ikkje ynskjer å benytte standard-verdiane. 

Her er nokre døme som viser korleis ein kan styre tidspunkt for oppdatering.

```java
#Standard verdi: Sjekkar etter oppdatering mandag-fredag kl 05:30, 19:30 og 21:30.
deploymanager.schedulerCronExpression=0 30 5,19,21 * * MON-FRI

#Sjekkar etter oppdatering kvar dag kl 06:00.
deploymanager.schedulerCronExpression=0 0 6 * * ?

#Sjekkar etter oppdatering kvar dag kl 23:15.
deploymanager.schedulerCronExpression=0 15 23 ? * *

#Sjekkar etter oppdatering kvar laurdag og søndag kl 12:00.
deploymanager.schedulerCronExpression=0 0 12 ? * SAT,SUN

#Sjekkar etter oppdatering kvart tredje minutt kvar time.
deploymanager.schedulerCronExpression=0 0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57 * ? * *
```

## Verifisere sertifikatet
Når Digitaliseringsdirektoratet publiserer eit nytt integrasjonspunkt vil dette være signert med vår privat nøkkel. For å verifisere denne signaturen kan du laste ned vår offentlege nøkkel og sjekke om fingeravtrykket på signaturen er likt som nøkkelen.

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
Om du ikkje har GnuPG frå før eller ynskjer meir utdjupande forklaring om korleis sjekke fingeravtrykket: [Sjå her](https://github.com/felleslosninger/efm-deploy-manager/tree/feature_MOVE-2144_code_signing#verify-your-download-recommended)


## Starte som Windows-teneste
Vi har lagt opp til at deploymanager<tbd> kan køyrast som ei Windows-teneste vha jar-wrapperen https://github.com/kohsuke/winsw. Følg veiledninga og bruk konfigurasjonen under. Dette er same wrapper som vi har nytta for [integrasjonspunktet](https://docs.digdir.no/eformidling_ip_run.html#alt-1-kj%C3%B8re-integrasjonspunktet-som-en-tjeneste) og [einnsyn](https://docs.digdir.no/einnsyn_install_tjeneste.html) før. 


> Lagre konfigurasjonsfila fila som ```deploymanager-service.xml```<tbd> og *winsw.exe* fila endrast til ```deploymanager-service.exe```.<tbd>

Om du har alt i samme katalog treng du kun endre versjonsnamnet "X.Y.Z" frå følgande konfigurasjon:
```
<configuration>
  
  <!-- ID of the service. It should be unique accross the Windows system-->
  <id>deploymanagersvc</id>
  <!-- Display name of the service -->
  <name>Deploymanager Service</name>
  <!-- Service description -->
  <description>Keeps the integrasjonspunkt application up-to-date.</description>
  
  <!-- Path to the executable, which should be started -->
  <executable>java</executable>
    <arguments>-jar %BASE%\deploymanager-X.Y.Z.jar --spring.profiles.active=production --spring.config.additional-location=file:%BASE%\integrasjonspunkt-local.properties</arguments>
  <logpath>%BASE%\deploymanager-logs</logpath>
  
  <log mode="roll-by-size">
    <sizeThreshold>10240</sizeThreshold>
    <keepFiles>8</keepFiles>
  </log>
</configuration>
```
*[Last ned konfigurasjonsfila her](/resources/eformidling/deploymanager-service.xml)*

> **Merk:** Visst du har mellomrom i mappenamn i stien bør du endre %BASE% til absolutt sti. Døme: *C:\\"deploymanager user"\\sti\\til\\her\\deploymanager.X.Y.Z.jar*

Døme: No bør du ha desse filene i liggande i mappa.
    
![ph:bilde](/images/eformidling/dm-filer.png)

## Starte frå kommandolinja
For å starte frå kommandolinja kan du bruke følgande kommando:

**I produksjon**
```java -jar deploymanager-x.y.z.jar -Dspring.profiles.active=production -Dspring.config.additional-location=file:%BASE%\integrasjonspunkt-local.properties```

**I staging**
```java -jar deploymanager-x.y.z.jar -Dspring.profiles.active=staging -Dspring.config.additional-location=file:%BASE%\integrasjonspunkt-local.properties```

---
