---
title: ID-porten testbrukere
description: ID-porten testbrukere
summary:

toc: false
sidebar: oidc
product: ID-porten

redirect_from: /idporten_testbrukere
---


Her finner du informasjon om testbrukere som kan benyttes for testing av ID-porten integrasjoner i verifikasjonsmiljøene Ver1 og Ver2.

## TestID

Vi anbefaler at alle kunder bruker **TestID** når de skal teste ID-porten.  

![TestID logo]({{site.baseurl}}/assets/testid.svg)

TestID støtter innlogging med **syntetiske personidentifikator**  (du må legge til +80 på måned-sifrene), og man slipper da risiko for å blande sammen test- og produksjonsdata.

TestID har ikke noe passord, så man slipper å ta kontakt med Digdir for å tildelt, opprettet eller nullstilt brukere.

Vi anbefaler å bruke [Tenor testdata-søk](https://www.skatteetaten.no/skjema/testdata/) til å finne test-brukere fra Test-Folkeregisteret.

## MinID og BankID

For de som ikke kan bruke syntetiske fødselsnummer, tilbyr vi et sett med standard test-brukere med personnumre som ikke finnes i Folkeregisteret.

Passord og engangskoder:

| MinID | BankID |
| - | - |
| Passord: password01 | Engangskode: otp |
| Pin: 12345 | Passord: qwer1234 |

| 08089409382 |	08089408084 |	08089406820	| 08089405603	| 08089404224 |
| 08089409110 |	08089407967	| 08089406669	| 08089405522	| 08089404143 |
| 08089408912 |	08089407886	| 08089406588	| 08089405441	| 08089404062 |
| 08089408831 |	08089407614	| 08089406316	| 08089405360	| 08089403945 |
| 08089408750 |	08089407533	| 08089406235	| 08089405018	| 08089403864 |
| 08089408599 |	08089407452	| 08089406154	| 08089404739	| 08089403783 |
| 08089408408 |	08089407371	| 08089406073	| 08089404658	| 08089403511 |
| 08089408327 |	08089407290	| 08089405956	| 08089404577	| 08089403430 |
| 08089408246 |	08089407029	| 08089405875	| 08089404496	| 08089403279 |
| 08089408165 | 08089406901	| 08089405794	| 08089404305	| 08089403198 |

**Merk: Disse testbrukerene er allment tilgjengelige og vil bli resatt med jevne mellomrom.**


## MinID - opprette testbruker på egenhånd

En kan opprette testbruker i MinID på egenhånd. En må da følge vanlig flyt for bestilling av MinID. Dette forutsetter at en benytter syntetisk fødselsnummer fra [Tenor testdata-søk](https://www.skatteetaten.no/skjema/testdata/)



**Framgangsmåte**

Trykk i innloggingsbildet "Bestill ny MinID" -> fyll inn syntestisk fødselsnummer fra Tenor -> Bestill aktiveringsbrev. En får da en aktiveringskode i "Ditt aktiveringsbrev er bestilt". Legg inn aktiveringskoden i "Bestill aktiveringsbrev"  

## MinID - Statiske pinkoder fases ut i VER2 og TEST
I løpet av våren 2023 blir statiske pinkoder faset ut i VER2 (og VER1)
Det er planlagt funksjonalitet i miljøet TEST for å kunne bruke statisk OTC i testmiljøet. (I innloggingsflyt og glemt-passordflyt)*

## Manuell behandling

Har du spesielle behov knyttet til testbrukere må du kontakte oss på servicedesk@digdir.no for manuell behandling.
