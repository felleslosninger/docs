---
title: Sikkerhet
description: Sikkerhet
summary: ""
permalink: eformidling_nm_sikkerhet.html
product: eFormidling
sidebar: eformidling_technical_sidebar
---


# Kryptografisk beskyttelse

Integrasjonspunktet skal etablere tillit mellom avsender og mottaker, slik at avsender med rimelig sikkerhet kan stole på at forsendelsen som sendes havner hos riktig mottaker, og mottaker kan vite hvem som har sendt forsendelsen, og stole på at den er autentisk. Begge parter ønsker å vite at ingen uvedkommende har lest eller endret den digitale forsendelsen som formidles mellom dem. Her beskrives overordnet løsning for å sikre integritet og konfidensialitet i overføringen fra avsendervirksomhetene til mottaker.

Løsningen legger opp til at all post sikres på samme nivå, og er tiltenkt å kunne beskytte informasjon av særlig følsomme taushetsbelagte opplysninger, herunder de fleste sensitive personopplysninger, stigmatiserende opplysninger m.v. Eksempelvis opplysninger om sykdom. Det er hver enkelt avsendervirksomhet som må vurdere om løsningen er dekkende for deres informasjon, men det vil utarbeides risiko- og sårbarhetsanalyser som vil hjelpe avsendervirksomhetene i denne vurderingen.

# Integritet

Det er flere forhold som ivaretas ved integritetsbeskyttelse. Integrasjonspunktet vil kontrollere og verifisere identiteten til avsender for å hindre uautoriserte avsendere, og for å etablere et trygt sporingsregime. Videre kan mottaker være trygg på at posten faktisk er fra den som har utgitt seg for å sende den.

God integritetssikring hindrer at forsendelsens innhold eller metadata endres underveis i transporten mellom avsender og mottaker, og sørger for at posten kommer frem til riktig mottaker.

Virksomhetssertifikater er den løsningen som har størst utbredelse og sikrer integritet på best måte, spesielt for autentisering av avsendervirksomheter.

Associated Signature Container er et pakkeformat som er designet for å ivareta integritet til innholdet over lang tid. Kort fortalt definerer standarden hvordan man skal sette sammen en zip-fil med en filstruktur der man lager en digital signatur over innholdet.

Avsendervirksomheten pakker dokumentene til mottakeren i en dokumentpakke og signerer den med sitt eget virksomhetssertifikat. (En avsendervirksomhet kan også benytte sertifikatet til en Databehandler etter nærmere avtale.)

I tillegg er det en signatur på formidlingen som dekker både ukryptert metadata som skal være tilgjengelig under formidlingen.

Det vil være behov for å endre algoritmer og protokoller over tid, men i første versjon vil signaturen i dokumentpakken være http://www.w3.org/2001/04/xmldsig-more#rsa-sha256 (PKCS #1 v1.5) i henhold til XAdES-standarden.

For å sende en digital forsendelse må en avsendervirksomhet være registrert med organisasjonsnummer i adresseregisteret, og må inneha et virksomhetssertifikat som benyttes for å signere alle forsendelser. Mottaker vil validere signaturen.

Mottaker kan ha behov for å gjenbruke dokumenter etter forsendelsen, der en tredjepart ønsker å validere ektheten av dokumentet. Signaturen i dokumentpakken kan valideres av en tredjepart, eller avsender kan signerer dokumentene som legges i dokumentpakken helt uavhengig av integrasjonen.

# Konfidensialitet

Integrasjonspunktet benytter adressetjenesten for virksomheter for å hente mottakers digitale adresse og tilhørende X.509 sertifikat. Mottaker må gjøre sertifikatet tilgjengelig i adressetjenesten, og det kan enten være et virksomhetssertifikat tilhørende mottaker eller et virksomhetssertifikat tilhørende databehandler. Løsningen er valgt med tanke på fleksibilitet. Mottaker kan velge å bruke samme virksomhetssertifikat for alle sine tjenester, eller registrere unike sertifikater per tjeneste i adressetjenesten. Sertifikatene postkasseleverandøren gjør tilgjengelig kan kostnadsfritt valideres opp mot en sertifikatutsteder.

Avsendervirksomheten validerer sertifikatet og benytter dette for å kryptere den symmetriske nøkkelen som benyttes for å kryptere selve innholdet i dforsendelsen. Krypteringen er i henhold til Cryptographic Message Syntax (CMS). Det vil være behov for å endre algoritmer og protokoller over tid, men i første versjon krypteres dokumentpakken med AES-CBC-PKCS5Padding og den symmetriske nøkkelen krypters med PKCS #1 v2.1.

Det sensitive innholdet i en digital forsendelse krypteres med symmetriske nøkler. Disse nøklene genereres tilfeldig og gjenbrukes ikke.