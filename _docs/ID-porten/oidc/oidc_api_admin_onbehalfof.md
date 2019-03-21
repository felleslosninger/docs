---
title: OAuth2 beskytta REST-API for administrasjon av onbehalfof-registreringar
description: API som gir tjenesteleverandørar mulighet til å administrere sine onbehalfof-registreringer.
summary: "Oauth2-beskyttet REST-grensesnitt som gir tjenesteleverandørar mulighet til å administrere sine onbehalfof-registreringer."
permalink: oidc_api_admin_onbehalfof.html
sidebar: oidc
product: ID-porten
---

> API'et er under utvikling og vil være klart til bruk i løpet av vinteren 2018

## Introduksjon

Obehalfof gjer det mogleg for tjenesteleverandørar å tilby tjenester til ulike tjenesteeiere over samme føderasjon
* Gir mulighet til å ha ulike navn, logo og tilbake-url
* Statistikk / fakturering går til riktig tjenesteeier

Id-porten til byr eit OAuth2 beskytta REST-api for å vise, opprette, endre og slette onbehalfof-registreringer. Bruk av dette api'et forutsetter at tjenesteeieren som registreres har godtatt Id-porten sine bruksvilkår.


## Hvordan få tilgang ?

Ta kontakt med idporten@difi.no for å få tilgang til å bruke tjenesten.


## Bruk av Oauth2

REST-grensesnittet er sikret vha. [server-til-server Oauth](https://difi.github.io/idporten-oidc-dokumentasjon//4_server-to-server-oauth2.html).

Følgende scopes benyttes for å få tilgang til grensesnittet:

|idporten::dcr.read|Gir tilgang til å lese klientregistreringer for klienter bundet mot samme org.nr. som gitt i access_token. Gir også lesetilgang til onbehalfof-registreringer|
|idporten:dcr::onbehalfof:write|Gir tilgang til å vise, opprette, endre og slette onbehalfofregistreringer for ein gitt klient. Gir ikke mulighet til å endre andre parametere på selve klienten.|

Kunden må i bestillingen oppi organisasjonsnummeret som brukes i virksomhetssertifikatet som generer JWT-førespørselen.  Sertifikatet må være virksomhetssertifikat fra Buypass eller Commfides, med key usage: Digital Signature.

For test-miljøer brukes virksomshetssertifiakter fra Buypass / Commfides sine TEST verdikjeder.

## REST-grensesnittet

Følgende endepunkter er tilgjengelige i API'et:

| Metode  | Sti | Beskrivelse |
| --- | --- | --- |
| GET |	/client/{client_id} | Henter klient med gitt klient_id |
| GET |	/client/{client_id}/onbehalfof/{onbehalfof_id} | Henter aktuell onbehalfof registrering |
| POST | /client/{client_id}/onbehalfof/{onbehalfof_id} | Oppretter ny onbehalfof registering |
| PUT | /client/{client_id}/onbehalfof/{onbehalfof_id}	| Endrer gitt onbehalfof registrering |
| DELETE | /client/{client_id}/onbehalfof/{onbehalfof_id} | Sletter aktuell onbehalfof registrering |

Mulige feilkoder er:

| kode | Beskrivelse|
| --- | --- |
|400 | Bad request – syntaktisk ugyldig request body.|
|401 | Ugyldig access token, f.eks. utløpt|
|403 | Returneres ved forsøk å aksessere en klient- eller onbehalfof-registrering som ikke tilhører organisasjonsnummeret som er bundet mot det brukte access_tokenet, eller det er brukt et access token som mangler de påkrevde scopene. |
|404 | Forespurt klient eller onbehalfof-registrering finnes ikke |

## Eksempel på bruk av api'et.

### Eksempel på å lese klientregistrering:

```
GET /client/oidc/oidc_eksempel_klient
Accept: application/json
Authorization: Bearer <my_access_token_value>


Respons:

{
	"client_id": "oidc_eksempel_klient",
	"active": true,
	"client_orgno": "991825827",
	"display_name": "En tilfeldig eksempelklient",
	"redirect_uris": ["https://eksempel.no/login", ],
	"post_logout_redirect_uris": ["https://eksempel.no/logout"],
	"scopes": ["openid", "profile"],
	"default_scopes": [],
	"authorization_lifetime": 7200,
	"access_token_lifetime": 300,
	"refresh_token_lifetime": 7200,
	"last_updated": "2017-11-02 T15:02:32 +0100",
	"client_type": "CONFIDENTIAL",
	"token_reference": "OPAQUE",
	"frontchannel_logout_session_required": false,
	"onbehalfof": [{
			"onbehalfof": "example_onbehalfof",
			"display_name": "Eksempelregistrering for onbehalof"
			"orgno": "991825828"
			"logo-url": "https://service.eksempel.no/logo.png"
			"url": "https://service.eksempel.no"
		}, {
			"onbehalfof": "example_onbehalfof_2",
			"display_name": "En annen eksempelregistrering for onbehalof"
			"orgno": "991825829"
			"logo-url": "https://otherservice.eksempel.no/logo.png"
			"url": "https://otherservice.eksempel.no"
		}
	],
	"force_pkce": false
}
```

### Eksempel på å lese onbehalfof-registrering:

Forespørsel
```
GET /client/oidc/oidc_eksempel_klient/onbehalof/example_onbehalof
Accept: application/json
Authorization: Bearer <my_access_token_value>
```

Respons:
```
Status code 200

{
	"onbehalfof": "example_onbehalfof",
	"display_name": "Eksempelregistrering for onbehalof"
	"orgno": "991825828"
	"logo-url": "https://service.eksempel.no/logo.png"
	"url": "https://service.eksempel.no"
}

```

### Eksempel på å opprette onbehalfof-registrering:

Forespørsel
```
POST /client/oidc/oidc_eksempel_klient/onbehalof/
Accept: application/json
Authorization: Bearer <my_access_token_value>
{
	"onbehalfof": "new_example_onbehalof",
	"display_name": "Eksempelregistrering for onbehalof"
	"orgno": "991825828"
	"logo-url": "https://service.eksempel.no/logo.png"
	"url": "https://service.eksempel.no"
}
```

Respons:
```
Status code 200

{
	"onbehalfof": "new_example_onbehalof",
	"display_name": "Eksempelregistrering for onbehalof"
	"orgno": "991825828"
	"logo-url": "https://service.eksempel.no/logo.png"
	"url": "https://service.eksempel.no"
}

```

###Eksempel på å endre onbehalfof-registrering:

Forespørsel
```
PUT /client/oidc/oidc_eksempel_klient/onbehalof/example_onbehalof
Content-type: application/json
Authorization: Bearer <my_access_token_value>

{
	"onbehalfof": "example_onbehalof",
	"display_name": "Modified display_name value"
	"orgno": "991825828"
	"logo-url": "https://service.eksempel.no/logo.png"
	"url": "https://service.eksempel.no"
}
``` 

Tilsvarende respons som ved nyregistrering

### Eksempel på å slette onbehalfof-registrering:

Forespørsel
```
DELETE /client/oidc/oidc_eksempel_klient/onbehalof/example_onbehalof
Authorization: Bearer <my_access_token_value>
``` 

Får respons med statuskode 200, og tom body.
