---
title: Utanlandske brukarar
description: Utanlandske brukarar

sidebar: oidc
product: ID-porten
redirect_from: /oidc_func_idporten_utanlanske_brukarar
---

Det er mogeleg å motta pålogging gjennom ID-porten også for brukarar som ikkje brukar norske eID, dvs. brukarar som normalt ikkje har norsk personidentifikator.


## Ulike typarar brukarar

| Kategori | Sikkerheitsnivå | Skildring |
| - | - |
| [eIDAS 1](oidc_func_eidas) | Høgt eller betydeleg | Europeiske brukarar som nyttar ein anerkjend elektronisk ID frå sitt heimland |
| [Epost-brukarar](oidc_func_emaillogin) | Udefinert (ca. lavt) | Ein sjølvregistrert brukar, identifisert vha epost-adresse. |
| "passport" | Ca. betydeleg | Brukarar som har registrert seg vha. pass/nasjonalt ID-kort. Sterk 2-faktor-autentisering. Kjem i 2026. |
| eIDAS 2 | Høgt | Europeiske brukarar som har ei europeisk digital identitetslommebok. Kjem i EU frå nov. 2026, men uklart når norsk lov blir implementert. |

## Korleis aktivere funksjonaliteten ?

Klienten bestemmer kva typar eID som skal visast i ID-porten ved å sende ulike `acr_values`-verdiar i [autentiseringsførespurnaden](oidc_protocol_authorize).  Følg lenkene ovanfor for ytterlegare dokumentasjon kring dei ulike kategoriane brukarar.  Sjå spesifikt avsnittet om acr-verdiar mot slutten av dokumentasjonen.

For eIDAS-brukarar (og truleg den kommande passport) vil ID-porten forsøke å koble brukaren mot norsk personidentifikator gjennom oppslag mot Folkeregisteret. 

Utanlandske brukarar havnar ikkje i Kontakt- og Reservasjonsregisteret.