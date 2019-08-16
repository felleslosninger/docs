---
title: Endringslogg NextMove 2.0 beta (Utvikling)
description: Mange versjoner av integrasjonspunktet vil bli laget i test- og utviklingsløpet, her vil du finne informasjon om endringer samt nedlastingslenke.
summary: ""
permalink: eformidling_nm_changelog.html
product: eFormidling
sidebar: eformidling_technical_sidebar
---

## [Siste utviklingsversjon av integrasjonspunktet kan hentes i Nexus under "no.difi.meldingsutveksling.integrasjonspunkt"](https://beta-meldingsutveksling.difi.no/#view-repositories;itest~browsestorage) 

## [Docker bilder kan hentes her "tag:development"](https://hub.docker.com/r/difi/integrasjonspunkt/tags)

### 16.08.19

- Integrasjonspunktet bruker nå Spring Boot 2. Det blir ingen støtte for Spring boot 1
- Grensesnitta har gått over frå å primært bruke ConvId til å bruke messageId som henter verdien sin frå documentIdentification.instanceIdentifier i SBD. 
- oppslag i status api'et (/api/statuses) har tidliger vært basert på generert databaseId. her brukes nå messageId, eks: /api/statuses/ff88849c-e281-4809-8555-7cd54952b917
- ServiceRegistry i staging er oppdatert til å støtte NextMove
