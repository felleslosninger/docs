---
title: Meldingsstatus API
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden beskriver meldingsstatus API og bruksmønstre for dette.

eFormidling benytter meldingsstatuser for å understøtte feilsøking, varsling av feil og statistikk. Dette har tidligere
blitt levert sammen med logg, men for å sikre pålitelig overlevering av meldingsstatuser etableres det nå et API
for å ta imot disse.

Integrasjonspunktet bruker meldingsstatustjenesten under panseret. Det er vanligvis ikke nødvendig å integrere direkte
mot meldingsstatustjenesten, men i noen sjeldne tilfeller ønsker en virksomhet å kommunisere med virksomheter på
eFormidling uten selv å kjøre et integrasjonspunkt.

<div class="mermaid">
graph LR
I1("Integrasjonspunkt 1")
I2("Integrasjonspunkt 2")
I3("Integrasjonspunkt N")
M("Meldingsstatustjenesten")
S("Statistikk")
F("Feilsøking")
V("Varsling")

I1 --> M
I2 --> M
I3 --> M
M --> S
M --> F
M --> V
</div>

Eksempel på statusmelding:

```
{
    "conversation_id": "3233d263-30d0-4cd4-9e38-ff62a978d58e",
    "receiver_org_number": "991825827",
    "@timestamp": "2022-08-10T00:11:27.246Z",
    "service_identifier": "DPE",
    "sender": "0192:971203420",
    "status": "LEVERT",
    "orgnr": "971203420",
    "receiver": "0192:991825827",
    "message_id": "65f237bc-7d64-45cb-8f4d-3d81345b4668",
    "process_identifier": "urn:no:difi:profile:einnsyn:journalpost:ver1.0",
    "sender_org_number": "971203420",
    "document_identifier": "urn:no:difi:einnsyn:xsd::publisering"
}
```

Statusmeldinger leveres over HTTP eller RSocket med OAuth JWT fra Maskinporten.

- HTTP: `POST https://qa-meldingsutveksling.difi.no/logging/api/status`
- RSocket: `qa-meldingsutveksling.difi.no:7070`

Meldingsstatus API bruker OAuth2 for autorisasjon og forventer selvforsynte JWT fra Maskinporten. JWT-forespørsler til
Maskinporten er forventet å inneholde x5c for det norske virksomhetssertifikatet (SEIDv1 or SEIDv2) JWT-forespørselen
ble signert med.

- [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_overordnet) (ekstern lenke)

eFormidling oppretter OAuth-klienter i Maskinporten som del av onboarding-prosessen:

- Klient-IDen er `MOVE_IP_<orgnummer>`
- En eller flere av følgende scope blir tildelt klienten:
  - move/dpo.read (eFormidlings meldingstjeneste)
  - move/dpe.read</code> (eInnsyns meldingstjeneste)
  - move/dpi.read</code> (Digital Post til Innbyggere)
  - move/dpf.read</code> (KS SvarUt og SvarInn)
  - move/dpv.read</code> (Altinn Digital Post)
