---
title: DigitalpostInfo  

sidebar: begrep_sidebar
redirect_from: /sdp_digitalpostinfo
---
|---|---|
|Term|{{page.title}}|
|Definisjon|Informasjon til Postkasseleverandør for å presentere og behandle en sikker digital post melding|
|Kilde|DIFI|
|Kommentar|Dette er informasjon om den Digitalpostforsendelsen som vil bli brukt av Postkasseleverandør for å presentere og behandle den digitale posten. Den ikkeSensitiveTittelen vil bli brukt i dialogen med Innbygger dersom ikke Innbygger er autentisert på tilstrekkelig nivå. Den ikkeSensitiveTittelen vil også bli brukt i varsling til Innbygger. Når den digitale posten er dekryptert og innbygger er autentisert på tilstrekkelig sikkerhetsnivå så vil Tittel i [manifest-filen]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Dokumentpakke/Manifest) brukes.|

### Attributer

| --- | --- | --- |
| Identifikator                                    | Kardinalitet | Datatype                                                  |
| [sikkerhetsnivaa]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/sikkerhetsnivaa)       | 1..1        | [xs:int](http://www.w3.org/TR/xmlschema-2/#int)           |
| [Virkningsdato]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/virkningsdato)       | 0..1         | [xs:date](http://www.w3.org/TR/xmlschema-2/#date)         |
| [Virkningstidspunkt]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/virkningstidspunkt) | 0..1         | [xs:datetime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
| [aapningskvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/aapningskvittering) | 0..1        | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)     |
| [ikkeSensitivTittel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/ikkeSensitivTittel) | 1..1        | [Tekst]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/tekst)         |
| [Varsler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Varsler)           | 0..1         | [Varsler]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Varsler)          |
