---
title: Helsemeldingar via NHN
description: "Sending av meldingar til fastlegar og helsepersonell via Norsk Helsenett"
summary: "Korleis sende meldingar til fastlegar og helsepersonell via NHN"
product: eFormidling
sidebar: eformidling_sidebar
---

> ⚠️ **Beta – berre tilgjengeleg i testmiljø**
>
> Denne funksjonaliteten er førebels i **beta** og er per no berre tilgjengeleg i **testmiljø**.  
> Grensesnitt, funksjonalitet og oppførsel kan endre seg før endeleg produksjonssetting.

## Innleiing

eFormidling støttar sending av meldingar til fastlegar via Norsk Helsenett (NHN) sin meldingsinfrastruktur. Meldingane vert sende direkte til fastlegen sitt EPJ-system (Elektronisk pasientjournal).

## Prosessar og dokumenttypar

Det er to måtar å adressere meldingar via NHN:

### 1. Sending til fastlege (via fødselsnummer)

Ved sending til fastlege brukar du **fødselsnummeret til pasienten** som mottakaradresse. Integrasjonspunktet vil automatisk slå opp i Fastlegeregisteret (FLR) for å finne kven som er fastlegen til den aktuelle pasienten, og deretter levere meldinga til fastlegen sitt EPJ-system.

- **Prosess**: `urn:no:difi:profile:helse:helse:ver1.0`
- **Mottakaradresse**: `fastlege-for:<Fødselsnummer (11 siffer)>`. Eksempel: `fastlege-for:17912099997`-  - Authority må setjast til `nhn-actorid`
- **Oppslag**: Fastlegeregisteret (FLR), Adresseregisteret (AR) og Folkeregisteret (FREG)

Pasientinformasjon vert fylt ut automatisk ved oppslag i FREG.

### 2. Sending til HER-id (direkte til helsepersonell)

Ved sending direkte til eit HER-id brukar du **HER-id til mottakaren** som adresse. Dette gjer at du kan sende meldingar direkte til ein spesifikk helsepersonell eller helseinstans som er registrert i Adresseregisteret (AR), utan å gå via fastlegeoppslag.

- **Prosess**: `urn:no:difi:profile:helse:helse:ver1.0`
- **Mottakaradresse**: `her-id:<HER-id>`, med prefikset i små bokstavar. Authority må setjast til `nhn-actorid`
- **Oppslag**: Adresseregisteret (AR)
- **Eksempel**: [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1)

Pasientinformasjon må fyllast ut i dette tilfellet.

## Føresetnader

Ved bruk av Helsemeldingar via NHN opptrer ei organisasjon vanlegvis både som avsendar og mottakar.

For at ei organisasjon kan ta i bruk Helsemeldingar via NHN må følgjande føresetnader vere på plass:

