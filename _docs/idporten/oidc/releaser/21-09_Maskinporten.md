---
title: 21-09 Maskinporten
description: 21-09 Maskinporten

sidebar: oidc
redirect_from: /21-09_maskinporten
---


Støtte for SEID2-profilen for virksomhetssertifikater (dvs. kvalifiserte segl ihht eIDAS)



Releasen vart produksjonssatt Oct 26, 2021

## Ny funksjonalitet:


#### SEID 2.0-støtte i Maskinporten  (Shipped)

Maskinporten støtter i dag kun "gamle" virksomhetsertifikater. Må utvides med støtte for nye kvalifiserte sertifikater ihht eIDAS ihht SEID2.0 profilen




#### Pilot underenheter (Shipped)

Maskinporten-støtte for underenheter. I første omgang kun tiltenkt pilot i eFormidling der en skal teste ut meldingsutveksling til under-enheter som ikke har organisasjonsnummer.

Mogeleg døme på identifikator for ein underenhet:  
0192:991825827:ER//987464291:1 # Digdirs underenhet for virksomheten på Leikanger, som tilhøyrer Digdir  
0192:986186999:MP//vergemålsnemnda:1 # Vergemålsnemnda, om tilhøyrer Statens Sivilrettsforvaltning (986186999)




#### SelvbetjeningsAPI med støtte for Maskinporten-tokens (Shipped)

Det blir nå mulig å bruke tokens fra Maskinporten mot selvbetjenings-APIet

