---
title: SAML
description: SAML-protokoll i ID-porten
summary: "Nye ID-porten tilbyr en forenklet støtte for SAML-protokollen"
sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_saml
---

## Om SAML i ID-porten

ID-porten begynte som en ren SAML-tjeneste i 2010. OIDC-grensesnittet ble innført i 2017, og ble raskt svært populært. Digdir ønsker at alle nye integrasjoner skal bruke OIDC, men vi har ved overgangen til ny platform og systemarkitektur 2023 valgt å tilby et forenklet SAML-grensesnitt for kunder som av en eller grunn ikke kan bytte fra SAML til OIDC i migreringsfasen.

Overgangen til ny SAML-løsning skjer ved DNS-oppdatering. Det blir mulig å teste tjenesten på nytt domene på forhånd.

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


## Miljøer for SAML-proxy

SAML-proxy settes opp i produksjonsmiljø og testmiljø.  Eksisterende SAML2 IDP'er fra produksjon og VER2 videreføres i nye løsningen.  De kan brukes så lenge IDP'ens sertifikat er gyldig.  IDP'ene vil få nye IP-adresser.  Nye IDP'er på nye domener settes også opp.  Se oversikt over [IP-adresser]({{site.baseurl}}/docs/general/IP).

|Miljø |IDP|Domene| 
|-|-|
|PROD|https://saml2.idporten.no/idp6|saml2.idporten.no|
|PROD|idporten.difi.no-v5|idporten.difi.no|
|TEST|https://saml2.test.idporten.no/idp5|saml2.test.idporten.no|
|TEST|idporten-ver2.difi.no-v4|idporten-ver2.difi.no|

### ID-porten sine metadata

I en overgang kan eksisterende metadata for produksjon (v5) og VER (v4) benyttesfor gamle IDP'er.  Se [metadata for gamle ID-porten]({{site.baseurl}}/docs/idporten/saml/saml_metadata).  

Metadata kan lastes ned for nye IDP'er. (Produksjon er ennå ikke satt opp)

|Miljø |IDP|Metadata| 
|-|-|
|PROD|https://saml2.idporten.no/idp6|[https://saml2.idporten.no/idp6](https://saml2.idporten.no/idp6)|
|PROD|idporten.difi.no-v5||
|TEST|https://saml2.test.idporten.no/idp5|[https://saml2.test.idporten.no/idp5](https://saml2.test.idporten.no/idp5)|
|TEST|idporten-ver2.difi.no-v4||

### Kunden sine metadata

Metadata for aktive SAML-integrasjoner flyttes til ny SAML-løsning før DNS-bytte.

Vi støtter ikke opplastning av kunden sine metadata.  Du må manuelt sende oss

- entityid
- assertionconsumerURL
- logout-url
- public-nøkkel av virksomhetssertifikatet du bruker (samme sertifikat til både signering og kryptering)

### Begrensninger i SAML-proxy

Går frå fullverdig IAM-produkt til enkel proxy foran OIDC-løysinga

- Støttar berre ArtifactResolution (ikkje HTTP-POST binding)​
- Kontaktinfo vert ikkje lenger utlevert i Assertion
- Persistent NameID blir generert på nytt i ny løsning (nye verdier for brukerne)
- Persistent og transient NameID vil få like verdier
