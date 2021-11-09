---
title: Konvolutt og melding
description: Beskrivelse av konvolutt og melding
summary: ""
permalink: eformidling_nm_message.html
product: eFormidling
sidebar: eformidling_technical_sidebar
---

En inndelt i tre logiske deler: Adressering, forretningsmelding og dokumentpakke - som er selve meldingen man ønsker å sende.
Adresseringen og forretningsmeldingen er realisert ved hjelp av Standard Business Document.


[Standard Business Document er en GS1-standard](https://www.gs1.org/standards/edi/standard-business-document-header-sbdh) utviklet for å forenkle utveksling av dokumenter i en B2B kontekst. Standardkonvolutten inneholder informasjon for identifisering, adressering og routing av forretningsmeldingen. SBD er obligatorisk i neste versjon av PEPPOL-infrastrukturen for fakturaformidling.

> [Xsd for SBD](https://www.gs1.org/standards/edi-xml-gdsn-gs1-uncefact-xml-profiles/sbdh-xml-schema-files/1)

<div class="mermaid">
graph LR
subgraph Melding
  subgraph Konvolutt 
    el1[<b>Standard Business Document Header</b><br/> brukt til ruting av meldingen frem til mottaker]  
    el2[<b>Forretningsmelding</b><br/>brukt til effektiv håndtering av mottak]
  end
  subgraph Innhold
    el3[<b>ASIC-E med innhold</b><br/>En eller flere filer med strukturert informasjon som skal frem til mottaker]
  end
end
</div>


## Adressering

Adresseinformasjon legges i Standard Business Document Header. 

```json
{% include /eformidling/nextmove/sbd.json %}
```

#### sender/receiver.identifier.value 

```value``` feltet krever prefiks ```0192:``` før organisasjonsnummer for alle forsendelser til norske virksomheter. Prefiks er ikke påkrevd på mottaker om mottaker er innbygger. 

#### På-vegne-av-avsender - DPV og DPI
DPV og DPI støtter å sende meldinger på-vegne-av andre virksomheter. Dette angis i ```sender.identifier.value``` med følgende syntaks: ```0192:<orgnr>:<paa-vegne-av-orgnr>```. Når det gjelder DPI, støttes også avsenderidentifikator. Se eksempel under [Digital post til innbygger](#digital-post-til-innbygger).

#### messageId
Unik identifikator for meldingen, og brukes til å referere meldinger i grensesnittene. Mapper til documentIdentification.instanceIdentifier i SBD. Denne "erstatter" den gamle ConversationId for meldinger, se info under. 

#### conversationId
Unik identifikator for konversasjonen, knytter meldinger og tilhørende kvitteringer sammen. Mapper til businessScope.instanceIdentifier.

## Forretningsmelding

Forretningsmeldingen inneholder meldingsformidlings-spesifikk informasjon. Dette er informasjon som ikke krypteres og dermed kan brukes til f.eks. routing av meldingen, samt som beslutningsgrunnlag ved mottak av meldingen. 

Forretningsmelding kan være en av åtte typer meldinger, de tre hovedmeldingstypene er : Arkivmelding, eInnsyn og Digitalpost. Hver forretningsmelding har en prosess som inneholder "meldingstype" og "område" som er underkategorier for adressering ```urn:no:difi:profile:<meldingstype>:<område>:ver.1.0```.
Meldingstype forteller hvilken type melding som skal sendes, mens område blir brukt til å spesifisere hvor/hvordan mottakeren ønsker meldingen. Virksomheten må selv velge hvilke prosesser de ønsker på hvilke kanaler. 

<!---
I en DPO- eller DPV-forsendelse brukes arkivmelding, her er det flere forskjellige områder som forteller hvor forsendelsen skal. Virksomheten må selv ha et forhold til om melding av gitt type skal til en spesifikk postboks i Altinn, eller om de ønsker å motta den direkte i sak-arkivsystemet.
-->

<!---

#### Eksempel

Virksomhet A er en offentlige virksomhet som kan sende og motta alle typer meldinger i eFormidling, men har valgt å motta arkivmeldinger innenfor planByggOgGeodata-området via DPV i stedet for DPO. Prosessen for den aktulle forretningsmeldingen er dermed ```urn:no:difi:profile:arkivmelding:planByggOgGeodata:ver1.0``` - med meldingstypen *arkivmelding* og område *planByggogGeodata*. Virksomhet B og C kan også sende og motta alle typer meldinger. B sender en forretningsmelding med prosess ```urn:no:difi:profile:arkivmelding:tekniskeTjenester:ver1.0``` til A og C, og denne blir levert via DPO. C sender så en forretningsmelding med prosess ```urn:no:difi:profile:arkivmelding:planByggOgGeodata:ver1.0``` til A og B, og denne blir levert via DPO til B, og via DPV til A fordi A eksplisitt har valgt å motta "planByggOgGeodata" via DPV.

-->

## Dokumentpakke

Payloaden består av en eller flere filer man ønsker å sende. Dette kan være både strukturert og ustrukturert informasjon. 

Dokumentpakken realiseres ved hjelp av Associated Signature Containers.

Associated Signature Containers er et pakkeformat som er designet for å ivareta integriteten til innholdet over lang tid. Kort fortalt definerer standarden hvordan man skal sette sammen en zip-fil med en filstruktur der man lager en digital signatur for hver enkelt fil med en kombinasjon av et digitalt fingeravtrykk av filen og et PKI-sertifikat eid av en virksomhet. Dette medfører at man kan verifisere at filene kommer fra rett virksomhet, og om de har blitt endret etter signering.


## Meldingstypene


### Arkivmelding

Arkivmeldinger er meldinger som sendes mellom sak-/arkivsystemer basert på NOARK5 metadata. 
Dersom mottaker ikke har integrasjonspunkt, vil avsenders integrasjonspunkt mappe meldingen til mottakers foretrukne mottaksplattform. I første omgang vil dette i hovedsak dreie seg SvarInn og SvarInn2 etterhvert som denne tas i bruk. Dersom mottaker ikke er knyttet til en annen plattform, vil meldingen sendes til Digital postkasse for virksomheter (DPV). 
En kan som mottaker med integrasjonspunkt velge at en ikke ønsker motta alle meldingstyper i sitt integrasjonspunkt. Meldingene man ikke ønsker å motta vil da routes til virksomhetens postboks i AltInn via DPV.


| Prosess | Dokumenttype | 
|---------|--------------|
|urn:no:difi:profile:arkivmelding:planByggOgGeodata:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:helseSosialOgOmsorg:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:oppvekstOgUtdanning:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:kulturIdrettOgFritid:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:trafikkReiserOgSamferdsel:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:naturOgMiljoe:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:naeringsutvikling:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:skatterOgAvgifter:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:tekniskeTjenester:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:administrasjon:ver1.0 | |
|  |urn:no:difi:arkivmelding:xsd::arkivmelding |
|urn:no:difi:profile:arkivmelding:response:ver1.0 | | 
|  |urn:no:difi:arkivmelding:xsd::arkivmelding_kvittering |
|  |urn:no:difi:eformidling:xsd::status\* |
|  |urn:no:difi:eformidling:xsd::feil\* |

\* dokumenttypen er forbeholdt kontrollmeldinger i infrastrukturen og skal ikke brukes av integrasjoner


```json
{% include /eformidling/nextmove/forettningsmeldingDpo.json %}
```
<!---
- betydning av felter 
- mapping mot dpv
- mapping til ks
-->


### Digital post til innbygger

Ved sending av digital post til innbygger må man ta stilling til om meldingen har varslingsplikt eller ikke. [Les mer om dette her](http://samarbeid.digdir.no/digital-postkasse/dette-er-digital-postkasse/105)

Begge prosessene støtter både digitalpost og fysisk post.

- Info = informasjonsmeldinger uten varslingsplikt
- Vedtak = meldinger som medfører varslingsplikt



| Prosess | Dokumenttype | 
|---------|--------------|
|urn:no:difi:profile:digitalpost:info:ver1.0 | |
|  |urn:no:difi:digitalpost:xsd:digital::digital|
|  |urn:no:difi:digitalpost:xsd:digital::digital_dpv|
|  |urn:no:difi:digitalpost:xsd:fysisk::print |
|urn:no:difi:profile:digitalpost:vedtak:ver1.0 | |
|  |urn:no:difi:digitalpost:xsd:digital::digital|
|  |urn:no:difi:digitalpost:xsd:digital::digital_dpv|
|  |urn:no:difi:digitalpost:xsd:fysisk::print|


**Digital post**
```json
{% include /eformidling/nextmove/forettningsmeldingDpiDigital.json %}
```

**Fysisk post**

```json
{% include /eformidling/nextmove/forettningsmeldingDpiFysisk.json %}
```

\* ikke påkrevd

**Digital DPV-melding** 
```json
{% include /eformidling/nextmove/forretningsmeldingDpvDigital.json %}
```

> Lenke uten for brev støttet funksjonalitet og er [dokumentert her](https://docs.digdir.no/eformidling_dev.html#Digital-post-til-innbygger-lenke-utenfor-brev)

### eInnsyn

| Prosess | Dokumenttype | 
|---------|--------------|
|urn:no:difi:profile:einnsyn:journalpost:ver1.0 | |
|  |urn:no:difi:einnsyn:xsd::publisering |
|urn:no:difi:profile:einnsyn:innsynskrav:ver1.0 | |
|  |urn:no:difi:einnsyn:xsd::innsynskrav |
|urn:no:difi:profile:einnsyn:meeting:ver1.0 |  |
|  |urn:no:difi:einnsyn:xsd::publisering |
|urn:no:difi:profile:einnsyn:response:ver1.0 | |
|  |urn:no:difi:einnsyn:xsd::einnsyn_kvittering |
|  |urn:no:difi:eformidling:xsd::status\* |
|  |urn:no:difi:eformidling:xsd::feil\* |

\* dokumenttypen er forbeholdt kontrollmeldinger i infrastrukturen og skal ikke brukes av integrasjoner

**Journal**

```json
{% include /eformidling/nextmove/forettningsmeldingDpeJournal.json %}
```

**Innsynsbegjæring**

```json
{% include /eformidling/nextmove/forttningsmeldingDpeInnsyn.json %}
```

**Møte**
```json
{% include /eformidling/nextmove/forettningsmeldingDpeJournal.json %}
```
### Avtalt

Avtalt er en bilateral meldingstype som lar avsender og mottaker sende en forhåndsbestemt forretningsmelding som kan være strukturert eller ustrukturert. 

| Prosess | Dokumenttype | 
|---|---|
|urn:no:difi:profile:avtalt:avtalt:ver1.0 | |
|  |urn:no:difi:avtalt:xsd::avtalt |


Det er ikke opprettet en egen type kvittering for forretningsmelding av typen Avtalt. 

**Avtalt**
```json
{% include /eformidling/nextmove/forretningsmeldingDpoAvtalt.json %}
```

**Eksempel**
```json
{% include /eformidling/nextmove/forretningsmeldingDpoAvtaltEksempel.json %}
```

> Forretningsmeldinger som inneholder " " må disse endres til  ' ' for å unngå at json-validatoren leser det som et json-element. Dette kan spesielt være aktuelt i XML-filer som inlines i forretningsmeldingen.

Avtalt-meldingen forklart på Integrasjon og sikkerhetsforum 2020. (00:26 – 11:31)

<iframe title="vimeo-player" src="https://player.vimeo.com/video/487591943?h=72a0cb0a4e" width="720" height="480" frameborder="0" allowfullscreen></iframe> 


### FIKS IO

Integrasjonspunktet støtter å sende meldinger over FIKS IO-platformen. Dette forutsetter konfigurasjon beskrevet [her](https://docs.digdir.no/eformidling_properties_config.html#fiks-io).

Det er opp til den enkelte avsender å verifisere at gitt mottaker kan motta meldinger over valgt meldingsprotokoll; integrasjonspunktet validerer kun at kontoId til mottaker er gyldig.

SBD'en må inneholde følgende:
- ```receiver.identifier.value```: mottakers kontoId, UUID
- ```documentIdentification.type```: ```fiksio```
- ```documentIdentification.standard```: meldingsprotokoll
- ```businessScope.scope.identifier```: meldingsprotokoll (repetert)
- Tom forretningsmelding

Eksempel på full SBD:
```json
{
  "standardBusinessDocumentHeader": {
    "businessScope": {
      "scope": [
        {
          "scopeInformation": [
            {
             "expectedResponseDateTime": "20xx-05-10T00:31:52Z"
           }
         ],
          "identifier": "fiks.io.testprotokoll",
          "type": "ConversationId"
        }
      ]
    },
    "documentIdentification": {
      "standard": "fiks.io.testprotokoll",
      "type": "fiksio",
      "typeVersion": "2.0"
    },
    "headerVersion": "1.0",
    "receiver": [
      {
        "identifier": {
         "authority": "iso6523-actorid-upis",
         "value": "fe3070c9-6fc9-4342-becb-cc56f1bc11d3"
       }
     }
   ]
  },
  "fiksio": {
  }
}
```
> NB: avsender kan ikke overstyres da det alltid er kontoId fra konfigurasjon som benyttes, og kan derfor utelates fra SBD.
