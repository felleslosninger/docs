---
title: HentPersonerRespons  

sidebar: begrep_sidebar
redirect_from: /ot_hentpersonerrespons
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Respons sendt tilbake til Virksomhet som svar på [HentPersonerForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPersonerForespoersel) |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice respons som Oppslagstjenesten sender til Klient, respons inneholder de Personer som Virksomhet forespurte med den registrerte informasjonen som Virksomhet ba om. Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om forespørselen og hvordan denne sendes. |

#### Attributer

| Term             | Kardinalitet |
| ---------------- | ------------ |
| [Person]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Person) | 1..1000      |

