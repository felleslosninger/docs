--- 
title: KanVelgeSikkerDigitalPostkasseRespons  
headtitle: Begrepskatalog for Sikker digital post -  
datatype: Metode  
permalink: ot_kanvelgesikkerdigitalpostkasserespons.html
sidebar:
---

  - Identifikator  
    http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/KanVelgeSikkerDigitalPostkasseRespons
  - Term  
    {{page.title}}
  - Definisjon  
    Respons sendt tilbake til Postkasseleverandør når
    kontaktregisteretet er oppdatert.
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice response som Postkasseleverandør mottar fra
    Kontaktregisteret som svar på
    [KanVelgeSikkerDigitalPostkasseForespoersel](KanVelgeSikkerDigitalPostkasseForespoersel.md)

#### Attributer

| Term        | Kardinalitet | Datatype                                              |
| ----------- | ------------ | ----------------------------------------------------- |
| status      | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |
| beskrivelse | 0..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string) |

#### Kodeverk for status

feiltype kan ha følgende verdi:

| Kodeverdi | Beskrivelse                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| JA        | Innbygger kan velge seg en digital postkasse for offentlig bruk                                     |
| NEI       | Innbygger kan ikke velge seg en digital postkasse for offentlig bruk, se beskrivelse for årsakskode |

#### Kodeverk for beskrivelse

feiltype kan ha følgende verdi:

| Kodeverdi             | Beskrivelse                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| RESERVERT             | brukeren er reservert                                                               |
| ALLEREDE\_AKTIV       | Brukeren er allerede aktiv                                                          |
| BRUKER\_IKKE\_FUNNET  | Innbyggeren ble ikke funnet                                                         |
| UGYLDIG\_SERTIFIKAT   | Sertifikatet i forespørselen er ikke på godkjent format                             |
| UGYLDIG\_PERSONNUMMER | Personidentifikator i forespørsel er ikke på riktig format                          |
| UGYLDIG\_EPOSTADRESSE | Epostadressen i forespørselen er ikke på riktig format                              |
| UGYLDIG\_ORGNR        | Virksomhetsindentifikatoren i forespørselen er ikke på riktig format eller godkjent |
