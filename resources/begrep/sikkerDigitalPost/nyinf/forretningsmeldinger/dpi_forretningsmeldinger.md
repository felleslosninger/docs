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

## ReturPostKvittering

## Feil

## FlyttetDigitalPost


