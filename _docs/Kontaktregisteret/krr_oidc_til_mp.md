---
title: Fra OIDC- til Maskinporten-beskyttet endepunkt
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_oidc_til_mp
---


## Utdaterte kontaktopplysninger f.o.m. 27.september
27.09.2023 vart gammelt Maskinporten-beskyttet endepunkt krr.digdir.no avviklet. Dette innebærer at oppslag mot Oppslagstjenesten med gammelt OIDC-beskyttet endepunkt oidc.difi.no/idporten-oidc-provider, vil gi utdaterte kontaktopplysninger.

## Avvikling av Oppslagstjenesten sitt OIDC-beskyttet endepunkt 04. oktober
F.o.m. 04.10.2023 er det ikke lenger mulig å kalle Oppslagstjenesten med OIDC-beskyttet endepunkt. Slike oppslag vil bli avvist.  

## Hva må gjøres for å migrere til Maskinporten-beskyttet endepunkt?
For å migrere fra gammelt OIDC-beskyttet endepunkt til nytt Maskinporten-beskyttet endepunkt, må følgende gjøres:

- Oppdater klient-registrering til å bruke nye scopes med krr:-prefix
- Klienten må endres til å hente tokens fra Maskinporten isteden for ID-porten OIDC
typisk ved å oppdatere url for autorisasjonsserverens oauth2 metadata-endepunkt til https://maskinporten.no/.well-known/oauth-authorization-server
- evt. ved å konfigurere nytt token-endepunkt direkte (https://maskinporten.no/token) og oppdatere trust mot Maskinporten sitt signeringssertifikat.
- Endre API-kall til å gå mot nytt endepunkt
  
## Hva med testmiljøet (ver2)?
Tilsvarende avvikling skjer for ver2-endepunktet 03. oktober. 
