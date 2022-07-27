---
title: Transforasjon fra KS SvarInn til arkivmelding
description: ""
summary: ""
permalink: eformidling_utvikling_ks_svarinn_til_arkivmelding.html
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer responser fra APIet for KS SvarInn til innkommende
meldinger. Integrasjonspunktet supplerer innkommende meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter. Merk at innkommende meldinger fra KS SvarInn behandles ulikt avhengig av om
integrasjonspunktet er konfigurert med grensesnittet BEST/EDU eller ikke. Tabellen under viser hvordan innkommende
meldinger fra KS SvarInn behandles dersom integrasjonspunktet ikke er konfigurert med grensesnittet BEST/EDU.

| Til eFormidling `arkivmelding` melding                                        | Fra KS SvarInn                                                                        | Fra konfigurasjon                 | Fra standardverdi |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------- | ----------------- |
| Meldingsidentifikator i SBD                                                   | Identifikator for meldingen (`id`)                                                    | -                                 | - |
| Konversasjonsidentifikator i SBD                                              | Identifikator for meldingen (`id`)                                                    | -                                 | - |
| Prosess i SBD                                                                 | -                                                                                     | `difi.move.fiks.inn.process`      | `urn:no:difi:profile:arkivmelding:administrasjon:ver1.0` |
| Dokumenttype i SBD                                                            | -                                                                                     | `difi.move.fiks.inn.documentType` | `urn:no:difi:arkivmelding:xsd::arkivmelding` |
| Organisasjonsnummer for mottaker i SBD                                        | Mottakerens organisasjonsnummer (`mottaker.orgnr`)                                    | -                                 | - |
| Organisasjonsnummer for avsender i SBD                                        | Svarmottakerens organisasjonsnummer (`svarSendesTil.orgnr`)                           | -                                 | - |
| Scope `RECEIVER_REF` i SBD                                                    | Identifikator for meldingen dette er et svar på (`svarPaForsendelse`)                 | -                                 | - |
| `offentligTittel` i arkivmeldingen                                            | Tittel for meldingen (`tittel`)                                                       | -                                 | - |
| `sakssekvensnummer` i arkivmeldingen                                          | Avsenders sakssekvensnummer (`metadataFraAvleverendeSystem.saksekvensnummer`)         | -                                 | - |
| `saksaar` i arkivmeldingen                                                    | Avsenders saksår (`metadataFraAvleverendeSystem.saksaar`)                             | -                                 | - |
| `journalaar` i arkivmeldingen                                                 | Avsenders journalår (`metadataFraAvleverendeSystem.journalaar`)                       | -                                 | - |
| `journalseksvensnummer` i arkivmeldingen                                      | Avsenders journalsekvensnummer (`metadataFraAvleverendeSystem.journalseksvensnummer`) | -                                 | - |
| `journalpostnummer` i arkivmeldingen                                          | Avsenders journalpostnummer (`metadataFraAvleverendeSystem.journalpostnummer`)        | -                                 | - |
| `journalposttype` i arkivmeldingen                                            | Avsenders journalposttype (`metadataFraAvleverendeSystem.journalposttype`)            | -                                 | Inngående dokument (`I`) |
| `journalstatus` i arkivmeldingen                                              | Avsenders journalstatus (`metadataFraAvleverendeSystem.journalstatus`)                | -                                 | Ferdigstilt fra saksbehandler (`R`) |
| `journaldato` i arkivmeldingen                                                | Avsenders journaldato (`metadataFraAvleverendeSystem.journaldato`)                    | -                                 | - |
| `dokumentetsDato` i arkivmeldingen                                            | Avsenders dokumentdato (`metadataFraAvleverendeSystem.dokumentetsDato`)               | -                                 | - |
| `offentligTittel` i arkivmeldingen                                            | Avsenders tittel (`metadataFraAvleverendeSystem.tittel`)                              | -                                 | - |
| `saksansvarlig` i arkivmeldingen  `                                           | Avsenders saksbehandler (`metadataFraAvleverendeSystem.saksbehandler`)                | -                                 | - |
| `korrespondansepartNavn` for korrespondanseparttype avsender i arkivmeldingen | Svarmottakerens navn (`svarSendesTil.navn`)                                           | -                                 | - |
| `postadresse` for korrespondanseparttype avsender i arkivmeldingen            | Svarmottakerens adresselinje 1 (`svarSendesTil.adresse1`)                             | -                                 | - |
| `postnummer` for korrespondanseparttype avsender i arkivmeldingen             | Svarmottakerens postnummer (`svarSendesTil.postnr`)                                   | -                                 | - |
| `poststed` for korrespondanseparttype avsender i arkivmeldingen               | Svarmottakerens poststed (`svarSendesTil.poststed`)                                   | -                                 | - |
| `land` for korrespondanseparttype avsender i arkivmeldingen                   | Svarmottakerens land (`svarSendesTil.land`)                                           | -                                 | - |
| Mime-type for fil nedlastet til integrasjonspunktet                           | Mime-type for vedlegget (`filMetadata.mimetype`)                                      | -                                 | - |
| Filnavn for fil nedlastet til integrasjonspunktet                             | Filnavn for vedlegget (`filMetadata.filnavn`)                                         | -                                 | - |
