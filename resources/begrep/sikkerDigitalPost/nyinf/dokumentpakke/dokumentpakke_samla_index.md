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

**Innhold**

| Fil                      | Kardinalitet | Beskrivelse                                                                                                                      |
| ------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| hoveddokument            | 1..1         | fil - se: krav til [filnavn og dokumentformat](dokumentformat_index.html)                                                               |
| [manifest.xml](Manifest.md) | 1..1         | [manifest](Manifest.md)                                                                                                             |
| vedlegg                  | 0..200       | fil - se: krav til [filnavn og dokumentformat](dokumentformat_index.html)                                                               |
| META-INF/signatures.xml  | 1..1         | [XAdES](http://www.etsi.org/deliver/etsi_ts%5C101900_101999%5C101903%5C01.04.02_60%5Cts_101903v010402p.pdf) signaturer av filene |

**Begrensninger**

  - Dokumentpakken kan ikke overstige 30Mb
  - Dokumentpakken kan inneholde et hoveddokument
  - Dokumentpakken kan ha inntil 200 vedlegg
  - Avsender kan ikke definere rekkefølgende på vedleggene, sorteringen
    av disse håndteres av postkassen.

**Eksempel**

  - [Manifest](../../eksempler/sdpManifest.xml)
  - [Full dokumentpakke](../../eksempler/post.asice.zip)

**Refererte standarder**

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

**Attributer**

| Identifikator                     | Kardinalitet | Datatype                              |
| --------------------------------- | ------------ | ------------------------------------- |
| [Mottaker](sdp_mottaker.html) | 1..1         | [sdp:Mottaker](sdp_mottaker.html) |
| [Avsender](sdp_avsender.html) | 1..1         | [sdp:Avsender](sdp_avsender.html) |
| hoveddokument                     | 1..1         | [sdp:Dokument](sdp_dokument.html) |
| vedlegg                           | 0..200       | [sdp:Dokument](sdp_dokument.html) |

**Eksempel**

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

Transportinfrastrukturen som brukes for å sende DPI-meldinger kan i utgangspunktet frakte en hver filtype fra avsender til mottaker, men det er begrenset hva tjenesteleverandørene som mottar meldingene (postkasseleverandører og utskrifts- og forsendelsestjenesten) håndterer. Se oversikt over støttede MIME types i neste avsnitt.

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

**Begrensninger**

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

**Feilhåndtering**

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

**Forutsetning ved sending av EHF filer**

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

**Forutsetninger for maskinell behandling av EHF fakturaen i digipost**

  - Det må finnes exakt en PaymentMeans.
  - Det må finnes exakt en PaymentId inne i paymentMeans
  - Det må finnes en PaymentMeanDueDate
  - Det må finnes en PayeeFinancialAccount med ID och SchemeID
  - PayeeFinancialAccount SchemeID må være IBAN
  - Valutan må være NOK

## Sikkerhet

  - Integritet ivaretas ved at dokumentene (posten til mottaker) pakkes
    og signeres iht. [Associated Signature Container
    (ASiC)](http://www.etsi.org/deliver/etsi_ts/103100_103199/103174/02.02.01_60/ts_103174v020201p.pdf)
    fra ETSI. Dette formatet ivaretar integriteten over tid.
  - Konfidensialitet fra avsender til mottaker ivaretas ved bruk av
    [Cryptographic Message Syntax
    (CMS)](http://tools.ietf.org/html/rfc5652) fra IETF
  - Integritetsbeskyttet [Standard Business Document
    (SBD)](http://www.gs1.org/ecom/standards/guidelines#s2) fra
    UN/CEFACT knytter sammen den krypterte pakken med adressering,
    varsling og annen metadata. 

En forsendelse i Sikker digital post inneholder blant annet informasjon
for varsling og et hoveddokument med null eller flere vedlegg.

Her beskrives hvordan dokumenter og vedlegg som sendes i Sikker digital
post er beskyttet.

Dokumentene og metadata relatert til dokumentene pakkes i en
dokumentpakke som ivaretar dokumentenes integritet, samt integriteten
til metadata relatert til dokumentene. Dokumentpakkens konfidensialitet
ivaretas ved at dokumentpakken krypteres med en symmetrisk
engangsnøkkel, og den symmetriske nøkkelen krypteres med mottakerens
sertifikat som hentes fra oppslagstjenesten for kontaktinformasjon.

**Standarder**

| Standard              | Dokument                                                                                                                                   | Versjon        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| ETSI, ETSI TS 102 918 | [Electronic Signatures and Infrastructures (ESI); Associated Signature](etsi1)                                                             | ETSI, 2013-06. |
| ETSI, ETSI TS 103 174 | [Electronic Signatures and Infrastructures (ESI); ASiC Baseline Profile](etsi2)                                                            | ETSI, 2013-06. |
| ETSI, ETSI TS 101 903 | [Electronic Signatures and Infrastructures (ESI); XML Advanced Electronic Signatures (XAdES)](etsi3)                                       | ETSI, 2010-12. |
| ETSI, ETSI TS 103 171 | [Electronic Signatures and Infrastructures (ESI); XAdES Baseline Profile](etsi4)                                                           | ETSI, 2012-03. |
| IETF, RFC 5652        | [Cryptographic Message Syntax <notexttile>(CMS)</notexttile>](ietf5)                                                                       | IETF, 2009-09. |
| IETF, RFC 3560        | [Use of the RSAES-OAEP Key Transport Algorithm in the Cryptographic Message Syntax <notexttile>(CMS)</notexttile>](ietf6)                  | IETF, 2003-07. |
| IETF, RFC 3565        | [Use of the Advanced Encryption Standard (AES) Encryption Algorithm in Cryptographic Message Syntax <notexttile>(CMS)</notexttile>](ietf7) | IETF, 2003-07. |
| IETF, RFC 5084        | [Using AES-CCM and AES-GCM Authenticated Encryption in the Cryptographic Message Syntax <notexttile>(CMS)</notexttile>](ietf8)             | IETF, 2007-11. |
| IETF, RFC 5083        | [Cryptographic Message Syntax (CMS) Authenticated-Enveloped-Data Content Type](ietf9)                                                      | IETF, 2007-11  |

**Integritet**

Integriteten til dokumentene skal kunne valideres mange år etter mottak,
og er ivaretatt ved digitale signaturer som beskrevet nedenfor. I
praksis er dette en zip-fil med en gitt struktur som inneholder en
digital signatur over innholdet.

**ASiC profil for dokumentpakken brukt i sikker digital post**

Hoveddokumentet og vedleggene pakkes sammen i en dokumentpakke sammen
med noe metadata i henhold til [ASiC (ETSI TS 102 918)](etsi1), og
videre begrenset i henhold til profilen definert i [Baseline Profile
(ETSI TS 103 174)](etsi2). Ytterlige begrensninger [Baseline Profile
(ETSI TS 103 174)](etsi2) følger nedenfor:

| Krav                   | Felt                                                                                                                                | Kommentar                                                                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [krav 6.1](etsi2_9)    | “ASiC conformance”                                                                                                                  | Skal være “ASiC-E XAdES”                                                                                                                                                                                  |
| [krav 8.1](etsi2_11)   | “ASiC-E Media type identification”                                                                                                  | Skal være “ASiC file extension is ”.asice“”                                                                                                                                                               |
| [krav 8.2](etsi2_11)   | “ASiC-E Signed data object”                                                                                                         | Alle filer utenfor META-INF katalogen skal være signert.                                                                                                                                                  |
| [krav 8.3.1](etsi2_12) | “ASiC-E XAdES signature”                                                                                                            | Det skal kun være en signatur i META-INF katalogen, med navn signatures.xml. Denne signaturen skal dekke alle andre filer i beholderen, og avsenderens virksomhetssertifikat skal benyttes for signering. |
| [krav 8.3.2](etsi2_12) | “Requirements for the contents of Container” refererer til “6.2.2 punkt 4b) "META-INF/manifest.xml" if present \[…\] i ”ASiC":etsi1 | Denne filen skal ikke være tilstede.                                                                                                                                                                      |

**Signatur i dokumentpakken for sikker digital post**

Dokumentpakken bør være signert av [Behandlingsansvarlig](../Aktorer.md),
men kan signeres av [Databehandler](../Aktorer.md).

Signaturen skal være i henhold til [XAdES (ETSI TS 101 903)](etsi3) med
basisprofilen definert i [XAdES Baseline Profile (ETSI TS 103
171)](etsi4) (B-Level Conformance). Ytterlige begrensninger til [XAdES
Baseline Profile (ETSI TS 103 171)](etsi4) følger nedenfor:

<table>
<thead>
<tr class="header">
<th>Krav</th>
<th>Felt</th>
<th>Kommentar</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="etsi4_8">krav 5.1</a></td>
<td>“Algorithm requirements”</td>
<td>Signeringsalgoritmen skal være <a href="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256">http://www.w3.org/2001/04/xmldsig-more#rsa-sha256</a>. Fingeravtrykksalgoritmen i referansene skal være <a href="http://www.w3.org/2001/04/xmlenc#sha256">http://www.w3.org/2001/04/xmlenc#sha256</a>. Fingeravtrykksalgoritmen i CertDigest skal være <a href="http://www.w3.org/2000/09/xmldsig#sha1">http://www.w3.org/2000/09/xmldsig#sha1</a>.</td>
</tr>
<tr class="even">
<td><a href="etsi4_10">krav 6.2.1</a></td>
<td>“Placement of the signing certificate”</td>
<td>Alle sertifikater fra virkomhetsertifikatet og opp til og inkludert en tiltrodd rot skal være inkludert.</td>
</tr>
<tr class="odd">
<td><a href="etsi4_11">krav 6.2.2</a></td>
<td>“Canonicalization of ds:SignedInfo element”</td>
<td>Bør være <a href="http://www.w3.org/2006/12/xml-c14n11">http://www.w3.org/2006/12/xml-c14n11</a><br />
Kan være <a href="http://www.w3.org/TR/2001/REC-xml-c14n-20010315">http://www.w3.org/TR/2001/REC-xml-c14n-20010315</a></td>
</tr>
<tr class="even">
<td><a href="etsi4_11">krav 6.2.3</a></td>
<td>“Profile of ds:Reference element”</td>
<td>Alle dokumenter skal være med, og det er ikke lov med referanser utenfor dokumentpakken.</td>
</tr>
<tr class="odd">
<td><a href="etsi4_12">krav 6.2.4</a></td>
<td>“Transforms within ds:Reference element”</td>
<td>Alle fil-referansene skal være uten transform, og referansen til SignedProperties skal være <a href="http://www.w3.org/TR/2001/REC-xml-c14n-20010315">http://www.w3.org/TR/2001/REC-xml-c14n-20010315</a></td>
</tr>
<tr class="even">
<td><a href="etsi4_12">krav 6.3.1</a></td>
<td>“Profile of xades:SigningCertificate element”</td>
<td>Ingen ytterlige begrensninger.</td>
</tr>
<tr class="odd">
<td><a href="etsi4_13">krav 6.3.2</a></td>
<td>“Profile of xades:SigningTime element”</td>
<td>Tidsangivelsen skal være korrekt innenfor +/- 5 sekunder.</td>
</tr>
<tr class="even">
<td><a href="etsi4_13">krav 6.3.3</a></td>
<td>“Profile of xades:DataObjectFormat element”</td>
<td>Kun MimeType og ObjectReference skal være med.</td>
</tr>
</tbody>
</table>

**Konfidensialitet**

Dokumentpakken krypteres til mottakers sertifikat som leveres fra
oppslagstjenesten. Krypteringen skal gjøres i henhold til [CMS
(Cryptographic Message Syntax)](ietf5) med begrensninger angitt
nedenfor.

CMS er BER og DER kodet ASN.1 og starter med en sekvens av ContentInfo

    ContentInfo ::= SEQUENCE {
      contentType ContentType,
      content [0] EXPLICIT ANY DEFINED BY contentType 
    }

Her skal følgende begrensninger gjelde:

  - contentType = 1.2.840.113549.1.7.3 (id-envelopedData).
  - content er EnvelopedData som beskrevet nedenfor.

<!-- end list -->

    EnvelopedData ::= SEQUENCE {
      version CMSVersion,
      originatorInfo [0] IMPLICIT OriginatorInfo OPTIONAL,
      recipientInfos RecipientInfos,
      encryptedContentInfo EncryptedContentInfo,
      unprotectedAttrs [1] IMPLICIT UnprotectedAttributes OPTIONAL }

Her skal følgende begrensninger gjelde:

  - version = 0
  - originatorInfo skal ikke være med
  - recipientInfos skal være en mengde av nøyaktig en
    KeyTransRecipientInfo som beskrevet nedenfor
  - encryptedContentInfo er EncryptedContentInfo som beskrevet nedenfor
  - unprotectedAttrs skal ikke være med

<!-- end list -->

    KeyTransRecipientInfo ::= SEQUENCE {
      version CMSVersion, -- always set to 0 or 2
      rid RecipientIdentifier,
      keyEncryptionAlgorithm KeyEncryptionAlgorithmIdentifier,
      encryptedKey EncryptedKey 
    }

Her skal følgende begrensninger gjelde:

  - version = 0
  - rid = issuerAndSerialNumber
  - keyEncryptionAlgorithm er en AlgorithmIdentifier som beskrevet
    nedenfor
  - encryptedKey den krypterte nøkkelen

<!-- end list -->

    AlgorithmIdentifier  ::=  SEQUENCE  {
      algorithm               OBJECT IDENTIFIER,
      parameters              ANY DEFINED BY algorithm OPTIONAL  }

Her skal følgende begrensninger gjelde:

  - algorithm = 1.2.840.113549.1.1.7 (id-RSAES-OAEP) som spesifisert i
    [RSAES-OAEP Key Transport Algorithm](ietf6)
  - parameteres = RSAES-OAEP-params som definert nedenfor

<!-- end list -->

    RSAES-OAEP-params  ::=  SEQUENCE  {
      hashFunc    [0] AlgorithmIdentifier DEFAULT sha1Identifier,
      maskGenFunc [1] AlgorithmIdentifier DEFAULT mgf1SHA1Identifier,
      pSourceFunc [2] AlgorithmIdentifier DEFAULT pSpecifiedEmptyIdentifier  }

Her skal følgende begrensninger gjelde

  - hashFunc = sha1Identifier 
  - maskGenFunc = mgf1SHA1Identifier
  - pSourceFunc = pSpecifiedEmptyIdentifier

<!-- end list -->

    EncryptedContentInfo ::= SEQUENCE {
      contentType ContentType,
      contentEncryptionAlgorithm ContentEncryptionAlgorithmIdentifier,
      encryptedContent [0] IMPLICIT EncryptedContent OPTIONAL 
    }

Her skal følgende begrensninger gjelde:

  - contentType = 1.2.840.113549.1.7.1 (data)
  - contentEncryptionAlgorithm er en AlgorithmIdentifier som beskrevet
    nedenfor
  - encryptedContent = AES-CBC kryptert innhold med PKCS \#5 padding

<!-- end list -->

    AlgorithmIdentifier  ::=  SEQUENCE  {
      algorithm               OBJECT IDENTIFIER,
      parameters              ANY DEFINED BY algorithm OPTIONAL  }

Her skal verdiene være i henhold til [Use of the Advanced Encryption
Standard (AES) Encryption Algorithm in Cryptographic Message Syntax
<notexttile>(CMS)</notexttile>](ietf7), med følgende begrensninger:

  - algorithm = 2.16.840.1.101.3.4.1.42 (aes256-CBC)
  - parameters = 16 byte IV

Ved bruk av aes256-CBC skal padding gjøres i henhold til [kapittel 6.3 i
CMS spesifikasjonen](ietf5_6_3)

Integriteten til den krypterte dokumentpakken ivaretas av
[Dokumentpakkefingeravtrykk](../../begrep/Dokumentpakkefingeravtrykk.md)
som ligger i en signert melding.

Det er avsenders ansvar å generere en AES-nøkkel med tilstrekkelig
tilfeldighet. Kilden bør være en sertifisert generator for tilfeldige
tall (TRNG).

**Mulig fremtidig utvidelse**

Valg av kryptoalgoritme er begrenset til AES-CBC, men AES-GCM har også
vært vurdert, og kan tas inn senere ved behov. Årsaken til ikke å ta
med AES-GCM i denne omgang er at den ikke er støttet i s/mime, og dermed
hindrer bruk av s/mime klienter for ende-til-ende kryptering.

Ved fremtidig støtte for AES-GCM vil følgende begrensninger gjelde:

ContentInfo vil være:

  - contentType = 1.2.840.113549.1.9.16.1.23 (id-ct-authEnvelopedData)
    ved bruk av AES-GCM.
  - content AuthEnvelopedData

AuthEnvelopedData er definert i [Cryptographic Message Syntax (CMS)
Authenticated-Enveloped-Data Content Type](ietf9)

    AuthEnvelopedData ::= SEQUENCE {
      version CMSVersion,
      originatorInfo [0] IMPLICIT OriginatorInfo OPTIONAL,
      recipientInfos RecipientInfos,
      authEncryptedContentInfo EncryptedContentInfo,
      authAttrs [1] IMPLICIT AuthAttributes OPTIONAL,
      mac MessageAuthenticationCode,
      unauthAttrs [2] IMPLICIT UnauthAttributes OPTIONAL

Her skal følgende begrensninger gjelde:

  - version = 0
  - originatorInfo skal ikke være med
  - recipientInfos skal være en mengde av nøyaktig en
    KeyTransRecipientInfo som beskrevet nedenfor
  - authEncryptedContentInfo er EncryptedContentInfo som beskrevet
    nedenfor
  - authAttrs skal ikke være med
  - mac skal være 12 byte “authentication tag” som output av AES-GCM
    definert i NIST Special Publication 800-38D.
  - unauthAttrs skal ikke være med

For AuthEnvelopedData (AES-GCM) skal verdiene av EncryptedContentInfo
være i henhold til [Using AES-CCM and AES-GCM Authenticated
Encryption](ietf8).

  - algorithm = 2.16.840.1.101.3.4.1.46 (aes256-GCM) 
  - parameters = GCMParameters som beskrevet nedenfor

<!-- end list -->

    GCMParameters ::= SEQUENCE {
      aes-nonce        OCTET STRING, -- recommended size is 12 octets
      aes-ICVlen       AES-GCM-ICVlen DEFAULT 12 }

Her skal følgende begrensninger gjelde:

  - aes-nonce = 12 byte IV/Teller
  - aes-ICVlen = 12

\[etsi1\]http://www.etsi.org/deliver/etsi\_ts/102900\_102999/102918/01.03.01\_60/ts\_102918v010301p.pdf  
\[etsi2\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103174/02.02.01\_60/ts\_103174v020201p.pdf  
\[etsi2\_9\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103174/02.02.01\_60/ts\_103174v020201p.pdf\#page=9  
\[etsi2\_11\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103174/02.02.01\_60/ts\_103174v020201p.pdf\#page=11  
\[etsi2\_12\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103174/02.02.01\_60/ts\_103174v020201p.pdf\#page=12  
\[etsi3\]http://www.etsi.org/deliver/etsi\_ts%5C101900\_101999%5C101903%5C01.04.02\_60%5Cts\_101903v010402p.pdf  
\[etsi4\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103171/02.01.01\_60/ts\_103171v020101p.pdf  
\[etsi4\_8\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103171/02.01.01\_60/ts\_103171v020101p.pdf\#page=8  
\[etsi4\_10\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103171/02.01.01\_60/ts\_103171v020101p.pdf\#page=10  
\[etsi4\_11\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103171/02.01.01\_60/ts\_103171v020101p.pdf\#page=11  
\[etsi4\_12\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103171/02.01.01\_60/ts\_103171v020101p.pdf\#page=12  
\[etsi4\_13\]http://www.etsi.org/deliver/etsi\_ts/103100\_103199/103171/02.01.01\_60/ts\_103171v020101p.pdf\#page=13  
\[ietf5\]http://tools.ietf.org/html/rfc5652  
\[ietf5\_6\_3\]http://tools.ietf.org/html/rfc5652\#section-6.3  
\[ietf6\]http://tools.ietf.org/html/rfc3560  
\[ietf7\]http://tools.ietf.org/html/rfc3565  
\[ietf8\]http://tools.ietf.org/html/rfc5084  
\[ietf9\]http://tools.ietf.org/html/rfc5083

