---
title: På vegne av
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

En leverandør kan benytte ett integrasjonspunkt til å opptre på vegne av en eller flere virksomheter.

Et slikt oppsett krever at:

- Integrasjonspunktet konfigureres med leverandørens virksomhetssertifikat og organisasjonsnummer
- Leverandøren får nødvendige tilganger fra eFormidling
- Leverandøren får delegert tilganger fra virksomhetene leverandøren skal opptre på vegne av
- Integrasjonspunktets grensesnitt [eFormidling 2](integrasjonspunkt_eformidling2_api) brukes
- Ved sending av en melding må det angis hvilke av virksomhetene som er avsender
- Ved mottak av en meldingsstatus må den knyttes til rett melding hos rett avsender
- Ved mottak av en melding må den knyttes til rett melding hos rett avsender

For en beskrivelse av hvordan avsender angis, se `sender.identifier.value` under:
- [Standard Business Document Header (SBDH)](Dokumenttyper/standard_sbd#standard-business-document-header)

Hvordan en konfigurere på-vegne-av avhenger av den aktuelle meldingstjenesten.

## På vegne av for Altinn Digital Post

Ved bruk av Altinn Digital Post har alle autoriserte avsendere lov å sende på vegne av andre. Altinn Digital Post
støtter derfor på vegne av uten noen som helst konfigurasjon eller delegering av tilganger.

## På vegne av for Digital Post til Innbyggere

Ved bruk av Digital Post til Innbyggere benyttes autorisasjonsbevis fra Maskinporten til å autorisere avsender. Disse
autorisasjonsbevisene kan Maskinporten utstede til en leverandør på vegne av en kunde. Dette forutsetter at:

- Digdir har tildelt leverandøren tilgang til å sende Digital Post til Innbyggere
- Digdir har tildelt kunden tilgang til å sende Digital Post til Innbyggere
- Kunden har delegert sin tilgang til å sende Digital Post til Innbyggere til leverandøren
- Leverandøren har gitt Digdir beskjed om delegeringsforholdet mellom leverandøren og kunden

Oppsettet krever ingen ekstra konfigurasjon av integrasjonspunktet. 

TODO navn og beskrivelse på tilgangen i Altinn.

## På vegne av for KS SvarUt og SvarInn

KS SvarUt og SvarInn har ikke innebygd støtte for at en leverandør kan opptre på vegne av en kunde. En slik delegering
løses i praksis ved at kunden gir sitt brukernavn og passord til KS SvarUt og SvarInn til leverandøren. Dette støttes av
integrasjonspunktet ved at en kan konfigurere mange brukernavn og passord for KS SvarUt og SvarInn.

TODO lenke til konfigurasjon

## På vegne av for eFormidlings meldingstjeneste

eFormidlings meldingstjeneste er realisert med Altinn Formidling. Kunden kan delegere sin tilgang til eFormidlings
meldingstjeneste til leverandøren.

Oppsettet krever ingen ekstra konfigurasjon av integrasjonspunktet.

TODO navn og beskrivelse på tilgangen i Altinn.

## På vegne av for eInnsyns meldingstjeneste

Ved bruk av eInnsyns meldingstjeneste må leverandøren være avsender ved sending på vegne av kunde.

> Dette er i motsetning til de andre meldingstjenestenes støtte for på vegne av

Ved bruk av eInnsyn spesifiseres kunden i på-vegne-av forholdet i forretningsmeldingen for publiseringen. Se:

- [Publisering](Dokumenttyper/publisering#forretningsmeldingen)

Leverandøren må gi Digdir beskjed om delegeringsforholdet mellom leverandøren og kunden.

Oppsettet krever ingen ekstra konfigurasjon av integrasjonspunktet.

## På vegne av for KS FIKS IO

KS FIKS IO adresserer på systemnivå slik at på vegne av ikke er relevant.
