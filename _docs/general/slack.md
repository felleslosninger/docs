---
title: "Bruk av Slack"

sidebar: main_sidebar
product: general
redirect_from: /slack
---

Fleire av Digdir sine produkt har opne communities på Slack. 

## Offisiell support

- Support, med definert svartid, skjer på e-post til servicedesk (at) digdir.no. Dette gjeld også bestillingar på vegne av din organisasjon. Servicedesken er bemanna i kontortid alle virkedagar. 

- Beredskapsvakta handterer hendingar i PRODUKSJON som må handterast utanfor kontortid. tlf: 95 73 61 02

## Kva kan eg forvente frå Slack:

- Slack-kanalane er ikkje offisiell support-kanal, men eit community: alle må bidra til å svare.

- Digdir svarar på spørsmål etter "best effort"-prinsippet, utan nokon garanti for svartid eller svar.

- DM til Digdir-folk er ikkje lov, du blir muta og i verste fall kasta ut av slacken. Det same gjeld for tagging. Digdir kan ta initativ til ein DM med deg, om det er hensiktsmessig.

## Korleis få tilgang ?

Tilsette i offentleg sektor bør i hovudsak lage seg ein brukar på [Offentlig PaaS](https://offentlig-paas.no/) sin slack.  Du finn kanalane våre spegla her under syntaksen `#digdir-<produkt>`.

Tilsette i privat sektor må ha betal-slack, og bruke Slack Connect-funksjonaliteten til å koble seg mot [https://digdir-samarbeid.slack.com](https://digdir-samarbeid.slack.com).

Per september 2025 har vi følgjande kanalar:

- #produkt-autorisasjon
- #produkt-ansattporten
- #produkt-digital-lommebok
- #produkt-idporten
- #produkt-maskinporten
- #produkt

## Andre køyrereglar
3. Før du har funksjonelle og merkantile spørsmål: Finn du informasjon på Digdir Docs eller Samarbeidportalen, Release-loggen, eller i Roadmap?
4. Før du spør om noko er nede, sjekk her: 
    1. PRODUKSJON: [driftsstatus](https://status.digdir.no) og [livetrafikk](https://digdir.grafana.net/public-dashboards/ca886cb1879d422bb876ca6a2e9aca17?orgId=1&refresh=1m&from=now-1h&to=now&timezone=browser)
    2. TEST: [testmiljo.status.digdir.no](https://testmiljo.status.digdir.no) og [livetrafikk](https://digdir.grafana.net/public-dashboards/97290eb356824146aaed52df73e67695?from=now-1h&to=now&refresh=1m&timezone=browser) 

7. Du må ikkje poste sensitive opplysningar som fødselsnummer eller som ein del av påloggingsinformasjon

9. Svar på ofte stilte spørsmål på Digdir Docs
10. Du har størst sjanse for svar dersom 
    1. du er tydeleg på miljø (prod / test) 
    2. tidspunkt (dag og klokkeslett)
    3. du oppgir din client_id
    4. du oppgir kva endepunkt du forsøker og presis beskrivelse av kva som skjer
11. Ved feilsituasjonar treng vi evt.
    1. trace_id returnert frå oss
    2. og fortrinnsvis komplett forespørsel sendt frå deg. Inkl http-headere, query-parametre og body

