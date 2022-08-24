---
title: Registrering av klienter
description: Registrering av klienter
summary: "Selvbetjeningsløsningen støtter flere typer klienter. Klienter må forhåndsregisteres, og korrekt registering av klient er viktig at sikkerheten skal være ivaretatt."

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_clientreg
---


## Bakgrunn

Det er kundens ansvar å sørge for at det faktiske bruksmønsteret er i samsvar med registreringen. Korrekt registrering er spesielt viktig for klienter som konsumerer APIer tilbudt av andre, og Digitaliseringsdirektoratets og API-tilbyders bruksavtaler regulerer dette ansvarsforholdet.


## ID-portens integrasjoner {#integrasjoner}

Selvbetjeningsløsningen håndterer 4 ulike typer av integrasjoner:

* ID-porten
* Kontaktregisteret
* Maskinporten
* API-klient innlogget bruker

Det er viktig å være klar over at disse integrasjonstypene rent teknisk alle er standard Oauth2 klienter, men med ulike egenskaper.  Se detaljer lenger ned.

Vi har 3 måter du kan få registrert din integrasjon:

- Selvbetjening, ved å logge inn på [selvbetjening på Samarbeidsportalen](https://selvbetjening-samarbeid.difi.no/#/).
- Selvbetjening, ved å bruke vårt [selvbetjenings-API]({{site.baseurl}}/docs/idporten/oidc/oidc_api_admin)
- Manuelt, ved å sende epost til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>  (kun for ID-porten og Kontaktregisteret)

## Integrasjonstyper

Du må registrere en integrasjonstype for å få fornuftige valg til klienten din i selvbetjeningsløsningen. Hvilken integrasjonstype du velger, vil legge føringer på hvilke scopes du kan bruke med klienten. En klient kan kun ha en integrasjonstype.

Det som støttes foreløpig er:

| Integrasjonstype |Beskrivelse|
|-|-|
|idporten   | Ordinær innlogging gjennom ID-porten  |
|maskinporten  | kun for server til server integrasjoner (B2B)  |
|krr   | Kontaktregisteret   |
|eformidling    | for eFormidling  |
|api_klient    | For tjenester som skal hente data fra et tredjparts-API på vegne av innlogget bruker. |

Det er ikke mulig å endre  integrasjonstype etter opprettelse.

Du vil ikke være i stand til å legge på et scope på klienten din som er i konflikt med klienten's integrasjonstype. F.eks du kan ikke legge til et scope som er begrenset til "maskinporten" på en ID-porten klient, og vice versa.

## Leverandører

Dersom du er leverandør, er det noen av klient-egenskapene nedenfor som du må passe på å få registrert rett.  Se [egen leverandør-informasjon](oidc_api_admin_leverand%C3%B8r.html).

## Oauth2-egenskaper

Dette avsnittet detaljerer noen viktige Oauth2 egenskaper som kategoriserer våre klienter.  Se gjerne [Oauth2 Dynamic Client Registration for mer informasjon (RFC7591)](https://tools.ietf.org/html/rfc7591#section-2).

I utgangspunktet kan du som kunde velge Oauth2-egenskaper fritt etter egen risikovurdering. De som konsumerer API tilbudt av andre må være oppmerksom på at API-tilbyder kan stille krav til spesifikke egenskaper.   Validering av slike krav skjer som hovedregel kun run-time ved tokenutstedelse og ikke ved klient-registrering.




### Klient-autentisering

Alt etter bruksområde, så tilbyr vi forskjellige metoder for autentisering av din klient.  Dette blir styrt av attributtet `token_endpoint_auth_method`:


|Metode|token_endpoint_auth_method|Beskrivelse|
|-|-|-|
| Statisk hemmelighet | client_secret_basic client_secret_post | En statisk hemmelighet (*client_secret*) som Digitaliseringsdirektoratet genererer og blir utvekslet manuelt, eller tilgjengeliggjort via selvbetjening.  Maks tillatt levetid er satt til 360 dager. Det er kundens ansvar å få rotert hemmeligheten før utløp for å sikre kontinuerlig tjenesteleveranse. |
| Virksomhetssertifikat   | private_key_jwt | Klienten bruker et gyldig virksomhetssertifikat fra Buypass eller Commfides. Organisasjonsnummeret i sertifikatet må stemme med klient-registreringa. Kunden kan valgfritt velge å "låse" klienten til bare et spesifikt virksomhetssertifikat. |
| Asymmetrisk nøkkel  | private_key_jwt | Den offentlige nøkkelen fra et egen-generert asymmetrisk nøkkelpar blir registrert på klient, og klienten bruker privatnøkkelen til å autentisere seg.  For å få lov til å registere slike klienter, må kunden etablere en [egen  selvbetjeningsapplikasjon]({{site.baseurl}}/docs/idporten/oidc/oidc_api_admin) (som selv må bruke virksomhetssertifikat) |
| Ingen   | none  | Klienten er en såkalt *public*-klient som ikke kan beskytte en hemmelighet på en tilfredstillende måte.  Gjelder single-page-applikasjon og i noen tilfeller mobil-apper  |

 Digitaliseringsdirektoratet anbefaler bruk av virksomhetssertifikat til klientautentisering,  da prosedyren for utstedelsen av slike er grundig regulert i lovverk og gir derfor både Digitaliseringsdirektoratet og API-tilbydere en god og sikker identifisering av klienten.   

 Digitaliseringsdirektoratet forutsetter at API-tilbyder og API-konsument håndterer sertifikat og nøkler på en måte som sikrer at ikke uvedkommende kan misbruke disse.

**Merk at eksisterende secret slettes dersom man endrer metoden til noe annet enn client_secret_***

### Grant-typer

Et grant representerer brukerens samtykke til å hente et access token (som i sin tur brukes til hente den beskytta ressurs tilhørende brukeren, se [Oauth2, kap 1.3](https://tools.ietf.org/html/rfc6749#section-1.3) samt [`grant_types` i DCR kap. 2](https://tools.ietf.org/html/rfc7591#section-2) )

ID-porten støtter følgende grants:

|Grant-type|Beskrivelse|
|-|-|
|authorization_code         | Autorisasjonskode-flyten, som beskrevet i [RFC 6749 kap 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)  |
|refresh_token      | Klienten bruker eit refresh-token for å hente nytt access-token. Bruker blir (normalt) ikke involvert.  |
|urn:ietf:params:oauth:grant-type:jwt-bearer|En signert JWT ihht [RFC7523](https://tools.ietf.org/html/rfc7523#section-2.1). Kan enten bruke virksomhetssertifikat i `x5c` eller `kid` til forhåndsregistrert asymmetrisk nøkkel.|  
|jwt_bearer_token   | kortform av urn:ietf:params:oauth:grant-type:jwt-bearer    |

Kun klienter som er registrert med `refresh_token` som tillatt grant-type, vil få utdelt refresh_token ved bruk av autorisasjonskode-grant.   

Maskinporten-klienter skal alltid bruke `jwt_bearer_token`.

Vi støtter ikke implicit, password eller client-credentials grant.

### Klient-typer

Klient-type (`application_type`) forteller hvilke type kjøretidsmiljø klienten kjører under.  [Oauth2 kap 2.1](https://tools.ietf.org/html/rfc6749#section-2.1) lister opp hvilke valg som finnes.  Valg av klient-type er en sikkerhetsvurdering kunden skal utføre.


|Klient-type|Oauth2 'application_type'|tilatt klientautentisering|Beskrivelse|
|-|-|-|-|
| Standard-klient   | Web   | private_key_jwt client_secret_basic client_secret_post | Typisk en server-side nett-tjeneste som er plassert i et sikkert driftsmiljø.  De aller fleste av ID-portens kunder skal bruke denne klient-typen.  Det er sterkt anbefalt, men ikke påkrevd, å bruke PKCE, samt state- og nonce-parametrene for standardklienter. <p/>Maskinporten-klienter faller alltid i 'standardklient'-kategorien, men her tillates ikke statiske hemmeligheter.  |
| [Single-page applikasjon (SPA)]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_spa)   | browser  | none |Typisk en javascript-klient som fullt og helt lever i brukerens browser.  En slik klient kan ikke beskytte en klient-hemmelighet/virksomhetssertfikat, og blir derfor en *public* klient, den har ingen klientautentisering <p/>Vi følger [de siste anbefalingene fra IETF](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-00), som krever at slike klienter skal bruke autorisasjonskodeflyten, og at både PKCE og state-parameter er påkrevd.  |
| [Mobil-app]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_app)  | native  | none   | Tilsvarende som for SPAer så kan ikke en mobil-app beskytte en hemmelighet når den blir distribuert gjennom App Store, og blir derfor også en public klient.



### Scopes

Kunden registere forskjellige oauth2 scopes på sine klienter. Se [regler for scopes]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_scope) for fullstendige detaljer.


## Oversikt over kombinasjonar

Tabellen under oppsummerer sammenhengen mellom de ulike egenskapene:

| Integrasjonstype | Klient-type 'application_type' |  tillatte 'token_endpoint_auth_method' | tillatte 'grant_types' | Standard-scope | Kan legge til scopes? |
|-|-|-|-|-|-|
|ID-porten| web |  client_secret_basic client_secret_post private_key_jwt      | authorization_code refresh_token  |openid profile | kun eidas, no_pid |
||  browser |  none     | authorization_code refresh_token  |openid profile | kun eidas, no_pid |
||  native |   none     | authorization_code refresh_token  |openid profile | kun eidas, no_pid |
|API-klient innlogget bruker  |samme som for idporten ||| | ja |
|Maskinporten| web |private_key_jwt  | jwt_bearer_token | |ja|
|Kontaktregisteret| web | private_key_jwt  | jwt_bearer_token |krr:global/kontaktinformasjon.read krr:global/digitalpost.read |nei|


## Bruk av asymmetrisk nøkkel

Man kan sende inn en [JWKS-struktur (RFC7517)](https://tools.ietf.org/html/rfc7517), dvs. en array av flere (inntil 5) JWK-representasjoner.

Er modellert som egen ressurs under klient `/clients/{client_id}/jwks`

Kan ikke gjøre operasjoner på enkelt-nøkler, kun hele settet, dvs. både POST og PUT erstatter evt. eksisterende JWKS.

Kun RS256 støttes som algoritme.

Man må alltid sende inn nøkkeldefinisjonen (kty,alg,use,e,n).  

Dersom man ønsker å "låse" integrasjonen til et spesifikt virksomhetifikat, må i tillegg inkludere sertifikatet (x5c). Da vil vi runtime validere revokasjon mot Buypass/commfides.

Eksempel på å legge inn en nøkkel:
```
POST /clients/{client_id}/jwks

{
  [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "jbi_min_noekkel",
      "alg": "RS256",
      "n": "lGc-dGnl9l9pCSb6eW5Mf23Aiss09q7Mxre9q9dazSiN9IjQJmkWDySpoYW3g_rSX2a74cg_q3iTSM0Co9iJ0LQp8gjoIi9I8syi6anBKK6fISr1adZbsGGrM1-zMRRNVsJ811snTdkbgx8ZxVRJM4F6D2KwL3TEnv0CRRVtphO0sRmimKBVVBdawPYQC64SQDvARy6xIlPhD-Da2n2Cl6vRQbVns7dYD8-C2TeYGgB_tAsrVSorx9GF5cZ-hlNHfIgg2qQYZzaljyfOWPPG5rybp9bAWg9vFllUFd_Y6vvZ0tqVfAyj67nFz_w4Rxy-MdRgERKHJcq81GkmVzq5fQ"
    }
  ]
}
```

`kid` velges av kunde selv, og må være unik innenfor alle ID-porten/Maskinportens kunder.

Ved klient-autentisering mot /token-endepunktet, og ved bruk av JWT bearer grants, **må** klienter som har registrert en nøkkel bruke `kid`-parameteren i jwt-headeren istedenfor x5c.


Ved bruk av selvbetjenings-API, må kunden passe på å sende konfigurasjoner som er kompatible med tabellen over, ellers risikerer man å ende opp med en ubrukelig klient.

Ved bruk av selvbetjening på Samarbeidsportalen er tilgjengelige valg avgrenset av valgt integrasjonstype.


## Andre metadata

Vi forsøker å følge spec'en i så stor grad som mulig.  Se gjerne [Oauth2 Dynamic Client Registration for mer informasjon (RFC7591)](https://tools.ietf.org/html/rfc7591#section-2).

### Basis-sett

Følgende metadata er felles for alle typer klienter:

|attributt|Påkrevd?|beskrivelse|
|-|-|-|
| client_id | Ja |Unik identifikator for klienten. Blir tildelt av Digitaliseringsdirektoratet. |
| client_orgno | Ja |Klientens organisasjonsnummer.  Juridisk konsument dersom leverandør-styrt integrasjon. Utleveres som "consumer_orgno" i tokens |
| supplier_orgno   | Nei  | Leverandørens organisansjonummer, dersom integrasjonen er kontrollert av leverandør  |
| scopes | Ja |Liste over scopes som klienten kan forespørre. For innlogging må alltid *openid* være tilstede. |


### Metadata for innloggings-klienter:

Klienter som skal innvolvere brukeren (altså brukerens browser) må ha følgende satt:

|attributt|Påkrevd?|beskrivelse|
|-|-|-|
| display_name | Ja |Klientens organisasjonsnavn som benyttes ved visning på web |
| redirect_uris | Ja| Liste over gyldige url'er som provideren kan redirecte tilbake til etter vellykket autorisasjonsforespørsel. |
| post_logout_redirect_uris | Ja |Liste over url'er som provideren redirecter til etter fullført egen-initiert utlogging. |
| frontchannel_logout_uri | Nei|  URL som provideren sender request til ved utlogging trigget av annen klient i samme sesjon |
| frontchannel_logout_session_required | Nei |Flagg som bestemmer om parameterne for issuer og sesjons-id skal sendes med frontchannel_logout_uri |
| logo | Nei |Logo som vises i innloggingsbildete utveksles p.t. manuelt |


### Metadata for klienter som konsumerer APIer

For klienter (både innlogging og maskin) som mottar *access_token* til API-sikring kan man registrere følgende:

| attributt | beskrivelse |
|-|-|
| authorization_lifetime | Levetid for registrert autorisasjon. |
| access_token_lifetime | Levetid for utstedt access_token |
| refresh_token_lifetime |Levetid for utstedt refresh_token |

Merk at de fleste av egenskapene til access_token blir bestemt av API-tilbyder, og ikke som en del av klient-registreringen.  En klient kan for eksempel ikke få token som har lengre levetid enn det API-tilbyder har satt som maks-grense.
