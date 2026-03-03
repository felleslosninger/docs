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

## Innlogging og autorisasjon

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| PID-utstedelse | Basisfunksjonalitet tilgjenglig (utstedelse basert på eksisterande eID/syntetiske persondata) | Utstedelse av PID-dokument for autentisering, på eIDAS nivå høgt.  Innlogging vert realisert ved at innbyggaren deler PIDen med ein brukarstad. |
| Fullmaktsbevis| | Utstedelse av EU-standardiserte bevis for representasjonsforhold (som t.d. vergemål) og detaljerte representasjonsomfang (TBD). Vil bli basert på Altinn Autorisasjon som autoritativ kjelde. |
| Pseudonym innlogging (WebAuthn) |  | Pseudonym innlogging basert på WebAuthn. Konto kan opprettast med PID eller anna bevis, seinare innlogging skjer med WebAuthn. |
| Aldersverifisering | Basisfunksjonalitet tilgjengeleg, utstedelse basert på eID. | Aldersbevis som dokumenterer alderskrav utan å dele unødvendig personinformasjon. EU har definert eit eige bevis og forenkla tilitsrammeverk for medlemsland som vil ta dette i bruk tidlegare enn eIDAS2 er klar. |
| Proximity-basert kontroll av id/alder | Utviklingsarbeid pågår. | Lokal trådlaus kontroll (NFC/BLE) av identitet eller alder i fysiske situasjonar. Innebygd eigenskap ved mdoc-basert bevisformat. |
| Visuell kontroll av id/alder |  | Manuell visuell kontroll via verifiserbart skjermbilete eller kortversjon av identitet/alder. |
| Innlogging i ID-porten | Levert| Autentisering av brukarar med norske lommebøker gjennom eksisterande ID-porten-integrasjonar |
| Innlogging av utenlandske brukere i ID-porten | Ila. 2026 | Autentisering av brukarar med EUDI-lommebøker frå andre land via WeBuild sitt tillitsrammeverk. |
| Identitetsmatching |  | Mekanismar for å matche utenlandske lommebok-identiteter til norske F/D-nummer i Folkeregisteret. Mulig rudimentær funksjonalitet etableres ifbm. WeBuild. |

---

## Datadeling med digitale bevis

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Felles utstedertjeneste for det offentlige | Basisfunksjonalitet tilgjengeleg. Manglar revokasjon, WUA- og tillitsliste-validering, multi-tenancy.  | Felles infrastruktur for offentleg sektor for utstedelse av verifiserbare digitale bevis. |
| Register over brukerstaders formål/behandlingsgrunnlag | Basisfunksjonalitet tilgjengeleg. | Eigenskap ved brukerstadregisteret, der tenesteleverandørar oppgir formål og behandlingsgrunnlag. |
| Innbyggers dashboard/historikk | Basisfunksjonalitet tilgjengeleg i demo-lommeboka | Grensesnitt der innbyggjar kan sjå delte bevis, mottakar, tidspunkt og formål. |
| Beviskatalog | Proprietær katalog tilgjengeleg. Manglar dei formelle katalogane ihht ARF. | Både maskin- og menneske-lesbare katalogar ([TS11](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts11-interfaces-and-formats-for-catalogue-of-attributes-and-catalogue-of-schemes.md)) over tilgjengelege digitale bevis og definisjonar av desse. Oversikt over kven som er autorativ kjelde for ulike attributt. |
| Misbruksvarsling til datatilsyn | Ikkje relevant i sandkassa | Høve til at innbyggar kan varsle frå lommeboka ved mistanke om misbruk av bevis eller personopplysningar. |
| Transaksjons-spesifikk deling |  | Knyting av transaksjonsspesifikke data til presentasjon av bevis (t.d. betaling). |

---

## Signering og betaling

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Teneste for remote signering | Planlagt funksjonalitet | Sentralisert signeringsteneste som signerer på vegner av brukar etter sterk autentisering. Blir levert av spesialiserte leverandørar av signeringstenester. |
| Lommebok med støtte for remote signering | Potensiell kapabilitet på eit seinare tidspunkt | Lommebok som kan initiere og godkjenne ekstern signering. |
| Lokal signering i lommebok | Ingen umiddelbare planar. | Signering utført lokalt der private nøklar er lagra og kontrollert i lommeboka. |
| Betaling |  | Bakanforliggande infrastruktur som mogeleggjer bruk av lommeboka til betaling.  Krev også noko støtte i lommeboka. Sjå [TS12](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts12-electronic-payments-SCA-implementation-with-wallet.md). |

---

## Virksomhetslommebok

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| Verksemdslommebok-teneste |  | I sandkassen vil leverandører av verksemdslommebok kunne tilby slike til deltakarane.  P.t. uklart kva sandkassen må tilby av tillitsrammeverk for å kunne støtte kommande forordning.|
| QERDS | Potensiell kapabilitet på eit seinare tidspunkt  | Verksemdslommeboka skal nytte ein slik meldingsinfrastruktur til bevis-deling mellom verksemder. |
| Katalogteneste | Potensiell kapabilitet på eit seinare tidspunkt  | Teneste for registering av verksemder som har teke i bruk verksemdslommeboka. Brukt til mellom anna adressering. Vert kalla European Digital Directory. |


## Integrasjon med eksisterande fellesløysingar

| Kapabilitet | Status | Beskrivelse |
|-------------|--------|-------------|
| ID-porten som intermediary | |  ID-porten kan nyttast til å motta digitale bevis utover PID til reine autentiseringsformål.  | 
| Altinn Autorisasjon og utanlandsk PID | |  Det kan vere aktuelt å la norske verksemder delegere rettigheiter i Altinn til utanlandske identitetar, dvs. PID. |
| Maskinporten og verksemdslommebøker |  | Tilpassingar i Maskinporten slik at legacy fagsystemer og / eller legacy APIer kan bruke Maskinporten som en Intermediary via virksomhetslommeboka.  Alternativet at Maskinporten utsteder datadeelingsbeviser som brukes i lommebok-til-lommebok datadeling. |



