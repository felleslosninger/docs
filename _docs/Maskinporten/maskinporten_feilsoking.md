---
title: Feilsøking i Maskinporten
description:  Feilsøking i Maskinporten
summary: 'Her finner du en oversikt over feilmeldinger og hva de kan bety, og hvordan det kan løses'

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_feilsoking
---

---
* TOC
{:toc}


## Feilmeldinger

### Format

Maskinporten returnerer ofte en respons med detaljerte meldinger om hva som er feil.  Denne bør logges av klienten.  Responsen er på JSON-format og inneholder attributtene:

* error - en OAuth2 error-kode som indikerer hva slags type problem dette er.
* error_description - detaljert informasjon om den spesifikke feilsituasjonen.
* error_uri - for enkelte feilsituasjoner, inneholder URL til side med feilsøkingshjelp (denne siden). Enkelte feilkoder har mer detaljer på denne siden. 

I error_description er det ofte inkludert en unik id som kan brukes til feilsøking. Noen av disse er beskrevet på denne siden.

### Connection

#### Connection Timeout.

Vi vet at enkelte kunder som kjører tjenester i Azure noen ganger sliter med å koble seg til maskinporten.no. Dette skal nå være løst.

En typisk feilmelding kan se slik ut

"A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."

Det som har fungert for andre kunder:

* Bytte host for den applikasjonen/tjenesten som ikke klarer å nå maskinporten.no

* Noen har også klart å komme gjennom ved å avslutte hosten og starte opp på nytt. 

### Invalid grant

Feilmelding invalid_grant betyr at Maskinporten ikke kan behandle token-forespørselen.  Noen av de vanligste feilsituasjonene er beskrevet her.

#### MP-100: Invalid assertion. Client authentication failed.

Kan være skrivefeil på clientID.

**Løsning:** Sjekk at ClientID er korrekt.

#### MP-110: "Invalid assertion. Client authentication failed. Invalid JWT claim aud"

Feil med audience i JWT-grant.

**Løsning:** Sjekk at audience går mot rett milø, og uten skrivefeil.

#### MP-120: "Invalid assertion. Client authentication failed. The JWT is signed with an invalid certificate."

Noe er feil med sertifikatet som benyttes.

**Løsning** Sjekk at det benyttes et gyldig virksomhetssertifikat. Sjekk at det ikke benyttes produksjonssertifikat i test eller testsertifikat i PROD.

#### MP-121: "Invalid assertion. Client authentication failed. Expired key"

Nøkkelen som er postet på klienten er utgått. Nøkler har 1 års levetid fra det tidspunktet de blir postet på klienten.

**Løsning** Post ny nøkkel på klienten. Eventuelt kan du poste den samme nøkkelen en gang til for å fornye den.

### Invalid request

#### MP-011: Invalid assertion. Invalid parameter value

Kan være skrivefeil i JWT grant.

**Løsning:** Sjekk JWT grantet for utilsiktet linjeskift eller andre skrivefeil.

#### "Validation of JWT claim failed: The combination consumer_org in claim and delegation scope on client is invalid"

Det er samme organisasjosnummer både på klient og i "consumer_org" claimet.

**Løsning:** Fjern "consumer_org" claimet

### Bad request

#### MP-200: Invalid scope -"Token request contains invalid scopes for client"

Scopet er ikke forhåndsregistrert på klienten som benyttes.

**Løsning:** Sjekk at scopet du prøver å få tilgang til er registrert på klienten. Sjekk forespørselen for skrivefeil på scopet.

#### MP-201: Invalid scope - "Token request contains scopes not allowed for maskinporten"

Klienten er satt opp med en integrasjonstype som scopet ikke godtar.

**Løsning:** Opprett ny klient med korrekt integrasjonstype.

###  Validation of JWT Bearer grant failed

#### MP-012: Grant is used before

Grantet er allerede brukt.

**Løsning:** Opprett nytt JWT-grant

### Authentication of client by JWT failed

#### MP-100: Client not found

Det kan være flere grunner til denne feilmeldingen. Men det betyr at denne klienten ikke finnes hos den audience som benyttes. Det kan være forskjellige grunner til det:

