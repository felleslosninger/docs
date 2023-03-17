---
title: Overordnet arkitekturbeskrivelse
description:
summary:

sidebar: oidc
product: ID-porten
redirect_from: /idporten_overordnet
---

ID-porten gjør innlogging til digitale tjenester trygt for innbyggere.  Se [produktsida for ID-porten på Samarbeidsportalen ](https://samarbeid.digdir.no/id-porten/id-porten/18) for overordnet informasjon om hva ID-porten er, hva den koster og hvordan inngå bruksvilkår for å kunne ta den i bruk.

## Introduksjon

ID-porten tilbyr følgende bruksområder til kundene:

- [**Autentisering av innbyggere** til nett-tjenester]({{site.baseurl}}/docs/idporten/oidc/oidc_guide_idporten), til [mobil-app'er]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_app) eller til [javascript-applikasjoner]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_spa)

- [**API-sikring** i kontekst av en innlogget bruker]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2), populært kalt brukerstyrt datadeling.

## Arkitektur


Arkitekturen for ID-porten ser slik ut:

<div class="mermaid">
graph LR
  subgraph Digitaliseringsdirektoratet
    IDP[ID-porten]
    SAML[SAML-proxy]
    SADM[(Selvbetjening <br/>klientregistrering)]
  end
  subgraph Kunde
     SP[SAML-tjeneste <br/>Service Provider]
     RP[OIDC-tjeneste <br/>Relying Party]
     ADM[Administrator]
  end
  RP---|OIDC|IDP
</div>

Selve ID-porten er basert på en moderne Oauth2/OIDC autorisasjonsserver fra Connect2ID.

[SAML-grensesnittet]({{site.baseurl}}/docs/idporten/oidc/oidc_func_saml) er basert på en enkel proxy som oversetter kundens SAML-meldinger til OIDC-protokollen.

Bemyndigede ansatte eller systemer bruker [Digdirs felles selvbetjeningsløsning på web eller over API]({{site.baseurl}}/docs/maskinporten/maskinporten_sjolvbetjening_web)
 til å registrere og vedlikeholde kundens integrasjoner.

Følgende aktører inngår i løsningen:

| Aktører | Beskrivelse |
| --- | --- |
| Sluttbruker | Innbygger med eID |
| ID-porten | *ID-porten* er et tillitsanker for offentlige virksomheter. ID-porten knytter de offentlige virksomhetene og e-ID-leverandørene sammen. |
| Kunde | Offentlig virksomhet som har akseptert bruksvilkår |
| Tjenesteleverandør | Leverandør som leverer tjenester til en offentlig virksomhet |
| API-tilbyder | Kunde som tilbyr APIer sikret med ID-porten. |
| e-ID-leverandør | En av de 4 e-ID-aktørene som er tilgjengelige i ID-porten: MinID, Commfides, Buypass, BankID |
| MinID | *MinID* er en offentlig utstedt e-ID på nivå betydelig, som tilbyr autentisering basert på engangskoder på sms eller app. |
| Sertifikatutsteder | Sertifikatutsteder som oppfyller kravene for virksomhetssertifikater i henhold til Lov om Tillitstjenester. |

## Autentisering av sluttbruker
ID-portens tjenestetilbud for autentisering kan funksjonelt oppsummeres slik:

#### Støttede protokoller
* OpenID Connect
* SAML2 (fases ut!)

#### Føderering / SSO

Dersom sluttbruker er innlogget hos tjenesteeier A og velger å gå videre til en tjenesteeier B uten å logge ut, vil bruker automatisk logges inn uten at bruker må autentisere seg på nytt.

#### Sesjonsoppgradering

Det er mulig for en sluttbruker å gjennomføre en autentisering på nivå 3 og seinere gå til en tjeneste som krever et høyere sikkerhetsnivå. I dette tilfellet vil ID-porten be brukeren om å oppgradere sikkerhetsnivå.

#### Europeiske brukere

ID-porten har støtte for at [europeiske brukere]({{site.baseurl}}/docs/oidc/oidc_func_eidas) kan logge seg på norske tjenester.  eIDAS-forordningen i EU åpner for at autentisering skal kunne skje på tvers av landegrenser

## Brukerstyrt datadeling

ID-porten kan også [styre tilgang til APIer hos 3dje.part]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_oauth2)

API-tilgangen kan være innloggingsbasert (implisitt samtykke) eller brukerstyrt (eksplisitt samtykke).  I begge tilfeller  gjelder autorisasjonen kun for en enkelt innbygger, ulikt [Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_overordnet) som er tiltenkt hjemmelsbasert datadeling.

API-tilganger i ID-porten er modellert som Oauth2 scopes. For tilgangsstyrte scopes er det et organisasjonummer (=API-konsument) som blir gitt tilgang av API-tilbyder.  API-konsument må så aktivt selv registrere det tildelte scopet på en av sine integrasjoner.


## Hvordan få tilgang til ID-porten

