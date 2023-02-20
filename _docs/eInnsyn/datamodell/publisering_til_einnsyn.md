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
Alle som bruker integrasjonspunkt og kan motta innsynskrav, kan også hente ned kvitteringsmeldinger for publiseringer.
Kvitteringen sier om et dokument har blitt ferdig prosessert og publisert i eInnsyn.
Meldingene kommer som kvittering per dokument i standardkonvolutten for [SBD](https://docs.digdir.no/eformidling_nm_message.html), uten payload på meldingen.
Virksomheter som ønsker å motta kvitteringer må registrere dette i virksomhetsadministrasjonen på einnsyn.no.

![Admin GUI avansert]({{site.baseurl}}/images/einnsyn/einnsyn_admin_gui_avansert.png)

**Ved direkteintegrasjon**:

Systemet må tilrettelegges for å motta prosessen “response” og dokumenttype “einnsyn_kvittering”, i henhold til [eformidlingsdokumentasjonen]({{site.baseurl}}/docs/eFormidling/Teknisk_informasjon/message#einnsyn).
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
**Tillegg fra februar 2023:**
Det vil nå bli sendt tilsvarende kvitteringsmelding som over når en publisering ikke kunne utføres pga valideringsfeil. Feltet "publisert" vil da være "false".

Det er også lagt til en kvitteringsmelding som gir "ADVARSEL" hvis en publiseringsmelding ikke validerer. Denne sier ikke noe om publiseringen faktisk er vellykket. Det er fordi vi har en del tilpasninger som gjør at noen filer som ikke validerer allikevel blir publisert. Vi ønsker å fjerne disse tilpasningene senere, så "ADVARSEL"-feil må rettes for at disse skal være gyldige senere også.

eksempel på en "ADVARSEL"-kvittering:
``` 
{
  "publisertAvOrgnummer": "123456789",
  "arkivskaper": "http://data.einnsyn.no/virksomhet/3f551702-7580-43e4-aaf7-8cad95b4d07a",
  "dokumentId": null,
  "transactionId": "31029542-d619-4f90-b06f-118f360997c6",
  "conversationId": "baddc276-41df-4ee0-affb-73b4802c58c6",
  "alvorlighetsgrad": "ADVARSEL",
  "valideringsfeil": [
    {
      "elementId": "http://journalpost.123456789.no/6a5bb1fd-6dac-4495-8c4a-2df8d1de4994",
      "elementType": "http://www.arkivverket.no/standarder/noark5/arkivstruktur/Journalpost",
      "attributt": "http://www.arkivverket.no/standarder/noark5/arkivstruktur/parent",
      "attributtVerdi": "http://saksmappe.922017433.no/1cb3665a-e9c5-4790-bc67-8bae9a67d3b3",
      "feilmelding": "Feil/ukjent type, eller mangler verdi."
    }
  ]
}
``` 

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
