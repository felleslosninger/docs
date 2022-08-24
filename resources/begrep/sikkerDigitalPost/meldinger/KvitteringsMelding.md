---
title: Kvitteringsmelding

sidebar: dpi_sidebar
redirect_from: /sdp_kvitteringsmelding
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | En kvitteringsmelding på en [digital post melding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png) fra en [Avsender]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Avsender). |
| Kilde         | DIFI |
| Kommentar     | Kvittering er en abstrakt [kvittering melding]({{site.baseurl}}/resources/begrep/felles/) type, se under for de kvitteringer som er definert. |

### Attributer

Alle kvitteringer uavhengig av type har følgende attributter:

| Identifikator | Kardinalitet | Datatype |
| ---| --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |

### Kvitteringer

Følgende konkrete kvitteringer er definert:

  - [LeveringsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering)
  - [AapningsKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/aapningskvittering)
  - [VarslingfeiletKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/VarslingfeiletKvittering)
  - [MottaksKvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/MottaksKvittering)

