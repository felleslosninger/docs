---
title: Detaljert beskrivelse av teknisk løsning
description: Detaljert beskrivelse av teknisk løsning
summary: "Detaljert beskrivelse av teknisk løsning"

sidebar: saml_idporten_sidebar
product: ID-porten
---

### Logging

ID-porten oppbevarer som standard alle logger i 12+1 måned. Logginformasjon om når sluttbruker inngikk samtykke er eneste informasjon i ID-porten som lagres lengre, i 10 år.

Det anbefales at tjenesteleverandør logger følgende informasjon om forsøk på autentisering: 
* Dato og tidspunkt 
* Hvilken handling som ble forsøkt 
* Resultatet av handlingen 
* Brukerens IP-adresse  
* SessionIndex 

FødselsnummerSessionIndex er en identifikator som identifiserer brukersesjonen på tvers av føderasjonen. ID-porten logger mer detaljert informasjon om hver brukersesjon enn det som er vår anbefaling til tjenesteleverandør. Tjenesteeier kan be om tilgang til denne med referanse til SessionIndex. Et eksempel på en SessionIndex er *“s295ce0f891244bf4a68e468368aaa923ead5f4301”*.  

Tjenesteeier sitt konkrete behov for logging må vurderes av den enkelte tjenesteeier.

### Sesjonshåndtering
 
ID-porten sender ikke en forespørsel om utlogging til tjenesteleverandør når en sesjon timer ut pga total lengde eller inaktivitet. Forespørsel om utlogging sendes bare når en bruker foretar en eksplisitt utlogging (ved å klikke på logout-knappen hos en tjenesteinnenfor Circle of Trust). En slik forespørsel om utlogging fra ID-porten **må** resultere i en utlogging fra tjenesteeier, ellers vil SingleLogout-mekanismen bli kompromittert. 
 
#### **Levetid for Sesjoner**
 
I føderasjon skal medlemmene konfigurere systemene, slik at sesjoner utløper ved inaktivitet etter høyst **30 minutter.**
 
I ID-porten måles maksimum sesjonstid for en brukers sesjon og denne settes til **120 minutter.**	

Det er valgfritt om timeout-perioden nullstilles hver gang brukerens nettleser forespør en av tjenesteleverandørs tjeneste, eller om den er uavhengig av brukeraktivitet (fast timeout periode).

Etter timeout hos en tjenesteleverandør, skal brukerens nettleser ved neste http-forespørsel sendes over til ID-porten med en autentiseringsforespørsel (SAML2 <AuthnRequest>).

Det må bemerkes at timeout hos en tjenesteleverandør ikke nødvendigvis medfører at brukeren blir tvunget til å logge på ID-porten. Hvis brukeren har en aktiv sesjon hos ID-porten, kan denne svare på forespørselen fra tjenesteleverandør uten brukerdialog (dvs. foreta single sign-on). Brukeren vil dermed ikke oppdage at sesjonen blir fornyet (bortsett fra at hans nettleser muligens ”blinker” et kort øyeblikk).

Hvis en tjenesteleverandør av sikkerhetsmessige grunner vil sikre seg at brukeren blir tvunget til aktiv pålogging i ID-porten, kan man sette parameteren 
[ForceAuthn=true i kallet til ID-porten.](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#forceauthn)

### Caching

Iht. Oasis sine anbefalinger er det ønskelig å holde levetiden for en SAML2-response (TTL) så lav som mulig. Dette for å hindre angrep av typen ”Man in the middle” (MITM), der en angriper kan stjele sesjonsdata og dermed sesjonen til en legitim bruker. Det anbefales derfor at tjenesteleverandør sjekker at et svar på en autentiseringsforespørsel mot ID-porten ikke er eldre enn 60 sekunder (målt i tid fra tidspunkt forespørselen ble sendt). Tilsvarende vil ID-porten selv sjekke at dette er oppfylt ved uthenting av assertion via artifact resolution profil over bak-kanal (da i forhold til tid opprinnelig AuthnRequest ble mottatt). Det er viktig at det implementeres støtte for en konfigurerbar verdi som kan angi levetiden for en artifact. Konfigurerbar slik at man kan justere tiden ettersom nye krav til løsningen medfører endrede behov knyttet til denne verdien. (Det er naturlig å tenke at sikkerhetskrav kan tvinge frem lavere verdier, mens hensyn til brukervennlighet vil tvinge frem økte verdier.) Disse hensyn må balanseres i dette valget.

HTTP proxy-servere og agenter må unnlate å cache SAML2-meldinger. OASIS foreslår følgende retningslinjer: 

Ved bruk av HTTP 1.1 (RFC2616) bør forespørrende part: 
* Inkludere et Cache-Control header felt satt til ”no-cache, no-store”. 
* Inkludere et Pragma header felt satt til ”no-cache”. 

Ved bruk av HTTP 1.1 bør respondenter: 
* Inkludere et Cache-Control header felt satt til ”no-cache, no-store, must-revalidate, private”. 
* Inkludere et Pragma header felt satt til ”no-cache” 
* Ikke inkludere Validator-felter som Last-Modified eller ETag header. 

I SAML2-sammenheng er forespørrende part og respondenter de entiteter som sender og mottar SAML2-meldinger.  

Leverandører av programvare som overholder SAML2-standarden, skal også overholde disse kravene. 

### Tidssynkronisering 

Bekreftelse på at en bruker er autentisert sendes fra ID-porten til tjenesteleverandør i form av en SAML2-assertion. En assertion inneholder tidsstempel som angir hvor lenge den er gyldig. Det er derfor viktig at alle servere som kommuniserer via SAML2 har synkroniserte klokker. ID-porten bruker NTP (”network time protocol”) for synkronisering, tidskilden er GPS-basert. Det er videre viktig at alle servere i CoT er justert korrekt for tidssone og sommertid. (CET / CEST i Norge). 

For mer informasjon om [Network Time Protocol.](http://no.wikipedia.org/wiki/Network_Time_Protocol)  

Tjenesteleverandør velger selv tidskilde, denne bør være lokalisert internt i datasenteret.

### Tegnsett 

All SAML2-kommunikasjon er basert på utveksling av xml-baserte meldinger. All SAML2-kommunikasjon krever derfor UTF-8 tegnsett. 

### Meldingsformat 

For HTTP Redirect bindingen må alle meldinger basert på SAML2-protokollen kodes med base64.

### IP-adresser som må åpnes for
* Produksjon: 146.192.252.60
* Verifikasjon 1: 146.192.252.124
* Verifikasjon 2: 146.192.252.156

