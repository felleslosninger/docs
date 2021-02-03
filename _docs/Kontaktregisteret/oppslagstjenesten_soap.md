---
title: Oppslagstjenesten SOAP
description: SOAP-grensesnittet går ut og brukes ikke for nye integrasjoner! Bruk REST-grensesnittet for å sette opp nye integrasjoner mot KRR
summary:
permalink: oppslagstjenesten_soap.html
sidebar: main_sidebar
product: KRR
---

```
OBS! SOAP-grensesnittet går ut og brukes ikke for nye integrasjoner! Bruk REST-grensesnittet for å 
sette opp nye integrasjoner mot KRR
```

Gå til [Oppslagstjenesten REST](oppslagstjenesten_rest.html) 

**Oppslagstjenesten** gir offentlig forvaltning tilgang til innbyggers registrerte kontaktinformasjon (sikkerpostadresse, e-postadresse og mobilnummer). Tjenesten kan benyttes av offentlige virksomheter og virksomheter som utfører tjenester på vegne av det offentlige. Tjenesten er en overbygning på eksisterende registre for forvaltningens elektroniske kommunikasjon, i første omgang kontakt- og reservasjonsregisteret. På sikt kan oppslagstjenesten også gi tilgang til andre registre. 

**Kontakt- og reservasjonsregisteret** inneholder informasjon om: 

* innbyggere har reservert seg mot digital kommunikasjon mot det offentlige eller ikke
* foretrukket e-postadresse, mobilnummer og sikker digital postkasse  

Registrering og oppdatering av informasjonen ligger til de ulike registrene og er ikke en del av oppslagstjenesten.  

### Tjenesteoversikt

Kontakt- og reservasjonsregisteret tilbyr følgende **standardtjenester:**

| Funksjonalitet | Teknisk grensesnitt | 
| --- | --- |
| Oppslag av en eller flere innbyggere | Webservice | 
| Oppslag av sertifikat for printleverandør | Webservice/SFTP | 
| Administrasjon av egen informasjon | Lenketjeneste | 
| Tjeneste for reservasjon | Lenketjeneste | 
| Tjeneste for å velge digital postkasse | Lenketjeneste | 
| | | 

En av disse tjenestene er utlevering av **digital kontaktinformasjon via ID-porten:**

| Funksjonalitet | Teknisk grensesnitt | 
| --- | --- |
| Utlevering av digital kontaktinformasjon via ID-porten | ID-porten / SAML2 | 
| | | 

Ved innlogging i ID-porten, kan informasjon fra kontakt- og reservasjonsregisteret utleveres til de virksomheter som har tatt i bruk registeret og i tillegg ber om å få denne informasjonen gjennom ID-porten.

For mer informasjon henvises det til integrasjonsguiden for ID-porten.

### Aktører

| Aktør | Beskrivelse | 
| --- | --- | 
| Sentralforvalter |Digitaliseringsdirektoratet er forvalter av oppslagstjenesten | 
| Offentlig virksomhet | Virksomhet som henter kontaktinformasjon fra oppslagstjenesten. Kan være representert av en teknisk tjenesteleverandør. | 
| Innbygger | Person som har registrert opplysning i kontaktregisteret. Også omtalt som person. | 
| ID-porten | Felleskomponent for autentisering i offentlig sektor.

Brukes for å påse at innbyggere holder informasjon tilgjengeliggjort via oppslagstjenesten oppdatert.

Kan videreformidle informasjon fra oppslagstjenesten til offentlig virksomhet. | 
| MinID | Felleskomponent for autentisering på nivå 3 i offentlig sektor. Benytter oppslagstjenesten. | 
| Tjenesteleverandør | Privat virksomhet som leverer tjenester på vegne av en offentlig virksomhet. | 
| Printleverandør | Leverandør av print- og forsendelsestjeneste i Sikker Digital Post.  | 
| | |

### Oppslag av sertifikat for printleverandør 

