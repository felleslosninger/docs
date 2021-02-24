---
title: "Endringer i Nye ID-porten i 2022"
description: "ID-porten gjennomgår et omfattende moderniseringsløp i perioden 2020-2022, der hele kjernen i løsningen skrives om.  Det er et uttalt hovedmål for prosjektet at overgangen skal skje uten negative konsekvenser for kundene.  Samtidig ser vi at ny løsning ikke kan bli 100%-bakoverkompatible med dagens løsning, og denne siden dokumenterer de endringene vi ser vil komme."
summary: 'Endringer i Nye ID-porten i 2022'
permalink: oidc_protocol_nye_idporten.html
sidebar: oidc
product: ID-porten
---


## Bakgrunn

ID-porten gjennomgår et omfattende moderniseringsløp i perioden 2020-2022, der hele kjernen i løsningen skrives om.  Det er et uttalt hovedmål for prosjektet at overgangen skal skje uten negative konsekvenser for kundene.  

Samtidig ser vi at ny løsning ikke kan bli 100%-bakoverkompatible med dagens løsning, og denne siden dokumenterer de endringene vi ser vil komme.  Dette gjelder særlig proprietære mekanismer som vi har innført, eller på områder der vår bruk av protokollen skiller seg fra det som er gjengs i bransjen.  For eksempel har vi vært tidlig ute med å ta i bruk noen Oauth2-spesifikasjoner selv om de var i tidlig draft-fase, og vi ser på noen områder at standardbibliotek og -programmer ikke bruke mekanismene slik vi trodde.

Dagens driftsavtale med TietoEvry om drift av ID-porten utløper høsten 2022.  På ny driftsavtale ønsker vi kun å kjøre ny systemarkitektur. Den nye arkitekturen vil være basert på Kubernetes-platform der vi også trekker inn SaaS-tjenester der det er hensiktsmessig.  "Hjertet" i den nye løsningen vil vært basert på en moderne Oauth2/OIDC-autorisasjonsserver fra Connect2Id.


## Gjennomføring

Omskrivningsarbeidet er i full gang, og har holdt på siden sommer 2020.  Det pågår et anskaffelsesprosjekt for

* Vi håper å kunne tilby testmiljøer for kundene rundt sommer 2021.
* Vi håper å kunne tilby et isolert produksjonsmiljø tidlig 2022 som kjører i parallell med eksisterende løsning.  Dette gjør det mulig for kunden selv å bestemme et passende tidspunkt for migrering til ny løsning.
* Mot slutten av 2022, når dagens driftsavtale med TieotoEvry utløper, vil det bli gjennomført en "hard" migrering der alle resterende kunde-integrasjoner flyttes til ny løsning.


## Protokoll-målbilde

Nye ID-porten tar sikte på å følge Oauth2.1-spesifikasjonen når denne er klar.  De senste årene har det kommet mange nye utvidelser til ompatibel.

SAML blir videreført for eksisterende tjenster, men her  begrenset


## Funksjonalitet som ikke blir videreført

### OIDC/Oauth2

####Ny issuer
 Nye ID-porten vil komme på et nytt domene, og da få en ny issuer-verdi, og vil bruke et annet signeringssertifkat enn dagens.  Verdien er p.t. ikke bestemt.   Ny issuer muliggjør at kunden kan gradvis migrere til den nye løsningen tilpasset egne tidsplaner.

Samtidig gjør dette det mer komplekst for API-tilbydere, som da må håndtere access_token fra to issuere dersom de ikke er i stand til å kreve/koordinere at sine konsumenter koordinert migrerer til Nye ID-porten samtidig med at APIet truster den nye issueren.

Sannsynligvis vil også den gamle issueren og URL-endepunkt bli flyttet til ny driftsplatform ifbm den harde migreringa.  Vi har et mål om å fase ut gammel issuer når virksomhetssertifikatet den bruker til signering går ut.


#### Støtte for implicit flow blir fjernet

Implicit-flow er ikke anbefalt av sikkerhetshensyn i de siste anbefalingenefra IETF.  Allerede idag tilbys ikke implcit for nye integrasjoner, kun for eksisterende.  Med ny løsning fjernes støtten for implicit helt, slik at de som bruker det idag, må skrive om sin løsning til å bruke code flow med pkce.

#### `sub` endres

Med ny løsning er det trolig at `sub`-verdien som en klient for et gitt fødselsnummer i `id_token` vil bli endret. Selv om de aller fleste bruker av ID-porten forholder seg primært til fødselsnummer i `pid`-feltet, kan det være at deres IAM-programvare forholder seg sub-verdien, og i de tilfellene der IAM-programvaren også oppretter lokale brukerbaser (Keycloak, blant annet) risikerer kundene at det vil bli generert duplikater.

I `access_token` vil `sub` få nye verdier.

### SAML

I ny løsning vil det bli tilbudt en rudimentær SAML-støtte, hvis formål kun er å videreføre eksisterende integrasjoner.  Vi vil ikke støtte oppdatering av SAML-metadata, slik at når en kunde sine metadata går ut (typisk ved utløp av virksomhetssertifiktat), forventer vi at integrasjonen i stedet blir skrevet om til å bruke OIDC.

På sikt vil SAML blir faset helt ut.

## Funksjonalitet som p.t. er under diskusjon

* SSO-støtte mellom SAML og OIDC

* onbehalfof-integrasjoner i SAML

* onbehalfof-integrasjoner i OIDC.
