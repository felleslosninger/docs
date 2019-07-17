---
title: HentPersonerForespoersel  
permalink: ot_hentpersonerforespoersel.html
datatype: Metode
sidebar:
---
{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Forespørsel sendt fra Virksomhet for å hente Personer fra kontakt og
    reservasjonsregisteret
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice forespørsel som Klient sender til Kontaktregisteret,
    forespørselen beskriver hvilke personer Klienten ønsker uthentet og
    hvilken informasjon som ønskes utlevert.  
    Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om
    forespørselen og hvordan denne sendes.

Responsen er en [HentPersonerRespons](HentPersonerRespons.md)

#### Attributer

| Term                                               | Kardinalitet |
| -------------------------------------------------- | ------------ |
| [personidentifikator](../felles/personidentifikator.md) | 1..1000      |
| [informasjonsbehov](../felles/informasjonsbehov.md)     | 0..\*        |

#### Kodeverk for [informasjonsbehov](../felles/informasjonsbehov.md)

| Kodeverdi                          | Beskrivelse                                                                                                                                                                                                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Person                             | Person gir kun informasjon om Personen finnes i registeret og reservasjonsstatus. Person er implisitt og returneres alltid.                                                                                                                                                |
| Kontaktinfo                        | Kontaktinfo gir informasjon om Person og Personers kontaktinformasjon, dvs epost-addresse og mobiltelefonnummer                                                                                                                                                            |
| Sertifikat                         | Sertifikat gir informasjon om Person sitt sertifikat som skal brukes i forbindelse med kryptering av Sikker Digital Post                                                                                                                                                   |
| SikkerDigitalPost                  | SikkerDigitalPost gir informasjon om Person, postkasse og postkasseleverandøren.                                                                                                                                                                                           |
| [VarslingsStatus](varslingsstatus.md) | VarslingsStatus angir om Person kan varsles ihht eForvaltningsforskriften §32. Dette informasjonsbehovet trigger filtrering i Oppslagstjenesten, dvs. Kontaktinformasjon, Sertifikat og SikkerDigitalPost på personer med utgått kontaktinformasjon vil ikke bli utlevert. |

Dersom det ikke spesifiseres noen informasjonsbehov-element i
forespørselen, vil standard responsverdi være Person.  
Eventuelle overflødige(ikke definerte) eller duplikate informasjonsbehov
vil ignoreres.

#### Xml eksempel

``` brush: xml; toolbar: false
<ns:HentPersonerForespoersel>
 <ns:informasjonsbehov>Kontaktinfo</ns:informasjonsbehov>
 <ns:informasjonsbehov>Sertifikat</ns:informasjonsbehov>
 <ns:informasjonsbehov>SikkerDigitalPost</ns:informasjonsbehov>
 <ns:informasjonsbehov>VarslingsStatus</ns:informasjonsbehov>

 <ns:personidentifikator>01013355300</ns:personidentifikator>
 <ns:personidentifikator>01013355491</ns:personidentifikator>
 <ns:personidentifikator>01013356366</ns:personidentifikator>
</ns:HentPersonerForespoersel>
```
