---
title: Overordnet arkitekturbeskrivelse for tjenestene
description:
summary:

sidebar: krr_sidebar
product: Kontakt- og reservasjonsregisteret
redirect_from: /krr_arkitektur
---

## Oppslagstjenesten REST

Når du som kunde har opprettet og satt opp klienten riktig, kan den brukes til å få tildelt token og gjennomføre api-kallene.

<div class="mermaid">
graph LR
  subgraph Digdir
    Oppslagstjenesten[Oppslagstjenesten]
  end
  subgraph Digdir
    Maskinporten[Maskinporten]
  end
  subgraph API-konsument
     ny[Klient]
  end
  Maskinporten -->|2.utsteder token med tildelt scope|ny
  ny -->|1. forspør tilgang til scope|Maskinporten
  ny -->|3.bruker token mot|Oppslagstjenesten
</div>

API-konsumenter kan selv administrere sine klientkonfigurasjoner gjennom [Selvbetjening web](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web) eller [Selvbetjening api](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api) . For krr-klienter vil scopene være forhåndsdefinert. 

## Oppslag ved innlogget bruker (brukerstyrt datadelling)

I dette scenariet logger en sluttbruker inn til en tjeneste, og tjenesten har behov for å hente data om den innloggede sluttbrukeren via Oppslagstjenesten (brukerstyrt datadeling). Slike tilfeller realiseres i ID-porten ved den klassiske Oauth2-flyten, der innbyggeren godkjenner - enten eksplisitt eller implisitt - til at tjenesten kan bruke Oppslagstjenesten på vegne av seg selv.



 <div class="mermaid">
 graph LR
   subgraph Digdir
     Oppslagstjenesten[Oppslagstjenesten]
   end
   subgraph Digdir
     OIDC[ID-porten]
   end
   subgraph Kunde
      ny[Tjeneste]
   end
   Sluttbruker ---|1. Vil bruke|ny
   OIDC -->|3.utsteder token|ny
   Sluttbruker ---|2. logger inn i  |OIDC
   ny -->|4.bruker token mot|Oppslagstjenesten
 </div>


### Beskrivelse av Oauth2-flyten

<div class="mermaid">
sequenceDiagram
  Sluttbruker ->> Klient: Klikker login-knapp
  Klient ->> Sluttbruker: Redirect med autentiseringsforespørsel
  Sluttbruker ->> OpenID Provider: følg redirect...
  note over Sluttbruker,OpenID Provider: Sluttbruker autentiserer seg (og evt. samtykker til førespurte scopes)
  OpenID Provider ->> Sluttbruker: Redirect med autorisasjonscode
  Sluttbruker ->> Klient: følg redirect...
  Klient ->> OpenID Provider: forespørre token (/token)
  OpenID Provider ->> Klient: id_token + access_token (evt. refresh_token)
  note over Sluttbruker,Klient: Innlogget i tjenesten
  Klient ->> Oppslagstjenesten: bruke Oppslagstjenesten med access_token
  Oppslagstjenesten ->> OpenID Provider: validere token
  OpenID Provider ->> Oppslagstjenesten: token informasjon
  Oppslagstjenesten->>Klient: Resultat av API-operasjon
</div>

Starten av flyten er identisk med [autorisasjonskode-flyten for autentisering]({{site.baseurl}}/docs/idporten/oidc/oidc_auth_codeflow) (se denne for detaljer), med følgende tillegg:

* I **autentiseringsresponsen** fra OpenID Provider får klient også utlevert et *access_token* (og eventuelt et *refresh_token*) som gir tilgang til forespurte scopes.  
* Etter innlogging kan da klienten bruke access_tokenet opp mot Oppslagstjenesten.  
  * Access_token har vanligvis kort levetid (30 sekunder). Dersom tokenet er utløpt, kan klienten forespørre nytt acess_token ved å bruke *refresh_tokenet* mot token-endepunktet til OpenID Provideren.  Det gjennomføres da en klient-autentisering, for å sikre at tokens ikke blir utlevert til feil part.


## MinProfil og gotoURL

I MinProfil kan sluttbrukeren oppdatere sine kontaktopplysninger. Du som kunde (virksomhet) kan lenke til MinProfil i din tjeneste, for få oppdatert kontaktinfo til dine brukere. Ved å bruke request parameter "gotoURL" blir sluttbrukeren sendt tilbake til din tjeneste. 

 <div class="mermaid">
 graph LR
   subgraph Digdir
     MinProfil[MinProfil]
   end
   subgraph Digdir
     OIDC[ID-porten]
   end
   subgraph Kunde
      ny[Tjeneste]
   end
   Sluttbruker ---|1. Vil bruke|ny
   OIDC -->|3.utsteder token|ny
   Sluttbruker ---|2. logger inn i  |OIDC
   ny -->|4. lenker til MinProfil|MinProfil
   MinProfil -->|5. gotoURL sender tilbake til tjeneste |ny
 </div>
