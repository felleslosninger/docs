---
title: Leverandører i ID-porten/Maskinporten

sidebar: oidc
product: ID-porten
---

Leverandører spiller en viktig rolle med å hjelpe offentlige virksomheter til å bruke ID- og Maskinporten, og løsningene tilbyr leverandører noe ekstrafunksjonalitet som skal gjøre administrasjonen enkel og samtidig sikker for både kunde og leverandør.

Leverandører får normalt ikke tilgang til ID-porten/Maskinporten på egne vegne. Integrasjon mot Digdirs fellesløsninger skal bare gjøres på vegne av kunder som har akseptert Digdirs bruksvilkår.

Det er viktig å være klar over at "en leverandør ikke er en leverandør", dvs. ulike leverandører og ulike brukscenario har ulike behov.  Typiske leverandør-bruksmønster i ID-porten/Maskinporten er:
- System-leverandører som utvikler fagsystemer i sky som kundens saksbehandlere eller innbyggere logger inn til.
- Driftsleverandører som utfører "ren" basis IT-drift av kundens egne systemer.
- Leverandører av "sluttbrukersystemer" (dvs. typisk app'er eller pc-software) som skal bruke offentlige APIer
- Konsulent-selskaper som utvikler "skreddersøm"-systemer på oppdrag av en enkelt kunde.
- Sektor-løsninger fra det offentlige som HelseID og Feide


# Generelle råd

Vi fraråder sterkt å dele klientregistreringer (med secrets/nøkler) på tvers av flere installasjoner. Dersom én installasjon med delt klient-registrering blir kompromittert (for eksempel client_secret på avveie), så er plutselig alle delte installasjoner blitt kompromittert, og leverandøren må umiddelbart oppdatere alle kunde-installasjoner.   Da er det mye bedre å ha mange klient-registreringer, en for hver "logiske" installasjon.

Vi anbefaler videre å bruke asymmetriske nøkler til klient-autentisering (private_key_jwt), istedet for virksomhetssertifkater eller statiske nøkler (client_secrets). Av sikkerhetshensyn bør ikke leverandører forvalte kundene sine virksomhetssertifikater, da disse potensielt kan gi vide tilganger også til andre systemer utover ID-porten/Maskinporten.

Digdir forventer at leverandører bruker selvbetjening til administrere sine kunde-integrasjoner.  Vi har web-basert selvbetjening dersom du har en håndfull kunder, og for større kunder anbefaler vi [API-basert selvbetjening]({{site.baseurl}}/docs/ID-porten/oidc/oidc_api_admin). Sistnevnte er basert på en standard RFC7591, og krever leverandøren sitt virksomhetssertifikat for tilgang.


## Spesielt om datadeling

Leverandør-funksjonaliteten slik den er i dag er i hovedsak tilpasset **innloggingstjenester**, og ikke datadeling i ID-porten eller Maskinporten.

Siden leverandør-funksjonaliteten i ID-porten gjør det mulig for Leverandør å selv-deklarere at de opptrer på vegne av vilkårlige orgno uten kundens eksplisitte samtykke, er det av sikkerhetshensyn ikke åpnet for at en leverandør kan "arve" kundens sine tildelte tilganger til 3-parts APIer.

Derimot er det i Maskinporten mulig for kunden å eksplisitt delegere API-tilgang gjennom Altinn Autorisasjon.  Tilsvarende funksjonalitet finnes p.t. ikke i ID-porten for brukerstyrt datadeling.


# Ulike måter å integrere på


## 1. Onbehalfof i ID-porten

[onbehalfof]({{site.baseurl}}/docs/ID-porten/oidc/oidc_func_onbehalfof) er en ID-porten-proprietær mekanisme som gir en leverandør mulighet til å gjenbruke en OIDC-integrasjon på vegne av mange kunder.  

Mønsteret passer best der leverandøren har kontroll over installasjonen (dvs. oauth2-klienten), typisk en installasjon på egen server i sikret driftsmiljø. Det er Leverandøren som eier integrasjonen (attributtet `client_org`), og Leverandøren bruker eget virksomhetssertifkat og/eller client_secret for å autentisere seg mot ID-porten.

Leverandøren må forhåndsregistere såkalte "onbehalfof"-verdier som blir knyttet til kundens orgno, normalt 1 verdi per kunde, og må sende riktig onbehalfof-verdi runtime ved innlogging.  Hver obof-verdi har eget tjensteeier-navn og logo som blir vist sluttbruker ved innlogging. Merk at redirect_uri'er må registreres på "mor-integrasjonen" og ikke på onbehalfof'ene.

I selvbetjening opprettes slike integrasjoner med valget "på vegne av flere kunder" (via selvbetjenings-api brukes `idporten:dcr/onbehalfof:write`)

Dersom integrasjonen skal kunne bruke [brukerstyrt datadeling]({{site.baseurl}}/docs/ID-porten/oidc/oidc_auth_oauth2) på vegne av kunden, eller integrasjonen har behov for å motta access_tokens med scopes eid av 3dje-part, må API-tilbyder gi leverandøren (altså ikke kunden) tilgang til scopet, for at leverandøren skal kunne registrer scopet på sin klient. Både API-tilbyder og leverandør bør merke seg at `consumer`-claimet i access_token da blir satt lik orgnummeret som tilhører onbehalfof-verdien.

Det gir ingen mening å bruke onbehalfof for Maskinporten-integrasjoner.


## 2. Selvstendige kunde-integrasjoner i ID-porten

Noen leverandører har av historiske årsaker systemer der de låner kunden sitt virksomhetssertifikat for å integrere mot ID-porten, selv om det ikke er anbefalt.

Disse leverandørene oppretter en integrasjon per kunde (dvs. egen client_id og klientautentisering), og for å synliggjøre at slike integrasjoner tilhører et leverandørforhold, blir de "merket" med leverandørens organisasjonsnummer (attributtet `supplier_orgno`).  Dersom integrasjonen bruker virksomhetssertifikat til klient-autentisering, er det kunden sitt sertifikat som skal brukes, så vi anbefaler heller asymmetriske nøkler eller client_secrets på disse.

I selvbetjening opprettes slike integrasjoner med valget "på vegne av en kunde" (via selvbetjenings-api brukes `idporten:dcr.supplier`). Digdir er restriktive med å tildele denne selvbetjeningsmuligheten til leverandører.

* Leverandøren må sette client_orgno lik egen kunde sitt organisasjonsnummer.
* Leverandøren kan opprette integrasjoner på vilkårlige client_orgno
* Leverandørens eget organisasjonnummer blir *automatisk* satt som `supplier_orgno` (basert på virksomhetssertifikatet som blir brukt mot admin-APIet)


Dersom integrasjonen skal bruke [brukerstyrt datadeling]({{site.baseurl}}/docs/ID-porten/oidc/oidc_auth_oauth2), må - på samme måte som for onbehalfof'er - API-tilbyder gi leverandøren sitt orgno tilgang til scopet, for at scopet skal kunne registreres på klient. Utstedte access_tokens  vil innholde både leverandørens og kundens organisasjonsnummer i hhv. `supplier` og `consumer` claimene.

## 3. Kun bruke redirect-uri
Noen leverandører velger å ikke bruke en av de 2 foregående mekanismene, og bruker i stedet én integrasjon, med ulike forhåndsregistrerte `redirect_uri` til å skille mellom kunder. Alternativt sendes en kunde-spesifikk `state`-verdi runtime (da må også [PKCE]({{site.baseurl}}/docs/ID-porten/oidc/oidc_func_pkce) brukes for å hindre csrf eller replay attack).

Ulempen med dette mønsteret er at man ikke kan ha kunde-spesifikt tjenestenavn og logo i innloggingsbildet samt at innlogginger telles og faktureres leverandøren og ikke kunden. Derfor passer mønsteret best for de som primært lager public klienter (typisk mobil-apper eller sluttbrukersystemer installert på pc).

## 4. Delegering i Altinn for Maskinporten

For datadeling mellom virksomheter gjennom Maskinporten er det mulig for en Kunde å eksplisitt [delegere en API-tilgang videre til Leverandør, ved at bemyndiget representant logger inn i Altinn]({{site.baseurl}}/docs/Maskinporten/maskinporten_func_delegering).

Kunde-Leverandør-forholdet blir for slike integrasjoner ikke forhåndsregistert på klient-registreringa via selvbetjening (som for de ovenstående alternativene), men sjekkes istedet runtime ved bruk.

Funksjonaliteten er kun tilgjengelig for 3-djeparts scopes som har `delegation_source`-feltet satt.



## Eksempler på bruk av selvbetjeningsAPI


### Eksempel på å lese onbehalfof-registrering:

Forespørsel
```
GET /clients/oidc_eksempel_klient/onbehalof/example_onbehalof
Accept: application/json
Authorization: Bearer <token med idporten:dcr/onbehalfof:write>
```

Respons:
```
Status code 200
{
	"onbehalfof": "example_onbehalfof",
	"display_name": "Oslo kommune barnehagesystem"
	"orgno": "991825828"
	"url": "https://oslo.eksempel.no"
}
```

### Eksempel på å ny opprette onbehalfof-registrering:

Forespørsel
```
POST /clients/oidc_eksempel_klient/onbehalof/
Accept: application/json
Authorization: Bearer token med idporten:dcr/onbehalfof:write>

{
	"onbehalfof": "new_example_onbehalof",
	"display_name": "Bergen kommune barnehagesystem"
	"orgno": "999888777"
	"url": "https://bergen.eksempel.no"
}
```


###Eksempel på å endre onbehalfof-registrering:

Forespørsel
```
PUT /clients/oidc_eksempel_klient/onbehalof/example_onbehalof
Content-type: application/json
Authorization: Bearer <my_access_token_value>

{
	"onbehalfof": "example_onbehalof",
	"display_name": "Modified display_name value"
	"orgno": "991825828"
	"url": "https://service.eksempel.no"
}
```


### Eksempel på å slette onbehalfof-registrering:

Forespørsel
```
DELETE /clients/oidc_eksempel_klient/onbehalof/example_onbehalof
Authorization: Bearer <my_access_token_value>
```

Får respons med statuskode 200, og tom body.
