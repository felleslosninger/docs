---
title: Meldingsflyt  
permalink: dpi_meldingsflyt.html
sidebar: dpi_new_sidebar
---


**(dersom du ikke ser et sekvensdiagram under her, må du åpne dokumentet i noe som kan vise mermaid inline grafikk)**


<div class="mermaid">
sequenceDiagram
  participant A as Avsender
  participant F as Fagsystem
  participant MP as Maskinporten
  participant ELMA
  participant AA as Altinn Autorisasjon
  participant K as Kontaktregisteret

  participant C2 as Hjørne 2
  participant C3 as Hjørne 3
  participant PK as Postkasse-leverandør

  note over F: signeringssertikat (tilhører enten Avsender eller Databehandler)

  note over A, PK: Oppsett
  A->>MP: Digdir gir tilgang til Avsender
  A->>C2: Inngå avtale med aksesspunktleverandør
  C2->>ELMA: Hjørne 2 oppretter Avsender i ELMA
  A->>PK: Digdir forteller PK at ny Avsender er opprettet (manuell prosess)

  opt Dersom Avsender ønsker å bruke en leverandør/Databehandler
    A->>AA: Bemyndiget ansatt hos Avsender delegerer til Databehandler (valgfritt, asynkront)
  end
  note over A, PK: Runtime

  activate F
  F->>K: Forespør innbyggers postkasse
  activate K
  K-->>F: orgno pk-leverandør, krypteringssertifikat
  deactivate K
  F->>MP: Forespør token
  activate MP
  opt Dersom Fagsystem ikke tilhører Avsender
    MP->>AA: Sjekker om tilgang er delegert Databehandler
  end
  MP-->>F: maskinporten_token
  deactivate MP
  F->>C2: POST /messages/out (Forretningmelding og Dokumentpakke)
  activate C2
  C2->>C2: validere
  C2-->>F: 200 OK
  deactivate F
  C2->>ELMA: oppslag (meldingstype + orgno til postkasse)
  activate ELMA
  ELMA-->>C2: adresse til Hjørne 3
  deactivate ELMA

  C2->>C2: pakke om melding til PEPPOL-format
  C2->>C3: PEPPOL-melding over AS4
  activate C3
  C3-->>C2: akseptert
  deactivate C2
  C3->>PK: levere melding (bilateral protokoll)
  deactivate C3

  note over  PK: validere og putte i innbyggers postkasse

  note over PK,A: kvitteringer

  PK->>C3: kvittering til Avsender (bilateral protokoll)
  activate C3
  C3->>ELMA: oppslag (meldingstype=kvittering, orgno til avsender)
  ELMA-->>C3: adresse til hjørne 2

  C3->>C2: PEPPOL-melding over AS4
  activate C2
  C2-->>C3: akseptert
  deactivate C3
  F->>MP: Forespør token
  activate F
  activate MP
  opt Dersom Fagsystem ikke tilhører Avsender
    MP->>AA: Sjekker om tilgang er delegert Databehandler
  end
  MP-->>F: maskinporten_token
  deactivate MP
  F->>C2: poller på kvitteringer (GET /status/{conversationid} )
  deactivate C2
  deactivate F

</div>
