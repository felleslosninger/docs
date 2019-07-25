---
title: Oppslagstjenesten for kontakt og reservasjonsregisteret  
permalink: ot_oppslagstjenesten.html
sidebar:
---

### Integrasjonsguide:

  - Integrasjonsguide er tilgjengelig på [DIFI sin samarbeidsportal](http://samarbeid.difi.no)

### Tjenestespesifikasjonen:

Oppslagstjenesten for Kontakt- og Reservasjonsregisteret er en
webservice, sikra med WS-security. Det må benyttes
virksomhetssertifikater ihtt rammeverket for PKI i offentlig sektor for
å få tilgang.

  - [WSDL definisjon](xsd/oppslagstjeneste-ws-16-02.wsdl)
  - [XSD definisjon](xsd/oppslagstjeneste-ws-16-02.xsd)
  - [XSD metadata](xsd/oppslagstjeneste-metadata-16-02.xsd)
  - [XSD definisjon for fil
    eksport](xsd/kontaktregister-export-14-05.xsd)
  - [Egendefinert SOAP header: paaVegneAv](paaVegneAv.md)
  - [Web Service Security header](ws-security/WebserviceSecurity.md)

### Datamodell:

For en oversikt over den eksterne datamodellen utlevert fra
Oppslagstjenesten se klassedefinisjonen for [Person](Person.md).

### Klassedefinisjonen

Følgende liste gir en oversikt over de klasser som er brukt i
Oppslagstjenesten.

  - [Epostadresse](Epostadresse.md)
  - [Kontaktinformation](Kontaktinformasjon.md)
  - [Mobiltelefonnummer](Mobiltelefonnummer.md)
  - [Person](Person.md)
  - [Sertifikat](Sertifikat.md)
  - [SikkerDigitalPostAdresse](SikkerDigitalPostAdresse.md)

### Tjenester for offentlige virksomheter:

Følgende forespørslser er tilgjengelig i Oppslagstjenesten for
offentlige virksomheter

 - [HentEndringerForespoersel](HentEndringerForespoersel.md)
 - [HentPersonerForespoersel](HentPersonerForespoersel.md)
 - [HentPrintSertifikatForespoersel](HentPrintSertifikatForespoersel.md)

### Tjenester for postkasseleverandører knyttet til Digital postkasse til innbyggere:

Postkasseleverandører har følgende forespørsler tilgjengelig i
oppslagstjenesten.

 - [KanVelgeSikkerDigitalPostkasseForespoersel](KanVelgeSikkerDigitalPostkasseForespoersel.md)
 - [OppdaterPostkasseForespoersel](OppdaterPostkasseForespoersel.md)
 - [OpprettOgVelgSikkerDigitalPostkasseForespoersel](OpprettOgVelgSikkerDigitalPostkasseForespoersel.md)
 - SKAL VÆRE LINK TIL OpprettPostkasseForespoersel.md
 - [SlettPostkasseForespoersel](SlettPostkasseForespoersel.md)
 - [VelgSikkerDigitalPostkasseForespoersel](KanVelgeSikkerDigitalPostkasseForespoersel.md)
