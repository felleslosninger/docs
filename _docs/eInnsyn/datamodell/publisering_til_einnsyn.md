---
title: Publisering til eInnsyn
description:
summary:

sidebar: einnsyn_technical_sidebar
redirect_from: /einnsyn_publisering_til_einnsyn
---

eInnsyn nyttar eFormidling til transport av data mellom innhaldsleverandørar og eInnsyn.
Meldingane til eInnsyn er basert på Noark, men konvertert til json-ld som er ei RDF-serialisering. Datafelta, klassar og koplingane mellom dei er i stor grad det same, men formatet er ulikt

eInnsyn har fleire ulike meldingstypar ein sender gjennom eInnsyn. At meldinga er ei eInnsyn melding og kva type det er, spesifiserast ihh til [denne spesifikasjonen]({{site.baseurl}}/docs/eFormidling/Teknisk_informasjon/message#einnsyn).

Sjølve meldingsinnhaldet, og data som skal sendast til eInnsyn, angir man i fila payload.jsonld.

Her er eksempel på jsonld-fil og tilsvarande data som Noark5-xml
* [Payload.jsonld]({{site.baseurl}}/resources/einnsyn/eksempelfiler/konvertert_noark5tiljsonld.jsonld)
* [Noark5 xml]({{site.baseurl}}/resources/einnsyn/eksempelfiler/noark5_basiseksempel.xml)

Publisering til eInnsyn kan gjøres på to måter:
* Ved bruk av [eInnsyn-klient]({{site.baseurl}}/docs/eInnsyn/einnsyn_install_forutsetninger_verktoy). Klienten kan motta data på Noark4/5 xml format. Den vil da validere og konvertere data til jsonld som sendes til integrasjonspunktet. Klienten kan også benyttes til å validere json-ld format.
* Direkteintegrasjon, dvs. poste meldinger direkte til integrasjonspunktet. Meldingene må da være i jsonld-format (både compact og extended er støttet). Det er en maks størrelse på meldinger som kan sendes på 1 MB, det er derfor intensjonen at systemer som benytter direkteintegrasjon sender mest mulig atomiske meldinger (eks. en og en journalpost/møtesak). Ved oppdatering/endring av en registrering må all relevant informasjon (referanse til parent, dokumentbeskrivelse og dokumentobjekt) sendes på nytt, ellers blir dette utelatt ("slettet").

## Identifikator strategi
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

## ID-Converter
Det finnes en funksjon i admin-GUI som kan benyttes ved overgang fra noark4 til noark5 eller jsonld uten "skarpt skille". Når denne funksjonen er påslått vil eInnsyn sjekke nye id'er opp mot eksisterende id i databasen og ved treff vil den konvertere meldingen til gammelt format på vei inn. Dette for å unngå at det opprettes ny saksmappe og journalpost basert på ny id.
Logikk i ID-konverter er som følger:

Hvis innkommende saksmappe-id(iri) starter med “http://data.einnsyn.no/noark4/” sendes den videre uten endring.
Hvis den starter med noe annet, letes den opp basert på:
“http://data.einnsyn.no/noark4/Saksmappe--<orgnummer>--<sakssekvensnummer>--<saksaar>” for å se om vi har den lagret med gammel id.
Hvis den fins i databasen, sjekkes saksmappe_iri i meldingen opp mot lagret id/iri. Hvis disse ikke er like, endres meldingen til å bruke id/iri vi har lagret i databasen.
Hvis den ikke fins, sendes meldingen videre.

Samme for journalpost, den sendes videre hvis id/iri starter med “http://data.einnsyn.no/noark4/”
Hvis den starter med noe annet, letes den opp basert på virksomhet, journalaar og journalsekvensnummer (ikke oppslag på oppbygd id/iri som for saksmappe). Hvis den fins i databasen, sjekkes journalpost_iri i meldingen opp mot lagret journalpost-id/iri. Hvis disse ikke er like, endres meldingen til å bruke id/iri vi har lagret i databasen.
Parent til journalposten i meldingen oppdateres til å være id/iri på parent fra databasen.
Hvis den fins, men har samme id/iri som i databasen, korrigeres eventuelt parent i meldingen til å være parent-iri fra databasen.

Hvis journalpost ikke fins i databasen basert på virksomhet, journalaar og journalsekvensnummer, forsøker man å finne en eventuelt tidligere lagret saksmappe ut fra innkommende journalposts oppgitte parent (oppslag mot saksmappe sin ekstern_id og virksomhet).
Hvis mappen fins med den oppgitte ekstern_id, endres meldingen til å bruke vår saksmappe-id/iri som parent på journalpost.

## Strukturering av publiseringen
eInnsyn forsøker i så stor grad som mogleg å legge til rette for løpande overføring. Og strukturen legg opp til dette sjølv i tilfeller der dette ikkje er tilfelle.
Json-ld filene med data skal derfor vere sentrert rundt ***ein*** instans av ***registrering***. Der det t.d er fleire journalpostar i samme saksmappe, eller dokument som tilhøyrer fleire journalpostar. Så vil dette dupliserast for kvar journalpost.
På samme måte så vil møteregistreringar og møtedokument i samme møte sendast som separate meldingar. Dersom 2 registreringar referear til kvarandre skal dei like vel sendast som separate meldingar 
[Eksempel på splitta forsendelse]({{site.baseurl}}/docs/eInnsyn/datamodell/eksempler#oppsplitting-av-noark-uttrekk)
 

## Fulltekstpublisering
For å fulltekstpublisere trengst det at ein set opp eit fillager lokalt som er tilgjengeleg frå internett. Ein legg der dokumenta som skal fulltekstpubliserast. I metadata som blir sendt til eInnsyn legg ein så inn lenke til dokumenta som er skal fulltekstpubliserast.

Fulltekstlenke vert lagt i feltet *referanseDokumentfil*, som ligg under *dokumentobjekt*-klassen. Eksempelfilene ovanfor har eksempel på korleis ein lenkar inn fullteksturl.

### Delvis Fulltekstpublisering
Det er mogleg å fulltekstpublisere kun delar av dokumenta som er tilknytta ein registrering. Samtidig kan det ofte vere ønskeleg å vise at det t.d finst vedlegg ein ikkje har publisert.

For å få til dette så kan ein avlevere *dokumentbeskrivelsen* på alle dokument ein vil vise at eksistere. For dei som skal fulltekstpubliserast, så følger også med *dokumentobjektet* som ligg under dokumentbeskrivelsen.

![Struktur fulltekspublisering]({{site.baseurl}}/images/einnsyn/struktur_fulltekstpublisering.png)

## Kvittering på publisert data
[Flyttet hit](https://docs.digdir.no/docs/eInnsyn/datamodell/Kvittering_ved_publisering)

## Slettemeldinger
Sletting fra eInnsyn kan automatiseres ved å sende slettemelding. Dette sendes på samme måte som en journalpost (samme meldingstype i eFormidling) med en slettemelding som payload. Eksempel på slettemelding:
```
<?xml version="1.0" encoding="UTF-8"?>
<trekkTilbake
        xmlns="http://www.arkivverket.no/standarder/noark5/arkivstruktur" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <registrering xsi:type="journalpost">
        <systemID>fb81a8d1-c78a-4447-9710-b668fd144769</systemID>
    </registrering>
</trekkTilbake>
```

Eksempel på slettelding som jsonld:
```
{
  "@context": {
    "@base": "http://elefant/vedlegg/",
    "arkiv": "http://www.arkivverket.no/standarder/noark5/arkivstruktur/",
	"einnsyn": "http://data.einnsyn.no/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@graph": [
        {
          "@id": "3056b799-a88e-435b-95fc-4b7621b57d27",
          "@type": "arkiv:Journalpost"
        },
		{
          "@id": "692650f3-f090-4ab0-a2ee-d564adb5644f",
          "@type": "arkiv:Saksmappe"
        }
      ],
      "@id": "f96f9e3f-390b-4287-a9ce-6856c8625bb6"
    },
    {
      "@graph": [
        {
          "@id": "f96f9e3f-390b-4287-a9ce-6856c8625bb6",
          "@type": "einnsyn:graftype/TrekkeTilbakeGraf"
        }
      ],
      "@id": "einnsyn:graf/meta"
    }
  ]
}
```
