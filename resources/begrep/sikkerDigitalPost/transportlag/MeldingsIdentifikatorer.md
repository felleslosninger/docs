--- 
title: Meldingsidentifikatorer  
permalink: sdp_meldingsidentifikatorer.html
sidebar: dpi_sidebar
---

### Identifikatorer brukt i forsendelsen punkt til punkt.

Disse identifikatorene benyttes for å spore en melding og tilhørende
meldinger i en samtale.

| Term | Kardinalitet | Datatype | Beskrivelse |
| --- | --- | --- | --- |
| [eb:Messaging.MessageInfo.MessageId](UserMessage/MessageInfo.md) | 1..1 | tns:non-empty-string | GUID som unikt identifiserer meldingen |
| [eb:Messaging.MessageInfo.RefToMessageId](UserMessage/MessageInfo.md) | 0..1 | tns:non-empty-string | GUID som unikt identifiserer meldingen dette er et svar på |
| [eb:Messaging.CollaborationInfo.ConversationId](UserMessage/CollaborationInfo.md) | 0..1 | tns:non-empty-string | GUID som unikt identifiserer første melding i samtalen, kan brukes på tvers av Aktører |
