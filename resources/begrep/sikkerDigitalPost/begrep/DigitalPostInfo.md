-----

layout: egenskap  
title: DigitalpostInfo  
headtitle: Begrepskatalog for Sikker digital post -  
group: complexType

name: DigitalpostInfo  
prev: Begreper  
—-  
{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Informasjon til Postkasseleverandør for å presentere og behandle en
    sikker digital post melding
  - Kilde  
    DIFI
  - Kommentar  
    Dette er informasjon om den Digitalpostforsendelsen som vil bli
    brukt av Postkasseleverandør for å presentere og behandle den
    digitale posten.  
    Den ikkeSensitiveTittelen vil bli brukt i dialogen med Innbygger
    dersom ikke Innbygger er autentisert på tilstrekkelig nivå.  
    Den ikkeSensitiveTittelen vil også bli brukt i varsling til
    Innbygger.  
    Når den digitale posten er dekryptert og innbygger er autentisert på
    tilstrekkelig sikkerhetsnivå så vil Tittel i
    [Manifest-filen](../forretningslag/Dokumentpakke/Manifest) brukes.

### Attributer

| Identifikator                                    | Kardinalitet | Datatype                                                  |
| ------------------------------------------------ | ------------ | --------------------------------------------------------- |
| [sikkerhetsnivaa](/Felles/sikkerhetsnivaa)       | 1..1         | [xs:int](http://www.w3.org/TR/xmlschema-2/#int)           |
| [virkningsdato](/Felles/virkningsdato)           | 0..1         | [xs:date](http://www.w3.org/TR/xmlschema-2/#date)         |
| [virkningstidspunkt](/Felles/virkningstidspunkt) | 0..1         | [xs:datetime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
| [aapningskvittering](/Felles/aapningskvittering) | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)     |
| [ikkeSensitivTittel](/Felles/ikkeSensitivTittel) | 1..1         | [tekst](/Felles/tekst)                                    |
| [varsler](Varsler)                               | 0..1         | [sdp:Varsler](Varsler)                                    |