- Organisasjonen må vere [medlem av Helsenettet](https://www.nhn.no/medlemskap-i-helsenettet)
- Organisasjonen må vere registrert som **virksomhet** i Adresseregisteret (AR), og HER-id-ane som
  skal brukast må vere registrerte som kommunikasjonspartar under den virksomheten
- Kvar kommunikasjonspart som skal brukast må ha **EDI 2.0-adresse** registrert i AR,
  `meldingstjener-api@testedi.nhn.no` i test og `meldingstjener-api@edi.nhn.no` i produksjon.
  Utan denne kan ikkje NHN rute meldingar til parten
- Digdir må ha fullmakt i HelseID til å opptre på vegne av organisasjonen som eig HER-id-en.
  **I testmiljøet gjer Digdir dette sjølv**, ved å registrere organisasjonen som tenant på
  HelseID-klienten. Ta kontakt med oss når AR-oppføringa er på plass. I produksjon gir
  organisasjonen sjølv fullmakta, sjå
  [NHN si rettleiing](https://www.nhn.no/tjenester/helseid/ta-i-bruk/delegering-av-rettigheter-i-helseid-til-databehandler)
- Organisasjonen som eig HER-id-en må delegere scopet `eformidling:dph` i Altinn til
  organisasjonsnummeret integrasjonspunktet køyrer med. I testmiljøet gjerast dette i TT02
- Maskinporten-klienten som integrasjonspunktet nyttar må ha scopet `eformidling:dph`
- Integrasjonspunktet må vere versjon **4.2.0** eller nyare. Tidlegare versjonar har kjende feil
  som rammar DPH: før v4.1.0 vert det bedt om feil scope frå Maskinporten, v4.0.8 kan ikkje køyre
  DPI og DPH samtidig, og i v4.1.0 arvar ikkje DPH nøkkellageroppsettet

> **Merk: kven som må delegere avgjerast av Adresseregisteret, ikkje av konfigurasjonen.**
>
> Integrasjonspunktet slår opp kvar HER-id i AR og hentar organisasjonsnummeret til den overordna
> virksomheten. Det nummeret vert sendt som `consumer_org` til Maskinporten. Delegeringa må difor
> gjerast av nettopp den organisasjonen som eig HER-id-en i AR, sjølv om integrasjonspunktet
> køyrer med eit anna organisasjonsnummer.
>
> Får du `invalid_scope` (MP-251) frå Maskinporten, står organisasjonsnummeret i feilmeldinga.
> Oppstartsloggen viser same nummeret, saman med namnet på organisasjonen HER-id-en tilhøyrer.

## Teknisk implementering

Helsemeldingar via NHN brukar kommunikasjon over **EDI 2.0**, der integrasjonspunktet vert brukt for å automatisere tilgang til AR og FLR, og i tillegg tilbyr sikker transport.

Integrasjonspunktet pakkar meldingane og sender desse vidare til NHN sin EDI 2.0-teneste. Meldingane vert deretter ruta til mottakarens MSH (Message Service Handler / meldingstjenar) basert på informasjon frå Adresseregisteret (AR) og Fastlege-registeret (FLR).

## Konfigurasjon

For å ta i bruk Helsemeldingar via NHN må integrasjonspunktet konfigurerast med følgjande:

### Aktivere NHN-meldingar

Først må NHN-meldingar aktiverast i integrasjonspunktet:

```properties
difi.move.feature.enableDPH=true
# Denne er mellombels nødvendig inntil løysinga er klar for produksjon
difi.move.feature.enable-beta-features=true

```

### Liste av HER-id-ar som det skal sendast og takast imot meldingar for

Integrasjonspunktet kan representere éi eller fleire organisasjonar. Alle HER-id-ar som skal sende
eller ta imot meldingar må listast opp.

Krav til kvar HER-id:

- han må vere registrert som kommunikasjonspart **under ei overordna virksomhet** i AR.
  Organisasjonsnummeret vert henta frå den overordna, så ein HER-id utan overordna virksomhet kan
  ikkje brukast. Ein HER-id som representerer sjølve organisasjonen ligg typisk øvst og har inga
  overordna eining
- den overordna virksomheten må ha delegert `eformidling:dph`, sjå Føresetnader
- han må ha EDI 2.0-adresse registrert i AR
- han må vere eksklusiv for dette integrasjonspunktet. Ein HER-id kan bare hentast av éin
  konsument, sidan meldingar vert markerte som lesne per HER-id. To integrasjonspunkt på same
  HER-id vil ta meldingar frå kvarandre

Erstatt verdiane under med dykkar eigne HER-id-ar. Ikkje bruk eksempelverdiar: dei tilhøyrer andre
organisasjonar, og gir feil `consumer_org`.

```properties
difi.move.dph.her-ids[0]=<HER-id>
difi.move.dph.her-ids[1]=<HER-id>
```

## Testing

### Skaffe eigne HER-id-ar i test

I testmiljøet er dette sjølvbetening. Lag ein brukar i
<https://register-web.test.nhn.no/ar/>, be om eigarskap til eit organisasjonsnummer, og opprett
deretter kommunikasjonspartane sjølv.

Vel organisasjonsnummer med omhu. Verksemda må òg kunne delegere i Altinn TT02, så eit heilt
oppdikta nummer blokkerer delegeringssteget. Det enklaste for ein leverandør er å bruke sitt
eige organisasjonsnummer.

### Testmottakar

Ein mottakar må kunne ta imot og kvittere for meldinga. Det er ikkje nok at HER-id-en finst i
Adresseregisteret: er det ingen som hentar meldingane for den parten, blir dei liggande ulesne,
og avsendaren får aldri status `LEVERT`.

Digdir tilbyr i dag ingen open testmottakar som de kan sende til. Ta kontakt med oss når de er
klare til å teste, så finn vi ein motpart saman.

### Ein felle ved sending direkte til HER-id

Ved `fastlege-for:` hentar integrasjonspunktet rolla til mottakaren frå registeroppslaget, og
den blir rett. Ved `her-id:` er det ikkje gitt at parten faktisk er lege.

Eit konkret døme frå vårt eige testoppsett: HER-id 8144717 er registrert med yrke **Sykepleier**.
Sender du til den som om det var ein fastlege, får meldinga feil rolle i MsgHead. Kontroller
yrke og tittel i Adresseregisteret før de brukar ein HER-id direkte.

### Testpasient

For å teste `fastlege-for:` treng de ein syntetisk person som faktisk har ein fastlegekontrakt i
Fastlegeregisteret i test. Eit vilkårleg syntetisk fødselsnummer held ikkje; oppslaget feilar med
«Personen er ikke tilknyttet fastlegekontrakt». Be `kundesenter@nhn.no` om ein testperson med
fastlegetilknyting.

### Ein HER-id kan berre hentast av éin konsument

To integrasjonspunkt som pollar same HER-id vil ta meldingar frå kvarandre, sidan meldingar blir
markerte som lesne per HER-id. Bruk eigne HER-id-ar i testoppsettet dykkar.

## Applikasjonskvitteringar

Til vanleg ønskjer Norsk Helsenett at mottakande system les og lagar applikasjonskvitteringar, slik at ein kan fortelje avsendaren om meldinga har kome heilt fram til mottakaren.
Integrasjonspunktet har likevel høve til å ta seg av dette automatisk sjølv, ved å setje følgjande property:

```properties
difi.move.feature.enable-receipts=false
```
Då gjer integrasjonspunktet to ting: det sender sjølv ei applikasjonskvittering med status OK
tilbake til avsendaren, og det leverer ikkje innkomne applikasjonskvitteringar vidare til
fagsystemet som eigne meldingar.

Ulempa er at kvitteringa vert sendt så snart integrasjonspunktet har henta meldinga, altså før
fagsystemet har behandla henne. Avsendaren får difor status `LEVERT` for tidleg. Ideelt sett bør
det mottakande systemet ta seg av denne biten sjølv.

## Meldingsflyt

Diagrammet under viser flyten av meldingar og statusar ved sending av helsemeldingar via NHN. Meldingar går frå avsendarens fagsystem, gjennom integrasjonspunktet og EDI 2.0, til mottakarens MSH (Message Service Handler / meldingstjenar) og vidare til EPJ-systemet (Elektronisk pasientjournal).

Statusmeldingar vert returnert på fleire nivå for å informere avsendar om meldingsutvekslinga:

- **OPPRETTET**: meldinga er oppretta i integrasjonspunktet
- **SENDT**: meldinga er levert vidare og har fått ein referanse frå NHN
- **MOTTATT**: transportkvittering frå mottakarens meldingstenar
- **LEVERT**: applikasjonskvittering med status OK frå mottakarens system. Dette er sluttstatus
  ved suksess
- **FEIL**: avvist på transportnivå, eller applikasjonskvittering med `Rejected` eller
  `OkErrorInMessagePart`
- **LEVETID_UTLOPT**: levetida på meldinga er passert utan at ho vart ferdig

Merk at DPH **ikkje** set statusen `LEST`. NHN har heller ingen "lest"-status, berre
transportkvittering og applikasjonskvittering.

Det er alltid integrasjonspunktet som set statusane og rapporterer dei til fagsystemet. Kvitteringane
frå NHN går tilbake same veg som meldinga, og integrasjonspunktet hentar dei ved polling.
`OPPRETTET` og `LEVETID_UTLOPT` set integrasjonspunktet sjølv, utan at det ligg ei kvittering bak.

<div class="mermaid">
graph LR
A("fa:fa-desktop Fagsystem")
B("fa:fa-server Integrasjonspunkt")
C("fa:fa-server NHN<br>EDI 2.0")
D("fa:fa-hospital-o Mottakar<br>MSH")
E("fa:fa-hospital-o Mottakar<br>EPJ")

A --> |Melding| B
B --> |Melding| C
C --> |Melding| D
D --> |Melding| E

B -.-> |OPPRETTET og SENDT| A
D -.-> |Transportkvittering| C
C -.-> |Transportkvittering| B
B -.-> |MOTTATT| A
E -.-> |Applikasjonskvittering| D
D -.-> |Applikasjonskvittering| C
C -.-> |Applikasjonskvittering| B
B -.-> |LEVERT eller FEIL| A

</div>

## Eksempel på bruk

### Eksempel 1: Sending til fastlege (via fødselsnummer)

Eksempel SBD for sending av helsemelding til fastlege via pasientens fødselsnummer:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:<eigen HER-id>"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "fastlege-for:30878199614"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:helse:xsd::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "identifier": "urn:no:difi:profile:helse:helse:ver1.0"
        }
      ]
    }
  },
  "dialogmelding": {
    "hoveddokument": "dialogmelding.xml",
    "metadataFiler": {
      "test.pdf": {
        "description" : "Dette er en test"
      }
    }
  }
}
```

Fila dialogmelding.xml skal inneholde ei [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1).

Eksempel:

```xml
<Dialogmelding xmlns="http://www.kith.no/xmlstds/dialog/2013-01-23">
<Notat>
<TemaKodet V="6" S="2.16.578.1.12.4.1.1.7322" DN="Henvendelse om pasient"/>
<Tema>Test tema</Tema>
<TekstNotatInnhold xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Testing 1 2 3 </TekstNotatInnhold>
</Notat>
</Dialogmelding>
```

#### Forklaring av viktige felt

| Felt                                         | Beskrivelse                                                                                                                                                                      |
| -------------------------------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sender.identifier.value`                    | HER-iden til avsendaren, prefiks med `her-id:` i små bokstavar. Må vere ein av HER-id-ane i `difi.move.dph.her-ids`                                                                        |
| `receiver.identifier.value`                  | **Fødselsnummer til pasienten** (11 siffer), med prefiks `fastlege-for:`. Eksempel: `fastlege-for:30878199614`. Integrasjonspunktet slår opp fastlegen i FLR.                   |
| `businessScope.scope[].identifier`           | Prosess: `urn:no:difi:profile:helse:helse:ver1.0`                                                                                                                                |

