---
title: Hvordan få tilgang til ID-porten
description: Hvordan få tilgang til ID-porten
summary:

sidebar: saml_idporten_sidebar
product: ID-porten
redirect_from: /saml_tilgang
---

```
OBS!  SAML vil på sikt fases ut i ID-porten. Ved nye integrasjoner ber vi om at OpenID Connect benyttes.
```
[OpenID Connect (OIDC)]({{site.baseurl}}/docs/idporten/oidc/)



### Hvordan få tilgang til ID-porten

Følg prosessen på [Samarbeidsportalen](https://samarbeid.digdir.no) for å integrere en SAML-integrasjon i ID-porten.


### Informasjon som må utveksles

Tjenesteeier må utlevere følgende tekniske informasjon til ID-porten:
* Metadatafil for SAML2-føderasjon
* Logo

ID-porten vil utlevere følgende tekniske informasjon til tjenesteeier:
* Metadatafiler for verifikasjons- og produksjonsmiljø, inkludert public-nøkler
* Testbrukere til verifikasjonsmiljø

#### **Metadata om SAML2-integrasjon**

Informasjon om huben og nodene utveksles i form av XML-filer med metadata i henhold til SAML2-standarden. Dette er en toveis kommunikasjon, så tjenesteleverandør må konfigurere sin egen programvare med XML-fil fra ID-porten, og sende sin egen konfigurasjonsfil til ID-porten.

Disse filene inneholder alle detaljene om lokasjonen for SAML2 endepunktene, og hvilke bindinger som er tilgjengelige. Et eksempel på en slik metadatafil finner du [her.]({{site.baseurl}}/docs/idporten/saml/saml_metadata#eksempel-på-metadatafil)
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
| REFERRING_SP | Eksempel_202 | Denne parameteren blir kun brukt ved [bruk av onBehalfOf]({{site.baseurl}}/docs/idporten/saml/saml_teknisk_innlogging#overføring-av-informasjon-om-tjenesteeier-for-leverandører) |
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
