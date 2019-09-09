---
title: HentPersonerRespons  
permalink: ot_hentpersonerrespons.html
datatype: Metode
sidebar: dpi_sidebar
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Respons sendt tilbake til Virksomhet som svar på [HentPersonerForespoersel](HentPersonerForespoersel.md) |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice respons som Oppslagstjenesten sender til Klient, respons inneholder de Personer som Virksomhet forespurte med den registrerte informasjonen som Virksomhet ba om. Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om forespørselen og hvordan denne sendes. |

#### Attributer

| Term             | Kardinalitet |
| ---------------- | ------------ |
| [Person](Person.md) | 1..1000      |

#### Xml eksempel

``` 
<ns3:HentPersonerRespons xmlns:ns2="http://begrep.difi.no" xmlns:ns3="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
 <ns2:Person>
    <ns2:personidentifikator>01013355300</ns2:personidentifikator>
    <ns2:reservasjon>NEI</ns2:reservasjon>
    <ns2:status>AKTIV</ns2:status>
    <ns2:varslingsstatus>KAN_VARSLES</ns2:varslingsstatus>
    <ns2:Kontaktinformasjon>
       <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
       <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01013355300_test@minid.difi.no</ns2:Epostadresse>
    </ns2:Kontaktinformasjon>
    <ns2:SikkerDigitalPostAdresse>
       <ns2:postkasseadresse>1</ns2:postkasseadresse>
       <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
    </ns2:SikkerDigitalPostAdresse>
    <ns2:X509Certificate>MIIC2jCCAkMCAg38MA0GCSqGSIb3DQEBBQUAMIGbMQswCQYDVQQGEwJKUDEOMAwGA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNEREMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdlYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIwODIyMDUyNzQxWhcNMTcwODIxMDUyNzQxWjBKMQswCQYDVQQGEwJKUDEOMAwGA1UECAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0z9FeMynsC8+udvX+LciZxnh5uRj4C9S6tNeeAlIGCfQYk0zUcNFCoCkTknNQd/YEiawDLNbxBqutbMDZ1aarys1a0lYmUeVLCIqvzBkPJTSQsCopQQ9V8WuT252zzNzs68dVGNdCJd5JNRQykpwexmnjPPv0mvj7i8XgG379TyW6P+WWV5okeUkXJ9eJS2ouDYdR2SM9BoVW+FgxDu6BmXhozW5EfsnajFp7HL8kQClI0QOc79yuKl3492rH6bzFsFn2lfwWy9ic7cP8EpCTeFp1tFaD+vxBhPZkeTQ1HKx6hQ5zeHIB5ySJJZ7af2W8r4eTGYzbdRW24DDHCPhZAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAQMv+BFvGdMVzkQaQ3/+2noVz/uAKbzpEL8xTcxYyP3lkOeh4FoxiSWqy5pGFALdPONoDuYFpLhjJSZaEwuvjI/TrrGhLV1pRG9frwDFshqD2Vaj4ENBCBh6UpeBop5+285zQ4SI7q4U9oSebUDJiuOx6+tZ9KynmrbJpTSi0+BM=</ns2:X509Certificate>
 </ns2:Person>
 <ns2:Person>
    <ns2:personidentifikator>01013355491</ns2:personidentifikator>
    <ns2:reservasjon>NEI</ns2:reservasjon>
    <ns2:status>AKTIV</ns2:status>
    <ns2:varslingsstatus>KAN_VARSLES</ns2:varslingsstatus>
    <ns2:Kontaktinformasjon>
       <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
       <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01013355491_test@minid.difi.no</ns2:Epostadresse>
    </ns2:Kontaktinformasjon>
    <ns2:SikkerDigitalPostAdresse>
       <ns2:postkasseadresse>1</ns2:postkasseadresse>
       <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
    </ns2:SikkerDigitalPostAdresse>
    <ns2:X509Certificate>MIIC2jCCAkMCAg38MA0GCSqGSIb3DQEBBQUAMIGbMQswCQYDVQQGEwJKUDEOMAwGA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNEREMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdlYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIwODIyMDUyNzQxWhcNMTcwODIxMDUyNzQxWjBKMQswCQYDVQQGEwJKUDEOMAwGA1UECAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0z9FeMynsC8+udvX+LciZxnh5uRj4C9S6tNeeAlIGCfQYk0zUcNFCoCkTknNQd/YEiawDLNbxBqutbMDZ1aarys1a0lYmUeVLCIqvzBkPJTSQsCopQQ9V8WuT252zzNzs68dVGNdCJd5JNRQykpwexmnjPPv0mvj7i8XgG379TyW6P+WWV5okeUkXJ9eJS2ouDYdR2SM9BoVW+FgxDu6BmXhozW5EfsnajFp7HL8kQClI0QOc79yuKl3492rH6bzFsFn2lfwWy9ic7cP8EpCTeFp1tFaD+vxBhPZkeTQ1HKx6hQ5zeHIB5ySJJZ7af2W8r4eTGYzbdRW24DDHCPhZAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAQMv+BFvGdMVzkQaQ3/+2noVz/uAKbzpEL8xTcxYyP3lkOeh4FoxiSWqy5pGFALdPONoDuYFpLhjJSZaEwuvjI/TrrGhLV1pRG9frwDFshqD2Vaj4ENBCBh6UpeBop5+285zQ4SI7q4U9oSebUDJiuOx6+tZ9KynmrbJpTSi0+BM=</ns2:X509Certificate>
 </ns2:Person>
 <ns2:Person>
    <ns2:personidentifikator>01013356366</ns2:personidentifikator>
    <ns2:reservasjon>NEI</ns2:reservasjon>
    <ns2:status>AKTIV</ns2:status>
    <ns2:varslingsstatus>KAN_VARSLES</ns2:varslingsstatus>
    <ns2:Kontaktinformasjon>
       <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
       <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01013356366_test@minid.difi.no</ns2:Epostadresse>
    </ns2:Kontaktinformasjon>
    <ns2:SikkerDigitalPostAdresse>
       <ns2:postkasseadresse>1</ns2:postkasseadresse>
       <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
    </ns2:SikkerDigitalPostAdresse>
    <ns2:X509Certificate>MIIC2jCCAkMCAg38MA0GCSqGSIb3DQEBBQUAMIGbMQswCQYDVQQGEwJKUDEOMAwGA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNEREMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdlYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIwODIyMDUyNzQxWhcNMTcwODIxMDUyNzQxWjBKMQswCQYDVQQGEwJKUDEOMAwGA1UECAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0z9FeMynsC8+udvX+LciZxnh5uRj4C9S6tNeeAlIGCfQYk0zUcNFCoCkTknNQd/YEiawDLNbxBqutbMDZ1aarys1a0lYmUeVLCIqvzBkPJTSQsCopQQ9V8WuT252zzNzs68dVGNdCJd5JNRQykpwexmnjPPv0mvj7i8XgG379TyW6P+WWV5okeUkXJ9eJS2ouDYdR2SM9BoVW+FgxDu6BmXhozW5EfsnajFp7HL8kQClI0QOc79yuKl3492rH6bzFsFn2lfwWy9ic7cP8EpCTeFp1tFaD+vxBhPZkeTQ1HKx6hQ5zeHIB5ySJJZ7af2W8r4eTGYzbdRW24DDHCPhZAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAQMv+BFvGdMVzkQaQ3/+2noVz/uAKbzpEL8xTcxYyP3lkOeh4FoxiSWqy5pGFALdPONoDuYFpLhjJSZaEwuvjI/TrrGhLV1pRG9frwDFshqD2Vaj4ENBCBh6UpeBop5+285zQ4SI7q4U9oSebUDJiuOx6+tZ9KynmrbJpTSi0+BM=</ns2:X509Certificate>
 </ns2:Person>
</ns3:HentPersonerRespons>
```
