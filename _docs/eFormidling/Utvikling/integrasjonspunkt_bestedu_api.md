---
title: Integrasjonspunktets BEST/EDU-API
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden beskriver integrasjonspunktets API (`BEST/EDU`) og dets bruksmønster.

BEST/EDU ble valgt i Difi-rapporten 2015/3

BEST/EDU medfører en rekke begrensninger og er derfor under utfasing til fordel for [eFormidling 2](integrasjonspunkt_eformidling2_api).

Dokumentasjon av API og bruksmønster er av samme grunn begrenset, men en kort introduksjon følger.

BEST/EDU er et grensesnitt for kommunikasjon mellom sak- og arkivsystem. Grensesnittet ble spesifisert av Fylkesmannen
i Sogn og Fjordane med utgangspunkt i NOARK 4 Web Service. En beskrivelse av BEST/EDU inkludert XML-skjema er vedlagt
rapporten som ligger til grunn for at eFormidling ble laget:

- [Løsning for meldingsutveksling i offentlig sektor](https://www.digdir.no/felleslosninger/losning-meldingsutveksling-i-offentlig-sektor/1390)

Ulike fagsystem har gjort ulike tilpasninger i sine implementasjoner av BEST/EDU. Det er implementert støtte for disse
variantene i integrasjonspunktet.

- Søk etter "noarkexchange.wsdl" på [Integrasjonspunktet på GitHub](https://github.com/felleslosninger/efm-integrasjonspunkt/find/master) for å se ulike varianter som støttes av integrasjonspunktet (ekstern lenke)
- [NOARK 4 Web Service](https://github.com/arkivverket/schemas/blob/master/N4WS/latest/noark4ws.wsdl) (ekstern lenke)
- [NOARK 4 Web Service Types](https://github.com/arkivverket/schemas/blob/master/N4WS/latest/noark4ws-types.xsd) (ekstern lenke)
