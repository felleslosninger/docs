---
title: SSO-grupper i ID-porten - løsningsforslag
description: Løsningsforslag til beslutning
summary:

sidebar: idporten_sidebar
product: ID-porten
redirect_from: /idporten_sso_grupper
---

## Dokumentinformasjon

| Felt | Verdi |
|---|---|
| Tittel | SSO-grupper i ID-porten |
| Målgruppe | Virksomhets-/løsningsarkitekter |
| Status | Diskusjonsgrunnlag / målarkitektur |
| Eier | *Navn / rolle* |
| Forfatter(e) | *Navn* |
| Dato | *dd.mm.åååå* |
| Beslutningstaker | *Navn / forum (f.eks. arkitekturråd, styringsgruppe)* |
| Beslutningsdato | *dd.mm.åååå* |

## 1. Bakgrunn og formål

ID-portens SSO-modell lar en bruker som allerede har autentisert seg for én klient, gjenbruke den økten når vedkommende kommer til en annen klient, i stedet for å måtte autentisere seg på nytt.

Om slikt gjenbruk er *tillatt* mellom to gitte klienter, er i realiteten en tillitsbeslutning — å dele en økt betyr at én klients autentiseringshendelse nå også dekker en annen klients brukere. I dag er denne tillitsbeslutningen grovkornet og binær (på/av), og det finnes ingen måte å kontrollere SSO-deling mellom et avgrenset, eksplisitt sett med klienter.

Dette notatet presenterer tre overordnede SSO-modeller og tre alternativer for hvordan den mest restriktive av dem («SSO-gruppe») kan realiseres, sammen med en eksempel-migreringsplan.

## 2. Problemstilling og behov

I dag styres tillitsbeslutningen om øktgjenbruk av to uavhengige, grovkornede mekanismer:

- **Klientnivå, binært:** en av-/på-innstilling på klienten. Av betyr at klienten kun støtter klientbundne økter; SSO deles aldri, i noen retning.
- **Tillitsgruppenivå:** en av-/på-innstilling per autentiseringsnivå/tillitsgruppe (f.eks. «idporten», «eidas»). Svarer på om dette autentiseringsnivået i det hele tatt tillater øktgjenbruk, uavhengig av hvilke spesifikke klienter det gjelder.

I tillegg finnes en pilotmekanisme (ID-6864, «Konfigurerbare SSO-unntak for klientkombinasjoner i tillitsgrupper») som lar navngitte klientkombinasjoner beholde SSO selv når gruppen ellers har SSO avskrudd. Piloten er uttrykkelig dokumentert som midlertidig: unntakslisten er statisk konfigurert, så enhver endring krever en utrulling. Den er en relativt risikofri pilot for å høste erfaring, siden det er få eidas- eller Ansattporten-tjenester sammenlignet med ID-porten-tjenester.

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
- Valg av løsning for samtykke/delegering på tvers av organisasjoner (skissert som mulig fremtidig behov i migreringsplanen, men ikke besluttet her).
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
2. En binær innstilling per tillitsgruppe/autentiseringsnivå som avgjør om øktgjenbruk er tillatt i det hele tatt for det nivået.

I tillegg finnes en midlertidig pilotordning som gir et begrenset sett navngitte klientkombinasjoner unntak fra en avskrudd tillitsgruppe, konfigurert i en statisk liste uten selvbetjening.

Det finnes ingen selvbetjent administrasjonsflate for klientkonfigurasjon av SSO noe sted i dag, og ingen måte å dele SSO med et kontrollert, avgrenset sett av andre tjenester.

## 7. Beskrivelse av løsningsforslaget

Forslaget er å gå fra dagens binære modell (ja/nei) til tre tydelige SSO-modi som kan velges per klient:

