---
title: Sending til fastlege
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Integrasjonspunktet støttar sending av meldingar direkte til fastlegar sitt EPJ-system (elektronisk pasientjournal) gjennom Norsk Helsenett (NHN) sin infrastruktur.

## Føresetnader

For å kunne sende meldingar til fastlegar må organisasjonen din ha:

1. **Tilgang til NHN**: Organisasjonen må vere registrert i NHN sitt adresseregister med eige HER-ID
2. **HelseID-integrasjon**: Gyldig virksomhetssertifikat og HelseID-konfigurasjon
3. **Integrasjonspunkt**: Versjon som støttar DPH (Digital Post Helse)
4. **Avtale**: Avtale med NHN om bruk av Messaging Service Hub (MSH)

## Korleis funkar det?

Når du sender ei melding til ein fastlege:

1. Integrasjonspunktet mottek meldinga frå ditt fagsystem
2. Meldinga blir sendt til NHN-adapter som autentiserer med HelseID
3. NHN-adapter pakkar meldinga i korrekt format (dialogmelding)
4. Meldinga blir sendt via NHN sitt Messaging Service Hub (MSH)
5. Meldinga blir levert direkte til fastlegen sitt EPJ-system
6. Fastlegen les meldinga i sitt EPJ-system
7. EPJ-systemet sender automatisk ein kvittering (AppRec) tilbake
8. Du kan hente kvitteringa via integrasjonspunktet

## Meldingsflyt

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐      ┌──────────────┐
│ Ditt        │      │ Integrasjons-    │      │ NHN         │      │ Fastlege     │
│ fagsystem   │─────▶│ punkt            │─────▶│ MSH         │─────▶│ EPJ-system   │
└─────────────┘      └──────────────────┘      └─────────────┘      └──────────────┘
                              │                                              │
                              │◀─────────────────────────────────────────────┘
                              │         Kvittering (AppRec)
```

## Meldingsformat

### Standard Business Document (SBD)

Meldingar til fastlegar blir sendt som Standard Business Document med følgjande metadata:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "0192:931796003"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "21905297101"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:digitalpost:json:schema::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "550e8400-e29b-41d4-a716-446655440000",
      "type": "dialogmelding",
      "creationDateAndTime": "2026-02-24T10:30:00+01:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "instanceIdentifier": "550e8400-e29b-41d4-a716-446655440001",
          "identifier": "urn:no:difi:profile:digitalpost:fastlege:ver1.0"
        },
        {
          "type": "SenderRef",
          "instanceIdentifier": "be293280-4629-4b51-823e-6fd6ca363579",
          "identifier": "AvsenderSystem"
        },
        {
          "type": "ReceiverRef",
          "instanceIdentifier": "47558623-685c-4d40-b5ea-e299b27b985f",
          "identifier": "MottakerSystem"
        },
        {
          "type": "SenderHerId2",
          "instanceIdentifier": "8143154"
        }
      ]
    }
  },
  "dialogmelding": {
    "notat": {
      "subject": "Førespurnad om time",
      "notatinnhold": "Pasienten ønskjer time for kontroll"
    },
    "sikkerhetsnivaa": "4",
    "vedleggBeskrivelse": "Vedlagt journal"
  }
}
```

### Identifikasjon av mottakar

For å sende til ein fastlege må du identifisere mottakaren på ein av følgjande måtar:

**Alternativ 1: Via pasient sitt fødselsnummer**

- Du oppgir pasient sitt fødselsnummer
- Integrasjonspunktet slår automatisk opp i NHN sitt fastlegeregister for å finne fastlegen sin HER-ID
- Deretter blir meldinga sendt til denne fastlegen

**Alternativ 2: Via HER-ID**

- Du oppgir fastlegen sin HER-ID direkte
- Meldinga blir sendt til denne HER-ID-en utan behov for oppslag

I `receiver`-feltet i SBD-headeren brukar du:

- **For fødselsnummer**: `"value": "12345678901"` (berre fødselsnummer utan prefix)
- **For HER-ID**: `"value": "8143548"` (berre HER-ID utan prefix)

**Viktig:** Du må også leggje til `SenderHerId2` i `businessScope.scope` som viser din organisasjon sitt HER-ID på nivå 2 (underorganisasjon).

### Meldingsinnhald

