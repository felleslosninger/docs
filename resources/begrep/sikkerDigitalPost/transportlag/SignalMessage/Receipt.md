-----

layout: default  
title: Receipt  
headtitle: Begrepskatalog for Sikker digital post -  
group: transportlag

id: Receipt

next: Error  
prev: PullRequest

-----

  - Identifikator  
    “http://begrep.difi.no{{ page.url | remove:”.html"
    }}":{{page.title}}
  - Term  
    {{page.title}}
  - Definisjon  
    Kvittering på at en gitt melding er mottatt
  - Datatype  
    complexType
  - Kilde  
    [ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/core/ebms-header-3_0-200704.xsd)

#### Egenskaper

[AS4/ebMS 3.0](http://docs.oasis-open.org/ebxml-msg/ebms/v3.0/profiles/AS4-profile/v1.0/AS4-profile-v1.0.pdf)
kapittel 3.4 regulerer hvordan man skal tolke eb:Receipt