1. Skrivefeil på issuer
2. Feil issuer (skal være clientID)
3. Feil audience (F.eks klienten er opprettet i ver2 miljøet, men audience er satt til PROD sin url)

**Løsning:** Sjekk at det benyttes korrekt clientID og at den benyttes i samme miljø som den er opprettet i.

#### MP-130: JWT is expired

Tokenet er utløpt. Enten er det allerede brukt, eller det er brukt for sent. Det kan også være at det er for stor forskjell på serverklokke og Maskinporten.

**Løsning:** Generer nytt token. Synkroniser serverklokke dersom forskjellen er for stor mellom server og Maskinporten.

#### MP-122: Invalid JWT. Invalid organization number for client. Does not match certificate orgno

Virksomhetssertifikatet er utstedt til et annet organisasjonsnummer enn det som eier klienten.

**Løsning:** Bruk virksomhetssertifikat utstedt til samme organisasjonsnummer som klienten. Eventuelt opprett klient på samme organisasjonsnummer som sertifikatet er utstedt til.

### Validation of JWT failed

#### MP-123: Invalid JWT header x5c

Muligens feil med x5c element i header.

**Løsning:** Sjekk at sertifikatet ligger med som et array av string, og ikke string.

#### MP-124: Invalid JWT signature

Feil på sertifikat. Sjekk at sertifikatet ikke er utløpt og at det benyttes prod.sertifikat i produksjonsmiljøet, og test-virksomhetssertifikat i testmiljøene.

#### MP-012: Grant is used before

Dette kan bety at det gjenbrukes en JTI, slik at jwt-grantet ikke har en unik id.

**Løsning:** Generer ny JWT med ny ID. Sjekk at det genereres ny JTI for hver kjøring.

#### MP-301: Unknown authorization details type

Dette betyr at det gjøres en RAR request der det etterspørres en authorization details type som ikke er støttet.

**Løsning:** Sjekk at det etterspørres en støttet authorization details type - sjekk oauth metadata for støttede typer.

#### MP-302: Unknown fields in the authorization details

Dette betyr at det gjøres en RAR request der det er inkludert ukjente felter i authorization details.

**Løsning:** Sjekk at det ikke er med ukjente felt i authorization details.

#### MP-303: Invalid authorization details values

Dette betyr at en eller flere av veriene i authorization details i requesten ikke validerer.

**Løsning:** Sjekk at alle feltene i request har gyldige verdier. Det vil vanligvis stå i feilmeldingen hvilken verdi som er ugyldig

#### Issue time is after now

Det er for stor tidsforskjell mellom serverklokken vår og deres.

**Løsning:** Sjekk klokken på server, synkroniser ved stort avvik. Vi synkroniserer mot justervesenet.

### Forbidden

#### MP-250: Consumer has not been granted access to the scope <scope>

Konsumenten har ikke tilgang til det scopet som det blir spurt om tilgang til.

**Løsning:** Konsumenten må kontakte API-tilbyder for å få tilgang til scope. Eventuelt bytt til et scope som konsumenten har tilgang til.

#### MP-251: Consumer <consumer org.nr> has not delegated access to the scope <scope> to supplier <supplier org.nr>

Konsumenten har ikke delegert rettigheten videre til leverandør i Altinn. Eventuelt er det delegert feil rettighet.

Vi gjør også oppmerksom på at delegeringer som utføres i Altinn ikke gjelder i Altinn sitt testmiljø tt02.

**Løsning:** Konsument må logge seg inn i Altinn og delegere den korrekte rettigheten videre til leverandør.

## Feilsøking for selvbetjening via web

### Finner ikke scope i nedtrekkslisten

API-tilbyder har ikke delt tilgang med virksomheten din i det miljøet du befinner deg i.

**Løsning:** Kontakt API-tilbyder

### "Ny integrasjon" blir ikke tilgjengelig etter innlogging med ID-porten

Du har ikke tilgang til selvbetjening.

**Løsning:** En person med rolle "Hovedadministrator" i Altinn for din virksomhet, må logge seg inn og delegere tilgang til deg.

Fremgangsmåte: [Tilgang i produksjonsmiljø](https://docs.digdir.no/maskinporten_sjolvbetjening_web.html#tilgang-i-produksjonsmilj%C3%B8)
