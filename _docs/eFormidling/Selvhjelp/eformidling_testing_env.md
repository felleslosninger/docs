---
title: Testmiljø eFormidling
description: Her finner du informasjon om bruk av testmiljø i eFormidling
summary: "Bruk av testmiljø i eFormidling"
permalink: eformidling_testing_env.html
product: eFormidling
sidebar: eformidling_install_sidebar
---

For å få tilgang til testmiljø må bestilling skje på samme måte som en ellers, ved å kontakte  <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> og informere om at det gjelder testmiljø. 

I testmiljø må det brukes test virksomhetssertifikat og mottaker må enten være en test virksomhet eller annen virksomhet som også er aktiv i testmiljøet. 

### Kjøre integrasjonspunktet mot testmiljø

Om du skal sette opp integrasjonspunktet mot testmiljø kan en enten legge til ```spring.profiles.active=staging ``` i [integrasjonspunkt-local.properties-filen](/felleslosninger/resources/eformidling/integrasjonspunkt-local.txt) eller legge til ```-Dspring.profiles.active=staging``` som argument i XML-fila.

**NB!** Kommandolinje har presendens over properties.

Mer informasjon om oppstart av integrasjonspunktet mot testmiljøet finner du her [https://difi.github.io/felleslosninger/eformidling_ip_run.html](https://difi.github.io/felleslosninger/eformidling_ip_run.html)

### Digital post til virksomheter(DPV)

**Brukernavn og passord som brukes i integrasjonspunktet**

Om virksomheten ikke har fått dette allerede, ta kontakt med tjenesteeier@altinn.no, legg ved orgnummeret og forklar at dere skal teste mot tt02 miljøet til Altinn.

**Testbrukere og testvirksomheter**

Det er opprettet test virksomheter en kan bruke som mottakere. Her vil du kunne logge inn å finne forsendelsen din. Disse virksomhetene og brukeren vil være **felles** for alle virksomheter i testmiljø. Pass på å ikke sende sensitiv informasjon under testingen med disse virksomhetene.

Testbruker og passord til innlogging i Altinn testmiljøet fåes ved å kontakte <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> 

For å logge inn i Altinn sitt testmiljø bruker du denne lenken <a href="https://tt02.altinn.no">https://tt02.altinn.no</a>

| Orgnr | Navn |Enhetstype |  
|:---| :--- | :--- |
| 910624474 | NESFLATEN OG BORRE | KOMM |
| 810624582 | SELJORD OG SØRVIK | BEDR | 
| 810568712 | ALTA OG KARDEMOMME BY | BEDR |
| 910568655 | AUKLANDSHAMN OG ELVEGARD | BEDR |


### Digital post til offentlige virksomheter(DPO)

**Brukernavn og passord som brukes i integrasjonspunktet**

Her kan dere bruke samme som i produksjon.

**Testvirksomheter**

Vi har satt opp og eksponert et eget integrasjonspunkt som kan benyttes til å teste DPO-forsendelser i testmiljøet. Dette er ikke tilgjengelig i produksjon. En kan teste forsendelse ved å sende fra eget sak-arkivsystem til organisasjonsnummeret: ```987464291```

Ellers kan en avtale med andre virksomheter som bruker DPO i testmiljøet.

Tabellen gjelder integrasjonspunktet til Digitaliseringsdirektoratet Leikanger som er eksponert på URL ```https://ip-leik-meldingsutveksling.difi.no/```. Dette integrasjonspunktet kan sende og motta DPO meldinger.

| Nøkkel | verdi |  
| --- | --- | 
| Organisasjonsnummer: | 987464291 | 
| Tjeneste: | DPO | 
| URL-integrasjonspunkt | https://ip-leik-meldingsutveksling.difi.no/ |
| URL sak-arkiv mock | https://beta-meldingsutveksling.difi.no/move-mocks/sa-mock/ |


<!--
 [NextMove: Postman Arkivmelding DPO request](/felleslosninger/resources/eformidling/DPO.postman_collection.json)
-->

#### Sak-arkiv mock

**NB!** Mocken fungerer ikke for øyeblikket(08.06.2020)! Ta kontakt med servicedesk@digdir.no for testing av DPO.

Det er satt opp en sak-arkiv mock som kan benyttes til å sende meldinger fra grensesnittet, eller se utgående og innkommende meldinger.  Denne er eksponert på [https://beta-meldingsutveksling.difi.no/move-mocks/sa-mock/](https://beta-meldingsutveksling.difi.no/move-mocks/sa-mock/) 



![](/felleslosninger/images/eformidling/sakarkiv_flyt.PNG)


**NB! Ønsker virksomheten å teste eInnsyn? Ta kontakt med servicedesk@digdir.no**

---

