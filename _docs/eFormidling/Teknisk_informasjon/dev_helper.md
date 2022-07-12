---
title: Utvikler API-supplement
description: Her finner du tips for å ta i bruk eFormidling 2.0 grensesnittet. Et supplement til REST docs. Av utvikler for utvikler.
summary: ""

product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_dev
---

For å ta i bruk eFormidling 2.0 API'et (som vi anbefaler) så må en ha et StandardBusinessDocument(SBD) på rett format, opprette og sende melding, handtere innkommende meldinger og kvitteringer, og rydde opp i køen(activeMQ) etter seg ved å slette prosesserte meldinger.

Dette er ment som et supplement til [Integrasjonspunkt REST docs](https://docs.digdir.no/eformidling_nm_restdocs.html) for å gjøre det enklere og komme i gang. I tillegg til tekstlig beskrivelse vil det ligge vedlagt Postman requester som kan brukes for å komme i gang med testingen. Om du har innspill eller ønsker til andre deler av API'et som bør dekkes her send oss gjerne en e-post på [servicedesk@digdir.no](mailto:servicedesk@digdir.no).

---

## Sende store filer

> Ref API-dokumentasjon [opprett melding](https://docs.digdir.no/eformidling_nm_restdocs.html#_example_1_creating_an_arkivmelding_message) å sende DPO.

For å sende ei stor melding må du utføre 4 steg:

```Opprette melding -> last opp arkivmelding -> last opp fil -> sende```

Når ein sender via DPO så må ein laste opp arkivmeldinga som del av forsendelsen. 

SBD må være på rett format, her er eit eksempel som fungerer for avsender 991825827 (Digdir), bytt avsender(*sender ->value*) til å være samme orgnummer som du har i propertyen ```difi.move.org.number```

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "0192:991825827"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "iso6523-actorid-upis",
          "value": "0192:991825827"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:arkivmelding:xsd::arkivmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{largeMessageId}}",
      "type": "arkivmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "instanceIdentifier": "{{conversationId}}",
          "identifier": "urn:no:difi:profile:arkivmelding:administrasjon:ver1.0"          
        },
        {
          "type": "SenderRef",
          "instanceIdentifier": "be293280-4629-4b51-823e-6fd6ca363579",
          "identifier": "AvsenderSystem"
        },
        {
          "type": "ReceiverRef",
          "instanceIdentifier": "47558623-685c-4d40-b5ea-e299b27b985f",
          "identifier": "MottakerSystem"
        }
      ]
    }
  },
  "arkivmelding": {
    "sikkerhetsnivaa": "3",
    "hoveddokument": "arkivmelding.xml"    
  }
}
```

*largeMessageId og conversationId skal være UUID'er.*

### Store filer via Postman

Her finner du en .zip fil som inneholder en postman samling for oppretting og sending av store filer i tillegg til arkivmelding.xml som du trenger. 

> [Postman collection og arkivmelding]({{site.baseurl}}/resources/eformidling/stormelding_eformidling_api.zip)

Den kan kjøres nesten utav boksen med noen små justeringer:

- Sett ```sender->value``` til ditt orgnummer. Feks "0192:991825827". (0192: skal være med)
- I *UploadFileArkivmelding Body->Binary* må du velge ```arkivmelding.xml``` frå din disk.
- I *UploadFileLargeFile Body->Binary* må du velge fila du vil sende OG sette ```name``` and ```filename``` som attachments i Content-Disposition i header.

> Eksempel: Sender fila ```test.pdf``` og verdi i Content-Disposition er : ```attachment; name="test"; filename="test.pdf"```

---

Nå skal du være klar til å sende stor melding. Det gjør du ved å kjøre postman-kallene: 

1. CreateMessage
2. UploadFileArkivmelding
3. UploadFileLargeFile
4. SendMessage

---

## Digital post til innbygger lenke utenfor brev
I Integrasjonspunktet er det støtte for DPI utvidelsen ["Lenke utenfor brev")](https://begrep.difi.no/SikkerDigitalPost/1.3.0/forretningslag/Utvidelser/Lenke) som en del av [forretningsmeldingen](https://docs.digdir.no/eformidling_nm_message.html#digital-post-til-innbygger). 

Forretningsmeldingen har attributten "metadataFiler" der nøkler refererer til vedlagte dokument og verdier refererer metadataFil/utvidelse for gitt dokument. 

```
"digital": {
        "sikkerhetsnivaa": 3,
        "hoveddokument": "Test.txt",
        "tittel": "Test",
        "spraak": "en",
        "digitalPostInfo": {
            "virkningsdato": "2021-01-01",
            "aapningskvittering": false
        },
        "metadataFiler": {
            "Test.txt": "Testlenke.xml"
        }
    }
```

> Eksempel på metadataFil/utvidelse for lenke:

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<lenke xmlns="http://begrep.difi.no/sdp/utvidelser/lenke">
  <url>http://example.com</url>
</lenke>
```

Det er også nødvendig at MetaFil/utvidelse gis mimetype ```application/vnd.difi.dpi.lenke+xml``` i tilfellet lenke utenfor brev(andre mimetypes for andre utvidelser)

En kan også oppgi tekst for lenkeknapp, frist, og beskrivelse for lenke. [Se eksempel her.](https://begrep.difi.no/SikkerDigitalPost/1.3.0/forretningslag/Utvidelser/Lenke)


## Sende DPO/DPV på-vegne-av 

Ved bruk av versjon 2.4.0 eller nyere av integrasjonspunktet er det mulig å sende på vegne av en annen organisasjon eller underenhet via DPO og DPV. For å sende på vegne av benyttes Altinn autorisasjon hvor daglig leder i din virksomhet kan registrere hvem som kan sende på vegne av virksomheten. 

For å sende på vegne av må du gjøre tilpasning i Standard Business Document Header på **sender.identifier.value** feltet. Dette støtter nå et adresseringsformat som ser slik ut ```0192:<orgnr>:<påVegneAvOrgnr>```. Til dømes: Digitaliseringsdirektoratet ønsker å sende på vegne av Digitaliseringsdirektoratet Leikanger , da ser **sender.identifier.value** feltet slik ut ```0192:991825827:987464291```. 

På-vegne av DPI er også støttet, [ser mer her.] (https://docs.digdir.no/docs/eFormidling/Teknisk_informasjon/message.html#p%C3%A5-vegne-av-avsender---dpv-og-dpi)