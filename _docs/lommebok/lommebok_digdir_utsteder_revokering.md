---
title: Revokering av bevis
sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder_revokering
---

# Revokering av bevis

Utstedarar i sandkassa kan no *revokere* bevis dei har utstedt. Revokering brukast når eit bevis ikkje lenger skal vere gyldig — til eksempel fordi grunnlagsdata har endra seg, brukaren har mista retten til beviset, eller beviset vart utstedt ved ein feil.

## Teknisk mekanisme

Revokering er implementert etter IETF-spesifikasjonen [Token Status List (TSL)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/), som gjeld for både SD-JWT- og mdoc-baserte bevis.

Kort fortalt:

- Alle bevis frå Bevisporten inneheld ein `status`-objekt som peiker på ei statusliste via `uri`, og gir beviset sin plass i lista via `idx`.
- Status List Token er ein signert JWT som samlar statusar for mange bevis i éi komprimert bitliste.
- I dagens implementasjon brukar Bevisporten 2 bit per bevis og har to mogelgheiter: `00` = gyldig, `01` = revokert. 

Status List Token-en er offentleg tilgjengelig og kan hentast utan autentisering — sjå [Som brukarstad: sjekke status](#som-brukarstad-sjekke-status) under.


## Tilgjengelegheit

Revokering er tilgjengelig og som default aktivert for **alle bevistypar** i Bevisporten i dag.   Det er mogeleg å deaktivere per bevistype ved å ta kontakt med Digdir.


## Validere revokasjons-status

Brukarstader som treng vite om eit bevis er revokert, må utvide valideringa som er beskrive i [OpenID4VP](./lommebok_protokoll_vp.html) med ei statuskontroll:

1. Valider beviset som normalt (signatur, tillitsliste, at utstedar er autorisert for bevistypen, holder-binding).
2. Les `status.status_list.uri` og `status.status_list.idx` frå beviset.
3. Hent Status List Token med eit HTTP GET-kall mot `uri` (`Accept: application/statuslist+jwt`). Dette kallet krev ikkje autentisering.
4. Valider signaturen på Status List Token-en, og respekter `exp`/`ttl` for cache av responsen.
5. Dekomprimer bitlista og les verdien på indeksen `idx`.
6. Om verdien er `01`, er beviset revokert og skal avvisast. Om verdien er `00`, er beviset ikkje revokert (Du må framleis sjekke gyldigheitsperiode, eller andre bevistype-spesifikke valideringar som står i rulebook). 


## Trigge revokering som sluttbrukar

Gå til [revokasjonssida i Bevisgenerator](https://bevisgenerator.test.eidas2sandkasse.net/revoke), velg bevistypen du vil revokere, og skriv inn fødselsnummeret til testbrukaren din.


## Trigge revokering som utstedar

Bevisporten sitt API har to endepunkt for å revokere bevis, avhengig av kva utstedingsflyt som vart nytta ved utstedelse. Begge er PUT-kall og krev eit gyldig Maskinporten-token utstedt til organisasjon som eig bevistypen.

| Flyt | Endepunkt | Bruk |
|---|---|---|
| Pre-authorized code flow | `PUT /api/v1/credential/revoke`<br/>`PUT /{tenant}/api/v1/credential/revoke` | Revokerer eit spesifikt bevis, identifisert med `issuance_transaction_id`. |
| Authorization code flow | `PUT /api/v1/credential/revoke/by-subject`<br/>`PUT /{tenant}/api/v1/credential/revoke/by-subject` | Revokerer **alle** bevis utstedt for ein gitt `subject.identifier` (normalt fødselsnummer) og `credential_configuration_id`. |

Begge endepunkta finst også i ein tenant-spesifikk variant, `/{tenant}/api/v1/credential/revoke...`, der `{tenant}` er tenant-identifikatoren din (t.d. `pid`) — på samme måte som for dei andre credential-endepunkta i API-et.

Full OpenAPI-spesifikasjon finn du i [Swagger UI](https://utsteder.test.eidas2sandkasse.net/swagger-ui/index.html#/).


### Revoke i pre-authorized code flow

Request body (`PreAuthCredentialRevokeRequest`):

```json
{
  "credential_configuration_id": "some.known.credential_mso_mdoc",
  "issuance_transaction_id": "xyz123..."
}
```

- `credential_configuration_id` — identifikatoren for bevistypen, slik den er definert i utstedar-metadata.
- `issuance_transaction_id` — ID-en frå utstedingstransaksjonen (samme ID som blei brukt/returnert da beviset blei oppretta via `POST /{tenant}/api/v1/credential/issuance-transaction`).

Svar: `204 No Content` ved suksess.

### Revoke i authorization code flow

Request body (`AuthCodeCredentialRevokeRequest`):

```json
{
  "credential_configuration_id": "some.known.credential_mso_mdoc",
  "subject": {
    "identifier": "12345678901"
  }
}
```

- `credential_configuration_id` — identifikatoren for bevistypen.
- `subject.identifier` — subjektidentifikatoren (typisk fødsels-/D-nummer eller organisasjonsnummer) som beviset/beviset er utstedt til.

Merk at dette revokerer **alle** bevis som matchar både `credential_configuration_id` og `subject.identifier` — ikkje berre eitt enkelt bevis. Svar: `204 No Content` ved suksess.




## Avgrensingar i dagens versjon

- Berre binær status (gyldig/revokert) er støtta — ingen mellomtilstand som «suspendert» er p.t. implementert.
- Det er ikkje definert feilkodar eller feil-body for revoke-endepunkta, utover `204 No Content` ved suksess.
- Revokering gjeld heile beviset/subjektet — det er ikkje mogleg å revokere berre enkelte claims i eit bevis.

## Sjå også

- [OpenID4VCI](./lommebok_protokoll_vci.html) — korleis bevis blir utstedt
- [OpenID4VP](./lommebok_protokoll_vp.html) — korleis bevis blir verifisert
- [Digdir sin utsteder](./lommebok_digdir_utsteder.html)
- [Swagger UI for Bevisporten](https://utsteder.test.eidas2sandkasse.net/swagger-ui/index.html#/)
- [IETF draft: Token Status List (TSL)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
