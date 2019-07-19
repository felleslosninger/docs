---
  
title: Utvidelser  
permalink: sdp_utvidelser_index.html
sidebar:
---

## Introduksjon

Postkasseleverandørene støtter ulike verdiøkende tjeneste utover det som
er definert i [Dokumentpakken](../Dokumentpakke/). En utvidelse er knyttet
til ett dokument og tilfører en beriket visning i innbyggers postkasse.

For å knytte en utvidelse til et dokument må det inkluderes en fil ihht.
utvidelsens XML-schema (XSD) i dokumentpakken, og det aktuelle
[dokumentet](../../begrep/Dokument.md) refererer til
[«data-dokumentet»](../../begrep/DokumentData.md) vha. `<data>`-elementet
i [manifestet](../Dokumentpakke/Manifest.md).

Dersom innbyggers postkasseleverandør ikke støtter utvidelsen blir
informasjonen forkastet av postkassen uten at hverken avsender eller
innbygger får beskjed om dette.

Tabellen nedenfor viser alle tilgjengelige utvidelser og hvilke av
postkasseleverandørene som støtter de ulike.

### Utvidelser

| Fil     | Mime-Type      | Digipost | e-Boks |
| --- | --- | --- | --- |
| [Lenke utenfor brev](Lenke.md) | `application/vnd.difi.dpi.lenke+xml`       | Ja       | Ja     |
| [Arrangement](Arrangement.md)  | `application/vnd.difi.dpi.arrangement+xml` | Ja       | Ja     |
