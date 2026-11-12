---
title: SSO-grupper i ID-porten
description: Løsningsforslag til beslutning

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper
---

## 1. Sammendrag

Digdir har besluttet å endre håndteringen av SSO i ID-porten.   Idag er default-oppførselen at alle tjenester deltar i felles SSO, men at enkelt-tjenester kan melde seg ut.   Denne standardoppførselen blir nå "snudd om", slik at ingen tjenester har SSO med andre, og at kunder må eksplisitt aktivere SSO for sin tjeneste (opt-in).  

Endringen vil ha tilbakevirkende kraft for alle eksisterende tjenester,  etter en passende overgangsperiode.

Ved aktivering av SSO må kunden ta stilling til om tjenesten skal delta i én stor felles-SSO, eller om man heller foretrekker å være med i en mindre SSO-gruppe.   Mekanismen for SSO-grupper er p.t. ikke besluttet, og vi ønsker tilbakemeldinger på foreslått løsning for sso-grupper.


## 2. Hvorfor gjør vi dette ?

Risikovurderinger viser at innbyggere i liten grad forstår at de logger inn til tusenvis av offenlige tjenester når de bruker ID-porten.  Det er en risiko for misbruk av "hengende sesjoner" på delte devicer (for eksempel publikums-PCer på bibliotek eller offentlige kontorer), eller målrettede phishing-angrep som utnytter SSO-mekanismen.  I nyere tid har løpske KI-agenter også blitt identifisert som en risiko for innbygger. 

Dataanalyse viser at SSO i svært liten grad skjer idag.   Unntaket er kjente tjeneste-reiser mellom bestemte tjenester, eller kunder der tjenesten er realisert med mange mikrotjenester (for eksempel nav.no)


## 2. Foreslått løsning for SSO-grupper

Vi foreslår overordnet:

- et nytt felt for SSO-modi per klient, med 3 mulige verdier: `isolert`, `global` og `begrenset`,
- `isolert` blir standard for nye klienter,
- etter en overgangsperiode, vil alle eksisterende klienter som ikke har valgt sso-modi, bli satt til `isolert`

Klienter som har `begrenset`,  deltar i gruppe(r).  Slike klienter må i tillegg konfigurere vha. selvbejetning:

- angi **hvilke andre klienter den tar imot SSO fra**.  
- **evalueringstype** (`strict` eller `lax`) som avgjør hvordan en sesjon som har vært innom flere klienter vurderes (kapittel 6),
- at en sentralisert gruppemodell er vurdert, men **ikke tas videre nå** (kapittel 7).

Dette dokumentet ber særlig om innspill på **hva som skal skje når en sesjon har vært innom flere klienter, på tvers av klienter med ulik konfigurasjon**, og på om evalueringstypene strict og lax er riktig måte å gjøre det konfigurerbart på (kapittel 6). Vi ønsker også tilbakemelding på om det er behov for å kunne hviteliste hele organisasjoner via organisasjonsnummer (kapittel 5.2).

### Beslutning som ønskes

1. At SSO-modellen i ID-porten endres fra av/på til tre eksplisitte modi: isolert, global og begrenset (kapittel 4).
2. At isolert SSO blir standard for nyopprettede klienter.
3. At begrenset SSO realiseres ved å konfigurere SSO-relasjoner på klient, og at sentralisert gruppemodell ikke tas videre nå (kapittel 5 og 7).
4. Hvordan sesjoner som inneholder flere klienter skal evalueres. Forslaget er at klienten med begrenset SSO velger mellom strict (standard) og lax (kapittel 6).

### Begreper

| Begrep | Betydning |
|---|---|
| **Tillitsgruppe** | Autentiseringsnivå i ID-porten, f.eks. «idporten», «ansattporten» eller «eidas». Har en av/på-innstilling for om SSO er tillatt. |
| **Isolert SSO** | Klienten har egen SSO-sesjon og deler ikke SSO i noen retning. |
| **Global SSO** | Klienten deltar i vanlig, delt SSO med enhver annen klient. |
| **Begrenset SSO** | Klienten tar bare imot SSO fra klienter den eksplisitt har godkjent. |
| **SSO-relasjon** | En godkjent klient (og senere eventuelt organisasjon) på en klient med begrenset SSO. Relasjonen er rettet. |
| **Evalueringstype** | Innstilling på en klient med begrenset SSO som avgjør hvordan en sesjon med flere klienter vurderes: strict eller lax. |
| **Strict** | Alle klienter i sesjonen må være SSO-relasjoner på klienten. |
| **Lax** | Bare klienten som startet sesjonen må være SSO-relasjon på klienten. Mellomledd vurderes ikke. |
| **SSO-gruppe** | Et eget, sentralt administrert objekt som samler klienter. Vurdert, men ikke valgt nå (kapittel 7). |
| **SSO handover** | Mulig fremtidig utvidelse der kontekst kan sendes med ved SSO (kapittel 8). |

