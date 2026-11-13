---
title: Vedlegg B: Begrenset SSO
description: Løsningsforslag til beslutning

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper_vedlegg_B_begrenset
---

Dette er et av alternativene for løsning for [sso-grupper](oidc_sso_grupper).

## Hva er begrenset sso ?

Hver organisasjons administrator angir hvilke klient-id-er som har lov til å dele SSO inn til klienten. Hver slik tillatelse er en SSO-relasjon. Lista kan vi populært kalle for "følger-lista".

### 5.1 SSO-relasjoner er rettede og krever eksplisitt samtykke fra mottakeren

En SSO-relasjon bestemmer hvem som slipper inn til *egen* klient, og sier ingenting om hvorvidt den andre klienten stoler på den første.

- Legger klient B til klient A som SSO-relasjon, kan en bruker med sesjon fra A få SSO inn til B. Det gir ikke SSO fra B til A.
- Skal SSO fungere begge veier, må eieren av A også legge til B på A.
- Dette gjelder uavhengig av om klientene tilhører samme organisasjon eller ulike organisasjoner.

For en klient med begrenset SSO er samtykket eksplisitt: eieren konfigurerer SSO-relasjonene og velger evalueringstype. Med strict må alle klientene i sesjonen være godkjent; med lax må bare startklienten være godkjent (se 6.3). Derfor trenger ikke en annen organisasjon å godkjenne at klienten din legger dem til. Relasjonen gir bare din klient mulighet til å slippe dem inn.

Toveis SSO krever to separate konfigurasjoner, som lett kommer ut av synk. En skisse av selvbetjening som gjør dette enklere finnes i vedlegg A.

### 5.2 Vurderer: Å kunne følge organisasjonsnummer

Vi vurderer å la klienteier i tillegg legge til **organisasjonsnumre** som SSO-relasjon, i stedet for å liste hver enkelt klient-id. Alle klienter som tilhører en godkjent organisasjon regnes da som SSO-relasjoner på klienten.

Eksempel: virksomhet A konfigurerer klientene sine til å stole på alt fra virksomhet A og virksomhet B. Da slipper nye klienter hos A og B inn uten at listen må oppdateres.

- Fjerner behovet for å vedlikeholde lange lister med klient-id-er, og passer godt for virksomheter som har mange klienter.
- Relasjonen er fortsatt rettet (se 5.1) og eies av mottakeren: A godkjenner B, og det gir ikke SSO fra A til B.
- Gir bredere tillit enn en enkeltklient, siden også fremtidige klienter hos den godkjente organisasjonen slipper inn. Det må veies mot behovet for kontroll, og påvirker hvordan strict og lax evalueres (kapittel 6).

Dette er ikke bestemt, men er tenkt som en senere utvidelse.   **Vi ønsker tilbakemelding på om dette er noe dere har behov for**, og på:

- om det er tilstrekklig å bare kunne godkjenne hele organisasjoner, eller om det må være mulig å styre på enkeltklienter
- om det bør være mulig å kombinere organisasjoner og enkeltklienter i samme liste,
- om bredere tillit til fremtidige klienter hos en godkjent organisasjon er akseptabelt.

## 6. Sesjoner på tvers av mange klienter: hva skal skje?

Dette er et punkt vi særlig ønsker innspill på.

SSO-relasjoner er enkle å resonnere om når to klienter vurderes isolert. Det blir uklart når én brukersesjon har vært innom flere klienter. Sesjonen holder da en liste over alle klientene (RP-ene) den har vært brukt mot, og en klient som skal gi SSO må ta stilling til hele denne listen, ikke bare til klienten brukeren kom fra.

### 6.1 Scenarioer og foreslått utfall

Scenariene tar utganspunkt i innlogging i 3 klienter, A,B og C i denne rekkefølge.  Merk at denne analysen baserer seg på brukerinteraksjonen **sett fra ID-porten**. Brukeren selv kan selvsagt logge inn på A og deretter B, for så lokalt i egen browser gå tilbake til A og jobbe der før hen forsøker seg mot C direkte.  ID-porten kan ikke vite dette.


Strict og lax er en innstilling på klienten som evaluerer sesjonen (C i scenario 1–3, B i scenario 4–7). Se 6.3 for hva de to typene betyr. Kolonnene viser utfallet for hver type.

