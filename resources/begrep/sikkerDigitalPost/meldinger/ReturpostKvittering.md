---

title: ReturpostKvittering  
permalink: sdp_returpostkvittering.html
sidebar: dpi_sidebar
---

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En [Kvitteringsmelding](KvitteringsMelding.md) fra Utskriftstjenesten til Avsender om at post ikke kunne leveres til Mottaker. |
| Kilde         | DIFI |
| Kommentar     | Dette er Kvittering på at posten har kommet i retur og har blitt makulert. |

Kvitteringen leveres når brevene er mottatt i retur av utskrift og
forsendelsestjenesten, registrert og makulert. Dette forutsetter at
avsender har valgt å benytte denne tjenesten i feltet
(Link til /felles/returPostStrategi.md) i opprinnelig melding.  
Kvitteringen vil komme flere dager etter at en forsendelse er sendt til
utskrift og forsendelsetjenesten, dette er overordne de steg som skal
gjennomføres før Avsender får ReturpostKvittering

| Steg | Beskrivelse | Antatt tidsbruk |
| --- | --- | --- |
| Utskrift | Brevet skrives ut og postlegges | 1 dag |
| Forsendelse | Brevet forsendes til Avsender | 2 til 5 dager |
| Retur til EA tjeneste | Brev som ikke kan leveres vil bruke noe tid tilbake til retur tjenesten | 1 til 2 dager |
| Behandling av returpost | Brev makuleres og kvittering skapes | 2 - 4 dager |
| Retur av kvittering | Kvittering gjøres tilgjengelig i meldingsformidler | Umiddelbart |

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
