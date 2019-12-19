---
title: epostadresse
permalink: 2epostadresse.html
sidebar:
---

| ---- | ---- |
| Identifikator |  |
| Term | epostadresse |
| Definisjon | Adresse til en elektronisk postkasse på Internett |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | En epostadresse lagret i Digital kontaktregister. | 

Følgende format regler gjelder for epostadresse

* epostadresse er maks 50 tegn lang.
* Formatreglene for epostadresse er styrt av flere RFC fra IETF, blant annet: RFC2822.
  * Trolig best/enklest dokumentert på wikipedia
* Digital kontaktregister bruker pr. dags. dato Apache Commons Validator sin e-postadresse validator for å realisere formatreglene for epostadresse.

### Xml eksempel

```
<ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01012295312_test@minid.difi.no</ns2:Epostadresse>
```


