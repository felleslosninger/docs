---
title: BusinessScope
permalink: dpi_businessscope.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | inneholder identifikasjon om dokumentet |
| Kilde         | [GS1](http://www.gs1.org/docs/gsmp/xml/sbdh/CEFACT_SBDH_TS_version1.3.pdf) |

### Properties

| Identifikator      | Kardinalitet | Datatype  | Verdi                                                                                                                                                                   |
| ------------------ | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type               | 1..1         | string | “ConversationId”                                                                                                                                                        |
| instanceIdentifier | 1..1         | string - uuid | Unik identifikator for konversasjonen ([UUID](https://datatracker.ietf.org/doc/html/rfc4122)). Identifikator som binder meldinger og tilhørende kvitteringer/feilmeldinger sammen. Opprettet av Databehandler. Se format under. |
| identifier         | 1..1         | string | Prosess meldingen tilhører i hennold til [meldingstypene](dpi_forretningsmelding_index.html)|




### Eksempel

```json
{
    "businessScope": {
            "scope": [
                {
                    "type": "ConversationId",
                    "instanceIdentifier": "37efbd4c-413d-4e2c-bbc5-257ef4a65a45",
                    "identifier": "urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0"
                }
            ]
        }
}
```
