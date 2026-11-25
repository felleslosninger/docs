---
title: FAQ – Innsynskrav til flere systemer
sidebar: einnsyn_sidebar
redirect_from: /innsynskrav_flere_mottakssystemer_faq
---

Denne siden er for virksomheter som har **flere systemer som tar imot innsynskrav**, typisk:

- et **arkivsystem** som henter innsynskrav «på den gamle måten» som meldinger fra **integrasjonspunktet** (eFormidling), og
- ett eller flere **fagsystemer** som henter innsynskrav fra **eInnsyn API**.

Begge kanalene inneholder innsynskrav for *hele* virksomheten. Hvert system må derfor selv sile ut de innsynskravene som gjelder journalposter det selv har publisert.

Se også [Henting av innsynskrav – API](henting_av_innsynskrav_api.html).

---

## Hvorfor får systemet mitt innsynskrav som ikke er til meg?

Et innsynskrav sendes til **virksomheten** (Enhet), ikke til et bestemt system. eInnsyn vet ikke hvilket av virksomhetens systemer som eier journalposten. Derfor vil:

- integrasjonspunktet inneholde innsynskrav både for arkivsystemet og for fagsystemene, og
- API-et gi tilgang til alle innsynskrav for virksomheten.

Hvert system må sjekke om journalposten innsynskravet gjelder, er en journalpost systemet selv har publisert.

## Hvordan vet et system hvilke innsynskrav det skal behandle?

Sammenlign journalposten i innsynskravet med det systemet selv har publisert. Aktuelle kjennetegn:

| Kjennetegn | Når det passer |
|---|---|
| `systemId` på journalposten (eller saksmappen) | Alltid – systemet kjenner sine egne ID-er. Sikreste metode. |
| `arkiv` / `arkivdel` | Når hvert system publiserer til egen arkivdel |
| `enhet` / `administrativEnhet` | Når systemet publiserer under en egen underenhet |

> **Tips:** Avtal internt hvilket kjennetegn som skiller systemene, slik at alle systemer bruker samme regel og ingen innsynskrav faller mellom to stoler.

---

## Integrasjonspunktet (eFormidling)

### Hvilke kall er de viktigste?

| Kall | Hva det gjør |
|---|---|
| `GET /api/messages/in/peek?process=<prosess>` | Låser og returnerer neste melding i køen (SBD). Bruk `process=process=urn:no:difi:profile:einnsyn:innsynskrav:ver1.0` for å filtrere på innsynskrav. |
| `GET /api/messages/in/pop/{messageId}` | Laster ned innholdet i den låste meldingen (ASiC). |
| `DELETE /api/messages/in/{messageId}` | Sletter meldingen fra integrasjonspunktet. Gjøres **etter** at meldingen er behandlet. |
| `GET /api/conversations` / `GET /api/statuses/{messageId}` | Sporing og status for meldinger. |

