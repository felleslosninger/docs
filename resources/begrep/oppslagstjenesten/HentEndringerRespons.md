---
title: HentEndringerRespons

sidebar: begrep_sidebar
redirect_from: /ot_hentendringerrespons
---
| --- | --- |
| Term          | {{page.title}} |
| Definisjon    | Response sendt fra Oppslagstjensten for å levere ut endringer fra kontakt og reservasjonsregisteret til Virksomhet |
| Datatype      | {{ page.datatype }} |
| Kilde         | DIFI |
| Kommentar     | Webservice respons som Oppslagstjenesten sender til Klient, respons beskriver de endringer som har vært i registeret. Responsen er begrenset til å returnere 1000 personer. Se integrasjonsguiden for Oppslagstjenesten for tekniske detaljer om forespørselen og hvordan denne sendes. |

#### Attributer

| Term                                                   | Kardinalitet |
| ------------------------------------------------------ | ------------ |
| [fraEndringsNummer]({{site.baseurl}}/resources/begrep/felles/fraEndringsNummer)         | 1..1         |
| [tilEndringsNummer]({{site.baseurl}}/resources/begrep/felles/tilEndringsNummer)         | 1..1         |
| [senesteEndringsNummer]({{site.baseurl}}/resources/begrep/felles/senesteEndringsNummer) | 1..1         |
| [Person]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Person)                    | 0..1000      |

  - Dersom [tilEndringsNummer]({{site.baseurl}}/resources/begrep/felles/tilEndringsNummer) og
    [senesteEndringsNummer]({{site.baseurl}}/resources/begrep/felles/senesteEndringsNummer) er lik finnes
    det ikke fler endringer i registeret som ikke er utlevert.
  - Dersom [tilEndringsNummer]({{site.baseurl}}/resources/begrep/felles/tilEndringsNummer) er ulik fra
    [senesteEndringsNummer]({{site.baseurl}}/resources/begrep/felles/senesteEndringsNummer) så bør
    Offentlig Virksomhet sende ny
    [HentEndringerForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentEndringerForespoersel).

