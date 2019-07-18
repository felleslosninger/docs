---
  
title: Meldingsstruktur  
permalink: sdp_meldingsstruktur.html
sidebar:
---

## {{page.title}}

En Digitalpost forsendelse består av et hoveddokument med vedlegg.  
Disse dokumentene er beskyttet med kryptering og signering ende til ende
for å sikre konfidensialitet og integritet hele veien fra Avsender til
Mottaker.  
Hoveddokumentet med vedlegg er pakket inn som
[Dokumentpakke((Asic))](Dokumentpakke/)

Sammen med Dokumentpakken består Digitalpost forsendelse av en
beskrivelse av forsendelsen.  
Dette er behandlingsregler som Postkasseleverandør skal bruke for å
presentere og behandle den digitale postforsendelsen til Mottaker.  
Dette er [StandardBusinessDocument](StandardBusinessDocument/), som er
signert/integritetsbeskyttet fra Avsender til Postkasseleverandør.

ebMS 3.0 er brukt som
[meldingsutvekslingsrammeverk](Meldingsutveksling/) fra Avsender til
Meldingsformidler.  
Så [eb:Messaging](Messaging) og [Webservice
security](WebserviceSecurity) er signert/integritetsbeskyttet punkt til
punkt.

![](meldingsstruktur_enkel.jpg)
