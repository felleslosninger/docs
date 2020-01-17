---
title: Mer om metadata og SAML
description: Mer om metadata og SAML
summary: "Mer om metadata og SAML"
permalink: saml_metadata.html
sidebar: saml_idporten_sidebar
product: ID-porten
---

### Metadata validator og ID-porten sine metadatafiler

* [Denne validatoren anbefales for å sjekke metadata etter feil](https://test-vefa.difi.no/validator/)
* [Metadata for ID-porten produksjon (ny fra 07.01.2019)](https://samarbeid.difi.no/sites/samarbeid2/files/idporten.difi_.no-v4-prod.zip)
* [Metadata for ID-porten verifikasjon 1 (ny frå 15.03.2019) ](https://samarbeid.difi.no/sites/samarbeid2/files/idporten.difi_.no-v4-ver1_0.zip)
* [Metadata for ID-porten verifikasjon 2 (ny frå 15.03.2019) ](https://samarbeid.difi.no/sites/samarbeid2/files/idporten.difi_.no-v4-ver2-meta.zip)

### Eksempel på metadatafil

Her er eksempel på en metadatafil. Forklaring på hva som må være med, se [hurtigsjekk av metadata](https://difi.github.io/idporten-integrasjonsguide//91_metadata_og_mer_saml.html#hurtigsjekk-av-metadata) under eksempelet.
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
                </KeyDescriptor>
        <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idporten-sptest2.difi.no/testsp/logoutrequest" ResponseLocation="https://idporten-sptest2.difi.no/testsp/logoutresponseconsumer"/>
        <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</NameIDFormat>
        <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>
        <AssertionConsumerService index="1" isDefault="true" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact" Location="https://idporten-sptest2.difi.no/testsp/assertionconsumer"/>
    </SPSSODescriptor>
</EntityDescriptor>
```

### Hurtigsjekk av metadata

| Element | Attributt | Sjekkpunkt |
| --- | --- | --- |
| EntityDescriptor | entityID | Må være unik for alle ID-porten sine tjenesteeiere | 
| SPSSODescriptor | AuthnRequestsSigned=true | Denne må vere med og satt til *true*. Pass skrivefeil |
| SPSSODescriptor | WantAssertionsSigned=true | Denne må vere med og satt til *true*. Pass skrivefeil |
| SPSSODescriptor/KeyDescriptor | _må_ inneholde både KeyDescriptor use="signing" og "encryption" | Sjekk gyldig virksomhetssertifikat: sertifiseringsbane, emne, "bruk av nøkler", nøkkellengde og algoritme. | 
| SPSSODescriptor / SingleLogoutService | | Rekkefølge viktig - må komme før NameIDFormat, som må være før AssertionConsumerService |
| SPSSODescriptor / SingleLogoutService | Binding="..SAML:2.0 :...HTTP-Redirect" | HTTP-redirect er foretrukket. _SOAP_ er ikke støttet. HTTP-POST er _ikke_ støttet. SAML1:0-element er _ikke_ støttet. Kan ikke ha index | 
| SPSSODescriptor / SingleLogoutService | Location=.. / ResponseLocation | Må være sikret med HTTPS (gjelder spesielt i PROD) Skal ikke være en link, men streng | 
| SPSSODescriptor/ NameIDFormat | | Både transient og persistent er støttet, men anbefaler transient. |
| SPSSODescriptor/ AssertionConsumerService | Binding="..SAML: 2.0...HTTP-Artifact" eller HTTP-POST | Kun disse verdiene er støttet. | 
| | | | 

 **Eksempel AssertionConsumerService:**
``` xml
<AssertionConsumerService index="1" isDefault="true" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact" Location="https://localhost:9999/assertionconsumer"/>
```

**Eksempel SingleLogoutService:**
```xml
<SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://localhost:9999/logoutrequest" ResponseLocation="https://localhost:9999/logoutresponseconsumer"/>
```
### SAML-extension

ID-porten benytter seg av en ekstensjon *(extensions)* i *AuthnRequest* forespørselen med et eget xml navnerom som beskrevet i [SAML Core 2.0 spesifikasjon.](https://www.oasis-open.org/committees/download.php/35711/sstc-saml-core-errata-2.0-wd-06-diff.pdf) kapittel 3.2.1 og 7. 

Følgende skjema (XSD) er definert for ekstensjonen:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" version="1.0"
    targetNamespace="https://idporten.difi.no/idporten-extensions">

    <xs:element name="IDPortenExtensions">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="OnBehalfOf" type="xs:string" minOccurs="0" />
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

### Krav til sluttbruker av ID-porten

| Nettleser | Versjon | Operativsystem |
| --- | --- | --- |
| Internet Explorer | Alle hovedversjoner siste 12 mnd | Windows | 
| Mozilla Firefox | Alle hovedversjoner siste 12 mnd | Windows |
| Google Chrome | Alle hovedversjoner siste 12 mnd | Windows/Mac | 
| Opera | Alle hovedversjoner siste 12 mnd | Windows | 
| Safari | Alle hovedversjoner siste 12 mnd | Mac |
| | | | 

**Javascript**
Javascript er brukt i deler av løsningen og er nødvendig for å gjennomføre innlogging på nivå 4.

**Java runtime**
Sluttbruker må ha Java installert for å gjennomføre innlogging på nivå 4 med Commfides. 

### Administrasjon av egen informasjon

Offentlige virksomheter kan lenke til brukerprofilen slik at innbyggerne kan oppdatere egen kontaktinformasjon.

> Verifikasjon1: <https://brukerprofil-ver1.difi.no/minprofil>  
> Verifikasjon2: <https://brukerprofil-ver2.difi.no/minprofil>  
> Produksjon: <https://brukerprofil.difi.no/minprofil>


#### **Input data**

Tjenesten har følgende http request paramter som kan brukes: 

| Request parameter | Beskrivelse | 
| --- | --- |
| Goto | Lenke (URL) til tjeneste hos offentlig virksomhet som innbygger skal bli sendt tilbake til. |
| Showlogout | Boolean parameter for om innbygger skal bli vist utloggingslenke eller ikke.| 
| | | 

**Merk:**
* **Ingen av parameterne er påkrevd**
	- Dersom ingenting sendes inn, vil lenketjenesten lenke til Logg ut i ID-porten.
* Om man sender med en goto url som returnerer til en side som ikke krever at man er innlogget, bør også showlogout=true være satt.
* Parameteren må URLencodes.

### **Goto**
Eksempel på verdi: http://www.virksomhet.no/tjenesteforinnsendingsomjegvari 

Valideringsregler:
* Gyldig URL med protokoll
* All input skal være lowercase

Standardverdi:

Dersom parameteren ikke er satt, vil lenken gå til Logg ut i ID-porten, og innbygger vil få en informasjonsside om at hun er logget ut, uten videre lenker.

Goto-urlen må utveksles med Digitaliseringsdirektoratet for at lenketjenesten skal fungere. 

### **Showlogout**
Eksempel på verdi: false

Valideringsregler:
* Gyldige verdier: true/false
* Parametere er ikke case-sensitivt.

Standardverdi: false

Det vil si at innbygger vil bli presentert en knapp/lenke med verdien av goto-parameteret.

### SAML assertion for utenlandske brukere

Dette avsnittet er informativt, den normative og mest oppdaterte informasjonen finnes på [begrep difi](http://begrep.difi.no/ID-porten/SAMLAssertionV4)

Siden profilen støtter både norske og europeiske eID, vil tilgjengelige attributter kunne variere alt etter om det er norsk eller europeisk eID som ble benyttet til innlogging. For europeiske eID kan attributtane i tillegg variere mellom land. Viss attributten AuthMethod har verdi eIDAS, tyder dette at autentisering er foretatt med en europeisk eID, og attributten eIdentifier er da unik identifikator.

Følgende 3 grunnkombinasjoner er mulige:

|AuthMethod | eIdentifier | uid | Beskrivelse |
| --- | --- | --- | --- |
| eIDAS | NC/NC/xxxxxx.. | | Personen har autentisert seg med europeisk eID. Norsk D-nummer ble ikke funnet | 
| eIDAS | NC/NC/xxxxxx.. | personidentifikator | Personen har autentisert seg med europeisk eID og har norsk D-nummer. | 
| *norske eID* | | personidentifikator | Personen har autentisert seg med norsk eID | 
| | | | | 

**AuthMethod**

I tillegg til basisverdiene for norske eID kan AuthMethod også ha verdien:

| Kodeverdi | Beskrivelse | 
| --- | --- |
| eIDAS | Autentisering utført med europeisk eID |
| | | 

**Extended-fil**

Extended-fil trengs ikke sendes til Difi. Denne genererer vi selv basert på entity_ID som står i metadata som sendes til Difi.

**status-dsf**

status-dsf gjelder ID-portens integrasjonsstatus mot Det Sentrale Folkeregisteret (DSF).

| Kodeverdi | Beskrivelse |
| --- | --- |
| OK | ID-porten har som del av innlogging gjennomført en spørring mot DSF uten tekniske feil | 
| SYSTEMFEIL | ID-porten har ikke tilgang til informasjon fra Det Sentrale Folkeregisteret, f.eks. ved feil i integrasjon mot registrert. | 
| FLERETREFF | Oppslag mot DSF har resultert i flere mulige treff, og ID-porten kan ikke gjøre en garantert kobling mellom utenlandsk eID og D-nummer i DSF | 
| IKKESJEKKET | ID-porten mangler tilstrekkelig informasjon til å kunne gjøre en spørring mot DSF, for eksempel hvis navn eller fødselsdato mangler på utenlandsk bruker
| | |

**status**

status gjelder personens status i Kontakt- og Reservasjonsregisteret, og kan ha følgende verdi:

| Kodeverdi | Beskrivelse |
| --- | --- |
| AKTIV | Person finnes i Kontakt- og Reservasjonsregisteret | 
| IKKE_REGISTRERT | Person finnes ikke i Kontakt- og Reservasjonsregisteret, enten ikke registrert eller slettet | 
| SYSTEMFEIL | ID-porten har ikke tilgang til informasjon fra Kontakt- og Reservasjonsregisteret, f.eks. ved feil i integrasjon mot registrert. | 
| | | 

Ved autentisering med europeisk eID, er det frivillig for personer som har fått tildelt norsk D-nummer/fødselsnummer å oppgi kontaktopplysninger til Kontakt- og reservasjonsregisteret. Personer som ikke har fått tildet norsk D-nummer/fødselsnummer, har ikke mulighet til å oppgi kontaktopplysninger.

For utenlandske innbyggere, blir Kontakt- og reservasjonsregisteret kun sjekket dersom det er oppnådd en entydig kobling mot norsk D-nummer/fødselsnummer. Dette kan skje ved manglende kobling eller ved feilsituasjoner mot DSF. Informasjon fra Kontakt-og reservasjonsregisteret vil da mangle.

I tillegg kommer eventuelle attributter fra europeisk eID-intrastruktur, eIDAS / STORK (se nærmere definisjoner i rapport ‘D5.7.3 Functional Design for PEPS, MW models and interoperability’) fra 
[STORK-prosjektet](https://www.eid-stork.eu/index.php?option=com_processes&act=list_documents&id=312%20&s=1&Itemid=60)

| Field | Type | Values and comment | Kardinalitet | 
| --- | --- | --- | --- |
| eidas-eIdentifier | String | NC/NC/xxxxxxxxxx…. (NC=NationalityCode, the first one the country of origin of the eIdentifier, the second one the destination country)| 1 | 
| eidas-givenName | String | | 0..1 |
| eidas-surname | String | inheritedFamilyName / adoptedFamilyName | 0..1 | 
| eidas-inheritedFamilyName | String | | 0..1 | 
| eidas-adoptedFamilyName | String | | 0..1 |
| eidas-gender | String(1) | F(Female) / M(Male) | 0..1 | 
| eidas-nationalityCode | String(2) | ISO 3166-1 alpha-2 | 0..1 | 
| eidas-maritalStatus | String(1) | S (Single) / M (Married) / P (Separated) D (Divorced) / W (Widowed) | 0..1 |
| eidas-dateOfBirth | Date(basic format of ISO 8601) | YYYYMMDD / YYYYMM / YYYY | 0..1 | 
| eidas-countryCodeOfBirth | String(4) | ISO 3166-3. Please note that this code is equal to ISO3166-1 alpha-2 in the majority of countries, but includes 4 letter abbreviations for disappeared countries. E.g. DDDE for the DDR or YGCS for Yugoslavia. | 0..1 | 
| eidas-age | Number | in years(0..130) | 0..1 | 
| eidas-isAgeOver | Boolean | Logically this is boolean, in technical design another domain may be chosen | 0..1 | 
| eidas-textResidenceAddress | Text | | 0..1 | 
| eidas-canonicalResidenceAddress | XML | | 0..1 |
| eidas-residencePermit | String | | 0..1 |
| eidas-eMail | String | RFC 822 | 0..1 |
| eidas-title | Text | | 0..1 |
| eidas-pseudonym | String | | 0..1 |
| eidas-signedDoc | | | 0..1 | 
| eidas-CitizenQAAlevel | Number | 1,2,3,4 | 0..1 | 
| eidas-fiscalNumber | | String | 0..1 | 
| | | | | 

Vær oppmerksom på at noen land kan sende med ekstra attributter utover de som finst i eIDAS-standarden. Disse vil bli prefixet med “eidas-landskode-”, og så videreformidlet av ID-porten.