| Modus | Forklaring |
|---|---|
| **Isolert SSO** | Tjenesten har egen, isolert SSO-sesjon. Brukeren må logge inn på nytt når hen går til andre tjenester. Ingen SSO-deling i noen retning. Foreslås som ny standard for nye klienter. |
| **Global SSO** | Tjenesten deltar i vanlig, delt SSO med enhver annen klient, betinget av tillitsgruppekontrollen. Dette er dagens standardoppførsel, men foreslås å ikke lenger være standard for nye klienter. |
| **Begrenset SSO / SSO-gruppe** (ny) | Klienten kan bruke SSO, men bare med eksplisitt godkjente tjenester. Gir kontrollert deling fremfor alt-eller-ingenting. Det er ingen begrensning på at andre kan dele SSO mot en tjeneste utenfor gruppen — begrensningen gjelder kun hvem som slipper inn, ikke om klienten kan deles ut til andre. |

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

En SSO-gruppe blir et eget administrasjonsobjekt («SSO-øy»), eid og administrert av en organisasjon eller en delegert administrator. Gruppen inneholder et sett med klienter og/eller organisasjoner som kan dele SSO seg imellom. Tilganger til å administrere gruppen kan tenkes forankret i eksisterende autorisasjonsløsning (f.eks. Altinn), slik at en virksomhet selv kan legge til egne klienter, eller eventuelt andre organisasjoner, i sin gruppe.

- Fordeler: Tydelig modell («dette er SSO-øya»), enkel å forstå for større oppsett, gir bedre oversikt i selvbetjening, lettere å auditere og forklare, passer godt med målet om å erstatte dagens store, felles SSO-gruppe, mindre risiko for asymmetrisk konfigurasjon, bedre egnet for Ansattporten og tverrorganisatoriske behov, og skalerer bedre.
- Ulemper: Krever et nytt administrasjonsobjekt og en rollemodell for hvem som kan opprette og endre grupper. Krever regler for eierskap, delegering og godkjenning, og gir mer kompleks plattformlogikk. Kan bli byråkratisk dersom flere organisasjoner skal inn i samme gruppe, og er vesentlig dyrere å realisere (forutsetter bl.a. støtte i autorisasjonsløsning og samtykkeprosesser). Det må også avklares hva som skjer når en klient er med i flere grupper, og modellen støtter ikke ensidig tillit (at A stoler på B uten at B stoler på A).
- Passer kanskje best når: SSO-gruppene kan bli større enn ca. 5 klienter, man trenger god oversikt, kunder skal kunne selvbetjene SSO-oppsettet selv, samme modell skal brukes i både ID-porten og Ansattporten, og man ønsker langsiktig styring (governance).

**Alternativ 2 – Konfigurert på klient**

Hver organisasjons administrator styrer selv sine klienter ved å angi hvilke klient-id-er og/eller organisasjonsnumre som har lov til å dele SSO inn til klienten. Dette kan forankres i et mønster som allerede finnes: klienten har fra før en tilsvarende liste over relasjoner til andre parter. En slik liste vil være rettet: at en klient tillater en motpart, gir ikke automatisk motparten tilsvarende tillit tilbake.

- Fordeler: Enklere å innføre teknisk, ligner mer på vanlig klientkonfigurasjon, gir høy kontroll per klient, passer godt for små oppsett, krever mindre nytt administrasjonsregime, kan fungere som en rimelig og rask MVP.
- Ulemper: Kan bli uoversiktlig ved mange klienter — enkelt å forstå per klient, men komplisert å få oversikt over alle «øyer» samlet. Vanskeligere å se hva som faktisk utgjør en SSO-gruppe, risiko for inkonsistent eller asymmetrisk konfigurasjon, vanskeligere å auditere, vanskeligere for kunder å administrere selv over tid, og dårligere egnet for store eller tverrorganisatoriske oppsett. Relasjonene kan over tid bli en skjult graf fremfor tydelige grupper, og lister per klient kan bli lange og skalere dårlig.
- Passer kanskje best når: SSO-behovet er lite og enkelt, det typisk er 2–3 klienter som skal kobles sammen, man ønsker rask teknisk innføring, og man ikke trenger avansert selvbetjening eller styring i en første versjon.

**Alternativ 3 – Beholde dagens to modi, gjøre SSO opt-in**

