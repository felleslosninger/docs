---

title: Lenke utenfor brev  
permalink: sdp_lenke.html
sidebar: dpi_sidebar
---

|---|---|
| Definisjon | Lenke utenfor brev |
| Mime-Type | application/vnd.difi.dpi.lenke+xml |
| Datatype   | complexType |
| Kommentar  | Definerer en lenke som presenteres for innbygger i postkassen. Postkasseleverandøren kan vise en standard beskrivelse og tekst på knappen dersom de ikke er definert. |
| XSD        | [https://difi.github.io/felleslosninger/resources/begrep/sikkerDigitalPost/xsd/utvidelser/lenke.xsd](https://difi.github.io/felleslosninger/resources/begrep/sikkerDigitalPost/xsd/utvidelser/lenke.xsd) |

### Attributer

| Identifikator | Kardinalitet | Datatype   |
| --- | --- | --- |
| url           | 1..1         | HttpLenke             |
| beskrivelse   | 0..1         | LenkeBeskrivelseTekst |
| knappTekst    | 0..1         | LenkeKnappTekst       |
| frist         | 0..1         | xsd:dateTime          |

### Eksempel

``` 
brush: xml; toolbar: false
<lenke xmlns="http://begrep.difi.no/sdp/utvidelser/lenke"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://begrep.difi.no/sdp/utvidelser/lenke ../../xsd/utvidelser/lenke.xsd">
    <url>https://www.avsender.no/svar</url>
    <beskrivelse lang="nb">Vennligst svar på denne viktige meldingen for videre saksbehandling.</beskrivelse>
    <knappTekst lang="nb">Svar på den viktige meldingen</knappTekst>
    <frist>2017-10-01T12:00:00+02:00</frist>
</lenke>
```
