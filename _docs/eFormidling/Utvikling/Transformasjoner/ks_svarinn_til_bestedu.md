---
title: Transformasjon fra KS SvarInn til BEST/EDU
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer responser fra APIet for KS SvarInn til innkommende
meldinger. Integrasjonspunktet supplerer innkommende meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter. Merk at innkommende meldinger fra KS SvarInn behandles ulikt avhengig av om
integrasjonspunktet er konfigurert med grensesnittet BEST/EDU eller ikke. Tabellen under viser hvordan innkommende
meldinger fra KS SvarInn behandles dersom integrasjonspunktet er konfigurert med grensesnittet BEST/EDU.

| Til eFormidling BEST/EDU | Fra KS SvarInn                                                                                   | Fra konfigurasjon                        | Fra standardverdi |
| ------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------------- |
| `conversationId`         | Identifikator for meldingen (`id`)                                                               | -                                        | - |
| `contentNamespace`       | -                                                                                                | -                                        | `http://www.arkivverket.no/Noark4-1-WS-WD/types` |
| `receiver.orgnr`         | Mottakerens organisasjonsnummer (`mottaker.orgnr`)                                               | -                                        | - |
| `receiver.name`          | Mottakerens navn (`mottaker.navn`)                                                               | -                                        | - |
| `receiver.ref`           | Mottakerens organisasjonsnummer (`mottaker.orgnr`)                                               | -                                        | - |
| `sender.orgnr`           | Svarmottakerens organisasjonsnummer (`svarSendesTil.orgnr`)                                      | -                                        | - |
| `sender.name`            | Svarmottakerens navn (`svarSendesTil.navn`)                                                      | -                                        | - |
| `sender.ref`             | Identifikator for meldingen dette er et svar på (`svarPaForsendelse`)                            | -                                        | - |
| `saSekNr`                | Avsenders sakssekvensnummer (`metadataFraAvleverendeSystem.saksekvensnummer`)                    | -                                        | - |
| `saSaar`                 | Avsenders saksår (`metadataFraAvleverendeSystem.saksaar`)                                        | -                                        | - |
| `saTittel`               | Avsenders tittel (`metadataFraAvleverendeSystem.tittel`)                                         | -                                        | - |
| `jpDokDato`              | Avsenders dokumentdato (`metadataFraAvleverendeSystem.dokumentetsDato`)                          | -                                        | - |
| `jpNdokType`             | Avsenders journalposttype (`metadataFraAvleverendeSystem.journalposttype`)                       | -                                        | - |
| `jpStatus`               | Avsenders journalstatus (`metadataFraAvleverendeSystem.journalstatus`)                           | -                                        | - |
| `jpJaar`                 | Avsenders journalår (`metadataFraAvleverendeSystem.journalaar`)                                  | -                                        | - |
| `jpSeknr`                | Avsenders journalsekvensnummer (`metadataFraAvleverendeSystem.journalseksvensnummer`)            | -                                        | - |
| `jpJpostnr`              | Avsenders journalpostnummer (`metadataFraAvleverendeSystem.journalpostnummer`)                   | -                                        | - |
| `jpOffInnhold`           | Avsenders tittel (`metadataFraAvleverendeSystem.tittel`), ellers tittel for meldingen (`tittel`) | -                                        | `Dokumentet mangler tittel` |
| `jpInnhold`              | Avsenders tittel (`metadataFraAvleverendeSystem.tittel`), ellers tittel for meldingen (`tittel`) | -                                        | `Dokumentet mangler tittel` |
| `jpJdato`                | Avsenders journaldato (`metadataFraAvleverendeSystem.journaldato`)                               | -                                        | - |
| `avsmot[0].amIhtype`     | -                                                                                                | -                                        | `0` |
| `avsmot[0].amNavn`       | Avsenders saksbehandler (`metadataFraAvleverendeSystem.saksBehandler`)                           | -                                        | - |
| `avsmot[1].amIhtype`     | -                                                                                                | -                                        | `1` |
| `avsmot[1].amNavn`       | Svarmottakerens navn (`svarSendesTil.navn`)                                                      | -                                        | - |
| `avsmot[1].amAdresse`    | Svarmottakerens adresselinje 1 (`svarSendesTil.adresse1`)                                        | -                                        | - |
| `avsmot[1].amPostnr`     | Svarmottakerens postnummer (`svarSendesTil.postnr`)                                              | -                                        | - |
| `avsmot[1].amPoststed`   | Svarmottakerens poststed (`svarSendesTil.poststed`)                                              | -                                        | - |
| `avsmot[1].amUtland`     | Svarmottakerens land (`svarSendesTil.land`)                                                      | -                                        | - |
| `avsmot[1].amOrgnr`      | Svarmottakerens organisasjonsnummer (`svarSendesTil.orgnr`)                                      | -                                        | - |
| `dokument[].veMimeType`  | Mime-type for vedlegget (`filMetadata.mimetype`)                                                 | -                                        | - |
| `dokument[].veDokFormat` | Etternavn for fil gitt av av mime-type                                                           | -                                        | - |
| `dokument[].dbTittel`    | Filnavn for vedlegget (`filMetadata.filnavn`)                                                    | -                                        | - |
| `dokument[].veFilnavn`   | Filnavn for vedlegget (`filMetadata.filnavn`)                                                    | -                                        | - |
| `dokument[].veVariant`   | -                                                                                                | -                                        | `P` |
| `dokument[].fil`         | Base64-enkodet binært dokument                                                                   | -                                        | - |

Nærmere beskrivelse av funksjonaliteten i BEST/EDU finnes på:
- [BEST/EDU](../integrasjonspunkt_bestedu_api)

Nærmere beskrivelse av funksjonaliteten i KS SvarInn finnes på:

- [Teknisk dokumentasjon for KS SvarInn](https://ks-no.github.io/svarut/integrasjon/mottaksservice-rest/) (ekstern lenke)
