---
title: Dokumentpakke (ASiC)
permalink: dpi_dokumentpakke_samla_index.html
sidebar: dpi_new_sidebar
---

1. TOC
{:toc}

## Introduksjon

Dokumentpakke inngår kun i [DigitalPostMeldinger](../../meldinger/DigitalPostMelding.md).

[Associated Signature Container (ASiC)](http://www.etsi.org/deliver/etsi_ts/102900_102999/102918/01.03.01_60/ts_102918v010301p.pdf)
er et pakkeformat som er designet for å ivareta integritet til innholdet over lang tid. Kort fortalt så definerer standarden hvordan man skal
sette sammen en zip fil med en filstruktur der man lager en digital signatur hver enkel fil med en kombinasjon av et digitalt fingeravtrykk
av filen og et PKI sertifikat eid av en virksomheten. Dette medfører at man kan verifisere at filene kommer fra rett virksomhet, og om filene har blitt endret.

Les mer om [hvordan dokumenter som sendes i Sikker digital post er beskyttet](sikkerhet_index.html)

Sikker Digital Post har definert et eget begrep [Manifest](Manifest.md) som
inneholder metadata relatert til hver fil.

### Innhold

| Fil                      | Kardinalitet | Beskrivelse                                                                                                                      |
| ------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| hoveddokument            | 1..1         | fil - se: krav til [filnavn og dokumentformat](dokumentformat_index.html)                                                               |
| [manifest.xml](Manifest.md) | 1..1         | [manifest](Manifest.md)                                                                                                             |
| vedlegg                  | 0..200       | fil - se: krav til [filnavn og dokumentformat](dokumentformat_index.html)                                                               |
| META-INF/signatures.xml  | 1..1         | [XAdES](http://www.etsi.org/deliver/etsi_ts%5C101900_101999%5C101903%5C01.04.02_60%5Cts_101903v010402p.pdf) signaturer av filene |

### Begrensninger

  - Dokumentpakken kan ikke overstige 30Mb
  - Dokumentpakken kan inneholde et hoveddokument
  - Dokumentpakken kan ha inntil 200 vedlegg
  - Avsender kan ikke definere rekkefølgende på vedleggene, sorteringen
    av disse håndteres av postkassen.

### Eksempel

  - [Manifest](../../eksempler/sdpManifest.xml)
  - [Full dokumentpakke](../../eksempler/post.asice.zip)

### Refererte standarder

  - [Associated Signature Container
    (ASiC)](http://www.etsi.org/deliver/etsi_ts/102900_102999/102918/01.03.01_60/ts_102918v010301p.pdf)
  - [XAdES](http://www.etsi.org/deliver/etsi_ts%5C101900_101999%5C101903%5C01.04.02_60%5Cts_101903v010402p.pdf)

## Langtidslagring

[Associated Signature Container
(ASiC)](http://www.etsi.org/deliver/etsi_ts/102900_102999/102918/01.03.01_60/ts_102918v010301p.pdf)
er et pakkeformat som er designet for å ivareta integritet til innholdet
over lang tid.  
Dette medfører at man kan verifisere at filene kommer fra rett
virksomhet, og om filene har blitt endret.

Postkasseleverandørene er forpliktet til å oppbevare innholdet i
Dokumentpakken så lenge innbygger ønsker.

Det betyr at følgende langtidsoppbevares i forbindelse med en sending av
digital post:

  - hoveddokument
  - vedlegg
  - [Manifest](../../eksempler/sdpManifest.xml)
  - [META-INF/signatures.xml](http://www.etsi.org/deliver/etsi_ts%5C101900_101999%5C101903%5C01.04.02_60%5Cts_101903v010402p.pdf)

## Manifest


|---|---|
| Term          | {{page.title}} |
| Definisjon    | inneholder metadata relatert til hver fil i en forsendelse. |
| Datatype      | complexType |
| Kilde         | DIFI |
| Kommentar     | Manifest er en xml |
| fil           | som inneholder relevant informasjon om [dokumentene](sdp_dokument.html) i [dokumentpakken](dokumentpakke_index.md). [Manifest xml](/resources/begrep/sikkerDigitalPost/xsd/sdp-manifest.xsd) |
| filen         | skal langtidsoppbevares sammen med dokumentene for å bevare integriteten på hele [dokumentpakken](dokumentpakke_index.md) over lang tid. |

### Attributer

| Identifikator                     | Kardinalitet | Datatype                              |
| --------------------------------- | ------------ | ------------------------------------- |
| [Mottaker](sdp_mottaker.html) | 1..1         | [sdp:Mottaker](sdp_mottaker.html) |
| [Avsender](sdp_avsender.html) | 1..1         | [sdp:Avsender](sdp_avsender.html) |
| hoveddokument                     | 1..1         | [sdp:Dokument](sdp_dokument.html) |
| vedlegg                           | 0..200       | [sdp:Dokument](sdp_dokument.html) |

### Eksempel

``` 
<?xml version="1.0" encoding="UTF-8"?>
<manifest
  xmlns="http://begrep.difi.no/sdp/schema_v10"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://begrep.difi.no/sdp/schema_v10 ../xsd/sdp-manifest.xsd ">

  <mottaker>
    <person>
      <personidentifikator>17051400000</personidentifikator>
      <postkasseadresse>ola.nordmann#0ABC</postkasseadresse>
    </person>
  </mottaker>

  <avsender>
    <organisasjon authority="iso6523-actorid-upis">9908:123456789</organisasjon>
    <avsenderidentifikator>A</avsenderidentifikator>
    <fakturaReferanse>ABC barnehage</fakturaReferanse>
  </avsender>

  <hoveddokument href="vedtak_2398324.pdf" mime="application/pdf">
    <tittel lang="no">Vedtak</tittel>
  </hoveddokument>

  <vedlegg href="info.html" mime="text/html">
    <tittel lang="no">informasjon</tittel>
  </vedlegg>

  <vedlegg href="journal.txt" mime="text/plain">
    <tittel lang="no">journal</tittel>
  </vedlegg>

</manifest>

```

## Dokumentformater

Transportinfrastrukturen som brukes for å sende DPI-meldinger kan i utgangspunktet frakte en hver filtype fra avsender til mottaker, men det er begrenset hva tjenesteleverandørene som mottar meldingene (postkasseleverandører og utskrifts- og forsendelsestjenesten) håndterer, se [oversikt over støttede MIME types](dpi_mimetypes.html).

Eksekverbare filer kan ikke sendes i Sikker digital posttjeneste.

Det utføres ingen endringer i innholdet i mottatte dokumenter. Linker, bilder eller referanser til annet innhold fjernes ikke og dokumentet blir vist i et eget vindu/frame.

Generelle regler for alle filer:

  - Alle filnavn skal være UTF-8

Spesielle regler knyttet til de enkelte dokument formatene:

  - [HTML dokumenter](dpi_html.html)
  - [EHF dokumenter](dpi_ehf.html)

## MIME type

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | MIME type |
| Datatype      | fil |

Følgende mimetypes er tillatt sendt i digital post til innbygger.  
Visning av blant annet PDF, DOC, ODF og OOXML krever at brukeren har
installert en viewer eller et annet program som kan vise det gjeldende
formatet.

| Filtype | MIME type                                                                 |
| ------- | ------------------------------------------------------------------------- |
| pdf     | application/pdf                                                           |
| html    | text/html                                                                 |
| xml     | application/ehf+xml                                                       |
| txt     | text/plain                                                                |
| odf     | application/vnd.oasis.opendocument.formula                                |
| odt     | application/vnd.oasis.opendocument.text                                   |
| fods    | application/vnd.oasis.opendocument.spreadsheet                            |
| fodp    | application/vnd.oasis.opendocument.presentation                           |
| fodg    | application/vnd.oasis.opendocument.graphics                               |
| gif     | image/gif                                                                 |
| jpeg    | image/jpeg                                                                |
| png     | image/png                                                                 |
| doc     | application/msword                                                        |
| docx    | application/vnd.openxmlformats-officedocument.wordprocessingml.document   |
| xlsx    | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         |
| pptx    | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| zip     | application/octet-stream                                                  |
| Utvidelser: |                                                                       |
| xml     | [application/vnd.difi.dpi.bevis+xml](sdp_bevis.html)                      |
| xml     | [application/vnd.difi.dpi.lenke+xml](sdp_lenke.html)                      |
| xml     | [application/vnd.difi.dpi.arrangement+xml](sdp_arrangement.html)          |

Listen kan eventuelt utvides ved behov.

## HTML

    |---|---|
| Identifikator | html |
| Term          | HTML |
| Definisjon    | HTML fil |
| Datatype      | fil |

Dersom en melding er levert som ren HTML vil denne vises til
posttmottaker uten bruk av nettlesertillegg.

### Begrensninger

1.  Av sikkerhetsmessige hensyn, og for å sikre korrekt visning i hele
    dokumentets levetid, kan dokumentet ikke inneholde referanser til
    eksternt innhold eller javascript. 
2.  Links til egne sider er unntatt og kan benyttes.  
    \#\* Lenker må ha: target=“\_blank” for å kunne være klikkbare
3.  Bilder som ønskes brukt i HTML-brev skal derfor legges inn i HTML
    encodet etter “”data url scheme“” (RFC 2397).  
    \#\* img src kan ikke være multiline
4.  HTML-dokumenter får ikke inneholder forms av følgende årsaker:  
    \#\* Dersom serveren, som mottar POST fra en form, ikke svarer
    korrekt eller ikke lengre finnes, vil dette resultere i at brukerne
    blir møtt med en feil som ikke kan håndteres av postkassen.  
    \#\* Det vil ikke kunne sende med troverdige opplysninger om hvem
    brukeren er.
5.  Det tillates ikke bruk av Flash, Java, JavaScript eller andre
    tredjepartsløsninger som ikke inngår i HTML-standardene.
6.  hr align-attr er ikke tillatt
7.  Tabeller kan benyttes  
    \#\* td elementer kan ikke være tom

Det anbefales at HTML overholder W3C og WCAG av hensyn til
tilgjengeligheten og for å sikre nettleserkompatibilitet.

Bredden i viewport som er tilgjengelig i postkasse for visning av HTML
brev er i utgangspunktet 793 pixels.  
Dvs. HTML dokumenter som sendes som er større enn 793 pixels vil
resultere i horisontal scrolling (standard nettleser oppførsel).  
Vi oppfordrer Avsendere som sender HTML dokumenter til å ikke benytte
abolutte bredder i dokumentet og tilpasse bilder til å møte denne
bredden.

Postkasseløsningen er reponsiv som betyr at på mobil vises HTML
dokumentet som avsender har sendt helt alene.  
Det anbefales alltid at det ikke benyttes en fast bredde og at innholdet
tilpasser seg browserens størrelse.  
Dvs. bruk av responsiv teknikker i HTML dokumentet (fra avsender) vil
resultere i et mye mer brukervennlig dokument på mobile enheter.

### Feilhåndtering

HTML-meldinger som ikke oppfyller disse kravene blir avvist ved mottak.
Dette vil resultere i en SKAL VÆRE LINK TIL ../../meldinger/FeilMelding.md 
Avsendervirksomheten må korrigere meldingene og sende på nytt.

## EHF

 - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    EHF faktura fil
  - Datatype  
    fil

   |---|---|
| Identifikator | ehf |
| Term          | EHF |
| Definisjon    | EHF faktura fil |
| Datatype      | fil |

Dersom en melding er levert som ren EHF vil denne vises til
posttmottaker uten bruk av nettlesertillegg.  
EHF filen vil konverteres til en HTML visning i henhold til Difi sin mal
for visning av EHF filer til innbyggere.

Postkasseleverandøren kan ha funksjonalitet for å maskinelt behandle EHF
fakturaen for videresending direkte til nettbanken til innbygger.  
En slik tjeneste vil da være priset. Se prisoversikt på
http://samarbeid.difi.no

### Forutsetning ved sending av EHF filer

1.  Det er kun støtte for å sende EHF faktura  
    \#\* Sending av EHF kreditnota er ikke støttet i digital postkasse
    til innbyggere
2.  Mimetype for EHF faktura skal være: “application/ehf+xml”
3.  EHF filen skal alltid være hoveddokument  
    \#\* EHF filen kan sendes som vedlegg, men da er det ikke garantert
    at dette vil kunne vises til innbyggere i annet enn XML format
4.  Det skal kun sendes en EHF fil i en forsendelse
5.  Postkasseleverandør vil kun validere EHF filen i henhold til XSD.  
    \#\* Det er Avsender sitt ansvar at data i EHF filen er korrekt
6.  Det skal ikke være embedded vedlegg i EHF filen.  
    \#\* Eventuelle vedlegg til EHF filen skal legges som ordinære
    vedlegg i dokumentpakken  
    \#\* Difi kan ikke garantere for at embedded vedlegg i EHF faktura
    vil vises i postkassene.

### Forutsetninger for maskinell behandling av EHF fakturaen i digipost:

  - Det må finnes exakt en PaymentMeans.
  - Det må finnes exakt en PaymentId inne i paymentMeans
  - Det må finnes en PaymentMeanDueDate
  - Det må finnes en PayeeFinancialAccount med ID och SchemeID
  - PayeeFinancialAccount SchemeID må være IBAN
  - Valutan må være NOK
## Sikkerhet
