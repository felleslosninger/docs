
---
title: Registrering i sandkassen
description: Registrering i sandkassen

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_taibruk_registrering
---

Alle verksemder som deltek i sandkassen må vere registrert i **brukarstad-registeret** (register of relying parties, rp-registeret).  

Registreringa syner mellom anne kva rolle verksemda har og kva persondata dei brukar eller produserer. 

## Korleis registre seg ?

**Brukarstader**
Verksemder som skal vere brukarstad kan bruke [sjølvbetjent registrering](https://sjolvbetening.test.eidas2sandkasse.net/login). 

For å kunne registrere på eit ekte organisasjonsnummer må du kunne representere verksemda di i Altinn.  Alternativt kan du logge inn som deg sjølv og verte tildelt eit syntetisk organisasjonsnummer. 

Dersom ikkje ikkje får til å bruke sjølvbetjening registrering, kan du sende epost til Digdir (servicedesk@...) som skal me hjelpe deg.


**Andre roller**

Verksemder som skal vere utstedar, eller ha andre roller i økosystemet, må registrerast manuelt av Digdir. Ta kontakt på epost (servicedesk@...).


## Kva skal registrerast ?

Krava rundt registrering finn me i [rettsakt for RP-registerering, C/2025/2621](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32025R0848&qid=1749119392688), og der informasjonen som skal registrerast finn du i Annex I.  I praksis er dette namn, organisasjonsnummer, og eit par andre felt. 

Ein kan spesielt merke seg at det skal registrerast kva **persondata** (bevistype, eller enkeltattributter frå bevis) som brukerstaden kjem til å førespørje, og **formålet** ved å etterspørje desse dataene. 

For spesielt interessert kan de sjå på den komplette datamodellen i [TS5-spesifikasjonen](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts5-common-formats-and-api-for-rp-registration-information.md#2-data-model).


## Om sertifikater

Som del av registreringa må du lage ulike sertifikat som skal nyttast til identifikasjon og autentisering inn i økosystemet.













 men på sikt vil det kome ei sjølvbetjeningsløysing.  Som del av registreringsprosessen vil du motta to sertifikater som må brukast når du etterspør bevis frå lommebøkene til innbyggarane:  

 - Eitt **tilgangssertifikat** (Relying Party Access Certificate, RPAC) som vert nytta til å autentisere deg opp mot lommeboka
 - Eitt **registreringssertikat** (Relying Party Registration Certificate, RPRC)  som fortel kva data du har registrert at du vil førespørje.

Du må sjølv lage privatnøkkel til desse sertifikata før du gjennomfører registreringa, og basert på denne lage ei [CSR-fil](https://en.wikipedia.org/wiki/Certificate_signing_request) som du inkluderer med søknaden.

Merk at lommebok-økosystemet føretrekk EC-baserte nøkler (ikkje RSA) og at CSRen p.t. må angje ein SAN-extension som skal matche client_id.  Denne skal fortrinnsvis skal peike på det domenet som du køyrer applikasjonen/brukerstaden din på, men det er lov å bruke t.d. localhost under utvikling.

**Døme på å lage CSR med keytool:**
```
#1. opprett ein keystore og lag eit nøkkelpar i den:
keytool -genkeypair -alias rp-access -keyalg EC -groupname secp256r1 -sigalg SHA256withECDSA  -validity 365 -storetype pkcs12 -keystore rp-access.p12 -dname "CN=dummy"

#2. lag CSR-fil med SAN-extension (bruk egne domener):
keytool -certreq -keyalg EC -alias rp-access -ext san=dns:brukerstad.example.com -file rp-access.csr -keystore rp-access.p12
```