Kontakt- og reservasjonsregisteret forvalter alle sertifikat nødvendig for å kryptere sikker post til Innbygger. Dette gjelder både for digital post til Innbygger sin digitale postkasse, men også for fysisk post sendt til print og forsendelsesleverandør i sikker digital post. For bruk av denne tjenesten er det behov for å kryptere posten med printleverandør sitt offentlige sertifikat og ikke innbygger sitt sertifikat. 

Denne tjenesten gir offentlig virksomhet tilgang til printleverandør sitt sertifikat for kryptering av post.



***

## Hvordan få tilgang til oppslagstjenesten? 

**Kontakt oss**
Les mer på <http://samarbeid.digdir.no> eller ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a> for å få hjelp med å ta i bruk kontakt- og reservasjonsregisteret. Da vil du kunne få den mest oppdaterte informasjonen.

Følgende må gjøres før din virksomhet kan ta i bruk oppslagstjenesten:

**Merkantile krav:**
* Bruksvilkår forDigitaliseringsdirektoratets  felleskomponenter og spesielle bruksvilkår for kontakt- og reservasjonsregisteret må aksepteres.
* Kontaktpersoner hos virksomhet og eventuelt tjenesteleverandører må være registrert i samarbeidsportalen.
* Virksomheten må bidra med informasjon til årshjulet for forvaltningen av kontaktregisteret.

**Tekniske krav:**
* Anskaffe virksomhetssertifikat for virksomhetens organisasjonsnummer.
* Verifikasjonstest av integrasjonen må være gjennomført i et verifikasjonsmiljø.
* Produksjonssetting må planlegges og koordineres opp mot andre virksomheters bruk av kontakt- og reservasjonsregisteret.

### Informasjon som må utveksles

Følgende må oppgis/avtales før man kan ta i brukt kontakt- og reservasjonsregisteret:

| --- | --- |
| Organisasjonsnummer for virksomheten | Dette må være det organisasjonsnummeret som ligger i virksomhetssertifikatet brukt i forbindelse med oppslag mot oppslagstjenesten. | 
| | | 

All informasjon utveksles over e-post til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

### Datamodell

Datamodellen og alle begrep brukt i tjenesten er dokumentert i begrepskatalogen. Denne datamodellen brukes både i webservicetjenesten og i fil-grensesnittet.

### Referanseklienter 

