---
title: Postkasser til testbrukere
permalink: sdp_pk_til_testbruker_index.html
sidebar: dpi_sidebar
---

Merk! Testbrukere med rette egenskaper for testing av digital postkasse får en ved å sende en bestilling til servicedesk@digdir.no

### Digital postkasse i testmiljø krever at testbrukere:
- Har gyldig eID på nivå 4
- Er registrert i test-folkeregisteret
- Er registrert i kontakt og reservasjonsregisteret
 
En kan sjekke om testbrukere har rette egenskaper på denne måten:

### eID på nivå 4 i testmiljøet:
Testes på følgende måte:
1.	Gå til brukerprofil i kontakt og reservasjonsregisteret: [https://brukerprofil-ver1.difi.no/minprofil/](https://brukerprofil-ver1.difi.no/minprofil/)
2.	velg BankID i ID-porten (engangskode: otp, passord: qwer1234)

Dersom innlogging med BankID med din testbruker ikke fungerer, så ta kontakt med Digitaliseringsdirektoratet på servicedesk@digdir.no.

### Finne ut om testbruker finnes i test-folkeregisteret og sjekke profil i kontakt og reservasjonsregisteret:
Testes på følgende måte:
1.	Gå til brukerprofil i kontakt og reservasjonsregisteret: [https://brukerprofil-ver1.difi.no/minprofil/](https://brukerprofil-ver1.difi.no/minprofil/) 
2.	Logg på med ønsket eID i ID-porten
3.	Se om navn vises for innlogget bruker øverst i høyre hjørne
4.	Sett e-post og gjerne mobilnummer til en varslingsadresse, slik at du kan motta varsel fra testmiljøene.

## Opprett en digital postkasse på en testbruker
En kan opprette postkasse på testbrukere på to ulike måter. Enten ved å registrere direkte hos hver enkelt postkasseleverandør, eller ved å benytte forenklet postkasseregistrering via KRR. Begge deler er fort gjort og består kun av noen få klikk pr bruker.

##### Alternativ 1: Registrer testbrukeren direkte i testmiljøet til postkasseleverandørene:
- E-boks: [http://demo2-www.e-boks.no](http://demo2-www.e-boks.no)
- Digipost: [https://difitest.digipost.no](https://difitest.digipost.no)

Logg på med BankID underveis i opprettelsesprosessen.

##### Alternativ 2: Forenklet postkasseregistrering via KRR
Logg på: [https://brukerprofil-ver1.difi.no/postkasse/](https://brukerprofil-ver1.difi.no/postkasse/), velg postkasse og følg instruksene. 
 
## Bytte postkasse for en testbruker:
Det er fullt mulig for brukere ha å flere digitale postkasser for private tjenester, men en kan bare ha en postkasse for brev fra det offentlige. Det offentlige har inngått avtale med e-Boks og Digipost om å levere digital postkasse til innbyggere for brev fra det offentlige. Innbygger kan fritt velge mellom disse, og kan når som helst bytte mellom postkasseleverandørene. For å kunne bytte må bruker ha opprettet konto/postkasse hos begge leverandørene på forhånd. Bytte av offentlig postkasse i testmiljøet gjøres igjennom brukerprofilen i kontakt og reservasjonsregisteret.
(Merk at alle forutsetninger beskrevet i kapitlene over må være på plass)
- Gå til brukerprofil i kontakt og reservasjonsregisteret: [https://brukerprofil-ver1.difi.no/minprofil/](https://brukerprofil-ver1.difi.no/minprofil/). Logg på og Velg/bytt postkasse.

Merk: Dersom det står: "Velg på norge.no" så har du ikke husket å opprette en postkasse først og da vil du måtte gjøre det først.
 
## Vanlige spørsmål og problemstillinger
Spørsmål: "jeg har valgt meg en postkasse men når jeg gjør oppslag i kontakt og reservasjonsregisteret får jeg tilbake status IKKE_REGISTRERT"

Svar: Som oftest skyldes dette en forveksling/blanding av de to funksjonelle testmiljøene til kontakt og reservasjonsregisteret.
Oppslaget i kontakt og reservasjonsregisteret må gjøres mot verifikasjon1-miljøet (ver1), samme miljø som du bruker for å velge deg postkasse.

adressen til kontakt og reservasjonsregisteret må altså være:
[https://kontaktinfo-ws-ver1.difi.no/kontaktinfo-external/ws-v5](https://kontaktinfo-ws-ver1.difi.no/kontaktinfo-external/ws-v5) 
(merk "-ver1" i url'en både for lenken til oppslagstjenesten og brukerprofilen)
