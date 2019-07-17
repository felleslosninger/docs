-----

layout: default  
title: Messaging  
headtitle: Sikker digital post - Messaging  
group: transportlag

id: Messaging

next: UserMessage  
prev: KvitteringsForespoersel

-----

## {{page.title}}

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html" }}":{{page.url}}
  - Term  
    {{page.title}}
  - Definisjon  
    ebMS 3.0 metadata relatert til en meldingsutveksling
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/os/ebms_core-3.0-spec-os.html)

### eb:Messaging

eb:Messaging er rot-elementet som blir benyttet til holde metadata
relatert til meldinger sendt mellom to MSH’er slik som definert av ebMS
3.0. Denne informasjonen blir fraktet som en del av SOAP Header.

### Attributter

| Identifikator                   | Kardinalitet | Datatype         | Kommentar                                                                                                                                 |
| ------------------------------- | ------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [UserMessage](UserMessage/)     | 0..1         | eb:UserMessage   | en forretningsmelding som skal overleveres til fagsystemet bak MSH’en som tar i mot meldingen                                             |
| [SignalMessage](SignalMessage/) | 0..unbounded | eb:SignalMessage | Signalmelding om at det er ønske om en handling fra den andre MSH’en. En signalmelding vil typisk ikke innvolvere fagsystemet til MSH’en. |
