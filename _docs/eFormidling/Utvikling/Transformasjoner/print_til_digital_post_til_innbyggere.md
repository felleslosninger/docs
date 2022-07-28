---
title: Transformasjon fra print til digital post til innbyggere
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer utgående meldinger til kall mot APIet for Digital Post
til Innbyggere. Integrasjonspunktet supplerer utgående meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter.

| Til Digital Post til Innbyggere                                  | Fra eFormidling `print` melding                                                            | Fra konfigurasjon      | Fra standardverdi |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------- | ----------------- |
| Meldingsidentifikator i SBD                                      | Meldingsidentifikator i SBD                                                                | -                      | - |
| Konversasjonsidentifikator i SBD                                 | Konversasjonsidentifikator i SBD                                                           | -                      | - |
| Prosess i SBD                                                    | -                                                                                          | -                      | `urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:utskrift:ver1.0` |
| Dokumenttype i SBD                                               | -                                                                                          | -                      | `urn:fdc:digdir.no:2020:innbyggerpost:xsd::innbyggerpost##urn:fdc:digdir.no:2020:innbyggerpost:schema:utskrift::1.0` |
| Organisasjonsnummer for mottaker i SBD                           | -                                                                                          | -                      | Postkassens organisasjonsnummer hentes fra KRR gitt mottakers fødselsnummer |
| Organisasjonsnummer for avsender i SBD                           | -                                                                                          | `difi.move.org.number` | - |
| `utskrift.avsender.virksomhetsidentifikator`                     | Organisasjonsnummer for avsender i SBD                                                     | `difi.move.org.number` | - |
| `utskrift.avsender.avsenderidentifikator`                        | `print.avsenderId` som oppgitt i SBD                                                       | -                      | - |
| `utskrift.avsender.fakturaReferanse`                             | `print.fakturaReferanse` som oppgitt i SBD                                                 | -                      | - |
| `utskrift.mottaker.navn`                                         | `print.mottaker.navn` som oppgitt i SBD                                                    | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.adresselinje1`                                | `print.mottaker.adresselinje1` som oppgitt i SBD                                           | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.adresselinje2`                                | `print.mottaker.adresselinje2` som oppgitt i SBD                                           | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.adresselinje3`                                | `print.mottaker.adresselinje3` som oppgitt i SBD                                           | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.adresselinje4`                                | `print.mottaker.adresselinje4` som oppgitt i SBD                                           | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.postnummer`                                   | `print.mottaker.postnummer` som oppgitt i SBD                                              | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.poststed`                                     | `print.mottaker.poststed` som oppgitt i SBD                                                | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.mottaker.land`                                         | `print.mottaker.land` som oppgitt i SBD                                                    | -                      | Hentes fra Folkeregisteret gitt mottakers fødselsnummer |
| `utskrift.dokumentpakkefingeravtrykk.digestMethod`               | -                                                                                          | -                      | `http://www.w3.org/2001/04/xmlenc#sha256` |
| `utskrift.dokumentpakkefingeravtrykk.digestValue`                | -                                                                                          | -                      | Base64-enkodet SHA256 av dokumentpakken |
| `utskrift.maskinportentoken`                                     | -                                                                                          | -                      | Integrasjonspunktet bygger, signerer (med virksomhetssertifikatet konfigurert for integrasjonspunktet) og sender autorisasjonsforespørsel for avsenders organisasjonsnummer. Returnert autorisasjonstoken fra Maskinporten brukes. |
| `utskrift.utskriftstype`                                         | `print.utskriftsfarge` som oppgitt i SBD                                                   | -                      | `SORT_HVIT` |
| `utskrift.retur.mottaker.navn`                                   | `print.retur.mottaker.navn` som oppgitt i SBD                                              | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.adresselinje1`                          | `print.retur.mottaker.adresselinje1` som oppgitt i SBD                                     | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.adresselinje2`                          | `print.retur.mottaker.adresselinje2` som oppgitt i SBD                                     | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.adresselinje3`                          | `print.retur.mottaker.adresselinje3` som oppgitt i SBD                                     | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.adresselinje4`                          | `print.retur.mottaker.adresselinje4` som oppgitt i SBD                                     | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.postnummer`                             | `print.retur.mottaker.postnummer` som oppgitt i SBD                                        | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.poststed`                               | `print.retur.mottaker.poststed` som oppgitt i SBD                                          | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.mottaker.land`                                   | `print.retur.mottaker.land` som oppgitt i SBD                                              | -                      | Hentes fra Enhetsregisteret gitt avsenders organisasjonsummer |
| `utskrift.retur.returhaandtering`                                | `print.retur.returhaandtering` som oppgitt i SBD                                           | -                      | `DIREKTE_RETUR` |
| `utskrift.posttype`                                              | `print.posttype` som oppgitt i SBD                                                         | -                      | `B_OEKONOMI` |
| `avsender.organisasjon` i manifestet i dokumentpakken            | Organisasjonsnummer for avsender i SBD                                                     | `difi.move.org.number` | - |
| `avsender.avsenderidentifikator` i manifestet i dokumentpakken   | `print.avsenderId` som oppgitt i SBD                                                       | -                      | - |
| `avsender.fakturareferanse` i manifestet i dokumentpakken        | `print.fakturaReferanse` som oppgitt i SBD                                                 | -                      | - |
| `hoveddokument.tittel` i manifestet i dokumentpakken             | Navn som oppgitt ved opplasting til integrasjonspunktet (for `print.hoveddokument`)        | -                      | - |
| `hoveddokument.href` i manifestet i dokumentpakken               | Filnavn som oppgitt ved opplasting til integrasjonspunktet (for `print.hoveddokument`)     | -                      | - |
| `hoveddokument.mimeType` i manifestet i dokumentpakken           | Mime-Type som oppgitt ved opplasting til integrasjonspunktet (for `print.hoveddokument`)   | -                      | - |
| `vedlegg[].tittel` i manifestet i dokumentpakken                 | Navn som oppgitt ved opplasting til integrasjonspunktet                                    | -                      | - |
| `vedlegg[].href` i manifestet i dokumentpakken                   | Filnavn som oppgitt ved opplasting til integrasjonspunktet                                 | -                      | - |
| `vedlegg[].mimeType` i manifestet i dokumentpakken               | Mime-Type som oppgitt ved opplasting til integrasjonspunktet                               | -                      | - |

Nærmere beskrivelse av funksjonaliteten i Digital Post til Innbyggere finnes på:

- [Teknisk dokumentasjon for Digital Post til Innbyggere](/dpi_nyinfrastruktur) (ekstern lenke)
