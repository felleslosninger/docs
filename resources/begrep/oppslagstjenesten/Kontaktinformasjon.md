--- 
title: Kontaktinformasjon  

sidebar: begrep_sidebar
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Kontaktinformasjon er Adresse informasjon knyttet til en Person for å kommunisere med person |
| Datatype      | complexType |
| Kilde         | DIFI |
| Kommentar     | Kontaktinformasjon for en Person er epostadresse og mobiltelefonnummer |

#### Attributer

| Term                                     | Kardinalitet |
| ---------------------------------------- | ------------ |
| [Mobiltelefonnummer]({{site.baseurl}}/resources/begrep/felles/mobiltelefonnummer) | 0..1         |
| [Epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse)             | 0..1         |

#### Xml eksempel

``` 
<ns2:Kontaktinformasjon>
   <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
   <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01012295312_test@minid.difi.no</ns2:Epostadresse>
</ns2:Kontaktinformasjon>
```
