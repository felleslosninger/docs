---
title: Publisering med API
description:
summary:

sidebar: einnsyn_sidebar
redirect_from: /publisering_med_api
---

## API Spec
[einnsyn-api-spec](https://github.com/felleslosninger/einnsyn-api-spec)

Klientbibliotek:

[Java](https://github.com/felleslosninger/einnsyn-sdk-java)

[Typescript](https://github.com/felleslosninger/einnsyn-sdk-typescript)

# eInnsyn API – Hvordan publisere?

Denne dokumentasjonen beskriver hvordan du publiserer digitaliserte møter med tilhørende møtesaker til eInnsyn via REST-APIet.

- **Testmiljø:** `https://api.test.einnsyn.no`
- **Produksjon:** `https://api.einnsyn.no`
- **API-spesifikasjon:** https://github.com/felleslosninger/einnsyn-api-spec

---

## Steg 1 – Generer API-nøkkel

Begge miljøer bruker **Ansattporten** for å verifisere at du har tilgang til å administrere virksomheten din i eInnsyn. Fremgangsmåten er noe ulik for test og produksjon.

---

### Testmiljø (KT-miljøet)

Testmiljøet bruker **[TENOR](https://www.skatteetaten.no/testdata/)** for å simulere brukere og virksomheter. Du logger ikke inn som deg selv, men velger en syntetisk testbruker.

1. Gå til: `https://autorisasjon.test.einnsyn.no`
2. Velg **«Velg en tilfeldig daglig leder»** i TENOR-grensesnittet
3. **Noter ned** fødselsnummer og organisasjonsnummer til testbrukeren og virksomheten du får opp – dette blir din faste testbruker og testvirksomhet i eInnsyn KT-miljøet fremover
4. Velg virksomheten og gå til **API-nøkler**
5. Klikk **Generer ny nøkkel** og kopier nøkkelen – den vises bare én gang

---

### Produksjon

1. Gå til: `https://autorisasjon.einnsyn.no`
2. Logg inn som deg selv via **Ansattporten**
3. Velg din virksomhet og gå til **API-nøkler**
4. Klikk **Generer ny nøkkel** og kopier nøkkelen – den vises bare én gang

> **Har du ikke tilgang til virksomheten din?**  
> Du må ha fått delegert tilgang til enkelttjenesten **«Virksomhetsadministrering i eInnsyn»** i Altinn. Ta kontakt med tilgangsansvarlig eller daglig leder i din virksomhet for å få denne rettigheten delegert til deg, før du går videre.

---

> **Merk:** API-nøkkelen starter alltid med `secret_` og skal behandles som et passord.

Alle kall autentiseres med nøkkelen i headeren:

```
X-EIN-API-KEY: secret_...
```

---

## Steg 2 – Opprett Arkiv og Arkivdel

Arkiv og Arkivdel er toppnivå-strukturen som alt annet publiseres under. Disse opprettes én gang og gjenbrukes.

### POST Arkiv

```
POST /arkiv
```

```json
{
  "systemId": "din-uuid",
  "tittel": "Navn på arkivet"
}
```

### POST Arkivdel

Bruk `systemId` fra Arkiv i URL-en:

```
POST /arkiv/{systemId}/arkivdel
```

```json
{
  "systemId": "din-uuid",
  "tittel": "Navn på arkivdelen"
}
```

> Bruk alltid `systemId` (din egen UUID) som identifikator i URL-en til etterfølgende kall. APIet returnerer også sin egen `id` (prefiks `ark_` / `arkd_`), men `systemId` er enklere å forholde seg til i egen kode.

---

## Steg 3 – Publiser Saksmappe med Journalposter

En Saksmappe samler saksframlegg tilknyttet møtene. Journalpost, Dokumentbeskrivelse og Dokumentobjekt kan sendes i samme kall som Saksmappe.

```
POST /arkivdel/{systemId}/saksmappe
```

```json
{
  "systemId": "din-uuid",
  "offentligTittel": "Tittel uten sensitiv informasjon",
  "offentligTittelSensitiv": "Tittel inkl. sensitiv informasjon",
  "saksaar": 2024,
  "sakssekvensnummer": 1,
  "journalpost": [
    {
      "systemId": "din-uuid",
      "offentligTittel": "Saksframlegg – Møtesak 1",
      "offentligTittelSensitiv": "Saksframlegg – Møtesak 1",
      "journalposttype": "saksframlegg",
      "journalaar": 2024,
      "journaldato": "2024-01-15",
      "journalsekvensnummer": 1,
      "journalpostnummer": 1,
      "dokumentbeskrivelse": [
        {
          "systemId": "din-uuid",
          "tittel": "Saksframlegg",
          "tittelSensitiv": "Saksframlegg",
          "dokumentnummer": 1,
          "tilknyttetRegistreringSom": "hoveddokument",
          "dokumentobjekt": [
            {
              "systemId": "din-uuid",
              "referanseDokumentfil": "https://eksempel.no/dok/saksframlegg.pdf",
              "format": "pdf"
            }
          ]
        }
      ]
    }
  ]
}
```

### Nøkkelfelter

| Objekt | Påkrevde felt |
|---|---|
| Saksmappe | `offentligTittel`, `offentligTittelSensitiv`, `saksaar`, `sakssekvensnummer` |
| Journalpost | `offentligTittel`, `offentligTittelSensitiv`, `journalposttype`, `journalaar`, `journaldato`, `journalsekvensnummer`, `journalpostnummer` |
| Dokumentbeskrivelse | `tittel`, `tittelSensitiv`, `dokumentnummer`, `tilknyttetRegistreringSom` |
| Dokumentobjekt | `referanseDokumentfil` |

Gyldige verdier for `journalposttype`: `inngaaende_dokument` · `utgaaende_dokument` · `organinternt_dokument_uten_oppfoelging` · `organinternt_dokument_for_oppfoelging` · `saksframlegg` · `sakskart` · `moeteprotokoll` · `moetebok` · `ukjent`

---

## Steg 4 – Publiser Møtemappe med Møtesaker

En Møtemappe representerer ett konkret møte. Moetesak, Dokumentbeskrivelse og Dokumentobjekt kan sendes i samme kall som Møtemappen.

```
POST /arkivdel/{systemId}/moetemappe
```

```json
{
  "systemId": "din-uuid",
  "offentligTittel": "Møte i Kommunestyret 15.01.2024",
  "offentligTittelSensitiv": "Møte i Kommunestyret 15.01.2024",
  "moetenummer": "1",
  "utvalg": "Kommunestyret",
  "moetedato": "2024-01-15T18:00:00Z",
  "moetested": "Rådhuset",
  "moetesak": [
    {
      "systemId": "din-uuid",
      "offentligTittel": "Sak 1/2024 – Årsbudsjett",
      "offentligTittelSensitiv": "Sak 1/2024 – Årsbudsjett",
      "moetesakstype": "politisk",
      "moetesaksaar": 2024,
      "moetesakssekvensnummer": 1,
      "dokumentbeskrivelse": [
        {
          "systemId": "din-uuid",
          "tittel": "Saksdokument",
          "tittelSensitiv": "Saksdokument",
          "dokumentnummer": 1,
          "tilknyttetRegistreringSom": "hoveddokument",
          "dokumentobjekt": [
            {
              "systemId": "din-uuid",
              "referanseDokumentfil": "https://eksempel.no/dok/sak1-2024.pdf",
              "format": "pdf"
            }
          ]
        }
      ]
    }
  ]
}
```

### Nøkkelfelter

| Objekt | Påkrevde felt |
|---|---|
| Moetemappe | `offentligTittel`, `offentligTittelSensitiv`, `moetenummer`, `utvalg`, `moetedato` |
| Moetesak | `offentligTittel`, `offentligTittelSensitiv`, `moetesakstype` |

Gyldige verdier for `moetesakstype`: `moete` · `politisk` · `delegert` · `interpellasjon` · `godkjenning` · `orientering` · `referat` · `annet`

---

## Publiseringsrekkefølge

| # | Endepunkt | Kan sendes i samme kall |
|---|---|---|
| 1 | `POST /arkiv` | – |
| 2 | `POST /arkiv/{systemId}/arkivdel` | – |
| 3 | `POST /arkivdel/{systemId}/saksmappe` | Journalpost + Dokumentbeskrivelse + Dokumentobjekt |
| 4 | `POST /arkivdel/{systemId}/moetemappe` | Moetesak + Dokumentbeskrivelse + Dokumentobjekt |

> Arkiv og Arkivdel opprettes kun én gang. Steg 3 og 4 kan kjøres i valgfri rekkefølge seg imellom.

---

Tilbakemelding om dokumentasjonen sendes til servicedesk@digdir.no
