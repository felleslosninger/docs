---
title: FAQ - publisering einnsyn API
description:
summary:

sidebar: einnsyn_sidebar
redirect_from: /publisering_med_api
---

# eInnsyn REST API – FAQ for utviklere

Vanlige feil og misforståelser ved overgang fra Noark eller JsonLD til REST API.

---

## Publisering

### Hvilke felter fra JSON-LD/Noark finnes ikke i REST API-et?

Disse feltene finnes i eInnsyn JSON-LD-modellen eller Noark 5, men er **ikke en del av eInnsyn REST API-modellen** og skal ikke inkluderes i request body:

| Felt (JSON-LD / Noark 5)      | Hvorfor det ikke finnes i REST API                                      |
|-------------------------------|-------------------------------------------------------------------------|
| `journalstatus`               | Ikke eksponert — håndteres internt av eInnsyn                           |
| `opprettetDato`               | Ikke i bruk — eInnsyn bruker andre datofelter (f.eks. `journaldato`, `dokumentetsDato`) |
| `saksbehandler_SENSITIV`      | Ikke innført — se eget avsnitt om saksbehandler nedenfor                |
| `variantformat`               | Ikke støttet på `Dokumentobjekt` i REST API                             |
| `versjonsnummer`              | Ikke støttet på `Dokumentobjekt` i REST API                             |

---

### Hva er forskjellen på feltnavn i Noark 5, eInnsyn JSON-LD og eInnsyn REST API?

Feltnavnene varierer mellom de tre modellene. Tabellen under viser kjente avvik:

| Noark 5                        | eInnsyn JSON-LD                         | eInnsyn REST API                    | Merknad |
|--------------------------------|-----------------------------------------|-------------------------------------|---------|
| `systemID`                     | `arkiv:systemID`                        | `systemId`                          | camelCase uten stor I |
| `offentligTittel`              | `arkiv:offentligTittel`                 | `offentligTittel`                   | |
| `offentligTittel` (skjermet)   | `arkiv:offentligTittel_SENSITIV`        | `offentligTittelSensitiv`           | Sensitiv som suffiks, ikke `_SENSITIV` |
| `tittel` (skjermet)            | `arkiv:tittel_SENSITIV`                 | `tittelSensitiv`                    | Kun på `Moetemappe` o.l., **ikke** på `Dokumentbeskrivelse` |
| `korrespondansepartNavn` (skj.)| `arkiv:korrespondansepartNavn_SENSITIV` | `korrespondansepartNavnSensitiv`    | |
| `saksbehandler` (skjermet)     | `arkiv:saksbehandler_SENSITIV`          | *finnes ikke — se nedenfor*         | Se avsnitt om personnavn |
| `møtesakssekvensnummer`        | `arkiv:møtesakssekvensnummer`           | `moetesakssekvensnummer`            | Norske tegn erstattes |
| `møtesakstype`                 | `arkiv:møtesakstype`                    | `moetesakstype`                     | |
| `møtesaksår`                   | `arkiv:møtesaksår`                      | `moetesaksaar`                      | |
| `møtedokumentregistreringstype`| `arkiv:møtedokumentregistreringstype`   | `moetedokumenttype`                 | Forkortet navn |
| `referanseTilMøtesak`          | `arkiv:referanseTilMøtesak`             | `legacyReferanseTilMoetesak`        | Annet navn, kun string (ikke objekt) |
| *(registreringer i møtemappe)* | `møtesaksregistrering` / `møtedokumentregistrering` | `moetesak` / `moetedokument` | Forkortet navn |

