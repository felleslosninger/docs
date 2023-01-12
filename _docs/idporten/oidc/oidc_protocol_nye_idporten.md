---
title: "Endringer i Nye ID-porten i 2022-2023"
description: "ID-porten gjennomgår et omfattende moderniseringsløp i perioden 2020-2023, der hele kjernen i løsningen skrives om.  Det er et uttalt hovedmål for prosjektet at overgangen skal skje uten negative konsekvenser for kundene.  Samtidig ser vi at ny løsning ikke kan bli 100%-bakoverkompatible med dagens løsning, og denne siden dokumenterer de endringene vi ser vil komme."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_protocol_nye_idporten
---


## Bakgrunn

ID-porten gjennomgår et omfattende moderniseringsløp i perioden 2020-2023, der hele kjernen i løsningen skrives om.  Det er et uttalt hovedmål for prosjektet at overgangen skal skje uten negative konsekvenser for kundene.  Sjå [status-sida til prosjektet på Samarbeidsportalen](https://samarbeid.digdir.no/eformidling/ny-systemarkitektur/736), der det jamnleg blir publisert løypemeldingar og tidsplanar for migreringa.

Samtidig ser vi at ny løsning ikke kan bli 100%-bakoverkompatible med dagens løsning, og denne siden dokumenterer de endringene vi ser vil komme.  Dette gjelder særlig proprietære mekanismer som vi har innført, eller på områder der vår bruk av protokollen skiller seg fra det som er gjengs i bransjen.  For eksempel har vi vært tidlig ute med å ta i bruk noen Oauth2-spesifikasjoner selv om de var i tidlig draft-fase, og vi ser på noen områder at standardbibliotek og -programmer ikke bruker mekanismene slik vi trodde.

Dagens driftsavtale med TietoEvry om drift av ID-porten utløper høsten 2023.  På ny driftsavtale ønsker vi kun å kjøre ny systemarkitektur. Den nye arkitekturen vil være basert på Kubernetes-platform der vi også trekker inn SaaS-tjenester der det er hensiktsmessig.  "Hjertet" i den nye løsningen vil vært basert på en moderne Oauth2/OIDC-autorisasjonsserver fra Connect2Id.

## Migreringsplan

### Tidsplan

Se [status-sida for ny ID-porten på Samarbeidsporten](https://samarbeid.digdir.no/id-porten/id-porten/1313) for utfyllende tidsplan. Når det nærmer seg, vil det også blir [publisert varsel på statuspage](https://status.digdir.no/)

Overgangen til ny løsning vil skje i 4 steg:

| Steg | Dato | Beskrivelse |
|-|-|-|
|1: Prøvedrift | Mars 2023 | Nye ID-porten settes i produksjon, klar for reelle tjenester. Det er ikke SSO til gammel platform  |
|2: Ordinær drift |Mai 2023 | Den nye OIDC løsningen skal nå ha full funksjonalitet og ytelse.  
|3: SAML flyttes | September 2023 | Alle SAML-integrasjoner flyttes sømløst fra gamle ID-porten til ny proxy-løsning. |
|4: Sanering |Desember 2023 |  Den gamle OIDC-issueren skrus av.

### Når bør jeg migrere ?

Dersom du er avhengig av SSO til andre tjenester, som feks Altinn, må du vente til etter september 2023.

Dersom ikke, så anbefaler vi at du migrerer så tidlig som mulig ifra mars.  Nasjonalt kritiske tjenester skal migrere fra mai, og Digdir vil ha direkte dialog med viktige enkelt-tjenester.

### Hvordan migrere i praksis ?

Det er to tilfeller:

#### A: Kunde har OIDC-integrasjon idag

For de aller, aller fleste vil det være tilstrekkelig å gjennomføre følgende steg:

1. Åpne evt. egen utgående brannmur til ny IP-adresse
1. Bytt til ID-portens nye issuer-URL: `https://idporten.no` (tbd).  
    * Noen IAM-produkter vil da automatisk laste ned oppdaterte metadata og etablere trust til det nye sertifikatet vårt.
3. Dersom forrige steg ikke gikk automatisk, må du manuelt konfigurere opp de nye endepunktene som du finner i metadataene våre, samt legge inn trust til vårt nye signeringssertifak
3. Konfigurere din integrasjon til å bruke PKCE
3. Du gjenbruker samme `client_id` som du bruker idag
3. Du gjenbruker samme `client_secret` som du bruker idag, evt. samme virksomhetssertifkat / asymmetriske nøkkel.


#### B: Kunde har SAML-integrasjon idag

Dersom du ønsker å forbli på SAML, trenger du ikke gjøre noe, utover å sjekke i testmiljøet i perioden mars-september om din SAML-integrasjon er kompatibel med den reduserte funksjonaliteten i ny SAML-proxy.

Vi anbefaler dog at alle migrerer til OIDC, i praksis må kunden da [etablere ny OIDC-integrasjon fra scratch ihht. integrasjonsguiden vår](https://docs.digdir.no/docs/idporten/oidc/oidc_guide_idporten).



## Detaljerte endringer i protokollen:

Nye ID-porten tar sikte på å følge Oauth2.1-spesifikasjonen, ulikt dagens løsning som er basert på 2.0. Grunnen til denne endringen er at vi ønsker å følge de oppdaterte sikkerhetskravene som er i 2.1.  Standard-flyt for alle integrasjoner blir OIDC og code-flow med tvungen bruk av PKCE og state og nonce.

SAML blir videreført kun for eksisterende tjenster, men med begrenset funksjonalitet, og fases på sikt ut.


### Ny issuer

Nye ID-porten vil komme på et nytt domene, og får da en ny issuer-verdi, og vil bruke et annet signeringssertifkat enn dagens.  Verdien er p.t. ikke bestemt, trolig `iss=https://idporten.no/`.  Det å inføre ny issuer muliggjør at kunden kan gradvis migrere til den nye løsningen tilpasset egne tidsplaner.

Samtidig gjør dette det mer komplekst for API-tilbydere som bruker [brukerstyrt datadeling](oidc_auth_oauth2.html), som da må stole på access_token fra to issuere dersom de ikke er i stand til å kreve/koordinere at sine konsumenter koordinert migrerer til Nye ID-porten samtidig med at APIet truster den nye issueren.

Ved utløp av migreringsperioden vil gammel issuer bli faset ut fullstendig.  De som da ennå ikke har flyttet OIDC-integrasjonen sin, vil slutte å fungere.

### Ny IP

Nye ID-porten vil også køyre på ein annan IP-addresse enn dagens, slik at kundar som har utgåande brannmur mot oss, må opne opp.

### SSO

Nye ID-porten vil som idag tilby SSO mellom alle integrasjoner både over OIDC og SAML.

Merk at i prøvedriftsperioden og i starten av migreringsfasen så vil ikke klienter som er flyttet til ny løsning få SSO til integrasjoner på gammel løsning.


#### SSO-fri innlogging

Nye ID-porten vil tilby ny funksjonalitet for SSO-fri innlogging.  Dette vil skje ved at kunden gjennom selvbetjening velger om klienten skal delta i SSO-sesjonen eller ikke.


### onbehalfof

[onbehalfof](oidc_func_onbehalfof.html) er en ID-porten-proprietær mekanisme for leverandører.  Denne blir videreført både for OIDC og SAML.

### Tvungen bruk av PKCE og state og nonce

Alle klient-integrasjoner **må** bruke [PKCE-funksjonaliten](oidc_func_pkce.html) og i tillegg sende med instans-unike state og nonce-verdier.  I dag er dette påkrevd bare for public-klienter, men frivillig, men sterkt anbefalt, for confidential-klienter.

### `sub` endres

Med ny løsning vil `sub`-verdien som en klient mottar i `id_token` for et gitt fødselsnummer bli endret. Selv om de aller fleste bruker av ID-portens kunde-integrasjoner forholder seg primært til fødselsnummer i `pid`-feltet, kan det være at deres IAM-programvare internt benytter seg av sub-verdien, og i de tilfellene der IAM-programvaren automatisk også oppretter lokale brukerbaser (Keycloak, blant annet) risikerer kundene at det vil bli generert duplikater.

I `access_token` vil `sub` også få nye verdier.

### Endringer i Single Logout og revokering

Det har skjedd endringer i OIDC-spesifikasjonen mhp logout.  Vi vurderer p.t. om vi skal endre dagens oppførsel til å være mer på linje her:

- er det hensiktsmessig at revokasjon av access_token/refresh_token også fører til at SSO-sesjonen blir terminert, slik som idag?
- er det hensiktsmessig at utlogging fra SSO-sesjon også invaliderer alle tokens til alle klienter tilhørende sesjonen?
- bør vi, som spec'en krever, innføre en "ønsker du virkelig å logge ut"-skjermbilde i ID-porten som del av utloggingen ?
- hvor strenge krav skal vi engentlig stille for å kunne sende brukes browser tilbake til oppgitt post_logout_redirect_uri ?


### Hyppigere redirect tilbake til klient med feil

I gammel OIDC-løsning så vil feilsituasjoner ofte føre til at brukeren får feilside i ID-porten og stopper hos oss.  I den nye løsningen vil i større grad enn tidligere brukeren bli redirecta tilbake til klienten med en beskrivende feilmelding.

### Støtte for implicit flow blir fjernet

Implicit-flow er ikke anbefalt av sikkerhetshensyn i de siste anbefalingene fra IETF.  Allerede idag tilbys ikke implicit for nye integrasjoner, kun for eksisterende.  I Nye ID-porten fjernes støtten for implicit helt, slik at de som bruker det idag, må skrive om sin løsning til å bruke code flow med pkce. Vi vurderer om vi skal innførere støtte for DPop på sikt.

### SAML

I ny løsning vil det bli tilbudt en rudimentær SAML-støtte, hvis formål kun er å videreføre eksisterende integrasjoner. Vi vil lage en enkel SAML-til-OIDC-proxy, som vi plasser foran ny OIDC-issuer.

Denne vil støtte SAML Web Browser SSO 2.0 med Artifact Resolution-binding.  Det vil bare være støtte for 1 AssertionConsumerURL, og ett kombinert signerings- og krypteringssertifikat.

Vi vil ikke støtte oppdatering av SAML-metadata, slik at når en kunde sine metadata går ut (typisk ved utløp av virksomhetssertifiktat), forventer vi at integrasjonen i stedet blir skrevet om til å bruke OIDC.

På sikt vil SAML blir faset helt ut.

### Pseudonymisering

[Pseudonymisering](oidc_func_nopid.html) vil bli påvirket av byttet av `sub`, se ovenfor.  

Selve `no_pid`-scopet videreføres ikke, så kunder må bruke enten opaque tokens eller pseudonymiserende scopes.
