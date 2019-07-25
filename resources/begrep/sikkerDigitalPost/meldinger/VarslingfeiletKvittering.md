---

title: VarslingfeiletKvittering  
permalink: sdp_varslingfeiletkvittering.html
sidebar:
---

|---|---|
| Identifikator | <http://begrep.difi.no/SikkerDigitalPost/1.3.0.RC1/1.3.0.RC1/meldinger/VarslingfeiletKvittering> |
| Term          | {{page.title}} |
| Definisjon    | En [Kvitteringsmelding](KvitteringsMelding.md) til Avsender om at varsling til Mottaker har feilet og dermed ikke har blitt utført som forutsatt. |
| Kilde         | DIFI |
| Kommentar     | Dersom Postkasse opplever problemer med å utføre varslingen som spesifisert i meldingen, skal Postkasse informere Avsender om dette ved å sende VarslingfeiletKvittering. Det skal sendes en kvittering for hver forekomst av en feilsituasjon i en spesifisert kanal. Meldinger som angir bruk av flere varslingskanaler kan dermed medføre flere VarslingfeiletKvitteringer. Varslingfeilet kvittering skal sendes seinest dagen etter at varslingen var bestilt. 

Se [Varsel](../begrep/Varsler.md) for mer informasjon om bruken av varsel.

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

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| [beskrivelse](../../felles/beskrivelse.md) | 0..1 | [beskrivelse](../../felles/beskrivelse.md) |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
| (Skal være link til /felles/varslingskanal.md) | 1..1 | (Skal være link til /felles/varslingskanal.md) |
