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

For utlogging er situasjonen dessverre mer ikke like enkel, og endeling løsing er p.t. uavklart.

### ID-porten sine metadata

TODO:  DETTE AVSNITTET ER UNDER ARBEID


Vi tilbyr ikke SAML metadata-filer for ID-porten lenger.  Du må manuelt konfigurere opp støtte for ID-porten i din IAM-programvare.


|parameter | verdi |
|-|-|
|Krypterinsgalgoritme| http://www.w3.org/2001/04/xmlenc#aes128-cbc |

SAML proxy er allerede tilgjengelig på en annen URL enn gamle ID-porten:

|parameter | verdi |
|-|-|
|SingleSignOnService | https://saml.idporten.no/SSORedirect|
|ArtifactResolutionService| https://saml.idporten.no/ArtifactResolver |
|SingleLogoutService | https://saml.idporten.no/IDPSloRedirect|

Fra 26/9 blir gamle ID-porten flyttet til SAML-proxy:

|parameter | verdi |
|-|-|
|Krypterinsgalgoritme| http://www.w3.org/2001/04/xmlenc#aes128-cbc |
|ArtifactResolutionService| https://idporten.difi.no/opensso/ArtifactResolver/metaAlias/norge.no/idp5 |


ID-portens signerings- og krypteringssertifikat:
```
MIIFGDCCBACgAwIBAgILFJHOGTfuuaC8EVYwDQYJKoZIhvcNAQELBQAwSzELMAkG
A1UEBhMCTk8xHTAbBgNVBAoMFEJ1eXBhc3MgQVMtOTgzMTYzMzI3MR0wGwYDVQQD
DBRCdXlwYXNzIENsYXNzIDMgQ0EgMzAeFw0yMjAxMTEwOTQzMThaFw0yNTAzMjAy
MjU5MDBaMIGMMQswCQYDVQQGEwJOTzEkMCIGA1UECgwbRElHSVRBTElTRVJJTkdT
RElSRUtUT1JBVEVUMR0wGwYDVQQLDBRJRC1wb3J0ZW4gcHJvZHVrc2pvbjEkMCIG
A1UEAwwbRGlnaXRhbGlzZXJpbmdzZGlyZWt0b3JhdGV0MRIwEAYDVQQFEwk5OTE4
MjU4MjcwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDD3p4a4Wdrnvbo
CR8gW8babow0AWdgVuLUtc+m9o2mo0LgGB5wGsDl+kF6S2Bb0b/6KuEWHZfKS1bO
p2XLhRqNDiGi422stHNA2+rqEDLuiNJWgBPwEprO5ey6kpQZ/VEJiNLoP+RBBLXT
JIo8N7AJOKrgOAAj+R//JDqOltHYKWubR573AiaHBPExcXo9w7Nq0sG5dAKjwozM
Trvc3H26vDyMB8KbPKKAuWXSR4brVuW1J7ceWy6/oUnC+dyNk2Zjb/lTK/yyQWLc
ooVkRZYQ+OCccjmszDO2Iq6AFZg26pXfVwzaUftGv93qUXETU5eqhD76QA1bEYzL
Hhx7aIyjAgMBAAGjggG5MIIBtTAJBgNVHRMEAjAAMB8GA1UdIwQYMBaAFMzD+Ae3
nG16TvWnKx0F+bNHHJHRMB0GA1UdDgQWBBQQDrducRSDrlHVWsO5AJVKMFjUXTAO
BgNVHQ8BAf8EBAMCBLAwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUFBwMEMBUG
A1UdIAQOMAwwCgYIYIRCARoBAwIwgaUGA1UdHwSBnTCBmjAvoC2gK4YpaHR0cDov
L2NybC5idXlwYXNzLm5vL2NybC9CUENsYXNzM0NBMy5jcmwwZ6BloGOGYWxkYXA6
Ly9sZGFwLmJ1eXBhc3Mubm8vZGM9QnV5cGFzcyxkYz1OTyxDTj1CdXlwYXNzJTIw
Q2xhc3MlMjAzJTIwQ0ElMjAzP2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3QwegYI
KwYBBQUHAQEEbjBsMDMGCCsGAQUFBzABhidodHRwOi8vb2NzcC5idXlwYXNzLm5v
L29jc3AvQlBDbGFzczNDQTMwNQYIKwYBBQUHMAKGKWh0dHA6Ly9jcnQuYnV5cGFz
cy5uby9jcnQvQlBDbGFzczNDQTMuY2VyMA0GCSqGSIb3DQEBCwUAA4IBAQAt7jEr
+/8V/+g6ddF0aaIdeIrm5SvbvLXqbN4BwGSg1mOLkc78Qo4SBQ3zMVx1AQGWZcn+
VAK3ZXZbd3GOJWp4DtjW7Mv5YLQDlTpeXfaKytTBbGsP4SxmSf2ERMG30g1gcOIG
F1sQnSpainqBfSFht5o3gajyHLnoiA6ZNszhsVf5ZrrEFcramH13/QwKpsjM5aZB
EFEs+2JEqRhHre76s3u3PmvM6oldqG7zb6tSExhN1dhFm2mRoJWlg+u6uCBc6RKy
7JyrvHUxdXSOJrkG+nEGyPwjK3gTD0LxexlRtCpNOVYWQQPsDlHXyABZ3IUl+B5x
tIAY3kalpslFDj92
```

### Kunden sine metadata

Tilsvarende støtter vi ikke opplastning av kunden sine metadata.  Du må manuelt sende oss

- entityid
- assertionconsumerURL
- logout-url
- public-nøkkel av virksomhetssertifikatet du bruker (samme sertifikat til både signering og kryptering)
