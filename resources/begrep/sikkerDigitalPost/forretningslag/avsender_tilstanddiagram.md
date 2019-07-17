---
 
title: Tilstander for Avsender  
permalink: sdp_avsender_tilstanddiagram.html
sidebar:
---

## Tilstander for Sikker digital postforsendelse hos Avsender

Under er en beskrivelse av tilstanden for en forsendelse sett fra
Avsender. Målsetningen med tilstandsdiagrammet er å gi Avsendere en
forståelse av hvilke prosesser og rutiner som bør etableres ved
integrasjon mot Sikker digital post.

[![Utkast til tilstandsdiagram for prosess hos
avsender](tilstander_avsender.png
"Utkast til tilstandsdiagram for prosess hos avsender")](tilstander_avsender.png)

### Tilstander

| Tilstand  | Beskrivelse | Lenker   |
| --- | --- | --- |
| Start             | Avsender må klargjøre posten før sending i henhold til ekspederingsprosessen.                                                                                                   | ekspedere post                   |
| Sendt             | Avsender har sendt meldingen vellykket til Meldingsformidler. Meldingsformidler har nå ansvar for å få levert meldingen til Postkassen.                                         |                                  |
| Transportfeil     | Avsender får transportfeil ved sending av digital post til Meldingsformidler. Posten vil ikke blir tilgjengeliggjort og Avsender er ansvarlig for å resende posten              | ebMS/meldingsutveksling          |
| Sending OK        | Avsender har mottatt en Leveranse kvittering fra Postkasseleverandør som garanterer for at posten vil tilgjengeliggjøres og at Innbygger vil bli varslet                        | Leveransekvittering              |
| Melding åpnet     | Avsender har i den digital postforsendelsen påkrevd at Innbygger skal sende en åpningskvittering. Innbygger har akseptert at kvittering skal sendes tilbake og nå åpnet posten. | Åpningskvittering                |
| Feil registrert   | Avsender mottar en Feilmelding fra Postkasseleverandør. Feilen må avvikshåndteres og skal ikke resendes.                                                                        | Feilmelding , Avvikshåndtering   |
| Avvikshåndtering  | Feilmeldingen mottatt har informasjon om feilen må rettes av Avsender eller Sentralforvalter. Feil rapporteres som avtalt i bruksvilkår for Sikker digital post                 | samarbeidsportalen , Feilmelding |
| Melding avsluttet | Avsender avslutter meldingen enten ved at den er sendt vellykket eller ved at en feil er avvikshåndtert og eventuell ny post sendt                                              |                                  |

### Overganger

| Overganger         | Beskrivelse    | Lenker       |
| ---| --- | ---|
| Send melding       | Avsender sender Digital post til Meldingsformidler                                                                                                  | Transport, Prosessbeskrivelse, DigitalPostmelding |
| Sending feilet     | Avsender får ikke en vellykket transport kvittering fra meldingsformidler                                                                           | ebMS                                              |
| Resending          | Avsender har håndtert transportfeilen enten ved å rette feil i eget system eller igjennom dialog med Sentralforvalter                               | samarbeidsportalen                                |
| Kvittering mottatt | Avsender mottar en Leveransekvittering fra postkasseleverandør                                                                                      | Leveransekvittering                               |
| Feilmelding        | Avsender mottar en Feilmelding fra Postkasseleverandør                                                                                              | Feilmelding                                       |
| Kvittering mangler | Avsender skal få en Leveransekvittering fra Postkasseleverandør. Når dette ikke mottas må Avsender forvente at det har oppstått en feil.            | Avvikshåndtering                                  |
| Varsling feilet    | Avsender mottar en Varslingfeilet kvittering fra Postkasseleverandør. Varslinger til Innbygger er dermed ikke utført som avtalt og må feilhåndteres | VarslingfeiletKvittering                          |
| Åpningskvittering  | Avsender mottar en Åpningskvittering. Innbygger har åpnet posten.                                                                                   | Åpningskvittering                                 |
