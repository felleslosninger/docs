---
title: SSO-grupper i ID-porten (pilot)
description: Løsningsforslag til beslutning
summary:

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper
---

## 1. Bakgrunn og formål

ID-portens SSO-modell lar en bruker som allerede har autentisert seg for én klient, gjenbruke sesjonen når vedkommende kommer til en annen klient, i stedet for å måtte autentisere seg på nytt.

Om slikt gjenbruk er *tillatt* mellom to gitte klienter, er i realiteten en tillitsbeslutning — å dele en sesjon betyr at én klients autentiseringshendelse nå også dekker en annen klients brukere. I dag er denne tillitsbeslutningen grovkornet og binær (på/av), og det finnes ingen måte å kontrollere SSO-deling mellom et avgrenset, eksplisitt sett med klienter.

Dette notatet presenterer tre overordnede SSO-modeller og tre alternativer for hvordan den mest restriktive av dem («SSO-gruppe») kan realiseres, sammen med en eksempel-migreringsplan.

## 2. Problemstilling og behov

I dag styres tillitsbeslutningen om SSO av to uavhengige, grovkornede mekanismer:

- **Klientnivå, binært:** en av-/på-innstilling på klienten. Av betyr at klienten kun støtter klientbundne sesjoner; SSO deles aldri, i noen retning.
- **Tillitsgruppenivå:** en av-/på-innstilling per autentiseringsnivå/tillitsgruppe (f.eks. «idporten», "ansattporten", «eidas»). Svarer på om dette autentiseringsnivået i det hele tatt tillater SSO, uavhengig av hvilke spesifikke klienter det gjelder. **Dersom tillitsgruppen ikke tillater SSO, overstyrer dette klientinnstillingen fullstendig — det vil si at klienten ikke kan oppnå SSO uansett hva den er satt til.**

I tillegg finnes en pilotmekanisme (ID-6864, «Konfigurerbare SSO-unntak for klientkombinasjoner i tillitsgrupper»), som gjelder ID-porten med eidas-innlogging og Ansattporten. Den lar navngitte klientkombinasjoner beholde SSO selv når gruppen ellers har SSO avskrudd. Piloten er uttrykkelig dokumentert som midlertidig: unntakslisten er statisk konfigurert, så enhver endring krever en utrulling. Den er en relativt risikofri pilot for å høste erfaring, siden det er få eidas- eller Ansattporten-tjenester sammenlignet med ID-porten-tjenester.

Det finnes ingen selvbetjent administrasjonsflate for klientkonfigurasjon av SSO i dag. Behovet er en modell der tjenesteeiere kan dele SSO med et kontrollert, eksplisitt sett med andre tjenester — uten å måtte velge mellom «ingen deling» og «deling med alle».

## 3. Mål og prinsipper

- Gå fra en binær SSO-modell (ja/nei) til en modell med tre tydelige og forutsigbare valg.
- Gjøre isolert SSO til standard for nye klienter (Zero Trust-default), fremfor dagens globale standard.
- Gi tjenesteeiere mulighet til kontrollert, gjensidig avtalt deling av SSO med et avgrenset sett tjenester, uten å måtte åpne for SSO med alle.
- Legge et grunnlag som er egnet både for ID-porten og Ansattporten.

## 4. Omfang og avgrensning

**Inkludert:**
- Tre overordnede SSO-modeller: isolert, global og begrenset («SSO-gruppe»).
- Tre alternative modeller for hvordan den begrensede modusen kan realiseres.
- En eksempel-migreringsplan fra dagens situasjon til målbildet.

**Ikke inkludert / avgrenset bort:**
- Konkret teknisk implementasjon (datamodell, API-endringer, kodeendringer). Klientregistrerings-API-et støtter i dag ikke noen av de nye modusene.
- Valg av løsning for samtykke/delegering på tvers av organisasjoner (relevant for gjensidige SSO-grupper, skissert som mulig fremtidig behov i migreringsplanen, men ikke besluttet her).
- Endringer i Altinn-autorisasjon (nevnt som en mulig fremtidig byggekloss for ett av alternativene, ikke en forutsetning for beslutningen).

