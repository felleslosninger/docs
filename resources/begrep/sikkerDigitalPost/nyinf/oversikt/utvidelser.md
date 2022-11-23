---
title: Utvidelser  
permalink: dpi_utvidelser.html
sidebar: dpi_new_sidebar
---

1. TOC
{:toc}

## Lenke utenfor brev

|---|---|
| Definisjon | Lenke utenfor brev |
| Mime-Type | application/vnd.difi.dpi.lenke+xml |
| Datatype   | complexType |
| Kommentar  | Definerer en lenke som presenteres for innbygger i postkassen. Postkasseleverandøren kan vise en standard beskrivelse og tekst på knappen dersom de ikke er definert. |
| XSD        | [resources/begrep/sikkerDigitalPost/xsd/utvidelser/lenke.xsd](resources/begrep/sikkerDigitalPost/xsd/utvidelser/lenke.xsd) |

**Attributer**

| Identifikator | Kardinalitet | Datatype   |
| --- | --- | --- |
| url           | 1..1         | HttpLenke             |
| beskrivelse   | 0..1         | LenkeBeskrivelseTekst |
| knappTekst    | 0..1         | LenkeKnappTekst       |
| frist         | 0..1         | xsd:dateTime          |

**Eksempel**

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

## Bevis


|---|---|
| Definisjon | Bevis |
| Mime-Type | application/vnd.difi.dpi.bevis+xml |
| Datatype | complexType |
| Kommentar | Definerer et bevis som presenteres for innbygger i postkassen |
| XSD | [resources/begrep/sikkerDigitalPost/xsd/utvidelser/bevis.xsd](resources/begrep/sikkerDigitalPost/xsd/utvidelser/bevis.xsd) |
    

**Attributter: Se xsd for mer informasjon om domenet.**

* Gyldighetsperiode (se xsd) kan representeres på to måter: Start-slutt og start-slutt med delvis gyldighetsperiode i 
    et år. Du kan f.eks si at at beviset er gyldig fra 2020-01-01 og til 2025-01-01 (ikke inkluderende) men bare fra 
    måned 5 til 11 (Sommerhalvåret). 
    
* Dag og mnd er 1-index (1-31, 1-12)
* Tid er 0-index (0-23 og 0-59 for hhss)
* Bakgrunnsfarge er en helt vanlig color hex.


**Eksempel**

``` 
brush: xml; toolbar: false
<bevis xmlns="http://begrep.difi.no/sdp/utvidelser/bevis">
    <utsteder-visningsnavn lang="nb">Bekkestua Bibliotek</utsteder-visningsnavn>
    <bakgrunnsfarge>#F0EC99</bakgrunnsfarge>
    <utstedt-tidspunkt>2019-05-15T11:12:13+02:00</utstedt-tidspunkt>

    <gyldighetsperiode>
        <periode>
            <fra>2019-05-15T11:12:13+02:00</fra>
            <til>2019-12-31T11:12:13+02:00</til>
        </periode>
    </gyldighetsperiode>

    <bevisholder>
        <fornavn>Tore</fornavn>
        <etternavn>Hund</etternavn>
        <foedselsnummer>17058400000</foedselsnummer>
        <adresse>
            <gate>Storgata 23</gate>
            <postnummer>0011</postnummer>
            <sted>Oslo</sted>
            <land>Norge</land>
        </adresse>
    </bevisholder>

    <tittel lang="nb">Medlemskort</tittel>

    <bevis-id-navn lang="nb">medlemsnr</bevis-id-navn>
    <bevis-id-verdi>000000012321123</bevis-id-verdi>

    <attributt>
        <navn lang="nb">Kaffeklubb</navn>
        <verdi lang="nb">standard medlem</verdi>
    </attributt>

    <info>
        <navn lang="nb">Regler</navn>
        <verdi lang="nb">Det er ikke lov å rive ut sider i bøkene, eller søle med ketchup.</verdi>
    </info>
</bevis>
```

## Arrangement

|---|---|
| Definisjon | Arrangement |
| Mime-Type | application/vnd.difi.dpi.arrangement+xml |
| Datatype | complexType |
| Kommentar | Definerer et arrangement som presenteres for innbygger i postkassen |
| XSD | [resources/begrep/sikkerDigitalPost/xsd/utvidelser/arrangement.xsd](resources/begrep/sikkerDigitalPost/xsd/utvidelser/arrangement.xsd) |
    

**Attributter: Se xsd for mer informasjon om domenet.**

Merk: I typen ‘tekst’ betyr formatering i xml-en noe. Linjeskift og
tabulatorer vil altså bli brukt aktivt til formatering av teksten i
postkassen.  
Dette kommer frem av eksempelet under hvor informasjonen ønskes
formatert på en spesiell måte. Legg ekstra merke til at tabularorer er
fjernet i  
forkant av linjene. Tabulatorer kan benyttes for å gjøre indenteringer i
teksten.

**Eksempel**

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
