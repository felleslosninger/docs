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

Verksemder som skal vere utstedar må førebels kontakte Digdir på [servicedesk@digdir.no](mailto:servicedesk@digdir.no) for å verte registert.

På sikt ynskjer me å legge til rette for at utstederar skal kunne registrere seg sjølve.


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
 
For at lommebøker skal stole på bevis frå utstedaren din, må verksemda registrerast i den norske **tillitslista** (Trusted List) som ein Trust Service Provider (TSP). Tillitslista følger [ETSI TS 119 612](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf).
 
### Kva Digdir treng om verksemda (TSP-informasjon)
 
| Attributt | Skildring |
|---|---|
| `TSPName` | Fullt namn på verksemda (norsk og engelsk) |
| `TSPTradeName` | Organisasjonsnummer på formatet `NTRNO-<orgnr>` |
| `PostalAddress` | Postadresse: gateadresse, postnummer, by og landkode |
| `ElectronicAddress/URI` | Kontaktinformasjon: e-postadresse og/eller nettside |
| `TSPInformationURI/URI` | URL til informasjonsside om tenesta |
 
<details>
<summary>Eksempel på TSP-oppføring (XML)</summary>
```xml
<TrustServiceProvider>
  <TSPInformation>
    <TSPName>
      <Name xml:lang="no">Digitaliseringsdirektoratet</Name>
      <Name xml:lang="en">Norwegian Digitalisation Agency</Name>
    </TSPName>
    <TSPTradeName>
      <Name xml:lang="no">NTRNO-991825827</Name>
      <Name xml:lang="en">NTRNO-991825827</Name>
    </TSPTradeName>
    <TSPAddress>
      <PostalAddresses>
        <PostalAddress xml:lang="no">
          <StreetAddress>Lørenfaret 1C</StreetAddress>
          <Locality>Oslo</Locality>
          <PostalCode>0580</PostalCode>
          <CountryName>NO</CountryName>
        </PostalAddress>
      </PostalAddresses>
      <ElectronicAddress>
        <URI xml:lang="no">mailto:servicedesk@digdir.no</URI>
        <URI xml:lang="en">mailto:servicedesk@digdir.no</URI>
        <URI xml:lang="no">https://www.digdir.no/</URI>
        <URI xml:lang="en">https://www.digdir.no/</URI>
      </ElectronicAddress>
    </TSPAddress>
    <TSPInformationURI>
      <URI xml:lang="no">https://docs.digdir.no/docs/lommebok/lommebok_om.html</URI>
    </TSPInformationURI>
  </TSPInformation>
  <!-- ... -->
</TrustServiceProvider>
```
 
</details>
### Kva Digdir treng om teneste
 
For kvar utstedarteneste trengst i tillegg:
 
| Attributt | Skildring |
|---|---|
| `ServiceName` | Namn på utstedartenesta |
| `ServiceDigitalIdentity` | Utstedar-sertifikatet som identifiserer utstedaren (sjå [Registrere utsteder-sertifikat](#registrere-utsteder-sertifikat)) |
| `StatusStartingTime` | Tidspunkt teneste er lagt til på tillitslista, Digdir legg inn dette som standard |
 
Nye EAA-utstederar vert registrert med `ServiceTypeIdentifier` sett til `http://uri.etsi.org/TrstSvc/Svctype/EAA`.

Andre utstedartypar følger same struktur, men med tilhøyrande `ServiceTypeIdentifier` i samsvar med [ETSI TS 119 612](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf).

Send nødvendig informasjon til [servicedesk@digdir.no](mailto:servicedesk@digdir.no), så legg Digdir inn oppføringa.