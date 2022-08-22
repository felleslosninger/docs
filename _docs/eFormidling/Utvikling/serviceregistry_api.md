---
title: Adressetjenestens (Service Registry) API
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
---

Denne siden beskriver adressetjenestens (Service Registry) API og bruksmønstre for dette.

- [API-dokumentasjon](serviceregistry_api_restdocs) (ekstern lenke)

Adressetjenesten er en sentral komponent som tilbys av eFormidling.

Integrasjonspunktet bruker adressetjenesten under panseret, og kapabilitetsoppslagene integrasjonspunktet tilbyr baserer
seg på informasjon fra adressetjenesten. Det er vanligvis ikke nødvendig å integrere direkte mot adressetjenesten, men i
noen sjeldne tilfeller ønsker en virksomhet å kommunisere med virksomheter på eFormidling uten selv å kjøre et
integrasjonspunkt.

Adressetjenesten er en fasade mot adressetjenestene for de ulike meldingstjenestene som støttes av eFormidling. I
tillegg er forretningsregler for hva som er mottakernes foretrukne kanaler i ulike sammenhenger implementert i
adressetjenesten.

Adressetjenesten gir også tilgang til sertifikatkatalogen (VirkSert) i eFormidling.

<div class="mermaid">
graph LR
I1("Integrasjonspunkt 1")
I2("Integrasjonspunkt 2")
I3("Integrasjonspunkt N")
A("Adressetjenesten (Service Registry)")
P("Peppol Service Metadata Locator & Provider (SML & SMP)")
FI("KS FIKS adressetjeneste")
K("Kontakt og reservasjonsregisteret")
E("Enhetsregisteret")
FO("Folkeregisteret")
V("Sertifikatkatalogen (VirkSert)")

I1 --> A
I2 --> A
I3 --> A
A --> P
A --> FI
A --> K
A --> E
A --> FO
A --> V
</div>

Service Registry API bruker OAuth2 for autorisasjon og forventer selvforsynte JWT fra Maskinporten. JWT-forespørsler til
Maskinporten er forventet å inneholde x5c for det norske virksomhetssertifikatet (SEIDv1 or SEIDv2) JWT-forespørselen
ble signert med.

- [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_overordnet) (ekstern lenke)

eFormidling oppretter OAuth-klienter i Maskinporten som del av onboarding-prosessen:

- Klient-IDen er `MOVE_IP_<orgnummer>`
- En eller flere av følgende scope blir tildelt klienten:
    - move/dpo.read (eFormidlings meldingstjeneste)
    - move/dpe.read</code> (eInnsyns meldingstjeneste)
    - move/dpi.read</code> (Digital Post til Innbyggere)
    - move/dpf.read</code> (KS SvarUt og SvarInn)
    - move/dpv.read</code> (Altinn Digital Post)
