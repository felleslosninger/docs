---
title: virksomhetsidentifikator

sidebar: sidebar_begrep
---

| ---- | ---- |
| Identifikator |  |
| Term | virksomhetsidentifikator |
| Definisjon | Identifikasjon av en virksomhet |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | virksomhetsidentifikator er et organisasjonsnummer i henhold til ISO 6523. Det vil si at organisasjonsnummeret er prefixet med et Global Location Number utstedt av GS1. I tillegg bør scope angis ihht Oasis PartyIdType. Dersom det ikke er angitt scope så skal dette alltid tolkes som ISO 6523 kode 9908 som angir organisasjonsnummer for norske virksomheter forvaltet av Brønnøysundregistrene. | 

#### Xml eksempel

```
<virksomhetsidentifikator authority="urn:oasis:names:tc:ebcore:partyid-type:iso6523:9908">9908:123456789</virksomhetsidentifikator>
```


