---
title: Arkitektur for digital lommebok
description: Arkitektur for digital lommebok

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_arkitektur
---

På denne sida forsøker me å gje ei overordna forklaring av arkitekturen til lommeboka og sandkassen.

Gjennom revisjon av eIDAS-forordninga så vil medlemslanda i EU bli pålagde å:
- tilby ein digital identitetslommebok til alle innbyggere innan november 2026
- lommeboka skal vere gratis å få og bruke
- lommeboka skal kunne brukast til innlogging
- lommrboka skal kunne brukast til å utveksle bevis (som førarkort, vaksinasjonskort, etc.) til tjenester

Lommebok-økosystemet til EU er i stor grad inspirert frå teknologi for desentralisert identitet og eigen-kontroll over data gjennom bruk av sokalla [Verifiable Credentials](https://en.wikipedia.org/wiki/Verifiable_credentials), som vist i figuren under:

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
  E(Enhetsregisteret)
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

For at dette økosystemet skal fungere, er komponentane avhengig av eit felles tillitsrammeverk som bestemmer kven som er godkjente aktørar.  Desse tillitslistene er i ferd med å verte etablert av EU-kommisjonen som sentrale europeiske fellestjenester.  Sidan norsk sandkasse skal fungere allereie no i 2025, som er både tidlegare enn dei sentrale registra frå EU er ferdige, men også rettsleg vere uavhengig av innføring av eIDAS-lovverket i Norge gjennom EØS-prosessen, so vil Digdir tilby [eit norsk sandskasse-spesifikt tillitsrammeverk](lommebok_tillitsrammeverk) som må nyttast:

<table><tr><td><div class="mermaid">

graph
  TLI[(Register over utstedere)]
  TLW[(Register over lommbøker)]
  TLRP[(Register over brukerstads-registrarer)]
  DRPR[(Digdir brukerstad-register)]
  RPR[(Andre brukerstad-registre)]


TLRP --> DRPR
TLRP --> RPR
</div></td></tr>
<tr><td>
 <em>Digdir leverer tillitsrammeverk i sandskassen</em>
 </td>
</tr>
</table>

Sjølve kommunikasjonen mellom aktørane er dokumentert på eigne sider [for utstedelse](lommebok_protokoll_vci.html) eller [for bruk](lommebok_protokoll_vp.html). 