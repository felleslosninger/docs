---

title: SAMLAssertionV3  
permalink: IDport_SAMLAssertionV3.html
sidebar:
---

|---|---|
| Identifikator | https://begrep.difi.no/ID-porten/SAMLAssertionV3 |
| Term          | {{page.title}} |
| Definisjon    | Utvidet informasjon om en Person utlevert via ID |
| porten        | dersom Offentlig Virksomhet har spesifisert behov for dette |
| Datatype      | [SAML\_2.0\_Assertion](http://en.wikipedia.org/wiki/SAML_2.0#SAML_2.0_Assertions) |
| Kilde         | DIFI |
| Kommentar     | Den informasjon som utleveres i ID |
| porten        | sin SAML2 profil ved Autentisering dersom Avsender har behov for informasjon fra kontakt og reservasjonsregisteret |
#### Attributer

| Term                                                         | Beskrivelse                                                                     | Kardinalitet |
| --- | --- | --- |
| uid                                                          | [personidentifikator](../felles/personidentifikator)                              | 1            |
| SecurityLevel                                                | [sikkerhetsnivaa](../felles/sikkerhetsnivaa.md)                                      | 1            |
| Culture                                                      | [språk](../felles/spraak.md)                                                         | 1            |
| AuthMethod                                                   | [Autentiseringsmetode](SAMLAssertionV1.md)                              | 1            |
| [reservasjon](../felles/reservasjon.md)                           | [reservasjon](../felles/reservasjon.md)                                              | 0..1         |
| [epostadresse](../felles/epostadresse.md)                         | [epostadresse](../felles/epostadresse.md)                                            | 0..1         |
| [mobiltelefonnummer](../felles/mobiltelefonnummer.md)             | [mobiltelefonnummer](../felles/mobiltelefonnummer.md)                                | 0..1         |
| [postkasseleverandoerNavn](../felles/postkasseleverandoerNavn.md) | [postkasseleverandoerNavn](../felles/postkasseleverandoerNavn.md)                    | 0..1         |
| [status](../felles/status.md)                                     | Kodeverk for [status](#status)                                                  | 0..1         |
| OnBehalfOf                                                   | Referanse til annen Offentlig Virksomhet som forespørselen er gjort på veien av | 0..1         |

#### AuthnContextClassRef

Autentiseringsnivå er spesifisert i henhold til kodeverk for
[AuthnContextClassRef](SAMLAuthnRequest.md)

#### Kodeverk

##### status

[status](../felles/status.md) kan ha følgende verdi:

| Kodeverdi        | Beskrivelse                                                                                                 |
| --- | --- |
| AKTIV            | Person finnes i registeret                                                                                  |
| IKKE\_REGISTRERT | Person finnes ikke i registeret, enten ikke registrert eller slettet                                        |
| SYSTEMFEIL       | ID-porten har ikke informasjon om Digital kontaktinformasjon, f.eks. ved feil i integrasjon mot registrert. |

Ved IKKE\_REGISTRERT har ikke registeret informasjon om
[mobiltelefonnummer](../felles/mobiltelefonnummer.md) eller
[epostadresse](../felles/epostadresse.md) eller
[postkasseleverandoerNavn](../felles/postkasseleverandoerNavn.md) , og vil
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