Klientbibliotek for .Net og referanseimplementasjon i Java for oppslagstjenestens webservicegrensesnitt er tilgjengelig på [GitHub](https://github.com/difi)

[Se også .NET klient for oppslagstjenesten](http://difi.github.io/oppslagstjeneste-klient-dotnet/v5.3/)

### Webservicegrensesnitt 

Teknisk dokumentasjon knyttet til tjenesten finnes i [begrepskatalogen](http://begrep.difi.no/Oppslagstjenesten/)

### Teknisk beskrivelse

Følgende diagram beskriver meldingsstrukturen for webservice responsen fra oppslagstjenesten:
![](/oppslagstjenesten-integrasjonsguide/assets/images/http_envelope.bmp "diagram for meldingsstrukturen for webservice")

Følgende sekvensdiagram beskriver teknisk hvordan forespørsel og respons blir behandlet:

![](/oppslagstjenesten-integrasjonsguide/assets/images/sekvensdiagram.bmp "hvordan forespørsel og respons blir behandlet")

Følgende punktliste beskriver grensesnittet for versjon 5 i mer detalj:

* Bruk av enveis HTTPS for å kryptere trafikken
* Bruk av WS-Security
* Forventede WSSecurityelementer i innkommende meldinger (client): 
	- Signature, Timestamp, BinarySecurityToken
	- Det kreves at både Timestamp og Body tag er signert.
	- Signeringsalgoritme skal vere http://www.w3.org/2001/04/xmldsig-more#rsa-sha256. 
	- Fingeravtrykksalgoritmen i referansene skal være http://www.w3.org/2001/04/xmlenc#sha256
	- Signeringssertifikatet skal representeres som et BinarySecurityToken
* Anvendte WSSecurityelementer i utgående meldinger (server)
	- Encryption, Signature, SignatureConfirmation, Timestamp
	- AES-256 (http://www.w3.org/2001/04/xmlenc#aes256-cbc)
	- Kryptering av body 
		- Kryptert med virksomhetens public key brukt i request
	- Signeringsalgoritmen er http://www.w3.org/2001/04/xmldsig-more#rsa-sha256.
* Fingeravtrykksalgoritmen er http://www.w3.org/2001/04/xmlenc#sha256Security Token: X509 sertifikater (virksomhetssertifikater)
* Sertifikat for validering av signatur skal inkluderes i SOAP header
* Time-to-live: 60 sekunder
* Støttede CanonicalizationMethod-metoder i innkommende meldinger (client):
	- http://www.w3.org/TR/2001/REC-xml-c14n-20010315
	- http://www.w3.org/2001/10/REC-xml-c14n-20010315#WithComments
	- http://www.w3.org/2001/10/xml-exc-c14n#
	- http://www.w3.org/2001/10/xml-exc-c14n#WithComments
* Støttede Key Identifier typer i innkommende meldinger (client):
	- Kun: http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3
Se for øvrig eksempel-SOAP-responser som er vedlagt dokumentasjonen.

For tilgang til denne tjenesten skal det brukes et virksomhetssertifikat i produksjonsmiljøet, mens det i test kan brukes testvirksomhetssertifikater utstedt av godkjente utstedere. 

Samme sertifikat brukes for både signering og dekryptering.

### Komprimering av respons
Klienter av oppslagstjenesten anbefales som standard og alltid å be om at responsen blir komprimert. Dette anbefales da det vil redusere datamengden som overføres betydelig. 

Dette er spesielt viktig for forespørsler om mange brukere og om endringer der responsen kan være stor. Så for disse forespørslene SKAL klienten sette http header for komprimering.

Klienten ber om at responsen komprimeres ved å sette følgende http header:

```
Accept: gzip, deflate
```

### Miljø

| Miljø | Beskrivelse | Lenke | 
| --- | --- | --- | 
| Ver1 | Lik som produksjon | https://kontaktinfo-ws-ver1.difi.no/kontaktinfo-external/ws-v5 | 
| Ver2 | Inneholder siste versjon under utvikling | https://kontaktinfo-ws-ver2.difi.no/kontaktinfo-external/ws-v5 |
| Produksjon | | https://kontaktinfo-ws.difi.no/kontaktinfo-external/ws-v5 |
| | | | 

I tillegg fins det to miljøer for ytelsestesting. Bruk av disse miljøene må koordineres med andre offentlige virksomheter, og derfor kreverDigitaliseringsdirektoratet at ytelsestester skal bestilles via <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

Miljøene er:

| Miljø | Beskrivelse | Lenke | 
| --- | --- | --- |
| Ytelsetest1 | Lik som produksjon | https://kontaktinfo-ws-yt1.difi.no/kontaktinfo-external/ws-v5 | 
| Ytelsetest2 | Inneholder siste versjon under utvikling | https://kontaktinfo-ws-yt2.difi.no/kontaktinfo-external/ws-v5 | 
| | | | 

Miljøene er tilgjengelig over internett. IP-adressen finnes ved å slå opp DNS-adressen for hvert miljø. Portnummeret er standard port for HTTPS, port: 443.

Alle miljø er etablerte, og teknisk oppkobling fra offentlige virksomheter kan etableres ved å ta kontakt med <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>. 

*** 

## Teknisk: Hvordan få tilgang

### Forespørsel: HentPersoner

I forespørselen til tjenesten spesifiserer offentlig virksomhet hvilken metode som kalles og hvilken informasjon som ønskes utlevert.

Eksempel på henting av person(er): 

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="
http://kontaktinfo.difi.no/wsdl/oppslagstjeneste-16-02
">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:HentPersonerForespoersel>
         <ns:informasjonsbehov>Kontaktinfo</ns:informasjonsbehov>
<ns:informasjonsbehov>Sertifikat</ns:informasjonsbehov>
<ns:informasjonsbehov>SikkerDigitalPost</ns:informasjonsbehov>
         <ns:personidentifikator>01013355300</ns:personidentifikator>
         <ns:personidentifikator>01013355491</ns:personidentifikator>
<ns:personidentifikator>01013356366</ns:personidentifikator>
      </ns:HentPersonerForespoersel>
   </soapenv:Body>
</soapenv:Envelope>
```

[Ved informasjonsbehov](http://begrep.difi.no/Oppslagstjenesten/HentPersonerForespoersel.html)

### Respons: HentPersoner

Forespørselen til oppslagstjenesten har som input et antall fødselsnummer.  Responsen inneholder det samme antall person-elementer som gitt input. For fødselsnummer som ikke finnes i registeret, returneres IKKE_REGISTRERT.  

Under er et eksempel på et resultat fra oppslagstjenesten etter at responsen er dekryptert:

```
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header/>
   <SOAP-ENV:Body>
      <ns3:HentPersonerRespons xmlns:ns2="http://begrep.difi.no" xmlns:ns3="
http://kontaktinfo.difi.no/wsdl/oppslagstjeneste-16-02
">
 <ns2:Person>
<ns2:personidentifikator>01013355300</ns2:personidentifikator>
            <ns2:reservasjon>NEI</ns2:reservasjon>
            <ns2:status>AKTIV</ns2:status>
            <ns2:Kontaktinformasjon>
               <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
               <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01013355300_test@minid.difi.no</ns2:Epostadresse>
            </ns2:Kontaktinformasjon>
            <ns2:SikkerDigitalPostAdresse>
<ns2:postkasseadresse>1</ns2:postkasseadresse>
<ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
            </ns2:SikkerDigitalPostAdresse>
            <ns2:X509Certificate>MIIC2jCCAkMC...<ns2:X509Certificate>
         </ns2:Person>
         <ns2:Person>
            <ns2:personidentifikator>01013355491</ns2:personidentifikator>
            <ns2:reservasjon>NEI</ns2:reservasjon>
            <ns2:status>AKTIV</ns2:status>
            <ns2:Kontaktinformasjon>
            <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
             <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01013355491_test@minid.difi.no</ns2:Epostadresse>
            </ns2:Kontaktinformasjon>
            <ns2:SikkerDigitalPostAdresse>
               <ns2:postkasseadresse>1</ns2:postkasseadresse>
               <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
            </ns2:SikkerDigitalPostAdresse>
            <ns2:X509Certificate>MIIC2jCCAk...</ns2:X509Certificate>
         </ns2:Person>
         <ns2:Person>
            <ns2:personidentifikator>01013356366</ns2:personidentifikator>
            <ns2:reservasjon>NEI</ns2:reservasjon>
            <ns2:status>AKTIV</ns2:status>
            <ns2:Kontaktinformasjon>
               <ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
               <ns2:Epostadresse sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">01013356366_test@minid.difi.no</ns2:Epostadresse>
            </ns2:Kontaktinformasjon>
            <ns2:SikkerDigitalPostAdresse>
               <ns2:postkasseadresse>1</ns2:postkasseadresse>
               <ns2:postkasseleverandoerAdresse>012345678</ns2:postkasseleverandoerAdresse>
            </ns2:SikkerDigitalPostAdresse>
            <ns2:X509Certificate>MIIC2jCCAkMCAg38MA0GCSqGSIb3...</ns2:X509Certificate>
         </ns2:Person>
      </ns3:HentPersonerRespons>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

### Forespørsel: HentPrintSertifikat

Forespørselen har ingen input. Eksempel på forespørsel.

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
   <soapenv:Header/>
   <soapenv:Body>
      <ns:HentPrintSertifikatForespoersel/>
   </soapenv:Body>
</soapenv:Envelope>
```

### Respons: HentPrintSertifikat

Eksempel på respons:

```
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header/>
   <SOAP-ENV:Body>
      <ns2:HentPrintSertifikatRespons xmlns:ns2="http://kontaktinfo.difi.no/xsd/oppslagstjeneste/14-05">
         <ns2:postkasseleverandorAdresse>printserveradresse</ns2:postkasseleverandorAdresse> <ns2:X509Certificate>MIIC2jCCAk..</ns2:X509Certificate>
      </ns2:HentPrintSertifikatRespons>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

### Egendefinert SOAP header: paaVegneAv

Oppslagstjenesten v5 har mulighet for å legge autorisasjon på den enkelte tjeneste (hentPersoner, hentPrintsertifikat, hentEndringer) og støtte for at databehandler opptrer på vegne av en eller flere behandlingsansvarlige.


Tilgang for en tjeneste gis da ved relasjonen mellom organisasjonsnummer i virksomhetssertifikatet, - paaVegneAv-organisasjonsnummeret og tjenesten. OPPSLAGSTJENESTEN gir tilgang til {hentPersoner, hentPrintSertifikat} og ENDRINGSTJENESTEN gir tilgang til {hentEndringer}. Når «paaVegneAv» ikke er oppgitt, gis tilgang ved relasjonen <orgnr-i-virksomhetssertifikat, orgnr-i-virksomhetssertifikat, tjeneste>.

Eksempel:

```
<Oppslagstjenesten xmlns="http://kontaktinfo.difi.no/wsdl/oppslagstjeneste-16-02">
        <PaaVegneAv>991825827</PaaVegneAv>
   </Oppslagstjenesten>
```

### Feilhåndtering

Ved feilsituasjoner vil tjenestene returnere en Soap-fault med feilkode enten Client eller Server. *Client* vil typisk være en request som ikke validerer. Server vil være en systemfeil, som vil ha en Difi-generert feilkode og en feilmelding i faultString-elementet, ref. eksempelet under:

Feilmeldingene blir returnert som standard SOAP-fault uten noen WS-security-header, og er dermed verken kryptert eller signert slik som andre meldinger er. Dette er fordi feilmeldingene ikke inneholder informasjon som må integritets- eller konfidensialitetsbeskyttes, samt fordi noen feilsituasjoner gjør det umulig å kryptere og/eller signere feilmeldingen. I de tilfeller hvor dette lar seg gjøre vil feilmeldingen være beskrivende. Virksomheten vil i mange tilfeller selv kunne feilsøke via denne feilmeldingen

```
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header/>
   <SOAP-ENV:Body>
      <SOAP-ENV:Fault>
         <faultcode>SOAP-ENV:Server</faultcode>
         <faultstring xml:lang="en">[U-1000] Some error message</faultstring>
      </SOAP-ENV:Fault>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

***

### Lenketjenester

Innbyggere/personer tilbys tre lenketjenester i forbindelse med kontakt- og reservasjonsregisteret: 
* Administrasjon av egen informasjon
* Tjeneste for reservasjon
* Tjeneste for å velge digital postkasse

### Administrasjon av egen informasjon

Denne tjenesten er å finne i verifikasjonsmiljøene. 

| Miljø | Lenke | 
| --- | --- | 
| Verifikasjon1 | https://brukerprofil-ver1.difi.no/minprofil/ | 
| Verifikasjon2 | https://brukerprofil-ver2.difi.no/minprofil/ | 
| Produksjon | https://brukerprofil.difi.no/minprofil | 
| | | 

Offentlige virksomheter kan lenke til brukerprofilen slik at innbyggerne kan oppdatere egen kontaktinformasjon.

### Input data

Tjenesten har følgende http request parameter som kan brukes:

| Request parameter | Beskrivelse | 
| --- | --- | 
| Goto | Lenke (URL) til tjeneste hos offentlig virksomhet som innbygger skal bli sendt tilbake til. | 
| Showlogout | Boolean parameter for om innbygger skal bli vist utloggingslenke eller ikke. | 
| | | 

**Merk:**
* **Ingen av parameterne er påkrevd**
	- Dersom ingenting sendes inn, vil lenketjenesten lenke til Logg ut i ID-porten.
* Om man sender med en goto url som returnerer til en side som ikke krever at man er innlogget, bør også showlogout=true være satt.
* Parameteren må URLencodes.

### Goto 

Eksempel på verdi: http://www.virksomhet.no/tjenesteforinnsendingsomjegvari 

Valideringsregler:
* Gyldig URL med protokoll
* All input skal være lowercase

Standardverdi:

Dersom parameteren ikke er satt, vil lenken gå til Logg ut i ID-porten, og innbygger vil få en informasjonsside om at hun er logget ut, uten videre lenker.

Goto-urlen må utveksles medDigitaliseringsdirektoratet for at lenketjenesten skal fungere. 

### Showlogout

Eksempel på verdi: false

Valideringsregler:
* Gyldige verdier: true/false
* Parametere er ikke case-sensitivt.

Standardverdi: false

Det vil si at innbygger vil bli presentert en knapp/lenke med verdien av goto-parameteret

### Tjeneste for reservasjon

Tjenesten har ingen spesielle input-parametere. Tjenesten finnes her:
* http://www.norge.no
* http://eid.difi.no/nn/reserver-deg-mot-kommunikasjon-pa-nett

### Tjeneste for å velge digital postkasse 

Tjenesten er ikke spesifisert i gjeldende versjon av dokumentet.

### 18-månedersregel

eForvaltningsforskriftens §32 setter krav til at innbyggerens kontaktinformasjon må være «ferskere» enn 18 måneder for at enkeltvedtak og andre viktige brev skal kunne sendes digitalt:

* Dersom opplysninger om den enkelte i register over digital kontaktinformasjon og reservasjon ikke har blitt oppdatert eller bekreftet at er korrekte de siste 18 månedene, skal opplysningene ikke brukes til å varsle vedkommende etter § 8 tredje ledd. * 

Dette betyr at brudd på § 32 andre ledd vil utgjøre saksbehandlingsfeil i den sak varselet ble sendt. Feilen vil medføre risiko for at innbyggeren lider rettstap, for eksempel ved at varsel om enkeltvedtak blir sendt til en e-postadresse som ikke lenger er i bruk.

Det er den enkelte virksomhet sitt ansvar å overholde §32, og **Digitaliseringsdirektoratet sin klare anbefaling er at virksomhetene sjekker datofeltene som følger med kontaktinformasjonen. ** Så lenge ett av datofeltene sistOppdatert eller sistVerifisert er nyere enn 18 mnd, kan kontaktinformasjonen brukes til varsling etter §8. Merk at datoene kan være forskjellig mellom mobil og epost, slik at for eksempel epost kan være utløpt, mens mobil fremdeles er aktivt. Varsling kan da ikke sendes til epost. 
Vi tror det beste er at fagsystemet/integrasjonen gjør denne kontrollen automatisk for saksbehandler, slik at man sikrer at vedtak ikke blir sendt feil.

Samtidig kan kontaktinformasjon som er utløpt, fremdeles brukes til å sende servicemeldinger både av alvorlig og mindre alvorlig karakter, som for eksempel om snøbrøyting i gata, eller krav om koking av vann pga akutt forurensing. Digitaliseringsdirektoratet kan derfor ikke la være å utlevere utløpt kontaktinformasjon gjennom Oppslagstjenesten.

### Informasjon "Varslingsstatus"

(Introdusert i oppslagstjenesten v5)

VarslingsStatus angir om Person kan varsles ihht eForvaltningsforskriften §32. Dette informasjonsbehovet trigger filtrering i Oppslagstjenesten, dvs. Kontaktinformasjon, Sertifikat og SikkerDigitalPost på personer med utgått kontaktinformasjon vil ikke bli utlevert.

```
<ns:HentPersonerForespoersel>
 <ns:informasjonsbehov>Kontaktinfo</ns:informasjonsbehov>
<ns:informasjonsbehov>VarslingsStatus</ns:informasjonsbehov>
  <ns:personidentifikator>01013355300</ns:personidentifikator>
</ns:HentPersonerForespoersel>
```

Oppslagstjenesten for Kontakt- og Reservasjonsregisteret er en webservice, sikret med WS-security. Det må benyttes virksomhetssertifikater iht rammeverket for PKI i offentlig sektor for å få tilgang. 

***