## 2. Bakgrunn og dagens situasjon

Om gjenbruk av sesjon er *tillatt* mellom to klienter, er i realiteten en tillitsbeslutning: å dele en sesjon betyr at én klients autentiseringshendelse også dekker en annen klients brukere. I dag styres denne beslutningen av to uavhengige og grovkornede mekanismer:

- **Klientnivå, binært:** av betyr at klienten kun støtter klientbundne sesjoner, og SSO deles aldri. På betyr at klienten deltar i SSO uten begrensning.
- **Tillitsgruppenivå:** en av/på-innstilling per tillitsgruppe. **Dersom tillitsgruppen ikke tillater SSO, overstyrer det klientinnstillingen fullstendig.** Klienten kan ikke oppnå SSO uansett hva den er satt til.

I tillegg finnes en midlertidig pilotordning («Konfigurerbare SSO-unntak for klientkombinasjoner i tillitsgrupper») for ID-porten med eidas-innlogging og Ansattporten. Navngitte klientkombinasjoner beholder SSO selv når tillitsgruppen ellers har SSO avskrudd. Unntakslisten er statisk konfigurert, så enhver endring krever utrulling. Det er få eidas- og Ansattporten-tjenester sammenlignet med ID-porten-tjenester, så piloten er en relativt risikofri måte å høste erfaring på.

Det finnes ingen selvbetjent administrasjonsflate for SSO-konfigurasjon, og ingen måte å dele SSO med et kontrollert sett av andre tjenester. Behovet er en modell der tjenesteeiere kan velge noe midt imellom «ingen deling» og «deling med alle».

<div class="mermaid">
graph TD
    A[Bruker med sesjon fra Klient A kommer til Klient B] --> B{Tillater tillitsgruppen SSO?}
    B -- Ja --> C{Hvilken SSO-modus har Klient B?}
    C -- Isolert --> X[Ingen SSO - må logge inn på nytt]
    C -- Global --> D[SSO tillatt]
    B -- Nei --> X
</div>

*Figur: Dagens evalueringslogikk. To uavhengige av/på-sjekker, ingen mulighet for kontrollert deling.*

## 3. Mål, prinsipper og avgrensning

**Mål**

- Gå fra en binær SSO-modell til tre tydelige og forutsigbare valg.
- Gjøre isolert SSO til standard for nye klienter (Zero Trust-default).
- Gi tjenesteeiere mulighet til kontrollert deling av SSO med et avgrenset sett tjenester, uten å åpne for SSO med alle.
- Legge et grunnlag som passer for både ID-porten og Ansattporten.

**Inkludert:** de tre SSO-modiene, hvordan begrenset SSO kan realiseres, evaluering av sesjoner på tvers av klienter og en eksempel-migreringsplan.

**Ikke inkludert:**

- Konkret teknisk implementasjon (datamodell, API-endringer, kode). Klientregistrerings-API-et støtter ikke de nye modiene i dag.
- Samtykke og delegering på tvers av organisasjoner.
- Endringer i Altinn-autorisasjon.
- SSO handover (kapittel 8).

**Interessenter**

| Interessent | Interesse |
|---|---|
| Virksomhets- og løsningsarkitekter | Målgruppe for notatet, tar stilling til modell |
| Tjenesteeiere (ID-porten-klienter) | Eier egen SSO-konfigurasjon, får nye valg og ny standard for nye klienter |
| Ansattporten | Tverrorganisatorisk tjenesteøkosystem, godt egnet for begrenset SSO |
| Forvaltning av ID-porten | Implementerer og forvalter klientregistrering og SSO-evaluering |

## 4. De tre SSO-modiene

