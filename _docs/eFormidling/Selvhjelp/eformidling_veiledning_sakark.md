---
title: Tjenester
keywords: tjenester, dpo, dpi, dpv, dpf, dpe
tags: [dpo, dpv, dpi, dpe, dpf, dpi]
summary: "Oversikt over forkjellige tjenester du kan nå med integrasjonspunket"
sidebar: eformidling
permalink: eformidling_veiledning_sakark.html
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden vil inneholde informasjon om konfigurasjon som må gjøres i det enkelte sakarkiv system

## ePhorte
Ingen informasjon d.d

## P360

### UTGÅENDE INNSTILLINGER

Innstillinger for utgående meldinger kan endres her:
* Logg inn på server test-sakark01 med bruker difi\sakark_inst
* Dobbeltklikk på 360SnapIn.msc som du finner på skrivebordet.
* Velg 360 Code Table Editer på venstre menyen
* Deretter Document Dispatch Channel på høyre siden

Format: 

![ChanellData](/images/eformidling/ChannelData.png)

* Trykk på «Channel Data» kolonnen i BEST/EDU raden og legg inn riktig web service URL og kryss av for Update all languages.

Format: 

![SnapIn](/images/eformidling/SnapIn.png)

* Etter endringen, kjør en iisreset via CMD

Format: 

![iisreset](/images/eformidling/iisreset.png)


### INNKOMMENDE INNSTILLINGER

For innkommende meldingen skal følgende service brukes.
http://<maksinnavn>:8088/SI.WS.Core/Integration/EDUImport.svc/EDUImportService
Importen bør utføres med bruker <domene>\svc_sakark

## WebSak

Ingen informasjon d.d

---
