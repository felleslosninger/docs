---
title: Epostadresse  

sidebar: begrep_sidebar
---

| --- | --- |
|Term | Epostadresse |
| Definisjon  | Informasjon om Epostadresse tilhørende en person som er registrert i kontakt og reservasjonsregisteret |
| Datatype  | complexType |
| Kilde | DIFI |
| Kommentar | Informasjon om Epostadresse tilhørende en person som er registrert i kontakt og reservasjonsregisteret. Epost-addressen blir validert vha. biblioteket [ApacheCommons](http://commons.apache.org/proper/commons-validator/) |

#### Attributer

| --- | --- |
| Term | Kardinalitet |
| [epostadresse]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/epostadresse)     | 0..1 |
| [sistOppdatert]({{site.baseurl}}/resources/begrep/felles/sistOppdatert)   | 0..1 |
| [sistVerifisert]({{site.baseurl}}/resources/begrep/felles/sistVerifisert) | 0..1 |
 



#### Xml eksempel

```
<ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01012295312_test@minid.difi.no</ns2:Epostadresse>
```
