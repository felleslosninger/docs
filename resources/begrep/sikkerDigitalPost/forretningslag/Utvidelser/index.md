---
  
title: Utvidelser  
permalink: sdp_utvidelser_index.html
sidebar: dpi_sidebar
---

## Introduksjon

Postkasseleverandørene støtter ulike verdiøkende tjeneste utover det som
er definert i [Dokumentpakken](../Dokumentpakke/). En utvidelse er knyttet
til ett dokument og tilfører en beriket visning i innbyggers postkasse.

For å knytte en utvidelse til et dokument må det inkluderes en fil ihht.
utvidelsens XML-schema (XSD) i dokumentpakken, og det aktuelle
[dokumentet](https://difi.github.io/felleslosninger/sdp_dokument.html) refererer til
[«data-dokumentet»](https://difi.github.io/felleslosninger/sdp_dokumentdata.html) vha. `<data>`-elementet
i [manifestet](https://difi.github.io/felleslosninger/sdp_manifest.html).

Dersom innbyggers postkasseleverandør ikke støtter utvidelsen blir
informasjonen forkastet av postkassen uten at hverken avsender eller
innbygger får beskjed om dette.

Tabellen nedenfor viser alle tilgjengelige utvidelser og hvilke av
postkasseleverandørene som støtter de ulike.

### Utvidelser

| Fil     | Mime-Type      | Digipost | e-Boks |
| --- | --- | --- | --- |
| [Lenke utenfor brev](https://difi.github.io/felleslosninger/sdp_lenke.html) | `application/vnd.difi.dpi.lenke+xml`       | Ja       | Ja     |
| [Bevis](https://difi.github.io/felleslosninger/sdp_bevis.html) | `application/vnd.difi.dpi.bevis+xml`       | Ja       | Ja     |
| [Arrangement](https://difi.github.io/felleslosninger/sdp_arrangement.html)  | `application/vnd.difi.dpi.arrangement+xml` | Ja       | Ja     |
