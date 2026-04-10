---
title: Last ned
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_download_ip
---

Last ned Integrasjonspunktet som .jar-fil eller Docker image. Last ned KOSMOS som .jar-fil. **OBS docker image finner man nå på Github CR og ikkje på Docker Hub.**

## Integrasjonspunktet

[**Integrasjonspunkt 4.0.2 (JAR)**](https://github.com/felleslosninger/efm-integrasjonspunkt/packages/2709133?version=v4.0.2)
<br>
Lenke til alle [versjonar](https://github.com/felleslosninger/efm-integrasjonspunkt/packages/2709133/versions)

[**Integrasjonspunktet 4.0.2 (Docker container image)**](https://github.com/felleslosninger/efm-integrasjonspunkt/pkgs/container/efm-integrasjonspunkt/788822458?tag=v4.0.2)
<br>
Lenke til alle [versjonar](https://github.com/felleslosninger/efm-integrasjonspunkt/pkgs/container/efm-integrasjonspunkt/versions?filters%5Bversion_type%5D=tagged)

```console
$ docker pull ghcr.io/felleslosninger/efm-integrasjonspunkt:4.0.
```

Endringslogg finner du [her.](../Oppgradering/endringslogg)

## KOSMOS

KOSMOS kan bare oppgradere Integrasjonspunktet innenfor samme versjons-serie.  Skal du oppgrader
fra Integrasjonspunkt v2/v3 til nyeste v4 må du først oppgradere Integrasjonspunktet manuelt.

Når du har oppgradert Integrassjonpunktet og verifisert at det fungerer, kan du velge å
installere KOSMOS for samme versjon som Integrasjonspunktet.  Den vil da automatisk
laste ned og oppgradere når det kommer patcher.

![](/images/dpi/underarbeide.png)

Gammel versjon av Kosmos v2 (tilpasset Integrasjonspunkt v2) kan lastes ned nedenfor,
men den kan *ikke* oppgradere Integrasjonspunkt til v3 eller v4 automatisk.
> [**KOSMOS 2.0.0 (JAR)**](https://github.com/felleslosninger/efm-kosmos/packages/2676735)

## eFormidlings offentlige kodesigneringsnøkkel

> [**Last ned offentlig nøkkel**](/resources/eformidling/public_keys/eformidling-key.asc)

{% include tip.html content="Hvis du allerede har lastet ned offentlig nøkkel (før 16. februar 2026) så må du laste ned ny nøkkel på linken over.  Den gamle utløper i april 2026." %}

## Neste steg

Første gang du installerer integrasjonspunktet? Her finner du informasjon om hvordan installere eller oppgradere eksisterende integrasjonspunkt.

- [Kom i gang med integrasjonspunktet](../installasjon/)
- [Installasjon](../installasjon/installasjon)
- [Oppgradering](../Oppgradering/)
