---
title: Integrasjonspunktets BEST/EDU-API
description: ""
summary: ""
permalink: eformidling_utvikling_integrasjonspunkt_bestedu_api.html
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden beskriver integrasjonspunktets API (`BEST/EDU`) og dets bruksmønster.

BEST/EDU medfører en rekke begrensninger og er derfor under utfasing til fordel for [eFormidling 2](eformidling_utvikling_integrasjonspunkt_eformidling2_api.html).

Dokumentasjon av API og bruksmønster er av samme grunn begrenset, men en kort introduksjon følger.

BEST/EDU er et grensesnitt for kommunikasjon mellom sak- og arkivsystem. Grensesnittet ble spesifisert av Fylkesmannen
i Sogn og Fjordane med utgangspunkt i NOARK 4 Web Service.

Ulike fagsystem har gjort ulike tilpasninger i sine implementasjoner av BEST/EDU. Det er implementert støtte for disse
variantene i integrasjonspunktet.

- Søk etter "noarkexchange.wsdl" på [Integrasjonspunktet på GitHub](https://github.com/felleslosninger/efm-integrasjonspunkt/find/master) for å se ulike varianter som støttes av integrasjonspunktet (ekstern lenke)
- [NOARK 4 Web Service](https://github.com/arkivverket/schemas/blob/master/N4WS/latest/noark4ws.wsdl) (ekstern lenke)
- [NOARK 4 Web Service Types](https://github.com/arkivverket/schemas/blob/master/N4WS/latest/noark4ws-types.xsd) (ekstern lenke)
