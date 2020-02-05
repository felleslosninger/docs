---
title: Overordnet arkitekturbeskrivelse
description:
summary:
permalink: idporten_overordnet.html
sidebar: oidc
product: ID-porten
---

## Introduksjon

Denne siden gir en oversikt over de funksjoner som ID-porten tilbyr som tjenesteleverandør.

![](/idporten-integrasjonsguide/assets/images/funksjonelt_gammal.bmp "minId_tjenester")

ID-porten tilbyr følgende funksjonalitet
- **autentisering av sluttbrukere**
- **API-sikring**

## Aktører

Dette kapittelet beskriver roller og ansvar knyttet til den tekniske integrasjonen mot ID-porten. Kapittelet er et tillegg til bruksvilkårene som i større grad omhandler det avtalemessige mellom Digitaliseringsdirektoratet og tjenesteeierne.

| Aktører | Beskrivelse |
| --- | --- |
| Sluttbruker | Innbygger med eID |
| ID-porten | *ID-porten* er et tillitsanker for offentlige virksomheter. ID-porten knytter de offentlige virksomhetene og e-ID-leverandørene sammen. |
| Tjenesteeier | Offentlig virksomhet som har akseptert bruksvilkår |
| Tjenesteleverandør | Leverandør som leverer tjenester til en offentlig virksomhet. Eller tjenesteeier som forvalter egen løsning |
| Kontakt- og reservasjonsregisteret | Felleskomponent for sentral ajourhold av digital kontaktinformasjon (e-postadresse og mobilnummer) i offentlig sektor.  |
| e-ID-leverandør | En av de 4 e-ID-aktørene som er tilgjengelige i ID-porten: minID, Commfides, Buypass, BankID |
| MinID | *MinID* er en e-ID på nivå 3, som tilbyr autentisering basert på engangskoder på sms eller pinkoder på brev. |
| Sertifikatutsteder | Sertifikatutsteder som oppfyller kravene for virksomhetssertifikater i henhold til [kravspesifikasjon PKI](https://www.difi.no/fagomrader-og-tjenester/digitalisering-og-samordning/standarder/referansekatalogen/bruk-av-pki-med-og-i-offentlig-sektor). |
| | |

## Autentisering av sluttbruker
ID-portens tjenestetilbud for autentisering kan funksjonelt oppsummeres slik:

![](/idporten-integrasjonsguide/assets/images/autentiseringstjenester.bmp "Autentiseringstjenester")


## Innlogging

Dette er en overordnet beskrivelse av innloggingstjenesten. For detaljer se [Detaljert beskrivelse av teknisk løsning.](https://difi.github.io/idporten-integrasjonsguide//4_detaljert_beskrivelse.html)


## Utlogging

## Støttede protokoller
* SAML2
* OpenID Connect

## **Brukervennlighet**

 Digitaliseringsdirektoratet har utarbeidet en egen designguide for ID-porten. Denne inneholder tips om brukervennlighet, universell utforming og sikkerheten til brukerne av ID-porten, se [ID-porten designguide](https://samarbeid.difi.no/sites/samarbeid/files/designguide_id-porten_v2.0_0.pdf).

## **Føderering**

Dersom sluttbruker er innlogget hos tjenesteeier A og velger å gå videre til en tjenesteeier B uten å logge ut, vil bruker automatisk logges inn uten at bruker må autentisere seg på nytt. Det vil gjøres forespørsler mellom tjenesteeier B og ID-porten på samme måte som ved en normal innlogging. Forskjellen er kun at sluttbruker ikke opplever å få opp en autentiseringsdialog.

### **Sesjonstid**

Tjenesteleverandør og ID-porten holder egne sesjoner mot sluttbruker som ikke er avhengig av hverandre. Digitaliseringsdirektoratet anbefaler at tjenesteleverandør bruker samme sesjonstider som ID-porten, [Sesjonshåndtering](https://difi.github.io/idporten-integrasjonsguide//4_detaljert_beskrivelse.html#sesjonshåndtering) for mer detaljer

### **Sesjonsoppgradering**

Det er mulig for en sluttbruker å gjennomføre en autentisering på nivå 3 og seinere gå til en tjeneste som krever et høyere sikkerhetsnivå. I dette tilfellet vil ID-porten be brukeren om å oppgradere sikkerhetsnivå.

### **Alternative innlogingsmetoder**

ID-porten kan lenke til en URL som tilbyr innloggingsmetoder som tjenesteeier selv forvalter. Lenken vil bli vist når brukeren skal velge innlogging mellom de ulike eID-leverandørene.

## **Europeiske Brukere**

ID-porten har støtte for at europeiske brukere  kan logge seg på norske tjenester.  eIDAS-forordningen i EU åpner for at autentisering skal kunne skje på tvers av landegrenser 


## Hvordan få tilgang til ID-porten

Følg prosessen på [samarbeidsportalen](https://samarbeid.difi.no/felleslosninger/id-porten) for å integrere en SAML-integrasjon i ID-porten.


### Informasjon som må utveksles

Tjenesteeier må utlevere følgende tekniske informasjon til ID-porten:
* Logo

ID-porten vil utlevere følgende tekniske informasjon til tjenesteeier:
* Testbrukere til verifikasjonsmiljø



### **Annen informasjon**


### **Logo-format**

Logoen for tjenesten må oppfylle følgende krav:

| --- | --- |
| Filformat | .png .jpg eller .gif |
| Størrelse | Maksimal høyre 90 pixel og en bredde som ikke bør overskride 135 pixel. |
| Farge | Bakgrunnsfargen på ID-porten er #f3f4f4, så logoen bør enten ha denne bakgrunnsfargen eller eventuelt ha transparent bakgrunn. |
| | |


## Detaljert beskrivelse av teknisk løsning


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
 
### **Levetid for Sesjoner**
 
I føderasjon skal medlemmene konfigurere systemene, slik at sesjoner utløper ved inaktivitet etter høyst **30 minutter.**
 
I ID-porten måles maksimum sesjonstid for en brukers sesjon og denne settes til **120 minutter.**	

Det er valgfritt om timeout-perioden nullstilles hver gang brukerens nettleser forespør en av tjenesteleverandørs tjeneste, eller om den er uavhengig av brukeraktivitet (fast timeout periode).


Det må bemerkes at timeout hos en tjenesteleverandør ikke nødvendigvis medfører at brukeren blir tvunget til å logge på ID-porten. Hvis brukeren har en aktiv sesjon hos ID-porten, kan denne svare på forespørselen fra tjenesteleverandør uten brukerdialog (dvs. foreta single sign-on). Brukeren vil dermed ikke oppdage at sesjonen blir fornyet (bortsett fra at hans nettleser muligens ”blinker” et kort øyeblikk).

Hvis en tjenesteleverandør av sikkerhetsmessige grunner vil sikre seg at brukeren blir tvunget til aktiv pålogging i ID-porten, kan man benytte muligheter for dette i SAML og OIDC-protokollen. 




### IP-adresser som må åpnes for
* Produksjon: 146.192.252.60
* Verifikasjon 1: 146.192.252.124
* Verifikasjon 2: 146.192.252.156


### Sertifikatkrav

Det kreves at tjenesteleverandør benytter nøkler utstedt som virksomhetssertifikater iht. [kravspesifikasjon PKI](https://www.difi.no/fagomrader-og-tjenester/digitalisering-og-samordning/standarder/referansekatalogen/bruk-av-pki-med-og-i-offentlig-sektor), og at sertifikatutstederen er selvdeklarert for dette hos Nasjonal kommunikasjonsmyndighet (NKOM). Pr dags dato er det bare Buypass og Commfides som er selvdeklarert for utstedelse av virksomhetssertifikater hos NKOM, og dermed kun disse som kan utstede gyldige virksomhetssertifikater for bruk mot ID-porten. 

Tjenesteleverandøre må sjekke at bare de virksomhetssertifikater som er utvekslet som en del av metadatautveksling er i bruk i føderasjonen.


### **Bestilling av virksomhetssertifikat**
Merk at sertifikatutstedere av virksomhetssertifikat har noe bestillingstid. Tjenesteleverandører oppfordres til å bestille sertifikat i god tid.


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
