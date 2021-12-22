---
title: Integrasjonstest - Digital postkasse

sidebar: dpi_sidebar
---

Her er en oversikt over de tester som anbefales gjennomført i forbindelse med en ny integrasjon med digital postkasse til innbyggere.

#### Test 1: Oppslagstjenesten

Verifiser at virksomheten kan gjøre oppslag mot [kontakt- og reservasjonsregisteret - Oppslagstjenesten]({{site.baseurl}}/docs/Kontaktregisteret/oppslagstjenesten_rest)

#### Test 2: Sending av digital post

Målsetning: verifikasjon av https://begrep.difi.no/SikkerDigitalPost/forretningslag/forretningsprosess

1. Sette opp integrasjon mot meldingsformidler
2. Gjøre oppslag mot kontakt og reservasjonsregisteret for å hente ut en digital postkasseadresse, sertifikat og varslingsadresser
3. Sende en digitalpost melding
4. Hent LeveringsKvittering (Vil komme i løpet av 10 minutter i testmiljøet)
5. Verifiser at digitalpost melding ble levert vellykket til meldingsformidler
6. Verifiser at det ble mottatt en Leveringskvittering knyttet til den digitalpostmeldingen som ble sendt
7. Verifiser egen juridisk logg knyttet til forsendelsen

Variasjoner av test1:

    Test en digital post melding med bestilt varslinger
    Test en digital post melding med virkningsdato satt frem i tid
    Test en digital post melding med vedlegg

#### Test 3: Dokumentformat

Målsetning: Sikre at dokument sendt fra Avsender blir tilgjengeliggjort tilfredstillende og forståelig for Innbygger.

    Send en digital postmelding til en postkasse
    Verifiser at Dokumentet vises tilfredstillende til innbygger
    Verifiser at lenker i dokumentet er klikkbare og fører Innbygger til forventet tjeneste

#### Test 4: Varsling

Målsetning: Sikre at varslingstekstene spesifisert fra Avsender er forståelig for Innbygger og motiverer Innbygger til å åpne posten.

Mer informasjon. https://begrep.difi.no/SikkerDigitalPost/begrep/Varsler

    Send en digital postmelding med varsling og varslingstekst
    Verifiser at varslingteksten som er bestilt på e-post og/eller sms har et forståelig budskap for Innbygger i postkasseleverandør sin varsling.

#### Test 5: Kvittering

Målsetning: Sikre at Avsender setter opp riktig interval for henting av kvitteringer i henhold til. Spesifikasjon for meldingutveksling i Sikker digital Post

    Verifiser at Avsender respekterer spesifikasjonen og venter 10 minutter mellom hver forespørsel når forrige forespørsel ikke returnerte noen kvitteringer
