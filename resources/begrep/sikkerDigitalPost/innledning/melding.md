---

title: Meldingsstruktur  
permalink: sdp_melding.html
sidebar:

---

## Meldingesstruktur

Meldingen som sendes i sikker digital post inneholder følgende:

  - En Dokumentpakke med dokumenter
  - Et Standard business document med informasjon om Dokumentpakken
  - eb:Messaging for transport
  - Webservice Security for å autentisering og integritet i
    kommunikasjonen mot Meldingsformidler

Alt sammen er pakken inn i en SOAP konvolutt slik det er beskrevet i
tegningen under.

[![Figuren viser en overordnet beskrivelse av meldingen i Sikker digital
post](/felleslosninger/resources/begrep/sikkerDigitalPost/innledning//meldingsstruktur_enkel.jpg)

### Standarder benyttet i grensesnittet

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

I tillegg brukes følgende standard i forbindelse med transportlaget:

  - For transport benyttes meldingsutvekslingsrammeverk iht. [ebMS3/AS4
    light client conformance
    profile](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/profiles/AS4-profile/v1.0/os/AS4-profile-v1.0-os.html#__RefHeading__26166_1909778835)
    fra OASIS.
