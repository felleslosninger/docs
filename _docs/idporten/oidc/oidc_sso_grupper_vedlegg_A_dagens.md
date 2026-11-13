---
title: Vedlegg A: Dagnes SSO-funksjonalitet
description: Løsningsforslag til beslutning

sidebar: oidc
product: ID-porten
redirect_from: /idporten_sso_grupper_vedlegg_A_dagens
---

Se også:
- [SSO-håndtering](oidc_func_sso.html)
- [isolert sso-sesjon](oidc_func_nosso)

## Bakgrunn og dagens situasjon

Om gjenbruk av sesjon er *tillatt* mellom to klienter, er i realiteten en tillitsbeslutning: å dele en sesjon betyr at én klients autentiseringshendelse også dekker en annen klients brukere. I dag styres denne beslutningen av to uavhengige og grovkornede mekanismer:

- **Klientnivå, binært:** "av" betyr at klienten kun støtter klientbundne sesjoner, og SSO deles aldri. "På" betyr at klienten deltar i SSO uten begrensning. Dette er funksjonaliteten [isolert sso](oidc_func_nosso.html)
- **Brukertypenivå:** en av/på-innstilling per brukertype(gruppe). **Dersom brukertypegruppen ikke tillater SSO, overstyrer det klientinnstillingen fullstendig.** Klienten kan ikke oppnå SSO uansett hva den er satt til.

En brukertypegruppe er en samling `acr`-verdier, som blir konfigurert sentral i aktuell port. ID-porten skiller for eksempel på brukertypegruppene "norsk eid på høyt" og "eidas uten f/d-nummer", og det er uansett aldri mulig å få SSO på tvers av brukertypegruppe.  Ansattporten har for eksempel egen brukertypegruppe for Entra ID, som ikke er kompatibel med tjenester som ber om eIDer med f/d-nummer.  I Ansattporten ble det forøvrig opprinnelig valgt å la brukertypegruppene ha SSO fullstendig avslått, men erfaring fra praktisk drift viser at kundene i jobb-sammenheng kanskje har større ønske og risikovilje for langvarige SSO-sesjoner enn det som er akseptabelt for innbyggertjenester.

I tillegg har vi sommer/høst 2026 hatt midlertidig pilotordning som ligner på "begrenset SSO" i ID-porten med eidas-innlogging, der navngitte klientkombinasjoner beholder SSO selv når bruktypegruppen ellers har SSO avskrudd. Skatteetaten har testet dette med godt resultat. 

Det finnes ingen selvbetjent administrasjonsflate for SSO-konfigurasjon, og ingen måte å dele SSO med et kontrollert sett av andre tjenester. Behovet er en modell der tjenesteeiere kan velge noe midt imellom «ingen deling» og «deling med alle».

<div class="mermaid">
graph TD
    A[Bruker med sesjon fra Klient A kommer til Klient B] --> B{Tillater tillitsgruppen SSO?}
    B -- Ja --> C{Hvilken SSO-modus har Klient B?}
    C -- Isolert --> X[Ingen SSO - må logge inn på nytt]
    C -- Global --> D[SSO tillatt]
    B -- Nei --> X
</div>

*Figur: Dagens evalueringslogikk. To uavhengige av/på-sjekker, ingen mulighet for kontrollert deling.*
