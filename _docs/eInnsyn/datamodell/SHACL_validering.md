---
title: SHACL-validering
description:
summary:

sidebar: einnsyn_technical_sidebar
redirect_from: /einnsyn_shackl
---

Validering av json-ld blir gjort basert på [SHACL](https://www.w3.org/TR/shacl/)

Shacl-reglane vert uttrykt i rdf-formatet turtle. Desser er basert på Noark5 vokabularet.
Reglane, fordelt på objekt-klassane i datamodellen ligg [her](https://github.com/difi/einnsyn-klient/tree/master/datamodell/shape-constraints)

Som valideringsverktøy kan ein bruke
* [RDF4j sin implementasjon](https://rdf4j.org/documentation/programming/shacl/)
* [eInnsyn impementasjon](https://github.com/difi/einnsyn-klient/tree/master/datamodell/shacl-engine)
* [Online validering](https://shacl.org/playground/)
* [Validering ved direkteintegrasjon](https://docs.digdir.no/docs/eInnsyn/datamodell/Kvittering_ved_publisering)

eInnsyn implementasjonen vart utvikla tidleg i eInnsyn-utviklinga sidan SHACL-er relativt nytt og på dåverande tidspunkt ikkje eksisterte høveleg valideringsmotorar
