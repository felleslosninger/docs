---
title: HentPrintSertifikatRespons  
permalink: ot_hentprintsertifikatrespons.html
datatype: Metode
sidebar:
---

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    Respons sendt tilbake til Virksomhet som svar på
    [HentPrintSertifikatForespoersel](HentPrintSertifikatForespoersel.md)
  - Datatype  
    {{ page.datatype }}
  - Kilde  
    DIFI
  - Kommentar  
    Webservice respons som Oppslagstjenesten sender til Klient, respons
    inneholder ET Sertifikat.  
    For
    [HentPrintSertifikatForespoersel](HentPrintSertifikatForespoersel.md)
    leveres det ut det sertifikatet som skal brukes for å kryptere
    meldinger som skal printes til Innbygger.  
    Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om
    responsen og hvordan denne leveres og sikres.

#### Attributer

| Term                                                               | Kardinalitet |
| ------------------------------------------------------------------ | ------------ |
| [postkasseleverandoerAdresse](../felles/postkasseleverandoerAdresse.md) | 1..1         |
| [X509Sertifikat](../felles/X509Sertifikat.md)                           | 1..1         |

#### Xml skjema

``` brush: xml; toolbar: false
<ns2:HentPrintSertifikatRespons xmlns:ns2="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
     <ns2:postkasseleverandorAdresse>printserveradresse</ns2:postkasseleverandorAdresse> <ns2:X509Sertifikat>MIIC2jCCAkMCAg38MA0GCSqGSIb3DQEBBQUAMIGbMQswCQYDVQQGEwJKUDEOMAwGA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNEREMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdlYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIwODIyMDUyNzQxWhcNMTcwODIxMDUyNzQxWjBKMQswCQYDVQQGEwJKUDEOMAwGA1UECAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0z9FeMynsC8+udvX+LciZxnh5uRj4C9S6tNeeAlIGCfQYk0zUcNFCoCkTknNQd/YEiawDLNbxBqutbMDZ1aarys1a0lYmUeVLCIqvzBkPJTSQsCopQQ9V8WuT252zzNzs68dVGNdCJd5JNRQykpwexmnjPPv0mvj7i8XgG379TyW6P+WWV5okeUkXJ9eJS2ouDYdR2SM9BoVW+FgxDu6BmXhozW5EfsnajFp7HL8kQClI0QOc79yuKl3492rH6bzFsFn2lfwWy9ic7cP8EpCTeFp1tFaD+vxBhPZkeTQ1HKx6hQ5zeHIB5ySJJZ7af2W8r4eTGYzbdRW24DDHCPhZAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAQMv+BFvGdMVzkQaQ3/+2noVz/uAKbzpEL8xTcxYyP3lkOeh4FoxiSWqy5pGFALdPONoDuYFpLhjJSZaEwuvjI/TrrGhLV1pRG9frwDFshqD2Vaj4ENBCBh6UpeBop5+285zQ4SI7q4U9oSebUDJiuOx6+tZ9KynmrbJpTSi0+BM=</ns2:X509Sertifikat>
</ns2:HentPrintSertifikatRespons>

```
