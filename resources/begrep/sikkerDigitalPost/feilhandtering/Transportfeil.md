---

title: Transportfeil  
permalink: sdp_transportfeil.html
sidebar: dpi_sidebar
---

Feil i transportlaget vil være feil relatert til transportprotokoll og
meldingsutveksling. Transportlaget benytter
[AS 4](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/profiles/AS4-profile/v1.0/os/AS4-profile-v1.0-os.html)
og feil i transportlaget skal følge  
[ebMS 3.0 spesifikasjonen for
feilhåndtering](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/os/ebms_core-3.0-spec-os.html)
Handling|</notextile>outline

I feilsituasjoner vil tjenestene returnere en SOAP-fault. Denne vil både
inneholde en ebMS 3.0 SignalMessage som inneholder informasjon om feilen
og en feilkode i SOAP bodyen.

Feilmeldinger kan bli returnert som standard SOAP-fault uten noen
WS-security-header, og er dermed verken kryptert eller signert slik som
andre meldinger er.  
Dette er fordi feilmeldingene ikke inneholder informasjon som må
integritets- eller konfidensialitetsbeskyttes, samt fordi noen
feilsituasjoner gjør det umulig å kryptere og/eller signere
feilmeldingen.

### Feilhåndtering

Nedenfor er en ikke uttømmende liste over feilsituasjoner og hvordan de
kan håndterest.

| Feiltype?            | Hva gjør Avsender?  | Hva gjør Meldingsformidler(MF)?  | Hva gjør Postkasseleverandør(PK)? | Hva gjør MF hvis PK svarer med soap fault? |
| --- | --- | --- | --- | --- |
| WS-security          | Manuell håndtering  | SOAP-fault (EBMS-signal)         | SOAP-fault (EBMS-signal)          | Manuell håndtering                         |
| EBMS-feil            | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Skjemavalidering     | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Feil i SBD-signatur  | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Feil i SBDH          | Manuell håndtering  | SOAP-fault + EBMS-signal         | SOAP-fault + EBMS-signal          | Manuell håndtering                         |
| Intern feil i system | Prøver på ny senere | SOAP-fault + EBMS-signal (Other) | SOAP-fault + EBMS-signal (Other)  | Prøver på ny senere                        |

Følgende responser kan Avsender forvente å få tilbake dersom feilen over
oppstår.

| Feiltype?  | Respons |
| --- | --- |
| Kan ikke validere signaturene (manglende eller feil i signatur) | EBMS error: SignatureValidation                        |
| Bruk av sertifikat fra uventet utsteder                         | EBMS error: SignatureValidation                        |
| Feil signeringsalgoritmer                                       | EBMS error: PolicyNonCompliance                        |
| Ukjent organisasjonsnummer                                      | EMBS error: FailedAuthentication                       |
| Feil bruk av eller feil verdier på felter i EBMS                | EBMS Error: ValueInconsistent eller ValueNotRecognized |
| Feil bruk av eller feil verdier på felter i SBDH                | EBMS Error: ValueInconsistent eller ValueNotRecognized |
| Feil eller manglende signatur på SBD                            | EBMS error: SignatureValidation                        |
| Sending av ukjente payloads som SOAP body                       | EBMS error: FeatureNotSupported                        |
| Intern feil                                                     | EBMS error: Other                                      |
