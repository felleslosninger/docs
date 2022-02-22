--- 
title: OpprettOgVelgSikkerDigitalPostkasseForespoersel  

sidebar: begrep_sidebar
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Forespørsel sendt fra Postkasseleverandør for å opprette og sette at en postkasse aktiveres for en innbygger. |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice forespørsel som Postkasseleverandør sender til Kontaktregisteret, forespørselen oppdaterer kontaktregisteret med informasjon om en digital postkasse |

#### Attributer

| Term                                                              | Kardinalitet | Datatype                                                          |
| ----------------------------------------------------------------- | ------------ | ----------------------------------------------------------------- |
| [personidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/personidentifikator)                | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| [virksomhetsidentifikator]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/virksomhetsidentifikator) | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| [postkasseadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/postkasseadresse)                      | 1..1         | [xs:string](http://www.w3.org/TR/xmlschema-2/#string)             |
| [X509Sertifikat]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/x509Sertifikat)                          | 0..1         | [X509Certifiate](http://www.w3.org/TR/xmldsig-core/#sec-X509Data) |

#### Respons

Responsen er en
[OpprettOgVelgSikkerDigitalPostkasseRespons]({{site.baseurl}}/resources/begrep/oppslagstjenesten/OpprettOgVelgSikkerDigitalPostkasseRespons)