| Modus | Forklaring |
|---|---|
| **Isolert SSO** | Egen, isolert sesjon. Brukeren må logge inn på nytt hos andre tjenester. Foreslås som ny standard for nye klienter. |
| **Global SSO** | Vanlig, delt SSO med enhver annen klient. Dagens standardoppførsel, men foreslås ikke lenger som standard for nye klienter. |
| **Begrenset SSO** (ny) | Klienten kan bruke SSO, men tar bare imot SSO fra eksplisitt godkjente klienter (SSO-relasjoner). |

Tre forhold gjelder for alle modiene:

- **Tillitsgruppen overstyrer.** Dersom tillitsgruppen ikke tillater SSO, ignoreres klientens modus. Resultatet er ingen SSO, uansett om klienten er global eller isolert. Eneste unntak er begrenset modus: er klientkombinasjonen oppført på unntakslisten, kan SSO tillates likevel.
- **Begrenset SSO styrer bare hvem som slipper inn.** Den hindrer ikke at en klient med global SSO gjenbruker en sesjon som er opprettet mot den begrensede klienten.
- **Isolerte klienter deltar aldri** i en delt sesjon.

<div class="mermaid">
graph TD
    A[Bruker med sesjon fra Klient A kommer til Klient B] --> B{Tillater tillitsgruppen SSO?}
    B -- Ja --> C{Hvilken SSO-modus har Klient B?}
    C -- Isolert --> X[Ingen SSO]
    C -- Global --> D[SSO tillatt]
    C -- Begrenset --> E{Er sesjonen godkjent etter Klient Bs evalueringstype, strict eller lax?}
    E -- Ja --> D
    E -- Nei --> X
    B -- Nei --> F{Begrenset modus og oppført på unntaksliste?}
    F -- Ja --> E
    F -- Nei --> X
</div>

*Figur: Foreslått evalueringslogikk. Tillitsgruppekontrollen beholdes, men suppleres med et tredje, mer finkornet valg per klient.*

| Modus | Fordeler | Ulemper |
|---|---|---|
| Isolert | Høyest isolasjon, enklest å forstå, lavest risiko, god Zero Trust-standard | Dårligere brukeropplevelse, vanskeligere å knytte tjenester sammen i en brukerflyt senere |
| Global | Mest sømløs opplevelse, minst friksjon | Lavere isolasjon, større konsekvensområde ved kompromittert sesjon, lite kontroll over hvem som deler SSO |
| Begrenset | Balanse mellom sikkerhet og brukeropplevelse, kontrollert tillit | Krever konfigurasjon, noe mer kompleks å forstå |

## 5. Begrenset SSO: konfigurert på klient

Hver organisasjons administrator angir hvilke klient-id-er (og eventuelt senere organisasjonsnumre, se 5.2) som har lov til å dele SSO inn til klienten. Hver slik tillatelse er en SSO-relasjon. Modellen kan forankres i et mønster som allerede finnes, der klienten har en liste over relasjoner til andre parter.

**Egenskaper**

- Enklest å innføre teknisk. Ligner vanlig klientkonfigurasjon og krever ikke nytt administrasjonsobjekt eller ny rollemodell.
- Høy kontroll per klient, og godt egnet når det typisk er 2–3 klienter som skal kobles sammen.
- Kan fungere som en rask MVP som lar oss høste erfaring med begrenset SSO.

**Svakheter**

- Enkelt å forstå per klient, men vanskelig å få oversikt over alle relasjonene samlet. Relasjonene kan over tid bli en skjult graf fremfor tydelige grupper.
- Risiko for inkonsistent eller asymmetrisk konfigurasjon, og vanskeligere å auditere.
- Lister per klient kan bli lange og skalere dårlig, og modellen passer dårligere for store eller tverrorganisatoriske oppsett.

### 5.1 SSO-relasjoner er rettede og krever eksplisitt samtykke fra mottakeren

En SSO-relasjon bestemmer hvem som slipper inn til *egen* klient, og sier ingenting om hvorvidt den andre klienten stoler på den første.

- Legger klient B til klient A som SSO-relasjon, kan en bruker med sesjon fra A få SSO inn til B. Det gir ikke SSO fra B til A.
- Skal SSO fungere begge veier, må eieren av A også legge til B på A.
- Dette gjelder uavhengig av om klientene tilhører samme organisasjon eller ulike organisasjoner.

