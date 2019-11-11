---
title: Testmiljø eFormidling
description: Her finner du informasjon om bruk av testmiljø i eFormidling
summary: "Bruk av testmiljø i eFormidling"
permalink: eformidling_testing_env.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

For å få tilgang til testmiljø må bestilling skje på samme måte som en ellers, ved å kontakte  <a href="mailto:idporten@difi.no">idporten@difi.no</a> og informere om at det gjelder testmiljø. 

I testmiljø må det brukes test virksomhetssertifikat og mottaker må enten være en test virksomhet eller annen virksomhet som også er aktiv i testmiljøet. 

Informasjon om oppstart av integrasjonspunktet mot testmiljøet finner du her [https://difi.github.io/felleslosninger/eformidling_ip_run.html](https://difi.github.io/felleslosninger/eformidling_ip_run.html)

### Digital post til virksomheter(DPV)

Det er opprettet test virksomheter en kan bruke som mottakere. Her vil du kunne logge inn å finne forsendelsen din. Disse virksomhetene og brukeren vil være **felles** for alle virksomheter i testmiljø. Pass på å ikke sende sensitiv informasjon under testingen med disse virksomhetene.

Testbruker og passord til innlogging i Altinn testmiljøet fåes ved å kontakte <a href="mailto:idporten@difi.no">idporten@difi.no</a> 

For å logge inn i Altinn sitt testmiljø bruker du denne lenken <a href="https://tt02.altinn.no">https://tt02.altinn.no</a>

| Orgnr | Navn |Enhetstype |  
|:---| :--- | :--- |
| 910624474 | NESFLATEN OG BORRE | KOMM |
| 810624582 | SELJORD OG SØRVIK | BEDR | 
| 810568712 | ALTA OG KARDEMOMME BY | BEDR |
| 910568655 | AUKLANDSHAMN OG ELVEGARD | BEDR |


### Digital post til offentlige virksomheter(DPO)

Tabellen gjelder integrasjonspunktet til Difi Leikanger som er eksponert på URL ```https://ip-leik-meldingsutveksling.difi.no/```. Dette integrasjonspunktet kan sende og motta DPO meldinger.

| Nøkkel | verdi |  
| --- | --- | 
| Orgnr: | 987464291 | 
| Minne: | 4GB| 
| IP-build: | 2.0.6 | 
| Tjeneste: | DPO | 
| URL | https://ip-leik-meldingsutveksling.difi.no/ |

Vi har satt opp og eksponert et eget integrasjonspunkt som kan benyttes til å teste DPO-forsendelser i testmiljøet. Dette er ikke tilgjengelig i produksjon. Dette kan benyttes ved å bruke Postman for å sende en Arkivmelding DPO eller en bestEdu melding til denne mottakeren. En kan selvsagt benytte andre API-verktøy. 

> [NextMove: Last ned postman Arkivmelding DPO request](/felleslosninger/resources/eformidling/DPO.postman_collection.json)

#### Sak-arkiv mock

Det er satt opp en sak-arkiv mock som kan benyttes til å sende meldinger fra grensesnittet, eller se utgående og innkommende meldinger.  Denne er eksponert på [https://beta-meldingsutveksling.difi.no/move-mocks/sa-mock/](https://beta-meldingsutveksling.difi.no/move-mocks/sa-mock/) 

#### APIet

For å sende forespørsler må en benytte API'et, informasjon om hvordan dette benyttes finner du:

- [Swagger](https://difi.github.io/felleslosninger/eformidling_nm_swagger.html)
- [Spore forsendelser](https://difi.github.io/felleslosninger/eformidling_api.html)


---