| # | Konfigurasjon | Brukerreise | Strict | Lax | Hvorfor |
|---|---|---|---|---|---|
| 1 | **Start i godkjent klient, mellomledd ikke godkjent.** C tillater A, men ikke B. | A → B → C | Ingen SSO | SSO | Strict: B står i sesjonen og er ikke godkjent av C. Lax: reisen startet i A, som C har godkjent. |
| | C tillater A, men ikke B. | B → A → C | Ingen SSO | Ingen SSO | Reisen startet i B, som C ikke har godkjent. At brukeren kommer direkte fra A hjelper ikke. |
| | C tillater A, men ikke B. | A → C | SSO | SSO | Sesjonen inneholder bare A. |
| 2 | **Kjede.** B tillater A. C tillater B, men ikke A. | A → B → C | Ingen SSO | Ingen SSO | Sesjonen startet i A, som C ikke har godkjent. Tillit er ikke transitiv for strict, og lax ser bare på startklienten. |
| 3 | **Rekkefølge.** A og B tillater hverandre. C tillater B, men ikke A. | B → C | SSO | SSO | Sesjonen inneholder bare B. |
| | | B → A → C | Ingen SSO | SSO | Strict: sesjonen inneholder nå A, som C ikke har godkjent. Lax: reisen startet i B, som C har godkjent. |
| 4 | **Blandede modi.** A har begrenset SSO og tillater ikke C. C har global SSO. | A → C | SSO | SSO | Begrenset SSO styrer bare hvem som slipper inn til A. C har global SSO og sjekker ikke sesjonens innhold. |
| | B har begrenset SSO og tillater ikke A. A har global SSO. | A → B | Ingen SSO | Ingen SSO | B har ikke godkjent A. |
| 5 | **Isolert klient.** A er isolert, B har begrenset SSO og tillater A. | A → B | Ingen SSO | Ingen SSO | Isolerte klienter har ikke en delt sesjon å gjenbruke, uansett hva B tillater. |
| 6 | **Tillitsgruppe uten SSO.** Tillitsgruppen tillater ikke SSO. B har begrenset SSO og er på unntakslisten. | A → B | SSO, hvis alle klienter i sesjonen er SSO-relasjoner på B | SSO, hvis startklienten er SSO-relasjon på B | Unntakslisten åpner for SSO, men SSO-relasjonene gjelder fortsatt. |
| 7 | **Relasjon fjernes underveis.** B fjerner A som SSO-relasjon mens brukeren har en sesjon som inneholder A. | A → B (etter fjerning) | Ingen SSO (forslag, åpent spørsmål) | Ingen SSO (forslag, åpent spørsmål) | Relasjonene evalueres ved hver SSO-forespørsel. Se spørsmål nedenfor. |

Med strict gir scenario 1–3 et resultat som kan virke overraskende for tjenesteeierne på B og C, siden de hver for seg ser ut til å være riktig konfigurert. Utfallet avhenger av hvilke klienter brukeren har vært innom, og i hvilken rekkefølge. Det er vanskelig å forutsi og å feilsøke. Lax gir mer forutsigbare utfall, men til prisen av transitiv tillit.

Merk spesielt:  denne analysern baserer seg på brukerinteraksjonen sett fra ID-porten. 


### 6.2 Mulige tilnærminger

| Tilnærming | Beskrivelse | Fordeler | Ulemper |
|---|---|---|---|
| **a) Streng evaluering** (strict, dagens pilot) | Alle klienter i sesjonen må være tillatt av klienten som evaluerer. Ellers ingen SSO. | Tillit er ikke transitiv, C har aldri takket ja til at en sesjon fra A deles med C. Enklest og sikrest. | Resultatet avhenger av rekkefølge og er vanskelig å forstå. Uventet innlogging for brukeren. |
| **b) Kun nærmeste ledd** | C vurderer bare klienten brukeren kommer fra (B). | Kjeder fungerer, og resultatet er lettere å forutsi. | Gir transitiv tillit: C får i praksis SSO fra A uten å ha godkjent A. Svekker kontrollen som begrenset modus skal gi. |
| **c) Konsistensvalidering ved konfigurasjon** | Evalueringen er streng (a), men konfigurasjonen varsler eller avviser kombinasjoner som gir kjeder som ikke fungerer, f.eks. «B tillater A, men C tillater B og ikke A». | Feilen oppdages ved oppsett i stedet for hos sluttbruker. Krever ingen endring av tillitsmodellen. | Krever verktøy for å se hele grafen, noe som er vanskelig med lister per klient. |
| **d) Kun startklient** (lax) | C vurderer bare klienten som startet sesjonen (A), ikke mellomleddene. | Følger hvem brukeren opprinnelig autentiserte seg mot. Kjeder fungerer uten at C må godkjenne alle mellomledd. Resultatet avhenger ikke av hvilke mellomledd brukeren har vært innom. | Gir transitiv tillit: C godtar en sesjon som har vært innom B uten å ha godkjent B. Krever at sesjonen lagrer hvilken klient den startet i. |

