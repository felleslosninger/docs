---
title: Sending til fastlege
description: "Kva eFormidling kan sende til fastlegar og anna helsepersonell via Norsk Helsenett"
summary: "Oversikt over helsemeldingar via NHN, kven tenesta er for og kva som skal til"
product: eFormidling
sidebar: eformidling_sidebar
---

> ⚠️ **Beta, berre tilgjengeleg i testmiljø**
>
> Funksjonaliteten er førebels i beta og berre tilgjengeleg i test. Grensesnitt og oppførsel
> kan endre seg før produksjonssetjing.

Integrasjonspunktet kan sende meldingar til fastlegar og anna helsepersonell, direkte inn i
mottakaren sitt EPJ-system (elektronisk pasientjournal), via infrastrukturen til Norsk Helsenett.
Tenesta heiter **DPH** internt i eFormidling.

Denne sida forklarer kva tenesta er og kva som skal til for å ta henne i bruk. Den tekniske
dokumentasjonen, med meldingsformat, konfigurasjon og eksempel, ligg på
[Helsemeldingar via NHN](../Utvikling/Meldingstjenester/meldingsutveksling_for_fastlegar).

## Kva kan du bruke det til

Typiske bruksområde er meldingar frå ei offentleg verksemd til fastlegen til ein innbyggjar,
til dømes førespurnader om pasient, orienteringar og dialog knytt til ei sak.

Du kan adressere mottakaren på to måtar:

- **via pasienten sitt fødselsnummer.** Integrasjonspunktet slår opp i Fastlegeregisteret og
  finn fastlegen til pasienten automatisk
- **via HER-id.** Du sender direkte til ein kjend kommunikasjonspart i Adresseregisteret, utan
  fastlegeoppslag

## Kva som skal til

Det er fleire føresetnader, og dei må alle vere på plass før første melding kan sendast:

- verksemda må vere medlem av Helsenettet og registrert i Adresseregisteret
- HER-id-ane som skal brukast må vere registrerte som kommunikasjonspartar med EDI 2.0-adresse
- Digdir må ha fullmakt i HelseID til å opptre på vegner av verksemda
- verksemda må delegere scopet `eformidling:dph` i Altinn
- integrasjonspunktet må vere versjon 4.2.0 eller nyare

Dei fullstendige krava, med kva som gjerast kvar og kva som er sjølvbetening i test, står under
[Føresetnader](../Utvikling/Meldingstjenester/meldingsutveksling_for_fastlegar#føresetnader).

## Meldingsinnhaldet

Sjølve meldinga følgjer standarden **Dialogmelding v1.1** frå Helsedirektoratet, i NHN sitt
XML-format. Fagsystemet må altså produsere ei gyldig dialogmelding; integrasjonspunktet pakkar
og transporterer henne, men skriv henne ikkje for deg.

Vedlegg, typisk PDF, kan følgje med i dokumentpakken.

## Kvitteringar og status

Du følgjer meldinga gjennom statusane til integrasjonspunktet, frå `OPPRETTET` til `LEVERT`.
`LEVERT` blir sett når det kjem ei applikasjonskvittering med status OK frå mottakaren sitt system.

Merk at DPH **ikkje** set statusen `LEST`. NHN har ingen lest-status, berre transportkvittering
og applikasjonskvittering. Sjå
[Meldingsflyt](../Utvikling/Meldingstjenester/meldingsutveksling_for_fastlegar#meldingsflyt)
for heile statusmodellen.

## Sikkerheit

Meldingane blir krypterte og signerte av integrasjonspunktet og NHN-adapteret undervegs.
Fagsystemet treng ikkje handtere kryptering sjølv.

Vær likevel merksam på at meldingane inneheld helseopplysningar. Sørg for at fagsystemet og
loggane der handterer personopplysningar i tråd med eige behandlingsgrunnlag.

## Sjå òg

- [Helsemeldingar via NHN](../Utvikling/Meldingstjenester/meldingsutveksling_for_fastlegar), teknisk dokumentasjon
- [Dialogmelding v1.1](https://www.helsedirektoratet.no/standarder/dialogmelding-v1.1)
- [Medlemskap i Helsenettet](https://www.nhn.no/medlemskap-i-helsenettet)
- [Adresseregisteret](https://www.nhn.no/tjenester/adresseregisteret)