Se eksempel [her](https://docs.digdir.no/docs/eFormidling/Utvikling/Eksempel/innsynskrav).

### Hvordan ser arkivsystemet hvilke innsynskrav-meldinger som er til det?

Aktiver **utvidet order.xml (versjon 2)**. Standardversjonen (versjon 1) har bare saksnr., dokumentnr. og journalnr., og det kan være vanskelig å skille systemene på dem. Versjon 2 har i tillegg, for hvert dokument:

- `<fagsysteminfo>` med `<id>` og `<delId>`, hentet fra `systemId` på arkiv og arkivdel
- `<id>` og `<systemId>` for journalposten
- `<admEnhet>`

Dermed kan arkivsystemet sile på samme kjennetegn som fagsystemene bruker i API-et.

Versjon 2 slås på i **eInnsyn Admin** av en virksomhetsadministrator. Feltene kommer bare med hvis de var med da journalposten ble publisert. Se [Innsynskrav og e-postoppsett – Utvidet variant av order.xml](https://docs.digdir.no/docs/eInnsyn/einnsyn_innsynskrav.html).

Mer informasjon:

- [Integrasjonspunktets API – regelmessig henting av meldinger](https://docs.digdir.no/docs/eFormidling/Utvikling/integrasjonspunkt_eformidling2_api#regelmessig-henting-av-meldinger)
- [Fullstendig API-dokumentasjon (restdocs)](https://docs.digdir.no/docs/eFormidling/Utvikling/integrasjonspunkt_eformidling2_api_restdocs)
- [Sporing av meldinger](https://docs.digdir.no/docs/eFormidling/Selvhjelp/sporing.html)

### Må vi slette innsynskrav som ikke er til oss?

Det kommer an på hvor mange systemer som henter fra **samme** integrasjonspunkt:

- **Kun ett system henter fra integrasjonspunktet** (f.eks. bare arkivsystemet, mens fagsystemene bruker API-et): Systemet kan trygt gjøre `DELETE` på alle innsynskrav-meldinger, også de som gjelder fagsystemene. Fagsystemene får dem uansett fra API-et. Det er ikke nødvendig å spare på dem.
- **Flere systemer henter fra samme integrasjonspunkt**: Et system skal bare gjøre `DELETE` på meldinger det **selv** skal behandle. Meldinger som gjelder et annet system, hentes med `peek`/`pop`, men skal **ikke** slettes. Ellers forsvinner de før riktig system har fått hentet dem.

> **Merk:** Sørg for at alle innsynskrav-meldinger til slutt blir slettet av det systemet som eier dem, slik at køen på integrasjonspunktet ikke vokser.

### Vi bruker einnsyn-klienten. Kan andre systemer også hente innsynskrav fra integrasjonspunktet?

Ikke samtidig med at einnsyn-klienten henter innsynskrav. Klienten tar imot **alle** innsynskrav-meldingene på integrasjonspunktet og sender dem videre som e-post. Den siler ikke på system. Andre systemer som henter innsynskrav fra det samme integrasjonspunktet, kan derfor ikke regne med å få meldingene.

Velg én av disse løsningene:

- **einnsyn-klienten tar imot innsynskravene** (e-post til innsynskravadressen). Ingen andre systemer henter innsynskrav fra integrasjonspunktet. Fagsystemene henter sine innsynskrav fra API-et.
- **Arkivsystemet henter direkte fra integrasjonspunktet.** Slå av innsynskrav i einnsyn-klienten med `-Dapplication.retrieveInnsynskrav=false`. Se [Flere einnsyn-klienter på samme server](https://docs.digdir.no/docs/eInnsyn/einnsyn_flere_klienter.html).

Har dere flere einnsyn-klienter, skal bare én av dem hente innsynskrav.

**API-et påvirkes ikke** av dette. Fagsystemer som henter fra API-et, får alle innsynskrav uansett hvordan integrasjonspunktet og einnsyn-klienten er satt opp.

---

## eInnsyn API

### Må fagsystemet slette eller kvittere ut innsynskrav i API-et?

Nei. API-et er ikke en kø. Det finnes ingen `peek`, `pop` eller `DELETE` for innsynskrav. Innsynskravene ligger tilgjengelig i API-et i flere måneder, og fagsystemet bruker bare `GET`.

Fagsystemet må likevel:

1. sile ut innsynskravene som gjelder egne journalposter (se over), og
2. holde styr på hvilke innsynskrav det allerede har behandlet, slik at de ikke behandles to ganger.

### Hvordan henter vi bare nye innsynskrav?

Lagre ID-en (`ikd_...`) til det siste innsynskravet dere har behandlet, og hent bare innsynskrav som kommer etter denne:

```bash
curl -s "https://api.einnsyn.no/enhet/<enhet-id>/innsynskrav?sortOrder=asc&startingAfter=<siste-ikd-id>&expand=journalpost&limit=100" \
  -H "API-KEY: <din-nøkkel>"
```

- `sortOrder=asc` gir eldste først. Sett den eksplisitt.
- `startingAfter` er markøren: bare innsynskrav etter denne ID-en returneres.
- `expand=journalpost` tar med journalposten i svaret, slik at dere kan sjekke `systemId` uten ekstra kall.
- Følg `next` i svaret til det ikke er flere sider. Lagre så ID-en til det siste innsynskravet som ny markør.

Første gang (uten markør) kan dere utelate `startingAfter` og hente alt, eller starte fra et kjent innsynskrav.

### Hva er anbefalt flyt for et fagsystem?

```
1. Les lagret markør (siste ikd_-ID)
2. GET /enhet/{id}/innsynskrav?sortOrder=asc&startingAfter=<markør>&expand=journalpost
3. For hvert innsynskrav:
     - Er journalpost.systemId vår?  → behandle
     - Ikke vår?                     → hopp over
4. Følg next til siste side
5. Lagre ID-en til siste innsynskrav som ny markør
```

Markøren oppdateres for alle innsynskrav dere har *sett*, ikke bare de dere har behandlet. Ellers hentes de samme innsynskravene på nytt hver gang.

---

## Oppsummering

| | Integrasjonspunktet | eInnsyn API |
|---|---|---|
| Inneholder | Alle innsynskrav til virksomheten | Alle innsynskrav til virksomheten |
| Sile ut egne | Ja – aktiver order.xml v2 | Ja – bruk `expand=journalpost` |
| Hente | `peek` + `pop` | `GET` |
| Slette | `DELETE` – bare egne hvis flere systemer deler integrasjonspunktet | Ikke nødvendig/mulig |
| Unngå dobbeltbehandling | Meldingen slettes etter behandling | Lagre markør (`startingAfter`) |
| Med einnsyn-klienten | Bare klienten henter innsynskrav, ellers `retrieveInnsynskrav=false` | Ikke påvirket |