### 6.3 Forslag: evalueringstype som konfigurasjon

I stedet for å velge én evalueringsregel for alle foreslår vi at klienter med begrenset SSO får en innstilling, **evalueringstype**, med to verdier:

| Type | Regel | Passer når |
|---|---|---|
| **Strict** (standard) | Alle klienter i sesjonen må være SSO-relasjoner på klienten. Tilsvarer tilnærming a. | Klienten skal ha full kontroll over hvem som kan ha vært innom sesjonen. |
| **Lax** | Bare klienten som startet sesjonen må være SSO-relasjon. Mellomledd vurderes ikke. Tilsvarer tilnærming d. | Klienten stoler på den som startet sesjonen, og vil unngå uforutsigbare avvisninger i kjeder. |

- **Strict er standard**, siden det er dagens pilotatferd og gir minst transitiv tillit.
- Valget gjøres av eieren av den **mottakende** klienten. Det er dermed fortsatt eksplisitt samtykke (se 5.1): lax åpner bare for transitiv tillit hos den som selv har valgt det.
- Lax må dokumenteres tydelig, med tydelig advarsel om at klienten godtar sesjoner som har vært innom klienter den ikke har godkjent.

I tillegg foreslår vi at:

- atferden dokumenteres for tjenesteeiere, med eksempler som scenarioene over,
- for ønskede brukerreiser med strict holdes SSO-relasjonene konsistente, slik at alle klienter i sesjonen er godkjent av den mottakende klienten,
- konsistensvalidering (c) vurderes i selvbetjeningen, særlig for strict.

Nærmeste ledd (b) tas ikke med som valg, fordi det gir transitiv tillit uten å ta stilling til hvem som startet sesjonen.

### 6.4 Spørsmål vi ønsker innspill på

1. Er strict og lax riktige evalueringstyper? Gir de utfallet dere ville forventet i alle scenarioene i 6.1?
2. Er strict riktig standard?
3. Skal evalueringstypen kunne settes av tjenesteeier selv, eller bør lax kreve en godkjenning eller være forbeholdt visse tillitsgrupper?
4. Finnes det tilfeller der nærmeste ledd (b) er akseptabelt, for eksempel når A og C eies av samme organisasjon?
5. Scenario 4: er det greit at begrenset SSO bare styrer hvem som slipper inn, og ikke hvem som kan gjenbruke sesjonen etterpå? Eller bør en begrenset klient også kunne hindre at sesjonen den har vært med på brukes mot klienter utenfor listen?
6. Scenario 7: skal en fjernet relasjon gjelde umiddelbart, eller først når brukeren logger inn på nytt?
7. Hvordan bør tjenesteeier få vite hvorfor SSO ble avvist? Skal avvisningen forklares for sluttbruker, eller bare synes i logg og selvbetjening?
8. Hvilke andre kombinasjoner av klienter og modi finnes i praksis, som ikke dekkes av scenarioene?


## Vår vurdering:

**Egenskaper**

- Enklest å innføre teknisk. Ligner vanlig klientkonfigurasjon og krever ikke nytt administrasjonsobjekt eller ny rollemodell.
- Høy kontroll per klient, og godt egnet når det typisk er 2–3 klienter som skal kobles sammen.
- Kan fungere som en rask MVP som lar oss høste erfaring med begrenset SSO.

**Svakheter**

- Enkelt å forstå per klient, men vanskelig å få oversikt over alle relasjonene samlet. Relasjonene kan over tid bli en skjult graf fremfor tydelige grupper.
- Risiko for inkonsistent eller asymmetrisk konfigurasjon, og vanskeligere å auditere.
- Lister per klient kan bli lange og skalere dårlig, og modellen passer dårligere for store eller tverrorganisatoriske oppsett.
