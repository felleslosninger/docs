---
title: Teknisk - innlogging
description: teknisk innlogging for ID-porten
summary: "teknisk innlogging for ID-porten"
permalink: saml_teknisk_innlogging.html
sidebar: saml_idporten_sidebar
product: ID-porten
---

## Introduksjon

Her beskrives tekniske detaljer omkring innloggingsfunksjonene i ID-porten.

### Krav til validering

Tjenesteleverandør *må* verifisere alle returverdier fra ID-porten.

Blant annet må det sikres og valideres at ID-porten har autentisert sluttbruker på ønsket sikkerhetsnivå.

### AuthnRequest 

Lokalisering av ID-porten _må_ gjøres i forbindelse med dette steget. SAML2-profilen sier at metadata kan benyttes til dette, men ID-porten krever at tjenesteleverandør må benytte data utvekslet som en del av metadata for å identifisere ID-porten.

I denne profilen må forespørselen signeres. Signaturen plasseres i signaturforespørselstrengen beskrevet for denne bindingen, og ikke i selve XML-meldingen, slik:

```xml
SAMLRequest=<req>&SigAlg=<alg>&Signature=<SIGNATUR>
```
Merk at kun RSA-SHA1 er støttet.
#### **RequestedAuthnContext**

Tjenesteleverandør _kan_ benytte *RequestedAuthnContext* til å angi ønsket sikkerhetsnivå. Dette skjer på følgende måte:
* Comparison-feltet settes til minimum da tjenesteleverandør kun skal angi laveste sikkerhetsnivå og ikke tillates å spesifisere eksakt nivå.
* Ulike AuthnContextClassRef defineres til å tilhøre ulike sikkerhetsnivå, og ved å oppgi en spesiell slik klasse, sier tjenesteleverandør hvilket sikkerhetsnivå som er minimum. Tabellen under definerer sikkerhetsnivå for ulike klasser som er støttet i ID-porten.

| Nivå | AuthnContextClassRef |
| --- | --- |
| 3 | urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport | 
| 4 | urn:oasis:names:tc:SAML:2.0:ac:classes:SmartcardPKI | 
| | | 

Eksempel på en forespørsel (del av) som *minimum* krever nivå 3 autentisering:

```xml
<samlp:RequestedAuthnContext xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" Comparison="minimum">
     <saml:AuthnContextClassRef xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
            urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
     </saml:AuthnContextClassRef>
</samlp:RequestedAuthnContext>
```

ID-porten vil tolke alle forespørsler til *minimum* og at *AuthnContextClassRef* er *urn:oasis:names:tc:SAML:2.0:ac:classes:Unspecified* om RequestedAuthnContext ikke er inkludert i *AuthnRequest*.

#### **NameID** 

Det anbefales at tjenesteleverandør setter *NameID* til *transient*. ID-porten støtter både *transient* og *persistent*. Se eventuelt [Detaljert beskrivelse av støttede SAML2-profiler](90_detaljert_beskrivelse_stotta_saml2-profiler) for mer informasjon.

#### **ForceAuthn**

Tjenesteleverandør _kan_ benytte ForceAuth for å angi at sluttbruker alltid skal autentisere seg i ID-porten selv om sluttbruker har en eksisterende SSO-sesjon. Dette kan brukes for å reautentisere sluttbruker.

Eksempel på en forespørsel (del av) som krever (re)autentisering:

```xml
<saml2p:AuthnRequest
    AssertionConsumerServiceURL="https://idporten-sptest2.difi.no/testsp/assertionconsumer"
    Destination="https://idporten-test1.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp"
    ForceAuthn="true" 
```

### Locale

Ved å legge til parameteren \<locale> på requesten som inneholder SAMLRequest, kan tjenesteleverandør styre språkformen ID-porten presenterer for bruker. Locale må angis som ISO 639-1 kode.

ID-porten støtter følgende språk: 

| Språk | Språkkode | 
| --- | --- |
| Bokmål | nb | 
| Nynorsk | nn |
| Samisk | se | 
| Engelsk | en | 
| | | 

I de tilfeller der tjenesteleverandør ikke sender over språkvalg, vil ID-porten benytte språket som er satt i nettleseren. Er nettleseren innstilt på et språk som ID-porten ikke støtter, vil ID-porten velge standardspråket bokmål.

