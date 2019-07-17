---
 
title: Meldingsidentifikatorer  
permalink: sdp_meldingsidentifikatorer.html
sidebar:
---

## {{page.title}}

### Identifikatorer brukt i forsendelsen punkt til punkt.

Disse identifikatorene benyttes for å spore en melding og tilhørende
meldinger i en samtale.

| Term | Kardinalitet | Datatype | Beskrivelse |
| --- | --- | --- | --- |
| [eb:Messaging.MessageInfo.MessageId](UserMessage/MessageInfo) | 1..1 | tns:non-empty-string | GUID som unikt identifiserer meldingen |
| [eb:Messaging.MessageInfo.RefToMessageId](UserMessage/MessageInfo) | 0..1 | tns:non-empty-string | GUID som unikt identifiserer meldingen dette er et svar på |
| [eb:Messaging.CollaborationInfo.ConversationId](UserMessage/CollaborationInfo) | 0..1 | tns:non-empty-string | GUID som unikt identifiserer første melding i samtalen, kan brukes på tvers av Aktører |