For en klient med begrenset SSO er samtykket eksplisitt: eieren konfigurerer SSO-relasjonene og velger evalueringstype. Med strict må alle klientene i sesjonen være godkjent; med lax må bare startklienten være godkjent (se 6.3). Derfor trenger ikke en annen organisasjon å godkjenne at klienten din legger dem til. Relasjonen gir bare din klient mulighet til å slippe dem inn.

Toveis SSO krever to separate konfigurasjoner, som lett kommer ut av synk. En skisse av selvbetjening som gjør dette enklere finnes i vedlegg A.

### 5.2 Vurderer: hvitelisting av organisasjonsnummer

Vi vurderer å la klienteier i tillegg legge til **organisasjonsnumre** som SSO-relasjon, i stedet for å liste hver enkelt klient-id. Alle klienter som tilhører en godkjent organisasjon regnes da som SSO-relasjoner på klienten.

Eksempel: virksomhet A konfigurerer klientene sine til å stole på alt fra virksomhet A og virksomhet B. Da slipper nye klienter hos A og B inn uten at listen må oppdateres.

- Fjerner behovet for å vedlikeholde lange lister med klient-id-er, og passer godt for virksomheter som har mange klienter.
- Relasjonen er fortsatt rettet (se 5.1) og eies av mottakeren: A godkjenner B, og det gir ikke SSO fra A til B.
- Gir bredere tillit enn en enkeltklient, siden også fremtidige klienter hos den godkjente organisasjonen slipper inn. Det må veies mot behovet for kontroll, og påvirker hvordan strict og lax evalueres (kapittel 6).

Dette er ikke bestemt, men er tenkt som fase 4 i kapittel 10. **Vi ønsker tilbakemelding på om dette er noe dere har behov for**, og på:

- om det er ønskelig å kunne godkjenne en hel organisasjon, eller om dere heller vil liste enkeltklienter,
- om det bør være mulig å kombinere organisasjoner og enkeltklienter i samme liste,
- om bredere tillit til fremtidige klienter hos en godkjent organisasjon er akseptabelt.

## 6. Sesjoner på tvers av klienter: hva skal skje?

Dette er punktet vi særlig ønsker innspill på.

SSO-relasjoner er enkle å resonnere om når to klienter vurderes isolert. Det blir uklart når én brukersesjon har vært innom flere klienter. Sesjonen holder da en liste over alle klientene (RP-ene) den har vært brukt mot, og en klient som skal gi SSO må ta stilling til hele denne listen, ikke bare til klienten brukeren kom fra.

### 6.1 Scenarioer og foreslått utfall

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

## 7. Alternativer som er vurdert

| Alternativ | Vurdering |
|---|---|
| **Konfigurert på klient** | Anbefalt. Se kapittel 5. |
| **Sentralisert modell (SSO-gruppe)** | Vurdert, ikke tatt videre nå. |
| **Behold dagens to modi, gjør global SSO opt-in** | Ikke valgt. Løser ikke behovet for kontrollert deling, siden valget fortsatt er alt eller ingenting. |

**Sentralisert modell.** En SSO-gruppe ville blitt et eget administrasjonsobjekt, eid av en organisasjon eller delegert administrator, der medlemmer deler SSO seg imellom. Vi velger å ikke gå videre med dette nå fordi:

- det krever et nytt administrasjonsobjekt og en rollemodell, med regler for eierskap, delegering og godkjenning,
- det er vesentlig dyrere å realisere, blant annet fordi det forutsetter støtte i autorisasjonsløsning og samtykkeprosesser,
- grupper må forvaltes løpende, og kan bli foreldet eller få medlemmer som ikke lenger skal være der,
- det må avklares hva som skjer når en klient er med i flere grupper, og modellen støtter ikke ensidig tillit.

Den er best egnet for store grupper (over ca. 5 klienter) og tverrorganisatoriske behov, og kan revurderes dersom SSO-relasjonene blir store og uoversiktlige (se kapittel 9).

## 8. Fremtidig utvidelse: SSO handover

SSO handover er en mulig senere utvidelse der man kan sende med kontekst når en bruker går fra én tjeneste til en annen via SSO. Dette er ikke en del av forslaget, og er ikke beskrevet nærmere her. SSO-relasjonene kan bli et naturlig grunnlag for å avgjøre mellom hvilke klienter slik kontekst kan sendes.

## 9. Konsekvenser

**Gevinster**

