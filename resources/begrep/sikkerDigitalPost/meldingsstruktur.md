---
  
title: Meldingsstruktur  
permalink: sdp_meldingsstruktur.html
sidebar:
---

En Digitalpost forsendelse består av et hoveddokument med vedlegg.  
Disse dokumentene er beskyttet med kryptering og signering ende til ende
for å sikre konfidensialitet og integritet hele veien fra Avsender til
Mottaker.  
Hoveddokumentet med vedlegg er pakket inn som
[Dokumentpakke((Asic))](forretningslag/Dokumentpakke/index.md)

Sammen med Dokumentpakken består Digitalpost forsendelse av en
beskrivelse av forsendelsen.  
Dette er behandlingsregler som Postkasseleverandør skal bruke for å
presentere og behandle den digitale postforsendelsen til Mottaker.  
Dette er [StandardBusinessDocument](forretningslag/StandardBusinessDocument/index.md), som er
signert/integritetsbeskyttet fra Avsender til Postkasseleverandør.

ebMS 3.0 er brukt som [meldingsutvekslingsrammeverk](transportlag/Meldingsutveksling/index.md) fra Avsender til
Meldingsformidler.  
Så [eb:Messaging](transportlag/Messaging.md) og [Webservice
security](../oppslagstjenesten/ws-security/WebserviceSecurity.md) er signert/integritetsbeskyttet punkt til
punkt.


![](../felleslosninger/meldingsstruktur_enkel.jpg)
