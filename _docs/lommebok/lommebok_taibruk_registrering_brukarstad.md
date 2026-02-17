---
title: Registrering i sandkassen
description: Registrering i sandkassen

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_taibruk_registrering_brukarstad
---

Alle verksemder som deltek i sandkassen må vere registrert i **brukarstad-registeret** (register of relying parties, rp-registeret).  

Registreringa syner mellom anne kva rolle verksemda har og kva persondata dei brukar eller produserer. 

## Korleis registre seg ?

**Brukarstader**
Verksemder som skal vere brukarstad kan bruke [sjølvbetjent registrering](https://sjolvbetening.test.eidas2sandkasse.net/login). 

For å kunne registrere på eit ekte organisasjonsnummer må du kunne representere verksemda di i Altinn.  Alternativt kan du logge inn som deg sjølv og verte tildelt eit syntetisk organisasjonsnummer. 

Dersom ikkje ikkje får til å bruke sjølvbetjening registrering, kan du sende epost til Digdir (servicedesk@...) so skal me hjelpe deg.


**Andre roller**

Verksemder som skal vere utstedar, eller ha andre roller i økosystemet, må p.t. registrerast manuelt av Digdir. Ta kontakt på epost (servicedesk@...).



## Kva skal registrerast ?

I sandkassen må du registrere følgjande:

- **Namnet** på tenesta di  (som vert synleg for sluttbrukar)
- Kva **data** (bevistypar) brukerstaden din kjem til å be om 
- **Føremålet** med å behandle dese desse dataene

Dei andre felta knytt til verksemda di er førehandsutfylte basert på organisasjonsnummer.   På sikt kan det kome fleire opplysningar som må registrerast.

## Lage access-sertifikat

Når registreringa er komplett, får du høve til å lage eit **access-sertifikat**.  Dette sertifikatet må du bruka til å autentisere brukarstaden din mot lommeboka.   Å lage eit slikt sertifikat er ein prosess i 4 steg:

1. Lag eit nøkkelpar med elliptisk kurve EC256.
2. Lag ein CSR (certificate signing request) ut frå dette nøkkelparet.
3. Last opp CSRen på registreringa di. Registeret vil då laga eit access-sertifikat tilknytta nøkkelparet ditt.
4. Last ned access-sertifikatet og bruk det saman med privatnøkkelen i tenesta di.

Du må aldri sende privatnøkkelen til Digdir eller nokon andre.  

Her er eit døme på å generere nøkkelpar og CSR:
```
#1. opprett ein keystore og lag eit nøkkelpar i den:
keytool -genkeypair -alias rp-access -keyalg EC -groupname secp256r1 -sigalg SHA256withECDSA  -validity 365 -storetype pkcs12 -keystore rp-access.p12 -dname "CN=dummy"

#2. lag CSR-fil:
keytool -certreq -keyalg EC -alias rp-access -file rp-access.csr -keystore rp-access.p12
```


##  Meir om registrering

Krava rundt registrering finn me i [rettsakt for RP-registerering, C/2025/2621](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32025R0848&qid=1749119392688), og der informasjonen som skal registrerast finn du i Annex I.  I praksis er dette namn, organisasjonsnummer, og eit par andre felt. 

Ein kan spesielt merke seg at det skal registrerast kva **persondata** (bevistype, eller enkeltattributter frå bevis) som brukerstaden kjem til å førespørje, og **formålet** ved å etterspørje desse dataene. 

For spesielt interessert kan de sjå på den komplette datamodellen i [TS5-spesifikasjonen](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts5-common-formats-and-api-for-rp-registration-information.md#2-data-model).



