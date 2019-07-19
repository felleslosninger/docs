---

title: AapningsKvittering  
permalink: sdp_aapningskvittering.html
sidebar:
---

### {{page.title}}

  - Identifikator
    [https://begrep.difi.no/SikkerDigitalPost/1.3.0.RC1/1.3.0.RC1/meldinger/AapningsKvittering]
  - Term  
    {{page.title}}
  - Definisjon  
    En [KvitteringsMelding](KvitteringsMelding.md) til Avsender om at
    Mottaker har åpnet forsendelsen i sin postkasse.
  - Kilde  
    DIFI
  - Kommentar  
    Åpningskvitteringer blir bare sendt dersom dette er bestilt av
    [Avsender](../forretningslag/StandardBusinessDocument/Sender.md) i
    [digital post meldingen](DigitalPostMelding.md) ved å spesifisere dette
    i [digitalpostinfo](../begrep/DigitalPostInfo.md).  
    [Mottaker](../begrep/Mottaker.md) må aksepteres at det sendes en
    [ÅpningsKvittering](AapningsKvittering.md) til
    [Avsender](../forretningslag/StandardBusinessDocument/Sender) for å
    få lest den digital posten.  
    Mangel på [ÅpningsKvittering](AapningsKvittering.md) betyr at
    [Mottaker](../begrep/Mottaker.md) ikke har lest dokumentet.

Bruk av [ÅpningsKvittering](AapningsKvittering.md) er priset for
[Avsender](../forretningslag/StandardBusinessDocument/Sender.md).

Åpningskvittering vil være påkrevd helt frem til Innbygger har akseptert
at kvitteringen sendes til Avsender. Det vil si at Åpningskvittering kan
komme lang tid etter at [digital post meldingen](DigitalPostMelding.md)
blir sendt.

### Anbefalt bruk

Åpningskvittering er en funksjonalitet som brukes av Avsendere kun etter
en grundig og dokumentert vurdering.  
Funksjonaliteten vil kunne oppleves som påtrengende for Mottaker da man
ikke får tilgang til å lese den posten man har mottatt uten å godta at
kvitteringen blir sendt.

For mer informasjon om bruk av denne funksjonaliteten kan man ta kontakt
med Sentralforvalter.

### Attributer
| --- | --- | --- |
| Identifikator | Kardinalitet | Datatype |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
