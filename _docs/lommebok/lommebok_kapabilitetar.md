---
title: Kapabiliteter i sandkassa
description: Kapabiliteter i sandkassa

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_arkitektur
---

Denne sida gir ein oversikt over tilgjengelige og potensielle kapabilitetar i sandkassa.

## Grunnleggande infrastruktur

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Lommebok-tjeneste | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt | Lommeboka er tjenesten som brukaren nyttar til å oppbevare, administrere og dele sine digitale bevis. Kan potensielt støtte  signering og betaling. |
| Tillitslister | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt  | Sentralt tillitsanker brukt til å validere gyldigheita til aktørar i sandkassa. |
| Brukerstadsregister (RP-register) m/innsyn og sjølvbetjening | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt  | Register over brukarstader og aktørar. Aktørar må vere registrert og deklarere formål/behandlingsgrunnlag. Tilbyr sjølvbetjening og opne innsynstenester. |
| Notifiseringskapabilitet | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt   | Prosessar for registrering og avregistrering av aktørar. Vil inkludere registrering i EU sine sentrale tillitslister. |
| Aksessertifikat-utstedelse | Basisfunksjonalitet tilgjenglig  | Utstedelse av aksessertifikat til registrerte aktørar som skal samhandle med lommeboka. |
| Registreringssertifikat-utstedelse | Planlagt innført på eit seinare tidspunkt  | Viser kva bevis ein brukarstad kan konsumere og formålet med dette. Presenterast til lommeboka for verifisering mot deklarert formål. |

---

## Innlogging og autentisering

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| PID-utstedelse | Basisfunksjonalitet tilgjenglig (utstedelse basert på eksisterande eID) | Utstedelse av PID-dokument for autentisering, på eIDAS nivå høgt. |
| Pseudonym innlogging (WebAuthn) | Potensiell kapabilitet på eit seinare tidspunkt | Pseudonym innlogging basert på WebAuthn. Konto kan opprettast med PID, seinare innlogging skjer med WebAuthn. |
| Aldersverifisering | Potensiell kapabilitet på eit seinare tidspunkt | Aldersbevis som dokumenterer alderskrav utan å dele unødvendig personinformasjon. |
| Proximity-basert kontroll av id/alder | Potensiell kapabilitet på eit seinare tidspunkt   | Lokal trådlaus kontroll (NFC/BLE) av identitet eller alder i fysiske situasjonar. |
| Visuell kontroll av id/alder | Potensiell kapabilitet på eit seinare tidspunkt  | Manuell visuell kontroll via verifiserbart skjermbilete eller kortversjon av identitet/alder. |
| Innlogging av utenlandske brukere | Potensiell kapabilitet på eit seinare tidspunkt  | Autentisering av brukarar med EUDI-lommebøker frå andre land via europeisk tillitsrammeverk. |
| Identitetsmatching | Potensiell kapabilitet på eit seinare tidspunkt  | Mekanismar for å matche identitet på tvers av system. |

---

## Datadeling med digitale bevis

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Felles utstedertjeneste for det offentlige | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt | Felles infrastruktur for offentleg sektor for utstedelse av verifiserbare digitale bevis. |
| Register over brukerstaders formål/behandlingsgrunnlag | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt | Register der tenesteleverandørar oppgir formål og behandlingsgrunnlag. |
| Innbyggers dashboard/historikk | Basisfunksjonalitet tilgjenglig | Grensesnitt der innbyggjar kan sjå delte bevis, mottakar, tidspunkt og formål. |
| Beviskatalog | Basisfunksjonalitet tilgjenglig, videreutvikling er planlagt | Katalog over tilgjengelege digitale bevis og definisjonar av desse. |
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
