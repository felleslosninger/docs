---
title: Nye ID-porten 2022/2023
description: Nye ID-porten 2022/2023
permalink: Nye_ID-porten_2022_2023.html
sidebar: oidc
---


ID-porten sitt moderniseringprosjekt der vi utvikler ny ID-porten-løsning fra bunnen av er i full gang. Innen sommeren 2022 skal den nye kubernetes-baserte driftsplatformen være etablert.



Planlagd produksjonssetting: Dec 20, 2022

## Ny funksjonalitet:


#### Notifisere norske eID til eIDAS (In design)

Gjennomføre fagfelle-vurdering av norske eID-løsninger til EU, slik at norske borgere kan bruke sine eIDer på europeiske tjenester.




#### Ny systemarkitektur for ID-porten (In development)

Overgangen fra SAML-integrasjoner til OIDC-integrasjon går raskt. Som følge av dette besluttet Difi i et prosjekt i 2019 at ID-portens systemarkitektur må endres til at OpenID Connect / Oauth2-delen blir kjernen i ny arkitektur. En må se på om det er mulig å bruke et hyllevare IAM-produkt istedet for dagens egenutviklede løsning.. Samtidig skal vi tilrettelegge for bruk av skyteknologi, både PaaS og SaaS-løsninger der dette er mulig.

Omskriving til ny systemarkitektur begynner nå, og vil kontinuerlig fram til dagens driftsavtale går ut i slutten av 2021.

I 2021 ser vi for oss å gjøre følgende:

- Utvikling av første versjon av "nye ID-porten". 

- Prøvedrift av nye ID-porten i form av pilot på Ansattporten.

- Prøvedrift i produksjon i public cloud (Azure)




#### Nye ID-porten klar til prøvedrift (Under consideration)

Nye ID-porten skal bli tilgjengelig for prøvedrift på ny driftsplatform etter sommeren 2022




#### Nye ID-porten full SLA (Under consideration)

Nye ID-porten blir gjort tilgjengelig for alle kunder ved årskiftet 2022/2023. Alle kunder må nå migrere sine integrasjoner innen sommeren 2023.




#### Overgang til redusert SAML-tjeneste (Under consideration)

I forbindelse med modernisering av ID-porten vil dagens openam-baserte SAML-løsning fases ut Q2-2023. Alle eksisterende SAML-integrasjoner vil da blir flyttet over til en SAML-proxy-løsning med begrenset funksjonalitet.

