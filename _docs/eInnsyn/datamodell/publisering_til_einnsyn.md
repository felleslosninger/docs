---
title: Publisering til eInnsyn
description:
summary:
permalink: einnsyn_publisering_til_einnsyn.html
sidebar: einnsyn_technical_sidebar
---

eInnsyn nyttar eFormidling til transport av data mellom innhaldsleverandørar og eInnsyn.
Meldingane til eInnsyn er basert på Noark, men konvertert til json-ld som er ei RDF-serialisering. Datafelta, klassar og koplingane mellom dei er i stor grad det same, men formatet er ulikt

eInnsyn har fleire ulike meldingstypar ein sender gjennom eInnsyn. At meldinga er ei eInnsyn melding og kva type det er, spesifiserast ihh til [denne spesifikkasjonen](https://difi.github.io/felleslosninger/eformidling_nm_message.html#einnsyn).

Sjølve meldingsinnhaldet, og data som skal sendast til eInnsyn, angir man i fila payload.jsond.

Her er eksempel på jsonld-fil og tilsvarande data som Noark5-xml
* [Payload.jsonld](/felleslosninger/resources/einnsyn/eksempelfiler/konvertert_noark5tiljsonld.jsonld)
* [Noark5 xml](/felleslosninger/resources/einnsyn/eksempelfiler/noark5_basiseksempel.xml)

## Fulltekstpublisering
For å fulltekstpublisere trengst det at ein set opp eit fillager lokalt som er tilgjengeleg frå internett. Ein legg der dokumenta som skal fulltekstpubliserast. I metadata som blir sendt til eInnsyn legg ein så inn lenke til dokumenta som er skal fulltekstpubliserast.

Fulltekstlenke vert lagt i feltet *referanseDokumentfil*, som ligg under *dokumentobjekt*-klassen. Eksempelfilene ovanfor har eksempel på korleis ein lenkar inn fullteksturl.

### Delvis Fulltekstpublisering
Det er mogleg å fulltekstpublisere kun delar av dokumenta som er tilknytta ein registrering. Samtidig kan det ofte vere ønskeleg å vise at det t.d finst vedlegg ein ikkje har publisert.

For å få til dette så kan ein avlevere *dokumentbeskrivelsen* på alle dokument ein vil vise at eksistere. For dei som skal fulltekstpubliserast, så følger også med *dokumentobjektet* som ligg under dokumentbeskrivelsen.

![Struktur fulltekspublisering](/felleslosninger/images/einnsyn/struktur_fulltekstpublisering.png)
