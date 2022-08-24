---
title: Eksempler
permalink: dpi_eksempler.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

På denne siden finner du eksempler på meldinger mellom de forskjellige aktørene i 4-hjørners-modellen

### Komplette eksempler på SBD med tilhørende dokumentpakke

Dokumentpakkene i eksemplene er kryptert til offentlig nøkkel for nøkkelparet [eksempel.jks](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/eksempel.jks)
med alias `eksempel` og passord `changeit`. Last gjerne ned nøkkelparet for å teste dekryptering av den krypterte
dokumentpakken. For enkelhets skyld inkluderer eksemplene også ferdig dekrypterte dokumentpakker.

Forretningsmeldingene i eksemplene er inkludert som JWT. For enkelhets skyld inkluderer eksemplene også ferdig dekodet
JSON payload for forretningsmeldingen og ferdig dekodet JSON payload for autorisasjonsbevis (`maskinportentoken`)
i forretningsmeldingen.

Utskrift fra Digdir `991825827` til Posten `984661185` for testbruker `04817197073`:

- [Kryptert dokumentpakke (CMS)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/utskrift-dokumentpakke.cms)
- [Dekryptert dokumentpakke (ASiC-E ZIP)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/utskrift-dokumentpakke.zip)
- [`utskrift` forretningsmelding (JWT)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/utskrift-forretningsmelding.jwt)
- [Payload (JSON) fra `utskrift` forretningsmelding](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/utskrift-forretningsmelding.json)
- [Payload (JSON) fra autorisasjonsbevis i `utskrift.maskinportentoken`](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/utskrift-forretningsmelding-autorisasjonsbevis.json)

Digital fra Digdir `991825827` til eBoks `922020175` for testbruker `07126700169`:

- [Kryptert dokumentpakke (CMS)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-dokumentpakke.cms)
- [Dekryptert dokumentpakke (ASiC-E ZIP)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-dokumentpakke.zip)
- [`digital` forretningsmelding (JWT)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-forretningsmelding.jwt)
- [Payload (JSON) fra `digital` forretningsmelding](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-forretningsmelding.json)
- [Payload (JSON) fra autorisasjonsbevis i `digital.maskinportentoken`](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-forretningsmelding-autorisasjonsbevis.json)

Digital fra Digdir `991825827` med avsenderidentifikator `991825827:avsenderid` til eBoks `922020175` for testbruker
`07126700169`:

- [Kryptert dokumentpakke (CMS)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-avsenderidentifikator-dokumentpakke.cms)
- [Dekryptert dokumentpakke (ASiC-E ZIP)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-avsenderidentifikator-dokumentpakke.zip)
- [`digital` forretningsmelding (JWT)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-avsenderidentifikator-forretningsmelding.jwt)
- [Payload (JSON) fra `digital` forretningsmelding](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-avsenderidentifikator-forretningsmelding.json)
- [Payload (JSON) fra autorisasjonsbevis i `digital.maskinportentoken`](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-avsenderidentifikator-forretningsmelding-autorisasjonsbevis.json)

Digital fra Svartisdal og Saltnes `810969342` på vegne av Dølemo og Ramberg `910076787` til Digipost `984661185` for
testbruker `06068700602`:

- [Kryptert dokumentpakke (CMS)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-pa-vegne-av-dokumentpakke.cms)
- [Dekryptert dokumentpakke (ASiC-E ZIP)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-pa-vegne-av-dokumentpakke.zip)
- [`digital` forretningsmelding (`JWT)](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-pa-vegne-av-forretningsmelding.jwt)
- [Payload (JSON) fra `digital` forretningsmelding](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-pa-vegne-av-forretningsmelding.json)
- [Payload (JSON) fra autorisasjonsbevis i `digital.maskinportentoken`](resources/begrep/sikkerDigitalPost/nyinf/eksempler/komplette/digital-pa-vegne-av-forretningsmelding-autorisasjonsbevis.json)


### Avsendende virksomhet til avsenders aksesspunkt
Eksempler på forretningsmelding fra avsender

- [Digital melding](resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_digital_1_0.json)
- [Utskrift melding](resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_utskrift_1_0.json)

### Kviteringer

-[Leveringskvittering](resources/begrep/sikkerDigitalPost/nyinf/eksempler/innbyggerpost_dpi_lerveringskvittering_1_0.json)

### Avsenders aksesspunkt til mottakers aksesspunkt (C2 -> C3)
- [Digitalpost melding C2 -> C3](resources/begrep/sikkerDigitalPost/nyinf/eksempler/digitalpost_c2_c3.xml)
