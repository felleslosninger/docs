---
title: Ta i bruk som brukerstad
description: Ta i bruk som brukarstad

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_taibruk_brukarstad
---

Ein [brukarstad](https://samarbeid.digdir.no/digital-lommebok/brukersteder-og-lommeboker/2900) er ei teneste som mottek innloggingar eller bevis frå den digitale lommeboka.

Den vanlegaste typen brukerstader er web-baserte nett-tjenester for innlogging slik me kjenner dei idag, til dømes Helsenorge eller nettbanken din.  Men lommeboka kan også brukast mot fysiske brukarstader, som til dømes ein automat i ein butikk eller som adgangskontroll til ein bygning.


## Brukerreiser

Brukarstader vil samhandle med lommeboka for å realisere brukerreiser som:

* [Autentisering / innlogging med elektronisk ID](https://samarbeid.digdir.no/digital-lommebok/autentisering-og-signering/2910)  ( [Teknisk dokumentasjon](lommebok_bruksomrade_innlogging) )

* Verifisere alder ( [Teknisk dokumentasjon](lommebok_bruksomrade_aldersverifisering) )

* [Motta digitale bevis](https://samarbeid.digdir.no/digital-lommebok/produsere-og-dele-bevis/2912)



## Korleis bli ein brukarstad ?

Sjå [oppskrifta på Samarbeidsportalen](https://samarbeid.digdir.no/digital-lommebok/ta-i-bruk-eidas-sandkassen/3280).

Oppsummert frå eit utviklar-perspektiv er det følgjande steg som må gjerast:

#### 1. Registrering

[Registere brukarstaden](lommebok_taibruk_registrering_brukarstad) din i registeret over brukarstader  (RP-registeret).

Som del av registrering må du lage eit access-sertifkat knytta til brukarstaden, som applikasjonen din nyttar for å autentisere seg mot lommeboka.

#### 2. Beslutte deploymentmodell

Det vil vere store variasjonar mellom ulike verksemder for korleis dei best integrerer mot lommeboka.  Her er nokre alternativ:

1. Implementere støtte direkte i eigen applikasjon.
2. Bruke ein lommebok-mellomvare foran eigne fagsystemer.  Her forventer me at over tid vil API-gateways og IAM-produkter kome med lommebokstøtte. Per no er nok det enklaste å nytte ein standalone mellomvar, sjå t.d. [EUDIPLO](lommebok_eudiplo)
3. Bruke mellomvare som skyteneste.
4. Få hjelp av ein leverandør. 

#### 3. Finne ut kva data du treng

Du kan sjå i [beviskatalogen](https://innsyn.test.eidas2sandkasse.net/) for å finne kva typar bevis som allereie er tilbode i sandkassen.  For utprøving er det nyttig å mock'e data med [Bevisgenerator](lommebok_digdir_utsteder_bevisgenerator.md).

#### 4. Lage spørringar

Integrasjonen mot lommeboka skjer over [OpenID4VP-protokollen](lommebok_protokoll_vp). Sjølv om du brukar mellomvare kan det vere nyttig å ha litt basiskjennskap til denne.

Du må uansett ha ei basis forståing av spørjespråket DQCL (Digital Credentials Query Languague) for å klare å be om dei rette dataene.  Sjå døma på bruksområde (t.d. [innlogging](lommebok_bruksomrade_innlogging) ) eller protokoll-dokumentasjon.

