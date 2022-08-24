---
title: Kanal
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

En virksomhet kan benytte samme meldingstjeneste fra flere integrasjonspunkt hos flere leverandører. En må da velge å
motta til ett av integrasjonspunktene mens alle kan sende. Som leverandør kan en legge til rette for dette ved:

- bruke kanal for utgående meldinger - ellers vil installasjonene "stjele" innkommende meldingsstatuser og kvitteringer 
  fra hverandre
- slå av innkommende meldinger - ellers vil installasjonene "stjele" innkommende meldinger fra hverandre

Dersom en tredjepartstjeneste bare har behov for å sende meldinger kan den med fordel benytte kanaler. En virksomhet kan
benytte flere tredjepartstjenester med kanaler, men bare en tredjepartstjeneste uten kanal der virksomheten kan både
sende og motta.

## Kanaler for Altinn Digital Post

Altinn Digital Post støtter bare utgående meldinger. Meldingsstatuser og kvitteringer hentes gitt meldingsidentifikator
slik at installasjonene ikke vil "stjele" innkommende meldingsstatuser og kvitteringer fra hverandre.

En trenger derfor ikke konfigurere kanaler for å kjøre flere integrasjonspunkt for  Altinn Digital Post for samme
virksomhet.

## Kanaler for Digital Post til Innbyggere

Digital Post til Innbyggere støtter bare utgående meldinger. Meldingsstatuser og kvitteringer hentes gitt et ønsket
antall.

For å unngå at installasjonene vil "stjele" innkommende meldingsstatuser og kvitteringer må en konfigurere kanal, se
`difi.move.dpi.mpcId` under:

- [Konfigurere Digital Post til Innbyggere](../installasjon/installasjon#konfigurere-digital-post-til-innbyggere-dpi)

## Kanaler for KS SvarUt og SvarInn

KS SvarUt støtter utgående meldinger og KS SvarInn støtter innkommende meldinger. Meldingsstatuser og kvitteringer
hentes gitt meldingsidentifikator slik at installasjonene ikke vil "stjele" innkommende meldingsstatuser og kvitteringer
fra hverandre.

For å unngå at installasjonene vil "stjele" innkommende meldinger må en slå av KS SvarInn for alle installasjoner
utenom den som skal motta innkommende meldinger. Se `difi.move.fiks.inn.enable` under:

- [Konfigurere KS SvarUt og SvarInn](../installasjon/installasjon#konfigurere-ks-svarut-og-svarinn-dpf)

## Kanaler for eFormidlings meldingstjeneste

eFormidlings meldingstjeneste støtter både utgående og innkommende meldinger. Meldinger, meldingsstatuser og
kvitteringer hentes gitt et ønsket antall.

For å unngå at installasjonene vil "stjele" innkommende meldinger, meldingsstatuser og kvitteringer må en konfigurere
kanal, se `difi.move.dpo.message-channel` under:

- [Konfigurere eFormidlings meldingstjeneste](../installasjon/installasjon#konfigurere-eformidlings-meldingstjeneste-dpo)

## Kanaler for eInnsyns meldingstjeneste

eInnsyns meldingstjeneste støtter ikke kanaler og én virksomhet kan derfor bare ha én installasjon som benytter eInnsyns
meldingstjeneste.

## Kanaler for KS FIKS IO

KS FIKS IO adresserer på systemnivå slik at kanal ikke er relevant.
