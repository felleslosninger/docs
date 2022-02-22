---

title: SAMLAssertionV3  

sidebar:
redirect_from: /idport_samlassertionv3
---
|---|---|
| Identifikator | <https://begrep.difi.no/ID-porten/SAMLAssertionV3> |
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
| uid                                                          | [personidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/personidentifikator)                              | 1            |
| SecurityLevel                                                | [sikkerhetsnivaa]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/sikkerhetsnivaa)                                      | 1            |
| Culture                                                      | [språk]({{site.baseurl}}/resources/begrep/felles/spraak)                                                         | 1            |
| AuthMethod                                                   | [Autentiseringsmetode]({{site.baseurl}}/resources/begrep/ID-porten/SAMLAssertionV1)                              | 1            |
| [reservasjon]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/reservasjon)                           | [reservasjon]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/reservasjon)                                              | 0..1         |
| [epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse)                         | [epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse)                                            | 0..1         |
| [mobiltelefonnummer]({{site.baseurl}}/resources/begrep/felles/mobiltelefonnummer)             | [mobiltelefonnummer]({{site.baseurl}}/resources/begrep/felles/mobiltelefonnummer)                                | 0..1         |
| [postkasseleverandoerNavn]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/postkasseleverandoerNavn) | [postkasseleverandoerNavn]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/postkasseleverandoerNavn)                    | 0..1         |
| [status]({{site.baseurl}}/resources/begrep/felles/status)                                     | Kodeverk for [status](#status)                                                  | 0..1         |
| OnBehalfOf                                                   | Referanse til annen Offentlig Virksomhet som forespørselen er gjort på veien av | 0..1         |

#### AuthnContextClassRef

Autentiseringsnivå er spesifisert i henhold til kodeverk for
[AuthnContextClassRef]({{site.baseurl}}/resources/begrep/ID-porten/SAMLAuthnRequest)

#### Kodeverk

##### status

[status]({{site.baseurl}}/resources/begrep/felles/status) kan ha følgende verdi:

| Kodeverdi        | Beskrivelse                                                                                                 |
| --- | --- |
| AKTIV            | Person finnes i registeret                                                                                  |
| IKKE\_REGISTRERT | Person finnes ikke i registeret, enten ikke registrert eller slettet                                        |
| SYSTEMFEIL       | ID-porten har ikke informasjon om Digital kontaktinformasjon, f.eks. ved feil i integrasjon mot registrert. |

Ved IKKE\_REGISTRERT har ikke registeret informasjon om
[mobiltelefonnummer]({{site.baseurl}}/resources/begrep/felles/mobiltelefonnummer) eller
[epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse) eller
[postkasseleverandoerNavn]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/postkasseleverandoerNavn) , og vil
ikke kunne levere ut disse elementene til Offentlig virksomhet.

#### Eksempel

```xml

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
