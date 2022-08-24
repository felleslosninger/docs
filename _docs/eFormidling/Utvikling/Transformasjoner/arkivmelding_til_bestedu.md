---
title: Transformasjon fra arkivmelding til BEST/EDU
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer innkommende meldinger fra eFormidlings meldingstjeneste
til BEST/EDU. Integrasjonspunktet supplerer innkommende meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter.

| Til eFormidling BEST/EDU   | Fra eFormidling `arkivmelding` melding           | Fra konfigurasjon | Fra standardverdi                                |
|----------------------------|--------------------------------------------------|-------------------|--------------------------------------------------|
| `conversationId`           | Konversasjonsidentifikator i SBD                 | -                 | -                                                |
| `contentNamespace`         | -                                                | -                 | `http://www.arkivverket.no/Noark4-1-WS-WD/types` |
| `receiver.orgnr`           | Organisasjonsnummer for mottaker i SBD           | -                 | -                                                |
| `receiver.name`            | Navn for mottakeren hentes fra Enhetsregisteret  | -                 | -                                                |
| `receiver.ref`             | Scope `RECEIVER_REF` i SBD                       | -                 | -                                                |
| `sender.orgnr`             | Organisasjonsnummer for avsender i SBD           | -                 | -                                                |
| `sender.name`              | Navn for avsenderen hentes fra Enhetsregisteret  | -                 | -                                                |
| `sender.ref`               | Scope `SENDER_REF` i SBD                         | -                 | -                                                |
| `saSaar`                   | `mappe.saksaar`                                  | -                 | -                                                |
| `saSeknr`                  | `mappe.sakssekvensnummer`                        | -                 | -                                                |
| `saAnsvinit`               | `mappe.saksansvarlig`                            | -                 | -                                                |
| `saAdmkort`                | `mappe.administrativEnhet`                       | -                 | -                                                |
| `saOfftittel`              | `mappe.offentligTittel`                          | -                 | -                                                |
| `saId`                     | `mappe.systemID`                                 | -                 | -                                                |
| `saDato`                   | `mappe.saksdato`                                 | -                 | -                                                |
| `saTittel`                 | `mappe.tittel`                                   | -                 | -                                                |
| `saStatus`                 | `mappe.saksstatus`                               | -                 | Under behandling (`B`)                           |
| `saJenhet`                 | `mappe.journalenhet`                             | -                 | -                                                |
| `saArkdel`                 | `mappe.referanseArkivdel[0]`                     | -                 | -                                                |
| `jpId`                     | `basisregistrering.systemID`                     | -                 | -                                                |
| `jpInnhold`                | `basisregistrering.tittel`                       | -                 | -                                                |
| `jpJaar`                   | `basisregistrring.journalaar`                    | -                 | -                                                |
| `jpSeknr`                  | `basisregistrering.journalsekvensnummmer`        | -                 | -                                                |
| `jpJpostnr`                | `basisregistrering.journalpostnummer`            | -                 | -                                                |
| `jpJdato`                  | `basisregistrering.journaldato`                  | -                 | -                                                |
| `jpForfdato`               | `basisregistrering.forfallsdato`                 | -                 | -                                                |
| `jpNdoktype`               | `basisregistrering.journalposttype`              | -                 | Inngående dokument (`I`)                         |
| `jpDokDato`                | `basisregistrering.dokumentetsDato`              | -                 | -                                                |
| `jpStatus`                 | `basisregistrering.journalstatus`                | -                 | Ferdigstilt fra saksbehandler (`R`)              |
| `jpArkdel`                 | `basisregistrering.referanseArkivdel`            | -                 | -                                                |
| `jpAntved`                 | `basisregistrering.antallVedlegg`                | -                 | -                                                |
| `jpOffinnhold`             | `basisregistering.offentligTittel`               | -                 | -                                                |
| `jpUoff`                   | `mappe.skjerming.skjermingshjemmel`              | -                 | -                                                |
| `jpSaar`                   | `mappe.saksaar`                                  | -                 | -                                                |
| `jpSaseknr`                | `mappe.sakssekvensnummer`                        | -                 | -                                                |
| `avsmot[].amNavn`          | `korrespondansepart[].korrespondansepartNavn`    | -                 | -                                                |
| `avsmot[].amIhtype`        | `korrespondansepart[].korrespondansparttype`     | -                 | -                                                |
| `avsmot[].amAdresse`       | `korrespondansepart[].postadresse`               | -                 | -                                                |
| `avsmot[].amPostnr`        | `korrespondansepart[].postnummer`                | -                 | -                                                |
| `avsmot[].amPoststed`      | `korrespondansepart[].poststed`                  | -                 | -                                                |
| `avsmot[].amUtland`        | `korrespondansepart[].land`                      | -                 | -                                                |
| `avsmot[].amAdmkort`       | `korrespondansepart[].administrativEnhet`        | -                 | -                                                |
| `avsmot[].aSbhinit`        | `korrespondansepart[].saksbehandler`             | -                 | -                                                |
| `avsmot[].amAvskm`         | `avskrivning[0].avskrivningsmaate`               | -                 | -                                                |
| `avsmot[].amAvsavdok`      | `avskrivning[0].referanseAvskrivesAvJournalpost` | -                 | -                                                |
| `avsmot[].amAvskdato`      | `avskrivning[0].avskrivningsdato`                | -                 | -                                                |
| `dokument[].veFilnavn`     | `dokumentobjekt.referanseDokumentfil`            | -                 | -                                                | 
| `dokument[].dbTittel`      | `dokumentbeskrivelse.tittel`                     | -                 | -                                                |
| `dokument[].dlRnr`         | `dokumentbeskrivelse.dokumentnummer`             | -                 | -                                                |
| `dokument[].dlType`        | `dokumentbeskrivelse.tilknyttetRegistreringSom`  | -                 | -                                                |
| `dokument[].veDokFormat`   | Etternavn for fil                                | -                 | `pdf`                                            |
| `dokument[].veMimeType`    | Mime-type for fil gitt av etternavn              | -                 | -                                                | 
| `dokument[].veVariant`     | `dokumentobjekt.variantformat`                   | -                 | Produksjonsformat (`P`)                          |
| `dokument[].fil`           | Base64-enkodet binært dokument                   | -                 | -                                                |

Nærmere beskrivelse av funksjonaliteten i BEST/EDU finnes på:
- [BEST/EDU](../integrasjonspunkt_bestedu_api)
