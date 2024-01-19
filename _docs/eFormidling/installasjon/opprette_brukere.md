---
title: Opprette brukere til eFormidling
description: ""
summary: ""

product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_create_users
---

Enkelte av meldingstjenestene som brukes av eFormidling krever at virksomheten selv oppretter en bruker med brukernavn
og passord.

1. TOC
{:toc}

## Opprette bruker for Altinn Formidling (kreves av eFormidlings meldingstjeneste)

(Gjelder bare for digital post til offentlige virksomheter)
Integrasjonspunktet kjører som datasystem mot Altinn's meldingsformidler. Integrasjonspunktet må registreres som et datasystem Altinn's portal. Informasjon om hvordan dette gjøres finnes [her](https://www.altinn.no/hjelp/profil/avanserte-innstillinger/). En person som representerer virksomheten må logge inn på Altinn for å gjøre dette.

Når du oppretter datasystemet er det viktig at det gjøres av person som kan representere virksomheten. Hvordan man representerer virksomheten kan du lese [her](https://info.altinn.no/hjelp/innlogging/diverse-om-innlogging/hvordan-kan-jeg-logge-inn-som-en-bedrift-eller-et-selskap/).

Under opprettelse av datasystem velger du passord og får tildelt brukerid (ID), disse skal senere brukes i properties filen som beskrives lenger nede. Dette er propertyene ```difi.move.dpo.username=``` og ```difi.move.dpo.password=```.

### Eksempel

> Du kan gi datasystemet akkurat det navnet du ønsker. Vi har valgt å kalle den "move". Kall den gjerne eformidling_dittOrganisasjonsnummer eller annet valgfritt navn.

> I nedtrekksmenyen velger du "Formidling"

> Id'en du får er brukernavnet som skal inn i integrasjonspunkt-local.properties. Passordet du velger skal også inn i denne filen. Dette gjelder DPO. 

Registrere datasystem:

![]({{site.baseurl}}/images/eformidling/altinnDatasystemRegistrer.PNG)

Datasystem registrert:

![]({{site.baseurl}}/images/eformidling/altinnDatasystemRegistrert.PNG)

Informasjon om hvordan du logger på Altinn portal finner du <a href="https://www.altinn.no/hjelp/innlogging/">https://www.altinn.no/hjelp/innlogging/</a>.

## Opprette brukere for KS SvarUt og SvarInn

Når beskrivelsen under er utført må brukernavn/passord for både SvarUt og SvarInn legges inn i integrasjonspunkt-local.properties. I tillegg til alt som er beskrevet i [tabellen her under "Spesifikk for Digital post til kommuner (DPF)"](https://docs.digdir.no/docs/eFormidling/installasjon/installasjon#konfigurere-ks-svarut-og-svarinn-dpf).

Se [Samarbeidsportalen](http://samarbeid.digdir.no/eformidling/eformidling/20) for alt om avtaler, begrunnelser, sammenhenger og lignende ikke teknisk. Avtaler må være på plass før en begynner å konfigurere. 

### Konfigurering av KS SvarUt-forvaltning (avsender)

Forvaltningsgrensesnittet som administrator får tilgang til (informeres om av KS) er laget for kommuner og andre som tar i bruk alle funksjonene i SvarUt og SvarInn.  

KS vil sende påloggingsadresse til administrator etter at virksomheten er opprettet som bruker.
 
> Alt av oppsett og skjermbilder under er eksempler. Det gjelder tilsvarende for din virksomhet – bare med deres eget navn og organisasjonsnummer. Det er bare opplysninger som nevnes heretter må utfylles i konfigureringen. 

- Gå til [Fiks forvaltning](https://forvaltning.fiks.ks.no) og logg inn.

Klikk på «Konfigurasjon» og deretter velger du din organisasjon.

![bilde1]({{site.baseurl}}/images/eformidling/FIKS_konfig.png)
 
- Klikk så på «Fiks SvarUt».

![bilde2]({{site.baseurl}}/images/eformidling/FIKS_tjenester.png)

- Du finner navnet på kontoen din under. Trykk på den.

![bilde3]({{site.baseurl}}/images/eformidling/FIKS_konto.png)

- Disse punktene må en fylle ut:

#### ReturAdresse/forside

Legg inn organisasjonsnummer og adresse. Forsidetekst må ikke fylles ut. 

#### Altinn

Velg «ingen varsling» 

#### Print

Velg «manuell print» 

#### Brukernavn og servicepassord

Under «Autentisering for SOAP/REST-service» finn du brukernavnet ditt og genererer passord.
==Viktig at en noterer seg begge disse==!
 
![bilde4]({{site.baseurl}}/images/eformidling/FIKS_brukernavn.png)
 
Resten av innstilligene kan en se bort fra.

### Konfigurering av SvarInn (mottakersystem)

Gå til [svarut.ks.no](https://svarut.ks.no) og logg inn. Klikk på «mottakersystem» i menyen på toppen og så på organisasjonen din i menyen på venstre side

 
![bilde8]({{site.baseurl}}/images/eformidling/08_FIKS.png) 

#### Service

Her finner du brukernavn for SvarInn og kan generere passord. Dette er passord nr. 2 dere må notere dere. Pass på at du ikke endrer dette senere ved å klikke på «generer» på nytt!  

Offentlig nøkkel / virksomhetssertifikat:

Her må en også laste opp den offentlige-nøkkelen til et virksomhetssertifikatet, det kan godt være den samme som integrasjonspunktet bruker.
 
![bilde9]({{site.baseurl}}/images/eformidling/09_FIKS2.PNG)
 
#### Administrasjon

Dette feltet skal være utfylt på forhånd. Sjekk at e-postadressene er lagt inn rett. De brukes til varsel om driftsproblemer eller hvis KS vil varsle dere om noe de fanger opp som avvik. 

![bilde10]({{site.baseurl}}/images/eformidling/10_FIKS.png)
  
#### Tilganger

Også her kan det legges til andre brukere.

#### Organisasjoner

Her legger du inn organisasjonsnummer til virksomheten og eventuelle underenheter. Dette sørger for at elektronisk SvarUt-post sendt til organisasjonsnummer til en underenhet også blir importert til sak/arkiv systemet. Hvis man ikke gjør dette vil slik post fortsette å komme til Altinn. Oversikt over underenhetene og organisasjonsnumre finner du i Altinn.

> Per i dag støtter ikke eFormidling forsendelser fra underenheter, kun til orgnummeret som er registrert i integrasjonspunktet. Så forsendelser til Svarinn på underorgnummer må hentes manuelt i Svarinn. Funksjonalitet for dette vil komme. Etter planen vil dette være første kvartal 2019.

Man må vente med å legge inn organisasjonsnumrene til konfigurasjon av integrasjonspunktet er utført, fordi SvarUt vil prøve å sende til integrasjonen når numrene er lagt inn. De kan bare legges inn av administrator som har gyldig post/arkiv-rolle for alle organisasjonsnumrene.  
 
![bilde11]({{site.baseurl}}/images/eformidling/11_FIKS.png)

#### Sjekke om DPF passord er riktig

Naviger til [KS forsendelseservice](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV6). Her blir du bedt om brukernavn og passord. Tast inn brukernavn og det passordet dere mener å ha fått. Dersom det resulterer i at servicen igjen ber om brukernavn og passord, er passordet galt. Om dere har oppgitt riktig brukernavn og passord får dere en respons som kan variere litt fra nettleser til nettleser.

## Opprette bruker for Altinn Digital Post

Dette gjøres av Altinn etter at Digitaliseringsdirektoratet sender bestilling. For at Digitaliseringsdirektoratet skal sende bestillingen må kunden fylle ut et informasjonsskjema. Passord mottas på SMS.

[Informasjonsskjema](https://forms.office.com/Pages/ResponsePage.aspx?id=D1aOAK8I7EygVrNUR1A5ka_Oknk2ND5DhEKnqlTuZMlUMjhUWVMxWk1OUkw0SDZXME9NVk8zOUEwNS4u)

[Mer info](http://samarbeid.digdir.no/eformidling/ta-i-bruk-eformidling/98)
