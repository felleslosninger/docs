---
title: "Arkivmelding"
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_nm_arkivmeldingen
---

Arkivmeldingen inneholder arkivspesifikke metadata og er utformet for kommunikasjon mellom sak- og arkivsystem. Den ble
spesifisert i samarbeid mellom Acos og Digitaliseringsdirektoratet. Den er også tatt i bruk hos KS og flere leverandører
av sak- og arkivsystem.

Det finnes per i dag flere varianter av arkivmeldingen. Den varianten som brukes i eFormidling har tatt utgangspunkt i
NOARK 5 versjon 3.1 og er definert i arkivmelding.xsd. Arkivmelding.xsd definerer typen arkivmelding.

| Felt              | Type                                  | Påkrevd                             |
|-------------------|---------------------------------------|-------------------------------------|
| system            | string                                | ja                                  |
| meldingId         | string                                | ja                                  |
| tidspunkt         | datetime                              | ja                                  |
| antallFiler       | heltall                               | ja                                  |
| mappe             | tilpasset fra NOARK mappe             | enten mappe eller basisregistrering |
| basisregistrering | tilpasset fra NOARK basisregistrering | enten mappe eller basisregistrering |

Arkivmelding bruker typene fra NOARK med en del tilpasninger. NOARK-typene er kopiert og tilpasset fra NOARK-skjemaet
arkivstruktur.xsd til arkivmelding.xsd. NOARK-skjemaet metadatakatalog.xsd brukes uendret.

eFormidlings krav til utforming av arkivmeldinger som sendes med grensesnittet `eFormidling 2`:
- validerer ihht. arkivmelding.xsd
- arkivmelding skal inneholde en saksmappe
- saksmappen skal inneholde en journalpost
- det tas bare hensyn til dokumentobjekt under tilhørende dokumentbeskrivelse

Ved mottak av arkivmeldingen kan en ikke basere seg på å validere mot arkivmelding.xsd fordi det i enkelte tilfeller vil mangle tilstrekkelig informasjon til å produsere en gyldig arkivmelding. Dette gjelder meldinger sendt fra eFormidlings grensesnitt `BEST/EDU` og meldinger mottatt fra KS SvarInn.

## Eksempel

```xml
{% include /eformidling/arkivmelding.xml %}
```

## Tilpasninger til NOARKs typer

I arbeidet med arkivmeldingen ble en del NOARK-typer fjernet fordi de ikke ble vurdert som relevante ved
meldingsutveksling: arkiv, arkivskaper, arkivdel, klassifikasjonssystem, moetemappe, moetedeltaker, moeteregistrering,
konvertering, kassasjon, utfoertKassasjon, sletting, elektroniskSignatur og klasse.

Av samme grunn er en del element fra de gjenværende NOARK-typene fjernet:
- mappe.kassasjon
- saksmappe.utlaantDato og saksmappe.utlaantTil
- registrering.kassasjon
- dokumentbeskrivelse.kassasjon, dokumentbeskrivelse.utfoertKassasjon, dokumentbeskrivelse.sletting og dokumentbeskrivelse.elektroniskSignatur
- dokumentobjekt.format, dokumentobjekt.formatDetaljer, dokumentobjekt.sjekksum, dokumentobjekt.sjekksumAlgoritme, dokumentobjekt.filStoerrelse, dokumentobjekt.elektroniskSignatur og dokumentobjekt.konvertering

Av samme grunn er en del element fra de gjenværende NOARK-typene gjort frivillige:
- mappe.mappeID, mappe.avsluttetDato, mappe.avsluttetAv, mappe.mappe og mappe.registrering
- journalpost.korrespondansepart

For å unngå risiko for kollisjoner på tvers av system er mappe.systemID, registrering.systemID,
dokumentbeskrivelse.systemID og klasse.systemID omgjort til å kreve UUID istdenfor en vilkårlig string.

I tillegg er det gjort noen strukturelle endringer:
- Registrering er omgjort fra at referanseArkivdel er frivillig til å kreve at en av referanseArkivdel, referanseForelderMappe (ny) eller referanseKlasse (ny) må oppgis
- Mappe er utvidet med ReferanseForeldermappe og klassifikasjon (ny type)
- mappe.registrering er endret til mappe.basisregistrering
- basisregistrering.registreringsID er flyttet til registrering.registreringsID
- registrering er omgjort fra å inneholde en liste av enten dokumentbeskrivelser eller dokumentobjekt til å inneholde en liste av dokumentbeskrivelser og dokumentobjekt blandet

Se gjerne relevante XSDer

- [Arkivmelding.xsd](https://github.com/felleslosninger/efm-integrasjonspunkt/blob/master/nextmove/src/main/resources/xsd/arkivmelding.xsd) (basert på [NOARK 5 v3.1 arkivstruktur.xsd](https://github.com/arkivverket/schemas/blob/master/N5/v3.1/arkivstruktur.xsd)) (ekstern lenke)
- [NOARK 5 v3.1 metadatakatalog.xsd](https://github.com/arkivverket/schemas/blob/master/N5/v3.1/metadatakatalog.xsd) (ekstern lenke)
