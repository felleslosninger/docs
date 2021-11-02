---
title: Sporing av forsendelser
description: Denne siden har som mål å forklare hvordan bruke API'et til å se status på forsendelser, innkommende meldinger og utgående meldinger. 
summary: "Denne siden har som mål å forklare hvordan bruke API'et til å se status på forsendelser, innkommende meldinger og utgående meldinger"
permalink: eformidling_api.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

> Utviklere: [REST docs finner du her](https://difi.github.io/felleslosninger/eformidling_nm_restdocs.html)

* TOC
{:toc}

## Terminologi

**Disse begrepene vil heretter bli benyttet og er relevante for å forstå innholdet på denne siden korrekt.**

|    Begrep   | Forkortelse/forklaring | 
| :---: | :---: | 
| Digital post til offentlige virksomheter | [DPO](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#digital-post-til-offentlige-virksomheter-dpo) | 
| Digital post til virksomheter | [DPV](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#digital-post-til-virksomheter-dpv) | 
| Digital post til innbygger | [DPI](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#digital-post-til-innbygger-dpi) | 
| Digital post KS FIKS SvarInn/SvarUt | [DPF](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#digital-post-ks-fiks-svarinnsvarut-dpf) | 
| Forsendelser til/fra Einnsyn | [DPE](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#einnsyn-dpe) | 
| Conversation | Forsendelse/konversasjon | 
| ```conversationId``` | [ForsendelsesId](https://difi.github.io/felleslosninger/eformidling_nm_message.html#conversationid) | 
| ```messageId```| [```MeldingsId``` i en Conversation](https://difi.github.io/felleslosninger/eformidling_nm_message.html#messageid) | 
| ServiceIdentifier | Tjeneste/forsendelsesmåte. Feks DPO | 
| Direction | Utgående eller innkommende forsendelse | 
| Servicebus | Meldingsformidler brukt i Einnsyn| 
| DLQ | [Dead Letter Queue](https://en.wikipedia.org/wiki/Dead_letter_queue) | 
| Databehandler | [se kap 9, avsnitt 2](https://samarbeid.difi.no/bruksvilkar/bruksvilkar-einnsyn) | 
| | |



---

## Sjekke forsendelser - grafisk brukergrensesnitt

Det er laget et grafisk brukergrensesnitt til integrasjonspunktet (tilgjengelig fra versjon 2.0.7). Tanken bak er at virksomhetene, evt. driftsleverandør, enkelt skal kunne sjekke status på inngående og utgående meldinger fra integrasjonspunktet.

### Hvordan?

Om en forsendelse timer ut eller feiler vil avsender bli varslet i løpet av 24 timer. Registrerte varslingspunkt vil få en email som ser slik ut:

 > Kjære VIRKSOMHETSNAVN
 >
 > Følgande meldingar i eFormidling har feila.
 >         
 > Tidspunkt for feil: 2020-07-09 09:18:19.323  
 > Tidspunkt opprettet: 2020-07-08 09:18:07.825  
 > Message-ID: 1cbe29fb-20ce-46d2-a774-6707034ba6d9  
 > Conversation-ID: 1cbe29fb-20ce-46d2-a774-6707034ba6d9  
 > Service identifier: DPO  
 > Status: LEVETID_UTLOPT  
 > Process-ID: urn:no:difi:profile:arkivmelding:administrasjon:ver1.0  
 > Sender: Avsenders orgnr  
 > Receiver: Mottakers orgnr  

Åpne browser, gå til ``http://localhost:serverport/conversations``. Port 9093 er satt som default, men sjekk med tekniker hvilken serverport som blir brukt. Dette kan eventuelt sjekkes i .properties filen som ligger i integrasjonspunktmappen. 
  
Her vil en få opp alle forsendelser som er sendt til eller fra integrasjonspunktet. Kopier inn **Conversation-ID** fra emailen og sjekk **Reference** for å se referansen fra sak/arkivsystemet.

![](/images/eformidling/api_gui_example.png)

> NB! En må kunne nå integrasjonspunktet enten direkte på server eller via URL fra den datamaskinen eller server du benytter. 

### Forklaring til grensesnittet

- **Id:** dette er messageID - se mer info [her](https://difi.github.io/felleslosninger/eformidling_nm_message.html#messageid)

- **Title:** tittelen på dokumentet som er sendt.

- **Date:** tid og dato for forsendelsen.

- **Sender:** avsender av forsendelsen.

- **Receiver:** mottaker av forsendelsen.

- **Reference:** messageReference hentet fra sak/arkiv.

- **Type:** hvilken type forsendelse det er. Se [terminologi](https://difi.github.io/felleslosninger/eformidling_api.html#terminologi)

- **Last status:** nåværende status på forsendelsen.

> NB! Det blir logget forskjellige statuser avhengig av om en er mottaker eller avsender av en forsendelse. Disse finner du [her](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html).

### Fargekoder

- <span style="color:red">*RØD*</span> = denne forsendelsen har feilet
- <span style="color:#DAA520">*GUL*</span> = denne forsendelsen er ikke fullført enda.
- <span style="color:green">*GRØNN*</span> = denne forsendelsen er levert og fullført.

> NB! En liten bug gjør at DPV forsendelser ikke får GRØNN farge selv om forsendelsen har status LEVERT. Dette vil bli rette så snart som mulig (versjon 2.0.8) og har kun estetisk betydning. Om DPV forsendelser har status LEVERT er de kommet frem.

### Søkefunksjonen

I søkefeltet kan en frisøke etter data som ligg under verdiane nevnt over. I tillegg kan en skille mellom inngående og utgående traffikk, samt søke etter dato.

BildeEks på søk inn her

En kan også søke på flere verdier ved hjelp av logiske operatorer. 

- **&&** betyr 'og'. 
Denne returnerer alle forsendelser der begge verdier stemmer.
- **||** betyr 'eller'.
Denne returner alle forsendelser der en av verdiene stemmer.

BildeEks på søk med operatorer inn her

> Skulle det være ting som er uklart når det kommer til bruk av det grafiske brukergrensesnittet, send gjerne en epost til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>.

---

## Sjekke forsendelser - API-testverktøy

### Før du starter

- Sørg for at du kan nå integrasjonspunktet enten direkte på server eller via URL fra den datamaskinen eller server du benytter. 
- Du må ha en nettleser eller et API-testverktøy (f.e. Postman via GET request) for å spørre mot APIet.
- Eksempel på forespørsel mot lokalt integrasjonspunkt API ```http://localhost:9093/api/conversations```. En kan også benytte servernavn eller en eksponert url. ```https://test-ip-leik-meldingsutveksling.dificloud.net/api/messages/in```
- Om du sletter activemq-data mappe eller database-filer som ligger i integrasjonspunktet hovedmappen, vil du ikke finne data. Informasjon og statuser om forsendelser blir lagret der.

### Hente alle forsendelser

> /api/conversations

> Eksempel: ```localhost:9093/api/conversations```

På dette endepunktet kan en se alle innkommende og utgående forsendelser via dette integrasjonspunktet, slik som i det grafiske brukergrensesnittet. Innholdet blir vist på JSON-format og er lett tilgjengelig for maskinlesing. 

Hver blokk inneholder én forsendelse (id), og kan fortelle viktige ting som: hvem avsender er, hvem mottaker er, tjeneste/forsendelsesmåte, ```meldingsId```, forsendelsesId, forsendelsestidspunkt, [status](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html) på forsendelsen. 

Det er viktig å forstå at statusene her forteller hvor langt forsendelsen er kommet og om mottaker har mottatt forsendelsen eller forsendelsen har feilet. Dette kan benyttes som et verktøy for å spore forsendelsen om den er kommet frem til mottaker. Se lenken over for å finne en liste over statuser for alle typer tjenester. 

> Merk: Én ```conversationId``` har én eller flere ```messageId```'er knyttet til samme forsendelse/konversasjon.

### Ikke ennå levert forsendelse
![](/images/eformidling/api_conv_unfinished.PNG)

Den enkleste måten å sjekke om en forsendelse fortsatt er under sending er å se om ```finished``` parameter er satt til false.

Markert på linje 7 og 8 er ```senderIdentifier``` og ```receiverIdentifier``` som er organisasjonsnummeret til avsender og mottaker hendholdvis. På linje 15 er ```serviceIdentifier``` satt til DPO som betyr at denne forsendelsen gikk via DPO. Linje 14 indikerer at ```direction``` = ```INCOMING``` som betyr at dette er en innkommende forsendelse, på utgående forsendelser vil ```direction``` være ```OUTGOING```. 

På linje 16 starter ```messageStatuses``` som inneholder alle statuser registrert for denne DPO forsendelsen i kontekst av dette integrasjonspunktet (den andre parten i forsendelsen kan ha [andre statuser](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#dpo-statuser)). For denne forsendelsen er statusene ```OPPRETTET``` og ```INNKOMMENDE_MOTTATT``` registrert hos mottaker som betyr at avsender skal ha fått statuser oppdatert i sitt integrasjonspunkt. Denne forsendelsen er ikke fullført ennå.


### Levert forsendelse 
![](/images/eformidling/api_conv_delivered.PNG)

Her er en utgående DPO forsendelse indikert ved ```direction``` = ```OUTGOING``` og ```serviceIdentifier``` = ```DPO```. Her ser vi at statusene har blitt oppdatert henholdsvis ```OPPRETTET``` , ```SENDT```, ```MOTTATT``` og ```LEVERT```. Legg merke til at ```OPPRETTET``` og ```SENDT``` kommer med ca 1 sekunds mellomrom, men ```MOTTATT``` og ```LEVERT``` har flere minutter imellom. Dette kan skyldes flere forskjellige ting, f.e. at mottaker sitt integrasjonspunkt er av, eller at sak-arkivsystem ennå ikke har importert forsendelsen, men i dette eksempelet ble de siste to stegene [manuelt utført](LINK TIL API/MESSAGES/IN/PEEK) med minutters mellomrom. Status ```LEVERT``` indikerer at denne forsendelsen er levert til mottakers sak-arkivsystem. 

### Feilet forsendelse

Forsendelser kan feile og disse vil få én av følgende statuser: ```LEVETID_UTLOPT``` ELLER ```FEIL```.

**LEVETID_UTLOPT**

[LEVETID_UTLOPT](https://difi.github.io/felleslosninger/eformidling_selfhelp_traffic_flow.html#feilstatus-levetid_utlopt) er en status som indikerer at forsendelsen har brukt for lang tid, og leveransen har blitt forkastet.

![](/images/eformidling/api_conv_ttl.PNG)

Legg merke til at utløpstid er satt på linje 13 i feltet ```expiry```, og dette tidspunktet kan sammenliknes med tidspunkt for opprettelse av forsendelsen, altså når integrasjonspunktet mottok forsendelsen og status ble satt til ```OPPRETTET```. Her er var forsendelsen i live i 24 timer før den fikk status ```LEVETID_UTLOPT``` på linje 30. Hvor lenge en melding skal leve kan overstyres via properties, se lenken over. 

**FEIL**

Forsendelser kan feile av flere forskjellige årsaker og en kort beskrivelse blir ofte gjengitt som en del av statusmeldingen. 

![](/images/eformidling/api_conv_feil.PNG)

Her er et eksempel av en DPO forsendelse som feilet ved utsending og fikk aldri status ```SENDT```. I stedet fikk den status ```FEIL``` med en feilmelding som indikerer at integrasjonspunktet ikke klarer å levere forsendelsen til mottaker via DPO og at den blir flyttet til en DLQ.

### Flere conversations
![](/images/eformidling/api_conv.PNG)

Eksempel på hvordan et oppslag kan se ut med flere conversations delt opp i hver sin blokk med informasjon og statuser.

---

## Hente forsendelse på messageId 

> /api/conversations/messageId/{messageId}

> Eksempel: ```localhost:9093/api/conversations/messageId/91676206-2452-408b-994d-588466f17b81```

Det er mulig å slå opp én spesifikk conversation ved å bruke ```messageId``` som parameter i URL'en. Denne finner du på tredje linje i alle conversations, eventuelt ved å slå opp ```/api/conversations```.

![](/images/eformidling/api_conv_messageid.PNG)

Legg merke til at ```messageId``` på linje 4 er brukt som parameter i URL'en og at en med den kan hente hele conversation for gitt ```messageId```. Denne forsendelsen er en opplasting til eInnsyn indikert av linje 12 og 13 ved ```direction``` = ```OUTGOING``` og ```serviceIdentifier``` = ```DPE```. Status indikerer at meldingen har kun blitt sendt, men mottaker har ikke svart enda. Det kan være fordi meldingen ikke er hentet ned fra servicebus og dermed ikke prosessert av mottakende integrasjonspunkt sentralt i eInnsyn. 

Både ```senderIdentifier``` og ```receiverIdentifier``` er satt til samme organisasjon, det er tilfeldigvis fordiDigitaliseringsdirektoratet er databehandler for journalposter som lastes opp på www.einnsyn.no . Det er også fullt mulig å sende DPO-meldinger til seg selv. 

## Hente statuser

> /api/statuses

> /api/statuses/{```messageId```}

> Eksempel: ```localhost:9093/api/statuses``` og ```localhost:9093/api/statuses/bf7df551-c811-4822-bccb-c88885a666e8```

Dette API-kallet viser statuser og tilhørende ```conversationId``` og ```messageId```. En kan se hvilke statuser som henger sammen ved å se nummeret indikert av ```convId``` feltet. 

### Hente status med ```messageId```

![](/images/eformidling/api_status_id.PNG)

Legg merke til at dette oppslaget på en gitt messageId har statusene ```OPPRETTET```, ```INNKOMMENDE_MOTTATT``` og ```LEVETID_UTLOPT```. Alle har lik ```conversationId``` og ```convId``` som indikerer at de henger sammen i en forsendelse. ```Pagable``` viser hvor mange elementer og sider som er i dette søketreffet. 

### Hente alle statuser

![](/images/eformidling/api_status.PNG)

Dette oppslaget lister ut alle registrerte statuser på alle forsendelser via dette integrasjonspunktet. Her er ikke nødvendigvis alle statuser i samme forsendelse i rekkefølge, det kan være andre som har blitt registrert før neste status kommer. Bildet viser tre statuser med  ```convId``` = ```2``` før to statuser fra en annen forsendelse med ```convId``` = ```9``` før forsendelsen med ```convId``` = ```2``` får status ```LEVERT```. 

## Innkommende meldinger
> /api/messages/in

> /api/messages/in/peek

> /api/messages/in/pop/{```messageId```}

> /api/messages/in/{```messageId```} (DELETE-request)


*Kommer*

--- 

## Utgående meldinger
> /api/messages/out

> /api/messages/out/{```messageId```}

> [Se her for opprett og send](https://difi.github.io/felleslosninger/eformidling_nm_restdocs.html##messages-out-create)

*Kommer*

---