## 5. Interessenter

| Interessent | Rolle / interesse | Berørt av forslaget |
|---|---|---|
| Virksomhets-/løsningsarkitekter | Målgruppe for notatet, skal ta stilling til modell | Beslutter retning |
| Tjenesteeiere (ID-porten-klienter) | Eier egen SSO-konfigurasjon | Får nye valgmuligheter og ev. endret standardoppførsel for nye klienter |
| Ansattporten | Tverrorganisatorisk tjenesteøkosystem, pekes på som godt egnet for begrenset SSO | Mulig fremtidig bruker av samme modell |
| Forvaltning av ID-porten | Drifter og videreutvikler klientregistrering og SSO-evaluering | Må implementere og forvalte ny modell |

## 6. Dagens situasjon

I dag styres SSO-deling av to uavhengige, grovkornede mekanismer (se kapittel 2):

1. En binær klientinnstilling som enten slår av all SSO-deling for klienten, eller lar klienten delta i SSO uten videre begrensning.
2. En binær innstilling per tillitsgruppe/autentiseringsnivå som avgjør om SSO er tillatt i det hele tatt for det nivået. Dersom tillitsgruppen ikke tillater SSO, overstyrer dette klientinnstillingen fullstendig — klienten kan ikke oppnå SSO uansett hva den er satt til.

I tillegg finnes en midlertidig pilotordning, som gjelder ID-porten med eidas-innlogging og Ansattporten, og som gir et begrenset sett navngitte klientkombinasjoner unntak fra en avskrudd tillitsgruppe, konfigurert i en statisk liste uten selvbetjening.

Det finnes ingen selvbetjent administrasjonsflate for klientkonfigurasjon av SSO noe sted i dag, og ingen måte å dele SSO med et kontrollert, avgrenset sett av andre tjenester.

<div class="mermaid">
graph TD
    A[Bruker med sesjon fra Klient A kommer til Klient B] --> B{Tillater tillitsgruppen SSO?}
    B -- Ja --> C{Hvilken SSO-modus har Klient B?}
    C -- Isolert --> X[Ingen SSO - må logge inn på nytt]
    C -- Global --> D[SSO tillatt]
    B -- Nei --> X
</div>

*Figur: Dagens evalueringslogikk for SSO - to uavhengige av/på-sjekker, ingen mulighet for kontrollert deling med et avgrenset sett tjenester.*

## 7. Beskrivelse av løsningsforslaget

Forslaget er å gå fra dagens binære modell (ja/nei) til tre tydelige SSO-modi som kan velges per klient:

| Modus | Forklaring |
|---|---|
| **Isolert SSO** | Tjenesten har egen, isolert SSO-sesjon. Brukeren må logge inn på nytt når hen går til andre tjenester. Ingen SSO-deling i noen retning. Foreslås som ny standard for nye klienter. |
| **Global SSO** | Tjenesten deltar i vanlig, delt SSO med enhver annen klient, betinget av tillitsgruppekontrollen. Dette er dagens standardoppførsel, men foreslås å ikke lenger være standard for nye klienter. |
| **Begrenset SSO / SSO-gruppe** (ny) | Klienten kan bruke SSO, men bare med eksplisitt godkjente tjenester. Gir kontrollert deling fremfor alt-eller-ingenting. Det er ingen begrensning på at andre kan dele SSO mot en tjeneste utenfor gruppen — begrensningen gjelder kun hvem som slipper inn, ikke om sesjonen som er opprettet mot klienten kan gjenbrukes hos andre klienter. Merk: dersom tillitsgruppen ikke tillater SSO, **ignoreres klientens SSO-modus fullstendig** — det spiller ingen rolle om klienten er satt til global eller isolert, resultatet blir uansett ingen SSO. Eneste unntak er begrenset modus: dersom klientkombinasjonen er oppført på unntakslisten (pilotmekanismen ID-6864, som gjelder ID-porten med eidas-innlogging og Ansattporten), kan SSO likevel tillates selv om tillitsgruppen sier nei. |