Følg prosessen på [Samarbeidsportalen](https://samarbeid.digdir.no/id-porten/ta-i-bruk-id-porten/94) for å integrere mot ID-porten.

#### Bruk selvbetjening til å registere integrasjonen din

Kunden bruker selvbetjeningsløsningen til å registrere påkrevd informasjon om integrasjonen sin. Dette er nærmere beskrevet under [klientregistrering]({{site.baseurl}}/docs/idporten/oidc/oidc_func_clientreg)

#### Send oss logoen din

Kunde må sende oss egen logo som blir brukt i innloggingsbildet. Logoen for tjenesten må oppfylle følgende krav:

| --- | --- |
| Filformat | .png .jpg eller .gif |
| Størrelse | Maksimal høyde 90 pixel og en bredde som ikke bør overskride 135 pixel. |
| Farge | Bakgrunnsfargen på ID-porten er #f3f4f4, så logoen bør enten ha denne bakgrunnsfargen eller eventuelt ha transparent bakgrunn. |

#### Test din egen løsning

Kunden må utføre en rekke verifikasjonstester for å bekrefte at integrasjonen oppfyller ID-portens krav.

[Verifikasjonstester finner du her]({{site.baseurl}}/docs/idporten/idporten/idporten_verifikasjonstester).

[Testbrukere finner du her]({{site.baseurl}}/docs/idporten/idporten/idporten_testbrukere).

#### Åpne for IP-adresser

Dersom kunden har utgående brannmur, må det [åpnes for ID-portens IP-adresse]({{site.baseurl}}/docs/general/IP).

#### Sørg for tilstrekkelig egen logging

Det anbefales at kunden logger følgende informasjon om forsøk på autentisering:
* Dato og tidspunkt
* Hvilken handling som ble forsøkt
* Resultatet av handlingen
* Brukerens IP-adresse  
* SessionIndex / sid
* Fødselsnummer

Kunden sitt konkrete behov for logging opp mot personvernbetraktninger må vurderes av den enkelte kunde selv.

#### Etabler gode IT-sikkerhetsrutiner i virksomheten

Det er viktig at Kunden beskytter integrasjonen sin og etablerer rutiner slik at kun bemyndiget personell har tilgang til den. Se f.eks [anbefalinger for sertifikatbehandling, logging og sporing fra Veileder for virksomhetsautentisering](https://www.digdir.no/datadeling/sertifikatbehandling-logging-og-sporing/2438)


Kunden skal også gjøre en risikovurdering av egen løsning, her anbefaler vi [Veileder for identifikasjon og sporbarhet i elektronisk kommunikasjon med og i offentlig sektor](https://www.digdir.no/digital-samhandling/veileder-identifikasjon-og-sporbarhet-i-elektronisk-kommunikasjon-med-og-i-offentlig-sektor/2992)


#### Bruk av virksomhetssertifikat

Vi anbefaler at kunder bruker virksomhetssertifikat til oppkobling mot ID-porten. For kunder som har mange integrasjoner, bør man heller vurdere å bruke virksomhetssertifikatet til å  automatisere integrasjonsvedlikeholdet slik at hver enkelt-integrasjon istedet bruker en assymetrisk nøkkel til oppkobling og denne blir rotert hyppig.

Merk at sertifikatutstedere av virksomhetssertifikat har noe bestillingstid. Tjenesteleverandører oppfordres til å bestille sertifikat i god tid.


### Håndtering av nøkler

Det er sentralt for sikkerheten i løsningen at tjenesteleverandør planlegger og designer prosedyrer for god nøkkelhåndtering (Key management, uansett om dette er statiske hemmeligheter (client_secret), egne-generete asymmetriske nøkler eller virksomhetsssertifikat.  

Hvis en nøkkel kompromitteres, kan en angriper utgi seg for å være kunde i dialogen med ID-porten og dekryptere persondata sendt fra ID-porten. Slike sikkerhetsbrudd vil formodentlig i særlig grad ramme tilliten til kunden, men kan også tenkes å svekke tilliten til hele føderasjonen.

Følgende punkter er det viktig at man tenker gjennom i forbindelse med nøkkelhåndtering:
* Hvor oppbevares private nøkler, og hvordan sikres adgang til dem? For optimal beskyttelse kan en nøkkel oppbevares i kryptografisk hardware (HSM – hardware security module), men ofte benyttes krypterte filer som et billig, men mindre sikkert alternativ.
* Hvordan håndteres backup av nøkler og hvordan gjenetableres disse ved behov?
* Hvilket personell har tilgang til servere med private nøkler, og hvem har eventuelt tilgang til passord som kan benyttes til å dekryptere nøklene slik at de opptrer i klartekst? Kan enkeltpersoner skaffe seg adgang til private nøkler? Ligger passord for tilgang til nøkkellager ubeskyttet i konfigurasjonsfiler?
* Hvordan håndteres fornyelse av nøkler når tilhørende sertifikater utløper? Hvis en tjenesteleverandør ikke fornyer nøkler/sertifikater innen de utløper, kan tjenester for tjenesteeier plutselig slutte å virke.
* Hva er prosedyren om en privat nøkkel kompromitteres, eller om det er mistanke om at så har skjedd?
* Hvordan loggføres nøkkelhåndteringsprosessen hos tjenesteleverandør?

En kunde bør analysere disse problemstillingene nøye, og utarbeide passende driftsprosedyrer som implementerer organisasjonens IT sikkerhetspolitikk.




## Problemer ?

Om du opplever problemer med integrasjonen din: Kontakt servicedesk@digdir.no oppgi client_id og miljø og forklar problemet.
