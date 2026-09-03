---

title: Bevis  

sidebar: dpi_sidebar
redirect_from: /sdp_bevis
---

|---|---|
| Definisjon | Bevis |
| Mime-Type | application/vnd.difi.dpi.bevis+xml |
| Datatype | complexType |
| Kommentar | Definerer et bevis som presenteres for innbygger i postkassen |
| XSD | [{{site.baseurl}}/resources/begrep/sikkerDigitalPost/eksempler/utvidelser/bevis.xml]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/eksempler/utvidelser/bevis.xml) |
    

### Attributter: Se xsd for mer informasjon om domenet.
Se xsd for mer informasjon om domenet.

* Gyldighetsperiode (se xsd) kan representeres på to måter: Start-slutt og start-slutt med delvis gyldighetsperiode i 
    et år. Du kan f.eks si at at beviset er gyldig fra 2020-01-01 og til 2025-01-01 (ikke inkluderende) men bare fra 
    måned 5 til 11 (Sommerhalvåret). 
    
* Dag og mnd er 1-index (1-31, 1-12)
* Tid er 0-index (0-23 og 0-59 for hhss)
* Bakgrunnsfarge er en helt vanlig color hex.


### Eksempel

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
