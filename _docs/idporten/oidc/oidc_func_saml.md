---
title: SAML
description: SAML-protokoll i ID-porten
summary: "Nye ID-porten tilbyr en rudimentær støtte for SAML-protokollen"
sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_saml
---

## Om SAML i ID-porten

ID-porten begynte som en ren SAML-tjeneste i 2010. OIDC-grensesnittet ble innført i 2017, og ble raskt svært populært. Digdir ønsker at alle nye integrasjoner skal bruke OIDC, men vi har ved overgangen til ny platform og systemarkitektur 2023 valgt å tilby et begrensa SAML-grensesnitt for de som av en eller grunn ikke kan bytte fra SAML til OIDC med det første.

På et senere tidspunkt vil SAML bli faset ut fullstendig.


## SAML-arkitektur

ID-portens SAML-støtte er basert på en **SAML-proxy** som oversetter kundens SAML-meldinger til OIDC mot ID-porten, og vice versa.

<div class="mermaid">
graph LR
  subgraph Digitaliseringsdirektoratet
    IDP[ID-porten]
    SAML[SAML-proxy]
  end
  subgraph Kunde
     sp[SAML-tjeneste SP]
     rp[OIDC-tjeneste RP]
  end
  rp --  OIDC  --- IDP
  sp --  SAML2 ---SAML
  SAML -- OIDC ---IDP
</div>

For innlogging så mapper OIDC-protokollen sin *authorization code*-flyt svært bra mot SAML *Web Browser SSO med Artifact Resolution*-profil.

For utlogging er situasjonen dessverre mer ikke like enkel.

### Metadata

Vi tilbyr ikke SAML metadata-filer lenger.  Du må manuelt konfigurere opp
