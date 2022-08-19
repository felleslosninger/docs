---
title: Eksempel på taushetsbelagt saksbehandling
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden viser et eksempel på taushetsbelagt saksbehandling.

Denne siden viser et eksempel på meldingsutveksling i forbindeslse med saksbehandling. Mottaker i eksempelet er
Direktoratet for Forvaltning og Økonomistyring (DFØ) med organisasjonsnummer `986 252 932`.

1. TOC
{:toc}

## Sende meldinger

### Opprett standard business document (SBD) for meldingen

```
curl -XPOST http://localhost:9093/api/messages/out \
-H 'Content-Type: application/json' -d \
'{
    "standardBusinessDocumentHeader": {
        "headerVersion": "1.0",
        "receiver": [{
                "identifier": {
                    "authority": "iso6523-actorid-upis",
                    "value": "0192:986252932"
                }
            }
        ],
        "documentIdentification": {
            "standard": "urn:no:difi:arkivmelding:xsd::arkivmelding",
            "type": "arkivmelding",
            "typeVersion": "2.0"
        },
        "businessScope": {
            "scope": [{
                    "identifier": "urn:no:difi:profile:arkivmelding:taushetsbelagt:ver1.0",
                    "type": "ConversationId"
                }
            ]
        }
    },
    "arkivmelding": {}
}'
```

### Legg ved filen arkivmelding.xml

```
curl -XPUT http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83 \
-H 'Content-Type: application/json' \
-H 'Content-Disposition: attachment; name=Arkivmelding; filename=arkivmelding.xml' -d \
'<?xml version="1.0" encoding="utf-8"?>
<arkivmelding xmlns="http://www.arkivverket.no/standarder/noark5/arkivmelding" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.arkivverket.no/standarder/noark5/arkivmelding arkivmelding.xsd">
    <system>SaMock</system>
    <meldingId>3380ed76-5d4c-43e7-aa70-8ed8d97e4835</meldingId>
    <tidspunkt>2017-05-23T12:46:00</tidspunkt>
    <antallFiler>1</antallFiler>
    
    <mappe xsi:type="saksmappe">
        <systemID>43fbe161-7aac-4c9f-a888-d8167aab4144</systemID>
        <tittel>En tittel</tittel>
        <opprettetDato>2017-06-01T10:10:12.000+01:00</opprettetDato>
        <opprettetAv/>
        <klassifikasjon>
            <referanseKlassifikasjonssystem>Funksjoner</referanseKlassifikasjonssystem>
            <klasseID>KlasseId</klasseID>
            <tittel>En tittel</tittel>
            <opprettetDato>2017-05-23T21:56:12.000+01:00</opprettetDato>
            <opprettetAv>SaMock</opprettetAv>
        </klassifikasjon>
        <klassifikasjon>
            <referanseKlassifikasjonssystem>Objekter</referanseKlassifikasjonssystem>
            <klasseID>20500</klasseID>
            <tittel>En tittel</tittel>
            <opprettetDato>2017-05-23T21:56:12.000+01:00</opprettetDato>
            <opprettetAv>SaMock</opprettetAv>
        </klassifikasjon>
        <basisregistrering xsi:type="journalpost">
            <systemID>430a6710-a3d4-4863-8bd0-5eb1021bee45</systemID> 
            <opprettetDato>2012-02-17T21:56:12.000+01:00</opprettetDato>
            <opprettetAv>SaMock</opprettetAv>
            <arkivertDato>2012-02-17T21:56:12.000+01:00</arkivertDato>
            <arkivertAv>SaMock</arkivertAv>
            <referanseForelderMappe>43fbe161-7aac-4c9f-a888-d8167aab4144</referanseForelderMappe>
            <dokumentbeskrivelse>
                <systemID>3e518e5b-a361-42c7-8668-bcbb9eecf18d</systemID>
                <dokumenttype>Bestilling</dokumenttype>
                <dokumentstatus>Dokumentet er ferdigstilt</dokumentstatus>
                <tittel>Eksempeldokument</tittel>
                <opprettetDato>2012-02-17T21:56:12.000+01:00</opprettetDato>
                <opprettetAv>SaMock</opprettetAv>
                <tilknyttetRegistreringSom>Hoveddokument</tilknyttetRegistreringSom>
                <dokumentnummer>1</dokumentnummer>
                <tilknyttetDato>2012-02-17T21:56:12.000+01:00</tilknyttetDato>
                <tilknyttetAv>SaMock</tilknyttetAv>
                <dokumentobjekt>
                    <versjonsnummer>1</versjonsnummer>
                    <variantformat>Produksjonsformat</variantformat>
                    <opprettetDato>2012-02-17T21:56:12.000+01:00</opprettetDato>
                    <opprettetAv>Landlord</opprettetAv>
                    <referanseDokumentfil>my.pdf</referanseDokumentfil>
                </dokumentobjekt>
            </dokumentbeskrivelse>
            <tittel>En tittel</tittel>
            <offentligTittel>En offentlig tittel</offentligTittel>
           
            <virksomhetsspesifikkeMetadata>
                <forvaltningsnummer>20050</forvaltningsnummer>
                <objektnavn>Objektnavn</objektnavn>
                <eiendom>200501</eiendom>
                <bygning>2005001</bygning>
                <bestillingtype>Materiell, elektro</bestillingtype>
                <rammeavtale>K-123123-asd</rammeavtale>
            </virksomhetsspesifikkeMetadata>
           
            <journalposttype>Utgående dokument</journalposttype>
            <journalstatus>Journalført</journalstatus>
            <journaldato>2017-05-23</journaldato>
            <korrespondansepart>
                <korrespondanseparttype>Mottaker</korrespondanseparttype>
                <korrespondansepartNavn>Mottakers navn</korrespondansepartNavn>
            </korrespondansepart>        
        </basisregistrering>
        <saksdato>2017-06-01</saksdato>
        <administrativEnhet>Admenhet</administrativEnhet>
        <saksansvarlig>Saksansvarlig</saksansvarlig>
        <saksstatus>Avsluttet</saksstatus>
    </mappe>
</arkivmelding>'
```

### Legg ved filen my.pdf

```
curl -XPUT http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83 \
-H 'Content-Type: application/octet-stream' -H 'Content-Disposition: attachment; name=My PDF; filename=my.pdf' \
--data-binary @my.pdf
```

### Send meldingen fra integrasjonspunktet

```
curl -XPOST http://localhost:9093/api/messages/out/93f530e3-0d4f-4273-94cd-e0d64019ea83
```

### Følg med på status for meldingen

```
curl http://localhost:9093/api/statuses/93f530e3-0d4f-4273-94cd-e0d64019ea83
```

### Motta og slett kvittering

```
curl http://localhost:9093/api/messages/in/peek?process=urn:no:difi:profile:arkivmelding:response:ver1.0
curl -XDELETE 'http://localhost:9093/api/messages/in/9e1ad87d-256d-46f6-ae5f-5dfabb0246af
```

## Neste steg

- Funksjonell beskrivelse av [Taushetsbelagt Saksbehandling](../../Funksjonalitet/taushetsbelagt_saksbehandling)
- Dokumenttypen [Arkivmelding](../Dokumenttyper/arkivmelding)
- Grensesnittet [eFormidling 2](../integrasjonspunkt_eformidling2_api)
- Grensesnittet [BEST/EDU](../integrasjonspunkt_bestedu_api)
- Flere [Eksempler](./)
