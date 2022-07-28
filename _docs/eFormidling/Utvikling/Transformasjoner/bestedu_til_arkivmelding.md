---
title: Transformasjon fra BEST/EDU til arkivmelding
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer utgående meldinger fra BEST/EDU til eFormidlings
meldingstjeneste. Integrasjonspunktet supplerer innkommende meldinger med opplysninger fra konfigurasjon,
standardverdier og oppslag hos tredjeparter. Utgående meldinger fra BEST/EDU til KS SvarUt og Altinn Digital Post
transformeres først til arkivmelding før arkivmelding blir transformert til KS Svarut eller Altinn Digital Post.

| Fra eFormidling `arkivmelding` melding            | Fra eFormidling BEST/EDU                       | Fra konfigurasjon                              | Fra standardverdi |
| ------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ----------------- |
| Meldingsidentifikator i SBD                       | `conversationId`                               | -                                              | Genererer UUID dersom verdien ikke allerede er det |
| Konversasjonsidentifikator i SBD                  | `conversationId`                               | -                                              | Genererer UUID dersom verdien ikke allerede er det |
| Prosess i SBD                                     | -                                              | `difi.move.arkivmelding.default-process`       | `urn:no:difi:profile:arkivmelding:administrasjon:ver1.0` |
| Dokumenttype i SBD                                | -                                              | `difi.move.arkivmelding.default-document-type` | `urn:no:difi:arkivmelding:xsd::arkivmelding` |
| Organisasjonsnummer for avsender i SB           D | `sender.orgnr`                                 | -                                              | - |
| Organisasjonsnummer for mottaker i SBD            | `receiver.orgnr`                               | -                                              | - |
| Scope `SENDER_REF` i SBD                          | `sender.ref`                                   | -                                              | - |
| Scope `RECEIVER_REF` i SBD                        | `receiver.ref`                                 | -                                              | - |
| `arkivmelding.sikkerhetsnivaa` i SBD              | -                                              | -                                              | Sikkerhetsnivå hentes fra adresseregisteret |
| `arkivmelding.hoveddokument` i SBD                | -                                              | -                                              | `arkivmelding.xml` |
| `mappe.saksaar`                                   | `saSaar`                                       | -                                              | - |
| `mappe.sakssekvensnummer`                         | `saSeknr`                                      | -                                              | - |
| `mappe.saksansvarlig`                             | `saAnsvinit`                                   | -                                              | - |
| `mappe.administrativEnhet`                        | `saAdmkort`                                    | -                                              | - |
| `mappe.offentligTittel`                           | `saOffTittel`                                  | -                                              | - |
| `mappe.systemID`                                  | `saId`                                         | -                                              | - |
| `mappe.saksdato`                                  | `saDato`                                       | -                                              | - |
| `mappe.tittel`                                    | `saTittel`                                     | -                                              | - |
| `mappe.saksstatus`                                | `saStatus`                                     | -                                              | Under behandling (`B`) |
| `mappe.referanseArkivdel`                         | `saArkdel`                                     | -                                              | - |
| `mappe.journalenhet`                              | `saJenhet`                                     | -                                              | - |
| `basisregistrering.systemID`                      | `jpId`                                         | -                                              | - |
| `basisregistrering.tittel`                        | `jpInnhold`                                    | -                                              | - |
| `basisregistrering.journalAar`                    | `jpAaar`                                       | -                                              | - |
| `basisregistrering.forfallsdato`                  | `jpForfdato`                                   | -                                              | - |
| `basisregistrering.journalsekvensnummer`          | `jpSeknr`                                      | -                                              | - |
| `basisregistrering.journalpostnummer`             | `jpJpostnr`                                    | -                                              | - |
| `basisregistrering.journalposttype`               | `jpNdoktype`                                   | -                                              | Inngående dokument (`I`) |
| `basisregistrering.journalstatus`                 | `jpStatus`                                     | -                                              | Ferdigstilt fra saksbehandler (`R`) |
| `basisregistrering.referanseArkivdel`             | `jpArkdel`                                     | -                                              | - |
| `basisregistrering.antallVedlegg`                 | `jpAntved`                                     | -                                              | - |
| `basisregistrering.offentligTittel`               | `jpOffinnhold`                                 | -                                              | - |
| `mappe.skjerming.skjermingshjemmel`               | `jpUoff`                                       | -                                              | - |
| `basisregistrering.journaldato`                   | `jpDato`                                       | -                                              | - |
| `basisregistrering.dokumentetsDato`               | `jpDokDato`                                    | -                                              | - |
| `korrespondansepart[].korrespondansepartNavn`     | `avsmot[].amNavn`                              | -                                              | - |
| `korrespondansepart[].administrativEnhet`         | `avsmot[].amAdmkort`                           | -                                              | - |
| `korrespondansepart[].saksbehandler`              | `avsmot[].amSbhinit`                           | -                                              | - |
| `korrespondansepart[].postadresse`                | `avsmot[].amAdresse`                           | -                                              | - |
| `korrespondansepart[].postnummer`                 | `avsmot[].amPostnr`                            | -                                              | - |
| `korrespondansepart[].poststed`                   | `avsmot[].amPoststed`                          | -                                              | - |
| `korrespondansepart[].korrespondansepartType`     | `avsmot[].amIhtype`                            | -                                              | - |
| `korrespondansepart[].land`                       | `avsmot[].amLand`                              | -                                              | - |
| `avskrivning[].arkivmeldingType`                  | `avsmot[].amAvskm`                             | -                                              | - |
| `avskrivning[].referanseAvskrivesAvJournalpost`   | `avsmot[].amAvsavdok`                          | -                                              | - |
| `avskrivning[].avskrivningsdato`                  | `avsmot[].amAvskdato`                          | -                                              | - |
| `dokumentBeskrivelse[].tittel`                    | `dokument[].dbTittel`                          | -                                              | - |
| `dokumentBeskrivelse[].dokumentnummer`            | `dokument[].dlRnr`                             | -                                              | - |
| `dokumentBeskrivelse[].tilknyttetRegistreringSom` | `dokument[].dlType`                            | -                                              | - |
| `dokumentobjekt.referanseDokumentfil`             | `dokument[].veFilnavn`                         | -                                              | - |
| `dokumentobjekt.variantformat`                    | `dokument[].veVariant`                         | -                                              | Produksjonsformat (`P`) |

Nærmere beskrivelse av funksjonaliteten i BEST/EDU finnes på:
- [BEST/EDU](../integrasjonspunkt_bestedu_api)