<div class="mermaid">
graph TD
    A[Bruker med sesjon fra Klient A kommer til Klient B] --> B{Tillater tillitsgruppen SSO?}
    B -- Ja --> C{Hvilken SSO-modus har Klient B?}
    C -- Isolert --> X[Ingen SSO]
    C -- Global --> D[SSO tillatt]
    C -- Begrenset --> E{Er Klient A en SSO-relasjon på Klient B?}
    E -- Ja --> D
    E -- Nei --> X
    B -- Nei --> F{Er SSO-modus begrenset?}
    F -- Nei --> X
    F -- Ja --> E{Er Klient A en SSO-relasjon på Klient B?}
</div>

*Figur: Foreslått evalueringslogikk - tillitsgruppekontrollen beholdes uendret, men suppleres med et tredje, mer finkornet valg per klient. Dersom tillitsgruppen ikke tillater SSO, ignoreres global og isolert modus, men begrenset modus kan fortsatt gi SSO via unntakslisten.*

### 7.1 Vurdering av de tre modiene

**Isolert SSO (fremtidig standard for nye klienter)**

- Fordeler: høyest isolasjon, enklest å forstå, lavest risiko, god Zero Trust-standard.
- Ulemper: kan gi dårligere brukeropplevelse, og gjør det vanskeligere å senere knytte flere tjenester sammen i en brukerflyt.

**Global SSO (dagens standard)**

- Fordeler: mest sømløs brukeropplevelse, minst friksjon, enkel modell.
- Ulemper: lavere isolasjon, større konsekvensområde dersom en sesjon kompromitteres, og mindre kontroll over hvem som faktisk deler SSO.

**Begrenset SSO / SSO-gruppe (ny)**

- Fordeler: balanse mellom sikkerhet og brukeropplevelse, kontrollert tillit, passer godt for tjenesteøkosystemer og er egnet for Ansattporten.
- Ulemper: krever mer administrasjon og policy-konfigurasjon, og er en noe mer kompleks modell å forstå enn de to andre.

### 7.2 Alternative måter å realisere SSO-gruppe på

Det er vurdert tre alternative måter å realisere den nye, begrensede modusen på.

**Alternativ 1 – Sentralisert modell**

En SSO-gruppe blir et eget administrasjonsobjekt («SSO-gruppe»), eid og administrert av en organisasjon eller en delegert administrator. Gruppen inneholder et sett med klienter og/eller organisasjoner som kan dele SSO seg imellom. Tilganger til å administrere gruppen kan tenkes forankret i eksisterende autorisasjonsløsning (f.eks. Altinn), slik at en virksomhet selv kan legge til egne klienter, eller eventuelt andre organisasjoner, i sin gruppe.

- Fordeler: Tydelig modell («dette er SSO-gruppa»), enkel å forstå for større oppsett, gir bedre oversikt i selvbetjening, lettere å auditere og forklare, passer godt med målet om å erstatte dagens store, felles SSO-gruppe, mindre risiko for asymmetrisk konfigurasjon, bedre egnet for Ansattporten og tverrorganisatoriske behov, og skalerer bedre.
- Ulemper: Krever et nytt administrasjonsobjekt og en rollemodell for hvem som kan opprette og endre grupper. Krever regler for eierskap, delegering og godkjenning, og gir mer kompleks plattformlogikk. Gruppene må forvaltes løpende: den som har rollen som gruppeadministrator, må holde medlemslisten oppdatert, legge til og fjerne klienter, følge opp når klienter eller organisasjoner endres eller legges ned, og håndtere forespørsler fra andre om å bli med. Det gir en ekstra driftsbyrde for den som sitter med rollen, og risiko for at grupper blir foreldet eller får medlemmer som ikke lenger skal være der. Kan bli byråkratisk dersom flere organisasjoner skal inn i samme gruppe, og er vesentlig dyrere å realisere (forutsetter bl.a. støtte i autorisasjonsløsning og samtykkeprosesser). Det må også avklares hva som skjer når en klient er med i flere grupper, og modellen støtter ikke ensidig tillit (at A stoler på B uten at B stoler på A).
- Passer kanskje best når: SSO-gruppene kan bli større enn ca. 5 klienter, man trenger god oversikt, kunder skal kunne selvbetjene SSO-oppsettet selv, samme modell skal brukes i både ID-porten og Ansattporten, og man ønsker langsiktig styring (governance).

