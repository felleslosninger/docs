---
title: Forretningsmeldinger
permalink: dpi_forretningsmelding_index.html
sidebar: dpi_new_sidebar
---

1. TOC
{:toc}

## Forretningsmeldingene i Sikker Digital Post

Alle meldinger er beskrevet i [Standard Business
Document](dpi_sbd_index.html). Denne klassen
inneholder to klasser:

  - Det ene er
    [StandardBusinessDocumentHeader](dpi_sbdh.html)
    som er felles for alle meldinger. 
  - Den andre er Meldingsklassen som enten er av typen Digital, Utskrift, FlyttetDigitalpost, Feil
    eller en [kvittering](dpi_kvitteringer.html). Kvittering kan være av typen
    LeveringsKvittering, VarslingfeiletKvittering, ÅpningsKvittering,  eller
    MottaksKvittering.


**Meldingstypene**

## Digital

| --- | --- |
| Term  | {{page.title}} |
| Definisjon | Digital melding med tilhørende [Dokumentpakke](dpi_dokumentpakke_index.html) |
| Kilde | DIFI |
| Kommentar  | Digital post melding med tilhørende Dokumentpakke er postforsendelsen [Avsender](sdp_avsender.html) sender til [Mottaker](2sdp_mottaker.html). Denne inneholder informasjon om hvilken Avsender som er [Behandlingsansvarlig](dpi_aktorer.html), en knytning til dokumentpakken igjennom [Dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html)  og informasjon om behandlingsregler som [Postkasseleverandør](dpi_aktorer.html) skal bruke for å tilgjengeliggjøre posten. |

Postkassen kvitterer for meldingen gjennom å sende [Leveringskvittering](dpi_leveringskvittering.html) til avsender. Leveringskvittering for at postkassen har tatt ansvar for å tilgjengeliggjøre meldingen.

**Schema**
[innbyggerpost_dpi_digital_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_digital_1_0.schema.json)

