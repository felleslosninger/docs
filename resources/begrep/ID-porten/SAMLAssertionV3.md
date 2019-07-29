-----

layout: default  
title: SAMLAssertionV3  
headtitle: ID-porten  
group: ID-porten/complexType  
—-

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    Utvidet informasjon om en Person utlevert via ID-porten dersom
    Offentlig Virksomhet har spesifisert behov for dette
  - Datatype  
    [SAML\_2.0\_Assertion](http://en.wikipedia.org/wiki/SAML_2.0#SAML_2.0_Assertions)
  - Kilde  
    DIFI
  - Kommentar  
    Den informasjon som utleveres i ID-porten sin SAML2 profil ved
    Autentisering dersom Avsender har behov for informasjon fra kontakt
    og reservasjonsregisteret

#### Attributer

| Term                                                         | Beskrivelse                                                                     | Kardinalitet |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------ |
| uid                                                          | [personidentifikator](/Felles/personidentifikator)                              | 1            |
| SecurityLevel                                                | [sikkerhetsnivaa](/Felles/sikkerhetsnivaa)                                      | 1            |
| Culture                                                      | [språk](/Felles/spraak)                                                         | 1            |
| AuthMethod                                                   | [Autentiseringsmetode](SAMLAssertionV1#AuthMethod)                              | 1            |
| [reservasjon](/Felles/reservasjon)                           | [reservasjon](/Felles/reservasjon)                                              | 0..1         |
| [epostadresse](/Felles/epostadresse)                         | [epostadresse](/Felles/epostadresse)                                            | 0..1         |
| [mobiltelefonnummer](/Felles/mobiltelefonnummer)             | [mobiltelefonnummer](/Felles/mobiltelefonnummer)                                | 0..1         |
| [postkasseleverandoerNavn](/Felles/postkasseleverandoerNavn) | [postkasseleverandoerNavn](/Felles/postkasseleverandoerNavn)                    | 0..1         |
| [status](/Felles/status)                                     | Kodeverk for [status](#status)                                                  | 0..1         |
| OnBehalfOf                                                   | Referanse til annen Offentlig Virksomhet som forespørselen er gjort på veien av | 0..1         |

#### AuthnContextClassRef

Autentiseringsnivå er spesifisert i henhold til kodeverk for
[AuthnContextClassRef](SAMLAuthnRequest#AuthnContextClassRef)

#### Kodeverk

##### status

[status](/Felles/status) kan ha følgende verdi:

| Kodeverdi        | Beskrivelse                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| AKTIV            | Person finnes i registeret                                                                                  |
| IKKE\_REGISTRERT | Person finnes ikke i registeret, enten ikke registrert eller slettet                                        |
| SYSTEMFEIL       | ID-porten har ikke informasjon om Digital kontaktinformasjon, f.eks. ved feil i integrasjon mot registrert. |

Ved IKKE\_REGISTRERT har ikke registeret informasjon om
[mobiltelefonnummer](/Felles/mobiltelefonnummer) eller
[epostadresse](/Felles/epostadresse) eller
[postkasseleverandoerNavn](/Felles/postkasseleverandoerNavn) , og vil
ikke kunne levere ut disse elementene til Offentlig virksomhet.

#### Eksempel

``` brush: xml; toolbar: false

   <saml:AttributeStatement>
      <saml:Attribute Name="uid">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">03015561903</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="Culture">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">nb</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="epostadresse">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">03015561903-test@minid.norge.no</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="mobiltelefonnummer">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">03015561903</saml:AttributeValue>
      </saml:Attribute>   
      <saml:Attribute Name="status">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">AKTIV</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="reservasjon">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">NEI</saml:AttributeValue>
      </saml:Attribute>   
      <saml:Attribute Name="AuthMethod">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Minid-PIN</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="SecurityLevel">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">3</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="postkasseleverandoerNavn">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Digipost test operator</saml:AttributeValue>
      </saml:Attribute>
   </saml:AttributeStatement>

```
