---
title: Testing og verifikasjon av installasjonen
description: Test og verifikasjon
summary: "Her finner du informasjon om hvordan verifisere overføring mellom sak/arkiv-systemet deres og eInnsyn etter installasjonen av integrasjonspunktet og einnsyn-klienten"

sidebar: einnsyn_sidebar
redirect_from: /einnsyn_test_verifikasjon
---


# Test og verifiser

Etter installasjon av integrasjonspunktet og eInnsyn-klienten er ferdig er dere klare til å teste overføring mellom sak/arkiv-systemet deres og eInnsyn. For å logge inn trenger dere brukenavn og passord til admin i eInnsyn. Dersom dere ikke har fått brukernavn og passord, ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>.

Første gang du logger inn til eInnsyn admin klikker du på «Glemt passord». Da kan du opprette et selvvalgt passord for adminbrukeren din i eInnsyn. Det kan ta noen minutter å motta e-posten for aktivering av brukerprofilen. Sjekk spamfilter i e-posten din dersom du ikke mottar e-posten innen 10 minutter. 


# Følgende funksjonalitet skal testes


## Overføre journalposter

Gjør et OEP-uttrekk til eInnsyn. I versjon 0 og 0+ er filkatalogen (inputDirectory) grensesnittet for arkivar. eInnsyn-klienten må kunne overvåke og skrive til denne katalogen. Samtidig må arkivar ha tilgang denne for å kunne laste opp filer. Dette forutsetter at filene ligger på en server som både arkivar har tilgang til, og som kommunisere med de andre komponentene.

Mappen er definert som filkatalog( InputDirectory)i  eInnsyn-klient.xml

EKS: 
```
<argument>-Dapplication.inputDirectory=C:\eInnsyndok</argument>
```


Du laster opp innhold til eInnsyn ved å kopiere ønsket dokumentet til denne katalogen.  eInnsynsklienten overvåker denne katalogen og laster automatisk opp dokumenter som ligger der til Integrasjonspunktet.


## Verifiser at journalpostene er overført til eInnsyn

Verifiser ved å søke i [eInnsyn](https://einnsyn.no/) 


## Søk i journalposter og søk i innsyn

Du kan ikke være innlogget i einnsyn.no som administrator når du ber om innsyn i en journalpost. Pass derfor på å logge ut som admin før du tester dette.
Søk frem journalpostene i [eInnsyn](https://einnsyn.no/) og søk innsyn. Send innsynskravet til egen virksomhet. Verifiser også at innsynskravet blir sendt til egen virksomhet. Send innsynskravene til egen virksomhet og ikke til andre virksomheter. 


## Test eInnsyn admin

1. Opprett en ny adminbruker for virksomheten
2. Oppdater informasjon for virksomheten (telefonnummer, e-postadresse etc.)
3. Slette en sak i eInnsyn
4. Skjule virksomheten og verifisere at virksomheten forsvinner fra søket
5. Opphev skjuling av virksomhet

Når punktene over er utført, sender dere en e-post til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> og verifiserer at eInnsyn fungerer tilfredsstillende i produksjon. Tilse også at bruksvilkår er akseptert og varslingspunkt er meldt inn til Digitaliseringsdirektoratet.


 
