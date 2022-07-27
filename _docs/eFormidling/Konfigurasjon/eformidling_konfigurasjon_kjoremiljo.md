---
title: Kjøremiljø
description: ""
summary: ""
permalink: eformidling_konfigurasjon_kjoremiljo.html
product: eFormidling
sidebar: eformidling_sidebar
---

eFormidling og integrasjonspunktet har to miljøer tilgjengeliggjort for brukerne: *staging* og *production*. Begge miljø krever bruk av en reell virksomhet som er registrert i Brønnøysundregistrene og har et organisasjonsnummer. I tillegg kreves det at virksomheten har et virksomhetssertifikat. Her skilles det på test-sertifikat og prod-sertifikat for å kunne kjøre integrasjonspunktet i forskjellige miljø. 

## Staging-miljø

For å kjøre integrasjonspunktet i staging-miljøet er det påkrevd at virksomheten har et test-virksomhetssertifikat (Bestilles hos Buypass/Commfides). Den offentlige delen av nøkkelen må sendes til Digdir på e-post  <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. Digdir må også gi dere tilganger til miljøet for alle eFormidling-tjenestene dere skal bruke. 

For å starte integrasjonspunktet med staging profil angis følgende argument: 
```-Dspring.profiles.active=staging```

## Produksjons-miljø

For å kjøre integrasjonspunktet i produksjonsmiljø-miljøet er det påkrevd at virksomheten har et virksomhetssertifikat (Bestilles hos Buypass/Commfides). Den offentlige delen av nøkkelen må sendes til Digdir på e-post  <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. Digdir må også gi dere tilganger til miljøet for alle eFormidling-tjenestene dere skal bruke. 

For å starte integrasjonspunktet med production profil angis følgende argument: 
```-Dspring.profiles.active=production```

## Relaterte sider

- [Se hvordan starte integrasjonspunktet ](eformidling_drift_start_og_stopp.html)
- [Administrasjon av virksomhetssertifikat](eformidling_drift_sertifikatadministrasjon.html)