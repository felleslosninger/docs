---

title: Teknisk beskrivelse  
permalink: sdp_teknisk.html
sidebar:
---

## {{page.title}}

Det overordnede prinsippet for sending av en melding, er
[fail-fast](http://en.wikipedia.org/wiki/Fail-fast) - det vil si at feil
skal detekteres så tidlig som mulig - da dette gir bedre og raskere
feedback til avsender.  
Dette innebærer at Meldingsformidler kan avvise meldinger som ikke
overholder XSD skjema, eller har ugyldige verdier for felter den trenger
for videreformidling (eksempelvis Receiver/Sender i
StandardBusinessDocumentHeader).  
Alle aktører skal der det er mulig benytte EBMS signalling for å
indikere feilen.

Postkassene skal gi en EBMS-feil og/eller SOAP Fault dersom det er
transport (SOAP/EBMS) eller routing problematikk (SBDH).  
Ellers sendes feil som egne forretningmeldinger av typen [FeilMelding](../meldinger/Feil.md). Dette sikrer at feilene i
flyter tilbake til avsender i de tilfeller avsender har gjort feil.

| Feiltype?  | Hva gjør Avsender?  | Hva gjør Meldingsformidler(MF)?  | Hva gjør Postkasseleverandør(PK)? | Hva gjør MF hvis PK svarer med soap fault? |
| --- | --- | --- | --- | --- |
| Ugyldig XML                        | Manuell håndtering  | HTTP 400                         | HTTP 400                          | Manuell håndtering                         |
| WS-security                        | Manuell håndtering  | SOAP-fault (EBMS-signal)         | SOAP-fault (EBMS-signal)          | Manuell håndtering                         |
| EBMS-feil                          | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Skjemavalidering                   | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Feil i SBD-signatur                | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Feil i SBDH                        | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Feil i SBD                         | Manuell håndtering  | SOAP-fault + EBMS-signal         | [Feil](../meldinger/Feil.md)  | N/A                                        |
| Feil i ASIC (signering/kryptering) | Manuell håndtering  | N/A                              | [Feil](../meldinger/Feil.md)  | N/A                                        |
| Intern feil i system               | Prøver på ny senere | SOAP-fault + EBMS-signal (Other) | SOAP-fault + EBMS-signal (Other)  | Prøver på ny senere                        |

### Feilmeldinger / kvitteringer

Følgende responser kan Avsender forvente å få tilbake dersom feilen over
oppstår.

| Feiltype?  | Respons   |
| --- | --- |
| Kan ikke validere signaturene (manglende eller feil i signatur) | EBMS error: SignatureValidation                                             |
| Bruk av sertifikat fra uventet utsteder                         | EBMS error: SignatureValidation                                             |
| Feil signeringsalgoritmer                                       | EBMS error: PolicyNonCompliance                                             |
| Ukjent organisasjonsnummer                                      | EMBS error: FailedAuthentication                                            |
| Feil bruk av eller feil verdier på felter i EBMS                | EBMS Error: ValueInconsistent eller ValueNotRecognized                      |
| Feil bruk av eller feil verdier på felter i SBDH                | EBMS Error: ValueInconsistent eller ValueNotRecognized                      |
| Feil eller manglende signatur på SBD                            | EBMS error: SignatureValidation                                             |
| Postkasse kan ikke dekryptere dokumentpakke                     | [Feil](../meldinger/Feil.md) type:KLIENT detaljer:“Kan ikke dekryptere” |
| Manglende eller feil signatur inni dokumentpakke                | [Feil](../meldinger/Feil.md) type:KLIENT detaljer:“Feil signatur”       |
| Feil bruk av eller feil verdier i SBD melding                   | [Feil](../meldinger/Feil.md) type:KLIENT detaljer:“Feil i manifest”     |
| Feil bruk av eller feil verdier på felter                       | [Feil](../meldinger/Feil.md) type:KLIENT detaljer:“Ugyldig verdi … ”    |
| Sending av ukjente payloads som SOAP body                       | EBMS error: FeatureNotSupported                                             |
| Intern feil                                                     | EBMS error: Other                                                           |
