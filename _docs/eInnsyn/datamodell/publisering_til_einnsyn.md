---
title: Publisering til eInnsyn
description:
summary:
permalink: einnsyn_publisering_til_einnsyn.html
sidebar: einnsyn_technical_sidebar
---

eInnsyn nyttar eFormidling til transport av data mellom innhaldsleverandørar og eInnsyn.
Meldingane til eInnsyn er basert på Noark, men konvertert til json-ld som er ei RDF-serialisering. Datafelta, klassar og koplingane mellom dei er i stor grad det same, men formatet er ulikt

eInnsyn har fleire ulike meldingstypar ein sender gjennom eInnsyn. At meldinga er ei eInnsyn melding og kva type det er, spesifiserast ihh til [denne spesifikasjonen](eformidling_nm_message.html#einnsyn).

Sjølve meldingsinnhaldet, og data som skal sendast til eInnsyn, angir man i fila payload.jsonld.

Her er eksempel på jsonld-fil og tilsvarande data som Noark5-xml
* [Payload.jsonld](/resources/einnsyn/eksempelfiler/konvertert_noark5tiljsonld.jsonld)
* [Noark5 xml](/resources/einnsyn/eksempelfiler/noark5_basiseksempel.xml)

Publisering til eInnsyn kan gjøres på to måter:
* Ved bruk av [eInnsyn-klient](einnsyn_forutsetninger.html). Klienten kan motta data på Noark4/5 xml format. Den vil da validere og konvertere data til jsonld som sendes til integrasjonspunktet.
* Direkteintegrasjon, dvs. poste meldinger direkte til integrasjonspunktet. Meldingene må da være i jsonld-format. Det er en maks størrelse på meldinger som kan sendes på 1 MB, det er derfor intensjonen at systemer som benytter direkteintegrasjon sender mest mulig atomiske meldinger (eks. en og en journalpost/møtesak).

## ID-strategi
**Ved direkteintegrasjon med Json-ld**
ID på klasser/typer (journalpost, saksmappe, møtemappe, møtedokumentregistrering, møtesaksregistrering, dokumentbeskrivelse og dokumentobjekt) kan defineres av avleverende system. Anbefalingen fra eInnsyn er at UUID som benyttes i URI er samme som finnes i avleverende system fra før. Dette for å unngå duplikat og kunne støtte både slettemeldinger og innsynskrav versjon 2 (order-v2.xml) fremover. SystemID i Noark v.5+ anbefales der den er av UUID versjon 1,2 eller 4.
Namespace i URI må gjerne settes likt for alle klasser/typer. Ved bruk av Json-ld compact versjon gjøres dette enkelt ved "base"-verdien i context:
```json
{
  "@context": {
    "@base": "http://data_test.einnsyn.no/",
    "arkiv": "http://www.arkivverket.no/standarder/noark5/arkivstruktur/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@id": "692650f3-f090-4ab0-a2ee-d564adb5644f",
      "@type": "arkiv:Saksmappe",
	.....
```  
http://data_test.einnsyn.no/ er her bare eksempel, og en leverandør må gjerne sette den til noe annet. 
Ved bruk av extended json-ld format vil eksempelet over se slik ut:
``` 
[
	{
    "@id": "http://data_test.einnsyn.no/692650f3-f090-4ab0-a2ee-d564adb5644f",
    "@type": [
      "http://www.arkivverket.no/standarder/noark5/arkivstruktur/Saksmappe"
    ],
	.....
``` 

**Ved bruk av klient og Noark 5 xml**
Klienten vil konvertere til Jsonld og ID vil bli generert utfra SystemID der det er oppgitt, ellers vil den generere egne uuid’er. Namespace settes likt på alle typer/klasser (http://data.einnsyn.no/noark5/)

**Ved bruk av klient og Noark 4 xml**
Klienten konverterer til jsonld og ID blir generert utfra orgnr, sakssekvensnummer/saksaar og journalnummer/journalaar. Uuid blir generert på dokumentbeskrivelser/dokumentobjekter.  Namespace settes likt på alle typer/klasser (http://data.einnsyn.no/noark4/)

## Strukturering av publiseringen
eInnsyn forsøker i så stor grad som mogleg å legge til rette for løpande overføring. Og strukturen legg opp til dette sjølv i tilfeller der dette ikkje er tilfelle.
Json-ld filene med data skal derfor vere sentrert rundt ***ein*** instans av ***registrering***. Der det t.d er fleire journalpostar i samme saksmappe, eller dokument som tilhøyrer fleire journalpostar. Så vil dette dupliserast for kvar journalpost.
På samme måte så vil møteregistreringar og møtedokument i samme møte sendast som separate meldingar. Dersom 2 registreringar referear til kvarandre skal dei like vel sendast som separate meldingar 
[Eksempel på splitta forsendelse](einnsyn_eksempelfiler.html#oppsplitting-av-noark-uttrekk)
 

## Fulltekstpublisering
For å fulltekstpublisere trengst det at ein set opp eit fillager lokalt som er tilgjengeleg frå internett. Ein legg der dokumenta som skal fulltekstpubliserast. I metadata som blir sendt til eInnsyn legg ein så inn lenke til dokumenta som er skal fulltekstpubliserast.

Fulltekstlenke vert lagt i feltet *referanseDokumentfil*, som ligg under *dokumentobjekt*-klassen. Eksempelfilene ovanfor har eksempel på korleis ein lenkar inn fullteksturl.

### Delvis Fulltekstpublisering
Det er mogleg å fulltekstpublisere kun delar av dokumenta som er tilknytta ein registrering. Samtidig kan det ofte vere ønskeleg å vise at det t.d finst vedlegg ein ikkje har publisert.

For å få til dette så kan ein avlevere *dokumentbeskrivelsen* på alle dokument ein vil vise at eksistere. For dei som skal fulltekstpubliserast, så følger også med *dokumentobjektet* som ligg under dokumentbeskrivelsen.

![Struktur fulltekspublisering](/images/einnsyn/struktur_fulltekstpublisering.png)

## Kvittering på publisert data
Alle som bruker integrasjonspunkt og kan motta innsynskrav, kan også hente ned kvitteringsmeldinger for publiseringer.
Kvitteringen sier om et dokument har blitt ferdig prosessert og publisert i eInnsyn.
Meldingene kommer som kvittering per dokument i standardkonvolutten for [SBD](https://docs.digdir.no/eformidling_nm_message.html), uten payload på meldingen.
Virksomheter som ønsker å motta kvitteringer må registrere dette i virksomhetsadministrasjonen på einnsyn.no.

**Ved direkteintegrasjon**:

Systemet må tilrettelegges for å motta prosessen “response” og dokumenttype “einnsyn_kvittering”, i henhold til [eformidlingsdokumentasjonen](eformidling_nm_message.html#einnsyn).
Sannsynligvis er integrasjonen allerede satt opp for å hente innsynskrav, og kvitteringer hentes ned på samme måte, men med annen prosessidentifikator.
Hva som skjer videre med kvitteringen blir opp til systemeier.

**Ved bruk av klient**:

Klienten (v.2.1.0 og nyere) kommer med funksjonalitet for å hente ned kvitteringsmeldinger, men den krever at miljøvariabelen “skalMottaKvitteringer” er satt til true (standard innstilling).
Status for publisering logges i applikasjonsloggen, samt egen loggfil for kvitteringer med daglig rullering. Dagens loggfil heter kvitteringer.log, og får datostempel når det rulles over til neste dag.
Plassering for kvitteringslogger settes i einnsyn-klient.xml (parameter “kvitteringer.loggmappe").

**Lesing av kvittering**:

Informasjonen ligger i forretningsmeldingen (dokumenttype einnsyn_kvittering) i SBDH, i “status”, og er på json-format.

```
  "einnsyn_kvittering" : {
    "sikkerhetsnivaa" : null,
    "hoveddokument" : null,
    "dokumentId" : "http://data.einnsyn.no/ff530c93-5ea7-48d4-abbb-c62b284192f3",
    "status" : "{
        "publisert" : true,
        "publisertDatotid" : "2021-10-29T11:57:43.773",
        "enhetskode" : "HSK",
        "enhetsnavn" : "Helse- og sosialkomite",
        "arkivskaperOrgnummer" : "964968241",
        "arkivskapernavn" : "Luster",
        "publisertAvOrgnummer" : "<org.nr som ble brukt til å sende inn data>",
        "dokumentId" : "http://data.einnsyn.no/f2345b26-ad94-4460-9399-39badeda762e"
      }",
    "referanseType" : "publisering"
  }
```  
