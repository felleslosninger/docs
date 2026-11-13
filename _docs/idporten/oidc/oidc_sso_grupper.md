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

Ved aktivering av SSO må kunden ta stilling til om tjenesten skal delta i én stor felles-SSO, eller om man heller foretrekker å være med i en mindre SSO-gruppe. Behovet for grupper har vært signallisert av flere kunder.  Mekanismen for SSO-grupper er p.t. ikke besluttet, og vi ønsker tilbakemeldinger på foreslått løsning.  


## 2. Hvorfor gjør vi dette ?

Risikovurderinger viser at innbyggere i liten grad forstår at de logger inn til tusenvis av offenlige tjenester når de bruker ID-porten.  Det er en risiko for misbruk av "hengende sesjoner" på delte devicer (for eksempel publikums-PCer på bibliotek eller offentlige kontorer), eller målrettede phishing-angrep som utnytter SSO-mekanismen.  I nyere tid har løpske KI-agenter også blitt identifisert som en risiko for innbygger. 

Dataanalyse viser at SSO i svært liten grad skjer idag.   Unntaket er kjente tjeneste-reiser mellom bestemte tjenester, eller kunder der tjenesten er realisert med mange mikrotjenester (for eksempel nav.no).  Vår vurdering er at det er disse tjenestene som behøver SSO, som også må ta byrden ved gjøre tilpassinger for å beholde sin SSO-funksjonalitet. 


Vi har vurdert å fortsette som idag, men har besluttet at risikoen ikke er akseptabel.   Samtidig anerkjenner vi at dette er en stor endring, og at mange tjenester har et legitimt behov for SSO, som vi ønsker å tilfredstille.  Det er også tydelig at risikobildet og behovet er forskjellig mellom innbygger-tjenester (ID-porten) og ansatt-tjenester (Ansattporten) og med felles kildekodebase for de to portene må teknisk løsning klare å dekke begge behov.


## 3. Ny løsning for SSO

Følgende overordnede punkter er besluttet:

1. et nytt felt for SSO-modi per klient, med 3 mulige verdier: `isolert`, `global` og `begrenset`
2. `isolert` blir standard for nye klienter
3. etter en overgangsperiode, vil alle eksisterende klienter som ikke har valgt sso-modi, bli satt til `isolert`

Det er flere måter å realisere gruppefunksjonalitet på.  Vi har evaluert flere alternativer, og foreslår varianten **"begrenset"**. For klienter med verdien `begrenset` må kunden i tillegg konfigurere gruppeoppførsel slik:

4. angi **hvilke andre klienter den tar imot SSO fra**.
5. angi **evalueringstype** (`strict` eller `lax`) som avgjør hvordan en sesjon som har vært innom flere klienter vurderes

Følgende alternativ har vært vurdert:

- [begrenset SSO](oidc_sso_grupper_vedlegg_B_begrenset)
- [Sentralisert gruppemodell](oidc_sso_grupper_vedlegg_C_sentralisert)
- [SSO-handover](oidc_sso_grupper_vedlegg_D_handover)
- bruk av OIDC standardfunksjonalitet `sector_id`

Alternativene er nøyere beskrevet i vedlegg lenket ovenfor.  Dagens løsning er dokumentert i [vedlegg A - Dagens løsning](oidc_sso_grupper_vedlegg_A_dagens).


Dette dokumentet ber særlig om innspill på **hva som skal skje når en sesjon har vært innom flere klienter, på tvers av klienter med ulik konfigurasjon**, og på om evalueringstypene strict og lax er riktig måte å gjøre det konfigurerbart på (vedl. B, kapittel 6). Vi ønsker også tilbakemelding på om det er behov for å kunne hviteliste hele organisasjoner via organisasjonsnummer (vedl B. kapittel 5.2).



## Ny funksonalitet for SSO-modus

Vi har besluttet å innføre en ny klient-egenskap `sso_mode`, som styrer klienten SSO-oppførsel.

