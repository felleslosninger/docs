---
title: Informasjonsbehov
permalink: informasjonsbehov.html
sidebar: begrep_sidebar
---

| ---- | ---- |
| Term | informasjonsbehov |
| Definisjon | Beskriver det opplysningskrav som en Virksomhet har definert |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | informasjonsbehov brukes i forespørsler til registre for å definere hvilke opplysninger som skal utleveres til virksomheten. Forespørselen vil være en [HentPersonerForespoersel](ot_hentpersonerforespoersel.html) som sendes til kontakt-og reservasjonsregisteret. | 

### Xml eksempel

```
<ns:informasjonsbehov>Kontaktinfo</ns:informasjonsbehov>
<ns:informasjonsbehov>Sertifikat</ns:informasjonsbehov>
<ns:informasjonsbehov>SikkerDigitalPost</ns:informasjonsbehov>
<ns:informasjonsbehov>VarslingsStatus</ns:informasjonsbehov>
<ns:informasjonsbehov>Spraak</ns:informasjonsbehov>
```

