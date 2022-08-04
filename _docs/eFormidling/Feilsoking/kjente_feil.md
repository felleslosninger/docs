---
title: Kjente feil
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Det finnes noen kjente feilsituasjoner som kan oppstå når en skal installere integrasjonspunktet, ofte knyttet til feil- eller manglende konfigurasjon. Under har vi forsøkt å liste opp vanlige feilsituasjoner og hvordan du kan unngå eller løse disse selv.

1. TOC
{:toc}

## Generelle feil
- White spaces bak linjer i ```integrasjonspunkt-local.properties``` fila kan ofte føre til feil. Sørg for å fjerne desse

### 400 bad request
400 Bad request feil i loggen betyr ofte at du forsøker å bruke et scope du ikkje har tilgang til. Typisk sett fordi dette ikkje er åpna på Digitaliseringsdirektoratet si side. Dei scopesa du forsøker å bruke er bestemt av properties som feks ```difi.move.feature.enableDPO=true``` eller ```difi.move.feature.enableDPV=true```
  
Kontakt Digitaliseringsdirektoratet på <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> og be om tilgang. Send gjerne med application.log 

## DPO 
DPO-meldinger blir sendt sak-arkivsystem-sak-arkivsystem. Krever at begge parter har et integrasjonspunkt og DPO aktivert for å motta/sende. DPO-funksjonalitet aktiveres ved innstillingen ```difi.move.feature.enableDPO=true```.

