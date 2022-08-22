---
title: Feilsøking
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling tilbyr flere verktøy som lar en feilsøke eFormidling:

- Integrasjonspunktet tilbyr støttetjenester under `/manage/<støttetjeneste>`. Se gjerne:
  - [Spring Boot`s støttetjenester](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints) (ekstern lenke)
- Integrasjonspunkt produserer logg (både til fil og STDOUT)
- Integrasjonspunktet sender logg til eFormidling sentrale loggtjeneste slik at Digdir kan feilsøke på tvers av
avsenders integrasjonspunkt, mottakers integrasjonspunkt og eFormidlings sentrale tjenester
- Integrasjonspunktets grensesnitt tilbyr tjenester for å hente ut meldingsmetadata inkludert status for meldinger
- eFormidlings sentrale tjenester tilbyr e-postvarsling for meldinger som feiler og utløper, og sertifikat som utløper

De fleste feilsituasjoner som oppstår er kjente og utenfor eFormidlings kontroll slik som nettverksproblemer,
nedetid og andre feilsituasjoner hos meldingstjenestene som brukes, utgåtte sertifikat hos avsender/mottaker, osv.

Ta kontakt med vår servicedesk ved behov:

- <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

## Neste steg

- [Kjente feil](kjente_feil)
- [Spørsmål og svar](sporsmal_og_svar)
