---

title: Arrangement  

sidebar: dpi_sidebar
---

|---|---|
| Definisjon | Arrangement |
| Mime-Type | application/vnd.difi.dpi.arrangement+xml |
| Datatype | complexType |
| Kommentar | Definerer et arrangement som presenteres for innbygger i postkassen |
| XSD | [{{site.baseurl}}/resources/begrep/sikkerDigitalPost/eksempler/utvidelser/arrangement.xml]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/eksempler/utvidelser/arrangement.xml) |
    

### Attributter: Se xsd for mer informasjon om domenet.

Merk: I typen ‘tekst’ betyr formatering i xml-en noe. Linjeskift og
tabulatorer vil altså bli brukt aktivt til formatering av teksten i
postkassen.  
Dette kommer frem av eksempelet under hvor informasjonen ønskes
formatert på en spesiell måte. Legg ekstra merke til at tabularorer er
fjernet i  
forkant av linjene. Tabulatorer kan benyttes for å gjøre indenteringer i
teksten.

### Eksempel

``` 
brush: xml; toolbar: false
<arrangement xmlns="http://begrep.difi.no/sdp/utvidelser/arrangement"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://begrep.difi.no/sdp/utvidelser/arrangement ../../xsd/utvidelser/arrangement.xsd">
    <tittel lang="nb">Kommunestyre- og fylkestingvalget 2019</tittel>
    <tidsrom-tittel lang="nb">Åpningstider</tidsrom-tittel>
    <tidsrom>
        <fra>2019-09-09T09:00:00+02:00</fra>
        <til>2019-09-09T21:00:00+02:00</til>
    </tidsrom>
    <tidsrom>
        <fra>2019-10-09T10:00:00+02:00</fra>
        <til>2019-10-09T20:00:00+02:00</til>
    </tidsrom>
    <oppmøte-informasjon lang="nb">Dørene til valglokalet åpnes kl 09:00 og lukkes kl. 21:00</oppmøte-informasjon>
    <møteplass>
        <tittel lang="nb">Valglokale på valgdagen</tittel>
        <navn>Sagene skole</navn>
        <gateadresse>Biermanns gate 2</gateadresse>
        <postnummer>0473</postnummer>
        <sted>Oslo</sted>
        <land>Norge</land>
    </møteplass>
    <strekkode>
         <tittel lang="nb">Bruk denne på valgdagen</tittel>
         <verdi>1234567890</verdi>
         <type>code-39</type>
         <tekst lang="nb">Bruk strekkoden for å identifisere deg raskt på valgdagen. Husk å ta med gyldig legitimasjon.</tekst>
    </strekkode>
    <info>
        <tittel lang="nb">Dine personopplysninger</tittel>
        <tekst lang="nb">Karianne Karlsen
Arendalsgata 23 B
0478 Oslo

Krets: 400
Rode: 24
Linje: 30
Mantallsnummer: 50
Kommunenummer: 1234</tekst>
    </info>
    <info>
        <tittel lang="nb">Forhåndsstemming</tittel>
        <tekst lang="nb">Du kan forhåndsstemme fra 10.08.2019 til og med 08.09.2019. I forhåndsstemmeperioden kan du stemme hvor du vil i hele landet.</tekst>
    </info>
    <lenker>
        <lenke>
           <navn lang="nb">Les mer om valget på valg.no</navn>
           <url>https://valg.no</url>
        </lenke>
    </lenker>
</arrangement>
```
