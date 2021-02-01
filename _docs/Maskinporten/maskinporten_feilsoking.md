---
title: Feilsøking i Maskinporten
description:  Feilsøking i Maskinporten
summary: 'Her finner du en oversikt over feilmeldinger og hva de kan bety, og hvordan det kan løses'
permalink: maskinporten_feilsoking.html
sidebar: maskinporten_sidebar
product: Maskinporten
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

### Invalid request

#### Invalid assertion. Invalid parameter value

Kan være skrivefeil i JWT grant.

**Løsning:** Sjekk JWT grantet for utilsiktet linjeskift eller andre skrivefeil.

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

### Validation of JWT failed

#### Failed to extract certificate from jwt

Muligens feil med x5c element i header.

**Løsning:** Sjekk at sertifikatet ligger med som et array av string, og ikke string.

#### Could not validate JWT Signature

Feil på sertifikat. Sjekk at sertifikatet ikke er utløpt og at det benyttes prod.sertifikat i produksjonsmiljøet, og test-virksomhetssertifikat i testmiljøene.

## Feilsøking for selvbetjening via web

### Finner ikke scope i nedtrekkslisten

API-tilbyder har ikke delt tilgang med virksomheten din i det miljøet du befinner deg i.

**Løsning:** Kontakt API-tilbyder

### "Ny integrasjon" blir ikke tilgjengelig etter innlogging med ID-porten

Du har ikke tilgang til selvbetjening.

**Løsning:** En person med rolle "Hovedadministrator" i Altinn for din virksomhet, må logge seg inn og delegere tilgang til deg.

Fremgangsmåte: https://thorsortevik.github.io/dokumentasjonsprosjektet/maskinporten_sjolvbetjening_web.html#tilgang-i-produksjonsmilj%C3%B8
