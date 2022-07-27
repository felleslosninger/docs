---
title: Transforasjon fra arkivmelding til KS SvarUt
description: ""
summary: ""
permalink: eformidling_utvikling_arkivmelding_til_ks_svarut.html
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer utgående meldinger til kall mot APIet for KS SvarUt.
Integrasjonspunktet supplerer utgående meldinger med opplysninger fra konfigurasjon, standardverdier og oppslag hos
tredjeparter.

| Til KS SvarUt                                                                         | Fra eFormidling `arkivmelding` melding                                                     | Fra Konfigurasjon                  | Fra Standardverdi |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------- | ----------------- |
| Mottakerens organisasjonsnummer (`mottaker.digitalAdresse.orgnr`)                     | Organisasjonsnummer for mottaker som oppgitt i SBD                                         | -                                  | - |
| Svarmottakerens organisasjonsnummer (`svarSendesTil.digitalAdresse.orgnr`)            | Organisasjonsnummer for avsender som oppgitt i SBD                                         | -                                  | - |
| Svarmottakerens navn (`svarSendesTil.postAdresse.navn`)                               | `korrespondansepartNavn` for korrespondanseparttype avsender som oppgitt i arkivmeldingen  | -                                  | Navn for avsender hentes fra Enhetsregisteret |
| Svarmottakerens adresselinje 1 (`svarSendesTil.postAdresse.adresse1`)                 | `postadresse` for korrespondanseparttype avsender som oppgitt i arkivmeldingen             | -                                  | Postadresse for avsender hentes fra Enhetsregisteret  |
| Svarmottakerens postnummer (`svarSendesTil.postAdresse.postnr`)                       | `postnummer` for korrespondanseparttype avsender som oppgitt i arkivmeldingen              | -                                  | Postnummer for avsender hentes fra Enhetsregisteret  |
| Svarmottakerens poststed (`svarSendesTil.postAdresse.poststed`)                       | `poststed` for korrespondanseparttype avsender som oppgitt i arkivmeldingen                | -                                  | Poststed for avsender hentes fra Enhetsregisteret |
| Svarmottakerens land (`svarSendesTil.postAdresse.land`)                               | `land` for korrespondanseparttype avsender som oppgitt i arkivmeldingen                    | -                                  | Land for avsender hentes fra Enhetsregisteret |
| Identifikator for meldingen (`forsendelsesId`)                                        | Scope `SENDER_REF` som oppgitt i SBD, ellers meldingsindentifikator som oppgitt i SBD      | -                                  | - |
| Type melding (`foresendelsesType`)                                                    | `arkivmelding.dpf.forsendelsesType` som oppgitt i SBD                                      | -                                  | - |
| Ekstern identifikator for meldingen                                                   | Meldingsidentifikator som oppgitt i SBD                                                    | -                                  | - |
| Identifikator for meldingen dette er et svar på (`svarPaForsendelse`)                 | Scope `RECEIVER_REF` som oppgitt i SBD                                                     | -                                  | - |
| Meldingen krever nivå 4-innlogging for å kunne lastes ned (`krevNiva4Innlogging`)     | `arkivmelding.sikkerhetsnivaa` som oppgitt i SBD                                           | -                                  | `false` |
| Tittel for meldingen (`tittel`)                                                       | `offentligTittel` som oppgitt i arkivmeldingen                                             | -                                  | - |
| Avsenders sakssekvensnummer (`metadataFraAvleverendeSystem.saksekvensnummer`)         | `sakssekvensnummer` som oppgitt i arkivmeldingen                                           | -                                  | - |
| Avsenders saksår (`metadataFraAvleverendeSystem.saksaar`)                             | `saksaar` som oppgitt i arkivmeldingen                                                     | -                                  | - |
| Avsenders journalår (`metadataFraAvleverendeSystem.journalaar`)                       | `journalaar` som oppgitt i arkivmeldingen                                                  | -                                  | - |
| Avsenders journalsekvensnummer (`metadataFraAvleverendeSystem.journalseksvensnummer`) | `journalseksvensnummer` som oppgitt i arkivmeldingen                                       | -                                  | - |
| Avsenders journalpostnummer (`metadataFraAvleverendeSystem.journalpostnummer`)        | `journalpostnummer` som oppgitt i arkivmeldingen                                           | -                                  | - |
| Avsenders journalposttype (`metadataFraAvleverendeSystem.journalposttype`)            | `journalposttype` som oppgitt i arkivmeldingen                                             | -                                  | Inngående dokument (`I`) |
| Avsenders journalstatus (`metadataFraAvleverendeSystem.journalstatus`)                | `journalstatus` som oppgitt i arkivmeldingen                                               | -                                  | Ferdigstilt fra saksbehandler (`R`) |
| Avsenders journaldato (`metadataFraAvleverendeSystem.journaldato`)                    | `journaldato` som oppgitt i arkivmeldingen                                                 | -                                  | - |
| Avsenders dokumentdato (`metadataFraAvleverendeSystem.dokumentetsDato`)               | `dokumentetsDato` som oppgitt i arkivmeldingen                                             | -                                  | - |
| Avsenders tittel (`metadataFraAvleverendeSystem.tittel`)                              | `offentligTittel` som oppgitt i arkivmeldingen                                             | -                                  | - |
| Avssenders saksbehandler (`metadataFraAvleverendeSystem.saksbehandler`)               | `saksbehandler` for korrespondanseparttype avsender som oppgitt i arkivmeldingen           | -                                  | - |
| Filnavn for vedlegget (`dokumenter[].filnavn`)                                        | Filnavn som oppgitt ved opplasting til integrasjonspunktet                                 | -                                  | - |
| Mime-type for vedlegget (`dokumenter[].mimetype`)                                     | Mime-Type som oppgitt ved opplasting til integrasjonspunktet                               | -                                  | - |
| Selve vedlegget (binært dokument) (`dokumenter[].data`)                               | Binært dokument som oppgitt ved opplasting til integrasjonspunktet                         | -                                  | - |
| Hvilket system som sendte meldingen (`avgivendeSystem`)                               | -                                                                                          | `difi.move.noarksystem.type`       | - |
| Faktureringskonto for meldingen (`konteringsKode`)                                    | -                                                                                          | `difi.move.fiks.ut.konteringsKode` | - |
| Indikerer om meldingen er kryptert til KS SvarUt (`kryptert`)                         | -                                                                                          | `difi.move.fiks.kryptert`          | `true` |
| Mottakerens navn (`mottaker.postAdresse.navn`)                                        | -                                                                                          | -                                  | Navn for mottaker hentes fra Enhetsregisteret |
| Mottakerens adresselinje 1 (`mottaker.postAdresse.adresse1`)                          | -                                                                                          | -                                  | Adresselinje 1 for mottaker hentes fra Enhetsregisteret |
| Mottakerens postnummer (`mottaker.postAdresse.postnr`)                                | -                                                                                          | -                                  | Postnummer for mottaker hentes fra Enhetsregisteret |
| Mottakerens poststed (`mottaker.postAdresse.poststed`)                                | -                                                                                          | -                                  | Poststed for mottaker hentes fra Enhetsregisteret |
| Mottakerens land (`mottaker.postAdresse.land`                                         | -                                                                                          | -                                  | Land for mottaker hentes fra Enhetsregisteret |
| Bestemmer om tosidig utskrift skal brukes (`printKonfigurasjon.tosidig`)              | -                                                                                          | -                                  | `true` |
| Bestemmer om fargeutskrift skal brukes (`printKonfigurasjon.fargePrint`)              | -                                                                                          | -                                  | `false` |
| Bestemmer hvilken postutsending som skal brukes (`printKonfigurasjon.brevtype`)       | -                                                                                          | -                                  | B-post |
| Bestemmer om meldingen bare skal kunne leveres digitalt (`kunDigitalLevering`)        | -                                                                                          | -                                  | `false` |

Nærmere beskrivelse av funksjonaliteten i KS SvarUt finnes på:

- [Teknisk dokumentasjon for KS SvarUt](https://ks-no.github.io/svarut/integrasjon/forsendelseservicev9/) (ekstern lenke)
