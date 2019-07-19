---

title: FlyttetDigitalpostMelding  
permalink: sdp_flyttetdigitalpostmelding.html
sidebar:
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    En digital post med tilhørende
    [Dokumentpakke](../forretningslag/Dokumentpakke/) som flyttes fra en
    postkasseleverandør til en annen
  - Kilde  
    DIFI
  - Kommentar  
    Denne meldingstypen brukes kun imellom Postkasseleverandørene og
    ikke av Avsender. Den brukes dersom Innbygger velger å flytte sin
    post over til en annen postkasseleverandør.

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

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| [Avsender](../begrep/Avsender.md) | 1..1 | [sdp:Avsender](../begrep/Avsender) |
| [Mottaker](../begrep/Mottaker.md) | 1..1 | [sdp:Mottaker](../begrep/Mottaker) |
| [Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md) | 1..1 | [sdp:Dokumentpakkefingeravtrykk](../begrep/Dokumentpakkefingeravtrykk.md) |
| [DigitalpostInfo](../begrep/DigitalPostInfo.md) | 1..1 | [sdp:DigitalpostInfo](../begrep/DigitalPostInfo.md) |
| mottakstidspunkt | 1..1 | [xs:date](http://www.w3.org/TR/xmlschema-2/#datetime) |
| aapnet | 1..1 | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) (TRUE / FALSE ) |
