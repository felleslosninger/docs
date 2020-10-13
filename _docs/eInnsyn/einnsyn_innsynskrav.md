---
title: Innsynskrav og e-postoppsett
description: Innsynskrav og e-postoppsett
summary: ""
permalink: einnsyn_innsynskrav.html
sidebar: einnsyn_sidebar
---

Når en sluttbruker bestiller innsynskrav til en virksomhet så skal dette mottas på e-post. Denne e-posten har en forklarende tekst på hvilket dokument det er bestillt innsyn i. Vedlagt i e-posten ligger det en oep.xml fil som skal importeres til sakarkivsystemet. Om dette skjer automatisk eller manuelt er opp til hver innholdsleverandør. Deretter må filen behandles av arkivar og svar på innsynskravet må sendes ut til innsynskravbestillers e-postadresse.

## Hvordan fungerer det ?

Når en sluttbruker bestiller et innsynskrav så vil Digitaliseringsdirektoratet sin einnsyn-klient generere en bestilling og sende denne til Digitaliseringsdirektoratet sitt integrasjonspunkt. Dette integrasjonspunktet vil dermed kryptere, signere og pakke meldingen for så å sende denne via Azure Servicebus til mottaker sitt integrasjonspunkt. Her vil det bli dekryptert og sendt videre til mottakers einnsyn-klienten. Denne vil kontakte en intern SMTP-server og be den sende bestillingen. Det vil så gå en e-post fra denne e-postserveren, men med avsender e-postadresse "admin@oep.no". Denne e-posten går til den adressen som er angitt på einnsyn.no under ``` virksomhet -> "..." -> endre -> e-post ```. Deretter må filen importeres inn i sakarkivsystemet. 

![nettverksoppsett einnsyn-klient](/felleslosninger/images/einnsyn/nettverksoppsett.png)

I tillegg er det også lagt inn støtte for at e-posten som mottas har avsenderadressen til bestiller. Dette kan føre til at e-posten blir stopper i spamfilter, så det kan være lurt å sjekke der om en ikke mottar e-posten. 

## Meldingsflyt 

Se forklaring under bildet.

![meldingsflyt einnsyn](/felleslosninger/images/einnsyn/meldingsflyt.bmp)

[Trykk her for større bilde](/felleslosninger/images/einnsyn/meldingsflyt.bmp)

1. Arkivar henter trigger eksport av oep saker
2. Laster opp oep fil til filområde arkivar og eInnsynsklient har tilgang til
3. eInnsynsklient splitter opp oep meldingen til eInnsynsmeldinger,
4. Laster eInnsysnsmelding til integrasjonspunktet
5. Integrasjonspunktet gjør oppslag for å finne mottaker (capability oppslag)
6. Intgrasjonspunktet krypterer, signerer og pakker melding. Laster deretter opp til mottakers kø
7. Ingegrasjonspunktet laster ned nye meldinger fra kø, pakker opp, sjekker signatur, dekrypterer melding, tilgjengeligjør for mottaker
8. eInnsysnsapplikasjon henter meldinger fra integrasjonpunktet, tilgjengeliggjør i eInnsynssøk
9. Person søker innsyn
10. Innsynskrav lastes opp til integrasjonspunkt
11. Integrasjonspunktet gjør oppslag for å finne mottaker (capability oppslag)
12. integrasjonspunktet krypterer, signerer og pakker melding. Laster deretter opp til mottakers kø
13. Integrasjonspunktet laster ned nye meldinger fra kø, pakker opp, sjekker signatur, dekrypterer melding, tilgjengeliggjør for mottaker
14. eInnsynsklient sender innsynskrav via mottakers mailserver
15. Innsynskrav tilgjengeliggjøres i via mottakers sakarkvisystem/mailserver e.l.

