---
title: Fra OIDC- til Maskinporten-beskyttet endepunkt
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_oidc_til_mp
---

For å migrere fra gammelt OIDC-beskyttet endepunkt til nytt Maskinporten-beskyttet endepunkt, må følgende gjøres:

- Oppdater klient-registrering til å bruke nye scopes med krr:-prefix
- Klienten må endres til å hente tokens fra Maskinporten isteden for ID-porten OIDC
typisk ved å oppdatere url for autorisasjonsserverens oauth2 metadata-endepunkt til https://maskinporten.no/.well-known/oauth-authorization-server
- evt. ved å konfigurere nytt token-endepunkt direkte (https://maskinporten.no/token) og oppdatere trust mot Maskinporten sitt signeringssertifikat.
- Endre API-kall til å gå mot nytt endepunkt
  
