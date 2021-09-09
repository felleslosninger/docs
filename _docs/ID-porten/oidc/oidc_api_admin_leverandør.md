---
title: Leverandører i ID-porten/Maskinporten
description: Retningslinjer for teknisk integrasjon for leverandører.
summary: "etningslinjer for teknisk integrasjon for leverandører. ."
permalink: oidc_api_admin_leverandør.html
sidebar: oidc
product: ID-porten
---


# Om Leverandører i ID-porten og Maskinporten

Leverandører spiller en viktig rolle med å hjelpe offentlige virksomheter til å bruke ID- og Maskinporten, og løsningene tilbyr leverandører noe ekstrafunksjonalitet som skal gjøre administrasjonen enkel og samtidig sikker for både kunde og leverandør.

Leverandører får normalt ikke tilgang til ID-porten/Maskinporten på egne vegne. Integrasjon mot Digdirs fellesløsninger skal bare gjøres på vegne av kunder som har akseptert Digdirs bruksvilkår.


Det er viktig å være klar over at "en leverandør ikke er en leverandør", dvs. ulike leverandører og ulike brukscenario har ulike behov.  Typiske leverandør-bruksmønster i ID-porten/Maskinporten er:
- System-leverandører som utvikler fagsystemer i sky som kundens saksbehandlere logger inn til
- Driftsleverandører som utfører "ren" basis IT-drift av kundens egne systemer.
- Konsulent-selskaper som utvikler "skreddersøm"-systemer på oppdrag av en enkelt kunde.
- Sektor-løsninger fra det offentlige som HelseID og Feide


# Generelle råd

Leverandører (og forsåvidt alle andre) som har mange installasjoner av et system, bør ikke gjenbruke hemmeligheter mellom installasjoner. Dersom en installasjon blir kompromittert (for eksempel client_secret på avveie), så er plutselig alle installasjoner blitt kompromittert, og alle kunde-installasjoner må oppdateres.

Leverandører bør av sikkerhetshensyn ikke forvalte kundene sine virksomhetssertifikater, da disse potensielt kan gi vide tilganger også til andre systemer utover ID-porten/Maskinporten.

Digdir forventer at leverandører bruker selvbetjening til administrere sine kunde-integrasjoner.  Vi har web-basert selvbetjening dersom du har en håndfull kunder, og for større kunder anbefaler vi API-basert selvbetjening. (LINK). Sistnevnte er basert på RFC7591, og krever leverandøren sitt virksomhetssertifikat for tilgang.


## Spesielt om datadeling

Leverandør-funksjonaliteten slik den er i dag er i hovedsak tilpasset **innloggingstjenester**, og ikke datadeling i ID-porten eller Maskinporten.

Siden leverandør-funksjonaliteten gjør det mulig for Leverandør å selv-deklarere at de opptrer på vegne av vilkårlige orgno uten kundens eksplisitte samtykke, er det av sikkerhetshensyn ikke åpnet for at en leverandør kan "arve" kundens sine tildelte tilganger til 3-parts APIer.  

I Maskinporten er det mulig for kunden å eksplisitt delegere API-tilgang gjennom Altinn Autorisasjon.  Tilsvarende funksjonalitet finnes ikke i ID-porten for brukerstyrt datadeling.


# Ulike måter å integrere på


## Onbehalfof i ID-porten

onbehalfof (LINK) er en ID-porten-proprietær mekanisme som gir en leverandør mulighet til å gjenbruke en OIDC-integrasjon på vegne av mange kunder.  

Leverandøren må forhåndsregistere såkalte "onbehalfof"-verdier som blir knyttet til kundens orgno, normalt 1 verdi per kunde, og må sende riktig onbehalfof-verdi runtime ved innlogging.  Hver obof-verdi har eget tjensteeier-navn og logo som blir vist sluttbruker ved innlogging.

Leverandøren bruker eget virksomhetssertifkat og/eller client_secret for å autentisere seg mot ID-porten.


Dersom integrasjonen skal kunne bruke brukerstyrt datadeling (LINK) på vegne av kunden, eller integrasjonen har behov for å motta access_tokens med scopes eid av 3dje-part, må API-tilbyder gi leverandøren (altså ikke kunden) tilgang til scopet, for at leverandøren skal kunne registrer scopet på sin klient. `consumer`-claimet i access_token blir satt lik orgnummeret som tilhører onbehalfof-verdien.

Tilgang til selvbetjening via `idporten:dcr.onbehalfof` scope


## Selvstendige kunde-integrasjoner i ID-porten

Noen leverandører har av historiske årsaker systemer der de låner kunden sitt virksomhetssertifikat for å integrere mot ID-porten, selv om det ikke er anbefalt.

Disse leverandørene oppretter en integrasjon per kunde, og for å synliggjøre at slike integrasjoner tilhører et leverandørforhold, blir de "merket" med  leverandørens organisasjonsnummer (attributtet `supplier_orgno`.)

Digdir er restriktive med å tildele denne selvbetjeningsmuligheten til leverandører. (`idporten:dcr.supplier`-scope )

På samme måte som for onbehalfof'er, så må API-tilbyder gi leverandøren sitt orgno tilgang til APIet dersom integrasjonene skal kunne bruke brukerstyrt datadeling i ID-porten (registere scopes)

## Bruke redirect-uri
Noen leverandører velger å ikke bruke noen av de foregående mekanismene, og bruker i stedet én integrasjon, med ulike forhåndsregistrerte `redirect_uri` til å skille mellom kunder. Alternativt sende en kunde-spesifikk `state`-verdi runtime (da må også PKCE brukes for å hindre csrf eller replay attack).

Ulempen med dette mønsteret er at man ikke kan ha kunde-spesifikke tjenestenavn og logo samt at innlogginger telles og faktureres leverandøren og ikke kunden. Derfor passer mønsteret best for de som lager primært public klienter (typisk mobil-apper eller  sluttbrukersystemer installert på pc).

## Delegering i Altinn for Maskinporten

For datadeling mellom virksomheter gjennom Maskinporten er det mulig for en Kunde å eksplisitt delegere en API-tilgang videre til Leverandør, ved at bemyndiget representant logger inn i Altinn.

Kunde-Leverandør-forholdet blir for slike integrasjoner ikke forhåndsregistert (som for de ovenstående alternativene), men sjekkes istedet runtime ved bruk.
