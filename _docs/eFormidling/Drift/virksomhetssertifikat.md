---
title: Virksomhetssertifikat
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Før en virksomhet kan ta i bruk eFormidling må den ha fått utstedt et virksomhetssertifikat.

Merk at dersom en ønsker å ta i bruk eFormidling i testmiljø så må den få utstedt et eget test-virksomhetssertifikat.

eFormidling støtter virksomhetssertifikat av typene SEID v1 og v2, men ikke eSegl. SSL-sertifikater (inkludert wildcard-
sertifikater) er ikke virksomhetssertifikater.

eFormidling krever virksomhetssertifikat for å autentisere virksomhetene som bruker tjenesten på en sikker måte. I
tillegg brukes virksomhetssertifikatet til:

- ende-til-ende kryptering av meldinger mellom virksomhetene i de tilfeller den underliggende meldingstjenesten støtter
  dette
- signering av utgående meldinger i de tilfeller den underliggende meldingstjenesten støtter dette
- autentisering av virksomheten mot enkelte tredjepartstjenester

En virksomhet på eFormidling kommuniserer som organisasjonen virksomhetssertifikatet er utstedt til. Det er mulig for en
organisasjon å opptre på vegne av andre organisasjoner.

TODO lenke

## Bestille virksomhetssertifikat

eFormidling støtter virksomhetssertifikat av typene SEID v1 og v2, men ikke eSegl.

En kan enten bruke et allerede utstedt virksomhetssertifikat eller bestille et nytt:

- [Bestill virksomhetssertifikat fra Buypass](https://www.buypass.no/hjelp/virksomhetssertifikat)
- [Bestill virksomhetssertifikat fra Commfides](https://www.commfides.com/commfides-virksomhetssertifikat/)

## Tilgjengeliggjøre virksomhetssertifikatet i eFormidlings sertifikatkatalog

For å gjøre det mulig for avsender å sende ende-til-ende-krypterte meldinger til mottaker må den offentlige delen av
mottakers virksomhetssertifikat først gjøres tilgjengelig i eFormidlings sertifikatkatalog.

Leverandørene sender vanligvis virksomhetssertifikatet med den tilhørende private nøkkelen i én enkelt fil med etternavn
`P12` (`PKCS #12`) eller `JKS` (`Java KeyStore`) - denne filen må ikke deles med andre.

Dersom leverandøren har sendt flere filer er det den merket som **autentiseringssertifikatet** som skal brukes.

Den offentlige delen av virksomhetssertifikatet kan hentes fra `P12`- eller `JKS`-filen, og har vanligvis etternavn
`CER`, `CRT` eller `PEM`.

- [Hvordan henter jeg den offentlige delen av virksomhetssertifikatet fra en keystore (`JKS` eller `P12`)?](../Feilsoking/sporsmal_og_svar#hvordan-henter-jeg-den-offentlige-delen-av-virksomhetssertifikatet-fra-en-keystore-jks-eller-p12)

For å gjøre den offentlige delen av virksomhetssertifikatet tilgjengelig i eFormidlings sertifikatkatalog må en sende
denne til vår servicedesk:

- <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

For å unngå plattformspesifikke problemer anbefales det å legge den offentlige delen av virksomhetssertifikatet i en
`ZIP`-fil før den sendes.

## Tilgjengeliggjøre virksomhetssertifikatet for virksomhetens integrasjonspunkt

For å gjøre det mulig for avsender å autentisere mot eFormidling og signere meldinger som sendes må
virksomhetssertifikatet med den tilhørende private nøkkelen gjøres tilgjengelig for virksomhetens integrasjonspunkt.

Ved installasjon av integrasjonspunktet trengs keystoren (`JKS` eller `P12`), `alias` (`entry name`) for
virksomhetssertifikatet og passord for keystoren.

For å unngå plattformspesifikke problemer anbefales det at `alias` for virksomhetssertifikatet bare inneholder engelske
bokstaver, tall, bindestrek og punktum (unngå `øæå` og annet).

Integrasjonspunktet krever at passord for keystoren (`storepasswd`) er identisk med passord for den private
nøkkelen (`keypasswd`) i kestoren.

## Neste steg

- [Forberede installasjon](forberede_installasjon)
