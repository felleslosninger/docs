---
title: Arkitektur
description: Arkitektur

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_arkitektur
---

På denne sida forsøker me å gje ei overordna forklaring av arkitekturen til lommeboka og sandkassen.

Lommebok-økosystemet til EU er i stor grad inspirert frå av teknologi for desentralisert identitet og eigen-kontroll over data gjennom bruk av sokalla [Verifiable Credentials](https://en.wikipedia.org/wiki/Verifiable_credentials), som vist i figuren under:

<div class="mermaid">
graph LR
  direction LR
  I["Utstedar 
(issuer)"]
  H["Lommebok 
(holder)"]
  V["Brukarstad 
(verifier / relying party)"]

  I -. utsteder bevis til .-> H
  H -. presenterer bevis til .-> V
</div>

Omgrepa "Issuer, Holder, Verifier" kjem frå [W3C sin datamodell](https://www.w3.org/TR/vc-data-model/#roles).  Me har forsøkt å finne nokre passande norske omsetjingar som du kan sjå i figuren ovanfor.

EU-kommisjonen publiserer ein [ein referansearkitektur](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/#3-eudi-wallet-ecosystem), den sokalla "ARF'en", som skildrar økosystemet og roller og prosessar som inngår. Me anbefalar at dei som har interesse av å setje seg djupare inn i arkitekturen les denne.

Ein kan merke seg at ARFen formelt sett ikkje er eit juridisk bindande dokument, det er lova og rettsaktene (implementing acts) som er, og desse peiker i sin tur på vedtekne standardar frå ETSI, ISO og OpenID Foundation.  Men i praksis er det ARFen som gjev det beste biletet av korleis ting heng saman.

## Norsk sandkasse:

Slik ser Digdir for oss at sandkassen ser ut i Noreg:

<div class="mermaid">
graph LR
  subgraph AK [Autorative kjelder]
  F(Folkeregisteret)
  E(Enhentsregisteret)
  D(Datakjelder)
  end

  subgraph U [Utstedere]
  PID(PID-utsteder, Digdir)
  DI(Digdir-utsteder)
  I(Andre utstedere)
  end

  subgraph L [Lommebøker]
  direction LR
  DW["Digdir
demo-lommbok"]
  W["Andre 
lommebøker"]
  end

  subgraph B [Brukerstader]
  direction LR
  DRP["Digdir demo
brukerstad"]
  RP["Andre
brukarstader"]
  end



  F -. kjelde til personidentitet  .-> PID
  E -. kjelde til verksemdsidentitet .-> PID

  D -. kjelde til bevis .-> DI
  D -. kjelde til bevis .-> I

  U -. gjev bevis til .-> L

  L -. presenterer bevis mot .-> B


</div>

For at dette økosystemet skal fungere, er komponentane avhengig av eit felles tillitsrammeverk som bestemmer kven som er godkjente aktørar.  Desse tillitslistene er i ferd med å verte etablert av EU-kommisjonen som sentrale fellestjenester.  Fram til desse registra er tilgjengelege, so vil Digdir tilby ein norsk variant som må nyttast:

<div class="mermaid">

graph LR
  TLI[(Register over utstedere)]
  TLW[(Register over lommbøker)]
  TLRP[(Register over brukerstads-registrarer)]
  DRPR[(Digdir brukerstad-register)]
  RPR[(Andre brukerstad-registre)]


TLRP --> DRPR
TLRP --> RPR
</div>

Sjølve kommunikasjonen mellom aktørane er dokumentert på eigne sider [for utstedelse](lommebok_protokoll_vci.html) eller [for bruk](lommebok_protokoll_vp.html). 