--- 
title: Meldingsidentifikatorer  

sidebar: dpi_sidebar
---

### Identifikatorer brukt i forsendelsen punkt til punkt.

Disse identifikatorene benyttes for å spore en melding og tilhørende
meldinger i en samtale.

| Term | Kardinalitet | Datatype | Beskrivelse |
| --- | --- | --- | --- |
| [eb:Messaging.MessageInfo.MessageId]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/transportlag/UserMessage/MessageInfo) | 1..1 | tns:non-empty-string | GUID som unikt identifiserer meldingen |
| [eb:Messaging.MessageInfo.RefToMessageId]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/transportlag/UserMessage/MessageInfo) | 0..1 | tns:non-empty-string | GUID som unikt identifiserer meldingen dette er et svar på |
| [eb:Messaging.CollaborationInfo.ConversationId]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/transportlag/UserMessage/CollaborationInfo) | 0..1 | tns:non-empty-string | GUID som unikt identifiserer første melding i samtalen, kan brukes på tvers av Aktører |
