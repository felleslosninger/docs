---
title: Utvida møteavlevering med fleire eigenskapar
description:
summary:
permalink: utvida_moeteavlevering.html
sidebar: einnsyn_technical_sidebar
---
## Utvida møteavlevering med fleire eigenskapar

For å støtte enkelte scenario rundt møteavlevering, er det identifisert nokon behov for utvidingar eller tilpasningar på korleis ein brukar Noark datamodellen no. I så stor grad som råd tek ein høgde for å bruke eksisterande felt som ligg i Noark der det allerede er moglegheit å legge inn den ønska informasjonen, men som det ikkje er nokon obligatoriske krav knytta til.  I eit tilfelle har ein sett det nødvendig å lage til nytt felt, då det ikkje eksisterar alternativ ein kan bruke.




### Bruk av møtesakstype i Møtesaksregistrering
Møtesaksregistering er dokument som høyrer til sakslista i eit møte. Sjølve møteregistreringa vil ha «referanseTilMøtesak» som peikar til den aktuelle journalposten som er det faktiske saksframlegget til saken. Denne journalposten vil ha journalposttype sett til saksfremlegg

Sjølve møtesaksregisterering kan ha ulik type. Spesifisert ved moetesakstype

Dette kan t.d vere

* Politisk sak
* Delegert møtesak
* Referatsak
* Interpellasjon



Møtesaksregistreringa er sjølve behandlinga av ei sak til eit møte.  Kvar behandling kan ha eigne vedtak. Kopla til denne møteregistreringa/behandlinga vil det derfor typisk ligg eigne dokument.  Dette vil vere vedtak, vedlegg til vedtak m.m



Spesifisering av desse typane legg ein inn dokumentbeskrivelsen.

I feltet dokumenttype i dokumentbeskrivelsen kan ein då legge inn verdiar som

* Vedtak
* Vedlegg til vedtaket



Dette er valgfrie verdiar




### Rekkefølge på saksframlegg
Det kan ofte vere ønskeleg å spesifisere i rekkefølge i sakslista, som ikkje direkte følger dokumentnummeret møtesaksregistreringa har inne i møtemappe.  For å få til dette, så definerar ein eit eige felt, utanom Noark-standarden.

På Møtesaksregistreringa vil ein då legge inn nummeret i behandlingsrekkefølge i feltet moetesaksnummer.

Rekkefølgen på sjølve vedlegga vil følge Noark-standarden med bruk av dokumentnummer




### Status på møtebehandling
Behovet er for å synleggjere om ein behandling av ei sak er den endelege behandlinga. Og på så måte synleggjere og vekte denne behandlinga tydlegare.  Til dette finst moeteregistreringsstatus som finst på møtesaksdokument  Her kan det leggast inn verdien "Ferdig behandlet”.



### Møtedokumentregistreringstypar
Dette er registreringar som inneheld informasjon om sjølve møtet.  

På møteredokumentregistreringa vert typen spesifisert i feltet moetedokumentregistreringstype.

Typiske verdiar her vil vere

* Protokoll

* Møtebok

* Vedlegg til protokoll

* Innkalling
