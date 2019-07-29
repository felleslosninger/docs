-----

title: SAMLAssertionV1  
permalink: IDport_SAMLAssertionV1.html
—-
|---|---|
| Identifikator | https://begrep.difi.no/ID-porten/SAMLAssertionV1 |
| Term          | {{page.title}} |
| Definisjon    | Informasjon om en Person utlevert via ID |
| porten,       | standard profil. |
| Datatype      | [SAML\_2.0\_Assertion](http://en.wikipedia.org/wiki/SAML_2.0#SAML_2.0_Assertions) |
| Kilde         | DIFI |
| Kommentar     | Den informasjon som utleveres i ID |
| porten        | sin standard SAML2 profil ved Autentisering |

#### Attributer

| Term          | Beskrivelse                                                                     | Kardinalitet |
| --- | --- | --- |
| uid           | [personidentifikator](/Felles/personidentifikator)                              | 1            |
| SecurityLevel | [sikkerhetsnivaa](/Felles/sikkerhetsnivaa)                                      | 1            |
| Culture       | [språk](/Felles/spraak)                                                         | 1            |
| AuthMethod    | [Autentiseringsmetode](#AuthMethod)                                             | 1            |
| OnBehalfOf    | Referanse til annen Offentlig Virksomhet som forespørselen er gjort på vegne av | 0..1         |

#### AuthnContextClassRef

Autentiseringsnivå er spesifisert i henhold til kodeverk for
[AuthnContextClassRef](SAMLAuthnRequest#AuthnContextClassRef)

#### Kodeverk

##### AuthMethod

Autentiseringmetode brukt ved innlogging. Vi gjer merksam på at
kodeverket kan endre seg etter kvart som eIDene i ID-porten endrer seg.

| AuthMetod    | Beskrivelse                                                                                                               |
| --- | --- |
| Minid-PIN    | Bruker har logget seg på med PIN koder fra PIN kode ark.                                                                  |
| Minid-OTC    | Bruker har logget seg på med engangskode sendt på SMS                                                                     |
| Buypass      | Bruker har logget seg på med smartkort fra Buypass                                                                        |
| Commfides    | Bruker har logget seg på med USB-pen med e-ID fra Commfides                                                               |
| BankID       | Bruker har logget seg på med BankID med kodebrikke                                                                        |
| BankID Mobil | Bruker har logget seg på med BankID på mobil                                                                              |
| eIDAS        | Bruker har logget seg på med en europeisk eID gjennom eIDAS-infrastrukturen, og er blitt entydig gjenkjent med F/D-nummer |

#### Om eIDAS-pålogging

Mulighet for eIDAS-pålogging må aktiveres i ID-porten per tjeneste,
gjennom å sende en bestilling til idporten(at)difi.no.  
eIDAS sikkerhetsnivå “substantial” blir mappet til sikkerhetstnivå 3, og
“high” blir mappet til 4.

Dersom en eIDAS-bruker ikke blir gjenkjent med F/D-nummer, vil ID-porten
vise en feilside. Tjenesteeier kan derfor være sikker på at han bare vil
motta eIDAS-pålogginger av brukere som entydig gjenkjent i
Folkeregisteret, og tjenesteeier kan derfor behandle brukeren som om han
hadde brukt norsk eID.

Rundt 2020 vil Difi vurdere å aktivere eIDAS automatisk for alle
tjenesteeiere.

#### Eksempel

``` brush: xml; toolbar: false

   <saml:AttributeStatement>
      <saml:Attribute Name="uid">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">03015561903</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="SecurityLevel">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">3</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="Culture">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">nb</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="AuthMethod">
         <saml:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Minid-PIN</saml:AttributeValue>
      </saml:Attribute>
   </saml:AttributeStatement>




```
