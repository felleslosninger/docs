---
title: endringsnummer
permalink: endringsnummer.html
sidebar:
---

| ---- | ---- |
| Identifikator | http://begrep.difi.no/Felles/endringsNummer |
| Term | endringsNummer |
| Definisjon | Et nummer som identifiserer en endring i et register. |
| Datatype | long |
| Kilde | DIFI |
| Kommentar | Enhver endring i Kontakt- og reservasjonsregisteret tilordnes ett løpenummer som øker med en (1) for hver endring. Dette brukes for at virksomheter som vedlikeholder lokale kopier av registeret enkelt skal ha sporbarhet på alle endringer. | 

### Xml eksempel

Eksempler på bruk av endringsNummer fra tjenesten HentEndringerForespoersel:

```
<ns:HentEndringerForespoersel fraEndringsNummer="1001">
```

```
<ns3:HentEndringerRespons fraEndringsNummer="1001" senesteEndringsNummer="2440049" tilEndringsNummer="2000" xmlns:ns2="http://begrep.difi.no" xmlns:ns3="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
```



