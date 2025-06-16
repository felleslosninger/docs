---
title: Tillitsrammeverk
description: Tillitsrammeverk

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_tillitsrammeverk
---


I sandkassen vil Digdir forvalte den nasjonale tillitslista, som vil innehalde kva aktørar som er godkjent som:
- PID-utstedere
- Lommebok-operatørar
- Kvalifiserte utstedere (QEAA)
- Offentlige utstedere (Pub-EAA)
- Brukerstadsertifikat-utstedere


<table><tr><td><div class="mermaid">

graph

subgraph AK [Tillitsliste]
  TLPID@{ shape: docs, label: "PID-utstedere"}
  TLEAA@{ shape: docs, label: "Utstedere (QEAA, PubEAA, EAA)"}
  
  TLRP@{ shape: docs, label: "Tilgangssertifikat-leverandørar"}
  TLW@{ shape: docs, label: "Lommebok-operatører"}

end

  DRPR[(Digdir brukerstad-register)]
  RPR[(Andre brukerstad-registre)]

TLRP --> DRPR
TLRP --> RPR
</div></td></tr>
<tr><td>
 <em>Tillitsrammeverket i sandskassen</em>
 </td>
</tr>
</table>


Det er verd å merke seg at sjølve brukarstadene (relying parties) ikkje havnar på den sentrale tillitslista, men at det istaden er ein to-nivå struktur: den sentrale tillitslista peikar berre på PKIer forvalta av godkjente **tilgangssertifikat-utstedere**. Det kan gjerne vere fleire slike sertifikat-utstedere i eit land. Eit brukarstad må ta kontakt med ein **Registrar** for å skaffe eit brukerstad-sertifikat (også kjent som "tilgangssertifikat": Relying Party Access Certificate). Normalt vil Registrar og sertifikat-utsteder vere same organisasjon. 

I sandkassen vil Digdir tilby ein slik brukarstadsertifikat-utsteder. 




### Teknisk skildring

Teknisk er tilliten mellom aktørane i lommebok-økosystemet primært basert på PKI, dvs. X.509-sertifikat som skal oppfylle visse eigenskapar og kvaliteter.  

Hovedaktørane må ha sine signeringssertifikat publisert på ei tillitsliste, 

![Tillitsmodell ihht. arkitektur-rammeverket (ARF)](lommebok_arf_trustmodel.png)

sjå [figuren øverst i ARF 3.1](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/#3-eudi-wallet-ecosystem) samt nærare skildring i [ARF kap 3.5](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/architecture-and-reference-framework-main/#35-trusted-list-provider).

Tillitslista er basert på [ETSI-standarden 319 612](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf) og er i praksis ei XML-fil som lister opp aktørane og deira signeringssertifikat:

* Tillitstjeneste-leverandør A (TrustServiceProvider)
  * Tillitstjeneste A.1 (TSPService)
    * Status (ServiceStatus)
    * Teneste-type (ServiceTypeIdentifier)
    * Meir info (AdditionalServiceInformation.URI)
  * Tillitsliste A.2 
  *etc...

For døme på ei ekte produksjons-tillistliste kan du sjå på [den norske tillistlista for tilbydarar av kvalifiserte tillitstenester](https://nkom.no/internett/elektronisk-id-og-tillitstjenester/tillitsliste-trusted-list#norges_tillitsliste).

I den endelege produksjonsøkosystemet hjå EU er det berre medlemslanda som har tilgang til og ansvaret for å publisere desse sertifikata på EU si tillitsliste. 


### Praksis

Ta kontakt med Digdir for å få eit brukarstad-sertifikat.  

Bruk gjerne innsynstjenesten for å studere kven so er aktørar i sandkassen.




Digdir 




 Dersom sertifikatet ikkje er lagt inn i tillitslista, skal forsøkt på samhandling verte avvist.  til utstedere, lommebok-leverandørar eller brukarstads-registrarer. 




