---
title: Registrering av utstedarar i sandkassen
description: Registrering av utstedarar i sandkassen

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_taibruk_registrering_brukarstad
---

Alle verksemder som deltek i sandkassen må vere registrert i **brukarstad-registeret** (register of relying parties, rp-registeret).  

Registreringa syner mellom anne kva rolle verksemda har og kva persondata dei brukar eller produserer. 

## Korleis registre seg ?

Verksemder som skal vere utstedar må førebels kontakte Digdir for å verte registert.


## Kva skal registrerast ?

I sandkassen må du registrere følgjande:

- **Namnet** på tenesta di  (som vert synleg for sluttbrukar)
- Kva **data** (bevistypar) du tenkjer å utstede (TBD)

Dei andre felta knytt til verksemda di er førehandsutfylte basert på organisasjonsnummer.   På sikt kan det kome fleire opplysningar som må registrerast.

## Lage access-sertifikat

Når registreringa er komplett, får du høve til å lage eit **access-sertifikat**.  Dette sertifikatet må du bruka til å autentisere utstedaren din mot lommeboka.   Å lage eit slikt sertifikat er ein prosess i 4 steg:

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

## Registrere utsteder-sertifikat

Du må også registrere inn det sertifikatet som du planlegg å signere alle bevis med.   Eit slikt *utstedarsertifikat*  må følge krava i [ETSI 119 412-6](https://www.etsi.org/deliver/etsi_ts/119400_119499/11941206/01.01.01_60/ts_11941206v010101p.pdf).

- Dersom du skal vere QEAA eller PubEAA må dette sertifikatet vere kvalifisert, dvs. du må få det frå ein utstedar av slike (Buypass eller Commfides i Norge).
- Dersom du berre skal vere EAA-utstedar kan du anten lage eit sjølv (følge spec'en), eller få eit frå Digdir (ved å følge same oppskrifta som over, men pass på å lage eit eige nøkkelpar for utstedarsertifikat), eller skaffe frå ein leverandør.


## Registrering på tillitslista

Digdir vil registere utstedarsertifikatet på tillitslista.  Dette er p.t. ein manuell prosess.