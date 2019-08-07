---


title: Sikkerhet
permalink: sdp_sikkerhet_index.html
sidebar: dpi_sidebar
---

## Kryptografisk beskyttelse av digital post

Sikker digital post skal etablere tillit mellom avsender og mottaker,
slik at avsender med rimelig sikkerhet kan stole på at posten som sendes
havner i riktig postkasse, og innbygger kan vite hvem som har sendt
posten, og stole på at den er autentisk. Begge parter ønsker å vite at
ingen uvedkommende har lest eller endret den digitale posten som
formidles mellom dem. Her beskrives overordnet løsning for å sikre
integritet og konfidensialitet i overføringen av digital post fra
avsendervirksomhetene til innbyggernes digitale postkasser.

Formatet på digitalt post er detaljert på
<https://difi.github.io/felleslosninger/sdp_innledning_index.html>. Løsningen legger opp til at
all post sikres på samme nivå, og er tiltenkt å kunne beskytte
informasjon av særlig følsomme taushetsbelagte opplysninger, herunder de
fleste sensitive personopplysninger, stigmatiserende opplysninger m.v.
Eksempelvis opplysninger om sykdom. Det er hver enkelt
avsendervirksomhet som må vurdere om løsningen er dekkende for deres
informasjon, men det vil utarbeides risiko- og sårbarhetsanalyser som
vil hjelpe avsendervirksomhetene i denne vurderingen.

### Integritet

Det er flere forhold som ivaretas ved integritetsbeskyttelse.
Meldingsformidler og postkasseleverandør vil kontrollere og verifisere
identiteten til avsender for å hindre uautoriserte avsendere, og for å
etablere et trygt sporings- og fakturaregime. Videre kan innbygger være
trygg på at posten faktisk er fra den som har utgitt seg for å sende
den.

God integritetssikring hindrer at postens innhold eller metadata endres
underveis i transporten mellom avsender og mottaker, og sørger for at
posten kommer frem til riktig postkasse.

Virksomhetssertifikater er den løsningen som har størst utbredelse og
sikrer integritet på best måte, spesielt for autentisering av
avsendervirksomheter.

Associated Signature Container er et pakkeformat som er designet for å
ivareta integritet til innholdet over lang tid. Kort fortalt definerer
standarden hvordan man skal sette sammen en zip-fil med en filstruktur
der man lager en digital signatur over innholdet.

Avsendervirksomheten pakker dokumentene til mottakeren i en
dokumentpakke og signerer den med sitt eget virksomhetssertifikat. (En
avsendervirksomhet kan også benytte sertifikatet til en Databehandler
etter nærmere avtale.)

I tillegg er det en signatur på formidlingen som dekker både ukryptert
metadata som skal være tilgjengelig under formidlingen, inkludert
avsenders virksomhetssertifikat, varslingsinformasjon og dokumentpakken
som er kryptert.

Det vil være behov for å endre algoritmer og protokoller over tid, men i
første versjon vil signaturen i dokumentpakken være http://www.w3.org/2001/04/xmldsig-more\#rsa-sha256 (PKCS \#1 v1.5) i
henhold til XAdES-standarden.

For å sende digital post må en avsendervirksomhet være registrert med
organisasjonsnummer hos sentralforvalteren av sikker digital post, og må
inneha et virksomhetssertifikat som benyttes for å signere all digital
post. Meldingsformidler og postkasseleverandører vil validere
signaturen, og undersøke om avsendervirksomheten er registrert for
utsending av digital post.

Innbyggere kan ha behov for å gjenbruke dokumenter utenfor postkassen,
der en tredjepart ønsker å validere ektheten av dokumentet. Signaturen i
dokumentpakken kan valideres av en tredjepart, eller avsender kan
signerer dokumentene som legges i dokumentpakken helt uavhengig av
Sikker digital post.

### Konfidensialitet

Avsendervirksomheten benytter oppslagstjenesten for digital
kontaktinformasjon for å få levert innbyggerens digitale
postkasseadresse og tilhørende X.509 sertifikat. Postkasseleverandøren
må gjøre sertifikatet tilgjengelig for oppslagstjenesten, og det kan
enten være et unikt sertifikat tilhørende innbyggeren eller innbyggerens
postkasse, eller det kan være postkasseleverandørens
virksomhetssertifikat. Løsningen er valgt med tanke på fleksibilitet,
der postkasseleverandørene kan konkurrere på sikkerhet, uten at
avsendervirksomhetene må endre sine systemer for utsendelse av digital
post. Postkasseleverandøren kan tilby beskyttelse under samme
virksomhetssertifikat for alle sine kunder, eller de kan tilby unike
sertifikater per innbygger, enten i egen kontroll, eller hvor
innbyggeren selv sitter på den private nøkkelen som er nødvendig for å
se innholdet. Sertifikatene postkasseleverandøren gjør tilgjengelig kan
kostnadsfritt valideres opp mot en sertifikatutsteder. I første omgang
har begge postkasseleverandørene valgt å beskytte posten med eget
virksomhetssertifikat.

Avsendervirksomheten validerer sertifikatet og benytter dette for å
kryptere den symmetriske nøkkelen som benyttes for å kryptere selve
innholdet i den digitale posten. Krypteringen er i henhold til
Cryptographic Message Syntax (CMS). Det vil være behov for å endre
algoritmer og protokoller over tid, men i første versjon krypteres
dokumentpakken med AES-CBC-PKCS5Padding og den symmetriske nøkkelen
krypters med PKCS \#1 v2.1.

Det sensitive innholdet i en digital forsendelse krypteres med
symmetriske nøkler. Disse nøklene genereres tilfeldig og gjenbrukes
ikke.

Noe metadata må være tilgjengelig under flytting av digital post fra
avsender til mottaker, og denne kan ikke være innenfor det som er
kryptert. Selv om denne informasjonen er utenfor det krypterte
innholdet, så er den beskyttet under overføringen, fordi i tillegg til
innholdskryptering er det også kanalkryptering i form av TLS mellom
avsendervirksomheten og meldingsformidleren, og mellom
meldingsformidleren og postkasseleverandøren.

Her kan du lese mer om [sikkerhetsarkitekturen](Sikkerhetsarkitektur.pdf)
