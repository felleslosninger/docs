---
title: Hurtigguide teknisk integrasjon
description: Hurtigguide
summary: "Hurtigguide teknisk integrasjon"
permalink: saml_hurtigguide.html
sidebar: saml_idporten_sidebar
product: ID-porten
---

## HURTIGGUIDE: Teknisk Integrasjon

### Typisk saksgang for en integrasjon
![](/images/idporten/saml/hurtigguide/saksgang.bmp "saksgangs for en integrasjon")

### Hva må utveksles?
![](/images/idporten/saml/hurtigguide/nyutveksling.PNG "hva må utveksles")

### ID-porten støtter ikke alt i SAML2-standarden

Metadata definerer hva som er tillatt 

![](/images/idporten/saml/hurtigguide/nystotte.PNG "ID-porten støtter ikke salt i SAML2-standarden")

### Typisk metadata-fil

Her er eksempel på en metadatafil. Forklaring på hva som må være med, se [hurtigsjekk av metadata](https://difi.github.io/idporten-integrasjonsguide//91_metadata_og_mer_saml.html#hurtigsjekk-av-metadata)
```xml
<EntityDescriptor entityID="testsp2" xmlns="urn:oasis:names:tc:SAML:2.0:metadata">
    <SPSSODescriptor AuthnRequestsSigned="true" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
				<ds:X509Certificate>MIICTzCCAbigAwIBAgIETh17DjANBgkqhkiG9w0BAQUFADBsMQswCQYDVQQGEwJOTzEZMBcGA1UECBMQU29nbiBvZyBGam9yZGFuZTESMBAGA1UEBxMJTGVpa2FuZ2VyMQ0wCwYDVQQKEwREaWZpMQwwCgYDVQQLEwNVRkkxETAPBgNVBAMTCEpvaG4gRG9lMB4XDTExMDcxMzExMDEzNFoXDTIxMDcxMDExMDEzNFowbDELMAkGA1UEBhMCTk8xGTAXBgNVBAgTEFNvZ24gb2cgRmpvcmRhbmUxEjAQBgNVBAcTCUxlaWthbmdlcjENMAsGA1UEChMERGlmaTEMMAoGA1UECxMDVUZJMREwDwYDVQQDEwhKb2huIERvZTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAmSSMKo2IDBtwwvpj0Np+LB0as5mOjBw2e1AzTxvTg3RB3iNxZ7WEOw+zh/2G7RXpCVg4Z3QobdS0yAmr4a+taTbVtjJES88wMxx/PDltrCDI2bB8dfi6aQhEW/MarOI+Y27DUDTcCvC/8fjGJriNgtjoN3g2Jsn68zJ1kyxTHMMCAwEAATANBgkqhkiG9w0BAQUFAAOBgQAgkYRXIHX1ysCwlk78X0/hT121p6reP6jJkgyXm/zvRtTsptfkP1GKGmZ99N7PxWli6IGG7MchfBPGVI9pLKcJDGZotPakIS276JIZle1xHgXnLW2SFnzPjIMPX0zHLI0trbr54e72Rp1CKylgkrTzvzpbcSwRC7cECod4o50hIw==</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </KeyDescriptor>
        <KeyDescriptor use="encryption">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                    <ds:X509Certificate>MIICTzCCAbigAwIBAgIETh17DjANBgkqhkiG9w0BAQUFADBsMQswCQYDVQQGEwJOTzEZMBcGA1UECBMQU29nbiBvZyBGam9yZGFuZTESMBAGA1UEBxMJTGVpa2FuZ2VyMQ0wCwYDVQQKEwREaWZpMQwwCgYDVQQLEwNVRkkxETAPBgNVBAMTCEpvaG4gRG9lMB4XDTExMDcxMzExMDEzNFoXDTIxMDcxMDExMDEzNFowbDELMAkGA1UEBhMCTk8xGTAXBgNVBAgTEFNvZ24gb2cgRmpvcmRhbmUxEjAQBgNVBAcTCUxlaWthbmdlcjENMAsGA1UEChMERGlmaTEMMAoGA1UECxMDVUZJMREwDwYDVQQDEwhKb2huIERvZTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAmSSMKo2IDBtwwvpj0Np+LB0as5mOjBw2e1AzTxvTg3RB3iNxZ7WEOw+zh/2G7RXpCVg4Z3QobdS0yAmr4a+taTbVtjJES88wMxx/PDltrCDI2bB8dfi6aQhEW/MarOI+Y27DUDTcCvC/8fjGJriNgtjoN3g2Jsn68zJ1kyxTHMMCAwEAATANBgkqhkiG9w0BAQUFAAOBgQAgkYRXIHX1ysCwlk78X0/hT121p6reP6jJkgyXm/zvRtTsptfkP1GKGmZ99N7PxWli6IGG7MchfBPGVI9pLKcJDGZotPakIS276JIZle1xHgXnLW2SFnzPjIMPX0zHLI0trbr54e72Rp1CKylgkrTzvzpbcSwRC7cECod4o50hIw==</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
            <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc">
                <xenc:KeySize xmlns:xenc="http://www.w3.org/2001/04/xmlenc#">128</xenc:KeySize>
                        </EncryptionMethod>
                </KeyDescriptor>
        <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idporten-sptest2.difi.no/testsp/logoutrequest" ResponseLocation="https://idporten-sptest2.difi.no/testsp/logoutresponseconsumer"/>
        <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</NameIDFormat>
        <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>
        <AssertionConsumerService index="1" isDefault="true" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact" Location="https://idporten-sptest2.difi.no/testsp/assertionconsumer"/>
    </SPSSODescriptor>
</EntityDescriptor>
```

### Verifikasjonstester

* Sikre at tjenesten fungerer
* Verifisere sikkerhetsnivå
	- Viktig for nivå-4-tjenester
* Sikre at andre ikke blir negativt berørt av din tjenesten
	- Single sign-on
	- Single logout

![](/images/idporten/saml/hurtigguide/slo_test.bmp "single log-out test")

### Test-klient

[Test-klient er tilgjengelig her](https://idporten-sptest2.difi.no/testsp/)

Kan brukes i verifikasjonstesten som «annen tjenesteier» ifbm single sign-on

![](/images/idporten/saml/hurtigguide/testsp.bmp "ID-porten test-klient")

Kildekode kan [lastes ned her](../resources/testsp_javacode.zip)


### Ulike miljø

| Miljø | Beskrivelse | Sertifikat | 
| --- | --- | --- |
| PROD | Produksjonsmiljø | Virksomhetssertifikat kreves | 
| VER1 | Test-miljø. Samme versjon som PROD | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| VER2 | Test-miljø. Kjører pre-releaser av kommende versjon | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| YT1 | Ytelsetest. Samme versjon som PROD. Tilgang bestilles separat | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| YT2 | Ytelsetest. Kjører pre-release av kommende versjon. Tilgang bestilles separat | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| | | |  

### Testbrukere 

> NB! Kun for VER1 og VER2  
> NB! Testbrukere tillates ikke i PROD

| eID | Rutine | 
| --- | --- | 
| MinID | Digitaliseringsdirektoratet oppretter | 
| BankID | Digitaliseringsdirektoratet kan bestille for tjenesteeier ( ikke bankID for mobil ) | 
| Buypass | Tjenesteeier må direkte kontakt | 
| Commfides | Tjenesteeier må ta direkte kontakt | 
| | | 

### ID-porten single sign-on 

![](/idporten-integrasjonsguide/assets/images/hurtigguide/sso.bmp "ID-porten single sign-on")

1. Sluttbruker ønsker tilgang til en tjeneste hos tjenesteeier som krever at bruker er autentisert
2. Tjenesteeier verifiserer om sluttbruker har en autentiseringssesjon lokalt, 
3. Tjenesteeier oppretter en autentiseringsforespørsel (AuthnRequest) som sendes til ID-porten
	- Hvis bruker er innlogget hos annen tjeneste, gå til pkt. 6.
4. ID-porten gjennomfører innlogging med sluttbruker med valgt eID på tilfredstillende sikkerhetsnivå
5. Som over
6. ID-porten svarer på autentiseringsforespørselen til tjenesteeier
	- AuthnRespons inneholdende Artifact
7. Tjenesteeier sender en personopplysningsforespørsel til ID-porten 
	- ArtifactResolve inneholdend Artifact
8. ID-porten leverer ut personopplysninger om sluttbruker,
	- ArtifactResponse inneholdende Assertion
9. Tjenesteeier opprette en lokal autentiseringssesjon for sluttbruker og sender bruker til ønsket tjeneste


### ID-porten single logout

![](/images/idporten/saml/hurtigguide/idp_slo.bmp "ID-porten single logout")

1. Bruker ber om utlogging
2. Tjenesteeier sender LogoutRequest til ID-porten via frontkanal 
3. ID-porten sender LogoutRequest til annen tjenesteeier som denne bruker er pålogget.
4. Annen tjenesteeier svarer med en LogoutResponse.
	- Viss flere: gjenta 3 og 4
5. ID-porten svarer på initiell LogoutRequest, med en LogoutResponse

Hvis én tjenesteeier bryter kjeden, vil brukeren fremdeles være innlogget i ID-porten 


### Tjenesteeier logo 

* Logofilen må kunne vises direkte i en nettleser. 
	 - Dette innebærer at formatet skal være .png, .jpg eller .gif. 
* Maks høgde på logo er 90px. og bredde bør ikkje være meir enn 135px.
* Bakgrunnsfargen på idporten sidene er #f3f4f4, så tjenesteeigarane bør enten ha denne fargen som bakgrunn på sin logo eller ha bakgrunnen transparent. 

![](/images/idporten/saml/hurtigguide/eid_selektor.bmp "eid selektor")

