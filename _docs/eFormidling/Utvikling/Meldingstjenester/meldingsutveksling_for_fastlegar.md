---
title: Helsemeldingar via NHN
description: "Sending av meldingar til fastlegar og helsepersonell via Norsk Helsenett"
summary: "Korleis sende meldingar til fastlegar og helsepersonell via NHN"
product: eFormidling
sidebar: eformidling_sidebar
---

## Innleiing

eFormidling støttar sending av meldingar til fastlegar via Norsk Helsenett (NHN) sin meldingsinfrastruktur. Meldingane vert sende direkte til fastlegen sitt EPJ-system (Elektronisk pasientjournal).

## Prosessar og dokumenttypar

| Prosess                                | Dokumenttype                                      | Eksempel                                                       |
| -------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| Innsending til fastlege                | `urn:no:difi:profile:digitalpost:fastlege:ver1.0` | https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1 |
| Innsending til NHN-registrert mottakar | `urn:no:difi:profile:digitalpost:helse:ver1.0`    | https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1 |

## Føresetnader

Ved bruk av **Helsemeldingar via NHN** opptrer ei organisasjon vanlegvis både som avsendar og mottakar.

For at ei organisasjon kan ta i bruk _Helsemeldingar via NHN_ må følgjande føresetnader vere på plass:

- Organisasjonen må vere [medlem av Helsenettet](https://www.nhn.no/medlemskap-i-helsenettet)
- Det må [delegerast rettar til Digitaliseringsdirektoratet](https://www.nhn.no/tjenester/helseid/ta-i-bruk/delegering-av-rettigheter-i-helseid-til-databehandler) for _Helsemeldingar via NHN_
- Organisasjonen og helserelaterte tenester den tilbyr må vere registrert i Adresseregisteret (AR)

## Teknisk implementering

_Helsemeldingar via NHN_ brukar kommunikasjon over **EDI 2.0**, der integrasjonspunktet vert brukt for å automatisere tilgang til AR og FLR, og i tillegg tilbyr sikker transport.

Integrasjonspunktet pakkar meldingane og sender desse uendra vidare til NHN sin EDI 2.0-teneste. Meldingane vert deretter rutta til mottakarens MSH (Message Service Handler / meldingstjenar) basert på informasjon frå Adresseregisteret (AR) og Fastlege-registeret (FLR).

## Konfigurasjon

For å ta i bruk _Helsemeldingar via NHN_ må integrasjonspunktet konfigurerast med følgjande:

### Aktivere _NHN-meldingar_

Først må _NHN-meldingar_ aktiverast i integrasjonspunktet:

```properties
difi.move.feature.enableDPH=true
```

### Whitelist av organisasjonsnummer

Integrasjonspunktet kan representere éi eller fleire organisasjonar. Kvar avsendar må vere whitelista på førehand gjennom konfigurasjonsnøkkelen `difi.move.dph.whitelistOrgnum`. Denne er påkravd og skal innehalde eitt eller fleire organisasjonsnummer som kan sende meldingar via integrasjonspunktet.

**Døme med eitt organisasjonsnummer:**

```properties
difi.move.dph.whitelistOrgnum=999888777
```

Døme med fleire organisasjonsnummer:

```properties
difi.move.dph.whitelistOrgnum=999888777,888777666
```

> **Merk:** Dersom `difi.move.dph.whitelistOrgnum` har meir enn eitt organisasjonsnummer, må `difi.move.dph.allowMultitenancy` setjast til `true`.

## Meldingsflyt

Diagrammet under viser flyten av meldingar og statusar ved sending av _helsemeldingar via NHN_. Meldingar går frå avsendarens fagsystem, gjennom integrasjonspunktet og EDI 2.0, til mottakarens MSH (Message Service Handler / meldingstjenar) og vidare til EPJ-systemet (Elektronisk pasientjournal).

Statusmeldingar vert returnert på fleire nivå for å informere avsendar om meldingsutvekslinga:

- **OPPRETTET**: Bekreftelse på at meldinga er oppretta i integrasjonspunktet
- **SENDT**: Bekreftelse på at meldinga er sendt vidare i kjeda
- **MOTTATT**: Bekreftelse på at meldinga er mottatt av msh-systemet hos mottakaren
- **LEST**: Bekreftelse på at meldinga er lest/behandla i mottakarens EPJ-system
- **FEIL**: Feilmelding dersom noko går gale, anten på applikasjonsnivå eller transportnivå

<div class="mermaid">
graph LR
A("fa:fa-desktop Fagsystem")
B("fa:fa-server Integrasjonspunkt")
C("fa:fa-server EDI 2.0")
D("fa:fa-hospital-o Mottaker<br>MSH")
E("fa:fa-hospital-o Mottaker<br>EPJ")

A --> |Melding til fastlege| B
B --> |Melding til fastlege| C
C --> |Melding til fastlege| D
D --> |Melding til fastlege| E
B --> |Status: OPPRETTET| A
B --> |Status: SENDT| C
B --> |Status: FEIL| A
C --> |Status: FEIL| B
C --> |Status: FEIL - applikasjonsnivå| B
C --> |Status: FEIL - transportnivå| B
D --> |Status: FEIL - applikasjonsnivå| C
B --> |Status: MOTTATT| A
C --> |Status: MOTTATT| B
D --> |Status: MOTTATT| C
B --> |Status: LEST| A
C --> |Status: LEST| B
D --> |Status: LEST| C
E --> |Status: LEST| D

</div>

## Eksempel på bruk

[Vis konkrete eksempel på korleis ein sender ei melding via API/integrasjonspunktet, kanskje ein eksempel SBD]

## Sjå òg

- [Relaterte dokumentasjonssider]
