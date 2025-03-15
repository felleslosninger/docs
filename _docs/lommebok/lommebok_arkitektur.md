---
title: Arkitektur
description: Arkitektur

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_arkitektur
---

På denne sida forsøker me å forklare arkitekturen til lommeboka på eit høgnivå.

EU-kommisjonen publiserer ein [ein referansearkitektur](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/#3-eudi-wallet-ecosystem), den sokalla "ARF'en" som skildrar økosystemet og roller og prosessar som inngår.  Ein kan merke seg at ARFen formelt sett ikkje er eit juridisk bindande dokument, det er lova og rettsaktene (implementing acts) som er, og desse peiker i sin tur på vedtekne standardar frå ETSI, ISO og OpenID Foundation.  Men i praksis er det ARFen som bestemmer.



Lommebok-økosystemet er i stor grad inspirert frå av teknologi for desentralisert identitet og eigen-kontroll over data ved bruk av [Verifiable Credentials](https://en.wikipedia.org/wiki/Verifiable_credentials), som vist i figuren under. Omgrepa "Issuer, Holder, Verifier" kjem frå [W3C sin datamodell](https://www.w3.org/TR/vc-data-model/#roles)

<div class="mermaid">
graph LR
  direction LR
  I["Utstedar 
(issuer)"]
  H["Lomebok 
(holder)"]
  V["Brukerstad 
(verifier / relying party)"]

  I -. utsteder bevis til .-> H
  H -. presenterer bevis til .-> V
</div>






Her er eit aktør-diagram over sandkassen:

<div class="mermaid">
graph LR
  direction LR
  subgraph A [Aktørar]

  direction LR
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
  end



  F -. kjelde til personidentitet  .-> PID
  E -. kjelde til verksemdsidentitet .-> PID

  D -. kjelde til bevis .-> DI
  D -. kjelde til bevis .-> I

  U -. gjev bevis til .-> L

  L -. presenterer bevis mot .-> B


</div>


Me ser at 





subgraph T [Tillistrammeverk Digdir]
  TLI[(Register over utstedere)]
  TLW[(Register over lommbøker)]
  TLRP[(Register over brukerstads-registrarer)]
  DRPR[(Digdir brukerstad-register)]
  RPR[(Andre brukerstad-registre)]
end

TLRP --> DRPR
TLRP --> RPR
