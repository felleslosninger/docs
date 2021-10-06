---
title: Aktører og roller
permalink: dpi_aktorer.html
sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)


## Aktør

Tabellen under inneholder en oversikt over hovedaktørene i prosessen med
å utveksle innbyggerpost som DPI-meldinger:

| Aktør     | Beskrivelse  |
| --- | --- |
| Offentlig virksomhet          | Offentlig virksomhet eller annen virksomhet som utfører en offentlig oppgave på vegne av en offentlig virksomhet |
| Tilbyder av aksesspunkttjenester | Peppol-sertifisert Service Provider (offentlig eller privat) som tilbyr aksesspunkttjenester for sending via Peppol |
| Tilbyder av postkassetjeneste | Virksomhet (offentlig eller privat) som tilbyr postkassetjenester, enten direkte eller via underleverandører |
| Tilbyder av utskriftstjeneste | Virksomhet (offentlig eller privat) som tilbyr utskriftstjeneste, enten direkte eller via underleverandører |
| Sentralforvalter              | Ansvarlig for forvaltning/kontroll av forholdet mellom offentlig virksomhet, mottaker og tilbydere av aksesspunkttjeneste/postkassetjeneste/utskriftstjeneste |
| Innbygger                     | Mottaker av innbyggerpost |



Begrepet **Ansvarlig enhet** har også blitt brukt:

\- **Ansvarlig enhet** brukes av **Behandlingsansvarlig** virksomheter
med et stort virkeområder som ønsker å differensiere Avsendere til
Innbygger avhengig av de interne enhetene som sender posten, i de
tilfeller der det ikke er mulig eller lite hensiktsmessig at interne
enheten selv er identifisert som behandlingsansvarlig (ved å ha et eget
sertifikat).  
**Ansvarlig enhet** blir satt av **Behandlingsansvarlig** ved bruk av en
identifikator. Dette gjøres som en del av klargjøring av innbyggerpost.  
Eksempel: Behandlingsansvarlig er NAV og Ansvarlig enhet er NAV
Hjelpemiddelsentral Oslo og Akershus.

## Roller
| Rolle    | Beskrivelse    |                                   
| --- | --- |
| Avsender\[1\]             | Offentlig virksomhet som skal sende innbyggerpost |
| Behandlingsansvarlig\[1\] | Offentlig virksomhet som produserer innbyggerpost som skal fomidles. Vil i de aller fleste tilfeller være synonymt med Avsender |
| Databehandler\[1\]        | Virksomhet (offentlig eller privat) som har en kontraktfestet avtale med Behandlingsansvarlig med formål å dekke hele eller deler av prosessen med å formidle innbyggerpost fra Behandlingsansvarlig til avsenders Service Provider. Det kan være flere databehandlere som har ansvar for forskjellige steg i prosessen med å formidle innbyggerpost. |
| Service Provider for avsender i hjørne1        | Avsenders Peppol-sertifiserte avtalepart for mottak og formidling av innbyggerpost formidlet gjennom Peppol. |
| Service Provider for tjenesteleverandør i hjørne4        | Tjenesteleverandørs Peppol-sertifiserte avtalepart for mottak og formidling av innbyggerpost formidlet gjennom Peppol. |
| Postkasse            | Tjenesteleverandør i hjørne4. Ansvarlig for å tilgjengeliggjøre og oppbevare post til mottaker, samt å varsle mottaker når det er kommet ny post., eventuelt: Ansvarlig for print og forsendelse av papir post til mottaker. |
| Utskriftstjeneste           | Tjenesteleverandør i hjørne4. Ansvarlig for utskrift på papir og forsendelse av innbyggerpost. |
| Mottaker                  | Innbyggeren som er mottaker av innbyggerpost |



<!-- TODO: Bør inn med figur som viser samanhengen -->
<!-- TODO:Endre linkingen -->
1.  Avsenderrollen kan være en sammensatt rolle bestående av Avsender,
    Behandlingsansvarlig og/eller en eller flere databehandlere. For å
    forenkle dokumentasjonen er denne kompleksiteten skjult bak rollen
    Avsender, med egne kommentarer i de tilfeller der flere aktører i
    rollen Avsender medfører utfordringer.



