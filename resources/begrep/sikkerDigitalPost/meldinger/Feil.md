---

title: Feil  
permalink: sdk_feil.html
sidebar: 
---

### {{page.title}}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    En feilmelding fra postkasseleverandør med informasjon om en
    forretningsfeil knyttet til en digital post forsendelse.
  - Kilde  
    DIFI

### Beskrivelse

Feilmelding sendes fra Postkasseleverandør når det oppstår en uventet
feil som ikke kan håndteres av postkasseleverandør innenfor SLA krav.  
Feilene kategoriseres overordnet i to typer, enten som klient feil som
Avsender må rette opp i eller som server feil som oppstår hos
postkasseleverandør.

#### Håndtering av klient feil

Feil kategorisert som klientfeil vil komme dersom Avsender har sendt en
digital postmelding som ikke kan behandles av Postkasseleverandør.  
Dette kan være feil som f.eks:

  - Adresseringen til Mottaker er feil
  - Postkasseleverandør kan ikke dekryptere dokumentpakken
  - Varslingreglene bryter med forretningsregler
  - Virkningsdato er satt for langt frem i tid

Generelt vil dette være alle feil med
[Digitalpostmelding](DigitalPostMelding) og
[Dokumentpakken](../forretningslag/Dokumentpakke).

Feilen må utbedres og ny [Digitalpostmelding](DigitalPostMelding) må
sendes.

#### Håndtering av server feil

Feil kategorisert som serverfeil vil oppstå dersom postkasseleverandør
har interne feil som stopper behandlingen av den digitale postmeldingen.

### Attributer

| --- | --- | --- |
| Identifikator | Kardinalitet | Datatype |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
| feiltype | 1..1 | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| detaljer | 0..1 | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Kodeverk for feiltype

feiltype kan ha følgende verdi:

| --- | --- |
| Kodeverdi | Beskrivelse |
| KLIENT | Feilen kommer pga. feil på input eller andre feil der [Avsender](../begrep/Avsender) må rette opp i årsaken til feilen |
| SERVER | Feilen kommer av feil på sentral infrastruktur. [Avsender](../begrep/Avsender) må ta kontakt med Sentralforvalter for å få rettet opp i feilen. |
