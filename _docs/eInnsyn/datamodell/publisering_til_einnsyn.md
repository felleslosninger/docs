---
title: Publisering til eInnsyn
description:
summary:
permalink: einnsyn_publisering_til_einnsyn.html
sidebar: einnsyn_technical_sidebar
---

eInnsyn nyttar eFormidling til transport av data mellom innhaldsleverandørar og eInnsyn.
Meldingane til eInnsyn er basert på Noark, men konvertert til json-ld som er ei RDF-serialisering. Datafelta, klassar og koplingane mellom dei er i stor grad det same, men formatet er ulikt

eInnsyn har fleire ulike meldingstypar ein sender gjennom eInnsyn. At meldinga er ei eInnsyn melding og kva type det er, spesifiserast ihh til [denne spesifikasjonen](https://difi.github.io/felleslosninger/eformidling_nm_message.html#einnsyn).

Sjølve meldingsinnhaldet, og data som skal sendast til eInnsyn, angir man i fila payload.jsonld.

Her er eksempel på jsonld-fil og tilsvarande data som Noark5-xml
* [Payload.jsonld](/resources/einnsyn/eksempelfiler/konvertert_noark5tiljsonld.jsonld)
* [Noark5 xml](/resources/einnsyn/eksempelfiler/noark5_basiseksempel.xml)

Publisering til eInnsyn kan gjøres på to måter:
* Ved bruk av [eInnsyn-klient](https://docs.digdir.no/einnsyn_forutsetninger.html). Klienten kan motta data på Noark4/5 xml format. Den vil da validere og konvertere data til jsonld som sendes til integrasjonspunktet.
* Direkteintegrasjon, dvs. poste meldinger direkte til integrasjonspunktet. Meldingene må da være i jsonld-format. Det er en maks størrelse på meldinger som kan sendes på 1 MB, det er derfor intensjonen at systemer som benytter direkteintegrasjon sender mest mulig atomiske meldinger (eks. en og en journalpost/møtesak).

## Strukturering av publiseringen
eInnsyn forsøker i så stor grad som mogleg å legge til rette for løpande overføring. Og strukturen legg opp til dette sjølv i tilfeller der dette ikkje er tilfelle.
Json-ld filene med data skal derfor vere sentrert rundt ***ein*** instans av ***registrering***. Der det t.d er fleire journalpostar i samme saksmappe, eller dokument som tilhøyrer fleire journalpostar. Så vil dette dupliserast for kvar journalpost.
På samme måte så vil møteregistreringar og møtedokument i samme møte sendast som separate meldingar. Dersom 2 registreringar referear til kvarandre skal dei like vel sendast som separate meldingar 
 

## Fulltekstpublisering
For å fulltekstpublisere trengst det at ein set opp eit fillager lokalt som er tilgjengeleg frå internett. Ein legg der dokumenta som skal fulltekstpubliserast. I metadata som blir sendt til eInnsyn legg ein så inn lenke til dokumenta som er skal fulltekstpubliserast.

Fulltekstlenke vert lagt i feltet *referanseDokumentfil*, som ligg under *dokumentobjekt*-klassen. Eksempelfilene ovanfor har eksempel på korleis ein lenkar inn fullteksturl.

### Delvis Fulltekstpublisering
Det er mogleg å fulltekstpublisere kun delar av dokumenta som er tilknytta ein registrering. Samtidig kan det ofte vere ønskeleg å vise at det t.d finst vedlegg ein ikkje har publisert.

For å få til dette så kan ein avlevere *dokumentbeskrivelsen* på alle dokument ein vil vise at eksistere. For dei som skal fulltekstpubliserast, så følger også med *dokumentobjektet* som ligg under dokumentbeskrivelsen.

![Struktur fulltekspublisering](/images/einnsyn/struktur_fulltekstpublisering.png)
