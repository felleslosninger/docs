---
title: Sikkerhet
description: ""
summary: ""
permalink: eformidling_konfigurasjon_sikkerhet.html
product: eFormidling
sidebar: eformidling_sidebar
---

## Integrasjonspunkt API

eFormidling 2.0 API-et i integrasjonspunktet er i utgangspunktet åpent sidan applikasjonen er tenkt køyrt i eit lukka miljø, men den støtter basic auth med brukernavn og passord. Dette kan aktiveres via properties. 

For å aktivere basic auth på API-et setter du følgande properties, du definerer sjølv bruker og passord. Desse setter du der du har dine properties, om det er *integrasjonspunkt-local.properties* eller du setter properties via miljøvariablar så kan du bruke følgande:

``` 
difi.move.feature.enable-auth=true
spring.security.user.name=securityuser
spring.security.user.password=securepassword
```