> **Merk:** Scopet `ConversationId` skal vise til første melding i ein dialog. Sidan dette er den første meldinga, vert han sett lik dokument-ID-en automatisk.  

### Eksempel 2: Sending til HER-id, første melding i ein dialog

Eksempel SBD for sending av helsemelding direkte til ein HER-id:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:<eigen HER-id>"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:12345"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:helse:xsd::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "identifier": "urn:no:difi:profile:helse:helse:ver1.0"
        }
      ]
    }
  },
  "dialogmelding": {
    "hoveddokument": "dialogmelding.xml",
    "pasient": {
      "fnr": "30878199614",
      "fornavn": "OVERSIKTLIG",
      "etternavn": "KARAFFEL"
    },
    "metadataFiler": {
      "test.pdf": {
        "description" : "Dette er en test"
      }
    }
  }
}
```

#### Forklaring av viktige felt

| Felt                                         | Beskrivelse                                                                                                                                                                      |
| -------------------------------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sender.identifier.value`                    | HER-iden til avsendaren, prefiks med `her-id:` i små bokstavar. Må vere ein av HER-id-ane i `difi.move.dph.her-ids`                                                                        |
| `receiver.identifier.value`                  | **HER-id til mottakaren** (tal), med prefiks `her-id:`. Eksempel: `her-id:12345`. Integrasjonspunktet slår opp adressa i AR (Adresseregisteret).                            |
| `businessScope.scope[].identifier`           | Prosess: `urn:no:difi:profile:helse:helse:ver1.0`                                                                                                                                |