Innfører ikke en egen begrenset modus. I stedet beholdes kun isolert og global SSO, men global SSO blir noe tjenesteeier aktivt må velge inn i (opt-in), med isolert som standard.

- Fordeler: Svært enkelt å innføre, kjent modell, enklere for tjenesteeier å forholde seg til.
- Ulemper: Samme risiko som i dag dersom noen glemmer eller gjør feil ved utlogging, og gir fortsatt ikke mulighet for kontrollert deling med et avgrenset sett tjenester — kun alt-eller-ingenting. Dårligere brukerreise for tjenester som faktisk har behov for å dele innlogging.

## 8. Alternativer som er vurdert

| Alternativ | Beskrivelse | Fordeler (hovedpunkt) | Ulemper (hovedpunkt) |
|---|---|---|---|
| 1 – Sentralisert modell | Egen administrasjonsobjekt («SSO-øy») med egen rollemodell og selvbetjening | Tydelig, godt egnet for store/tverrorganisatoriske oppsett, god oversikt og auditerbarhet | Nytt administrasjonsobjekt, ny rollemodell, vesentlig dyrere å realisere |
| 2 – Konfigurert på klient | Allow-liste av klienter/organisasjoner lagret direkte på hver klient | Raskt og billig å innføre, kan fungere som MVP | Uoversiktlig i stort omfang, risiko for asymmetrisk konfigurasjon, vanskelig å auditere |
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

*Fylles ut basert på beslutningstakers vurdering av alternativene i kapittel 7 og 8. Kildenotatet peker på at alternativ 2 (konfigurert på klient) kan fungere som en rimelig og rask MVP, mens alternativ 1 (sentralisert modell) passer bedre på lengre sikt dersom behovet for oversikt, selvbetjening og tverrorganisatorisk bruk (bl.a. Ansattporten) blir stort. Migreringsplanen i kapittel 12 er lagt opp slik at man kan starte med en enklere modell og eventuelt abstrahere til en sentralisert modell senere, dersom det blir behov for det.*

## 11. Beslutning som ønskes

Det bes om beslutning på:

1. At SSO-modellen i ID-porten endres fra en binær modell til tre eksplisitte SSO-modi: isolert, global og begrenset («SSO-gruppe»), som beskrevet i kapittel 7.
2. At isolert SSO settes som ny standard for nyopprettede klienter.
3. Hvilket av de tre alternativene (kapittel 7.2/8) som skal legges til grunn for realisering av den begrensede modusen, eventuelt som en trinnvis tilnærming i tråd med migreringsplanen i kapittel 12.

## 12. Videre arbeid

Eksempel på migreringsplan fra dagens situasjon til målbildet:

- **Fase 0** – Velge alternativ for SSO-gruppe.
- **Fase 1** – Innføre eksplisitt SSO-policy med tre valg: isolert, global, begrenset. Eksisterende klienter settes til henholdsvis isolert eller global, avhengig av dagens konfigurasjon.
- **Fase 2** – Gjøre isolert til standard for nye klienter. Global SSO blir noe man aktivt må velge inn i.
- **Fase 3** – Innføre begrenset SSO som MVP: mulighet for å sette klienten i begrenset modus og legge til klient-id-er direkte på klienten (peer-to-peer-modellen, jf. alternativ 2).
- **Fase 4** – Selvbetjening innenfor egen organisasjon (avhengig av valgt modell).
- **Fase 5** – Ved behov: mulighet for å legge til egen organisasjon i en allow-liste.
- **Fase 6** – Eventuell abstraksjon til SSO-grupper dersom allow-listene blir store og uoversiktlige; kan da provisjoneres ned til samme allow-liste-nivå som i MVP-en.
- **Fase 7** – Selvbetjening på tvers av organisasjoner: innføre en samtykkeløsning for å legge til klienter fra andre organisasjoner, eventuelt etablere roller i autorisasjonsløsningen avhengig av valgt alternativ. På sikt kan det vurderes å fase ut global SSO helt.
