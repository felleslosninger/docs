---
title: Oppslagstjenesten for kontakt og reservasjonsregisteret  

sidebar:
---

### Integrasjonsguide:

  - Integrasjonsguide er tilgjengelig på [DIFI sin samarbeidsportal](http://samarbeid.difi.no)

### Tjenestespesifikasjonen:

Oppslagstjenesten for Kontakt- og Reservasjonsregisteret er en
webservice, sikra med WS-security. Det må benyttes
virksomhetssertifikater ihtt rammeverket for PKI i offentlig sektor for
å få tilgang.

  - [WSDL definisjon]({{site.baseurl}}/resources/begrep/oppslagstjenesten/xsd/oppslagstjeneste-ws-16-02.wsdl)
  - [XSD definisjon]({{site.baseurl}}/resources/begrep/oppslagstjenesten/xsd/oppslagstjeneste-ws-16-02.wsdl)
  - [XSD metadata]({{site.baseurl}}/resources/begrep/oppslagstjenesten/xsd/oppslagstjeneste-metadata-16-02.xsd)
  - [XSD definisjon for fil
    eksport](xsd/kontaktregister-export-14-05.xsd)
  - [Egendefinert SOAP header: paaVegneAv]({{site.baseurl}}/resources/begrep/felles/paaVegneAv)
  - [Web Service Security header]({{site.baseurl}}/resources/begrep/oppslagstjenesten/ws-security/WebserviceSecurity)

### Datamodell:

For en oversikt over den eksterne datamodellen utlevert fra
Oppslagstjenesten se klassedefinisjonen for [Person]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Person).

### Klassedefinisjonen

Følgende liste gir en oversikt over de klasser som er brukt i
Oppslagstjenesten.

  - [Epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse)
  - [Kontaktinformation]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Kontaktinformasjon)
  - [Mobiltelefonnummer]({{site.baseurl}}/resources/begrep/felles/mobiltelefonnummer)
  - [Person]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Person)
  - [Sertifikat]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Sertifikat)
  - [SikkerDigitalPostAdresse]({{site.baseurl}}/resources/begrep/oppslagstjenesten/SikkerDigitalPostAdresse)

### Tjenester for offentlige virksomheter:

Følgende forespørslser er tilgjengelig i Oppslagstjenesten for
offentlige virksomheter

 - [HentEndringerForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentEndringerForespoersel)
 - [HentPersonerForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPersonerForespoersel)
 - [HentPrintSertifikatForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPrintSertifikatForespoersel)

### Tjenester for postkasseleverandører knyttet til Digital postkasse til innbyggere:

Postkasseleverandører har følgende forespørsler tilgjengelig i
oppslagstjenesten.

 - [KanVelgeSikkerDigitalPostkasseForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/KanVelgeSikkerDigitalPostkasseForespoersel)
 - [OppdaterPostkasseForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/OppdaterPostkasseForespoersel)
 - [OpprettOgVelgSikkerDigitalPostkasseForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/OpprettOgVelgSikkerDigitalPostkasseForespoersel)
 - SKAL VÆRE LINK TIL OpprettPostkasseForespoersel.md
 - [SlettPostkasseForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/SlettPostkasseForespoersel)
 - [VelgSikkerDigitalPostkasseForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/KanVelgeSikkerDigitalPostkasseForespoersel)