<div class="mermaid">
graph LR
    subgraph SSO-gruppe
        K1[Klient A]
        K2[Klient B]
        K3[Klient C]
    end
</div>

*Figur: Alternativ 1 - klienter er medlemmer av en felles, administrert gruppe. Medlemskap gir SSO med alle andre medlemmer.*

**Alternativ 2 – Konfigurert på klient**

Hver organisasjons administrator styrer selv sine klienter ved å angi hvilke klient-id-er og/eller organisasjonsnumre som har lov til å dele SSO inn til klienten. Hver slik tillatelse kalles en SSO-relasjon. Dette kan forankres i et mønster som allerede finnes: klienten har fra før en tilsvarende liste over relasjoner til andre parter. En slik liste vil være rettet: at en klient tillater en motpart, gir ikke automatisk motparten tilsvarende tillit tilbake.

- Fordeler: Enklere å innføre teknisk, ligner mer på vanlig klientkonfigurasjon, gir høy kontroll per klient, passer godt for små oppsett, krever mindre nytt administrasjonsregime, kan fungere som en rimelig og rask MVP.
- Ulemper: Kan bli uoversiktlig ved mange klienter — enkelt å forstå per klient, men komplisert å få oversikt over alle SSO-relasjonene samlet. Vanskeligere å se hvilke klienter som faktisk deler SSO med hverandre, risiko for inkonsistent eller asymmetrisk konfigurasjon, vanskeligere å auditere, vanskeligere for kunder å administrere selv over tid, og dårligere egnet for store eller tverrorganisatoriske oppsett. Relasjonene kan over tid bli en skjult graf fremfor tydelige grupper, og lister per klient kan bli lange og skalere dårlig.
- Passer kanskje best når: SSO-behovet er lite og enkelt, det typisk er 2–3 klienter som skal kobles sammen, man ønsker rask teknisk innføring, og man ikke trenger avansert selvbetjening eller styring i en første versjon.

<div class="mermaid">
graph LR
    K1[Klient A] -- tillater SSO fra --> K2[Klient B]
    K2 -- tillater SSO fra --> K1
    K2 -- tillater SSO fra --> K3[Klient C]
</div>

*Figur: Alternativ 2 - hver klient har sin egen, rettede liste med SSO-relasjoner. Klient B tillater både A og C, men C tillater ikke B tilbake.*

**Alternativ 3 – Beholde dagens to modi, gjøre SSO opt-in**

Innfører ikke en egen begrenset modus. I stedet beholdes kun isolert og global SSO, men global SSO blir noe tjenesteeier aktivt må velge inn i (opt-in), med isolert som standard.

- Fordeler: Svært enkelt å innføre, kjent modell, enklere for tjenesteeier å forholde seg til.
- Ulemper: Samme risiko som i dag dersom noen glemmer eller gjør feil ved utlogging, og gir fortsatt ikke mulighet for kontrollert deling med et avgrenset sett tjenester — kun alt-eller-ingenting. Dårligere brukerreise for tjenester som faktisk har behov for å dele innlogging.

### 7.3 SSO-relasjoner er ensidige og krever eksplisitt samtykke fra begge parter