ID-porten sender over språket som er brukt ved innlogging i [assertion til tjenesteleverandør](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#artifactresponse)

Her er et eksempel på hvordan en forespørsel med språk ser ut: 
```xml
https://idporten-inttest.difi.local/opensso/SSORedirect/metaAlias/norge.no/idp?SAMLRequest=<KRYPTERT SAML2 REQUEST> &SigAlg=<alg>&Signature=<SIGNATUR>&locale=nb
```

### Overføring av informasjon om tjenesteeier for leverandører

Kun i de tilfeller der tjenesteleverandør leverer tjenester til flere tjenesteeiere under en og samme føderasjon, må tjenesteleverandør sende med informasjon om den spesifikke tjenesteeier i AuthnRequest. Dette gjøres ved å bruke extensions *idpe:OnBehalfOf:* ID og navnekonvensjon blir satt i samråd med Difi. I AuthnRequesten må denne extension komme *før* "NameIDPolicy Format".

```xml
<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ...>
    <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">TJENESTELEVERANDOR</saml:Issuer>
    ...
    <samlp:Extensions xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol">
        <idpe:OnBehalfOf xmlns:idpe="https://idporten.difi.no/idporten-extensions">TJENESTEEIER</idpe:OnBehalfOf>
    </samlp:Extensions>
    ...
</samlp:AuthnRequest>
```

### Autentisering av sluttbruker 

ID-porten sjekker om brukeren har en gyldig sesjon mot ID-porten. Hvis ikke, bes brukeren om å autentisere seg. Om brukeren allerede har en gyldig sesjon mot ID-porten, må brukeren reautentiseres dersom:
* Tjenesteleverandør krever reautentisering gjennom å sette ForceAuthn-attributtet i forespørselen til ”true”. 
* Brukeren er innlogget på et lavere sikkerhetsnivå enn den inneværende tjenesteforespørsel krever. I så tilfelle vil ID-porten foreta en reautentisering av brukeren med en e-ID som minimum er på korrekt sikkerhetsnivå.

### AuthnResponse

Når ID-porten skal lokalisere tjenesteleverandør for å kunne besvare forespørselen, så gjøres dette ved å benytte data utvekslet som en del av metadata.

Artifact returneres ved hjelp av HTTP-redirect. Artifact legges i en parameter med navn SAMLart i URL’en. 

HTTP-utveksling over frontkanal skjer over (enveis) SSL/TLS for å understøtte konfidensialitet i meldingene.

Responsmeldingen over frontkanal behøver ikke å være signert. 

Om ID-porten mottar en forespørsel fra en tjenesteleverandør som den ikke har inngått avtale med, så vil forespørselen avvises uten å gi en tilbakemelding til tjenesteleverandør. 

#### **Etablering av bak-kanal**

Bak-kanal benyttes til artifact resolution og til meldinger i forbindelse med single logout. Meldinger over bak-kanal sendes over etablerte HTTPS-kanaler.
 
Artifact resolution-kanal etableres alltid initiert fra tjenesteleverandør. Tjenesteleverandør kan av ytelsesmessige hensyn velge å la en etablert HTTPS-kanal bli stående oppe, slik at reetablering av kanalen ikke er nødvendig ved neste melding. Det er tjenesteleverandør sitt ansvar å sørge for at kanalen er oppe, og denne skal håndtere nødvendig reetablering i feilsituasjoner.

Når det gjelder bak-kanal for SLO, så er det ID-porten som er ansvarlig for å etablere denne. 

#### **ArtifactResolve**

* ArtifactResolve-melding fra tjenesteleverandør skal signeres. 
* ArtifactResolve-melding skal inneholde en og bare en *artifact* verdi.

#### **ArtifactResponse**

Begrepene og dataene i ArtifactResponsen er beskrevet i begrepskatalogen på [begrep.difi.no](https://begrep.difi.no/)

ID-porten tilbyr fire ulike Assertion-profiler:

| Profilnavn | Beskrivelse | 
| --- | --- |
| SAMLAssertionV1 | Standard profil | 
| SAMLAssertionV2 | **FORELDET**, kun tilgjengelig for å være bakoverkompatibel | 
| SAMLAssertionV3 | Utvidet profil med informasjon fra kontakt og reservasjonsregisteret | 
| SAMLAssertionV4 | Utvidet profil som i tillegg til norske eID støtter autentisering med europeisk eID. | 
| | | 

Følgende attributter legges ved i assertion: 

| Attributt | Beskrivelse | Kommentar | 
| --- | --- | --- |
| uid | Fødselsnummer | | 
| SecurityLevel | sikkerhetsnivå | |
| Culture | Språk | | 
| AuthMethod | Autentiseringsmetode | Gyldige verdier i AuthMethod er [beskrevet her](http://begrep.difi.no/ID-porten/SAMLAssertionV1#AuthMethod) |
| OnBehalfOf | EntityID for tjenesteeier | Om verdi er mottatt i forespørsel fra tjenesteleverandør | 
| epostadresse | [epostadresse](http://begrep.difi.no/Felles/epostadresse) | Kun tilgjengelig for tjenesteleverandører som har tatt i bruk kontakt- og reservasjonsregisteret | 
| mobiltelefonnummer | [mobiltelefonnummer](http://begrep.difi.no/Felles/mobiltelefonnummer) | Kun tilgjengeleg for tjenesteleverandører som har tatt i bruk kontakt- og reservasjonsregisteret | 
| reservasjon | [reservasjon](http://begrep.difi.no/Felles/reservasjon) | Kun tilgjengeleg for tjenesteleverandører som har tatt i bruk kontakt- og reservasjonsregisteret |
| status | [status](http://begrep.difi.no/Felles/status) | Kun tilgjengelig for tjenesteleverandører som har tatt i bruk kontakt- og reservasjonsregisteret. Gyldige verdier i status er [dokumentert her](http://begrep.difi.no/ID-porten/SAMLAssertionV3)
| | | | 

#### **AuthnContextClassRef som informasjonsbærer om sikkerhetsnivå**

Assertion vil alltid inneholde informasjon om sikkerhetsnivå benyttet under autentisering. Til dette benyttes AuthnContextClassRef på samme måte som i autentiseringsforespørselen. Se [tabell knyttet til autentiseringsforespørsel](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#requestedauthncontext) for spesifisering av gyldige klasser støttet i ID-porten og deres tilhørende autentiseringsnivå. 


