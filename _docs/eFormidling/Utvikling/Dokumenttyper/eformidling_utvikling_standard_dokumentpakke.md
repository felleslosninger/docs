---
title: "Dokumentpakke"
description: ""
summary: ""
permalink: eformidling_utvikling_standard_dokumentpakke.html
product: eFormidling
sidebar: eformidling_sidebar
---

Dokumentpakken er et kryptert og signert arkiv med et eller flere dokument.

<div class="mermaid">
graph TD
subgraph Kryptert dokumentpakke CMS
  subgraph ZIP-arkiv ASiC-E
      A(dokument1.pdf)
      B(dokument2.html)
      C(dokument3.xml)
      D(signature.p7s)
  end
end
</div>

Dokumentpakken krypteres med cryptographic message syntax (CMS) enveloped data. Dette er et format for krypterte
meldinger der meldingsinnholdet er kryptert med en symmetrisk engangsnøkkel. Den symmetriske engangsnøkkelen krypteres
med mottakerens offentlige nøkkel med algoritmen RSA-OAEP. Mottakerens offentlige nøkkel hentes fra eFormidlings
adressetjeneste (service registry). Meldingsinnholdet krypteres med en symmetrisk engangsnøkkel med algoritmen AES256
CBC.

- [RFC5652 Cryptographic Message Syntax](https://datatracker.ietf.org/doc/html/rfc5652) (ekstern lenke)

Meldingsinnholdet er på formatet Associated Signature Container Extended (ASiC-E). Dette er i praksis et ZIP-arkiv som
inneholder et eller flere dokument, samt signatur for disse dokumentene. Signaturen er på formatet CMS Advanced
Electronic Signatures (CAdES).

- [ETSI TS 102 918 V1.3.1 Associated Signature Containers (ASiC)](https://www.etsi.org/deliver/etsi_ts/102900_102999/102918/01.03.01_60/ts_102918v010301p.pdf) (ekstern lenke)
- [ETSI TS 101 733 V2.2.1 CMS Advanced Electronic Signatures (CAdES)](https://www.etsi.org/deliver/etsi_ts/101700_101799/101733/02.02.01_60/ts_101733v020201p.pdf) (ekstern lenke)

eFormidlings meldingstjenste og eInnsyns meldingstjeneste bruker dokumentpakker som beskrevet her. Digital Post til
Innbyggerer bruker lignende dokumentpakker men med litt andre valg av algoritmer. De andre meldingstjenestene har sine
egne måter å beskytte meldingene på. Integrasjonspunktet lagrer både utgående og innkommende meldinger som
dokumentpakker. For utgående meldinger er det integrasjonspunktet som bygger dokumentpakkene.