- Tydeligere og mer forutsigbar SSO-modell, med tre klart definerte valg.
- Bedre sikkerhetsstandard for nye klienter (isolert som standard).
- Kontrollert deling av SSO mellom et avgrenset sett tjenester, uten full åpenhet.
- Et mulig grunnlag som dekker behovene til både ID-porten og Ansattporten.

**Risiko**

| Risiko | Kommentar |
|---|---|
| Konfigurasjon per klient kan bli uoversiktlig over tid | Risiko for asymmetrisk eller inkonsistent konfigurasjon og vanskelig auditering ved mange klienter. Reduseres med konsistensvalidering og oversikt i selvbetjening. |
| Sesjoner på tvers av klienter gir uventede utfall | Strict kan gi avvisninger som virker overraskende, og lax gir transitiv tillit. Reduseres med dokumentasjon, validering og at strict er standard (kapittel 6). |
| Migrering av eksisterende klienter | Eksisterende klienter må mappes til riktig modus basert på dagens konfigurasjon. |
| Endret standard for nye klienter påvirker brukeropplevelse | Isolert som standard kan oppleves som et skritt tilbake for tjenesteeiere som forventer global SSO. |

**Forvaltning**

- Forvaltningen av ID-porten må støtte de nye modiene i klientregistrering.
- Pilotordningen er midlertidig og bør ses i sammenheng med valgt løsning.

## 10. Videre arbeid

Eksempel på migreringsplan:

- **Fase 0 (nå):** Begrenset SSO som MVP. Vi har erfaring fra Skatt i ID-porten (eidas-innlogging) og interne selvbetjeningsløsninger i Ansattporten.
- **Fase 1:** Innføre eksplisitt SSO-policy med tre valg. Eksisterende klienter settes til isolert eller global ut fra dagens konfigurasjon.
- **Fase 2:** Gjøre isolert til standard for nye klienter. Eksisterende klienter beholder dagens konfigurasjon.
- **Fase 3:** Selvbetjening for klienteier: eier kan selv legge til SSO-relasjoner, både i og utenfor egen organisasjon.
- **Fase 4:** Ved behov, la klienteier hviteliste hele organisasjoner (organisasjonsnummer) som SSO-relasjon, slik at f.eks. virksomhet A stoler på alle klienter fra A og B (se 5.2).
- **Opsjon A:** Sentralisert SSO-gruppe, dersom SSO-relasjonene blir store og uoversiktlige.
- **Opsjon B:** Gjensidig deling på tvers av organisasjoner, med samtykkeløsning og eventuelt roller i autorisasjonsløsningen. På sikt kan global SSO fases ut.
- **Opsjon C:** SSO handover (kapittel 8).

<div class="mermaid">
graph LR
    F0[Fase 0: Begrenset SSO som MVP] --> F1[Fase 1: Eksplisitt SSO-policy]
    F1 --> F2[Fase 2: Isolert som standard]
    F2 --> F3[Fase 3: Selvbetjening for klienteier]
    F3 --> F4[Fase 4: Hvitelisting av organisasjonsnummer]
    F4 -. opsjon .-> OA[Opsjon A: Sentralisert SSO-gruppe]
    F4 -. opsjon .-> OB[Opsjon B: Samtykke på tvers av org]
    F4 -. opsjon .-> OC[Opsjon C: SSO handover]
</div>

## Vedlegg A: Skisse av selvbetjening for SSO-relasjoner

Dette er en skisse til fase 3, ikke en ferdig spesifikasjon.

**Legge til SSO-relasjon**

- Eier av klient A legger til en relasjon ved å skrive inn klient-id til klient B. Relasjonen er rettet (se 5.1) og gjelder umiddelbart for SSO inn til A.
- Det er ikke noe godkjenningssteg hos B, siden relasjonen bare påvirker hvem som slipper inn til A.

**Synlighet for den andre parten**

- Eier av B ser en oversikt over hvilke klienter som har lagt til B («innkommende relasjoner»), ved siden av egne utgående.
- Eier av B kan gjengjelde med ett valg fra oversikten, la relasjonen være ensidig, eller legge til A på egen hånd med fritekst. Selvbetjeningen skal ikke kreve at relasjonen først er synlig som innkommende.
- Eier av B kan ikke fjerne eller endre relasjonen A har lagt til. Den kan bare fjernes av eier av A.
- Alle endringer logges i en changelog som viser hvem som gjorde endringen og når.
