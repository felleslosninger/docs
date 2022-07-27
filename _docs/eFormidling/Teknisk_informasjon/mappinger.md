---
title: Mappinger mellom meldingsformater
description: Mappinger mellom meldingsformater

product: eFormidling
redirect_from: /eformidling_mappinger
---

### BestEdu - Arkivmelding

|BestEdu|    |Arkivmelding|    |
|-------|----|------------|----|
|Noarksak| |Saksmappe| |
| |SaSaar| |Saksaar|
| |SaSeknr| |Sakssekvensnummer|
| |SaAnsvinit| |Saksansvarlig|
| |SaAdmkort| |AdministrativEnhet|
| |SaOfftittel| |OffentligTittel|
| |SaId| |SystemID|
| |SaDato| |Saksdato|
| |SaTittel| |Tittel|
| |SaStatus| |Saksstatus|
| |SaArkdel| |ReferanseArkivdel|
| |SaJenhet| |Journalenhet|
|Journpost| |Journalpost| |
| |JpId| |SystemID|
| |JpInnhold| |Tittel|
| |JpJaar| |Journalaar|
| |JpForfdato| |Forfallsdato|
| |JpSeknr| |Journalsekvensnummer|
| |JpJpostnr| |Journalpostnummer|
| |JpNdoktype| |Journalposttype|
| |JpStatus| |Journalstatus|
| |JpArkdel| |ReferanseArkivdel|
| |JpAntved| |AntallVedlegg|
| |JpOffinnhold| |OffentligTittel|
| |JpJdato| |Journaldato|
| |JpDokdato| |DokumentetsDato|
| |JpUoff|Saksmappe|Skjerming.Skjermingshjemmel|
|Journpost.Avsmot| |Korrespondansepart| |
| |AmNavn| |KorrespondansepartNavn|
| |AmAdmkort| |AdministrativEnhet|
| |AmSbhinit| |Saksbehandler|
| |AmAdresse| |Postadresse|
| |AmPostnr| |Postnummer|
| |AmPoststed| |Poststed|
| |AmUtland| |Land|
| |AmIhtype| |Korrespondanseparttype|
| | |Avskrivning| |
| |AmAvskm| |Avskrivningsmaate|
| |AmAvsavdok| |ReferanseAvskrivesAvJournalpost|
| |AmAvskdato| |Avskrivningsdato|
|Journpost.Dokument| |Dokumentbeskrivelse| |
| |DbTittel| |Tittel|
| |DlRnr| |Dokumentnummer|
| |DlType| |TilknyttetRegistreringSom|
| | |Dokumentobjekt| |
| |VeFilnavn| |ReferanseDokumentfil|
| |VeVariant| |Variantformat|

### Arkivmelding - SvarUt

|Arkivmelding/IP|   |SvarUt|   |
|---------------|---|------|---|
|-| |Forsendelse| |
| |SBD.SenderRef/SBD.messageId| |ForsendelseId|
| |messageId| |EksternRef|
| |*false*| |KunDigitalLevering|
| |SBD.ReceiverRef| |SvarPaForsendelse|
| |Journalpost.Offentligtittel| |Tittel|
| |SBD.Sikkerhetsnivaa| |KrevNiva4Innlogging|
| |*IP-property*.konteringskode| |Konteringskode|
| |*IP-property*.kryptert(default: true)| |Kryptert|
| |*IP-property*.noarkSystem.type| |AvgivendeSystem|
| |*statisk: Tosidig, B-post*| |Printkonfigurasjon|
| |*InfoRecord fra SR*| |Mottaker|
| |KorrespondansePart.Avsender| |SvarSendesTil|
|Saksmappe/Journalpost| |NoarkMetadataFraAvleverendeSakssystem| |
| |SM.Sakssekvensnummer| |Sakssekvensnummer|
| |SM.Saksaar| |Saksaar|
| |JP.Journalaar| |Journalaar|
| |JP.Journalsekvensnummer| |Journalsekvensnummer|
| |JP.Journalpostnummer| |Journalpostnummer|
| |JP.Journalposttype| |Journalposttype|
| |JP.Journalstatus| |Journalstatus|
| |JP.Journaldato| |Journaldato|
| |JP.DokumentetsDato| |DokumentetsDato|
| |JP.OffentligTittel| |Tittel|
| |JP.Korrespondansepart.Saksbehandler| |Saksbehandler|
|Dokumentobjekt| |Dokument| |
| |*filinnhold*| |Data|
| |ReferanseDokumentFil| |Filnavn|
| |*fil*.mimetype| |Mimetype|

### SvarInn - BestEdu

|SvarInn|   |BestEdu|   |
|-------|---|-------|---|
|MetadataFraAvleverendeSystem| |Journpost| |
| |Dokumentetsdato| |JpDokdato|
| |Journalposttype| |JpNdoktype|
| |Journalstatus| |JpStatus|
| |Journalaar| |JpJaar|
| |Journalsekvensnummer| |JpSeknr|
| |Journalpostnummer| |JpJpostnr|
| |ForsendelseTittel| |JpOffinnhold|
| |ForsendelseTittel| |JpInnhold|
| |Journaldato| |JpJdato|
| |Saksbehandler| |Avsmot.AmIhtype 0|
| |-            | |...AmNavn|
| |SvarSendesTil| |Avsmot.AmIhtype 1|
| |...Adresse1  | |...AmAdresse|
| |...Postnr    | |...AmPostnr|
| |...Poststed  | |...AmPoststed|
| |...Navn      | |...AmNavn|
| |...Land      | |...AmUtland|
| |...Orgnr     | |...AmOrgnr|
| | |NoarkSak| |
| |Sakssekvensnummer| |SaSeknr|
| |Saksaar| |SaSaar|
| |ForsendelseTittel| |SaTittel|
|File| |Dokument| |
| |MimeType| |VeMimeType|
| |mappet fra MimeType| |VeDokformat|
| |FileName| |VeFilnavn|
| |FileName| |DbTittel|
| | | |VeVariant "P"|
| |*filinnhold*| |Base64|
