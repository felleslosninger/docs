---

title: UserMessage  
permalink: sdp_index_usermessage.html
sidebar:
---

## {{page.title}}

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”/index.html"
    }}":{{page.url}}
  - Term  
    {{page.title}}
  - Definisjon  
    ebMS 3.0 relaterte metadata om en transporten av
    forretningsmeldingen
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/os/ebms_core-3.0-spec-os.html)

### eb:Messaging

UserMessage blir brukt når innholdet i SOAP-meldingen er en
forretningsmelding. I sikker digial post er type forretningsmelding
definert i [meldingen](../../meldinger).  
eb:UserMessage skal bygges opp ved å tolke innholdet i meldingen som
skal formidles, samt settinger angitt i
[P-Modes](../Meldingsutveksling/)

### Attributter

| Identifikator | Kardinalitet | Datatype | Kommentar |
| --- | --- | --- | --- |
| mpc | 1..1 | xs:anyURI | Konstantverdi som angir kanal som skal benyttes |
| [MessageInfo](MessageInfo.md) | 1..1 | eb:MessageInfo | Intern identifikator og timestamp |
| [PartyInfo](PartyInfo.md) | 1..1 | eb:PartyInfo | Informasjon om avsender og mottaker |
| [CollaborationInfo](CollaborationInfo.md) | 1..1 | eb:CollaborationInfo | Informasjon om avtalt samhandlingsmønster for meldingen |
| [PayloadInfo](PayloadInfo.md) | 1..1 | eb:PayloadInfo | Informasjon om selve forretningsmeldingen |

### Eksempel

  - [SOAP forretningsmelding fra avsender til
    meldingsformidler](../../eksempler/soap/1_request_forretningsmelding_fra_postavsender_til_meldingsformidler.xml)
