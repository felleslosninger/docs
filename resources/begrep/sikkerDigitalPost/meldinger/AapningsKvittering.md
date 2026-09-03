---

title: AapningsKvittering  

sidebar: dpi_sidebar
redirect_from: /sdp_aapningskvittering
---

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En [KvitteringsMelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/KvitteringsMelding) til Avsender om at Mottaker har åpnet forsendelsen i sin postkasse. |
| Kilde         | DIFI |
| Kommentar     | Åpningskvitteringer blir bare sendt dersom dette er bestilt av [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/Sender) i [digital post meldingen]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png) ved å spesifisere dette i [digitalpostinfo]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/DigitalPostInfo). [Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker) må aksepteres at det sendes en [ÅpningsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/aapningskvittering) til [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/Sender) for å få lest den digital posten. Mangel på [ÅpningsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/aapningskvittering) betyr at [Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker) ikke har lest dokumentet. |

Bruk av [ÅpningsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/aapningskvittering) er priset for
[Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/Sender).

Åpningskvittering vil være påkrevd helt frem til Innbygger har akseptert
at kvitteringen sendes til Avsender. Det vil si at Åpningskvittering kan
komme lang tid etter at [digital post meldingen]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png)
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

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
