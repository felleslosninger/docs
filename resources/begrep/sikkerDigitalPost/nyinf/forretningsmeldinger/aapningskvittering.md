---
title: Aapningskvittering

sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En [KvitteringsMelding](dpi_kvitteringer.html) til Avsender om at Mottaker har åpnet forsendelsen i sin postkasse. |
| Kilde         | DIFI |
| Kommentar     | Åpningskvitteringer blir bare sendt dersom dette er bestilt av [Avsender](sdp_aktorer.html) i [digital](dpi_digital.html) meldingen ved å spesifisere dette med propertien aapningskvittering. [Mottaker](sdp_aktorer.html) må aksepteres at det sendes en til [Avsender](sdp_aktorer.html) for å få lest den digital posten. Mangel på ÅpningsKvittering betyr at [Mottaker](sdp_aktorer.html) ikke har lest dokumentet. |

Bruk av ÅpningsKvittering er priset for [Avsender](sdp_aktorer.html).

Åpningskvittering vil være påkrevd helt frem til Innbygger har akseptert
at kvitteringen sendes til Avsender. Det vil si at Åpningskvittering kan
komme lang tid etter at [digital](dpi_digital.html) meldingen blir sendt.

### Anbefalt bruk

Åpningskvittering er en funksjonalitet som brukes av Avsendere kun etter
en grundig og dokumentert vurdering.  
Funksjonaliteten vil kunne oppleves som påtrengende for Mottaker da man
ikke får tilgang til å lese den posten man har mottatt uten å godta at
kvitteringen blir sendt.

For mer informasjon om bruk av denne funksjonaliteten kan man ta kontakt
med Sentralforvalter.

### Schema
[innbyggerpost_dpi_aapningskvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_aapningskvittering_1_0.schema.json)
