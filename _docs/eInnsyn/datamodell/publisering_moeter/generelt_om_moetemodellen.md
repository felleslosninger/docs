---
title: Generelt om møtemodellen
description:
summary:

sidebar: einnsyn_technical_sidebar
---

## Generelt om møtemodellen
Møtedatamodellen bygger på slik den er i Noark 5. Denne modellen er veldig forenkla i forhold til tidlegare Noark-versjonar, og bygger på nokre
klassar som arvar registrering- og mappe-klassane i den generelle Noarkmodellen.

Det er gjort ei generell tilpassing.  Typen *møteregistrering* er delt opp i møtedokumentregistrering og møtesaksregistrering. Møtedokumentregistrering er
typisk forekomstar av innkallingar, protokollar osv. Medan møteasaksregistrering er sjølve saksframlegga
![Overornda datamodell møter]({{site.baseurl}}/images/einnsyn/einnsynn_moetemodell_overordna.png)


## Bruk av modellen
![Overornda datamodell møter]({{site.baseurl}}/images/einnsyn/einnsyn_bruk_av_moetedatamodell.png)

## Prioritering av møter ved sending
I mottak på eInnsyn er det oppretta ein eigen inn-kø for møter. Dette er for å øke gjennomstrømning av for møteavlevering.

For å ta i bruk denne så må ein ved sending over integrasjonspunktet endre prosesstype til *meeting*, der det i dag er *journalpost*.

![Dataflyt ved overlevering]({{site.baseurl}}/images/einnsyn/moetekoe.png)

[Verdiar og felt ligg her](https://docs.digdir.no/eformidling_nm_message.html#einnsyn)
