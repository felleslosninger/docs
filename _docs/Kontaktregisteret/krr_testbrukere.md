---
title: KRR testbrukere
description: KRR testbrukere
summary:

toc: false
sidebar: krr_sidebar
product: KRR

redirect_from: /krr_testbrukere
---

## Utfasing av "vanlig" fødselsnummer

Som et ledd i å bedre informasjonssikkerhet og personvern, så vil Digdir fase ut bruk av fødselsnummer som følger vanlig syntaks. Vi kommer tilbake med mer informasjon om dette, men vi ber alle om å gå over til syntetiske fødselsnummer i testing.

## Hva mener vi med syntetisk testbruker?

Syntetiske testbrukere har en personidentifikator der man har plusset på 80 på fødselsmåneden og kontrollsifferene er regnet ut i fra det.

For å finne brukere med slike fødselsnummer kan du se på listen vår litt lenger nede på denne siden. Der finner du testbrukere som har gitt egenskaper i Kontakt- og reservasjonsregisteret.

Om du ønsker testbrukere som også finnes i test-folkeregisteret, så kan du finne dette i [Tenor testdatasøk](https://www.skatteetaten.no/skjema/testdata/).


## Registrer/opprett testbruker i KRR

### MinID testbrukar

Ved å opprette MinID bruker,vil brukeren samtidig bli registrert i Kontakt- og reservasjonsregisteret (KRR).

Framgangsmåte:
<br>
- Logg inn og hent fødselsnummer på aktuell Tenor testbruker i [Tenor testdatasøk](https://www.skatteetaten.no/skjema/testdata/).
- Registrer testbruker i KRR ved å følge oppskriften [Opprette testbruker (syntetisk PID) selv i testmiljøet TEST](https://docs.digdir.no/docs/idporten/idporten/idporten_testbrukere.html#opprette-testbruker-syntetisk-pid-selv-i-testmilj%C3%B8et-test).
- sjekke om testbruker er registrert i KRR gjennom tjenesten [MinProfil](https://docs.digdir.no/docs/Kontaktregisteret/krr_sluttbrukerinnstillinger) i testmiljøet. Du kan logge inn med både TestID og MinID.  

### Testbrukar utanfor Tenor testdatabase
Ønsker du en testbruker som ikke finnes i Tenor, kan du f.eks bruke tjenesten til [Norske testdata (Ekstern tjeneste)](https://norske-testdata.no/fiktivt-fnr/). 

Merk! For at disse skal kunne benyttes i ID-porten og KRR, må disse opprettes med +80 i månedsfeltet i fødselsnummeret. 


## Endre kontaktinformasjon på syntetisk testbruker i KRR
Det er mulig å endre kontaktinformasjon på syntetiske testbrukere ved å logge inn på MinProfil.
For å endre kontaktinformasjon på syntetiske brukere, velg TestID som innloggingsmetode.

<br>
{% include note.html content=" Dersom du legger inn egen kontaktinformasjon på en testbruker, kan du risikere å motta varslinger fra virksomheter som benytter KRR i testmiljøet." %}
<br>

## KRR testbrukere med ulike attributter
Vi har et sett med "statiske" brukere. Disse testbrukerene finner du i tabellen i neste avsnitt og er testbrukere med syntetiske fødselsnummer (+80 i mnd). Testbrukerene innehar følgende attributter fra KRR som tilbakestilles hver lørdag:

- Med mobil, e-post og digital postkasse
- Med mobil og e-post
- Kun mobil
- Kun e-post
- Slettet fra KRR
- Utgått på 18mnd regel
- Reservert med digital postkasse
- Reservert uten digital postkasse


### Syntetiske testbrukere (fra Tenor testbase)

<br>

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

### Ikke-syntetiske testbrukere (=vanlig fødselsnummer)

Denne listen er fjernet. Vennligst bruk syntetiske fødselsnummer.
