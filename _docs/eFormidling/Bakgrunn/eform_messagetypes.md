---
title: Meldingstyper og flyt
description: Oversikt over meldingstyper/mottaks plattformer supportert av integrasjonspunktet og hvordan meldinger formidles til disse
summary: "Informasjon om hvordan man kommer igang med eformidling"
permalink: eform_messagetypes.html
product: eFormidling
---

I flytene nedenfor er det for tydeliggjøre de sentrale kompoentene i flyten fjernet autentisering/autorisering mot SR samt oppdatering av statusdatabasen.  
I flytene under vises også flytene synkront, og ikke asynkront med kø som er standard i integrasjonspunktet. Dette også for å fokusere på det sentrale i flyten.
En generell flyt der asynkronitet, autentisering/autorisering og statusdatabase er inkludert kan sees i bunn av denne siden

Oppslaget for adressering er også generalisert ved komponenten ServiceRegistry (SR). I virkligheten er skjer det i bakant av denne oppslag i en rekke register for å avgjøre hvordan meldingen skal routes. For nærmere beskrivelse se [ServiceRegistry]().



## Digital post offentlige virksomheter (DPO)

DPO meldinger er meldinger der både avsender og mottaker har integrasjonspunkt.
Sak-/Arkivsystemet starter prosessen med å sjekke om mottaker kan motta melding med tjenesten GetCanReceive. Integrasjonspunktet returnerer true dersom den SR returnerer DPO egenskapen. Sak-/Arkivsystemet vil deretter kalle tjenesten PutMessage med meldingen som ønskes sendt. Den mottatte meldingen valideres og pakkes i en ASiC konteiner, som krypteres og legges til SBD meldingen. SBDH fylles ut med adresseringsinformasjon, og hele meldingen signeres. Meldingen lastes deretter opp på AltInns formidlingstjeneste.
Mottakende integrasjonspunkt puller sin "meldingsboks" på AltInns formidlingstjeneste. Dersom den finner ny melding lastes denne ned, pakkes ut, signaturer valideres og payload dekrypteres. Deretter hentes BestEdu meldingen ut fra ASiC kontaineres. Mottakers integrasjonspunkt kaller mottakers Sak-/Arkivsystems PutMessage med BestEdu medlingen. Mottakers Sak-/Arkivsystem sender en AppReceipt ved hjelp av ny PutMessage som kvittering på mottak av meldingen. Denne formidles tilbake til avsender som andre meldinger mellom integrasjonspunktet.
