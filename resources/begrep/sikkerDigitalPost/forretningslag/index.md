-----

layout: default  
title: Forretninglag  
headtitle: Digital postkasse til innbyggere  
group: forretningslag

id: Forretningslag

next: Forretningslag/Aktører

children:  
\- name: Forretningslag/Aktører  
\- name: Forretningslag/Forretningsprosess  
\- name: Forretningslag/SendForAndre  
\- name: Forretningslag/Forretningsprosess\_kvittering  
\- name: Forretningslag/Tilstand  
\- name: Forretningslag/Forretningsmeldingsstruktur  
\- name: Forretningslag/ForsendelsesStørrelse

-----

## Forretningslag

Forretningslaget dokumenterer den logiske flyten av meldinger i
infrastrukturen, inkludert oversikt over aktører, roller og prosesser.  
I tillegg er det dokumentert hvilke tilstander og overganger en Avsender
må forholde seg til, samt fordeling av eierskap på de forskjellige
delene av en komplett melding.

|                                                      |                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| [Aktører](Aktorer)                                   | Aktører og roller                                                           |
| [Sending av digital post](forretningsprosess)        | Sending av digital post til innbyggere                                      |
| [Sending på vegne av andre](send_paa_vegne_av_andre) | Sending av digital post på vegne av andre                                   |
| [Kvitteringer](forretningsprosess_kvittering)        | Henting av kvitteringer                                                     |
| [Struktur på melding](meldingsformat)                | ebMS Signalmessage brukt for henting av kvitteringer og signalering av feil |
| [Pris og størrelse](meldingsstorrelse)               | Priser og utregning av meldingsstørrelse                                    |
