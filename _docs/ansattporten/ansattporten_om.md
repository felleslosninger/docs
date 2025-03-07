---
title: Hva er Ansattporten ?
description: Ansattporten er en kopi av ID-porten men der funksjonaliteten er tilpasset innlogging i ansatt/representasjonskontekst.

sidebar: ansattporten
product: Ansattporten
redirect_from: /ansattporten_om
---

Ansattporten er en egen innloggingtjeneste med funksjonalitet som er tilpasset bruk som ansatt eller i andre situasjoner der en nett-tjeneste eller et API har behov for at sluttbruker må opptre i et representasjonsforhold på vegne av virksomheter.


<div class="mermaid">
graph LR
  I(ID-porten)
  A(Ansattporten)
  IRP(Tjeneste for innbygger)
  ARP(Tjeneste for ansatte)

  eid["Privat eID-leverandør 
  (MinID, BankID, etc... )"]
  ak[("Autorativ kilde
(Altinn Autorisasjon)")]
  aid["Ansatt-eid
(pilot: Microsoft Entra ID)"]

  IRP -. integrert mot .- I 
  I -. videreformidler innlogging fra  .- eid

  ARP -. integrert mot .-> A
  A -. videreformidler innlogging fra .-> eid 
  A -.-> |henter representasjon fra | ak

  A -...- | videreformidler innlogging og representasjon fra | aid

</div>

Disse viktigste egenskapene ved Ansattporten er som følger:

### Egen "port"

Ansattporten er en selvstendig tjeneste som er uavhengig av ID-porten.  Det betyr at tjenester i ID-porten ikke er mulig å nå fra Ansattporten og vice versa. 

Samtidig så deler ID-porten og Ansattporten samme kildekode-base, så det er i praksis bare litt konfigurasjon og tilpasset funksjonalitet som skiller de to portene teknisk.  Som hovedregel vil oppdateringer, feilrettinger og ny funksjonalitet bli rullet ut mer eller mindre samtidig til begge portene. Ansattporten tilbyr også de samme elektroniske ID'ene som er tilbudt av ID-porten, dvs. MinID, BankID, Buypass og Commfides.

Protokollmessig sier vi at Ansattporten er en egen Oauth2 autorisasjonsserver / OpenID Provider, identifisert ved sin `issuer`-verdi.


### Ingen SSO-funksjonalitet mellom tjenester

Som forklart ovenfor, så er ID-porten og Ansattporten isolert fra hverandre som separate OpenID providere. Det er derfor ikke mulig å få single-sign on (SSO) mellom ansatt-tjenester i Ansattporten til innbygger-tjenester i ID-porten.  

Men til forskjell fra ID-porten så tilbyr ikke Ansattporten SSO mellom de ulike tjenestene heller.  Dette er realisert ved at alle klienter får tvangs-satt flagget som aktiverer funksjonaliteten [isolert sso-sesjon](../../docs/idporten/oidc/oidc_func_nosso.html).

### Autorative kilder for representasjon

Ansattporten kan brukes enten til ordinær punktinnlogging, eller til å kreve at innlogga bruker må ha et bestemt representasjonsforhold for en virksomhet.   Ansattporten har ikke - og vil aldri frå - sin egen database/register over roller/rettigheter, men baserer seg på eksterne, autorative kilder for representasjonsforhold.

Dersom tjenesten krever representasjon, vil Ansattporten vise en organisasjonsvelger til brukeren, som er forhåndspopulert basert den autorative kilden.

I dag er det kun Altinn Autorisasjon som er støttet som autorativ kilde. 


# Hvem kan bruke Ansattporten ?

Alle kunder som har inngått Digdir sine bruksvilkår for fellesløsninger kan bruke Ansattporten til ordinær punkt-autentisering på samme måte som de gjør i ID-porten idag.

Men bare kunder som også er tjenesteeier i Altinn, kan bruke funksjonaliteten med organisasjonsvelger og tilgangstyring basert på representasjonsforhold i Altinn Autorisasjon.


# Hva koster Ansattporten ?

P.t. har Ansattporten samme finansieringsmodell som ID-porten.  200.000-innnloggingskvoten er felles for de to portene.

Merk at finansieringsmodell trolig vil endres i fremtiden.


# Hvordan administrerer jeg Ansattporten ?

På akkurat samme måte som for ID-porten, men du må passe på at integrasjonene du opprette i selvbetjening har `integration_type` satt til `ansattporten`.


# Er Ansattporten fremdeles i pilot-status? 

Fra 2025 går Ansattporten over i mer ordinær drift.  SLA i form av oppetid vil være den samme som for ID-porten, og feilrettinger vil bli prioritert ihht de ordinære rutinene rundt fellesløsningene.


# Hvilken bruk-scenario støttes ? 

Ansattporten tilbyr per nå tre brukerreiser:

* [Vanlig innlogging (med isolert SSO)](ansattporten_guide.html)
* [Innlogging på vegne av virksomhet](ansattporten_representasjon.html)
* [Datadeling på vegne av virksomhet](ansattporten_oauth2.html)