| Modus | Forklaring |
|---|---|
| `isolert`   | Egen, isolert sesjon. Brukeren må logge inn på nytt hos andre tjenester.  |
| `global`    | Vanlig, delt SSO med ikke-isolerte klienter |
| `begrenset` | Klienten kan få SSO fra eksplisitt godkjente klienter |


Uavhengig av modus, gjelder at **brukertypen overstyrer.** Det er ikke mulig med SSO på tvers av brukertyper. En eIDAS-bruker uten fødselsnummer kan ikke få SSO til en tjeneste som bare støtter fødselsnummer, selv om klient-kombinasjonen normalt ville tillatt SSO.  Ved slike overganger blir den gamle sso-sesjonen kastet, og det blir startet en ny.


<div class="mermaid">
graph TD
    A[Bruker med sesjon fra Klient A kommer til Klient B] --> B{Tillater brukertypen SSO?}
    B -- Ja --> C{Hvilken SSO-modus har Klient B?}
    C -- Isolert --> X[Ingen SSO]
    C -- Global --> D[SSO tillatt]
    C -- Begrenset --> E{Er sesjonen godkjent etter Klient Bs evalueringstype, strict eller lax?}
    E -- Ja --> D
    E -- Nei --> X
    B -- Nei --> X
</div>

*Figur: Foreslått evalueringslogikk.*

| Modus | Fordeler | Ulemper |
|---|---|---|
| Isolert | Høyest isolasjon, enklest å forstå, lavest risiko, god Zero Trust-standard | Dårligere brukeropplevelse, vanskeligere å knytte tjenester sammen i en brukerflyt senere |
| Global | Mest sømløs opplevelse, minst friksjon | Lavere isolasjon, større konsekvensområde ved kompromittert sesjon, lite kontroll over hvem som deler SSO |
| Begrenset | Balanse mellom sikkerhet og brukeropplevelse, kontrollert tillit | Krever konfigurasjon, noe mer kompleks å forstå |


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

Vi antar at vi vil følge en slik detaljert migreringsplan.  Det er p.t. ikke besluttet tidspunkter for de ulike fasene:

- **Fase 0 (pågår nå):** Begrenset SSO som MVP med Vi har erfaring fra Skatt i ID-porten (eidas-innlogging) og interne selvbetjeningsløsninger i Ansattporten.
- **Fase 1:** Innføre eksplisitt SSO-modus med tre valg. Gjøre isolert til standard for nye klienter. Eksisterende klienter beholder dagens konfigurasjon.
- **Fase 2:** Selvbetjening for klienteier: eier kan selv legge til SSO-relasjoner
- **Fase 3:** Eksisterende klienter som ikke har satt SSO-modus, blir satt til isolert.


## Begreper

| Begrep | Betydning |
|---|---|
| **Brukertype** | hvilken type identikator en bruker har.  teknisk hengerAutentiseringsnivå i ID-porten, f.eks. «idporten», «ansattporten» eller «eidas». Har en av/på-innstilling for om SSO er tillatt. eID-løsningen innad i en tillitsgruppe bruker typisk samme identifikator for brukeren |
| **Isolert SSO** | Klienten har egen SSO-sesjon og deler ikke SSO i noen retning. |
| **Global SSO** | Klienten deltar i vanlig, delt SSO med enhver annen klient. |
| **Begrenset SSO** | Klienten tar bare imot SSO fra klienter den eksplisitt har godkjent. |
| **SSO-relasjon** | En godkjent klient (og senere eventuelt organisasjon) på en klient med begrenset SSO. Relasjonen er rettet. |
| **Evalueringstype** | Innstilling på en klient med begrenset SSO som avgjør hvordan en sesjon med flere klienter vurderes: strict eller lax. |
| **Strict** | Alle klienter i sesjonen må være SSO-relasjoner på klienten. |
| **Lax** | Bare klienten som startet sesjonen må være SSO-relasjon på klienten. Mellomledd vurderes ikke. |
| **SSO-gruppe** | Et eget, sentralt administrert objekt som samler klienter. Vurdert, men ikke valgt nå (kapittel 7). |
| **SSO handover** | Mulig fremtidig utvidelse der kontekst kan sendes med ved SSO (kapittel 8). |
    
