---
title: HentEndringerRespons 
permalink: ot_hentendringerrespons.html
datatype: Metode
sidebar:
---

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Response sendt fra Oppslagstjensten for å levere ut endringer fra
    kontakt og reservasjonsregisteret til Virksomhet
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice respons som Oppslagstjenesten sender til Klient, respons
    beskriver de endringer som har vært i registeret.  
    Responsen er begrenset til å returnere 1000 personer.  
    Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om
    forespørselen og hvordan denne sendes.

#### Attributer

| Term                                                   | Kardinalitet |
| ------------------------------------------------------ | ------------ |
| [fraEndringsNummer](../felles/fraEndringsNummer.md)         | 1..1         |
| [tilEndringsNummer](../felles/tilEndringsNummer.md)         | 1..1         |
| [senesteEndringsNummer](../felles/senesteEndringsNummer.md) | 1..1         |
| [Person](Person.md)                    | 0..1000      |

  - Dersom [tilEndringsNummer](../felles/tilEndringsNummer.md) og
    [senesteEndringsNummer](../felles/senesteEndringsNummer.md) er lik finnes
    det ikke fler endringer i registeret som ikke er utlevert.
  - Dersom [tilEndringsNummer](../felles/tilEndringsNummer.md) er ulik fra
    [senesteEndringsNummer](../felles/senesteEndringsNummer.md) så bør
    Offentlig Virksomhet sende ny
    [HentEndringerForespoersel](HentEndringerForespoersel.md).

#### Xml eksempel

``` brush: xml; toolbar: false
      <ns3:HentEndringerRespons fraEndringsNummer="1001" senesteEndringsNummer="2440049" tilEndringsNummer="2000" xmlns:ns2="http://begrep.difi.no" xmlns:ns3="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
         <ns2:Person>
            <ns2:personidentifikator>01012295312</ns2:personidentifikator>
            <ns2:reservasjon>JA</ns2:reservasjon>
            <ns2:status>AKTIV</ns2:status>
            <ns2:Kontaktinformasjon>
               <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
               <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01012295312_test@minid.difi.no</ns2:Epostadresse>
            </ns2:Kontaktinformasjon>
            <ns2:SikkerDigitalPostAdresse>
               <ns2:postkasseadresse>1</ns2:postkasseadresse>
               <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
            </ns2:SikkerDigitalPostAdresse>
            <ns2:X509Certificate>MIIC2jCCAkMCAg38MA0GCSqGSIb3DQEBBQUAMIGbMQswCQYDVQQGEwJKUDEOMAwGA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNEREMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdlYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIwODIyMDUyNzQxWhcNMTcwODIxMDUyNzQxWjBKMQswCQYDVQQGEwJKUDEOMAwGA1UECAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0z9FeMynsC8+udvX+LciZxnh5uRj4C9S6tNeeAlIGCfQYk0zUcNFCoCkTknNQd/YEiawDLNbxBqutbMDZ1aarys1a0lYmUeVLCIqvzBkPJTSQsCopQQ9V8WuT252zzNzs68dVGNdCJd5JNRQykpwexmnjPPv0mvj7i8XgG379TyW6P+WWV5okeUkXJ9eJS2ouDYdR2SM9BoVW+FgxDu6BmXhozW5EfsnajFp7HL8kQClI0QOc79yuKl3492rH6bzFsFn2lfwWy9ic7cP8EpCTeFp1tFaD+vxBhPZkeTQ1HKx6hQ5zeHIB5ySJJZ7af2W8r4eTGYzbdRW24DDHCPhZAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAQMv+BFvGdMVzkQaQ3/+2noVz/uAKbzpEL8xTcxYyP3lkOeh4FoxiSWqy5pGFALdPONoDuYFpLhjJSZaEwuvjI/TrrGhLV1pRG9frwDFshqD2Vaj4ENBCBh6UpeBop5+285zQ4SI7q4U9oSebUDJiuOx6+tZ9KynmrbJpTSi0+BM=</ns2:X509Certificate>
         </ns2:Person>
         <ns2:Person>
            <ns2:personidentifikator>01012296378</ns2:personidentifikator>
            <ns2:reservasjon>JA</ns2:reservasjon>
            <ns2:status>AKTIV</ns2:status>
            <ns2:Kontaktinformasjon>
               <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
               <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01012296378_test@minid.difi.no</ns2:Epostadresse>
            </ns2:Kontaktinformasjon>
            <ns2:SikkerDigitalPostAdresse>
               <ns2:postkasseadresse>1</ns2:postkasseadresse>
               <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
            </ns2:SikkerDigitalPostAdresse>
            <ns2:X509Certificate>MIIC2jCCAkMCAg38MA0GCSqGSIb3DQEBBQUAMIGbMQswCQYDVQQGEwJKUDEOMAwGA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNEREMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdlYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIwODIyMDUyNzQxWhcNMTcwODIxMDUyNzQxWjBKMQswCQYDVQQGEwJKUDEOMAwGA1UECAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0z9FeMynsC8+udvX+LciZxnh5uRj4C9S6tNeeAlIGCfQYk0zUcNFCoCkTknNQd/YEiawDLNbxBqutbMDZ1aarys1a0lYmUeVLCIqvzBkPJTSQsCopQQ9V8WuT252zzNzs68dVGNdCJd5JNRQykpwexmnjPPv0mvj7i8XgG379TyW6P+WWV5okeUkXJ9eJS2ouDYdR2SM9BoVW+FgxDu6BmXhozW5EfsnajFp7HL8kQClI0QOc79yuKl3492rH6bzFsFn2lfwWy9ic7cP8EpCTeFp1tFaD+vxBhPZkeTQ1HKx6hQ5zeHIB5ySJJZ7af2W8r4eTGYzbdRW24DDHCPhZAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAQMv+BFvGdMVzkQaQ3/+2noVz/uAKbzpEL8xTcxYyP3lkOeh4FoxiSWqy5pGFALdPONoDuYFpLhjJSZaEwuvjI/TrrGhLV1pRG9frwDFshqD2Vaj4ENBCBh6UpeBop5+285zQ4SI7q4U9oSebUDJiuOx6+tZ9KynmrbJpTSi0+BM=</ns2:X509Certificate>
         </ns2:Person>
                … 998 Personer
      </ns3:HentEndringerRespons>

```
