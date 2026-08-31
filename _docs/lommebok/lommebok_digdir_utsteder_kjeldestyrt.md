---
title: Bevisporten, utstedelse styrt av datakjelde
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder_kjeldestyrt
---

Denne sidan dokumenterer bruksmønsteret for **datakjelde-styrt utstedelse** ved bruk av Digdir sin bevis-utstedar, Bevisporten.

Denne flyten er hensiktmessig for verksemder som ynskjer mest mogeleg kontroll sjølve over brukeropplevinga.  Nokre typiske karakteristika ved ein slik flyt kan vere: 

- Datakjelda ynskjer ikkje å la sluttbrukar starte ei lommeboksprosess før dei er sikre på at brukaren faktisk oppfyller vilkår for å få eit bevis (til dømes unngå at innbyggarar som ikkje har førarrett forsøker å be om førarkort).
- Sluttbrukaren må på førehand vere innlogga hjå datakjelda.
- Datakjelda tek sjølv på seg mykje av ansvaret for å sikre at ein sluttbrukar sitt bevis ikkje hamnar i ein annan brukar si lommebok.


## Brukersmønster #1: Datakjelde styrer flyten

I dette bruksmønsteret so er det datakjelda som styrer flyten:
1. Sluttbrukar er innlogga på ei nett-teneste hjå datakjelda og ynskjer få eit bevis. 
1. Datakjelda ber utstedaren om å lage eit bevis av ein viss type.
1. Responsen er eit Credential Offer som datakjelda rendrar som ein brukerspesifikk QR-kode
1. Brukaren scanner QR-koden med lommeboka si og får beviset utlevert

I steg #2 finst det to variantar for å overføre sjølve bevis-innhaldet, data kan anten inkluderast direkte i kallet (push), eller hentast frå eit eksisterande API tilhøyrande datakjelda (pull).

Her ser me flyten vist som eit sekvensdiagram:

<div class="mermaid">
sequenceDiagram

  actor b as Brukar
  participant l as Lommebok
  participant t as Teneste
  participant u as Utstedar
  participant a as API

  note over b,t: loggar inn på teneste og startar bevis-utstedelse

  t->>+u: /issuance-transaction(bevis-type*, brukar-id*, {bevis-innhald})

  u-->>-t: Credential Offer m/ pre-auth code
  t-->>t: rendre QR 
  
  opt Ved pull-basert variant
    u<<-->>a: hent bevis-innhald
  end

  note over b,t: scann QR med lommebok
  l->>+u: /token (pre-auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>


## Tillitsforhold

QR-koden (også kjent som credential offer) er i denne brukerreisa knytt til ein spesisikk brukar.   Det betyr at flyten er sårbar for scanne-over-skuldra-angrep.  Spec'en legg opp til at brukaren skal taste ein hemmelegheit `tx_code` (t.d pin-kode) som blir kommunisert til brukaren på ein annan måte. Dette er p.t. ikkje støtta av Bevisporten.

Brukerspesifikke QR-kodar medfører også at datakjelda må vere sikker på at dei syner rett credential offer til rett brukar. 

Sidan utstedaren i dette bruksmønsteret ikkje har noko browser-interaksjon med sluttbrukar, betyr det at utstedar stoler fullt og heilt på at datakjelda tek ansvar for at sluttbrukaren er nyleg innlogga hjå dei, og at sluttbrukar er informert om og har til hensikt å utstede bevis av aktuell type.  Tilliten kan aukast, ved at bevis-typen blir konfigurert til å vere sikra med [ID-porten-scope med samtykke](oidc_auth_oauth2) istadenfor Maskinporten.


## Grensesnittsdefinisjon ved pull

Ved pull-basert utstedelse så startar du flyten ved å sende eit enkelt backend-kall til utstedar sitt [/issuance_transaction-endepunkt](https://utsteder.test.eidas2sandkasse.net/swagger-ui/index.html#/eudiw-issuer-api-v1/startCredentialIssuanceEndpoint).

Her er eit døme på eit kall som baserer seg på pull av bevis-innhaldet:
```
POST https://utsteder.test.eidas2sandkasse.net/api/v1/credential/issuance-transaction
Authorization: Bearer [Maskinporten- eller ID-porten-token]
Content-Type: application/json

{
  "credential_configuration_id": "no.skatteetaten.nnid_mso_mdoc",
  "subject": {
    "identifier": "50917500484"
  }
}
```

Dette endepunktet er sikra med access-token frå anten Maskinporten eller ID-porten alt etter bevis-type. Det er også ulike scopes for ulike bevis-typar, desse finn du i [credential metadata](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer). 

Du må kjenne `credential_configuration_id`  på ditt bevis.  Denne identifikatoren har du og Digdir vorte samde om som del av utviklingsløpet. Datamodellen for denne bevistypen har me også blitt samde om, og til slutt so har me vorte samde om kva API-endepunkt hjå deg som Bevisporten skal pull'e data frå, og tilhøyrande valideringsreglar.

Av sikkerheitsomsyn krev me dobbel-validering av brukar-identitet:  du må både inkludere brukerid i payloaden, men også i tokenet som sikrar kallet mot Bevisporten.  Ved bruk av ID-porten-token så kjem dette automatisk, ved bruk av Maskinporten so må du hugse å be om [innbygger-bundne tokens](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_pid_restricted_tokens.html) og [audience-begrensede tokens](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_audience_restricted_tokens.html).  Dette er også eit valg som me har blitt samde om som del av utviklingsløpet.

## Grensesnittdefinisjon ved push

Push av data nyttar same endepunkt som ved pull, men du inkluderer sjølve dataene som skal inn i beviset direkte.  Dette gjer du i `claims`-claimet. 

Døme på push-basert utstedelse:
```
POST https://utsteder.test.eidas2sandkasse.net/api/v1/credential/issuance-transaction
Authorization: Bearer [Maskinporten-token]
Content-Type: application/json

{
  "credential_configuration_id": "no.skatteetaten.nnid_mso_mdoc",
  "subject": {
    "identifier": "50917500484"
  },
  "credential_data": {
    "norwegian_national_id_number": "50917500484",
    "norwegian_national_id_number_type": "D-nummer"
  }
}
```

Bevisporten vil returnere ein feil dersom dataene du pushar ikkje validerer ihht reglane som me har blitt samde om ila. utviklingsløpet. 

### Datatyper

Tabellen gir oversikt over datatyper utstederen definerer. Input til API er i JSON og bruker stadard JSON-typer.  Det er faste konverteringer for primtive typer.  Utstederen definerer også egne typer.

Ulike lommebokimplementasjoner kan vise de ulike typene på forskjellig måte.  F.eks. har enkelte app'er ikke støtte for visning av bilder i SD-JWT VC-baserte bevis.

| Type i bevisdefinisjon | Eksempel input JSON API | Representasjon mdoc | Representasjon SD-JWT | Beskrivelse                                                                                                                                                                                                                                                                                 |
| --- | --- | --- | --- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| string | "abc" | CBOR major type 3 | string | Strenger                                                                                                                                                                                                                                                                                    |
| number | 123 | CBOR major type 0, 1, 7.* | number | Tall                                                                                                                                                                                                                                                                                        |
| boolean | true | CBOR major type 7.20, 7.21 | boolean| Boolesk verdi                                                                                                                                                                                                                                                                               |
| iso_date | "2025-12-30" | CBOR major type  6.1004 | string| Dato                                                                                                                                                                                                                                                                                        |
| iso_date_time | "2026-01-01T08:30:00Z" | CBOR major type 6.0 | string| Dato og tid                                                                                                                                                                                                                                                                                 |
| binary | "/9j/4..." | CBOR major type 2 | string | Input til API er en base64-encoded string.  Type for binærdata defineres med et `mime_type`-attributt i tillegg.  I SD-JWT brukes [RFC-2397 The data URL scheme](https://www.rfc-editor.org/rfc/rfc2397.html) og et bilde kan representeres som som ```"data:image/png;base64,/9j/4..."```. |

Støtte for lister og map er under planlegging.

## Protokoll og testing
Ved bruk av denne brukerreisa so vert det nytta [pre-authorization code flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-pre-authorized-code-flow).



Me har laga ein hendig teknisk retta demo-klient [Bevisgenerator](lommebok_digdir_utsteder_bevisgenerator) for dette bruksmønsteret.  Du limer inn ein json som passar med den aktuelle bevistypen, og so vil demo-klienten rendre ein QR-kode som du kan scanne med ei lommebok. 