Når en klienteier legger en annen klient til som SSO-relasjon (alternativ 2), gjelder relasjonen bare i én retning. Den bestemmer hvem som slipper inn til *egen* klient, og sier ingenting om hvorvidt den andre klienten stoler på den første.

- Legger klient B til klient A som SSO-relasjon, kan en bruker med sesjon fra A få SSO inn til B. Det gir ikke SSO fra B til A.
- Skal SSO fungere begge veier, må eieren av A også legge til B som SSO-relasjon på A.
- Dette gjelder uavhengig av om klientene tilhører samme organisasjon eller ulike organisasjoner.

Dermed er samtykket eksplisitt: en klient får aldri SSO fra en annen klient med mindre eieren av den mottakende klienten uttrykkelig har lagt avsenderen til. Eieren av A kan ikke tvinge SSO inn mot B, og eieren av B kan ikke gi A SSO mot seg selv. Det er også derfor en annen organisasjon ikke trenger å godkjenne at klienten din legger dem til: relasjonen gir kun din klient mulighet til å slippe dem inn, ikke omvendt.

Konsekvensen er at toveis SSO krever to separate konfigurasjoner, én hos hver klienteier, som lett kan komme ut av synk (se 7.4). Tilsvarende modell med gjensidig medlemskap får man først med SSO-grupper (alternativ 1).

### 7.4 Blanding av klienter innenfor og utenfor listen

SSO-relasjoner på klienten (alternativ 2) og gruppemedlemskap (alternativ 1) er enkle å resonnere om når to klienter vurderes isolert. Det blir mer uklart når én brukersesjon har vært innom flere klienter. Sesjonen holder da en liste over alle klientene (RP-ene) den har vært brukt mot, og en klient som skal gi SSO må ta stilling til hele denne listen, ikke bare til klienten brukeren kom fra.

**Scenario 1 – kjede A → B → C**

A har SSO mot B (B tillater A), og B har SSO mot C (C tillater B), men C tillater ikke A. Brukeren logger inn i A, går videre til B (SSO) og så til C. Sesjonen inneholder nå både A og B. Fordi A står i sesjonen og C ikke tillater A, får brukeren ikke SSO mot C, selv om C tillater B.

**Scenario 2 – A deler med både B og C, men C tillater ikke A**

Brukeren logger inn i A og går via B til C. Sesjonen inneholder A og B, og C avviser den fordi A ikke er tillatt. Utfallet er det samme som i scenario 1, og det kan virke overraskende for tjenesteeier på B og C, siden de hver for seg ser ut til å være konfigurert riktig.

I begge tilfellene avhenger utfallet av hvilke klienter brukeren har vært innom og i hvilken rekkefølge. Det gir en brukeropplevelse som er vanskelig å forutsi og å feilsøke.

**Mulige tilnærminger**

| Tilnærming | Beskrivelse | Fordeler | Ulemper |
|---|---|---|---|
| **a) Streng evaluering (dagens pilot)** | Alle klienter i sesjonen må være tillatt av klienten som evaluerer. Ellers ingen SSO, og brukeren må autentisere seg på nytt. | Tillit er ikke transitiv: C har aldri takket ja til at en sesjon fra A deles med C. Enklest og sikrest. | Resultatet avhenger av rekkefølge og er vanskelig å forstå. Uventet innlogging for brukeren. |
| **b) Kun nærmeste ledd** | C vurderer bare klienten brukeren kommer fra (B), ikke resten av sesjonen. | Kjeder fungerer, og resultatet er lettere å forutsi. | Gir transitiv tillit: C får i praksis SSO fra A uten å ha godkjent A. Svekker kontrollen som den begrensede modusen skal gi. |
| **c) Konsistensvalidering ved konfigurasjon** | Selve evalueringen er streng (a), men konfigurasjonen varsler eller avviser kombinasjoner som gir kjeder som ikke fungerer, f.eks. «B tillater A, men C tillater B og ikke A». | Feilen oppdages ved oppsett i stedet for hos sluttbruker. Krever ingen endring av tillitsmodellen. | Krever verktøy/selvbetjening for å se hele grafen, noe som er vanskelig med tillatelseslister per klient. |
| **d) Lukkede grupper (alternativ 1)** | Alle medlemmer i en gruppe tillater hverandre. Klienter som ikke er i gruppen, kan ikke koble seg inn på en sesjon som inneholder gruppemedlemmer. | Problemet oppstår ikke innenfor gruppen, og gruppen er en tydelig avgrensning. | Dyrere å realisere. Klient som er medlem i flere grupper, må avklares. |

