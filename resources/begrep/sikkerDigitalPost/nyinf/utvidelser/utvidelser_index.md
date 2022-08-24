---
title: Utvidelser
permalink: dpi_utvidelser_index.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

## Introduksjon

Postkasseleverandørene støtter ulike verdiøkende tjeneste utover det som
er definert i [Dokumentpakken](dpi_dokumentpakke_index.html). En utvidelse er knyttet
til ett dokument og tilfører en beriket visning i innbyggers postkasse.

For å knytte en utvidelse til et dokument må det inkluderes en fil ihht.
utvidelsens XML-schema (XSD) i dokumentpakken, og det aktuelle
[dokumentet](sdp_dokument.html) refererer til
[«data-dokumentet»](sdp_dokumentdata.html) vha. `<data>`-elementet
i [manifestet](sdp_manifest.html).

Dersom innbyggers postkasseleverandør ikke støtter utvidelsen blir
informasjonen forkastet av postkassen uten at hverken avsender eller
innbygger får beskjed om dette.

Tabellen nedenfor viser alle tilgjengelige utvidelser og hvilke av
postkasseleverandørene som støtter de ulike.

### Utvidelser

| Fil     | Mime-Type      | Digipost | e-Boks |
| --- | --- | --- | --- |
| [Lenke utenfor brev](sdp_lenke.html) | `application/vnd.difi.dpi.lenke+xml`       | Ja       | Ja     |
| [Bevis](sdp_bevis.html) | `application/vnd.difi.dpi.bevis+xml`       | Ja       | Ja     |
| [Arrangement](sdp_arrangement.html)  | `application/vnd.difi.dpi.arrangement+xml` | Ja       | Ja     |
