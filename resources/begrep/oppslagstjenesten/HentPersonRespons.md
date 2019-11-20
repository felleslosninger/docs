---
title: HentPersonRespons
permalink: ot_hentpersonrespons.html
datatype: Metode
sidebar: begrep_sidebar
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Webservice-respons på en [HentPersonForespoersel](ot_hentpersonforespoersel.html |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Respons gjelder innlogget person som accesstokenet er knyttet til. |

### Eksempel på HentPersonRespons (REST)

```
{
  "personidentifikator": "string",
  "reservasjon": "JA",
  "status": "AKTIV",
  "varslingsstatus": "KAN_IKKE_VARSLES",
  "kontaktinformasjon": {
    "epostadresse": "string",
    "epostadresse_oppdatert": "string",
    "epostadresse_sist_verifisert": "string",
    "mobiltelefonnummer": "string",
    "mobiltelefonnummer_oppdatert": "string",
    "mobiltelefonnummer_sist_verifisert": "string"
  },
  "digital_post": {
    "postkasseadresse": "string",
    "postkasseleverandoeradresse": "string"
  },
  "sertifikat": "string",
  "spraak": "string",
  "spraak_oppdatert": "string"
}
```