**Forslag**

Vi foreslår å beholde **streng evaluering (a)**: tillit mellom klienter skal ikke være transitiv, og en klient skal bare kunne få SSO fra en sesjon der alle deltakerne er godkjent. Dette er også dagens pilotatferd. For å redusere forvirringen foreslår vi i tillegg at:

- atferden dokumenteres tydelig for tjenesteeiere, med eksempler som scenarioene over,
- SSO-relasjonene mellom klientene holdes konsistente, slik at alle klienter som kan inngå i samme sesjon, tillater hverandre,
- det vurderes konsistensvalidering (c) i selvbetjeningen, og at dette brukes som et argument for å gå videre til alternativ 1 (lukkede grupper) dersom gruppene blir store.

Dette er et forslag som bør bekreftes, og det er et åpent spørsmål om det finnes tilfeller der nærmeste ledd (b) er akseptabelt, for eksempel når A og C eies av samme organisasjon.

### 7.5 Mulig selvbetjening for SSO-relasjoner

Dersom alternativ 2 velges, kan selvbetjening starte enkelt. Dette er en skisse til fase 3 i migreringsplanen, ikke en ferdig spesifikasjon.

**Grunnfunksjon: legge til SSO-relasjon**

- Eier av klient A legger til en SSO-relasjon ved å skrive inn klient-id til klient B i et fritekstfelt. Relasjonen er rettet (se 7.3), og gjelder umiddelbart for SSO inn til A.
- Det er ikke noe godkjenningssteg hos B, siden relasjonen bare påvirker hvem som slipper inn til A.

**Synlighet for den andre parten**

- Eier av klient B ser en oversikt over hvilke klienter som har lagt til B som SSO-relasjon («innkommende relasjoner»), ved siden av egne utgående relasjoner.
- Eier av B kan velge å:
  - **gjengjelde** ved å legge A til som SSO-relasjon på B, slik at SSO blir toveis. Dette kan gjøres med ett valg fra oversikten, uten å skrive inn klient-id på nytt,
  - **la være**, slik at relasjonen forblir ensidig, eller
  - **legge til A på egen hånd** med fritekst, basert på avtale eller kommunikasjon utenfor selvbetjeningen. Selvbetjeningen skal ikke kreve at relasjonen først er synlig som innkommende.
- Eier av B kan ikke fjerne eller endre relasjonen A har lagt til. Den kan bare fjernes av eier av A.
- Alle endringer i SSO-relasjoner (legge til, fjerne) logges i en changelog som viser hvem som gjorde endringen og når. Det gjør det mulig å se hvem som la til en relasjon, og å etterprøve endringer i ettertid.

**Forhold som bør avklares**

- **Validering av fritekst:** skal systemet avvise klient-id-er som ikke finnes, eller godta alt? Å avvise gir færre feil (skrivefeil), men kan avsløre om en gitt klient-id finnes hos en annen organisasjon.
- **Hva B får se om A:** minimum klient-id. Klientnavn og organisasjon gjør det lettere å vurdere om man vil gjengjelde, men må veies mot hva som er greit å eksponere på tvers av organisasjoner.
- **Varsling:** skal eier av B varsles (e-post eller i løsningen) når en ny innkommende relasjon dukker opp, eller er det nok at den er synlig i oversikten?
- **Konsistens:** oversikten over innkommende og utgående relasjoner gjør det lettere å oppdage asymmetri og kjeder som ikke fungerer (se 7.4), og er et første steg mot konsistensvalidering.

