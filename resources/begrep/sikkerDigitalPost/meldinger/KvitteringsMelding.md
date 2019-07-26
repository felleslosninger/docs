---
title: Kvitteringsmelding
permalink: sdp_kvitteringsmelding.html
sidebar: sidebar_begrep
---

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | En kvitteringsmelding på en [digital post melding](DigitalPostMelding.md) fra en [Avsender](../begrep/Avsender.md). |
| Kilde         | DIFI |
| Kommentar     | Kvittering er en abstrakt [kvittering melding](index.md) type, se under for de kvitteringer som er definert. |

### Attributer

Alle kvitteringer uavhengig av type har følgende attributter:

| Identifikator | Kardinalitet | Datatype |
| ---| --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |

### Kvitteringer

Følgende konkrete kvitteringer er definert:

  - [LeveringsKvittering](LeveringsKvittering.md)
  - [AapningsKvittering](AapningsKvittering.md)
  - [VarslingfeiletKvittering](VarslingfeiletKvittering.md)
  - [MottaksKvittering](MottaksKvittering.md)

