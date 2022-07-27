---
title: Overordnet struktur på forretningsmeldinger
permalink: dpi_struktur_forretningsmelding.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

## Overordnet struktur på forretningsmeldinger

Alle meldinger sendt gjennom Sikker digital post infrastrukturen har
samme grunnleggende struktur, og består av følgende (nestede)
hovedelementer, innenfra og utover:

  - **Dokumentpakke** - dette er selve meldingen som skal sendes gjennom
    infrastrukturen. Denne består av et dokument med eventuelle vedlegg.
  - **Forretningsmelding** - (forretnings)informasjon til Postkasse om
    hvordan Dokumentpakken skal behandles.
  - **Standard Business Document** - (forretnings og ruting)informasjon
    til Meldingsformidler om hvordan Forretningsmeldingen skal
    behandles.
 
Tabellen under angir normal ansvarsfordeling/eierskap på de forskjellige
delene av forretningsmeldingen. Eier har ansvar for å ivareta
integriteten for sin del av meldingen, samt håndtering av integritet i
neste nivå i meldingen.  
I praksis betyr dette at eier er ansvarlig for signering av sin del.

| Element    | Eier     | Identifikator    | Kontroll eierskap  | Kommentar    |
| --- | --- | --- | --- | --- |
| Dokumentpakke              | [Avsender](sdp_aktorer.html) | Manifest/Avsender | Signerte bruksvilkår med Sentralforvalter | Eierskapet til dokumentpakken blir bruk til å garantere integriteten til dokumentpakken over tid. Det kan tenkes at dokumentpakken blir signert av en [Databehandler](sdp_aktorer.html). I så tilfelle bør dette klart framkomme av selve dokumentet, slik at Mottaker forstår sammenhengen. |
| Forretningmelding          | [Avsender](sdp_aktorer.html) | DigitalPostMelding/Avsender | Registrert hos Sentralforvalter | Vil som regel være den samme som eier av dokumentpakken. |
| Standard Business Document | [Avsender](sdp_aktorer.html) | DigitalPostMelding/Avsender | Registrert hos Sentralforvalter | Skal alltid være den samme som eier av Forretningsmelding |

Postboksleverandør er ansvarlig for å validere eier-integriteten i meldingen på vegne av Sentralforvalter. Meldinger som ikke har gyldig integritet blir avvist.  
Integriteten blir sjekket ved å sammenligne virksomhetsidentifikator i virksomhetssertifikat med identifikator i meldingen på signaturen relatert til den delen av meldingen, og at kombinasjonen av disse stemmer med opplysninger i vedlagt maksinportentoken. 
Avsender er ansvarlig for å vaildere integriteten på mottatte kvittering

### Praktiske eksempler

#### “Best practise” eksempel

<code>  
Avsender (NAV) tilpasser eget fagsystem og bruker sitt eget
virksomhetssertifikat  
</code>

| Felt     | Verdi[1](#link1) | Signatur[1](#link1) | Validering    |
| --- | --- | --- | --- |
| Manifest/Avsender           | NAV        | NAV           | Postboks sjekker at Dokumentpakken er signert av NAV, verdien i Manifest/Avsender er NAV og at Manifest/Avsender har samme verdi som DigitalPostMelding/Avsender |
| DigitalPostMelding/Avsender | NAV        | \-            | Postboks sjekker at kombinasjonen DigitalPostMelding/Avsender og SBDH/Sender er gyldig (godkjent av Sentralforvalter) i forhold til maksinportentoken fra forretningsmeldingen |
| SBDH/Sender                 | NAV        | NAV           | Postboks sjekker at signaturen stemmer med verdien i SBDH/Sender (skal være like) |

eksepmpler
[forretningsmelding eksempel](resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_1_0_nav_sample.json)
[leveringskvittering](resources/begrep/sikkerDigitalPost/nyinf/eksempler/lerveringskvittering_nav_sample.json)

#### “Påvegne” eksempel

<code>  
Avsender (Bunadsrådet) bruker en skytjeneste levert av Acos  
</code>

| Felt  | Verdi[1](#link1)  | Signatur[1](#link1) | Validering      |
| --- | --- | --- | --- |
| Manifest/Avsender           | Bunadsrådet | Acos          | Postboks sjekker at Dokumentpakken er signert av Acos, verdien i Manifest/Avsender er Bunadsrådet og at Manifest/Avsender har samme verdi som DigitalPostMelding/Avsender |
| DigitalPostMelding/Avsender | Bunadsrådet | \-            | Postboks sjekker at kombinasjonen DigitalPostMelding/Avsender og SBDH/Sender er gyldig (godkjent av Sentralforvalter) i forhold til maksinportentoken fra forretningsmeldingen |
| SBDH/Sender                 | Acos        | Acos          | Postboks sjekker at signaturen stemmer med verdien i SBDH/Sender (skal være like) |

[forretningsmelding eksempel](resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_1_0_budnad_sample.json)
[leveringskvittering](resources/begrep/sikkerDigitalPost/nyinf/eksempler/lerveringskvittering_budnad_sample.json)

#### “Påvegne” med avsenderidentifikator eksempel

<code>  
Avsender (Bunadsrådet) bruker en skytjeneste levert av Acos  
</code>

| Felt  | Verdi[1](#link1)  | Signatur[1](#link1) | Validering      |
| --- | --- | --- | --- |
| Manifest/Avsender           | Bunadsrådet | Acos          | Postboks sjekker at Dokumentpakken er signert av Acos, verdien i Manifest/Avsender er Bunadsrådet og at Manifest/Avsender har samme verdi som DigitalPostMelding/Avsender |
| DigitalPostMelding/Avsender | Bunadsrådet | \-            | Postboks sjekker at kombinasjonen DigitalPostMelding/Avsender og SBDH/Sender er gyldig (godkjent av Sentralforvalter) i forhold til maksinportentoken fra forretningsmeldingen |
| SBDH/Sender                 | Acos        | Acos          | Postboks sjekker at signaturen stemmer med verdien i SBDH/Sender (skal være like) |

[forretningsmelding eksempel](resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_1_0_budnad_sample.json)
[leveringskvittering](resources/begrep/sikkerDigitalPost/nyinf/eksempler/lerveringskvittering_budnad2_sample.json)

## Standarder benyttet i strukturen
- Integritet ivaretas ved at dokumentene (posten til mottaker) pakkes og signeres iht. [Associated Signature Container (ASiC)](http://www.etsi.org/deliver/etsi_ts/103100_103199/103174/02.02.01_60/ts_103174v020201p.pdf) fra ETSI. Dette formatet ivaretar integriteten over tid.
- Konfidensialitet fra avsender til mottaker ivaretas ved bruk av [Cryptographic Message Syntax (CMS)](http://tools.ietf.org/html/rfc5652) fra IETF
- Forrettningsmeldinen er basert på [Standard Business Document (SBD)](http://www.gs1.org/ecom/standards/guidelines#s2) fra UN/CEFACT, men JSON benyttes som format i steden for XML. For å ivareta integriteten fra avsender til mottaker pakkes forrettnignsmeldingen som [JWT] (https://datatracker.ietf.org/doc/html/rfc7519). 
- TODO: Beskriv bruk av maksinportetoken


For mer informasjon se relevante deler av dokumentasjonen.


1.  Det er brukt organisasjonsnavn i stedet for organisasjonsnummer for
    å gjøre det litt mer lesevennlig.
