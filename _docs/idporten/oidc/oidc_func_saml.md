---
title: SAML
description: SAML-protokoll i ID-porten
summary: "Nye ID-porten tilbyr en forenklet støtte for SAML-protokollen"
sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_saml
---

## SAML i ID-porten

ID-porten ~begynte~ som en ren SAML-tjeneste i 2010. OIDC-grensesnittet ble innført i 2017, og ble raskt svært populært. ID-porten støtter kun OIDC, men vi tilbyr et forenklet SAML-grensesnitt for kunder som av en eller grunn ikke har kunnet gå over fra SAML til OIDC.




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

For innlogging mapper OIDC-protokollen sin *authorization code*-flyt svært bra mot SAML *Web Browser SSO med Artifact Resolution*-profil.

![Flyt SAML2-proxy](/images/idporten/saml/proxy-flow.svg)


## Miljøer for SAML-proxy

SAML-proxy er tilgjengelig produksjonsmiljøet og testmiljøet. [Oversikt over IP-adresser]({{site.baseurl}}/docs/general/IP)

|Miljø |IDP|Domene| 
|-|-|
|PROD|https://saml2.idporten.no/idp6|saml2.idporten.no|
|~PROD~|idporten.difi.no-v5~|~idporten.difi.no~|
|TEST|https://saml2.test.idporten.no/idp5~|saml2.test.idporten.no|
|~TEST~|~idporten-ver2.difi.no-v4~|~idporten-ver2.difi.no~|

### ID-porten sine metadata

I en overgangsperiode kan "gammel" metadata for produksjon (v5) og VER (v4) benyttes

### Metadata

|Miljø |IDP|Metadata| 
|-|-|
|PROD|https://saml2.idporten.no/idp6|[https://saml2.idporten.no/idp6](https://saml2.idporten.no/idp6)|
|~PROD~|idporten.difi.no-v5~||
|TEST|https://saml2.test.idporten.no/idp5|[https://saml2.test.idporten.no/idp5](https://saml2.test.idporten.no/idp5)|
|~TEST~|~idporten-ver2.difi.no-v4~||

### Kundens metadata (SP)

Oppdatering av kundes metadata er en manuel prosess hos Digdir. Metadata må sendes til servicdesk@digdir.no for endring. Vi trenger metadata med følgende innhold:

- entityid
- assertionconsumerURL
- logout-url
- public-nøkkel av virksomhetssertifikatet (samme sertifikat til både signering og kryptering)

### Begrensninger i SAML-proxy

SAML-proxy er ikke et fullverdig IAM-produkt, men enkel proxy foran OIDC-løsningen. SAML-proxyen har blant annet følgende begrensninger:

- Støtter bare ArtifactResolution (ikke HTTP-POST binding)​
- Kontaktinfo fra Kontakt- og reservasjonsregisteret kan ikke utleveres i Assertion
