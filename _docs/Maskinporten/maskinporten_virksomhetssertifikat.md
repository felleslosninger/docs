---
title: Virksomhetssertifikat
description:
summary:

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_virksomhetssertifikat
---

Virksomhetssertifikat er en viktig del av Maskinporten. Her har vi samlet litt informasjon om virksomhetssertifikat.

* TOC
{:toc}

## Hva er et virksomhetssertifikat

Virksomhetssertifikat er virksomheten sin digitale ID. For våre tjenester må det være et gyldig norsk [x.509 sertifikat.](https://www.ssl.com/no/Vanlige-sp%C3%B8rsm%C3%A5l/hva-er-et-x-509-sertifikat/)

## Hva bruker man virksomhetssertifikatet til i Maskinporten?

Virksomhetssertifikatet brukes for å autentisere virksomheten som gjør et kall mot Maskinporten.

Sertifikatet brukes til å signere forespørselen mot Maskinporten. Maskinporten sjekker sertifikatets gyldighet opp mot sertifikatutstederene. (Buypass og Commfides).

Dette er nærmere beskrevet på [JWT grant](https://docs.digdir.no/maskinporten_protocol_jwtgrant.html) siden.

## Kan utenlandske virksomheter bestille virksomhetssertifikat?

Man må være registrert i det norske enhetsregisteret for å bestille virksomhetssertifikat.

## Hvem kan utstede virksomhetssertifikater?

Pr. i dag er det Buypass og Commfides som er godkjent av NKOM til usteding av virksomhetssertifikater.

Vi viser til [Norges tillitsliste](https://www.nkom.no/internett/elektronisk-id-og-tillitstjenester/tillitsliste-trusted-list) for oppdatert informasjon om hvem som kan utstede virksomhetssertifikater.

Lenke til utstedere:

Buypass: [[https://www.buypass.no/produkter/virksomhetssertifikat-esegl/bestill-testsertifikat-VID-Norge]([https://www.buypass.no/produkter/virksomhetssertifikat-esegl

Commfides: [https://www.commfides.com/commfides-virksomhetssertifikat/](https://www.commfides.com/commfides-virksomhetssertifikat/)

## Bruker man samme sertifikat til testing som i produksjon?

Nei, i testmiljøene må man ha et test-virksomhetssertifikat. Dette bestilles også fra Buypass og Commfides.

Buypass: [https://www.buypass.no/produkter/virksomhetssertifikat-esegl/bestill-testsertifikat-VID-Norge](https://www.buypass.no/produkter/virksomhetssertifikat-esegl/bestill-testsertifikat-VID-Norge)

Commfides: [https://www.commfides.com/commfides-virksomhetssertifikat/testsertifikat/](https://www.commfides.com/commfides-virksomhetssertifikat/)

## Kan man gjenbruke et virksomhetssertifikat på flere klienter i Maskinporten?

Ja, man kan bruke samme sertifikat på flere klienter i Maskinporten.

## Støtter Maskinporten de nye SEID 2.0 sertifikatene?

Ja, Maskinporten støtter SEID 2.0 sertifikater fra både Buypass og Commfides. 
