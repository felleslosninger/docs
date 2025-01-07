---
title: ID-porten testbrukere
description: ID-porten testbrukere
summary:

toc: false
sidebar: oidc
product: ID-porten

redirect_from: /idporten_testbrukere
---

Her finner du informasjon om testbrukere som kan benyttes for testing av ID-porten integrasjoner i verifikasjonsmiljøene Ver2/Test.

## TestID

Vi anbefaler at alle kunder bruker **TestID** når de skal teste ID-porten. TestID tilbyr å velge sikkerhetsnivå. 

![TestID logo]({{site.baseurl}}/assets/testid.svg)

TestID støtter innlogging med **syntetisk personidentifikator**  (+80 på måned-sifrene), og man slipper da risiko for å blande sammen test- og produksjonsdata.

TestID har ikke noe passord, så man slipper å ta kontakt med Digdir for å tildelt, opprettet eller nullstilt brukere.

Vi anbefaler å bruke [Tenor testdata-søk](https://www.skatteetaten.no/skjema/testdata/) til å finne test-brukere fra Test-Folkeregisteret.

Syntetiske testbrukere kan også benyttes til "headless login" for automatisert API-testing.  Dette er beskrevet lenger ned på denne siden.


## MinID

### Opprette testbruker selv i testmiljøet TEST

Det er mulig å opprette testbruker i MinID på egenhånd i det nye testmiljøet TEST. En må da følge vanlig flyt for bestilling av MinID. Dette forutsetter at en benytter syntetisk personidentifikator (+80 på måned-sifrene). PID må hentes fra [Tenor testdata-søk](https://www.skatteetaten.no/skjema/testdata/). 

**Framgangsmåte**

- trykk i innloggingsbildet i TEST i MinID "Bestill ny MinID". Eller bruk direktelenke: [https://aktiveringsbrev.test.minid.no/order](https://aktiveringsbrev.test.minid.no/order)
- fyll inn syntestisk personidentifikator
- bestill aktiveringsbrev. Man får så en aktiveringskode.
{% include note.html content="I produksjonsmiljøet vil sluttbruker få tilsendt aktiveringskode per post. I testmiljøet kommer aktiveringskode umiddelbart. Bruker må i begge tilfellene gå inn på sida for aktiveringsbrev på nytt for å registrere kode og få fullført oppretting av ny bruker i MinID" %}
- legg inn aktiveringskoden i ["Registrer aktiveringsbrev"](https://aktiveringsbrev.test.minid.no)  


### Statisk OTC - TEST

Det er funksjonalitet for statisk OTC i testmiljøet VER2/TEST. Dette gjelder i innloggingsflyt og glemt-passordflyt. Det er kun mulig for testbrukere med syntetisk personidenfikator. OTC blir i tillegg sendt på sms til oppført mobiltelefonnummer på brukeren en logger inn med. Evt e-post i glemt-passordflyt. 

Kontaktinformasjonen (epost, tlf)  som blir opprettet på en MinID testbruker blir registrert i Kontakt- og reservasjonsregisteret (KRR). Les mer om hvordan du endrer kontaktinformasjon på en testbruker på [våre sider om KRR](https://docs.digdir.no/docs/Kontaktregisteret/krr_sluttbrukerinnstillinger#oppdatering-av-kontaktinfo-i-minprofil).

**OTC**

(Ny kode f.o.m. 24.10.2023)
- innlogging: 12345  
- glemt passord: 12345
  
<!---
## BankID

For de som ikke kan bruke syntetiske fødselsnummer, tilbyr vi et sett med standard testbrukere med BankID med personnumre som ikke finnes i Folkeregisteret.

**Passord og engangskode**

- Engangskode: otp
- Passord: qwer1234 


| 08089409382 |	08089408084 |	08089406820	| 08089405603	| 08089404224 |
| 08089409110 |	08089407967	| 08089406669	| 08089405522	| 08089404143 |
| 08089408912 |	08089407886	| 08089406588	| 08089405441	| 08089404062 |
| 08089408831 |	08089407614	| 08089406316	| 08089405360	| 08089403945 |
| 08089408750 |	08089407533	| 08089406235	| 08089405018	| 08089403864 |
| 08089408599 |	08089407452	| 08089406154	| 08089404739	| 08089403783 |
| 08089408408 |	08089407371	| 08089406073	| 08089404658	| 08089403511 |
| 08089408327 |	08089407290	| 08089405956	| 08089404577	| 08089403430 |
| 08089408246 |	08089407029	| 08089405875	| 08089404496	| 08089403279 |
| 08089408165 | 08089406901	| 08089405794	| 08089404305	| 08089403198 |

**Merk: Disse testbrukerene er allment tilgjengelige og vil bli resatt med jevne mellomrom.**

--->


## Automatisert testing av API'er beskyttet med access_token fra ID-porten

ID-porten i testmiljøer tilbyr "headless login" der tokens kan utstedes uten brukerinteraksjon til syntetiske testbrukere.  Denne funksjonalitetem skal kun brukes til å forenkle testing av API'er beskyttet av access_token fra ID-porten.

I denne forenklede flyten kan en syntetisk testbruker logges inn automatisk ved å sende inn et `login_hint` og liste over `scope` samt øvrige vanlige parametre i en [authorization request]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_authorize) til ID-porten.

 Parameter | Beskrivelse | Eksempel
 -|-|-|
 `login_hint` | Angir hvilken syntetisk personidentifikator som skal brukes samt sikkerhetsnivå som ønskes | `login_hint=testid:12345678901_idporten-loa-high`
 `scope`      | Angir hvilke scope som skal implisitt samtykkes til | `scope=openid profile mitt:api_scope`

`id_token` som utstedes vil ha `amr=TestID`.

Klienten leser authorization response fra location header og plukker ut code (og verifiserer state).  Klienten kaller deretter [token-endepunktet]({{site.baseurl}}/docs/idporten/oidc/oidc_protocol_token) på vanlig måte.

<div class="mermaid">
sequenceDiagram
  Klient ->> OpenID Provider: HTTP GET autentiseringsforespørsel (/authorize)
  note over OpenID Provider: Automatisk autentisering basert på login_hint og implisitt samtykke til scopes
  OpenID Provider ->> Klient: HTTP response med location header med autorisasjonscode
  Klient ->> OpenID Provider: HTTP token-forespørsel (/token)
  OpenID Provider ->> Klient: id_token + access_token (evt. refresh_token)
  Klient ->> API: bruke API med access_token
  API ->> OpenID Provider: validere token
  OpenID Provider ->> API: token informasjon
  API->>Klient: Resultat av API-operasjon
</div>

Under er et eksempel med bruk av Curl.  Det kuttes litt i output for å tydeliggjøre relevant informasjon.

Redirected authorization request simuleres med GET og authorization response finnes i response header location.  Innsending request:
```
 curl -v https://login.test.idporten.no/authorize\?scope\=openid%20profile%20apiscope\&client_id\=oidc_idporten_test_client\&redirect_uri\=https://oidc-test-client.test.tools.idporten.no/authorize/response\&response_type\=code\&state\=LzFinVZzwoTWWJNQyxCSspoBnVTh9Hk1ugJLmvKVPdU\&nonce\=iDyWdWH18O_lJxkdyPF28heGSBTz2Zwld9cO_GCI6f0\&acr_values\=idporten-loa-substantial\&ui_locales\=nb\&code_challenge_method\=S256\&code_challenge\=s2Zoo2UrS7PcGTZO7P9rPLaR0d-R-8OhbS4lSJxJDgw\&login_hint\=testid:28876895937_idporten-loa-substantial
```
Relevant fra response:
```
< HTTP/1.1 302 
< set-cookie: IDPORTEN_AUTH=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:10 GMT; SameSite=Lax
< set-cookie: SESSION=; Max-Age=0; Expires=Thu, 1 Jan 1970 00:00:00 GMT; Path=/; Secure; HttpOnly; SameSite=Lax
< location: https://oidc-test-client.test.tools.idporten.no/authorize/response?code=Jj_5MDvtbaYM6k-K94S4wg.IcwLOy-CkPnDzlERTcZlKA&iss=https%3A%2F%2Ftest.idporten.no&state=LzFinVZzwoTWWJNQyxCSspoBnVTh9Hk1ugJLmvKVPdU
```
Plukk ut `code` og lag token request.
```
~ curl --location 'https://test.idporten.no/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic *****' \
--data-urlencode 'code=Jj_5MDvtbaYM6k-K94S4wg.IcwLOy-CkPnDzlERTcZlKA' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'client_id=oidc_idporten_test_client' \
--data-urlencode 'redirect_uri=https://oidc-test-client.test.tools.idporten.no/authorize/response' \
--data-urlencode 'code_verifier=hITge41ZTC3OrdiokQsW2QivzMq01mg3IPxTpqTazZU'
```
Hent ut access_token fra response.
```
{"access_token":"...","refresh_token_expires_in":600,"refresh_token":"...","scope":"openid profile apiscope","id_token":"...","token_type":"Bearer","expires_in":120}
```
Bruk `access_token` mot API som skal testes.
 
## Manuell behandling

Har du spesielle behov knyttet til testbrukere må du kontakte oss på servicedesk@digdir.no for manuell behandling.
