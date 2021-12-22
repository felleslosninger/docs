---
title: Flyttetdigitalpost

sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En digital melding med tilhørende [Dokumentpakke](dpi_dokumentpakke_index.html) som flyttes fra en postkasseleverandør til en annen |
| Kilde         | DIFI |
| Kommentar     | Denne meldingstypen brukes kun imellom Postkasseleverandørene og ikke av Avsender. Den brukes dersom Innbygger velger å flytte sin post over til en annen postkasseleverandør. |

Det er den opprinnelige Dokumentpakken som skal sendes til ny postkasse
ved flytting av post. Denne pakkes inn i en FlytteDigitalpostMelding.  
Dette er en forretningsmelding som likner DigitalPostMelding, men med
noe informasjon om statusen på posten.  
Postkasseleverandøren som sender denne posten står som databehandler for
meldingen.

**Regler for hvilken post som kan flyttes**

Post med følgende tilstander kan flyttes:

  - Post innbygger har behandlet.
  - Post som opprinnelig krevde varsling, der varsling er utført eller
    avsluttet som følge av innbyggers behandling. 
  - Post som opprinnelig krevde åpningskvittering, som nå er åpnet og
    åpningskvittering er sendt. 
  - Post som opprinnelig ikke kom med krav om åpningskvittering eller
    varslinger kan flyttes.

Post med følgende tilstander **ikke** kan flyttes:

  - Post som har en virkningsdato frem i tid. 
      - Denne posten er ikke tilgjengelig/synlig for innbygger og kan
        dermed ikke flyttes.
  - Post som krever åpningskvittering, der innbygger ikke har åpnet
    brevet er ikke å betrakte som tilgjengelig 
      - Postkasseleverandøren som mottar flyttet post kan ikke sende
        kvitteringer til opprinnelig avsender.
      - Dermed skal postkasseleverandøren først sikre at
        åpningskvittering sendes til Avsender før det er mulig å flytte
        posten.
  - Post der det er bestilt Varsling og varslingene ikke er ferdig
    utført 
      - Postkasseleverandøren som mottar flyttet post kan ikke sende
        kvitteringer til opprinnelig avsender.
      - Dermed skal opprinnelig postkasseleverandør først sikre at alle
        bestilte varslinger blir utført eller at Avsender blir informert
        om at varsling har feilet før posten kan flyttes.


### Schema
[innbyggerpost_dpi_flyttet_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_flyttet_1_0.schema.json)


### Properties

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/personmottaker) |
| [dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html) | 1..1 | [dokumentpakkefingeravtrykk]({{ page.dpi_common_schema_location }}#/definitions/dokumentpakkefingeravtrykk) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [sikkerhetsnivaa](sikkerhetsnivaa.html) | 0..1 | [sikkerhetsnivaa]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) |
| [virkningsdato](virkningsdato.html) | 0..1 | [virkningsdato]({{ page.dpi_common_schema_location }}#/definitions/virkningsdato) |
| [virkningstidspunkt](virkningstidspunkt.html) | 0..1 | [virkningstidspunkt]({{ page.dpi_common_schema_location }}#/definitions/virkningstidspunkt) |
| [aapningskvittering](aapningskvittering.html) | 0..1 | [aapningskvittering]({{ page.dpi_common_schema_location }}#/definitions/aapningskvittering) |
| [ikkesensitivtittel](ikkesensitivtittel.html) | 0..1 | [ikkesensitivtittel]({{ page.dpi_common_schema_location }}#/definitions/ikkesensitivtittel) |
| [varsler](sdp_varsler.html) | 0..1 | [varsler]({{ page.dpi_common_schema_location }}#/definitions/varsler) |
| mottakstidspunkt | 0..1 | string - date |
| aapnet]| 0..1 | boolean |
