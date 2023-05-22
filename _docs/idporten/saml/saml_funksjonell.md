---
title: Funksjonell beskrivelse
description: Funksjonell beskrivelse - Oversikt over de funksjoner som ID-porten tilbyr som tjenesteleverandør
summary: "Funksjonell beskrivelse - Oversikt over de funksjoner som ID-porten tilbyr som tjenesteleverandør"

sidebar: saml_idporten_sidebar
product: ID-porten
redirect_from: /saml_funksjonell
---

## Introduksjon

Denne siden gir en oversikt over de funksjoner som ID-porten tilbyr som tjenesteleverandør.

![](/images/idporten/saml/funksjonelt_gammal.bmp "minId_tjenester")

Per i dag inneholder ID-porten kun funksjonalitet for **autentisering**

### Aktører

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

### Autentiseringstjenester

ID-portens tjenestetilbud for autentisering kan funksjonelt oppsummeres slik:

![](/images/idporten/saml/autentiseringstjenester.bmp "Autentiseringstjenester")

### Innlogging

Dette er en overordnet beskrivelse av innloggingstjenesten. For detaljer se [Detaljert beskrivelse av teknisk løsning.](https://difi.github.io/idporten-integrasjonsguide//4_detaljert_beskrivelse.html)

#### **Protokoll**

For integrasjon mot ID-porten benytter man protokollen SAML2.
Kanalene som benyttes til utveksling av SAML2-meldinger, er en frontkanal som benytter brukerens nettleser via HTTP redirect, og en bak-kanal direkte mellom tjenesteleverandør og ID-porten over SOAP-protokollen.

![](/images/idporten/saml/saml2_protokoll.bmp "saml2 protokoll")

**Forklaring:**

1. Sluttbruker ønsker tilgang til en tjeneste hos tjenesteeier som krever at bruker er autentisert.
2. Tjenesteleverandør oppretter en autentiseringsforespørsel som sendes til ID-porten.
3. og 4 ID-porten gjennomfører innlogging med sluttbruker med valgt e-ID på tilfredsstillende sikkerhetsnivå.
5- ID-porten sender et svar på autentiseringsforespørselen til tjenesteleverandør.
6. Tjenesteleverandør sender en personopplysningsforespørsel til ID-porten.
7. ID-porten leverer ut personopplysninger om sluttbruker.
8. Sluttbruker får tilgang til ønsket tjeneste.

#### **Autentiseringsforespørsel**

Tjenesteleverandør kan sende en forespørsel om innlogging til ID-porten. Forespørselen kan inneholde følgende informasjon som vil styre innloggingen:

| Parameter | Beskrivelse | Referanse |
| --- | --- |--- |
| Autentiseringsnivå | Styrer hvilke e-ID-er brukeren kan velge | [RequestedAuthnContext](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#requestedauthncontext) |
| Reautentisering | Vil _kreve_ at brukeren gjennomfører autentisering | [ForceAuthn](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#forceauthn) |
| Språk | Styrer hvilket språk ID-porten blir vist i | [Locale](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#locale) |
| OnBehalfOf | Identiteten til tjenesteeieren som innloggingen gjøres på vegne av | [onBehalfof](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#overføring-av-informasjon-om-tjenesteeier-for-leverandører) |

Svaret tjenesteleverandøren får etter en autentisering er en referanse-id som kan brukes for å hente ut personinformasjon, vha en personopplysningsforespørsel

#### **Personopplysningsforespørsel**

Tjenesteleverandør skal etter vellykket autentisering hente ut personinformasjon om brukeren og autentiseringen. Hvilken informasjon som er tilgjengelig for tjenesteleverandør er dokumentert i
[ArtifactResponse](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#artifactresponse)
Merk at det er mulig for tjenesteleverandør å spesifisere hvilke attributter de ønsker utlevert fra ID-porten om det ønskes.

### Utlogging

Når en sluttbruker er ferdig hos en tjenesteeier skal han logge ut. Utloggingen skal skje etter følgende beskrivelse:

![](/images/idporten/saml/utlogging.bmp "Utlogging")

**Forklaring:**
1. Bruker logger ut
2. Tjenesteleverandør sender LogoutRequest til ID-porten via frontkanal (HTTP redirect via sluttbruker).
3. ID-porten sender LogoutRequest via frontkanal til alle tjenesteleverandører der denne brukeren er pålogget.
4. Alle tjenesteleverandører svarer på LogoutRequest med en LogoutResponse.
5. ID-porten svarer på initial LogoutRequest, med en LogoutResponse.

#### **Brukervennlighet**

 Digitaliseringsdirektoratet har utarbeidet en egen designguide for ID-porten. Denne inneholder tips om brukervennlighet, universell utforming og sikkerheten til brukerne av ID-porten, se ID-porten designguide (utdatert, lenken er fjernet)

#### **Føderering**

Dersom sluttbruker er innlogget hos tjenesteeier A og velger å gå videre til en tjenesteeier B uten å logge ut, vil bruker automatisk logges inn uten at bruker må autentisere seg på nytt. Det vil gjøres forespørsler mellom tjenesteeier B og ID-porten på samme måte som ved en normal innlogging. Forskjellen er kun at sluttbruker ikke opplever å få opp en autentiseringsdialog.

#### **Sesjonstid**

Tjenesteleverandør og ID-porten holder egne sesjoner mot sluttbruker som ikke er avhengig av hverandre. Digitaliseringsdirektoratet anbefaler at tjenesteleverandør bruker samme sesjonstider som ID-porten, [Sesjonshåndtering](https://difi.github.io/idporten-integrasjonsguide//4_detaljert_beskrivelse.html#sesjonshåndtering) for mer detaljer

#### **Sesjonsoppgradering**

Det er mulig for en sluttbruker å gjennomføre en autentisering på nivå 3 og seinere gå til en tjeneste som krever et høyere sikkerhetsnivå. I dette tilfellet vil ID-porten be brukeren om å oppgradere sikkerhetsnivå.

#### **Kontakt- og Reservasjonsregisteret**

Kontakt- og reservasjonsregisteret er en felleskomponent i offentlig sektor for sentralt ajourhold av kontaktinformasjon for sluttbruker. ID-porten er integrert mot registrert og kan videreformidle informasjon fra registeret i forbindelse med en autentiseringsforespørsel. Dette er en tilleggstjeneste for ID-porten som kan bestilles av de tjenesteeiere som har tatt i bruk registeret., se [Integrasjonsguide for Oppslagstjenesten](https://difi.github.io/oppslagstjenesten-integrasjonsguide/1_hva_er_oppslagstjenesten).

#### **Alternative innlogingsmetoder**

ID-porten kan lenke til en URL som tilbyr innloggingsmetoder som tjenesteeier selv forvalter. Lenken vil bli vist når brukeren skal velge innlogging mellom de ulike eID-leverandørene.

#### **Europeiske Brukere**

Fra 15-09 releasen inkluderer ID-porten støtte for at europeiske brukere knyttet til EUs pilot-infrastruktur for autentisering, STORK, kan logge seg på norske tjenester.  eIDAS-forordningen i EU åpner for at autentisering skal kunne skje på tvers av landegrenser fra 2018. Den tekniske løsningen vil på sikt bli oppgradert til eIDAS-profilen når denne er klar fra EU.

Tjenesteeiere som ønsker pålogging fra utenlandske brukere, må be spesielt om det på <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>, og implementere teknisk støtte for å håndtere de ulike SAML-attributt-kombinasjonene som de da kan møte.

En tjeneste kan velge å kun støtte pålogging fra europeisk brukere, eller å støtte både norske brukere og europeiske brukere. Ved å støtte begge brukergrupper, vil man kunne beholde single-signOn til andre norske tjenester som før.

For alle europeiske eID vil ID-porten forsøke å framskaffe et eventuelt norsk d-nummer/fødselsnummer fra Det Sentrale Folkeregister (DSF). Hvis et d-nummer ikke ble funnet, eller ved integrasjonsproblem mot DSF, vil ID-porten likevel fullføre autentiseringen. Dette betyr at fravær av D-nummer/fødselsnummer ikke entydig garanterer at personen ikke har fått tildelt d-nummer.

[Videre lesing: Teknisk: innlogging](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html)
