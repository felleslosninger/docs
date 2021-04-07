---
title: Automatisk oppdatering av integrasjonspunkt
description: Korleis sette opp og bruke deploy manager<tbd>
summary: "Sette opp deploy manager<tbd> for automatisk oppdatering av integrasjonspunktet"
permalink: eformidling_auto_deploy.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

> Denne applikasjonen og veiledninga er tiltenkt lokal drift av integrasjonspunkt og ikkje for å nytte i skymiljø som til dømes Azure, Google eller AWS.


# Introduksjon
Deploymanager<tbd> er ein Spring Boot-støtta applikasjon (JAR) som køyrer som ei teneste, side om side med eit integrasjonspunkt (også JAR). Den fungerar i grove trekk slik:

1. Samanliknar gjeldande integrasjonspunkt-versjon mot siste tilgjengelege i Maven-repositoriet til Digdir.
2. Dersom det er ein nyare versjon tilgjengeleg, vert denne lasta ned til klienten. 
3. Gjeldande integrasjonspunkt vert forsøkt oppdatert til den nedlasta versjonen. Dersom den nye versjonen ikkje startar, rullar Deploymanager attende.

## Funksjonalitet
Deploymanager<tbd> køyrer periodiske sjekkar i rekkefølge beskriven her. Innstillinga ```deploymanager.scheduler-fixed-rate-in-ms``` avgjer kor ofte dette skjer. 

1. Finne noværande versjon av integrasjonspunktet.
2. Finne siste versjon av integrasjonspunktet.
3. Sjekk av versjon-kompabilitet.
4. Nedlasting av siste lanserte versjon.
5. Validering av nedlasta artefakt.
6. Stopp av gammalt integrasjonspunkt.
7. Oppstart av ny versjon.

Ein kan sjølv velge tidspunkt for når ny versjon skal starte opp. Standard verdien er <todo>.

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
```
*[last ned properties-fila her](/resources/eformidling/deploymanager-local.properties)*

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

## Starte frå kommandolinja
For å starte frå kommandolinja kan du bruke følgande kommando:

**I Produksjon**
```java jar deploymanager-x.y.z.jar -Dspring.profiles.active=production```

**I staging**
```java jar deploymanager-x.y.z.jar -Dspring.profiles.active=staging```



---

# Verifisere sertifikatet
Når Digitaliseringsdirektoratet publiserer eit nytt integrasjonspunkt vil dette være signert med vår privat nøkkel. For å verifisere denne signaturen kan du laste ned vår offentlege nøkkel og sjekke om fingeravtrykket på signaturen er likt som nøkkelen.

```
PH:Her kjem noværande gyldige Digdir offentleg nøkkel.
```

> [Offentleg nøkkel kan du laste ned her]()

> [Slik sjekkar du fingeravtrykket]()




