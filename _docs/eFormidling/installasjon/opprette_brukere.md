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

- Virksomheiten har allerede ein Maskinporten klient (oppretta av Digdir) som alltid er på formen MOVE_IP_orgnummer-til-din-virksomhet.
- Virksomheten må opprette eit system i Altinn. Systemet må ha tilgangspakken "informasjon-og-kommunikasjon".
- Systemnavn skal inn i properties filen til integrasjonspunktet.
- Virksomheten må opprette en systembruker på systemet, med tilgang til tilgangspakken "informasjon-og-kommunikasjon".
- Virksomheiten må godkjenne opprettelsen av systembruker i Altinn
- Systembruker informasjonen skal inn i properties filen til integrasjonspunktet.

Dersom man skal sende og motta på vegne av andre virksomheter må man gjøre følgende :
- Opprett en systembruker for virksomheten på systemet, med tilgang til tilgangspakken "informasjon-og-kommunikasjon".
- Virksomheten må selv godkjenne opprettelsen av systembruker i Altinn.
- Systembruker informasjonen skal inn i properties filen til integrasjonspunktet.

## Onboarding sjekkliste
Opprettelse av system og systembruker(e) er litt omfattende (se sekvensdiagram nedenfor),
men det er bygget inn en onboarding sjekkliste i IPv4 som kan hjelpe med dette.

Det krever at maskinportenklienten har fått tildelt rette scopes (gjerast av Digdir),
deretter kan du konfigurere ønsket systemnavn og systembruker i properties filen, aktivere
DPO og starte opp integrasjonspunktet.

Ved å gå til adressen http://127.0.0.1:9093/ kan du finne en fane for DPO med link
til onboarding sjekklisten. som vist i figuren under.

![]({{site.baseurl}}/images/eformidling/dpo/onboarding.png)


## Sekvensdiagram for opprettelse av system og systembruker :

<div class="mermaid">
sequenceDiagram
    actor K as Kunde
    actor D as Digdir
    participant S as Samarbeidsportalen
    participant M as Maskinporten
    participant AS as Altinn SystemRegister
    participant A as Altinn

    D->>S: Opprett maskinporten client
    note over S : Tildeler scopes for : altinn:broker.write, altinn:broker.read

    D->>S: Tildeler scopes (de som ikke er åpne for kunde) 
    note over S : Tildeler scopes for: <br> altinn:authentication/systemregister.write<br> altinn:authentication/systemuser.request.write<br> altinn:authentication/systemuser.request.read
    K->>M: Hent token for client
    note over M : scopes : [altinn:authentication/systemregister.write]
    K->>AS : Opprett system (/systemregister/vendor)
    note over AS: systemId = &lt;orgno&gt;_integrasjonspunkt
    K->>AS : Registrer tilgangspakke på system (/systemregister/vendor/{id}/accesspackages)
    note over AS: tilgangspakke = urn:altinn:accesspackage:informasjon-og-kommunikasjon
    K->>M: Hent token for client
    note over M : scopes : [systemuser.request.write,<br>systemuser.request.read]

    K->>AS: Opprett "standard" systemuser forespørsel (/systemuser/request/vendor)
    note over AS : externalRef = &lt;systemId&gt;_systembruker_&lt;name&gt;
    note over AS : tilgangspakke = urn:altinn:accesspackage:informasjon-og-kommunikasjon
    AS-->>K: Retur av URL for å godkjenne opprettelse av systembruker på vegne av virksomheten
    note over K : URL kan presenteres kunde for rask godkjenning,&lt;br&gt;varsel blir sendt til daglig leder i Altinn
    
    K->>A: Bruk url eller logg inn i Altinn for bekrefte opprettelse av systemuser
</div>

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
