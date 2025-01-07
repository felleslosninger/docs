---
title: SAML
description: SAML-protokoll i ID-porten
summary: "ID-porten tilbyr forenklet støtte for SAML-protokollen"
sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_saml
---

## SAML i ID-porten

ID-porten begynte som en ren SAML-tjeneste i 2010. OIDC-grensesnittet ble innført i 2017, og ble raskt svært populært. ID-porten støtter kun OIDC, men vi tilbyr et forenklet SAML-grensesnitt for kunder som ikke kan benytte OIDC-grensesnittet.




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

|Miljø |IDP|Domene| |
|-|-|-|
|PROD|https://saml2.idporten.no/idp7|saml2.idporten.no||
|PROD|https://saml2.idporten.no/idp6|saml2.idporten.no||
|~~PROD~~|~~idporten.difi.no-v5~~|~~idporten.difi.no~~||
|TEST|https://saml2.test.idporten.no/idp6|saml2.test.idporten.no||
|TEST|https://saml2.test.idporten.no/idp5|saml2.test.idporten.no||
|~~TEST~~|~~idporten-ver2.difi.no-v4~~|~~idporten-ver2.difi.no~~||

### ID-porten sine metadata



### Metadata

|Miljø |IDP|Metadata|Gyldig til|
|-|-|-|
|PROD|https://saml2.idporten.no/idp7|[https://saml2.idporten.no/idp7](https://saml2.idporten.no/idp7) <br> Signert: [https://saml2.idporten.no/idp7?sign=true](https://saml2.idporten.no/idp7?sign=true)|01.01.2026 (SAML-tjenesten legges ned)|
|PROD|https://saml2.idporten.no/idp6|[https://saml2.idporten.no/idp6](https://saml2.idporten.no/idp6) <br> Signert: [https://saml2.idporten.no/idp6?sign=true](https://saml2.idporten.no/idp6?sign=true)|20.03.2025|
|~~PROD~~|~~idporten.difi.no-v5~~||
|TEST|https://saml2.test.idporten.no/idp6|[https://saml2.test.idporten.no/idp6](https://saml2.test.idporten.no/idp6) <br> Signert: [https://saml2.test.idporten.no/idp6?sign=true](https://saml2.test.idporten.no/idp6)|01.01.2026|
|TEST|https://saml2.test.idporten.no/idp5|[https://saml2.test.idporten.no/idp5](https://saml2.test.idporten.no/idp5) <br> Signert: [https://saml2.test.idporten.no/idp5?sign=true](https://saml2.test.idporten.no/idp5)|12.02.2025|
|~~TEST~~|~~idporten-ver2.difi.no-v4~~||


### Oversikt metadata

|Miljø|Metadata|
|produksjon|[https://saml2.idporten.no](https://saml2.idporten.no)|
|test|[https://saml2.test.idporten.no](https://saml2.test.idporten.no)|


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
