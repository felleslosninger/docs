---
title: Transformasjon fra digital_dpv til Altinn Digital Post
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Tabellen under viser hvordan integrasjonspunktet transformerer utgående meldinger til kall mot APIet for Altinn Digital
Post. Integrasjonspunktet supplerer utgående meldinger med opplysninger fra konfigurasjon, standardverdier og
oppslag hos tredjeparter.

| Til Altinn Digital Post       | Fra eFormidling `digital_dpv` melding                                                                          | Fra konfigurasjon| Fra standardverdi|
|--|--|--|--|
| Mottakerens organisasjonsnummer (`recipients[]`)                                        | Organisasjonsnummer for mottaker som oppgitt i SBD                                                               | -| -|
| Avsenderens navn slik det presenteres for mottaker (`correspondence.messageSender`)     | -| -| Navn for avsenderen hentes fra Enhetsregisteret|
| Avsenderens organisasjonsnummer (`correspondence.sender`)            | -| -| Organisasjonsummer for avssender|
| Kode for tjeneste i Altinn (`correspondence.resourceId`)                                | Altinn-tjenesten som tilsvarer prosessen som oppgitt i SBD                                                       | -| -|
| Sender referanse (`correspondence.sendersReference`)                                    | Meldingsidentifikator `documentIdentification.instanceIdentifier`i SBD                                           | -| -|
| Tittel for meldingen (`correspondence.content.messageTitle`)                            | `digital_dpv.tittel` som oppgitt i SBD                                                                           | -| -|
| Sammendrag av meldingen (`correspondence.content.messageSummary`)                       | `digital_dpv.sammendrag` som oppgitt i SBD                                                                       | -| -|
| Selve meldingen (`correspondence.content.messageBody`)                                  | `digital_dpv.innhold` som oppgitt i SBD                                                                          | -| -|
| Filnavn for vedlegget (`correspondence.content.attachments[].fileName`)                 | Filnavn for vedlegget som oppgitt ved opplasting til integrasjonspunktet                                         | -| -|
| Visningsnavn for vedlegget (`correspondence.content.attachments[].displayName`)         | Navn for vedlegget som oppgitt ved opplasting til integrasjonspunktet                                            | -| -|
| Referanse for vedlegget (`correspondence.content.attachments[].sendersReference`)       | -| -| `AttachmentReference_as123452`|
| Indikerer om vedlegget er kryptert (`correspondence.content.attachments[].isEncrypted`)            | -| -| `false`|
| Selve vedlegget (`attachments`)                                                         | Dokument som oppgitt ved opplasting til integrasjonspunktet                                                      | -| -|
| Språkkode for innholdet (`correspondence.content.language`)                             | -| -| Norsk bokmål (`nb`)|
| Bestemmer svarfrist som vises for mottaker (`correspondence.dueDateTime`)| -| `difi.move.dpv.enableDueDate` og `difi.move.dpv.daysToReply`| 7 dager etter meldingen sendes|
| Tidspunktet meldingen gjøres tilgjengelig for mottaker (`correspondence.requestedPublishTime`)              | -| -| Tidspunktet meldingen sendes|
| Om meldingen er taushetsbealgt eller ikke (`correspondence.isConfidential`)             | -| -| `true` om meldingen er taushetsbelagt, ellers `false`|
| Om bekreftelse er nødvendig (`correspondence.isConfirmationNeeded`)                     | -| -| `false`|
| Hele meldingen skrives inn av avsender og sendes i sin helhet til mottaker  (`correspondence.notification.notificationTemplate`)                     | -| -| `CustomMessage`|
| Epost emne (`correspondence.notification.emailSubject`)                     | -| -| `Melding mottatt i Altinn`|
| Epost tekst (`correspondence.notification.emailBody`)                              | Vanlig post: `digital_dpv.dpv.varselTekst`<br>Taushetsbelagt post: `digital_dpv.dpv.taushetsbelagtVarselTekst` | Vanlig post: `difi.move.dpv.notificationText`<br>Taushetsbelagt post: `difi.move.dpv.sensitiveNotificationText` | Vanlig post: `$correspondenceRecipientName$: Du har mottatt en melding fra $reporterName$.`<br>Taushetsbelagt post: `$correspondenceRecipientName$, har mottatt en taushetsbelagt melding fra $reporterName$. For å få tilgang til meldingen, er det nødvendig at noen i $correspondenceRecipientName$ har fått tildelt rollen "Taushetsbelagt post fra det offentlige" i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen "Taushetsbelagt post" på Altinns nettsider.` |
| Det er ikkje skrudd på html støtte i epost tekst (`correspondence.notification.emailContentType`)                     | -| -| `Plain`|
| Sms tekst (`correspondence.notification.smsBody`)                     | Vanlig post: `digital_dpv.dpv.varselTekst`<br>Taushetsbelagt post: `digital_dpv.dpv.taushetsbelagtVarselTekst` | Vanlig post: `difi.move.dpv.notificationText`<br>Taushetsbelagt post: `difi.move.dpv.sensitiveNotificationText` | Vanlig post: `$correspondenceRecipientName$: Du har mottatt en melding fra $reporterName$.`<br>Taushetsbelagt post: `$correspondenceRecipientName$, har mottatt en taushetsbelagt melding fra $reporterName$. For å få tilgang til meldingen, er det nødvendig at noen i $correspondenceRecipientName$ har fått tildelt rollen "Taushetsbelagt post fra det offentlige" i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen "Taushetsbelagt post" på Altinns nettsider.` |
| Om det skal sendes påminnelses varsel eller ikke (`correspondence.notification.sendReminder`)      | `digital_dpv.dpv.varselType` som oppgitt i SBD                                                                  | -| Varsel med revarsel|
| Epost emne for revarsel epost (`correspondence.notification.reminderEmailSubject`)     | -| -| Melding mottatt i Altinn|
| Epost tekst for revarsel epost (`correspondence.notification.reminderEmailBody`)                              | Vanlig post: `digital_dpv.dpv.varselTekst`<br>Taushetsbelagt post: `digital_dpv.dpv.taushetsbelagtVarselTekst` | Vanlig post: `difi.move.dpv.notificationText`<br>Taushetsbelagt post: `difi.move.dpv.sensitiveNotificationText` | Vanlig post: `$correspondenceRecipientName$: Du har mottatt en melding fra $reporterName$.`<br>Taushetsbelagt post: `$correspondenceRecipientName$, har mottatt en taushetsbelagt melding fra $reporterName$. For å få tilgang til meldingen, er det nødvendig at noen i $correspondenceRecipientName$ har fått tildelt rollen "Taushetsbelagt post fra det offentlige" i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen "Taushetsbelagt post" på Altinns nettsider.` |
| Det er ikkje skrudd på html støtte i epost tekst for revarsel epost(`correspondence.notification.reminderEmailContentType`)                     | -| -| `Plain`|
| Sms tekst for revarsel sms(`correspondence.notification.reminderSmsBody`)                     | Vanlig post: `digital_dpv.dpv.varselTekst`<br>Taushetsbelagt post: `digital_dpv.dpv.taushetsbelagtVarselTekst` | Vanlig post: `difi.move.dpv.notificationText`<br>Taushetsbelagt post: `difi.move.dpv.sensitiveNotificationText` | Vanlig post: `$correspondenceRecipientName$: Du har mottatt en melding fra $reporterName$.`<br>Taushetsbelagt post: `$correspondenceRecipientName$, har mottatt en taushetsbelagt melding fra $reporterName$. For å få tilgang til meldingen, er det nødvendig at noen i $correspondenceRecipientName$ har fått tildelt rollen "Taushetsbelagt post fra det offentlige" i Altinn. Dersom dere er usikre på om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om å gi tilgang til rollen "Taushetsbelagt post" på Altinns nettsider.` |
| Bestemmer hvilke kanal(er) som skal brukes ved varsling (`correspondence.notification.notificationChannel`) | `digital_dpv.dpv.varselTransportType` som oppgitt i SBD | `difi.move.dpv.notifyEmail`<br>`difi.move.dpv.notifySms`| Både SMS og e-post|
| Bestemmer hvilke kanal(er) som skal brukes ved revarsling (`correspondence.notification.reminderNotificationChannel`) | `digital_dpv.dpv.varselTransportType` som oppgitt i SBD | `difi.move.dpv.notifyEmail`<br>`difi.move.dpv.notifySms`| Både SMS og e-post|
| Bestemmer når mottaker skal varsles om meldingen (`correspondence.notification.requestedSendTime`) | -| -| 5 minutter etter meldingen sendes|




Nærmere beskrivelse av funksjonaliteten i Altinn Digital Post finnes på:

- [Teknisk dokumentasjon for Altinn 3 meldingstjenester](https://docs.altinn.studio/nb/correspondence/) (ekstern lenke)
