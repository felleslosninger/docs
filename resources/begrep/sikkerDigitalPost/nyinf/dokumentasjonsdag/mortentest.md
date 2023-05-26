---
title: Mortens testing
permalink: dpi_mortentest.html
sidebar: dpi_new_sidebar
---

1. TOC
{:toc}

## Sjekkliste for å etablere direkteintegrasjon mot avsenders aksesspunkt:

Sjekklist

1. Sende inn DPI-informasjonsskjema til Digdir: https://samarbeid.digdir.no/digital-postkasse/ta-i-bruk-digital-postkasse-til-innbyggere/107
2. Skaffe gyldig virksomhetssertifikat: 
3. Etablere Maskinporten-integrasjon:
4. Etablere KRR-integrasjon
5. Etablere integrasjon mot Folkeregisteret
6. 
7. Etc. 



| DNS-navn                                                         | IPv4-adresse | Port   | Tjeneste       | Beskrivelse                                                      | Inn-/utgående trafikk
| ---------------------------------------------------------------- | ------------ | ------ | -------------- | ---------------------------------------------------------------- | --------------------- |
| srest.qa.dataplatfor.ms | 51.120.52.137 og 51.120.49.231 | 443 | DPI | REST-endepunktet til avsenders aksesspunkt (hjørne 2) | Utgående |
| crl.test4.buypass.no | 185.62.163.56 | 80 | DPI | Buypass CRL-liste | Utgående |
| crl.test4.buypassca.com | 185.62.163.191 | 80 | DPI | Buypass CRL-liste SEID 2.0 | Utgående |
