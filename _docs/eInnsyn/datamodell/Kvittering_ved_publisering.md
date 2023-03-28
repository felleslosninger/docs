---
title: Kvittering ved publisering
description:
summary:

sidebar: einnsyn_technical_sidebar
redirect_from: /einnsyn_kvittering_ved_publisering
---

## Publiseringsmelding
Alle som bruker integrasjonspunkt og kan motta innsynskrav, kan også hente ned kvitteringsmeldinger for publiseringer.
Kvitteringen sier om et dokument har blitt ferdig prosessert og publisert i eInnsyn.
Meldingene kommer som kvittering per dokument i standardkonvolutten for [SBD](https://docs.digdir.no/docs/eFormidling/Utvikling/Meldingstjenester/einnsyns_meldingstjeneste), uten payload på meldingen.
Virksomheter som ønsker å motta kvitteringer må registrere dette i virksomhetsadministrasjonen på einnsyn.no.

![Admin GUI avansert]({{site.baseurl}}/images/einnsyn/einnsyn_admin_gui_avansert.png)

**Ved direkteintegrasjon**:

Systemet må tilrettelegges for å motta prosessen “response” og dokumenttype “einnsyn_kvittering”, i henhold til [eformidlingsdokumentasjonen](https://docs.digdir.no/docs/eFormidling/Utvikling/Meldingstjenester/einnsyns_meldingstjeneste).
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

## Ikke-publisert og Valideringsmeldinger (fra 23.03.2023)

Det vil nå bli sendt tilsvarende kvitteringsmelding som over når en publisering ikke kunne utføres pga valideringsfeil. Feltet "publisert" vil da være "false".

Det er også lagt til en kvitteringsmelding som gir "ADVARSEL" hvis en publiseringsmelding ikke validerer. Denne sier ikke noe om publiseringen faktisk er vellykket. Det er fordi vi har en del tilpasninger som gjør at noen filer som ikke validerer allikevel blir publisert. Vi ønsker å fjerne disse tilpasningene senere, så "ADVARSEL"-feil må rettes for at disse skal publiseres i fremtiden også.

eksempel på en "ADVARSEL"-kvittering (Valideringsmelding):
``` 
  "einnsyn_kvittering" : {
    "sikkerhetsnivaa" : null,
    "hoveddokument" : null,
    "dokumentId" : "http://data.einnsyn.no/ff530c93-5ea7-48d4-abbb-c62b284192f3",
    "status" : "{
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
  }",
    "referanseType" : "publisering"
}
``` 