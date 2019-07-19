---

title: MottaksKvittering  
permalink: sdp_mottakskvittering.html
sidebar:
---

### {{page.title}}

  - Identifikator
    <http://begrep.difi.no/SikkerDigitalPost/1.3.0.RC1/1.3.0.RC1/meldinger/MottaksKvittering>
  - Term  
    {{page.title}}
  - Definisjon  
    En [Kvitteringsmelding](KvitteringsMelding.md) til Avsender om at
    utskrift og forsendelsestjenesten har mottatt forsendelsen og har
    lagt den klar for utskrift.
  - Kilde  
    DIFI
  - Kommentar  
    Denne Kvitteringen leveres tilbake så fort utskrift og
    forsendelsestjenesten har mottatt forsendelsen og validert at den
    kan skrives ut.  
    Forsendelsen vil så legges i kø og tas med i neste utskriftsjobb for
    denne type post.

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
