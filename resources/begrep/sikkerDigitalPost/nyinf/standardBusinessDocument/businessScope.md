---
title: BusinessScope
permalink: dpi_businessscope.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Inneholder identifikasjon om dokumentet. |
| Kilde         | [GS1](https://www.gs1.org/standards/edi-xml-gdsn-gs1-un-cefact-xml-profiles/sbdh-technical-specifications/1-3) |

### Properties

| Identifikator      | Kardinalitet | Datatype  | Verdi                                                                                                                                                                   |
| ------------------ | ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type               | 1..1         | String | “ConversationId”                                                                                                                                                        |
| instanceIdentifier | 1..1         | String - uuid | Unik identifikator for konversasjonen ([UUID](https://datatracker.ietf.org/doc/html/rfc4122)). Identifikator som binder meldinger og tilhørende kvitteringer/feilmeldinger sammen. Opprettet av Databehandler. Se format under. |
| identifier         | 1..1         | String | Prosess meldingen tilhører i hennold til [meldingstypene](dpi_forretningsmelding_index.html)|




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
