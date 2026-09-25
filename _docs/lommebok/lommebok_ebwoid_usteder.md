---
title: EBWOID utsteder
description: Detaljert dokumentasjon for Brønnøysundregistrene sin EBWOID-utsteder.

sidebar: lommebok
product: lommebok
---

European Business Wallet Organization Identifier (EBWOID) fungerer som den sentrale virksomhetsidentifikatoren i økosystemet. Identitetsbeviset følger EBWOID-definisjonen i [EBW-lovforslaget](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0838). Tidligere har denne vært kjent som Legal Person Identification Data (LPID) fra [eIDAS2-lovverket](https://eur-lex.europa.eu/eli/reg/2024/1183/oj/eng). 
Funksjonalitetsmessig har dette identitetsbeviset samme rolle som en PID (Personal Identification Data) som utstedes av Digdir.

I Norge er Brønnøysundregistrene med Enhets- og Foretaksregisteret autentisk kilde for dette beviset, og i sandkassen påtar Brønnøysundregistrene seg rollen som utsteder av EBWOID.

Tjenesten er tilgjengelig for syntetiske data som ligger i Tenor testdata, og er tilgjengelig her (velg innlogging med TestID på nivå høyt, og så daglig leder).

[https://brg.apps.tt02.altinn.no/brg/lommebok-v1/](https://brg.apps.tt02.altinn.no/brg/lommebok-v1/)


## EBWOID og økosystemet

EBWOID (European Business Wallet Organization Identifier) fungerer som den sentrale virksomhetsidentifikatoren i økosystemet. Identitetsbeviset følger EBWOID-definisjonen i EBW-lovforslaget og er per nå kun tilgjengelig i SD-JWT-formatet. EBW-forslaget legger opp til 3 formater på sikt. Disse er mdoc, SD-JWT og W3C VCDM. 
Basert på Brønnøysundregistrenes deltakelse i de europeiske storskalapilotene (LSP), anser Brønnøysundregistrene SD-JWT som mest aktuelt på nåværende tidspunkt for denne attestasjonen i en utprøvingsfase. 

Økosystemet er fortsatt under aktiv utvikling, og endringer må påregnes. 

### Hva er EBWOID-beviset basert på?
EBWOID-beviset er basert på EBW-lovforslaget, og WEBUILD (en av de europeiske storskalapilotene) sitt arbeid rundt regelverket ("rulebook") for dette beviset. Dette er et pågående arbeid, og kan finnes i [WEBUILD sin GitHub her](https://github.com/webuild-consortium/webuild-attestation-rulebooks-catalog/blob/main/rulebooks/ds001-ebw-oid-rulebook.md). 
I dette repoet finner du også [JSON-skjema for hvordan beviset skal se ut](https://github.com/webuild-consortium/webuild-attestation-rulebooks-catalog/blob/main/data-schemas/sd-jwt/ds001-ebw-oid-sd-jwt.json) samt eksempler på datainnhold. 

### Hva må du se opp for når du bruker EBWOID?
1. EBWOID er laget for internasjonalt bruk og garanterer unike identiteter på tvers av EU. Dette medfører et avvik fra (eller videreutvikling av) det norske organisasjonsnummeret som brukes til vanlig. I stedet for organisasjonsnummer brukers det European Unique Identity (EUID) som er definert av [EUs selskapsrett](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32021R1042&qid=1775813313420).
2. For Norge betyr dette at ID-feltet i bevis populeres med `<Landskode><Register>.<virksomhetsidentifikator>`. For Kantega vil dette være `NOFOR.985815534` hvor `NO` er landskoden, `FOR` er referansen til Foretaksregisteret og `985815534` er det norske organisasjonsnummeret. 
3. EUID er lovmessig kun definert for selskaper i Foretaksregisteret. EBW refererer til "comparable identifier" for økonomiske operatører. I første omgang har Brønnøysundregsitrene valgt å bruke `NOFOR` for alle organisasjoner i Norge i sandkassen, selv om de ikke ligger i Foretaksregisteret. Det diskuteres en permanent løsning. Denne vil nok medføre endringer av registerreferansen. For nasjonale bruksformål vil du alltid kunne bruke de siste 9 posisjonene som norsk organisasjonsnummer. 

## Generell informasjon om prosessen

<div class="mermaid">
graph LR
    Start["Altinn Applikasjon Start"] --> Decision{"Signert Bevis søknad"}
    Decision -- Nei --> Signatur["Signatur Prosess"]
    Decision -- Ja --> Utstedelse["Utstedelse Prosess"]
</div>



Utstederen er bygget på Altinn-plattformen og krever autentisering av brukeren som representerer virksomheten. Prosessen er designet for å være enkel, men vil i fremtiden kreve signatur for selskapet basert på registre signatur regler registrert i Enhetsregistreret. Dette medfører behov for  Altinn signatur-oppgave, som dessverre gjør at applikasjonen ikke kan kjøres som en helhetlig flyt over Altinn-API-er.  
Flyten splittes for å muliggjøre det for virksomhetslommebøker å hente ut et `credential offer` direkte over API med autorisering av brukeren i sitt eget system uten å eksponere dette for brukeren. 


## Hvordan ta tjenesten i bruk
### Altinn frontend
Følg disse stegene for å hente et identitetsbevis for din virksomhet i TT02-miljøet:

1.  **Logg inn:** Gå til [https://brg.apps.tt02.altinn.no/brg/lommebok-v1/](https://brg.apps.tt02.altinn.no/brg/lommebok-v1/) og logg inn i TT02-miljøet med TestID på nivå "Høyt".
2.  **Finn test-data:** Hent en tilfeldig daglig leder fra testdata-oversikten. Sjekk organisasjonsnavnet før du klikker på "Autentiser".
3.  **Velg virksomhet:** Velg riktig virksomhet dersom du får opp flere valg.
4.  **Velg miljø/utsteder:** Velg ønsket miljø og utsteder for beviset.
5.  **Bekreft utstedelse:** Bekreft at du ønsker å få utstedt beviset. Dette steget er forberedelse for en fremtidig splitt mellom signatur- og utstedelsesflyt.
6.  **Motta bevis:** Beviset blir nå tilgjengelig i din digitale lommebok.

### Altinn API

Det brukes standard Altinn Studio API-er for kommunikasjonen med applikasjonen. 
Swagger-beskrivelsen finner du her: [https://brg.apps.tt02.altinn.no/brg/lommebok-v1/swagger/index.html](https://brg.apps.tt02.altinn.no/brg/lommebok-v1/swagger/index.html)
Følgende datafelt må settes av lommeboken for å gjennomføre prosessen over API:
```json
{
"environment": "sandkasse|webuild",
"issuer": "symfoni|credenco",
"personnummer": "string",
"orgnr": "string",
"timelimitack": true
}
```
Følgende er i dag gyldige kombinasjoner: `sandkasse + symfoni`, `webuild + credenco`. 

Etter gjennomført prosess vil credential offer URI-en være tilgjengelig i datafeltet `credentialofferuri`



## Planer for videre utvikling

Følgende er planlagt for videreutvikling av utstederen:

*   **Signatur av de/dem som har signaturrett:** Utstedelse av virksomhetsidentitet skal i fremtiden kreve en forpliktende signatur for virksomheten. Det ses på integrasjon med Altinn Signatur-oppgave for å løse dette.
*   **Flere utstedere:** I sandkassen er det valgt å utstede gjennom virksomhetslommebøker og kommersielle aktører. Dersom din organisasjon ønsker å bidra med utstederkapasitet eller virksomhetslommebok, ta kontakt med oss i Brønnøysundregistrene.
*   **Oversikt over bevis:** Det vil komme en oversikt over allerede eksisterende bevis for virksomheten med tilhørende informasjon for innsyn om EBWOIDer allerede eksisterer for dette selskapet
*   **Automatisk tilbakekalling:** Rammeverket for automatisk tilbakekalling ved registerendringer er på plass, men er foreløpig ikke integrert med fagsystemene.

## Kjente feil og mangler

Siden dette er en tidlig versjon, finnes det noen kjente begrensninger:

*   Skjemaet avsluttes ikke alltid korrekt når beviset presenteres, og kan bli liggende som "kladd" i Altinn-innboksen.
*   Kontroll-logikken på valgte variabler er ikke fullstendig. Vennligst bruk tjenesten som tiltenkt mens det jobbes med å forbedre feilmeldinger og robusthet. Ved feil, prøv på nytt uten å endre for mange valg samtidig.