> **Lenker til standarder:**
> - Noark 5 metadatakatalog (Arkivverket): [arkivverket.no](https://www.arkivverket.no/forvaltning-og-utvikling/noark-standarden/noark5-standarden)
> - eInnsyn REST API TypeSpec: [github.com/felleslosninger/einnsyn-api-spec](https://github.com/felleslosninger/einnsyn-api-spec)

---

### Hvilke enum-verdier for `moetesakstype` er gyldige?

REST API-et bruker kortere verdier enn JSON-LD-modellen for enkelte typer:

| eInnsyn JSON-LD   | eInnsyn REST API |
|-------------------|------------------|
| `orienteringssak` | `orientering`    |
| `referatsak`      | `referat`        |

Fullstendig liste over gyldige verdier i REST API: `moete`, `politisk`, `delegert`, `interpellasjon`, `godkjenning`, `orientering`, `referat`, `annet`.

---

### Hvordan håndteres personnavn ulikt i Noark 5 vs. eInnsyn?

Dette er en viktig forskjell mellom Noark 5 og eInnsyn (både JSON-LD og REST API):

**I Noark 5** brukes «tagging» av personopplysninger: sensitiv informasjon som personnavn markeres inline i tekstverdier ved hjelp av skjermingsfunksjonalitet, slik at systemet kan filtrere dem bort fra offentlig journal.

**I eInnsyn (JSON-LD og REST API)** er tilnærmingen annerledes: feltene finnes i to varianter — ett ikke-sensitivt og ett sensitivt — og begge er påkrevd. Navngivningen kan virke kontraintuitiv: det er det **sensitive feltet** som alltid vises på frontend, men feltene brukes ulikt i søket:

- Det **ikke-sensitive feltet** (f.eks. `korrespondansepartNavn`, `offentligTittel`) er søkbart de **første 12 månedene** etter publisering, og kan inneholde personnavn. Dette gjør journalen fullt søkbar i den perioden dokumentet typisk er aktivt i saksbehandling.
- Det **sensitive feltet** (f.eks. `korrespondansepartNavnSensitiv`, `offentligTittelSensitiv`) vises alltid på frontend, og tar over som søkefelt **etter 12 måneder**. Det bør derfor *ikke* inneholde personnavn, slik at personnavn ikke lenger er søkbart etter at fristen har løpt ut.

Datoen som styrer skiftet mellom søkefeltene er `publisertDato` — ikke `journaldato` eller andre datoer fra kildesystemet.

**`saksbehandler` eksponeres ikke i eInnsyn** — verken på frontend eller i API-et. Feltet sendes kun med i innsynskrav og er ikke synlig for sluttbrukere. Det finnes derfor heller ikke et `saksbehandlerSensitiv`-felt.

---

## Dokumenthåndtering

### Hvorfor blir det publisert to dokumenter på én dokumentbeskrivelse?

eInnsyn oppretter ett dokument per `dokumentobjekt` under en `dokumentbeskrivelse`. Hvis samme `systemId` brukes på en `dokumentbeskrivelse` i to separate objekter (f.eks. i to forskjellige møtesaker), men `dokumentobjekt`-innholdet er ulikt i de to, vil begge `dokumentobjekt`-ene bli knyttet til samme dokumentbeskrivelse — og resultatet blir to dokumenter under én beskrivelse.

**Løsning:** Sørg for at hver `dokumentbeskrivelse` som representerer et unikt dokument har sin egen unike `systemId`. Bruk UUID v4.

> **Merk:** Hvis to møtesaker skal referere til *nøyaktig samme dokument* (identisk `dokumentbeskrivelse` og `dokumentobjekt`), er det derimot korrekt å gjenbruke samme `systemId` — eInnsyn vil da behandle det som én entitet uten dobbeltpublisering.

---

### Kan to dokumentbeskrivelser peke på samme fil?

Ja. `dokumentobjekt` inneholder kun en fysisk filreferanse (`referanseDokumentfil` + `format`) og har ingen `systemId`. Det er fullt gyldig at flere dokumentbeskrivelser peker på samme URL — dette skaper ingen konflikter i eInnsyn.

---

## systemId og konflikter

### Hvorfor får jeg konfliktfeil på `systemId`?

eInnsyn bruker `systemId` som unik nøkkel for å identifisere og oppdatere entiteter. Hvis en `systemId` allerede eksisterer i systemet fra en tidligere publisering, vil API-et avvise eller knytte objektet til den eksisterende entiteten.

**Løsning:** Generer alltid nye UUID v4-verdier for nye publiseringer. Gjenbruk av `systemId`-er fra testmiljø, eksempelfiler eller tidligere publiseringer er en vanlig feilkilde.
