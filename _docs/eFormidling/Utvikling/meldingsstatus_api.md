---
title: Meldingsstatus API
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden beskriver meldingsstatus API og bruksmønstre for dette.

TODO ferdigstille beskrivelse av meldingsstatus API

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
