---
title: Kjente feil
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_selfhelp_typical_errors
---

Det finnes noen kjente feilsituasjoner som kan oppstå når en skal installere integrasjonspunktet, ofte knyttet til feil- eller manglende konfigurasjon. Under har vi forsøkt å liste opp vanlige feilsituasjoner og hvordan du kan unngå eller løse disse selv.

1. TOC
{:toc}

## Generelle feil
- White spaces bak linjer i `integrasjonspunkt-local.properties` fila kan ofte føre til feil. Sørg for å fjerne desse

### Låst fil-database

Dersom Integrasjonspunktet blir drept under oppstart, og liquibase ikke får fjernet låsen i databasen, må en manuelt inn i databasen og oppdatere innholdet fra tabellen DATABASECHANGELOGLOCK

1. Last ned https://repo1.maven.org/maven2/com/h2database/h2/1.4.200/h2-1.4.200.jar
2. Legg jar'en i samme katalog som databasen ligger dvs. working directory, der dere kjører integrasjonspunktet
3. Stopp integrasjonspunktet
4. Kjør "java -jar .\h2-1.4.200.jar"
5. jdbcurl: jdbc:h2:./integrasjonspunkt, user: sa, blankt passord
6. Sjekk at locken er der: SELECT * FROM DATABASECHANGELOGLOCK;
7. Kjør denne kommandoen: update DATABASECHANGELOGLOCK set locked=0 WHERE ID=1;
8. Verifiser at locken nå er false.

URLen skal være slik som denne: jdbc:h2:C:/Users/katalog/IdeaProjects/efm-integrasjonspunkt/integrasjonspunkt/integrasjonspunkt
Bytt ut med riktig path

Shellet en kjører h2-klienten fra må  ha administratorrettigheter. Og pass på at integrasjonspunktet ikke kjører samtidig.

### Postgres database vokser urimelig mye

'large object'-opprydding ved bruk av egen database for integrasjonspunktet
En bør vurdere  opprydding av store objekt dersom en bruker PostgreSQL som egen database for integrasjonspunktet. Dette skyldes at PostgreSQL som standard lagrer BLOB som “large object” (i egen tabell), og at JDBC ikke rydder opp ved sletting. Konsekvensene hvis dette ikke gjøres, vil kunne være at sikkerhetskopi først tar lang tid, og deretter begynner å terminere grunnet høy minnebruk. Verktøyet [vacuumlo](https://www.postgresql.org/docs/current/vacuumlo.html) fjerner foreldreløse store objekter.

Kan gjøres manuelt eller ved å sette opp [triggers](https://www.postgresql.org/docs/current/lo.html)


### 400 bad request
400 Bad request feil i loggen betyr ofte at du forsøker å bruke et scope du ikkje har tilgang til. Typisk sett fordi dette ikkje er åpna på Digitaliseringsdirektoratet si side. Dei scopesa du forsøker å bruke er bestemt av properties som feks ```difi.move.feature.enableDPO=true``` eller ```difi.move.feature.enableDPV=true```
  
Kontakt Digitaliseringsdirektoratet på <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> og be om tilgang. Send gjerne med application.log 

## DPO 
DPO-meldinger blir sendt sak-arkivsystem-sak-arkivsystem. Krever at begge parter har et integrasjonspunkt og DPO aktivert for å motta/sende. DPO-funksjonalitet aktiveres ved innstillingen ```difi.move.feature.enableDPO=true```.

Typiske feil: manglande tilganger, feil i integrasjonspunkt-local.properties.

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


- Virksomheta har ikkje lasta opp virksomhetssertifikatet til mottakersystem i KS Svarut og dermed ikkje fullført konfigurasjonen. [Sjå veiledning](../installasjon/opprette_brukere#konfigurering-av-svarinn-mottakersystem)
- Virksomheta har ikkje registrert eget organisasjonsnummer inne på mottakersystem i KS Svarut
- Om avsender sitt organisasjonsnumemr ikkje er med i metadata i meldinga så vil ikkje mottaker få meldinga rett til sak-arkivsystemet. Vi har ein workaround på dette som involverer å bruke eit dummy-orgnr. vha propertyen ```difi.move.fiks.inn.fallbackSenderOrgNr=``` [Les meir her](../installasjon/installasjon#konfigurere-ks-svarut-og-svarinn-dpf)
- SvarUt-brukere(kommuner/fylkeskommuner) med SvarUt versjon 4 eller eldre kan ikkje sende med orgnr i metadata. 
- Ikkje alle SvarUt-brukere(kommuner/fylkeskommuner) sender med orgnr, sjølv om dei kan sende det teknisk sett. Kan være feks manglande oppsett i KS SvarUt hos avsender.

### Invalid location size

Dette er ikke en error, men en warning. Denne kan forekomme når receipts.mv.db databasen inneholder data fra tidligere versjoner av integrasjonspunktet. Altså at det er oppgradert utan å tømme denne. Dette er inga krise, men vil vises i loggen. Kan fjernes ved å 
[gjøre følgende](sporsmal_og_svar#hvordan-kan-jeg-nullstille-integrasjonspunktet) 

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

## DPI

DPI meldingar blir sendt gjennom fire hjørners modellen:

Avsendar (HJørne 1): Dette er den offentlege myndigheita eller private verksemda som ønskjer å sende ei digital melding til ein innbyggjar.
Avsendaren brukar ein avsendarapplikasjon eller ei integrert løysning for å generere og sende meldinga til DPI. 

Meldingsformidlar (HJørne 2): Meldingsformidlaren er ein tenestetilbydar som handterer sjølve formidlinga av meldingar mellom avsendar og mottakar. Infrastrukturleverandør som handterer trygg og standardisert transport av meldingar. Meldingsformidlaren sørgjer for at meldinga vert sendt på ein trygg måte og at den vert ruted til riktig digital postkasse.

Digital Postkasseleverandør (Hjørne 3): Dette er leverandørane som tilbyr dei digitale postkassene der innbyggjarane kan motta og lese meldingar. Døme på digitale postkasseleverandørar er Digipost og e-boks. Desse leverandørane mottar meldingar frå meldingsformidlaren og lagrar dei i innbyggjaren sin postkasse. Dei sender òg ut varsel til innbyggjarane når ny post er mottatt.

Mottakar (Hjørne 4): Mottakaren er innbyggjaren som har oppretta ei digital postkasse og valt ein postkasseleverandør. Innbyggjaren mottar varsel om ny post via e-post eller SMS, loggar inn i den digitale postkassa med elektronisk ID, og kan lese og administrere meldingar der.


### Unwrapping message failed: java.lang.illegalStateException: Verifying JWT failed!

Denne feilen kan forekomme når ein ikkje har satt propertien:
difi.move.dpi.receipt-type=xmlsoap
og eller ein manglar brannmur åpning mot buypass:  
[Prod miljøet](https://docs.digdir.no/docs/eFormidling/Miljo/produksjon)  
[Test miljøet](https://docs.digdir.no/docs/eFormidling/Miljo/test) 

 

