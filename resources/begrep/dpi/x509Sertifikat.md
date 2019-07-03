---
title: x509Sertifikat
permalink: x509Sertifikat.html
sidebar:
---

| ---- | ---- |
| Identifikator | http://begrep.difi.no/Felles/X509Sertifikat |
| Term | x509Sertifikat |
| Definisjon | Et X509 Sertifikat |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | En datatype for base64 encoded X509 sertifikat. | 


Datatypen er den samme X509Certifiate i X509Data fra xml digital signature standarden. Men siden den standarden ikke tillater å representere sertifikatet uten at det er en del av X509Data har vi definert en egen datatype for overføring av kun et sertifikat.

### Xml eksempel

``` <>
```