> **Merk:** HER-id må vere registrert i Adresseregisteret (AR) og knytt til organisasjonen sin MSH før meldingar kan sendast.

> **Merk:** Scopet `ConversationId` skal referere til første melding i ein dialog. Sidan dette er den første meldinga, vert han sett lik dokument-ID-en automatisk.

### Eksempel 3: Svar i ein dialog

Eksempel SBD for sending av helsemelding direkte til ein HER-id:

```json
{
  "standardBusinessDocumentHeader": {
    "headerVersion": "1.0",
    "sender": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:<eigen HER-id>"
        }
      }
    ],
    "receiver": [
      {
        "identifier": {
          "authority": "nhn-actorid",
          "value": "her-id:12345"
        }
      }
    ],
    "documentIdentification": {
      "standard": "urn:no:difi:helse:xsd::dialogmelding",
      "typeVersion": "2.0",
      "instanceIdentifier": "{{messageId}}",
      "type": "dialogmelding",
      "creationDateAndTime": "2019-07-02T15:05:04.7960494+02:00"
    },
    "businessScope": {
      "scope": [
        {
          "type": "ConversationId",
          "instanceIdentifier": "{{Referanse_til_foerste_melding_i_en_dialog}}",  
          "identifier": "urn:no:difi:profile:helse:helse:ver1.0"
        },
        {
          "type": "ParentId",
          "instanceIdentifier": "{{Referanse_til_forrige_melding_i_en_dialog}}"
        }
      ]
    }
  },
  "dialogmelding": {
    "hoveddokument": "dialogmelding.xml",
    "pasient": {
      "fnr": "30878199614",
      "fornavn": "OVERSIKTLIG",
      "etternavn": "KARAFFEL"
    },
    "metadataFiler": {
      "test.pdf": {
        "description" : "Dette er en test"
      }
    }
  }
}
```

> **Merk:** Scopene `ConversationId` og `ParentId` vert brukte til å vise til ein samtale. ConversationId skal referere til første melding i dialogen. ParentId skal referere til førre melding i dialogen.   

## Sjå òg

- [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1)
- [Medlemskap i Helsenettet](https://www.nhn.no/medlemskap-i-helsenettet)
- [Adresseregisteret](https://www.nhn.no/tjenester/adresseregisteret)
- [Integrasjonspunktets API](../integrasjonspunkt_eformidling2_api)
- [Adressetjenestens API](../serviceregistry_api)
