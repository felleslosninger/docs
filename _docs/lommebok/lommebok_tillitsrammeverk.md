---
title: Tillitsrammeverk
description: Tillitsrammeverk

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_tillitsrammeverk
---

Her vil det kome informasjon om tillistrammeverket i sandkassen.



<table><tr><td><div class="mermaid">

graph

subgraph AK [Tillitsrammeverk frå Digdir]
  TLI[(Register over utstedere)]
  TLW[(Register over lommbøker)]
  TLRP[(Register over brukerstads-registrarer)]
  DRPR[(Digdir brukerstad-register)]
end

  RPR[(Andre brukerstad-registre)]

TLRP --> DRPR
TLRP --> RPR
</div></td></tr>
<tr><td>
 <em>Tillitsrammeverket i sandskassen</em>
 </td>
</tr>
</table>

For brukerstader so ser me at tillitslista er to-delt:  den sentrale tillistlista peikar berre på ein PKI tilhøyrande godkjente **bregistrarer**. Eit brukarstad må ta kontakt med ein registrar for å skaffe eit brukarstadssertifikat (Relying Party Access Certificate).

Teknisk er tilliten mellom aktørane i lommebok-økosystemet primært basert på X.509-sertifikat som skal oppfylle visse eigenskapar og kvaliteter.  Tillitslistene ovanfor er i prakis berre enkle oppslagstenester som lister opp signeringssertifikatet som vert nytta av den godkjente aktøren.  Dersom sertifikatet ikkje er lagt inn i tillitslista, skal forsøkt på samhandling verte avvist.  I sandkassen vil det vere Digdir som, basert på tilstendt ei CSR-fil, deler ut desse sertifikata til utstedere, lommebok-leverandørar eller brukarstads-registrarer. 

 I den endelege produksjonsøkosystemet hjå EU er det berre medlemslanda som har tilgang til og ansvaret for å publisere desse sertifikata på EU si tillitsliste. 

