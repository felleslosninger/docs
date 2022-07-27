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

### Invalid grant

#### Invalid assertion. Client authentication failed.

Kan være skrivefeil på clientID.

**Løsning:** Sjekk at ClientID er korrekt.

#### "Invalid assertion. Client authentication failed. Invalid JWT claim aud"

Feil med audience i JWT-grant.

**Løsning:** Sjekk at audience går mot rett milø, og uten skrivefeil.

#### "Invalid assertion. Client authentication failed. The JWT is signed with an invalid certificate."

Noe er feil med sertifikatet som benyttes.

**Løsning** Sjekk at det benyttes et gyldig virksomhetssertifikat. Sjekk at det ikke benyttes produksjonssertifikat i test eller testsertifikat i PROD. 

### Invalid request

#### Invalid assertion. Invalid parameter value

Kan være skrivefeil i JWT grant.

**Løsning:** Sjekk JWT grantet for utilsiktet linjeskift eller andre skrivefeil.

#### "Validation of JWT claim failed: The combination consumer_org in claim and delegation scope on client is invalid"

Det er samme organisasjosnummer både på klient og i "consumer_org" claimet.

**Løsning:** Fjern "consumer_org" claimet

### Bad request

#### Invalid scope -"Token request contains invalid scopes for client"

Scopet er ikke forhåndsregistrert på klienten som benyttes.

**Løsning:** Sjekk at scopet du prøver å få tilgang til er registrert på klienten. Sjekk forespørselen for skrivefeil på scopet.

#### Invalid scope - "Token request contains scopes with integration types only allowed for user login"

Klienten er satt opp med en integrasjonstype som scopet ikke godtar.

**Løsning:** Opprett ny klient med korrekt integrasjonstype.

###  Validation of JWT Bearer grant failed

#### Grant is used before

Grantet er allerede brukt.

**Løsning:** Opprett nytt JWT-grant

### Authentication of client by JWT failed

#### Client not found

Det kan være flere grunner til denne feilmeldingen. Men det betyr at denne klienten ikke finnes hos den audience som benyttes. Det kan være forskjellige grunner til det:

1. Skrivefeil på issuer
2. Feil issuer (skal være clientID)
3. Feil audience (F.eks klienten er opprettet i ver2 miljøet, men audience er satt til PROD sin url)

**Løsning:** Sjekk at det benyttes korrekt clientID og at den benyttes i samme miljø som den er opprettet i.

#### JWT is expired

Tokenet er utløpt. Enten er det allerede brukt, eller det er brukt for sent.

**Løsning:** Generer nytt token.

#### Client orgno <org.nr> does not match certificate orgno <org.nr>

Virksomhetssertifikatet er utstedt til et annet organisasjonsnummer enn det som eier klienten.

**Løsning:** Bruk virksomhetssertifikat utstedt til samme organisasjonsnummer som klienten. Eventuelt opprett klient på samme organisasjonsnummer som sertifikatet er utstedt til.

### Validation of JWT failed

#### Failed to extract certificate from jwt

Muligens feil med x5c element i header.

**Løsning:** Sjekk at sertifikatet ligger med som et array av string, og ikke string.

#### Could not validate JWT Signature

Feil på sertifikat. Sjekk at sertifikatet ikke er utløpt og at det benyttes prod.sertifikat i produksjonsmiljøet, og test-virksomhetssertifikat i testmiljøene.

#### Grant is used before

Dette kan bety at det gjenbrukes en JTI, slik at jwt-grantet ikke har en unik id.

**Løsning:** Generer ny JWT med ny ID. Sjekk at det genereres ny JTI for hver kjøring.

#### Issue time is after now

Det er for stor tidsforskjell mellom serverklokken vår og deres.

**Løsning:** Sjekk klokken på server, synkroniser ved stort avvik. Vi synkroniserer mot justervesenet.

### Forbidden

#### Consumer has not been granted access to the scope <scope>

Konsumenten har ikke tilgang til det scopet som det blir spurt om tilgang til.

**Løsning:** Konsumenten må kontakte API-tilbyder for å få tilgang til scope. Eventuelt bytt til et scope som konsumenten har tilgang til.

#### Consumer <consumer org.nr> has not delegated access to the scope <scope> to supplier <supplier org.nr>

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
