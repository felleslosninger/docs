---
title: Om ID-porten
description: Om ID-porten
permalink: idporten_index.html
product: ID-porten

---

* TOC
{:toc}

ID-porten er en felles innloggingsløsning til offentlige tjenester på internett. Gjennom Digitaliseringsrundskrivet er statlige virksomheter instruert om å ta i bruk ID-porten for «digitale tjenester som krever innlogging og autentisering».

### Hvordan få tilgang til ID-porten
* Se samarbeidsportalen for oppdatert informasjon om ID-porten <http://samarbeid.difi.no>


#### **Den første kontakten**
Se Samarbeidsportalen for mer informasjon.

#### **Akseptere bruksvilkår**
Bruksvilkår må aksepteres av kunden. Dette gjøres på Samarbeidsportalen.

#### **Planlegging**
Se Samarbeidsportalen for mer informasjon.

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




#### **Annen informasjon**

Under er et eksempel på hvilken informasjon som trengs i tillegg til klientoppsettet.

| Info | Eksempel  | Beskrivelse |
| --- | --- | --- |

| Navn på tjenesten | Norsk data og eksempelforening | Dette blir brukt av ID-porten under innlogging og beskriver tjenesteeier til innbyggeren i ulike sammenhenger. |
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


