---
title: Ansattporten protokoll
description: Ansattporten er protokoll-lik med ID-porten

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_protocol
---

Ansattporten sin protokoll-støtte er nær identisk med ID-porten sin, og vi henviser til [denne](../../docs/idporten/oidc/oidc_protocol_authorize.html).


Merk spesielt følgende:

* Ansattporten bruker RAR for koding av representasjonsforhold. Dette er dokumentert [her](ansattporten_rar.html)
* Ansattporten har egne endepunkt.  Se [metadata](ansattporten_wellknown.html)

### acr

Ansattporten støtter flere eID enn ID-porten.  Klienten angir hvilke eIDer den vil motta ved å angi en array av  `acr_values` i [autentiseringsforespørselen](../../docs/idporten/oidc/oidc_protocol_authorize.html):

| acr_values    | beskrivelse                                                                                         |
|---------------|-----------------------------------------------------------------------------------------------------|
| `high`        | eID på nivå høgt, som i ID-porten, dvs. BankID, Buypass eller Commfides                             |
| `substantial` | eID på både nivå høgt og betydeleg, dvs. inkluderer MinID i tillegg til dei på nivå høgt.           |
| `entraid`     | Microsoft Entra ID. Se mer informasjon [her](ansattporten_entraid.html)                             |
