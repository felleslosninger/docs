---
title: Bevisporten: utstedelse styrt av datakjelde
description: 

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_digdir_utsteder_push
---

Denne sidan dokumenterer bruksmønsteret for **datakjeld-styrt utstedelse** ved bruk av  Digdir sin bevis-utstedar, Bevisporten.

Denne flyten er hensiktmessig for verksemder som ynskjer mest mogeleg kontroll sjølve over brukeropplevinga.  Nokre typiske karakteristika ved ein slik flyt kan vere: 

- Sluttbrukaren må på førehand vere innlogga hjå datakjelda.
- Datakjelda ynskjer ikkje å la sluttbrukar starte ei lommeboksprosess før dei er sikre på at brukaren faktisk oppfyller vilkår for å få eit bevis (til dømes unngå at innbyggarar som ikkje har førarrett forsøker å be om førarkort).
- Datakjelda tek sjølv på seg mykje av ansvaret for å sikre at ein sluttbrukar sitt bevis ikkje hamnar i ein annan brukar si lommebok.


## Push-basert flyt

I dette bruksmønsteret so er det datakjelda som styrer flyten:
1. Sluttbrukar er innlogga på ei nett-teneste hjå datakjelda og ynskjer få eit bevis. 
1. Datakjelda ber utstedaren om å lage eit bevis av ein viss type.  Bevis-innhaldet kan inkluderast i kallet, eller hentast frå eit eksisterande API tilhøyrande datakjelda.
1. Responsen er eit Credential Offer som datakjelda rendrar som ein brukerspesifikk QR-kode
1. Brukaren scanner QR-koden med lommeboka si og får beviset utlevert

Flyten vist som eit sekvensdiagram:

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
  
  opt Pull-basert henting av data
    u<<-->>a: hent bevis-innhald
  end

  note over b,t: scann QR med lommebok
  l->>+u: /token (pre-auth.code)
  u-->>-l: access_token

  l->>+u: Credential Request (access_token)
  u-->>-l: utstedt bevis

</div>



## Grensesnittsdefinisjon

Uansett om du ynskjer push- eller pull-basert overføring av sjølve bevis-innhaldet, så startar du flyten ved å sende eit enkelt backend-kall til utstedar sitt [/start_issuance-endepunkt](https://utsteder.test.eidas2sandkasse.net/swagger-ui/index.html#/eudiw-issuer-api-v1/startIssuanceEndpoint).

Du må kjenne `credential_configuration_id`  på ditt bevis.  Denne identifikatoren har du og Digdir vorte samde om som del av utviklingsløpet.

Her er eit døme på eit kall som baserer seg på pull av bevis-innhaldet:
```
POST https://utsteder.test.eidas2sandkasse.net/api/v1/credential/issuance-transaction
Authorization: Bearer [Maskinporten-token]
Content-Type: application/json

{
  "credential_configuration_id": "no.skatteetaten.nnid_mso_mdoc",
  "subject": {
    "identifier": "50917500484"
  }
}
```

Dette endepunktet er sikra med access-token frå anten Maskinporten eller ID-porten alt etter bevis-type. Det er også ulike scopes for ulike bevis-typar, desse finn du i [credential metadata](https://utsteder.test.eidas2sandkasse.net/.well-known/openid-credential-issuer). 


Ved push av data så må du sende med dei person-avhengige data-attributta som skal inn i beviset.  Dette gjer du i `claims`-claimet.  Datamodellen vil vere bevistype-avhengig, og denne har me avtalt i lag som del av utviklingsløpet.

Dersom du istaden ynskjer å pushe inn data til utsteder, må du inkludere desse i `claims`-attributtet i requesten, til dømes sli,:
```
POST https://utsteder.test.eidas2sandkasse.net/api/v1/credential/issuance-transaction
Authorization: Bearer [Maskinporten-token]
Content-Type: application/json

{
  "credential_configuration_id": "no.skatteetaten.nnid_mso_mdoc",
  "subject": {
    "identifier": "50917500484"
  },
  "claims": [
    {
      "name": "norwegian_national_id_number",
      "value": "50917500484"
    },
    {
      "name": "norwegian_national_id_number_type",
      "value": "D-nummer"
    }
  ]
}
```


## Tillitsforhold

Sidan utstedaren i dette bruksmønsteret ikkje har noko browser-interaksjon med sluttbrukar, betyr det at utstedar stoler fullt og heilt på at datakjelda tek ansvar for at sluttbrukaren er nyleg innlogga hjå dei, og at sluttbrukar er informert om og har til hensikt å utstede bevis av aktuell type.  Tilliten kan aukast, ved at bevis-typen blir konfigurert til å vere sikra med [ID-porten-scope med samtykke](oidc_auth_oauth2) istadenfor Maskinporten.

Ta kontakt med oss for å avtale at me legger til støtte for nye bevis-typar.

#### Protokoll og testing
For å realisere denne flyten er det [pre-authorization code flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-pre-authorized-code-flow) som er i bruk.

Pt. er ikkje tx_code støtta.

Me har laga ein hendig [teknisk retta demo-klient](https://demo-ui-utsteder.test.eidas2sandkasse.net/) for dette bruksmønsteret.  Du limer inn ein json som passar med den aktuelle bevistypen, og so vil demo-klienten rendre ein QR-kode som du kan scanne med ei lommebok. 
