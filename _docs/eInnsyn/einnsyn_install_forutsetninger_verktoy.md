---
title: Forutsetninger for installasjon og verktøy
description: Forutsetninger og verktøy
summary: "Her finner du informasjon om program som må lastes ned og installeres for å bruke einnsyn-klienten"

sidebar: einnsyn_sidebar
redirect_from: /einnsyn_forutsetninger
---

## [Nyeste versjon av einnsyn-klienten finner du her](https://github.com/difi/einnsyn-klient/releases/)

## Hvordan fungerer einnsyn-klienten

I de fleste tilfeller vil det være naturlig å sette opp både integrasjonspunktet og einnsyn-klient på samme server. Denne veiledningen tar utgangspunkt i det.

Integrasjonspunktet er kanalen til omverdenen og må ha portåpning igjennom brannmuren. Samtidig må både einnsyn-klient og integrasjonspunkt ligge innenfor brannmur siden kommunikasjon går ukryptert til einnsyn-klient og arkivsystemet. Integrasjonspunktet må også ha tilgang til arkivsystemet for å kunne fungere for alternativ 1, og i tilfeller der innholdsleverandør skal sende andre meldinger enn eInnsyn-meldinger.

eInnsyn-klienten kommuniserer over HTTP med integrasjonspunktet og trenger dermed tilgang til det. Siden innsynskrav blir sendt på e-post fra eInnsyn-klient til arkivsystem eller anna e-postboks trenger også klienten tilgang til en SMTP-server. [Mer om dette her]({{site.baseurl}}/docs/eInnsyn/einnsyn_innsynskrav)

Filkatalogen (inputDirectory) er grensesnittet for arkivar. eInnsyn-klienten må kunne overvåke og skrive til denne katalogen. Samtidig må arkivar ha tilgang denne for å kunne laste opp filer. Dette forbeholder at filene ligger på en server som både arkivar har tilgang til, og som kommunisere med de andre komponentene.

[Les mer om integrasjonspunktet her](https://docs.digdir.no/docs/eFormidling/installasjon/)

## Dette må du ha på plass før du installerer

* Minimum Java Runtime Environment 11 installert
* Et virksomhetssertifikat utstedt til virksomheten
* Verktøy for xml-redigering. feks Notepad, Notepad++ eller Sublime Text.
* Integrasjonspunkt installert på samme server. [Sjå veiledning her]({{site.baseurl}}/docs/eFormidling/Introduksjon/last_ned)

## Dette må du laste ned for å installere einnsyn-klienten

For å installere einnsyn-klienten må du laste ned 3 filer fra vår Github. 

* sender-%versjonsnr%.jar (Klientapplikasjon
* einnsyn-klient.exe (Klientapplikasjon)
* einnsyn-klient.xml (Konfigurasjonsfil for klient)

[Alle disse filene kan du laste ned her](https://github.com/difi/einnsyn-klient/releases) 

Legg så filene i ønska katalog. For eksempel C:\einnsyn
 
