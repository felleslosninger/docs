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

Her finner du alle [release notes og artifakter](https://github.com/felleslosninger/efm-integrasjonspunkt/releases), link til nyeste versjon [v4.2.3](https://github.com/felleslosninger/efm-integrasjonspunkt/releases/tag/v4.2.3).
<br><br>

[**Integrasjonspunkt 4.2.3 (JAR)**](https://github.com/felleslosninger/efm-integrasjonspunkt/packages/2709133?version=v4.2.3)
<br>
Lenke til alle [versjonar](https://github.com/felleslosninger/efm-integrasjonspunkt/packages/2709133/versions)

[**Integrasjonspunktet 4.2.3 (Docker container image)**](https://github.com/felleslosninger/efm-integrasjonspunkt/pkgs/container/efm-integrasjonspunkt/1529112480?tag=v4.2.3)
<br>
Lenke til alle [versjonar](https://github.com/felleslosninger/efm-integrasjonspunkt/pkgs/container/efm-integrasjonspunkt/versions?filters%5Bversion_type%5D=tagged)

```console
$ docker pull ghcr.io/felleslosninger/efm-integrasjonspunkt:v4.2.3
```

Endringslogg finner du [her.](../Oppgradering/endringslogg)

## KOSMOS

KOSMOS kan bare oppgradere Integrasjonspunktet innenfor samme versjons-serie.  Skal du oppgrader
fra Integrasjonspunkt v2/v3 til nyeste v4 må du først oppgradere Integrasjonspunktet manuelt.

Når du har oppgradert Integrasjonpunktet og verifisert at det fungerer, kan du velge å
installere KOSMOS for samme versjon som Integrasjonspunktet.  Kosmos vil da automatisk
laste ned og oppgradere når det kommer patcher.

Kosmos v4 (tilpasset Integrasjonspunkt v4) kan lastes ned fra :
> [**KOSMOS 4.0.0 (JAR)**](https://github.com/felleslosninger/efm-kosmos/releases)

Gammel versjon av Kosmos v2 (tilpasset Integrasjonspunkt v2) kan lastes ned fra :
> [**KOSMOS 2.0.0 (JAR)**](https://github.com/felleslosninger/efm-kosmos/packages/2676735?version=2.0.0)

### Verifisere signaturen til KOSMOS manuelt

Vi anbefaler å verifisere at KOSMOS-filen er signert av Digitaliseringsdirektoratet før du tar den i bruk.
Dette gjøres med [GnuPG](https://gnupg.org/).

1. Last ned `kosmos-vX.Y.Z.jar` og tilhørende signaturfil `kosmos-vX.Y.Z.jar.asc` fra [releases](https://github.com/felleslosninger/efm-kosmos/releases),
   og last ned [eFormidlings offentlige kodesigneringsnøkkel](#eformidlings-offentlige-kodesigneringsnøkkel).

2. Importer den offentlige nøkkelen i nøkkelringen din:

   ```console
   $ gpg --import eformidling-key.asc
   ```

3. Verifiser signaturen:

   ```console
   $ gpg --verify kosmos-vX.Y.Z.jar.asc kosmos-vX.Y.Z.jar
   ```

Resultatet skal inneholde `Good signature from "Kodesignering eFormidling ..."`, og `Primary key fingerprint` skal være
`AEF2 7AA6 948A 3856 932A  F98E CA56 4339 3753 ECE3`:

```console
gpg: Signature made Wed Nov  4 13:52:56 2026 CET
gpg:                using RSA key AEF27AA6948A3856932AF98ECA5643393753ECE3
gpg: Good signature from "Kodesignering eFormidling (Digitaliseringsdirektoratets nøkkel for kodesignering for eFormidling) <servicedesk@digdir.no>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: AEF2 7AA6 948A 3856 932A  F98E CA56 4339 3753 ECE3
```

Advarselen `This key is not certified with a trusted signature` er forventet og kan ignoreres, så lenge fingeravtrykket stemmer.

Står det `BAD signature`, må du ikke bruke filen.

## eFormidlings offentlige kodesigneringsnøkkel

> [**Last ned offentlig nøkkel**](/resources/eformidling/public_keys/eformidling-key.asc)

{% include tip.html content="Hvis du allerede har lastet ned offentlig nøkkel (før 20. april 2026) så må du laste ned ny nøkkel på linken over.  Den gamle utløp i april 2026." %}

## Neste steg

Første gang du installerer integrasjonspunktet? Her finner du informasjon om hvordan installere eller oppgradere eksisterende integrasjonspunkt.

- [Kom i gang med integrasjonspunktet](../installasjon/)
- [Installasjon](../installasjon/installasjon)
- [Oppgradering](../Oppgradering/)