Typiske feil: brukernamn/passord, manglande tilganger, feil i integrasjonspunkt-local.properties. Sørg for at brukernamnet er det som blei autogenerert når du oppretta brukaren. [Les her for meir info]({{site.baseurl}}/docs/eFormidling/installasjon/eformidling_create_users#opprette-dpo-bruker-altinn-formidlingstjeneste)

Bruker og passord brukt er tilknyttet en datasystem bruker som du oppretter via lenken over. Knytt til dette datasysetmet så finnes det flere forskjellige kjente feilmeldinger du finner på [denne siden](https://www.altinn.no/hjelp/profil/datasystem--liste-over-feilmeldinger/) (ekstern lenke)

### ErrorId 0. UserId 0
```
Could not get list of available files from Altinn formidlingstjeneste. Reason: reason: null. LocalizedErrorMessage: Errorid 0. UserId 0
```

Feil med brukernamn/passord. Antageligvis mangler det innhold i propertyen ```difi.move.dpo.password=``` og ```difi.move.dpo.username=```

### ErrorId 5. UserId 0
```
InvalidSystemName/Id. Must be a number or valid username. Errorid 5. Userid: 0
```

Typisk pga skrivefeil i brukernamn/passord. 

```
The EndUserSystem System with ID: 123456 is locked out. ErrorId: 5. UserId: 0
Failed to initate Altinn broker service Reason: The EndUserSystem System with ID: 123456 is locked out. ErrorId: 5. UserId: 0
```

Dette er fordi brukaren er blitt låst pga for mange forsøk med feil passord. Etter 1 time vil brukeren bli automatisk låst opp. Om en ikkje hugser korrekt passord kan ein logge inn i Altinn og oppdatere passordet der.

### Sjekk at brukernamn og passord er korrekt
Vha SoapUi kan en sende en request og få tilbake bekreftelse på om brukernamnet/passordet er korrekt. (Krever SoapUi installert)

> [SoapUi prosjektet kan lastes ned her]({{site.baseurl}}/resources/eformidling/soapui-project-dpo-brukersjekk.xml)

1. Last ned prosjektet
2. Start SoapUi og importer prosjektet
  - file -> import project -> soapui-project-dpo-brukersjekk.xml
3.  Prosjektet skal nå ha dukket opp i menyen på venstre side med namnet ```DPO brukersjekk```
4. Utvid prosjektet med pluss tegnet: DPO brukersjekk -> BasicHttpBinding_IBrokerServiceExternalBasic -> SjekkDpoBrukerOgPassord 
5. Når du står på SjekkDpoBrukerOgPassord dobbeltklikk på ```Request 1```.
6. Et nytt vindu vil åpnes der du må legge inn brukernamn og passord i tillegg til orgnummer for denne virksomheten. orgnummeret skal i <Reportee>her</reportee> feltet, brukernamn i <username>her</username> og passord i <password>her</password>. 
7. Når du har lagt inn nødvendig informasjon trykker du på den grønne play knappen oppe i venstre hjørne i dette vinduet. 

**Korrekt brukernamn/passord**

![](/images/eformidling/soap/soapDpoPassordOk.PNG)
Brukernamn og passord er korrekt.  

**Feil brukernamn/passord**

![](/images/eformidling/soap/soapDpoPassordFeil.PNG)
Feil i brukernamn eller passord. Nytt passord kan opprettes ved å logge inn i Altinn. Må gjøres av en person med myndighet i virksomheten.


### ErrorId 6. UserId 0
```
Could not get list of available files from Altinn formidlingstjeneste. Reason: Reason: An exception happened when trying to authenticate the system . LocalizedErrorMessage: An exception happened when trying to authenticate the system . ErrorId: 6. UserId: 0
```

Typisk pga brukernamn/passord feil. Muligens white spaces

### ErrorId 40202. UserId 0. Not in SRR with appropriate rights
```
Failed to initiate Altinn broker service Reason: There was errors in the list of recipients: The following recipients is not in SRR with appropriate rights: "123456789". ErrorId 40202. UserId 0
```

Manglande SRR rettigheter hos Altinn. Kontakt Digitaliseringsdirektoratet og oppgje orgnr og brukernamn til DPO. <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>.Digitaliseringsdirektoratet vil kontakte Altinn på vegne av dykk og få det retta.

### The given reportee is not authorized to send files.
```
no.difi.meldingsutveksling.shipping.ws.AltinnWsException: failed to initiate Altinn broker service Reason: The given reportee is not authorized to send files..
```

Dette er også ein SRR feil. Kontakt Digitaliseringsdirektoratet og oppgje orgnr og brukernamn til DPO. <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>.Digitaliseringsdirektoratet vil kontakte Altinn på vegne av dykk og få det retta.

### Failed delivering to archive
Her kan det være mange forskjellige grunner. Dette er ei veldig generell feilmelding som seie at innkommande DPO-melding ikkje kunne sendast til sak-arkivsystemet. Her må ein lese nærmare på feilmeldinga for å sjå kva det er. 

Feks: ```difi.move.noarkSystem.endpointURL``` er ikkje satt eller er feil og integrasjonspunktet får ikkje koble til sak-arkivsystemet. Det kan kan feks være ei slik feilmelding:

```
Caused by: java.lang.NullPointerException: null

    at no.difi.meldingsutveksling.noarkexchange.IntegrajonspunktReceiveImpl.forwardToNoarkSystemAndSendReceipts(IntegrajonspunktReceiveImpl.java:172)

    at no.difi.meldingsutveksling.noarkexchange.IntegrajonspunktReceiveImpl.forwardToNoarkSystem(IntegrajonspunktReceiveImpl.java:148)

    at no.difi.meldingsutveksling.noarkexchange.receive.InternalQueue.sendToNoarkSystem(InternalQueue.java:317)
```
Sjekk at ...endpointURL er korrekt satt. Kontakt Digitaliseringsdirektoratet på <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> ved spørsmål.

## DPV
DPV-meldinger blir sendt frå sak-arkivsystem via integrasjonspunktet og til virksomhetens innboks i Altinn.

### AgencySystem 123 is not authorized to call service from ip 192.168.0.1
```
AgencySystem 123 is not authorized to call service from ip 192.168.0.1
```

IP-adressa på serveren er ikkje lagt inn hos Altinn. Dette blei etterspurt i informasjonsskjema som blei fylt ut i starten av prosessen. 

Om IP-adresser skal endrast eller leggast til, kontakt Digitaliseringsdirektoratet <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> så vil vi ta det vidare til Altinn. Oppgje orgnummer, DPV-brukernamn, og ønska IP-adresse eller IP-range. Du kan også sende inn skjema til servicedesk via [denne lenken](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5kZbWwz0nwnRGrfJqFQYggctUMjhUWVMxWk1OUkw0SDZXME9NVk8zOUEwNSQlQCN0PWcu)(ekstern lenke)

### Invalid security token
```
An error occurred when processing the security tokens in the message
Invalid security token
```

Ofte pga feil brukernamn/passord på ``` difi.move.dpv.password=``` og/eller ```difi.move.dpv.username=```. Kan også vise til feil med IP-adresse eller tilganger hos Altinn. 

Om feilen ikkje kan løysast ved å dobbeltsjekke brukernamn/passord. Kontakt Digitaliseringsdirektoratet <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

### Sjekk at brukernamn og passord er korrekt
Vha SoapUi kan en sende en request og få tilbake bekreftelse på om brukernamnet/passordet er korrekt. En vil også kunne sjå om en forsøker å spørre frå feil IP-adresse. (Krever SoapUi installert)

> [SoapUi prosjektet kan lastes ned her]({{site.baseurl}}/resources/eformidling/soapui-project-dpv-brukersjekk.xml)

1. Last ned prosjektet
2. Start SoapUi og importer prosjektet
  - file -> import project -> soapui-project-dpv-brukersjekk.xml
3.  Prosjektet skal nå ha dukket opp i menyen på venstre side med namnet ```DPV brukersjekk```
4. Utvid prosjektet med pluss tegnet: DPV brukersjekk -> CustomBinding_ICorrespondencyAgencyExternal -> SjekkDpvBrukerOgPassord 
5. Når du står på SjekkDpvBrukerOgPassord dobbeltklikk på ```Request 1```.
6. Et nytt vindu vil åpnes der du må legge inn brukernamn og passord i tillegg til orgnummer for denne virksomheten. orgnummeret skal i <Reportee>her</reportee> feltet, brukernamn i <username>her</username> og passord i <password>her</password>. 
7. Når du har lagt inn nødvendig informasjon trykker du på den grønne play knappen oppe i venstre hjørne i dette vinduet. 

	
**Korrekt brukernamn/passord**

![](/images/eformidling/soap/soapPassordOk.PNG)
Brukernamn og passord er korrekt. Det betyr også at IP-adressen er korrekt. 

**Feil brukernamn/passord**

![](/images/eformidling/soap/soapFeilpassord2.PNG)
Feil i brukernamn eller passord. Nytt passord kan mottas på SMS, kontakt <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> . 

**Feil IP-adresse, korrekt brukernamn/passord** 

![](/eformidling/soap/soapPassordOkIpFeil.PNG)
IP-adressen på hosten må hvitelistes hos Altinn.

## DPF
DPF-meldinger blir sendt enten frå KS svarUt (Kommune/fylkeskommuner) eller frå sak-arkivsystemet (eFormidling) via integrasjonspunktet og så til KS sin meldingsformidler der det blir sendt til SvarInn. Innkommande meldinger til SvarInn for virksomheter som bruker eFormidling vil bli henta av integrasjonspunktet og sendt til sak-arkivsystemet. 

### Unauthorized 401
Dette er typisk en lenger stack trace som started med 
```
Ùnauthorized [401] at ...
```
Nede i stack tracen vil det være ei eller fleire linjer som viser til KS SvarUt. feks  
```
no.difi.meldingsutveksling.ks.svarut.SvarUtWebServiceClientImpl.sendMessage
```

Dette kan være pga feil brukernamn/passord på svarUt brukeren. Det kan også være mangel i konfigurasjonen i KS SvarUt. Feks felt som ikkje er utfyllt. Det finnes også ein liknande feilmelding for svarInn. 

### Failed to send message
Generell feilmelding med en lenger stack trace . Nede i stack tracen står feks
```
no.difi.meldingsutveksling.ks.svarut.SvarUtWebServiceClientImpl.sendMessage
```

Her er må det djupare feilsøking til for å finne feilen. Kontakt Digitaliseringsdirektoratet og oppgje tidspunkt for forsendelse og orgnr.Digitaliseringsdirektoratet kan finne diverse soapFaults i loggen sin, desse vises ikkje i integrasjonspunktloggen d.d. Dette ønsker vi å få inn i ein framtidig versjon av integrasjonspunktet.

### Post i svarInn blir ikkje henta automatisk til sak-arkivsystemet
Her kan det også være fleire grunner til dette, blant annet:


- Virksomheta har ikkje lasta opp virksomhetssertifikatet til mottakersystem i KS Svarut og dermed ikkje fullført konfigurasjonen. [Sjå veiledning](https://difi.github.io/felleslosninger/eformidling_create_users.html#konfigurering-av-svarinn-mottakersystem)
- Virksomheta har ikkje registrert eget organisasjonsnummer inne på mottakersystem i KS Svarut
- Om avsender sitt organisasjonsnumemr ikkje er med i metadata i meldinga så vil ikkje mottaker få meldinga rett til sak-arkivsystemet. Vi har ein workaround på dette som involverer å bruke eit dummy-orgnr. vha propertyen ```difi.move.fiks.inn.fallbackSenderOrgNr=``` [Les meir her](../Drift/installasjon#konfigurere-ks-svarut-og-svarinn-dpf)
- SvarUt-brukere(kommuner/fylkeskommuner) med SvarUt versjon 4 eller eldre kan ikkje sende med orgnr i metadata. 
- Ikkje alle SvarUt-brukere(kommuner/fylkeskommuner) sender med orgnr, sjølv om dei kan sende det teknisk sett. Kan være feks manglande oppsett i KS SvarUt hos avsender.

### Invalid location size

Dette er ikke en error, men en warning. Denne kan forekomme når receipts.mv.db databasen inneholder data fra tidligere versjoner av integrasjonspunktet. Altså at det er oppgradert utan å tømme denne. Dette er inga krise, men vil vises i loggen. Kan fjernes ved å 
[gjøre følgende](installasjon) 

``` java
2018-11-29 09:46:45.933  WARN 3932 --- [main] o.a.a.store.kahadb.MessageDatabase       : Cannot recover message audit

java.io.IOException: Invalid location size: 11:4194399, size: 878
        at org.apache.activemq.store.kahadb.disk.journal.DataFileAccessor.readRecord(DataFileAccessor.java:88)
        at org.apache.activemq.store.kahadb.disk.journal.Journal.read(Journal.java:936)
…
2018-11-29 09:46:45.948  WARN 3932 --- [main] o.a.a.store.kahadb.MessageDatabase       : Cannot recover ackMessageFileMap
java.io.IOException: Invalid location size: 11:4218153, size: 91
        at org.apache.activemq.store.kahadb.disk.journal.DataFileAccessor.readRecord(DataFileAccessor.java:88)
        at org.apache.activemq.store.kahadb.disk.journal.Journal.read(Journal.java:936)
```

---