Fordelen med denne tilnærmingen er at den gir eksplisitt samtykke (7.3) uten et eget godkjenningsregime, og kan bygges på eksisterende klientkonfigurasjon. Ulempen er at oversikten fortsatt er per klient, og at det ikke finnes noen samlet visning av hvem som faktisk deler SSO med hvem før man eventuelt går videre til SSO-grupper (alternativ 1).

## 8. Alternativer som er vurdert

| Alternativ | Beskrivelse | Fordeler (hovedpunkt) | Ulemper (hovedpunkt) |
|---|---|---|---|
| 1 – Sentralisert modell | Egen administrasjonsobjekt («SSO-gruppe») med egen rollemodell og selvbetjening | Tydelig, godt egnet for store/tverrorganisatoriske oppsett, god oversikt og auditerbarhet | Nytt administrasjonsobjekt, ny rollemodell, løpende forvaltning av gruppene, vesentlig dyrere å realisere |
| 2 – Konfigurert på klient | SSO-relasjoner (tillatte klienter/organisasjoner) lagret direkte på hver klient | Raskt og billig å innføre, kan fungere som MVP | Uoversiktlig i stort omfang, risiko for asymmetrisk konfigurasjon, vanskelig å auditere |
| 3 – Behold dagens modi, opt-in global SSO | Kun isolert og global SSO, global blir opt-in i stedet for standard | Enklest å innføre, kjent modell | Løser ikke behovet for kontrollert, avgrenset deling |

## 9. Konsekvenser

### 9.1 Gevinster

- Tydeligere og mer forutsigbar SSO-modell for tjenesteeiere, med tre klart definerte valg i stedet for en binær av/på-innstilling.
- Bedre sikkerhetsstandard for nye klienter (isolert som standard, Zero Trust-tilnærming).
- Mulighet for kontrollert deling av SSO mellom et avgrenset sett tjenester, uten å måtte velge full åpenhet.
- Et mulig fremtidig grunnlag som dekker behovene til både ID-porten og Ansattporten.

### 9.2 Risiko

| Risiko | Kommentar |
|---|---|
| Alternativ 1 (sentralisert) kan bli dyrt og ta lang tid å realisere | Forutsetter nytt administrasjonsobjekt, rollemodell og ev. støtte i autorisasjonsløsning |
| Alternativ 2 (konfigurert på klient) kan bli uoversiktlig over tid | Risiko for asymmetrisk/inkonsistent konfigurasjon og vanskelig auditering ved mange klienter |
| Migrering av eksisterende klienter til ny modell | Eksisterende klienter må mappes til riktig modus basert på dagens konfigurasjon |
| Endret standard for nye klienter kan påvirke brukeropplevelse | Isolert som ny standard kan oppleves som et skritt tilbake for tjenesteeiere som i dag forventer global SSO |

### 9.3 Organisatoriske og forvaltningsmessige konsekvenser

- Forvaltningen av ID-porten må implementere støtte for de nye modiene i klientregistrering, som i dag ikke støtter dette.
- Alternativ 1 forutsetter en rollemodell for hvem som kan opprette/endre SSO-grupper, samt regler for eierskap, delegering og godkjenning.
- Dagens pilotordning (ID-6864) er midlertidig og bør ses i sammenheng med valgt løsning videre.

## 10. Anbefaling

Vi anbefaler å gå for **alternativ 2 (konfigurert på klient)** i første omgang. Alternativet er enklest å implementere teknisk, da det bygger på eksisterende klientkonfigurasjon uten behov for nye administrasjonsobjekter eller rollemodeller. Det er også enkelt å forstå: hver klient har sin egen liste over hvilke andre klienter den tillater SSO fra. Alternativet kan fungere som en god MVP som gir rask gevinst og lar oss høste erfaring med begrenset SSO i praksis.

