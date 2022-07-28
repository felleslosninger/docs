---
title: Transformasjon fra digital til digital post til innbyggere
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer utgående meldinger til kall mot APIet for Digital Post
til Innbyggere. Integrasjonspunktet supplerer utgående meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter.

| Til Digital Post til Innbyggere                                  | Fra eFormidling `digital` melding                                                          | Fra konfigurasjon      | Fra standardverdi |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------- | ----------------- |
| Meldingsidentifikator i SBD                                      | Meldingsidentifikator i SBD                                                                | -                      | - |
| Konversasjonsidentifikator i SBD                                 | Konversasjonsidentifikator i SBD                                                           | -                      | - |
| Prosess i SBD                                                    | -                                                                                          | -                      | `urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0` |
| Dokumenttype i SBD                                               | -                                                                                          | -                      | `urn:fdc:digdir.no:2020:innbyggerpost:xsd::innbyggerpost##urn:fdc:digdir.no:2020:innbyggerpost:schema:digital::1.0` |
| Organisasjonsnummer for mottaker i SBD                           | -                                                                                          | -                      | Postkassens organisasjonsnummer hentes fra KRR gitt mottakers fødselsnummer |
| Organisasjonsnummer for avsender i SBD                           | -                                                                                          | `difi.move.org.number` | - |
| `digital.avsender.virksomhetsidentifikator`                      | Organisasjonsnummer for avsender i SBD                                                     | `difi.move.org.number` | - |
| `digital.avsender.avsenderidentifikator`                         | `digital.avsenderId` som oppgitt i SBD                                                     | -                      | - |
| `digital.avsender.fakturaReferanse`                              | `digital.fakturaReferanse` som oppgitt i SBD                                               | -                      | - |
| `digital.mottaker.postkasseadresse`                              | -                                                                                          | -                      | Hentes fra KRR gitt mottakers fødselsnummer |
| `digital.dokumentpakkefingeravtrykk.digestMethod`                | -                                                                                          | -                      | `http://www.w3.org/2001/04/xmlenc#sha256` |
| `digital.dokumentpakkefingeravtrykk.digestValue`                 | -                                                                                          | -                      | Base64-enkodet SHA256 av dokumentpakken |
| `digital.maskinportentoken`                                      | -                                                                                          | -                      | Integrasjonspunktet bygger, signerer (med virksomhetssertifikatet konfigurert for integrasjonspunktet) og sender autorisasjonsforespørsel for avsenders organisasjonsnummer. Returnert autorisasjonstoken fra Maskinporten brukes. |
| `digital.sikkerhetsnivaa`                                        | `digital.sikkerhetsnivaa` som oppgitt i SBD                                                | -                      | - |
| `digital.virkningstidspunkt`                                     | `digital.digitalPostInfo.virkningsdato` som oppgitt i SBD                                  | -                      | - |
| `digital.aapningskvittering`                                     | `digital.digitalPostInfo.aapningskvittering` som oppgitt i SBD                             | -                      | - |
| `digital.ikkeSensitivTittel`                                     | `digital.tittel` som oppgitt i SBD                                                         | -                      | - |
| `digital.spraak`                                                 | `digital.spraak` som oppgitt i SBD                                                         | -                      | - |
| `digital.varsler.epostVarsel.epostadresse`                       | -                                                                                          | -                      | Hentes fra KRR gitt mottakers fødselsnummer |
| `digital.varsler.epostVarsel.varslingstekst`                     | `digital.varsler.epostTekst` som oppgitt i SBD                                             | -                      | - |
| `digital.varsler.epostVarsel.repitisjoner`                       | -                                                                                          | -                      | Med en gang og etter 7 dager |
| `digital.varsler.smsVarsel.mobiltelefonnummer`                   | -                                                                                          | -                      | Hentes fra KRR gitt mottakers fødselsnummer |
| `digital.varsler.smsVarsel.varslingstekst`                       | `digital.varsler.smsTekst` som oppgitt i SBD                                               | -                      | - |
| `digital.varsler.smsVarsel.varslingstekst`                       | `digital.varsler.smsTekst` som oppgitt i SBD                                               | -                      | - |
| `digital.varsler.smsVarsel.repitisjoner`                         | -                                                                                          | -                      | Med en gang og etter 7 dager |
| `mottaker.person.postkasseadresse` i manifestet i dokumentpakken | -                                                                                          | -                      | Hentes fra KRR gitt mottakers fødselsnummer |
| `avsender.organisasjon` i manifestet i dokumentpakken            | Organisasjonsnummer for avsender i SBD                                                     | -                      | - |
| `avsender.avsenderidentifikator` i manifestet i dokumentpakken   | `digital.avsenderId` som oppgitt i SBD                                                     | -                      | - |
| `avsender.fakturareferanse` i manifestet i dokumentpakken        | `digital.fakturaReferanse` som oppgitt i SBD                                               | -                      | - |
| `hoveddokument.tittel` i manifestet i dokumentpakken             | Navn som oppgitt ved opplasting til integrasjonspunktet (for `digital.hoveddokument`)      | -                      | - |
| `hoveddokument.href` i manifestet i dokumentpakken               | Filnavn som oppgitt ved opplasting til integrasjonspunktet (for `digital.hoveddokument`)   | -                      | - |
| `hoveddokument.mimeType` i manifestet i dokumentpakken           | Mime-Type som oppgitt ved opplasting til integrasjonspunktet (for `digital.hoveddokument`) | -                      | - |
| `hoveddokument.data.href` i manifestet i dokumentpakken          | Eventuelt filnavn for metadatafil referert til hoveddokument i `digital.metadataFiler`     | -                      | - |
| `hoveddokument.data.mimeType` i manifestet i dokumentpakken      | Eventuell Mime-Type for metadatafil referert til hoveddokument i `digital.metadataFiler`   | -                      | - |
| `vedlegg[].tittel` i manifestet i dokumentpakken                 | Navn som oppgitt ved opplasting til integrasjonspunktet                                    | -                      | - |
| `vedlegg[].href` i manifestet i dokumentpakken                   | Filnavn som oppgitt ved opplasting til integrasjonspunktet                                 | -                      | - |
| `vedlegg[].mimeType` i manifestet i dokumentpakken               | Mime-Type som oppgitt ved opplasting til integrasjonspunktet                               | -                      | - |
| `vedlegg[].data.href` i manifestet i dokumentpakken              | Eventuelt filnavn for metadatafil referert til vedlegget i `digital.metadataFiler`         | -                      | - |
| `vedlegg[].data.mimeType` i manifestet i dokumentpakken          | Eventuell Mime-Type for metadatafil referert til vedlegget i `digital.metadataFiler`       | -                      | - |

Nærmere beskrivelse av funksjonaliteten i Digital Post til Innbyggere finnes på:

- [Teknisk dokumentasjon for Digital Post til Innbyggere](/dpi_nyinfrastruktur) (ekstern lenke)