**Properties**

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/personmottaker) |
| [dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html) | 1..1 | [dokumentpakkefingeravtrykk]({{ page.dpi_common_schema_location }}#/definitions/dokumentpakkefingeravtrykk) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [sikkerhetsnivaa](sikkerhetsnivaa.html) | 0..1 | [sikkerhetsnivaa]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) |
| [virkningsdato](virkningsdato.html) | 0..1 | [virkningsdato]({{ page.dpi_common_schema_location }}#/definitions/virkningsdato) |
| [virkningstidspunkt](virkningstidspunkt.html) | 0..1 | [virkningstidspunkt]({{ page.dpi_common_schema_location }}#/definitions/virkningstidspunkt) |
| [aapningskvittering](aapningskvittering.html) | 0..1 | [aapningskvittering]({{ page.dpi_common_schema_location }}#/definitions/aapningskvittering) |
| [ikkesensitivtittel](ikkesensitivtittel.html) | 0..1 | [ikkesensitivtittel]({{ page.dpi_common_schema_location }}#/definitions/ikkesensitivtittel) |
| [varsler](sdp_varsler.html) | 0..1 | [varsler]({{ page.dpi_common_schema_location }}#/definitions/varsler) |

## Utskrift
| --- | --- |
| Term  | {{page.title}} |
| Definisjon | Utskrift melding med tilhørende [Dokumentpakke](dpi_dokumentpakke_index.html) |
| Kilde | DIFI |
| Kommentar  | Utskrift melding med tilhørende Dokumentpakke er postforsendelsen [Avsender](sdp_avsender.html) sender til [Mottaker](2sdp_mottaker.html). Denne inneholder informasjon om hvilken Avsender som er [Behandlingsansvarlig](dpi_aktorer.html), en knytning til dokumentpakken igjennom [Dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html)  og informasjon om behandlingsregler som [Postkasseleverandør](dpi_aktorer.html) skal bruke for utskrift og forsendelse. |

Postkassen kvitterer for meldingen gjennom å sende [Leveringskvittering](dpi_leveringskvittering.html) til avsender. Leveringskvittering for at postkassen har tatt ansvar for å tilgjengeliggjøre meldingen.

**Schema**
[innbyggerpost_dpi_utskrift_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_utskrift_1_0.schema.json)

**Properties**

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/adresseInformasjon) |
| [dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html) | 1..1 | [dokumentpakkefingeravtrykk]({{ page.dpi_common_schema_location }}#/definitions/dokumentpakkefingeravtrykk) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [utskriftstype](utskriftstype.html) | 0..1 | [utskriftstype]({{ page.dpi_common_schema_location }}#/definitions/utskriftstype) |
| [retur](sdp_fysiskpostretur.html) | 0..1 | [retur]({{ page.dpi_common_schema_location }}#/definitions/retur) |
| [posttype](posttype.html) | 0..1 | [posttype]({{ page.dpi_common_schema_location }}#/definitions/posttype) |

## Leveringskvittering

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Kvittering på at postkassen eller utskriftstjenesten har tatt ansvar for å tilgjengeliggjøre melding til mottaker. Sendes til Avsender via meldingsformideler. |
| Kilde         | DIFI |
| Kommentar     | Denne kvitteringen kan [Behandlingsansvarlig](dpi_aktorer.html) oppbevare som en garanti på at posten vil bli levert til [Mottaker](2sdp_mottaker.html). |

**For Digital meldinger**

Kvitteringen sendes fra [Postkasseleverandør](dpi_aktorer.html)
når postforsendelsen er validert og de garanterer for at posten vil bli
tilgjengeliggjort.  
Kvitteringen vil bli sendt så fort [Postkassleverandør](dpi_aktorer.html) kan garantere dette,
det vil si at leveringskvitteringen vil bli sendt før [virkningsdato](virkningsdato.html).

**For Utskrift** 

Kvitteringen leveres når brevene er gjort klar for postlegging.
Postleverandøren vil kort tid etterpå komme og hente brevene som er lagt
til postlegging.  
Postlegging gjøres en gang om dagen på hverdager, så denne typen
kvitteringer kan forventes tilgjengelig for Avsender omtrent på samme
tidspunkt for alle meldinger som postlegges samme dag.

**Schema**
[innbyggerpost_dpi_leveringskvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_leveringskvittering_1_0.schema.json)


## Aapningskvittering

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En [KvitteringsMelding](dpi_kvitteringer.html) til Avsender om at Mottaker har åpnet forsendelsen i sin postkasse. |
| Kilde         | DIFI |
| Kommentar     | Åpningskvitteringer blir bare sendt dersom dette er bestilt av [Avsender](sdp_aktorer.html) i [digital](dpi_digital.html) meldingen ved å spesifisere dette med propertien aapningskvittering. [Mottaker](sdp_aktorer.html) må aksepteres at det sendes en til [Avsender](sdp_aktorer.html) for å få lest den digital posten. Mangel på ÅpningsKvittering betyr at [Mottaker](sdp_aktorer.html) ikke har lest dokumentet. |

Bruk av ÅpningsKvittering er priset for [Avsender](sdp_aktorer.html).

Åpningskvittering vil være påkrevd helt frem til Innbygger har akseptert
at kvitteringen sendes til Avsender. Det vil si at Åpningskvittering kan
komme lang tid etter at [digital](dpi_digital.html) meldingen blir sendt.

**Anbefalt bruk**

Åpningskvittering er en funksjonalitet som brukes av Avsendere kun etter
en grundig og dokumentert vurdering.  
Funksjonaliteten vil kunne oppleves som påtrengende for Mottaker da man
ikke får tilgang til å lese den posten man har mottatt uten å godta at
kvitteringen blir sendt.

For mer informasjon om bruk av denne funksjonaliteten kan man ta kontakt
med Sentralforvalter.

**Schema**
[innbyggerpost_dpi_aapningskvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_aapningskvittering_1_0.schema.json)

## VarslingFeiletKvittering

|---|---|
| Term          | {{page.title}} |
| Definisjon    | En [Kvitteringsmelding](dpi_kvitteringer.html) til Avsender om at varsling til Mottaker har feilet og dermed ikke har blitt utført som forutsatt. |
| Kilde         | DIFI |
| Kommentar     | Dersom Postkasse opplever problemer med å utføre varslingen som spesifisert i meldingen, skal Postkasse informere Avsender om dette ved å sende VarslingfeiletKvittering. Det skal sendes en kvittering for hver forekomst av en feilsituasjon i en spesifisert kanal. Meldinger som angir bruk av flere varslingskanaler kan dermed medføre flere VarslingfeiletKvitteringer. Varslingfeilet kvittering skal sendes seinest dagen etter at varslingen var bestilt. 

Se [Varsel](sdp_varsler.html) for mer informasjon om bruken av varsel.

Årsaken til at postkasseleverandør ikke klarer å sende en slik melding
kan være en av følgende:

  - Kontaktinformasjonen som er oppgitt er ikke på riktig format.
  - e-post serveren, sms-gateway eller mobiloperatør er ikke
    tilgjengelig ved sendingstidspunktet slik at varslet ikke ble sendt
    vellykket
      - Her vil postkasseleverandør gjøre forsøk på resending, men
        dersom feilen ikke er utbedret innenfor avtalt tidsfrist vil en
        Varslingfeiletkvittering sendes.
  - Innbygger mottok ikke e-post varselet eller sms-meldingen og
    feilmelding om dette ble gitt til Postkasseleverandør.
      - Det er begrensninger i forhold til om Postkasseleverandør får
        slike feilmeldinger tilbake eller ikke. Dette er avhengig av
        oppsett på e-post serveren Innbyggeren bruker og mobiloperatøren
        Innbygger er tilknyttet.  
        Postkasseleverandør vil etter beste evne tolke de [Non-Delivery
        Reports](http://en.wikipedia.org/wiki/Bounce_message) som mottas
        og gi en Varslingfeiletkvittering i de tilfeller det er helt
        sikker at varselet ikke ble levert.

**Avsender sin oppfølging av VarslingfeiletKvittering**

Alle Avsendere/behandlingsansvarlige må selv gjøre en vurdering av
hvorvidt de skal følge opp VarslingfeiletKvittering eller ikke.  
Ved mottak av VarslingfeiletKvittering må Avsender vurdere om og hvordan
dette skal følges opp mot forskriften. Posten vil være tilgjengelig i
postkassen uavhengig av om varselet feilet eller ikke.  
Denne vurderingen bør baseres på samme vurdering som de har gjort i
forhold til fysisk post, og oppfølgingen av returpost.  
Vi i Difi antar at Avsendere/behandlingsansvarlige har svært forskjellig
oppfølging av returpost.

  - Her er noen eksempler:
      - Avsendere som i dag har valgt å ikke følge opp returpost men
        makulerer alle returpost direkte kan også gjøre det samme for
        VarslingfeiletKvittering.
      - Avsendere som i dag følger opp all returpost, og gjør tiltak
        ovenfor den personen som ikke har mottatt dokumentet bør gjøre
        samme tiltak ovenfor denne personen når det kommer
        VarslingfeiletKvittering
      - Avsendere som i dag mottar og logger returpost, men ikke gjør
        noe aktiv oppfølging, bør logge VarslingfeiletKvittering.

Denne anbefalingen og eksemplene baserer seg selvsagt på den
forutsetning at Avsendere/behandlingsansvarlige har etablerte rutiner
basert på en gjennomført vurdering.

**Schema**
[innbyggerpost_dpi_varslingfeiletkvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_varslingfeiletkvittering_1_0.schema.json)


**Properties**

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [beskrivelse](beskrivelse.html) | 0..1 | string |
| [varslingskanal](varslingskanal.html) | 1..1 | string epost/sms |

## MottaksKvittering

|---|---|
| Identifikator |  |
| Term          | {{page.title}} |
| Definisjon    | En [Kvitteringsmelding](dpi_kvitteringer.html) til Avsender om at utskrift og forsendelsestjenesten har mottatt forsendelsen og har lagt den klar for utskrift. |
| Kilde         | DIFI |
| Kommentar     | Denne Kvitteringen leveres tilbake så fort utskrift og forsendelsestjenesten har mottatt forsendelsen og validert at den kan skrives ut. Forsendelsen vil så legges i kø og tas med i neste utskriftsjobb for denne type post. |

**Schema**
[innbyggerpost_dpi_mottakskvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_mottakskvittering_1_0.schema.json)

## ReturPostKvittering

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En [Kvitteringsmelding](dpi_kvitteringer.html) fra Utskriftstjenesten til Avsender om at post ikke kunne leveres til Mottaker. |
| Kilde         | DIFI |
| Kommentar     | Dette er Kvittering på at posten har kommet i retur og har blitt makulert. |

Kvitteringen leveres når brevene er mottatt i retur av utskrift og
forsendelsestjenesten, registrert og makulert. Dette forutsetter at
avsender har valgt å benytte denne tjenesten i feltet
(Link til /felles/returPostStrategi.md) i opprinnelig melding.  
Kvitteringen vil komme flere dager etter at en forsendelse er sendt til
utskrift og forsendelsetjenesten, dette er overordne de steg som skal
gjennomføres før Avsender får ReturpostKvittering

| Steg | Beskrivelse | Antatt tidsbruk |
| --- | --- | --- |
| Utskrift | Brevet skrives ut og postlegges | 1 dag |
| Forsendelse | Brevet forsendes til Avsender | 2 til 5 dager |
| Retur til EA tjeneste | Brev som ikke kan leveres vil bruke noe tid tilbake til retur tjenesten | 1 til 2 dager |
| Behandling av returpost | Brev makuleres og kvittering skapes | 2 - 4 dager |
| Retur av kvittering | Kvittering gjøres tilgjengelig i meldingsformidler | Umiddelbart |

**Schema**
[innbyggerpost_dpi_returpostkvittering_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_returpostkvittering_1_0.schema.json)

## Feil

**Beskrivelse**

Feilmelding sendes fra Postkasseleverandør når det oppstår en uventet
feil som ikke kan håndteres av postkasseleverandør innenfor SLA krav.  
Feilene kategoriseres overordnet i to typer, enten som klient feil som
Avsender må rette opp i eller som server feil som oppstår hos
postkasseleverandør.

**Håndtering av klient feil**

Feil kategorisert som klientfeil vil komme dersom Avsender har sendt en
digital postmelding som ikke kan behandles av Postkasseleverandør.  
Dette kan være feil som f.eks:

  - Adresseringen til Mottaker er feil
  - Postkasseleverandør kan ikke dekryptere dokumentpakken
  - Varslingreglene bryter med forretningsregler
  - Virkningsdato er satt for langt frem i tid

Generelt vil dette være alle feil med
[Digital](dpi_digital.html.md) meldignen [Utskrift](dpi_utskrift.html) meldingen og
[Dokumentpakken](dpi_dokumentpakke_index.html).

Feilen må utbedres og ny meldin må sendes.

**Håndtering av server feil**

Feil kategorisert som serverfeil vil oppstå dersom postkasseleverandør
har interne feil som stopper behandlingen av den digitale postmeldingen.

**Schema**
[innbyggerpost_dpi_feil_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_feil_1_0.schema.json)

**Properties**
| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/virksomhetmottaker) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [tidspunkt](dpi_maskinportentoken.html) | 1..1 | [tidspunkt]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) string - date-time iht [RFC 3339, section 5.6](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) |
| [feiltype](sikkerhetsnivaa.html) | 0..1 | [feiltype]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) string KlIENT/SERVER|
| [detaljer](sikkerhetsnivaa.html) | 0..1 | [detaljer]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) string|


**Kodeverk for feiltype**

feiltype kan ha følgende verdi:

| Kodeverdi | Beskrivelse |
| --- | --- |
| KLIENT | Feilen kommer pga. feil på input eller andre feil der [Avsender](sdp_avsender.html) må rette opp i årsaken til feilen |
| SERVER | Feilen kommer av feil på sentral infrastruktur. [Avsender](sdp_avsender.html) må ta kontakt med Sentralforvalter for å få rettet opp i feilen. |


## FlyttetDigitalPost

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | En digital melding med tilhørende [Dokumentpakke](dpi_dokumentpakke_index.html) som flyttes fra en postkasseleverandør til en annen |
| Kilde         | DIFI |
| Kommentar     | Denne meldingstypen brukes kun imellom Postkasseleverandørene og ikke av Avsender. Den brukes dersom Innbygger velger å flytte sin post over til en annen postkasseleverandør. |

Det er den opprinnelige Dokumentpakken som skal sendes til ny postkasse
ved flytting av post. Denne pakkes inn i en FlytteDigitalpostMelding.  
Dette er en forretningsmelding som likner DigitalPostMelding, men med
noe informasjon om statusen på posten.  
Postkasseleverandøren som sender denne posten står som databehandler for
meldingen.

**Regler for hvilken post som kan flyttes**

Post med følgende tilstander kan flyttes:

  - Post innbygger har behandlet.
  - Post som opprinnelig krevde varsling, der varsling er utført eller
    avsluttet som følge av innbyggers behandling. 
  - Post som opprinnelig krevde åpningskvittering, som nå er åpnet og
    åpningskvittering er sendt. 
  - Post som opprinnelig ikke kom med krav om åpningskvittering eller
    varslinger kan flyttes.

Post med følgende tilstander **ikke** kan flyttes:

  - Post som har en virkningsdato frem i tid. 
      - Denne posten er ikke tilgjengelig/synlig for innbygger og kan
        dermed ikke flyttes.
  - Post som krever åpningskvittering, der innbygger ikke har åpnet
    brevet er ikke å betrakte som tilgjengelig 
      - Postkasseleverandøren som mottar flyttet post kan ikke sende
        kvitteringer til opprinnelig avsender.
      - Dermed skal postkasseleverandøren først sikre at
        åpningskvittering sendes til Avsender før det er mulig å flytte
        posten.
  - Post der det er bestilt Varsling og varslingene ikke er ferdig
    utført 
      - Postkasseleverandøren som mottar flyttet post kan ikke sende
        kvitteringer til opprinnelig avsender.
      - Dermed skal opprinnelig postkasseleverandør først sikre at alle
        bestilte varslinger blir utført eller at Avsender blir informert
        om at varsling har feilet før posten kan flyttes.


**Schema**
[innbyggerpost_dpi_flyttet_1_0.schema.json](schemas/dpi/innbyggerpost_dpi_flyttet_1_0.schema.json)


**Properties**

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| [avsender](sdp_avsender.html) | 1..1 | [avsender]({{ page.dpi_common_schema_location }}#/definitions/avsender) |
| [mottaker](2sdp_mottaker.html) | 1..1 | [mottaker]({{ page.dpi_common_schema_location }}#/definitions/personmottaker) |
| [dokumentpakkefingeravtrykk](sdp_dokumentpakkefingeravtrykk.html) | 1..1 | [dokumentpakkefingeravtrykk]({{ page.dpi_common_schema_location }}#/definitions/dokumentpakkefingeravtrykk) |
| [maksinportentoken](dpi_maskinportentoken.html) | 1..1 | [maksinportentoken]({{ page.dpi_common_schema_location }}#/definitions/maskinportentoken) |
| [sikkerhetsnivaa](sikkerhetsnivaa.html) | 0..1 | [sikkerhetsnivaa]({{ page.dpi_common_schema_location }}#/definitions/sikkerhetsnivaa) |
| [virkningsdato](virkningsdato.html) | 0..1 | [virkningsdato]({{ page.dpi_common_schema_location }}#/definitions/virkningsdato) |
| [virkningstidspunkt](virkningstidspunkt.html) | 0..1 | [virkningstidspunkt]({{ page.dpi_common_schema_location }}#/definitions/virkningstidspunkt) |
| [aapningskvittering](aapningskvittering.html) | 0..1 | [aapningskvittering]({{ page.dpi_common_schema_location }}#/definitions/aapningskvittering) |
| [ikkesensitivtittel](ikkesensitivtittel.html) | 0..1 | [ikkesensitivtittel]({{ page.dpi_common_schema_location }}#/definitions/ikkesensitivtittel) |
| [varsler](sdp_varsler.html) | 0..1 | [varsler]({{ page.dpi_common_schema_location }}#/definitions/varsler) |
| mottakstidspunkt | 0..1 | string - date |
| aapnet]| 0..1 | boolean |


