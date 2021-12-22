---
title: Sikkerhet
description: Sikkerhet
summary: "Om sikkerhet i ID-porten"

sidebar: saml_idporten_sidebar
product: ID-porten
---

Her er beskrivelse av krav til sertifikater, nøkler og algoritmer i forbindelse med ID-porten.

### Verifiserings av informasjon fra ID-porten

Tjenesteeier er selv ansvarlig for å verifisere all informasjon mottatt fra ID-porten. Dette innebærer f.eks. at tjenesteeier skal verifisere at ID-porten har autentisert sluttbruker på ønsket nivå etter at autentiseringen er gjennomført.

#### **Web Browser SSO-profil**

ID-porten støtter bade HTTP-POST og HTTP-ARTIFACT som transportbinding for response-meldinger fra ID-porten
Med HTTP Artifact skjer utvekslingen av IDP-ens (ID-portens) bekreftelse på gyldig innlogging i en bak-kanal, direkte mellom IDP-en og tjenesteeier (SP). Med HTTP POST utveksles bekreftelsen via nettleser, mao. via framkanal. LINK TIL VEDLEGG 7 for mer om metadataoppbyggingen

#### **Web Browser SSO-profil med HTTP Redirect (request) og artifact resolution over SOAP binding (reply)**
![](/images/idporten/saml/web_sso_soap.bmp "web sso over SOAP")

#### **Web Browser SSO-profil med HTTP Redirect (request) og POST binding**
![](/images/idporten/saml/web_sso_post.bmp "web sso over POST")

Forklaring: 
* Tjenesteleverandør bruker privat nøkkel til signering av AuthnRequest. ID-porten verifiserer signeringen ved hjelp av tjenesteleverandørs tilhørende sertifikat.
* ID-porten bruker privat nøkkel til signering av assertion i Response. Tjenesteleverandør verifiserer signaturen ved hjelp av ID-portens tilhørende sertifikat.
* Ved artifact binding hentes assertion over SSL/TLS-beskyttet bak-kanal som snakker SOAP direkte mellom den enkelte tjenesteleverandør og ID-porten. (figur 13)  
Ved POST-binding hentes assertion via nettleser, med andre ord via frontkanal. (figur 12)
* Tjenesteleverandør skal signere ArtifactResolve med sin private nøkkel. ID-porten skal med sin private nøkkel signere assertion i svaret som sendes over bak-kanalen. Det er også et krav om at ID-porten krypterer assertion, noe som gjøres med tjenesteleverandørs offentlige nøkkel, hentet fra tjenesteleverandørs sertifikat som enten kan utveksles på forhånd som metadata eller følge med tjenesteleverandørs signerte forespørsel.

#### **Single Logout**

![](/images/idporten/saml/slo.bmp "Single logout")

Forklaring:
1. Tjenesteleverandør sender LogoutRequest til ID-porten via frontkanal (HTTP redirect via User agent). Denne skal være signert med SPs private signeringsnøkkel.
2. ID-porten sender LogoutRequest til alle tjenesteleverandører som denne brukeren er pålogget. Disse meldingene signeres alle med ID-portens private signeringsnøkkel.
3. Alle tjenesteleverandører svarer på LogoutRequest med en LogoutResponse som signeres av den enkelte tjenesteleverandørs private signeringsnøkkel.
4. ID-porten svarer på initial LogoutRequest, med en LogoutResponse signert med ID-portens private signeringsnøkkel.

Ut fra dette kan følgende nøkkelbehov oppsummeres:

#### **ID-porten**

Av egne nøkler trenger denne:
* Et nøkkelpar for signering og kryptering av SAML-meldinger. Dette må være et virksomhetssertifikat (autentiseringssertifikat)
* Et nøkkelpar for etablering av SSL/TLS. (SSL-sertifikat)

Videre må tjenesteleverandør holde følgende nøkler for den enkelte tjenesteeier:
* En offentlig nøkkel for validering av signatur gjort av SP, og for kryptering av meldinger til den enkelte SP.


#### **Tjenesteeier**


Virksomhetssertifikatet skal som hovedregel være utstedt til tjenesteeier. Sertifikatet kan også være utstedt til tjenesteeiers leverandør. Det er tjenesteeier sitt valg om sertifikatene skal være utstedt til tjenesteleverandør.

