---
title: KRR testbrukere
description: KRR testbrukere
summary:

toc: false
sidebar: krr_sidebar
product: KRR

redirect_from: /krr_testbrukere
---

## Registrer/opprett testbruker i KRR
Ved å opprette MinID bruker,vil brukeren samtidig bli registrert i Kontakt- og reservasjonsregisteret (KRR). 

Framgangsmåte:
<br>
- Logg inn og hent fødselsnummer på aktuell Tenor testbruker i [Tenor testdatasøk](https://www.skatteetaten.no/skjema/testdata/). 
- Registrer testbruker i KRR ved å følge oppskriften [Opprette testbruker (syntetisk PID) selv i testmiljøet TEST](https://docs.digdir.no/docs/idporten/idporten/idporten_testbrukere.html#opprette-testbruker-syntetisk-pid-selv-i-testmilj%C3%B8et-test).
- sjekke om testbruker er registrert i KRR gjennom tjenesten [MinProfil](https://docs.digdir.no/docs/Kontaktregisteret/krr_sluttbrukerinnstillinger) i testmiljøet. Du kan logge inn med både TestID og MinID.  


## Endre kontaktinformasjon på syntetisk testbruker i KRR
Det er mulig å endre kontaktinformasjon på syntetiske testbrukere ved å logge inn på [MinProfil](https://docs.digdir.no/docs/Kontaktregisteret/krr_sluttbrukerinnstillinger).
For å endre kontaktinformasjon på syntetiske brukere, velg TestID som innloggingsmetode. 

Kontaktinformasjon (e-post, mobil) tilbakestilles på alle syntetiske testbrukere hver lørdag.

{% include note.html content=" Dersom du legger inn egen kontaktinformasjon på en testbruker, kan du risikere å motta varslinger fra virksomheter som benytter KRR i testmiljøet." %}


## KRR testbrukere med ulike attributter
Vi har to sett med "statiske" brukere, og som nevnt i forrige avsnitt blir disse tilbakestilt hver lørdag. Det ene settet er testbrukere med vanlige fødselsnummer, og det andre settet er med syntetiske fødselsnummer (+80 i mnd). Testbrukerene innehar følgende attributter fra KRR:

- Med mobil, e-post og digital postkasse
- Med mobil og e-post
- Kun mobil
- Kun e-post
- Slettet fra KRR
- Utgått på 18mnd regel
- Reservert med digital postkasse
- Reservert uten digital postkasse


### Syntetiske testbrukere

|Fnr|Reservert|Status|Varslingsstatus|Mobil|Epost|Postkasse|Språk|Merknad|
| - | - | - | - | - | - | - | - | - |
| 11887197158 | NEI | AKTIV | KAN_IKKE_VARSLES | JA |  JA | - | - | Utgått kontaktinformasjon 18mnd regelen |
| 30850649509 | NEI | AKTIV | KAN_IKKE_VARSLES | JA | JA | - | - | Utgått kontaktinformasjon 18mnd regelen |
| 17894199350 | - | SLETTET | KAN_IKKE_VARSLES | - | - | - | - | Slettet fra kontakt- og reservasjonsregister |
| 31855699330 | - | SLETTET | KAN_IKKE_VARSLES | - | - | - | - | Slettet fra kontakt- og reservasjonsregister |
| 04846697271 | JA | AKTIV | KAN_IKKE_VARSLES | JA | JA | - | - | Mobil og e-post registrert med reservasjon |
| 29890749036 | JA | AKTIV | KAN_IKKE_VARSLES | JA | JA | - | - | Mobil og e-post registrert med reservasjon |
| 11822648950 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | - | Mobil og e-post registrert |
| 06828498159 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | - | Mobil og e-post registrert |
| 23837998492 | NEI | AKTIV | KAN_VARSLES | JA | - | - | - | Kun mobil registrert |
| 25887098029 | NEI | AKTIV | KAN_VARSLES | JA | - | - | - | Kun mobil registrert |
| 12869699835 | NEI | AKTIV | KAN_VARSLES | - | JA | - | - | Kun e-post registrert |
| 18868299939 | NEI | AKTIV | KAN_VARSLES | - | JA | - | - | Kun e-post registrert |
| 22859197810 | NEI | AKTIV | KAN_VARSLES | JA | JA | Digipost | - | Digipost |
| 26826499361 | NEI | AKTIV | KAN_VARSLES | JA | JA | eBOKS | - | eBoks |
| 26866595592 | JA | AKTIV | KAN_IKKE_VARSLES | - | JA | - | - | Digipost med reservasjon ola.nordmann#40NU |
| 18886799280 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | nn | Språkvalg Nynorsk |
| 16867096934 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | nb | Språkvalg Bokmål |
| 01814797763 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | en | Språkvalg Engelsk |
| 29129318781 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | se | Språkvalg Samisk | 
      
      
### Ikke-syntetiske testbrukere (=vanlig fødselsnummer) 

| Fnr | Reservert | Status | Varslingsstatus | Mobil | Epost | Postkasse | Spraak | Merknad |
|-----|-----------|--------|-----------------|-------|-------|-----------|--------|---------|
| 01048800153 | NEI | AKTIV | KAN_IKKE_VARSLES | JA |  JA | - | - | Utgaatt kontaktinformasjon 18mnd regelen |
| 01066100746 | NEI | AKTIV | KAN_IKKE_VARSLES | JA | JA | - | - | Utgaatt kontaktinformasjon 18mnd regelen |
| 27129323960 | - | SLETTET | KAN_IKKE_VARSLES | - | - | - | - | Slettet fra kontakt- og reservasjonsregister |
| 27129323618 | - | SLETTET | KAN_IKKE_VARSLES | - | - | - | - | Slettet fra kontakt- og reservasjonsregister |
| 27129324592 | JA | AKTIV | KAN_IKKE_VARSLES | JA | JA | - | - | Mobil og e-post registrert med reservasjon |
| 27129324401 | JA | AKTIV | KAN_IKKE_VARSLES | JA | JA | - | - | Mobil og e-post registrert med reservasjon |
| 27129324169 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | - | Mobil og e-post registrert |
| 27129324088 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | - | Mobil og e-post registrert |
| 27129323537 | NEI | AKTIV | KAN_VARSLES | JA | - | - | - | Kun mobil registrert |
| 27129323456 | NEI | AKTIV | KAN_VARSLES | JA | - | - | - | Kun mobil registrert |
| 27129323375 | NEI | AKTIV | KAN_VARSLES | - | JA | - | - | Kun e-post registrert |
| 27129323294 | NEI | AKTIV | KAN_VARSLES | - | JA | - | - | Kun e-post registrert |
| 24079412372 | NEI | AKTIV | KAN_VARSLES | JA | JA | Digipost | - | Digipost |
| 11089499889 | NEI | AKTIV | KAN_VARSLES | JA | JA | eBOKS | - | eBoks |
| 24079412291 | JA | AKTIV | KAN_IKKE_VARSLES | - | JA | - | - | Digipost med reservasjon ola.nordmann#40NU |
| 29129319060 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | nn | Språkvalg Nynorsk |
| 29129318943 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | nb | Språkvalg Bokmål |
| 29129318862 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | en | Språkvalg Engelsk |
| 29129318781 | NEI | AKTIV | KAN_VARSLES | JA | JA | - | se | Språkvalg Samisk |

<br>
For full oversikt over responsene kan du laste ned et excell-ark her:
[oppslagstjenesten_testdata_med_forventet_respons_0.xlsx]({{site.baseurl}}/assets/oppslagstjenesten_testdata_med_forventet_respons_0.xlsx)
