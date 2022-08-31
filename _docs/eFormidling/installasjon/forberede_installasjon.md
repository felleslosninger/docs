---
title: Forberede installasjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from:
- /eformidling_forutsetninger
- /eformidling_virksomhetssertifikat
---

Før en kan installere eFormidlings integrasjonspunkt trengs noen forberedelser.

1. TOC
{:toc}

## Bestille tilganger

Før en kan ta i bruk eFormidling må en bestille nødvendige tilganger til eFormidling og de meldingstjenestene som ønskes
brukt.

Merk at dersom en ønsker å ta i bruk eFormidling i testmiljø så må det bestilles egne test-tilganger:

- [Testing](../Testing/)

Se Samarbeidsportalen for hva som skal til for å få nødvendige tilganger til eFormidling og meldingstjenestene som
brukes av eFormidling:

- [Ta i bruk eFormidling](https://samarbeid.digdir.no/eformidling/ta-i-bruk-eformidling/98) (ekstern lenke)

Enkelte av meldingstjenestene krever at virksomheten oppretter en bruker med brukernavn og passord:

- [Opprette bruker for Altinn Formidling](opprette_brukere#opprette-bruker-for-altinn-formidling-kreves-av-eformidlings-meldingstjeneste) (nødvendig for å bruke eFormidlings meldingstjeneste)
- [Opprette bruker for KS SvarUt og SvarInn](opprette_brukere#opprette-brukere-for-ks-svarut-og-svarinn)
- [Opprette bruker for Altinn Digital Post](opprette_brukere#opprette-bruker-for-altinn-digital-post)

Ta kontakt med vår servicedesk ved behov:

- <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

## Bestille virksomhetssertifikat

Før en virksomhet kan ta i bruk eFormidling må den ha fått utstedt et virksomhetssertifikat.

eFormidling krever virksomhetssertifikat for å autentisere virksomhetene som bruker tjenesten på en sikker måte. I
tillegg brukes virksomhetssertifikatet til:

- ende-til-ende kryptering av meldinger mellom virksomhetene i de tilfeller den underliggende meldingstjenesten støtter
  dette
- signering av utgående meldinger i de tilfeller den underliggende meldingstjenesten støtter dette
- autentisering av virksomheten mot enkelte tredjepartstjenester

En virksomhet på eFormidling kommuniserer i utgangspunktet som organisasjonen virksomhetssertifikatet er utstedt til,
men det er også mulig for en organisasjon å opptre på vegne av andre organisasjoner.

eFormidling støtter virksomhetssertifikat av typene SEID v1 og v2, men ikke eSegl. SSL-sertifikater (inkludert
wildcard-sertifikater) er ikke virksomhetssertifikater.

Merk at dersom en ønsker å ta i bruk eFormidlings testmiljø så må den få utstedt et eget test-virksomhetssertifikat.

En kan enten bruke et allerede utstedt virksomhetssertifikat eller bestille et nytt:

- [Bestill virksomhetssertifikat fra Buypass](https://www.buypass.no/hjelp/virksomhetssertifikat) (ekstern lenke)
- [Bestill virksomhetssertifikat fra Commfides](https://www.commfides.com/commfides-virksomhetssertifikat/) (ekstern lenke)

## Tilgjengeliggjøre virksomhetssertifikatet i eFormidlings sertifikatkatalog

For å gjøre det mulig for avsender å sende ende-til-ende-krypterte meldinger til mottaker må den offentlige delen av
mottakers virksomhetssertifikat først gjøres tilgjengelig i eFormidlings sertifikatkatalog.

Leverandørene sender vanligvis virksomhetssertifikatet med den tilhørende private nøkkelen i én enkelt fil med etternavn
`P12` (`PKCS #12`) eller `JKS` (`Java KeyStore`) - denne filen må ikke deles med Digitaliseringsdirektoratet
eller andre.

Dersom leverandøren har sendt flere filer er det den merket som **autentiseringssertifikatet** som skal brukes.

Den offentlige delen av virksomhetssertifikatet kan hentes fra `P12`- eller `JKS`-filen, og har vanligvis etternavn
`CER`, `CRT` eller `PEM`.

- [Hvordan henter jeg den offentlige delen av virksomhetssertifikatet fra en keystore (`JKS` eller `P12`)?](../Selvhjelp/sporsmal_og_svar#hvordan-henter-jeg-den-offentlige-delen-av-virksomhetssertifikatet-fra-en-keystore-jks-eller-p12)

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

## Velg hvordan integrasjonspunktet skal kjøres

eFormidlings integrasjonspunkt kan kjøres ved hjelp av Docker eller ved hjelp av Java direkte.

Docker anbefales dersom en allerede bruker Docker eller Kubernetes i sitt driftsmiljø.

Java anbefales dersom en har et tradisjonelt server-basert driftsmiljø.

- [Hvordan installerer jeg Java-versjonen integrasjonspunktet krever?](../Selvhjelp/sporsmal_og_svar#hvordan-installerer-jeg-java-versjonen-integrasjonspunktet-krever)

Dersom eInnsyn-klienten skal brukes sammen med integrasjonspunktet anbefales det at disse installeres på samme server.

## Sett av nødvendige ressurser for integrasjonspunktet

Følgende ressurser kreves av integrasjonspunktet:

- 1 CPU
- 2GB minne
- minst 2 GB tilgjengelig disk (dekker ~ 1 million meldinger)
- ekstra ressurser kreves ved eventuell bruk av ekstern database
- ekstra ressurser kreves ved eventuell bruk av ekstern meldingskø
- ekstra ressurser kan kreves ved høy-volum bruk

## Konfigurer brannmur dersom nødvendig

Integrasjonspunktet er designet for å kjøre i et lukket miljø som bare gir autoriserte system og brukere tilgang til
grensesnittene som tilbys av integrasjonspunktet.

Dersom integrasjonspunktet skal kjøres i et driftsmiljø der utgående trafikk blir filtrert av en brannmur er det nødvendig
å konfigurere denne for å tillate utgående trafikk fra eFormidlings integrasjonspunkt til tjenestene integrasjonspunktet
bruker.

Se beskrivelser inkludert IP-adresser for tjenestene integrasjonspunktet bruker:

- [eFormidling Produksjon](../Miljo/produksjon)
- [eFormidling QA](../Miljo/qa)

En må også tillate inngående trafikk til integrasjonspunktet fra tjenesten(e) som skal benytte integrasjonspunktet.
Integrasjonspunktets grensesnitt er som standard tilgjengelig på port `9093`, men kan settes til noe annet dersom
ønskelig.

## Konfigurer tidssynkronisering dersom det mangler

eFormidling bruker tidsbegrensede JSON web tokens (JWT) for å autentisere virksomhetene. En for gammel autentisering vil
avvises. For å unngå at autentisering avvises på grunn av forskjeller mellom eFormidlings klokke og klokken i
kjøremiljøet for virksomhetens integrasjonspunkt er det viktig at klokken synkroniseres ved hjelp av network time
protocol (NTP). Det er også viktig at klokken er justert korrekt for tidssone og sommertid (CET / CEST i Norge).
Tjenesteleverandør velger selv tidskilde, denne bør være lokalisert internt i datasenteret.

- Du kan sjekke din klokke på [https://time.is/](https://time.is/) (ekstern lenke)
- Les om [Network Time Protocol](https://no.wikipedia.org/wiki/Network_Time_Protocol) (ekstern lenke)

## Neste steg

- [Installasjon](installasjon)
