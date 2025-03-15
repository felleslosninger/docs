---
title: Tillitsrammeverk
description: Tillitsrammeverk

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_tillitsrammeverk
---

Her vil det kome informasjon om tillistrammeverket i sandkassen.


<div class="mermaid">

graph LR
  TLI[(Register over utstedere)]
  TLW[(Register over lommbøker)]
  TLRP[(Register over brukerstads-registrarer)]
  DRPR[(Digdir brukerstad-register)]
  RPR[(Andre brukerstad-registre)]
end

TLRP --> DRPR
TLRP --> RPR
</div>