### Meldingsbeskyttelse
Meldingsinnhold krypteres og signeres ihht [XMLSig] og [XMLEnc]. Kun følgende algoritmer og nøkkellengder er tillatt:
* Kryptering skal skje med AES med minimum 128 bits nøkler.
* Signeringsalgoritmer *MÅ* være SHA1with RSA med minimum 1024 bit modulo.
* Lengre nøkler er tillatt.

### Transportbeskyttelse 

*AuthnRequest*, *SingleLogoutRequest* og *SingleLogoutResponse* meldinger _skal_ bruke HTTPS over SSL (v3.0 eller høyere) eller TLS (v1.0 eller høyere) for å etablere en sikker kontekst mellom SP og brukerens nettleser. Tidligere versjoner av SSL kan tillates grunnet sterk bruk av meldingssikring.

Bak-kanal mellom SP og ID-porten _skal_ etableres v.h a. HTTPS over SSL (v3.0 eller høyere) eller TLS (v1.0 eller høyere). 

### Sertifikatkrav

Det kreves at tjenesteleverandør benytter nøkler utstedt som virksomhetssertifikater iht. [kravspesifikasjon PKI](https://www.difi.no/fagomrader-og-tjenester/digitalisering-og-samordning/standarder/referansekatalogen/bruk-av-pki-med-og-i-offentlig-sektor), og at sertifikatutstederen er selvdeklarert for dette hos Nasjonal kommunikasjonsmyndighet (NKOM). Pr dags dato er det bare Buypass og Commfides som er selvdeklarert for utstedelse av virksomhetssertifikater hos NKOM, og dermed kun disse som kan utstede gyldige virksomhetssertifikater for bruk mot ID-porten. 

Tjenesteleverandøre må sjekke at bare de virksomhetssertifikater som er utvekslet som en del av metadatautveksling er i bruk i føderasjonen.

Programvaren for SAML2-føderering må konfigureres slik at den godtar ID-porten-sertifikatene. ID-portens serversertifikat for SSL-kommunikasjon mellom tjenesteleverandørs server og ID-portens server ved SAML2 SOAP-kommunikasjon er utstedt av DigiCert. 

SAML2 HTTP Artifact og SAML2 SOAP bindingene må sikres med SSL både for SSO- og SLO-profilene. Det samme gjelder alle andre sider innenfor den sikre løsningen. Alle endepunkter hos tjenesteleverandør må derfor ha installert sertifikater på tjenersiden. 

>I testmiljø kan det brukes selvgenererte sertifikat, men dette vil ikke aksepteres i produksjon. 

| Miljø | Beskrivelse | Sertifikat | 
| --- | --- | --- |
| PROD | Produksjonsmiljø | Virksomhetssertifikat kreves | 
| VER1 | Test-miljø. Samme versjon som PROD | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| VER2 | Test-miljø. Kjører pre-releaser av kommende versjon | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| YT2 | Ytelsetest. Kjører pre-release av kommende versjon. Tilgang bestilles separat | Selvgenerert og (test)virksomhetssertifikat kan brukes | 
| | | | 

#### **Bestilling av virksomhetssertifikat**
Merk at sertifikatutstedere av virksomhetssertifikat har noe bestillingstid. Tjenesteleverandører oppfordres til å bestille sertifikat i god tid.

#### **Bruksområdet**
Sertifikatene brukt av tjenesteleverandør kan ikke ha bare bruksområdet *non repudiation (40) (ikke avvising (40)).*
Sertifikat med følgende bruksområde er testet og fungerer i ID-porten:

| Sertifikat leverandør | Bruksområdet |
| --- | --- |
| Buypass | Digital signatur (Autentiseringssertifikatet) | 
| Commfides | Digital signatur, nøkkelchiffrering, datachiffrering (b0) (Autentiseringssertifikatet) |
| | | 

#### **Buypass**
**Autentiseringssertifikatet** _skal_ benyttes. Dette har bruksområde: Digital signatur, nøkkelchiffrering, datachiffrering.
**Signeringssertifikate**t _skal_ikke_ benyttes. Dette har bruksområde: (ikke avvising(40))

Virksomhetssertifikat fra Buypass utstedes parvis med et nøkkelpar/sertifikat som en bruker for autentisering og kryptering(Autentiseringssertifikatet), og et nøkkelpar/sertifikat for signering (signeringssertifikatet).
Ved bestilling av virksomhetssertifikat fra Buypass blir det derfor levert to p12-filer:

![](/images/idporten/saml/buypass_censored.bmp "Buypass sertifikat")

#### **Commfides**

Denne dokumentasjonen gjelder når sertifikatet er utstedt av **"CPN Enterprise SHA256 CLASS 3"**

**Autentiseringssertifikatet** _skal_ benyttes. Dette har bruksområde: Digital signatur, nøkkelchiffrering, datachiffrering.
**Signeringssertifikate**t _skal_ikke_ benyttes. Dette har bruksområde: (ikke avvising(40))

Virksomhetssertifikat fra Commfides blir utstedt med tre nøkkelpar. 

Et nøkkelpar/sertifikat som benyttes for autentisering (autentiseringssertifikat), et nøkkelpar/sertifikat for kryptering (krypteringssertifikat) og et siste nøkkelpar/sertifikat for signering (signeringssertifikatet).

Ved bestilling av virksomhetssertifikat fra Commfides blir det derfor levert tre filer:
![](/images/idporten/saml/commfides_censored.bmp "Commfides sertifikat")

| Commfides sertifikat | Bruksområdet | 
| --- | --- |
| Autentiseringssertifikatet | Digital Signatur (80) |
| Krypteringssertifikatet | Nøkkel chiffering, datachiffrering, nøkkeloverensstemmelse (38) |
| Signeringssertifikatet | ikke-avvising (40) |
| | | 

### Håndtering av nøkler 

Det er sentralt for sikkerheten i løsningen at tjenesteleverandør planlegger og designer prosedyrer for god nøkkelhåndtering (Key management) for private nøkler. Hvis en privat nøkkel kompromitteres, kan en angriper utgi seg for å være tjenesteleverandør i dialogen med ID-porten og dekryptere persondata sendt fra ID-porten. Slike sikkerhetsbrudd vil formodentlig i særlig grad ramme tilliten til tjenesteleverandør, men kan også tenkes å svekke tilliten til hele føderasjonen.

Følgende punkter er det viktig at man tenker gjennom i forbindelse med nøkkelhåndtering:
* Hvor oppbevares private nøkler, og hvordan sikres adgang til dem? For optimal beskyttelse kan en nøkkel oppbevares i kryptografisk hardware (HSM – hardware security module), men ofte benyttes krypterte filer som et billig, men mindre sikkert alternativ.
* Hvordan håndteres backup av nøkler og hvordan gjenetableres disse ved behov?
* Hvilket personell har tilgang til servere med private nøkler, og hvem har eventuelt tilgang til passord som kan benyttes til å dekryptere nøklene slik at de opptrer i klartekst? Kan enkeltpersoner skaffe seg adgang til private nøkler? Ligger passord for tilgang til nøkkellager ubeskyttet i konfigurasjonsfiler?
* Hvordan håndteres fornyelse av nøkler når tilhørende sertifikater utløper? Hvis en tjenesteleverandør ikke fornyer nøkler/sertifikater innen de utløper, kan tjenester for tjenesteeier plutselig slutte å virke.
* Hva er prosedyren om en privat nøkkel kompromitteres, eller om det er mistanke om at så har skjedd?
* Hvordan loggføres nøkkelhåndteringsprosessen hos tjenesteleverandør? 

En tjenesteleverandør bør analysere disse problemstillingene nøye, og utarbeide passende driftsprosedyrer som implementerer organisasjonens IT sikkerhetspolitikk. 

Både [kravspesifikasjon PKI](https://www.difi.no/fagomrader-og-tjenester/digitalisering-og-samordning/standarder/referansekatalogen/bruk-av-pki-med-og-i-offentlig-sektor) og sertifikatutsteders policy kan gi krav som må etterleves. Krav til slike prosedyrer for håndtering av nøkler stilles også til IdP-delen av løsningen, som i dette tilfellet er ID-porten. 