Vi er åpne for at **alternativ 1 (sentralisert modell)** kan implementeres på et senere tidspunkt, dersom behovet for bedre oversikt, selvbetjening og tverrorganisatorisk bruk (bl.a. Ansattporten) vokser. Migreringsplanen i kapittel 12 er lagt opp slik at man kan starte med alternativ 2 og eventuelt abstrahere til en sentralisert gruppemodell i fase 6, dersom SSO-relasjonene blir store og uoversiktlige.

## 11. Beslutning som ønskes

Det bes om beslutning på:

1. At SSO-modellen i ID-porten endres fra en binær modell til tre eksplisitte SSO-modi: isolert, global og begrenset («SSO-gruppe»), som beskrevet i kapittel 7.
2. At isolert SSO settes som ny standard for nyopprettede klienter.
3. Hvilket av de tre alternativene (kapittel 7.2/8) som skal legges til grunn for realisering av den begrensede modusen, eventuelt som en trinnvis tilnærming i tråd med migreringsplanen i kapittel 12.
4. Hvordan sesjoner som inneholder både klienter som er definert som SSO-relasjoner og klienter som ikke er det, skal evalueres (kapittel 7.4). Forslaget er streng evaluering, der alle klienter i sesjonen må være tillatt, kombinert med dokumentasjon og konsistensvalidering av konfigurasjonen.

## 12. Videre arbeid

Eksempel på migreringsplan fra dagens situasjon til målbildet:

- **Fase 0 (nå)** – Begrenset SSO som MVP: vi har allerede erfaring med begrenset SSO i praksis gjennom Skatt i ID-porten (eidas-innlogging) og interne selvbetjeningsløsninger i Ansattporten. Denne erfaringen legges til grunn for beslutningen om videre retning.
- **Fase 1** – Innføre eksplisitt SSO-policy med tre valg: isolert, global, begrenset. Eksisterende klienter settes til henholdsvis isolert eller global, avhengig av dagens konfigurasjon.
- **Fase 2** – Gjøre isolert til standard for nye klienter. Global SSO blir noe man aktivt må velge inn i. Eksisterende klienter beholder allerede konfigurert SSO, slik at endringen av standard kun gjelder nyopprettede klienter.
- **Fase 3** – Selvbetjening for klienteier: eier av en klient kan selv legge til SSO-relasjoner til klienter, både i og utenfor egen organisasjon. Relasjonen er rettet og styrer bare hvem som slipper inn til egen klient, så den trenger ikke samtykke fra eier av den andre klienten (avhengig av valgt modell).
- **Fase 4** – Ved behov: mulighet for å legge til hele organisasjoner (organisasjonsnummer) som SSO-relasjon, og ikke bare enkeltklienter.
- **Opsjon A** – Eventuell abstraksjon til SSO-grupper dersom SSO-relasjonene blir store og uoversiktlige; kan da provisjoneres ned til samme nivå som SSO-relasjonene i MVP-en.
- **Opsjon B** – Gjensidig deling på tvers av organisasjoner: dersom SSO-grupper (alternativ 1) skal ha medlemmer fra flere organisasjoner, innføre en samtykkeløsning, eventuelt etablere roller i autorisasjonsløsningen. På sikt kan det vurderes å fase ut global SSO helt.

<div class="mermaid">
graph LR
    F0[Fase 0: Begrenset SSO som MVP] --> F1[Fase 1: Eksplisitt SSO-policy]
    F1 --> F2[Fase 2: Isolert som standard]
    F2 --> F3[Fase 3: Selvbetjening for klienteier]
    F3 --> F4[Fase 4: Hele organisasjoner som SSO-relasjon]
    F4 -. opsjon .-> OA[Opsjon A: Abstraksjon til SSO-grupper]
    F4 -. opsjon .-> OB[Opsjon B: Samtykke for gjensidige grupper på tvers av org]
</div>