Sjølve meldingsinnhaldet i `dialogmelding`-objektet består av:

- **notat.subject**: Emne/tittel på meldinga
- **notat.notatinnhold**: Hovudinnhaldet i meldinga (meldingstekst)
- **sikkerhetsnivaa**: Sikkerheitsnivå for meldinga (vanlegvis "4" for helseopplysningar)
- **vedleggBeskrivelse**: Beskriving av vedlagt dokument (vanlegvis PDF)

Merk at pasientinformasjon (fødselsnummer) blir brukt i `receiver`-feltet i SBD-headeren, ikkje i dialogmeldinga sjølv. Vedlegg (PDF eller anna dokumentasjon) blir lagt ved som ein separat del av meldinga.

## Kvitteringar

Når fastlegen sitt EPJ-system har motteke og lese meldinga, blir det sendt tilbake ein AppRec-kvittering (Application Receipt).

### Kvitteringstypar

Ein AppRec-kvittering kan ha følgjande statusar:

- **OK**: Meldinga er vellukka motteken og behandla av fastlegen sitt EPJ-system
- **REJECTED**: Meldinga er avvist. Dette kan skje dersom legen aktivt avviser førespurnaden, eller dersom meldinga er feilaktig adressert
- **OK_ERROR_IN_MESSAGE_PART**: Meldinga er motteken, men det er feil eller manglar i delar av meldingsinnhaldet

Merk at ein teknisk vellukka levering (meldinga er levert til EPJ-systemet) kan likevel resultere i ein avvisning dersom legen t.d. ikkje kan behandle førespurnaden.

### Hente kvitteringar

Integrasjonspunktet hentar kvitteringar frå NHN via eit pull-basert endepunkt (`GET /dph/in/{messageId}/receipt`) i NHN-adapteren. Dette betyr at integrasjonspunktet aktivt spør om kvitteringar for ein spesifikk melding.

Sjå integrasjonspunktet sin dokumentasjon for meir informasjon om korleis du hentar kvitteringar frå integrasjonspunktet til ditt fagsystem.

## Sikkerheit og personvern

### Kryptering

Alle meldingar blir automatisk krypterte av integrasjonspunktet/NHN-Adapter før dei blir sendt. Du treng ikkje kryptere meldingane sjølv.

### Signering

Meldingar blir signerte med organisasjonen sitt virksomhetssertifikat for å sikre autentisitet.

### Logging

Integrasjonspunktet loggar metadata om sendte meldingar, men ikkje innhaldet. Sørg for at loggar i ditt fagsystem også handterer personopplysningar forsvarleg.

## Feilhandtering

### Vanlege feil

| Feil                 | Årsak                                                                 | Løysing                                                             |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Fastlege ikkje funne | Pasient har ikkje registrert fastlege, eller fødselsnummer er ugyldig | Kontroller at fødselsnummer er korrekt og at pasienten har fastlege |
| HER-ID ikkje funne   | HER-ID eksisterer ikkje i NHN sitt register                           | Kontroller at HER-ID er korrekt                                     |
| Autentiseringsfeil   | HelseID-konfigurasjonen er feil                                       | Sjekk virksomhetssertifikat og HelseID-innstillingar                |
| Meldinga blir avvist | Meldingsformatet er ugyldig                                           | Kontroller at SBD er korrekt formatert                              |
| Ingen kvittering     | Fastlegen sitt EPJ-system har ikkje lese meldinga enno                | Vent og prøv igjen seinare                                          |

### Prøv på nytt

For mellombelse feil (nettverksproblem, NHN utilgjengeleg) vil integrasjonspunktet automatisk prøve å sende meldinga på nytt.

## Ytterlegare ressursar

- [Konfigurasjon av integrasjonspunktet](konfigurasjon.md)
- [Kvitteringar](kvitteringar.md)
- [Feilsøking](feilsoking.md)
- [NHN sin dokumentasjon](https://www.nhn.no/tjenester/messaging-service-hub/)
- [HelseID](https://www.nhn.no/tjenester/helseid/)

## Spørsmål og support

For spørsmål om:

- **Integrasjonspunktet**: Kontakt servicedesk@digdir.no
- **NHN-tenester**: Kontakt NHN servicedesk
- **HelseID**: Sjå [HelseID support](https://www.nhn.no/tjenester/helseid/helseid-support/)
