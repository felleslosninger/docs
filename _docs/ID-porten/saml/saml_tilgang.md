---
title: Hvordan få tilgang til ID-porten
description: Hvordan få tilgang til ID-porten
summary: "Ta kontakt med oss på idporten@difi.no for å komme i gang!"
permalink: saml_tilgang.html
sidebar: saml_idporten_sidebar
product: ID-porten
---

### Hvordan få tilgang til ID-porten

Det er rutinene for å etablere en ny integrasjon mot ID-porten.
* Ta kontakt med oss på <idporten@difi.no>
* Se samarbeidsportalen for oppdatert informasjon om ID-porten <http://samarbeid.difi.no>

### Rutine for tilgang

Dette er svært individuelt hvor lang prosessen er fra første dialog med ny tjenesteeier til ny tjeneste er i produksjon.

![](/felleslosninger/images/idporten/saml/rutine_for_tilgang.bmp?raw=true "Rutine for tilgang")


#### **Den første kontakten**

Ta kontakt med <idporten@difi.no> med informasjon om prosjekt, kontaktpersoner og tidsplaner.

Tjenesteeiere og tjenesteleverandører må oppgi navn, epost-adresse og telefonnummer til en kontaktperson som er representant for integrering mot føderasjonen. Om denne personen byttes ut, for eksempel på grunn av bytte av jobb, er det deres ansvar å oppdatere Difi med korrekt kontaktinformasjon. Det henvises ellers til samarbeidsportalen for mer informasjon.

#### **Akseptere bruksvilkår**

Tjenesteeier må akseptere bruksvilkår. Dette gjøres på samarbeidsportalen.

#### **Planlegging**

Følgende punkter bør  være en del av planleggingen.
* Tidsplan
* Produksjonsplan
* Beskrivelse av tjenesten
* Forventninger omkring volum og bruk, herunder eventuelle høy-trafikkperioder
* Påvirkning på ID-porten sin brukerstøtte

Omfanget på planleggingsarbeidet er svært varierende og er påvirket av omfanget av tjenesten. Planleggingen gjøres i samarbeid med Difi.

#### **Etablere integrasjon i verifikasjonsmiljø**

Føderering i verifikasjonsmiljøet utføres på samme måte som i produksjon.

