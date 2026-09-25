---
title: Transformasjon fra KS SvarInn til arkivmelding
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---


Her finner du informasjon om transformasjoner fra KS SvarInn til arkivmelding, 
for arkivmelding til KS SvarUt sjå her:
[Transformasjon fra arkivmelding til KS SvarUt]({% link _docs/eFormidling/Utvikling/Transformasjoner/arkivmelding_til_ks_svarut.md %}).


Nærmere beskrivelse av funksjonaliteten i KS SvarInn finnes på [Teknisk dokumentasjon for KS SvarInn](https://ks-no.github.io/svarut/integrasjon/mottaksservice-rest/) (ekstern lenke)


1. TOC 
{:toc}

## Tabell over transformasjoner {#tabell}

Tabellen under viser hvordan integrasjonspunktet transformerer responser fra APIet for KS SvarInn til innkommende
meldinger. Integrasjonspunktet supplerer innkommende meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter.

| Til eFormidling `arkivmelding` melding                                        | Fra KS SvarInn                                                                        | Fra konfigurasjon                 | Fra standardverdi                                        |
|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------|----------------------------------------------------------|
| Meldingsidentifikator i SBD                                                   | Identifikator for meldingen (`id`)                                                    | -                                 | -                                                        |
| Konversasjonsidentifikator i SBD                                              | Identifikator for meldingen (`id`)                                                    | -                                 | -                                                        |
| Prosess i SBD                                                                 | -                                                                                     | `difi.move.fiks.inn.process`      | `urn:no:difi:profile:arkivmelding:administrasjon:ver1.0` |
| Dokumenttype i SBD                                                            | -                                                                                     | `difi.move.fiks.inn.documentType` | `urn:no:difi:arkivmelding:xsd::arkivmelding`             |
| Organisasjonsnummer for mottaker i SBD                                        | Mottakerens organisasjonsnummer (`mottaker.orgnr`)                                    | -                                 | -                                                        |
| Organisasjonsnummer for avsender i SBD                                        | Svarmottakerens organisasjonsnummer (`svarSendesTil.orgnr`)                           | -                                 | -                                                        |
| Scope `RECEIVER_REF` i SBD                                                    | Identifikator for meldingen dette er et svar på (`svarPaForsendelse`)                 | -                                 | -                                                        |
| `offentligTittel` i arkivmeldingen                                            | Tittel for meldingen (`tittel`)                                                       | -                                 | -                                                        |
| `sakssekvensnummer` i arkivmeldingen                                          | Avsenders sakssekvensnummer (`metadataFraAvleverendeSystem.saksekvensnummer`)         | -                                 | -                                                        |
| `saksaar` i arkivmeldingen                                                    | Avsenders saksår (`metadataFraAvleverendeSystem.saksaar`)                             | -                                 | -                                                        |
| `journalaar` i arkivmeldingen                                                 | Avsenders journalår (`metadataFraAvleverendeSystem.journalaar`)                       | -                                 | -                                                        |
| `journalseksvensnummer` i arkivmeldingen                                      | Avsenders journalsekvensnummer (`metadataFraAvleverendeSystem.journalseksvensnummer`) | -                                 | -                                                        |
| `journalpostnummer` i arkivmeldingen                                          | Avsenders journalpostnummer (`metadataFraAvleverendeSystem.journalpostnummer`)        | -                                 | -                                                        |
| `journalposttype` i arkivmeldingen                                            | Avsenders journalposttype (`metadataFraAvleverendeSystem.journalposttype`)            | -                                 | Inngående dokument (`I`)                                 |
| `journalstatus` i arkivmeldingen                                              | Avsenders journalstatus (`metadataFraAvleverendeSystem.journalstatus`)                | -                                 | Ferdigstilt fra saksbehandler (`R`)                      |
| `journaldato` i arkivmeldingen                                                | Avsenders journaldato (`metadataFraAvleverendeSystem.journaldato`)                    | -                                 | -                                                        |
| `dokumentetsDato` i arkivmeldingen                                            | Avsenders dokumentdato (`metadataFraAvleverendeSystem.dokumentetsDato`)               | -                                 | -                                                        |
| `offentligTittel` i arkivmeldingen                                            | Avsenders tittel (`metadataFraAvleverendeSystem.tittel`)                              | -                                 | -                                                        |
| `saksansvarlig` i arkivmeldingen  `                                           | Avsenders saksbehandler (`metadataFraAvleverendeSystem.saksbehandler`)                | -                                 | -                                                        |
| `virksomhetsspesifikkeMetadata` i arkivmeldingen                              | Ekstra metadata (`metadataFraAvleverendeSystem.ekstraMetadata`)                       | -                                 | -                                                        |
| `korrespondansepartNavn` for korrespondanseparttype avsender i arkivmeldingen | Svarmottakerens navn (`svarSendesTil.navn`)                                           | -                                 | -                                                        |
| `postadresse` for korrespondanseparttype avsender i arkivmeldingen            | Svarmottakerens adresselinje 1 (`svarSendesTil.adresse1`)                             | -                                 | -                                                        |
| `postnummer` for korrespondanseparttype avsender i arkivmeldingen             | Svarmottakerens postnummer (`svarSendesTil.postnr`)                                   | -                                 | -                                                        |
| `poststed` for korrespondanseparttype avsender i arkivmeldingen               | Svarmottakerens poststed (`svarSendesTil.poststed`)                                   | -                                 | -                                                        |
| `land` for korrespondanseparttype avsender i arkivmeldingen                   | Svarmottakerens land (`svarSendesTil.land`)                                           | -                                 | -                                                        |
| Mime-type for fil nedlastet til integrasjonspunktet                           | Mime-type for vedlegget (`filMetadata.mimetype`)                                      | -                                 | -                                                        |
| Filnavn for fil nedlastet til integrasjonspunktet                             | Filnavn for vedlegget (`filMetadata.filnavn`)                                         | -                                 | -                                                        |


## Eigendefinerte metadata i meldingen {#metadata}

Det er støtte for å legge til eigendefinerte metadata i meldingen.
Dette gjøres ved å legge til verdier i feltet `metadataFraAvleverendeSystem.ekstraMetadata`. Verdiene fra 
`metadataFraAvleverendeSystem.ekstraMetadata` blir overført til `virksomhetsspesifikkeMetadata` i arkivmeldingen.
Dataen blir gjort om til enkle key-value elementer i XML-en.

Eksempel på mapping som blir gjort fra `metadataFraAvleverendeSystem.ekstraMetadata` til `virksomhetsspesifikkeMetadata` i arkivmeldingen.

```json
{
  "ekstraMetadata": {
    "forvaltningsnummer": "20050",
    "objektnavn": "Mitt objekt"
  }
}
```

```xml
<virksomhetsspesifikkeMetadata>
    <forvaltningsnummer>20050</forvaltningsnummer>
    <objektnavn>Mitt objekt</objektnavn>
</virksomhetsspesifikkeMetadata>
```