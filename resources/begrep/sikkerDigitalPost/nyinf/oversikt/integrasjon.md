---
title: Integrasjon 
permalink: integrasjon.html
sidebar: dpi_timo_sidebar
---

1. TOC
{:toc}

Hvordan koble seg til og ta i bruk transportinfrastruktur for å sende digital post til innbyggere (DPI-meldinger). 

Stegene under er mest tenkt for virksomheter som selv skal integrere mot ny transportinfrastruktur, eller for leverandører som skal integrere sytemer/produkter med funksjonalitet for å sende digital post til innbyggere. For mange offentlige virksomheter vil leverandør av fagsystemer eller andre avsendersystemer (eksempelvis sak og arkivsystemer) ivareta integrasjon mot infrastrukturen gjennom produktet de selger. 

Steg1:
## Velge Service Provider - Leverandør av aksesspunkt
Transportinfrastrukturen baserer seg på [Peppol](https://peppol.eu/what-is-peppol/peppol-country-profiles/norway-country-profile/) og bruk av en såkalt [fire-hjørners-modell (se arkitekturskisse)](https://docs.digdir.no/dpi_arkitektur.html). Denne baserer seg på at avsendere (i hjørne1) og mottakertjenester (i hjørne4) gjør avtale med en Peppol Service Provider om leveranse av aksesspunkttjenester (disse opptrer i hjørne2 for avsender og hjørne3 for mottakertjeneste). Service Providere utveksler så meldinger på vegne av sine kunder, via sine aksesspunkt. Formidling mellom aksesspunktene utføres i henhold til Peppol og eGovernment-domenet.

For å gjøre det enkelt for offentlige virksomheter har Digdir, som sentralforvalter av fellesløsningen digital postkasse, inngått avtale med en Peppol Service Provider på vegne 
av alle offentlige virksomheter. Det betyr at offentlige virksomheter kan sende via et aksesspunkt uten å inngå eller anskaffe egne avtaler om aksesspunkttjenester. 

Det er likevel fullt mulig å gjøre egen avtale med andre Service Providere om en heller ønsker dette, eller [opptre som Peppol Service Provider selv](https://www.anskaffelser.no/nb/verktoy/veiledere/aksesspunkt). Disse to alternativene innebærer at avsendere i hjørne1 selv må [bygge DPI-meldinger i henhold til spec](https://docs.digdir.no/dpi_nyinfrastruktur.html#2---avsender-sender-post-melding), og formidle disse til valgt aksesspunktleverandør på egenhånd. Service Providere i hjørne2 må uansett formidle meldinger til Digdirs Service Provider for mottakertjenestene i hjørne3. Denne vil sørge for at meldingene blir levert til rett mottakertjeneste i hjørne4 (Digital Postkasse eller utskrift).

Steg2:
## Velge integrasjonsmetode - For avsendere som tar i bruk digdirs aksesspunkt-avtale
For å få et system til å sende digital post til innbyggere via Digdirs aksesspunkt-avtale, må en velge hvordan avsendersystemet skal kommunisere med aksesspunktet. Under skisseres to ulike alternativer.

Alternativ 1: eFormidling
Avsendere kan ta i bruk [fellesløsningen eFormidling](https://docs.digdir.no/eformidling_index.html) 

Alternativ 2: Gå direkte mot API'et til aksesspunktet:
Aksesspunktet som Digdir har avtale med tilbyr et API som avsendere kan bruke direkte om ønskelig. Dette alternativet innebærer at avsendere må [bygge DPI-meldinger i henhold til spec](https://docs.digdir.no/dpi_nyinfrastruktur.html#2---avsender-sender-post-melding) og formidle disse til API'et på egenhånd. I tillegg må en selv håndtere kvitteringer som kommer i retur til API'et pr forsendelse.

Aksesspunkt-API-miljø:
Produksjon: [https://srest.dataplatfor.ms/swagger-ui/#/DPI](https://srest.dataplatfor.ms/swagger-ui/#/DPI)
QA: [https://srest.qa.dataplatfor.ms/swagger-ui/#/DPI](https://srest.qa.dataplatfor.ms/swagger-ui/#/DPI)
