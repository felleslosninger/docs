---
title: Struktur på melding  
permalink: sdp_meldingsformat.html
sidebar: sidebar_begrep
---

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
  - **Transportinformasjon** (AS4/SOAP) - Informasjon som transportlaget
    trenger for å formidle meldingen mellom to punkt.

Tabellen under angir normal ansvarsfordeling/eierskap på de forskjellige
delene av forretningsmeldingen. Eier har ansvar for å ivareta
integriteten for sin del av meldingen, samt håndtering av integritet i
neste nivå i meldingen.  
I praksis betyr dette at eier er ansvarlig for signering av sin del.

| Element    | Eier     | Identifikator    | Kontroll eierskap  | Kommentar    |
| --- | --- | --- | --- | --- |
| Dokumentpakke              | [Avsender](https://difi.github.io/felleslosninger/sdp_aktorer.html) | Manifest/Avsender           | Signerte bruksvilkår med Sentralforvalter                                       | Eierskapet til dokumentpakken blir bruk til å garantere integriteten til dokumentpakken over tid. Det kan tenkes at dokumentpakken blir signert av en [Databehandler](https://difi.github.io/felleslosninger/sdp_aktorer.html). I så tilfelle bør dette klart framkomme av selve dokumentet, slik at Mottaker forstår sammenhengen. |
| Forretningmelding          | [Avsender](https://difi.github.io/felleslosninger/sdp_aktorer.html) | DigitalPostMelding/Avsender | Registrert hos Sentralforvalter                                                 | Vil som regel være den samme som eier av dokumentpakken.                                                                                                                                                                                                                            |
| Standard Business Document | [Avsender](https://difi.github.io/felleslosninger/sdp_aktorer.html) | DigitalPostMelding/Avsender | Registrert hos Sentralforvalter                                                 | Skal alltid være den samme som eier av Forretningsmelding                                                                                                                                                                                                                           |
| Transportinformasjon       | [Avsender](https://difi.github.io/felleslosninger/sdp_aktorer.html) | SBDH/Sender                 | Angitt som sender i Standard Business Document, registrert hos Sentralforvalter | Aktøren som er ansvarlig for kommunikasjon med Meldingsformidler. Bør være den samme som over, men kan være en [Databehandler](https://difi.github.io/felleslosninger/sdp_aktorer.html)                                                                                                                                             |

Meldingsformidler er ansvarlig for å validere eier-integriteten i
meldingen på vegne av Sentralforvalter. Meldinger som ikke har gyldig
integritet blir avvist.  
Integriteten blir sjekket ved å sammenligne virksomhetsidentifikator i
virksomhetssertifikat med identifikator i meldingen på signaturen
relatert til den delen av meldingen,  
og at kombinasjonen av disse stemmer med opplysninger registrert hos
Sentralforvalter.

### Praktiske eksempler

#### “Best practise” eksempel

<code>  
Avsender (NAV) tilpasser eget fagsystem og bruker sitt eget
virksomhetssertifikat  
</code>

| Felt     | Verdi[1](#link1) | Signatur[1](#link1) | Validering    |
| --- | --- | --- | --- |
| Manifest/Avsender           | NAV        | NAV           | Postboks sjekker at Dokumentpakken er signert av NAV, verdien i Manifest/Avsender er NAV og at Manifest/Avsender har samme verdi som DigitalPostMelding/Avsender                                                    |
| DigitalPostMelding/Avsender | NAV        | \-            | Meldingsformidler sjekker at kombinasjonen DigitalPostMelding/Avsender og SBDH/Sender er gyldig (godkjent av Sentralforvalter)                                                                                      |
| SBDH/Sender                 | NAV        | NAV           | Meldingsformidler sjekker at signaturen stemmer med verdien i SBDH/Sender (skal være like)                                                                                                                          |
| ebms/SOAP                   | NAV        | NAV           | Meldingsformidler sjekker at denne er korresponderer med SBDH/Sender. For Postboks vil denne verdien alltid være Meldingsformidler (men den skal fortsatt valideres for å sikre at den kommer fra Meldingsformidler |

#### “Påvegne” eksempel

<code>  
Avsender (Bunadsrådet) bruker en skytjeneste levert av Acos  
</code>

| Felt  | Verdi[1](#link1)  | Signatur[1](#link1) | Validering      |
| --- | --- | --- | --- |
| Manifest/Avsender           | Bunadsrådet | Acos          | Postboks sjekker at Dokumentpakken er signert av Acos, verdien i Manifest/Avsender er Bunadsrådet og at Manifest/Avsender har samme verdi som DigitalPostMelding/Avsender                                           |
| DigitalPostMelding/Avsender | Bunadsrådet | \-            | Meldingsformidler sjekker at kombinasjonen DigitalPostMelding/Avsender og SBDH/Sender er gyldig (godkjent av Sentralforvalter)                                                                                      |
| SBDH/Sender                 | Acos        | Acos          | Meldingsformidler sjekker at signaturen stemmer med verdien i SBDH/Sender (skal være like)                                                                                                                          |
| ebms/SOAP                   | Acos        | Acos          | Meldingsformidler sjekker at denne er korresponderer med SBDH/Sender. For Postboks vil denne verdien alltid være Meldingsformidler (men den skal fortsatt valideres for å sikre at den kommer fra Meldingsformidler |

## Standarder benyttet i strukturen

  - Integritet ivaretas ved at dokumentene (posten til mottaker) pakkes
    og signeres iht. [Associated Signature Container
    (ASiC)](http://www.etsi.org/deliver/etsi_ts/103100_103199/103174/02.02.01_60/ts_103174v020201p.pdf)
    fra ETSI. Dette formatet ivaretar integriteten over tid.
  - Konfidensialitet fra avsender til mottaker ivaretas ved bruk av
    [Cryptographic Message Syntax
    (CMS)](http://tools.ietf.org/html/rfc5652) fra IETF
  - [Standard Business Document
    (SBD)](http://www.gs1.org/ecom/standards/guidelines#s2) fra
    UN/CEFACT knytter sammen den krypterte pakken med adressering,
    varsling og annen metadata. 
  - For transport benyttes meldingsutvekslingsrammeverk iht. [ebMS3/AS4
    light client conformance
    profile](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/profiles/AS4-profile/v1.0/os/AS4-profile-v1.0-os.html#__RefHeading__26166_1909778835)
    fra OASIS. 

For mer informasjon se relevante deler av dokumentasjonen.

<a name="link1">
1.  Det er brukt organisasjonsnavn i stedet for organisasjonsnummer for
    å gjøre det litt mer lesevennlig.


