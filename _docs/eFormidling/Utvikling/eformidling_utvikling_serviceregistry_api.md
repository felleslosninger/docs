---
title: Adressetjenestens (Service Registry) API
description: ""
summary: ""
permalink: eformidling_utvikling_serviceregistry_api.html
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden beskriver adressetjenestens (Service Registry) API og bruksmønstre for dette.

- [API-dokumentasjon](eformidling_sr_restdocs.html) (ekstern lenke)

Adressetjenesten er en sentral komponent som tilbys av eFormidling.

Integrasjonspunktet bruker adressetjenesten under panseret, og kapabilitetsoppslagene integrasjonspunktet tilbyr baserer
seg på informasjon fra adressetjenesten. Det er vanligvis ikke nødvendig å integrere direkte mot adressetjenesten, men i
noen sjeldne tilfeller ønsker en virksomhet å kommunisere med virksomheter på eFormidling uten selv å kjøre et
integrasjonspunkt.

Adressetjenesten er en fasade mot adressetjenestene for de ulike meldingstjenestene som støttes av eFormidling. I
tillegg er forretningsregler for hva som er mottakernes foretrukne kanaler i ulike sammenhenger implementert i
adressetjenesten.

Adressetjenesten gir også tilgang til sertifikatkatalogen (VirkSert) i eFormidling.

<div class="mermaid">
graph LR
I1("Integrasjonspunkt 1")
I2("Integrasjonspunkt 2")
I3("Integrasjonspunkt N")
A("Adressetjenesten (Service Registry)")
P("Peppol Service Metadata Locator & Provider (SML & SMP)")
FI("KS FIKS adressetjeneste")
K("Kontakt og reservasjonsregisteret")
E("Enhetsregisteret")
FO("Folkeregisteret")
V("Sertifikatkatalogen (VirkSert)")

I1 --> A
I2 --> A
I3 --> A
A --> P
A --> FI
A --> K
A --> E
A --> FO
A --> V
</div>
