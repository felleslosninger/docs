---
title: Kapabiliteter i sandkassa
description: Kapabiliteter i sandkassa

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_kapabilitetar
---

Denne sida gir ein oversikt over tilgjengelige og potensielle kapabilitetar i sandkassa.

## Grunnleggande infrastruktur

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Lommeboktjeneste | Basisfunksjonalitet tilgjenglig, vidareutvikling følger referanseimplementasjonen. Mangler WUA og WSCD. | Lommeboka er tjenesten som brukaren nyttar til å oppbevare, administrere og dele sine digitale bevis. Kan potensielt støtte  signering og betaling. Digdir tilbyr demo-lommebok for testformål, andre aktører vil tilby mer fullverdige lommebøker i sandkassen. |
| Tillitslister | Basisfunksjonalitet tilgjenglig. Utvikler eudiw-lister nå (ETSI 119 602). Planlegg betre administron av aktørene på lista. Ser på integrasjon mot WeBuild | Sentrale tillitsanker brukt til å validere gyldigheita til aktørar i sandkassa. |
| Brukerstadsregister (RP-register) m/innsyn og sjølvbetjening | Basisfunksjonalitet tilgjenglig. Manglar standardisert API (TS5). Manglar støtte for Intermediaries. | Register over brukarstader og aktørar. Aktørar må vere registrert og deklarere formål/behandlingsgrunnlag. Tilbyr sjølvbetjening og opne innsynstenester. |
| Notifiseringskapabilitet |    | Prosessar for registrering og avregistrering av aktørar. Vil inkludere registrering i EU sine sentrale tillitslister. |
| Utstedar av aksessertifikat | Basisfunksjonalitet tilgjenglig  | Utstedelse av aksessertifikat til registrerte aktørar som skal samhandle med lommeboka. Sandkassen er åpen for at andre aktører kan tilby aksess-sertifikat. |
| Utstedar av registreringssertifikat | Planlagt innført på eit seinare tidspunkt  | Viser kva bevis ein brukarstad kan konsumere og formålet med dette. Presenterast til lommeboka for verifisering mot deklarert formål. |

---

## Innlogging og autentisering

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| PID-utstedelse | Basisfunksjonalitet tilgjenglig (utstedelse basert på eksisterande eID/syntetiske persondata) | Utstedelse av PID-dokument for autentisering, på eIDAS nivå høgt. |
| Pseudonym innlogging (WebAuthn) |  | Pseudonym innlogging basert på WebAuthn. Konto kan opprettast med PID eller anna bevis, seinare innlogging skjer med WebAuthn. |
| Aldersverifisering | Basisfunksjonalitet tilgjengeleg, utstedelse basert på eID. | Aldersbevis som dokumenterer alderskrav utan å dele unødvendig personinformasjon. EU har definert eit eige bevis og forenkla tilitsrammeverk for medlemsland som vil ta dette i bruk tidlegare enn eIDAS2 er klar. |
| Proximity-basert kontroll av id/alder | Utviklingsarbeid pågår. | Lokal trådlaus kontroll (NFC/BLE) av identitet eller alder i fysiske situasjonar. Innebygd eigenskap ved mdoc-basert bevisformat. |
| Visuell kontroll av id/alder |  | Manuell visuell kontroll via verifiserbart skjermbilete eller kortversjon av identitet/alder. |
| Innlogging av utenlandske brukere i ID-porten | Ila. 2026 | Autentisering av brukarar med EUDI-lommebøker frå andre land via WeBuild sitt tillitsrammeverk. |
| Identitetsmatching |  | Mekanismar for å matche utenlandske lommebok-identiteter til norske F/D-nummer i Folkeregisteret. Mulig rudimentær funksjonalitet etableres ifbm. WeBuild. |

---

## Datadeling med digitale bevis

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Felles utstedertjeneste for det offentlige | Basisfunksjonalitet tilgjenglig, vidareutvikling er planlagt | Felles infrastruktur for offentleg sektor for utstedelse av verifiserbare digitale bevis. |
| Register over brukerstaders formål/behandlingsgrunnlag | Basisfunksjonalitet tilgjenglig, vidareutvikling er planlagt | Register der tenesteleverandørar oppgir formål og behandlingsgrunnlag. |
| Innbyggers dashboard/historikk | Basisfunksjonalitet tilgjenglig | Grensesnitt der innbyggjar kan sjå delte bevis, mottakar, tidspunkt og formål. |
| Beviskatalog | Basisfunksjonalitet tilgjenglig, vidareutvikling er planlagt | Katalog over tilgjengelege digitale bevis og definisjonar av desse. |
| Misbruksvarsling til datatilsyn | Ikkje relevant i sandkassa | Automatisk varsling ved mistenkt misbruk av bevis eller personopplysningar. |
| Transaksjons-spesifikk deling | Potensiell kapabilitet på eit seinare tidspunkt | Knyting av transaksjonsspesifikke data til presentasjon av bevis (t.d. betaling). |

---

## Signering og betaling

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Tjeneste for remote signering | Planlagt funksjonalitet | Sentralisert signeringsteneste som signerer på vegner av brukar etter sterk autentisering. |
| Lommebok med støtte for remote signering | Potensiell kapabilitet på eit seinare tidspunkt | Lommebok som kan initiere og godkjenne ekstern signering. |
| Lokal signering i lommebok | Potensiell kapabilitet på eit seinare tidspunkt | Signering utført lokalt der private nøklar er lagra og kontrollert i lommeboka. |

---

## Virksomhetslommebok

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Virk.lommebok-tjeneste | Planlagt funksjonalitet | Teneste knytt til virksomhetslommebok. |
| QERDS | Potensiell kapabilitet på eit seinare tidspunkt  | (tbd) |
| Meldingsutvekslingsinfrastruktur | Potensiell kapabilitet på eit seinare tidspunkt  | Infrastruktur for sikker meldingsutveksling. |
| Katalogtjeneste | Potensiell kapabilitet på eit seinare tidspunkt  | Teneste for katalogisering av relevante ressursar/bevis. |
