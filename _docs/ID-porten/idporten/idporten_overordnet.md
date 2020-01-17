---
title: Overordnet arkitekturbeskrivelse
description:
summary:
permalink: idporten_overordnet.html
sidebar: main_sidebar
product: ID-porten
---

## Introduksjon

Denne siden gir en oversikt over de funksjoner som ID-porten tilbyr som tjenesteleverandør.

![](/idporten-integrasjonsguide/assets/images/funksjonelt_gammal.bmp "minId_tjenester")

ID-porten tilbyr følgende funksjonalitet
- **autentisering av sluttbrukere**
- **API-sikring**

## Aktører

Dette kapittelet beskriver roller og ansvar knyttet til den tekniske integrasjonen mot ID-porten. Kapittelet er et tillegg til bruksvilkårene som i større grad omhandler det avtalemessige mellomDigitaliseringsdirektoratetog tjenesteeierne.

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

### Innlogging

### Utlogging

## Støtta protokoller

## **Brukervennlighet**

Digitaliseringsdirektoratet har utarbeidet en egen designguide for ID-porten. Denne inneholder tips om brukervennlighet, universell utforming og sikkerheten til brukerne av ID-porten, se [ID-porten designguide](https://samarbeid.difi.no/sites/samarbeid/files/designguide_id-porten_v2.0_0.pdf).

## **Føderering**

Dersom sluttbruker er innlogget hos tjenesteeier A og velger å gå videre til en tjenesteeier B uten å logge ut, vil bruker automatisk logges inn uten at bruker må autentisere seg på nytt. Det vil gjøres forespørsler mellom tjenesteeier B og ID-porten på samme måte som ved en normal innlogging. Forskjellen er kun at sluttbruker ikke opplever å få opp en autentiseringsdialog.

## **Sesjonstid**

Tjenesteleverandør og ID-porten holder egne sesjoner mot sluttbruker som ikke er avhengig av hverandre.Digitaliseringsdirektoratetanbefaler at tjenesteleverandør bruker samme sesjonstider som ID-porten, [Sesjonshåndtering](https://difi.github.io/idporten-integrasjonsguide//4_detaljert_beskrivelse.html#sesjonshåndtering) for mer detaljer

## **Sesjonsoppgradering**

Det er mulig for en sluttbruker å gjennomføre en autentisering på nivå 3 og seinere gå til en tjeneste som krever et høyere sikkerhetsnivå. I dette tilfellet vil ID-porten be brukeren om å oppgradere sikkerhetsnivå.

## **Alternative innlogingsmetoder**

ID-porten kan lenke til en URL som tilbyr innloggingsmetoder som tjenesteeier selv forvalter. Lenken vil bli vist når brukeren skal velge innlogging mellom de ulike eID-leverandørene.

## **Europeiske Brukere**

Fra 15-09 releasen inkluderer ID-porten støtte for at europeiske brukere knyttet til EUs pilot-infrastruktur for autentisering, STORK, kan logge seg på norske tjenester.  eIDAS-forordningen i EU åpner for at autentisering skal kunne skje på tvers av landegrenser fra 2018. Den tekniske løsningen vil på sikt bli oppgradert til eIDAS-profilen når denne er klar fra EU.

Tjenesteeiere som ønsker pålogging fra utenlandske brukere, må be spesielt om det på *idporten@difi.no*, og implementere teknisk støtte for å håndtere de ulike SAML-attributt-kombinasjonene som de da kan møte.

En tjeneste kan velge å kun støtte pålogging fra europeisk brukere, eller å støtte både norske brukere og europeiske brukere. Ved å støtte begge brukergrupper, vil man kunne beholde single-signOn til andre norske tjenester som før.

For alle europeiske eID vil ID-porten forsøke å framskaffe et eventuelt norsk d-nummer/fødselsnummer fra Det Sentrale Folkeregister (DSF). Hvis et d-nummer ikke ble funnet, eller ved integrasjonsproblem mot DSF, vil ID-porten likevel fullføre autentiseringen. Dette betyr at fravær av D-nummer/fødselsnummer ikke entydig garanterer at personen ikke har fått tildelt d-nummer.
