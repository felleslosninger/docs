-----
title: Epostadresse  
permalink: oppslagstjenesten_epostadresse.html
sidebar:
-----

| Identifikator  | http://begrep.difi.no/Oppslagstjenesten/5.0.0/5.0/Epostadresse |
|Term | nyny |
| Definisjon  | Informasjon om en Person sitt Epostadresse registrert i kontakt og reservasjonsregisteret |
| Datatype  | complexType |
| Kilde | DIFI |
| Kommentar  |
    Informasjon om en Person sitt Epostadresse registrert i kontakt og
    reservasjonsregisteret. Epost-addressen blir validert vha.
    biblioteket [Apache
    Commons](http://commons.apache.org/proper/commons-validator/) |

#### Attributer

| --- | --- |
| Term | Kardinalitet |
| [epostadresse](../felles/epostadresse.md)     | 0..1 |
| [sistOppdatert](../felles/sistoppdatert.md)   | 0..1 |
| [sistVerifisert](../felles/sistverifisert.md) | 0..1 |
 



#### Xml eksempel

```
<ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01012295312_test@minid.difi.no</ns2:Epostadresse>
```
