-----

layout: default  
title: Utvidelser  
headtitle: Sikker digital post - Utvidelser  
group: forretningslag

id: Forretningslag/Utvidelser  
next: Forretningslag/Utvidelser/Lenke

children:  
\- name: Forretningslag/Utvidelser/Lenke  
\- name: Forretningslag/Utvidelser/Arrangement

-----

## Introduksjon

Postkasseleverandørene støtter ulike verdiøkende tjeneste utover det som
er definert i [Dokumentpakken](Dokumentpakke). En utvidelse er knyttet
til ett dokument og tilfører en beriket visning i innbyggers postkasse.

For å knytte en utvidelse til et dokument må det inkluderes en fil ihht.
utvidelsens XML-schema (XSD) i dokumentpakken, og det aktuelle
[dokumentet](../../begrep/Dokument) refererer til
[«data-dokumentet»](../../begrep/DokumentData) vha. `<data>`-elementet
i [manifestet](../Dokumentpakke/Manifest).

Dersom innbyggers postkasseleverandør ikke støtter utvidelsen blir
informasjonen forkastet av postkassen uten at hverken avsender eller
innbygger får beskjed om dette.

Tabellen nedenfor viser alle tilgjengelige utvidelser og hvilke av
postkasseleverandørene som støtter de ulike.

### Utvidelser

| Fil                         | Mime-Type                                  | Digipost | e-Boks |
| --------------------------- | ------------------------------------------ | -------- | ------ |
| [Lenke utenfor brev](Lenke) | `application/vnd.difi.dpi.lenke+xml`       | Ja       | Ja     |
| [Arrangement](Arrangement)  | `application/vnd.difi.dpi.arrangement+xml` | Ja       | Ja     |
