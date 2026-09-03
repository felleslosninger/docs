---
  
title: Utvidelser  

sidebar: dpi_sidebar
redirect_from: /sdp_utvidelser_index
---

## Introduksjon

Postkasseleverandørene støtter ulike verdiøkende tjeneste utover det som
er definert i [Dokumentpakken]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Dokumentpakke/). En utvidelse er knyttet
til ett dokument og tilfører en beriket visning i innbyggers postkasse.

For å knytte en utvidelse til et dokument må det inkluderes en fil ihht.
utvidelsens XML-schema (XSD) i dokumentpakken, og det aktuelle
[dokumentet]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Dokument) refererer til
[«data-dokumentet»]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/DokumentData) vha. `<data>`-elementet
i [manifestet]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Dokumentpakke/Manifest).

Dersom innbyggers postkasseleverandør ikke støtter utvidelsen blir
informasjonen forkastet av postkassen uten at hverken avsender eller
innbygger får beskjed om dette.

Tabellen nedenfor viser alle tilgjengelige utvidelser og hvilke av
postkasseleverandørene som støtter de ulike.

### Utvidelser

| Fil     | Mime-Type      | Digipost | e-Boks |
| --- | --- | --- | --- |
| [Lenke utenfor brev]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Utvidelser/Lenke) | `application/vnd.difi.dpi.lenke+xml`       | Ja       | Ja     |
| [Bevis]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Utvidelser/Bevis) | `application/vnd.difi.dpi.bevis+xml`       | Ja       | Ja     |
| [Arrangement]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Utvidelser/Arrangement)  | `application/vnd.difi.dpi.arrangement+xml` | Ja       | Ja     |
