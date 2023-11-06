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

Overgangen til ny SAML-løsning skjer ved DNS-oppdatering men det blir mulig å teste tjenesten på nytt domene på forhånd.

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

SAML-proxy settes opp i produksjonsmiljø og testmiljø.  Eksisterende SAML2 IDP'er fra produksjon og VER2 videreføres i nye løsningen.  De kan brukes så lenge IDP'ens sertifikat er gyldig.  Nye IDP'er på nye domener settes også opp.  

|Miljø |IDP|Domene| 
|-|-|-|
|PROD|saml2.idporten.no-v6|saml2.idporten.no|
|PROD|idporten.difi.no-v5|idporten.difi.no|
|TEST|saml2.test.idporten.no-v5|saml2.test.idporten.no|
|TEST|idporten-ver2.difi.no-v4|idporten-ver2.difi.no|

### ID-porten sine metadata

Vi tilbyr ikke SAML metadata-filer for ID-porten lenger.  I en overgang kan eksisterende metadata for produksjon (v5) og VER (v4) benyttes.  ID-porten må manuelt settes opp for nye IDP'er i IAM-programvare.

For ny IDP i test gjelder følgende:

|parameter | verdi |
|-|-|
|Krypterinsgalgoritme| http://www.w3.org/2001/04/xmlenc#aes128-cbc |
|SingleSignOnService | https://saml2.test.idporten.no/login/idp5 |
|ArtifactResolutionService| https://saml2.test.idporten.no/artifactresolution/idp5 |
|SingleLogoutService | https://saml2.test.idporten.no/logout/idp5 |

Signerings- og krypteringssertifikat:

```
MIIFNjCCBB6gAwIBAgILBWKqdMrcsQATuVAwDQYJKoZIhvcNAQELBQAwUTELMAkG
A1UEBhMCTk8xHTAbBgNVBAoMFEJ1eXBhc3MgQVMtOTgzMTYzMzI3MSMwIQYDVQQD
DBpCdXlwYXNzIENsYXNzIDMgVGVzdDQgQ0EgMzAeFw0yMjAyMTExNTU1MTJaFw0y
NTAyMTEyMjU5MDBaMH0xCzAJBgNVBAYTAk5PMSQwIgYDVQQKDBtESUdJVEFMSVNF
UklOR1NESVJFS1RPUkFURVQxEDAOBgNVBAsMB0ZFTC1GTVQxIjAgBgNVBAMMGURp
Z2RpciBUZXN0IElELXBvcnRlbi9LUlIxEjAQBgNVBAUTCTk5MTgyNTgyNzCCASIw
DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANX2KsERotnkrLpjZ8+2kxYnrCFa
PzsmytIAxTwbnk/wxhj71v0qjO5tCqqp/vy1RzdoP6sozHNIdZ7MBKqOMqAIVJ0Z
GQCYoMoBKanwym/asITHsjX6H5UGqJo7IxVP5625I2v3EqxT7pURuxjFRAK8Ao7N
adBJZcow+/hcQOaZBzijiCkawEQC5jTu7FudE6zed6ET9t6QCTHjBpeSZ9GwtfZP
QrtgmKheoYGm6PV0Yzm+HFSnn1+0LBEFGtO98aj0IkHAX8vruGDPyEgTOWvP7aUx
S554ySd6g+nJo+y7ysznZUBMDxuQqr+bCO+jjw8SAouAt5ErU9jDECnERjMCAwEA
AaOCAeEwggHdMAkGA1UdEwQCMAAwHwYDVR0jBBgwFoAUP671eAuSo3AgNV9a+vck
oFIB8EEwHQYDVR0OBBYEFEucGYfKWYQ6DN1Rdd+7WW25KR3fMA4GA1UdDwEB/wQE
AwIEsDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwFgYDVR0gBA8wDTAL
BglghEIBGgEAAwIwgbsGA1UdHwSBszCBsDA3oDWgM4YxaHR0cDovL2NybC50ZXN0
NC5idXlwYXNzLm5vL2NybC9CUENsYXNzM1Q0Q0EzLmNybDB1oHOgcYZvbGRhcDov
L2xkYXAudGVzdDQuYnV5cGFzcy5uby9kYz1CdXlwYXNzLGRjPU5PLENOPUJ1eXBh
c3MlMjBDbGFzcyUyMDMlMjBUZXN0NCUyMENBJTIwMz9jZXJ0aWZpY2F0ZVJldm9j
YXRpb25MaXN0MIGKBggrBgEFBQcBAQR+MHwwOwYIKwYBBQUHMAGGL2h0dHA6Ly9v
Y3NwLnRlc3Q0LmJ1eXBhc3Mubm8vb2NzcC9CUENsYXNzM1Q0Q0EzMD0GCCsGAQUF
BzAChjFodHRwOi8vY3J0LnRlc3Q0LmJ1eXBhc3Mubm8vY3J0L0JQQ2xhc3MzVDRD
QTMuY2VyMA0GCSqGSIb3DQEBCwUAA4IBAQA5ETDKeklCnroUvuEfV7TWkzUWYemj
6fC8ueZ7DlGyrxEvdkn1Qg0oHVNyu36n7T2RaCXK+dWQrbcSQ/ce+4gGlnTNJmk7
baBGfI01blwF033yxTiMn0H5rblz/6XAHwUJpzA7QRCPujrWBGDzL7Nl8EzYdAyO
iaHy2gDAzF/wh6wwttYRvG+VriCLL5LdNlGfk2da4utTS3lPomiRywFZn0CHvakl
Y7MN92draSwrndlj9mPHyoM1eskgcJp/bTUwxVDCJ9HuS5ykridV/4ujmdpJC2EJ
p1jrXxBYMJvkD2oIjYYETXOfsl9vYrJQ2KKwiiUCql8FJXQVJ/xDizOp
```

For ny IDP i produksjon:

|parameter | verdi |
|-|-|
|Krypterinsgalgoritme| http://www.w3.org/2001/04/xmlenc#aes128-cbc |
|SingleSignOnService | https://saml2.idporten.no/login/idp6 |
|ArtifactResolutionService| https://saml2.idporten.no/artifactresolution/idp6 |
|SingleLogoutService | https://saml2.idporten.no/logout/idp6 |

Signerings- og krypteringssertifikat:

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

Metadata for aktive SAML-integrasjoner flyttes til ny SAML-løsning før DNS-bytte.

Vi støtter ikke opplastning av kunden sine metadata.  Du må manuelt sende oss

- entityid
- assertionconsumerURL
- logout-url
- public-nøkkel av virksomhetssertifikatet du bruker (samme sertifikat til både signering og kryptering)
