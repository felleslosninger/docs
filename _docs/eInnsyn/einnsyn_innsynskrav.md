---
title: Innsynskrav og e-postoppsett
description: Innsynskrav og e-postoppsett
summary: ""
permalink: einnsyn_innsynskrav.html
sidebar: einnsyn_sidebar
---

Når en sluttbruker bestiller innsynskrav til en virksomhet så skal dette mottas på e-post. Denne e-posten har en forklarende tekst på hvilket dokument det er bestillt innsyn i. Vedlagt i e-posten ligger det en order.xml fil som skal importeres til sakarkivsystemet. Om dette skjer automatisk eller manuelt er opp til hver innholdsleverandør. Deretter må filen behandles av arkivar og svar på innsynskravet må sendes ut til innsynskravbestillers e-postadresse.

## Hvordan fungerer det ?

Når en sluttbruker bestiller et innsynskrav så vil Digitaliseringsdirektoratet sin einnsyn-klient generere en bestilling og sende denne til Digitaliseringsdirektoratet sitt integrasjonspunkt. Dette integrasjonspunktet vil dermed kryptere, signere og pakke meldingen for så å sende denne via Azure Servicebus til mottaker sitt integrasjonspunkt. Her vil det bli dekryptert og sendt videre til mottakers einnsyn-klienten. Denne vil kontakte en intern SMTP-server og be den sende bestillingen. Det vil så gå en e-post fra denne e-postserveren, men med avsender e-postadresse "no_reply@einsyn.no". Denne e-posten går til den adressen som er angitt på einnsyn.no under ``` virksomhet -> "..." -> endre -> e-post ```. Deretter må filen importeres inn i sakarkivsystemet. 

![nettverksoppsett einnsyn-klient](/images/einnsyn/nettverksoppsett.png)

Om en ikke mottar e-posten, så kan det være lurt å sjekke spam/søppelpost mappen.

## Ved direkteintegrasjon (uten einnsyn-klient)

Fagsystem som har støtte for direkteintegrasjon kan hente order.xml direkte fra integrasjonspunktet.

## Utvidet variant av order.xml

Vi har utviklet to varianter av order.xml. Versjon 1 er den originale og "default". Hvis det er ønskelig og støtte for å motta den utvidete versjonen (versjon 2), kan det settes/endres i eInnsyn Admin av en virksomhetsadministrator:
![order_xml versjon einnsyn admin](/images/einnsyn/orderversjon_admin.png)

## Meldingsflyt 

Se forklaring under bildet.

![meldingsflyt einnsyn](/images/einnsyn/meldingsflyt.bmp)

[Trykk her for større bilde](/images/einnsyn/meldingsflyt.bmp)

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

