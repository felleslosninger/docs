---
title: Autentisering
description:
summary:

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_autentisering
---

Her har vi samlet litt informasjon om autentisering i Maskinporten.


* TOC
{:toc}

## Autentiseringsmetoder i Maskinporten

Virksomheter kan autentisere seg i Maskinporten med virksomhetssertifikat eller assymetriske nøkler, som er virksomheten sin digitale ID.

## Hva er hensikten med virksomhetssertifikat/nøkler?

Virsomhetssertifikat/nøkler brukes til å signere forespørselen mot Maskinporten. Maskinporten sjekker deretter sertifikatets/nøkkelens gyldighet. Dette er nærmere beskrevet på [JWT grant](https://docs.digdir.no/maskinporten_protocol_jwtgrant.html) siden.

## Levetid og gyldighet for virksomhetssertifikat/nøkler?

En nøkkel har maks ett års levetid fra tidspunktet den blir postet på. Virksomhetssertifikat har tre års levetid.

Dersom man benytter virksomhetssertifikat for autentisering til våre tjenester må det være et gyldig norsk [x.509 sertifikat.](https://www.ssl.com/no/Vanlige-sp%C3%B8rsm%C3%A5l/hva-er-et-x-509-sertifikat/)

## Kan utenlandske virksomheter bestille virksomhetssertifikat?

Man må være registrert i det norske enhetsregisteret for å bestille virksomhetssertifikat.

## Hvem kan utstede virksomhetssertifikater?

Pr. i dag er det Buypass og Commfides som er godkjent av NKOM til usteding av virksomhetssertifikater.

Vi viser til [Norges tillitsliste](https://www.nkom.no/internett/elektronisk-id-og-tillitstjenester/tillitsliste-trusted-list) for oppdatert informasjon om hvem som kan utstede virksomhetssertifikater.

Lenke til utstedere:

Buypass: [https://www.buypass.no/produkter/virksomhetssertifikat-esegl](https://www.buypass.no/produkter/virksomhetssertifikat-esegl)

Commfides: [https://www.commfides.com/commfides-virksomhetssertifikat/](https://www.commfides.com/commfides-virksomhetssertifikat/)

## Hvordan opprettes assymetriske nøkler?

Det er ulik programvare for oppretting av assymetriske nøkler. Dette vil ikke bli omtalt i Digitaliseringsdirektoratet sin tekniske dokumentasjon.

## Bruker man samme sertifikat til testing som i produksjon?

Nei, i testmiljøene må man ha et test-virksomhetssertifikat. Dette bestilles også fra Buypass og Commfides.

Buypass: [https://www.buypass.no/produkter/virksomhetssertifikat-esegl](https://www.buypass.no/produkter/virksomhetssertifikat-esegl)

Commfides: [https://www.commfides.com/commfides-virksomhetssertifikat/testsertifikat/](https://www.commfides.com/commfides-virksomhetssertifikat/testsertifikat/)

## Kan man gjenbruke virksomhetssertifikat/nøkler på flere klienter i Maskinporten?

Ja, man kan bruke samme sertifikat/nøkkel på flere klienter i Maskinporten.

## Støtter Maskinporten de nye SEID 2.0 sertifikatene?

Ja, Maskinporten støtter SEID 2.0 sertifikater fra både Buypass og Commfides.

## Forvaltning av sertifikat/nøkler
Vi fraråder sterkt å dele klientregistreringer (med secrets/nøkler) på tvers av flere installasjoner. For leverandører og verksemder med mange integrasjonar, anbefaler videre å bruke asymmetriske nøkler istedet for virksomhetssertifkater. Av sikkerhetshensyn bør ikke leverandører forvalte kundene sine virksomhetssertifikat/nøkler.
