---
title: Utanlandske brukarar
description: Utanlandske brukarar

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_idporten_utanlanske_brukarar
---

Det er mogeleg å motta pålogging gjennom ID-porten også for brukarar som ikkje brukar norske eID, dvs. brukarar som normalt ikkje har norsk personidentifikator.


## Ulike typar brukarar

| Kategori | [Sikkerheitsnivå](https://lovdata.no/dokument/SF/forskrift/2019-11-21-1578) | Skildring |
| - | - |
| [eIDAS 1](oidc_func_eidas) |Høgt eller betydeleg |Europeiske brukarar som nyttar ein anerkjend elektronisk ID frå sitt heimland |
| [Epost-brukarar](oidc_func_emaillogin) |Udefinert (ca. lavt) |Ein sjølvregistrert brukar, identifisert via epost-adresse. 1-faktor autentisering. |
| "passport" |Ca. betydeleg |Brukarar som har registrert seg vha. pass/nasjonalt ID-kort. Sterk 2-faktor-autentisering. P.t. ikkje mandat eller finansering til å innføre dette. |
| eIDAS 2 |Høgt |Europeiske brukarar som har ei europeisk digital identitetslommebok. Kjem i EU frå nov. 2026, men uklart når norsk lov blir implementert. |

## Korleis aktivere funksjonaliteten ?

Klienten bestemmer kva typar eID som skal visast i ID-porten ved å sende ulike `acr_values`-verdiar i [autentiseringsførespurnaden](oidc_protocol_authorize).  Følg lenkene ovanfor for ytterlegare dokumentasjon kring dei ulike kategoriane brukarar.    Sjå også avsnittet om `acr` under [dokumentasjon av ID-token](oidc_protocol_id_token#acr-values)

For eIDAS-brukarar  vil ID-porten forsøke å koble brukaren mot norsk personidentifikator gjennom oppslag mot Folkeregisteret. 

Utanlandske brukarar havnar ikkje i Kontakt- og Reservasjonsregisteret.