Se hvilken informasjon som må oversendes Difi for å etablere integrasjonen med ID-porten lenger nede under [Informasjon som må utveksles](https://difi.github.io/idporten-integrasjonsguide/1_tilgang_til_idporten#informasjon-som-må-utveksles). Se ellers 
[Detaljert beskrivelse av teknisk løsning.](https://difi.github.io/idporten-integrasjonsguide//4_detaljert_beskrivelse.html)

#### **Utføre verifikasjonstest**

Difi krever at tjenester som skal beskyttes av ID-porten må gjennom et verifikasjonsløp før tjenesten kan produksjonssettes. Det er derfor nødvendig at tjenesteleverandør fødererer en testbasert versjon av sin tjeneste med Difi sitt verifikasjonsmiljø. Her skal det kun benyttes fiktive data, og ikke reelle brukere. Ved test av varsling pr sms og/eller e-post må tjenesteleverandør passe på at en bruker egnet kontaktinformasjon da varslingen sender ut reelle meldinger til eieren av kontaktinformasjonen.

Difi har etablert et standardsett av tester for verifisering og godkjenning av integrasjon mot ID-porten. Tjenesteleverandør skal utføre denne og bekrefte til Difi at testing er utført ok.  [Les om verifikasjonstester ](https://difi.github.io/idporten-integrasjonsguide//96_verifikasjonstest.html)

#### **Produksjonssetting**

Før produksjonssetting må bruksvilkår være akseptert. 

Videre må tjenesteeier ha anskaffet et virksomhetssertifikat fra utsteder autorisert av Nasjonal kommunikasjonsmyndighet (NKOM). [Les mer om virksomhetssertifikat her](https://difi.github.io/idporten-integrasjonsguide//5_sikkerhet.html#sertifikatkrav). I verifikasjonsmiljøet kan en bruke selv-signerte sertifikater.

Før produksjonssetting må teknisk informasjon være utvekslet, og en detaljert plan for produksjonssettingen må være levert Difi.

### Informasjon som må utveksles

Tjenesteeier må utlevere følgende tekniske informasjon til ID-porten:
* Metadatafil for SAML2-føderasjon
* Logo

ID-porten vil utlevere følgende tekniske informasjon til tjenesteeier:
* Metadatafiler for verifikasjons- og produksjonsmiljø, inkludert public-nøkler
* Testbrukere til verifikasjonsmiljø

#### **Metadata om SAML2-integrasjon**

Informasjon om huben og nodene utveksles i form av XML-filer med metadata i henhold til SAML2-standarden. Dette er en toveis kommunikasjon, så tjenesteleverandør må konfigurere sin egen programvare med XML-fil fra ID-porten, og sende sin egen konfigurasjonsfil til ID-porten. 

Disse filene inneholder alle detaljene om lokasjonen for SAML2 endepunktene, og hvilke bindinger som er tilgjengelige. Et eksempel på en slik metadatafil finner du [her.](https://difi.github.io/idporten-integrasjonsguide//91_metadata_og_mer_saml.html#eksempel-på-metadatafil)
Påse at følgende parametere er satt til **TRUE:**

| Attributt og verdi | Beskrivelse |
| --- | --- |
| AuthnRequestsSigned="true" | Dette vil si at tjenesteleverandør vil signere sine autentiseringsforespørsler. Signering av ArtifactResolve-forespørsel og SingleLogout må også håndteres av tjenesteleverandør.  |
| WantAssertionsSigned="true" | Dette vil si at tjenesteleverandør krever å få Assertion signert.  Kryptering vil bli håndtert av ID-porten. |
| | | 
 
Filene anbefales navngitt som følger: *[EntityID]_[Meta].xml.* EntityID er et attributt i rotelementet ”EntityDescriptor”, og brukes til å identifisere tjenesten som xml-filen beskriver. 

#### **Annen informasjon**

Under er et eksempel på hvilken informasjon som trengs i tillegg til informasjonen i SAML2-integrasjonen

| Parameter | Eksempel verdi | Beskrivelse |
| --- | --- | --- |
| ENTITY_ID | eksempel_101 | Dette feltet **må** være lik entityID i metadatafilen. Entity_ID kan bestemmes selv, men må være unik. |
| NAME | Norsk data og eksempelforening | Dette blir brukt av ID-porten under innlogging og beskriver tjenesteeier til innbyggeren i ulike sammenhenger. |
| URL | https://www.eksempel.no | Dette er URL til tjenesteleverandør som benyttes for å rute innbyggeren tilbake til tjenesteleverandør ved avbryting av innlogging eller feilsituasjoner. |
| REFERRING_SP | Eksempel_202 | Denne parameteren blir kun brukt ved [bruk av onBehalfOf](https://difi.github.io/idporten-integrasjonsguide//3_teknisk_innlogging.html#overføring-av-informasjon-om-tjenesteeier-for-leverandører) | 
| DIGITALCONTACTINFO_NAME | NorskDataForeningProd | Denne parameteren blir kun brukt for tjenesteeiere som har tatt i bruk kontakt- og reservasjonsregisteret.  Navnet er det unike navnet som tjenesteeier bruker for oppslag mot kontakt- og reservasjonsregisteret sin webservice. | 
| | | | 
 
Dette gjelder per integrasjon man har med ID-porten. Om man har flere integrasjoner, kan disse ha ulike verdier.

#### **Logo-format**

Logoen må oppfylle følgende krav:

| --- | --- |
| Filformat | .png .jpg eller .gif |
| Størrelse | Maksimal høyre 90 pixel og en bredde som ikke bør overskride 135 pixel. | 
| Farge | Bakgrunnsfargen på ID-porten er #f3f4f4, så logoen bør enten ha denne bakgrunnsfargen eller eventuelt ha transparent bakgrunn. |
| | | 


