---
 
title: SignalMessage  
group: transportlag
permalink: sdp_index_signalmessage.html
sidebar: dpi_sidebar
---

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”/index.html"
    }}“:{{page.url | remove:”/index.html"}}
  - Term  
    {{page.title}}
  - Definisjon  
    ebMS 3.0 signalmelding
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/os/ebms_core-3.0-spec-os.html)

### eb:SignalMessage

SignalMessage blir brukt til å sende en melding til mottakende MSH.
Signalmekanismen blir brukt til å sende feilmeldinger,
transportkvitteringer eller en forespørsel om å få levert en melding.

### Attributter

| Identifikator | Kardinalitet | Datatype | Kommentar |
| --- | --- | --- | --- |
| [MessageInfo](../UserMessage/MessageInfo.md) | 1..1 | eb:MessageInfo | Samme element som i UserMessage - intern identifikator og timestamp |
| [PullRequest](PullRequest.md) | 0..1 | eb:PullRequest | Forespørsel om å få levert en ventende melding |
| [Receipt](Receipt.md) | 0..1 | eb:Receipt | Standard kvittering relatert til en UserMessage |
| [Error](Error.md) | 0..unbounded | eb:Error | Standardfeilmelding relatert til en melding |

### Eksempel

  - [SOAP forespørsel om kvitteringer fra avsender til
    meldingsformidler](../../eksempler/soap/5_request_forespoersel_om_forretningskvittering_fra_postavsender_til_meldingsformidler.xml)
  - [SOAP svar fra meldingsformidler om ingen
    kvitteringer](../../eksempler/soap/6_response_error_fra_meldingsformidler_til_postavsender.xml)
