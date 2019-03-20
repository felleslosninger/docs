---
title: Detaljert beskrivelse av støttede SAML2-profiler
description: Detaljert beskrivelse av støttede SAML2-profiler
summary: "Detaljert beskrivelse av støttede SAML2-profiler"
permalink: saml_stottede_profiler.html
sidebar: saml_idporten_sidebar
product: ID-porten
---

SAML2-profilene som her presenteres er med utgangspunkt i [eGov versjon 1.5.](http://www.projectliberty.org/liberty/content/download/4711/32210/file/L iberty_Alliance_eGov_Profile_1.5_Final.pdf)

### SAML2-profiler

Følgende profiler støttes:
* Web Browser SSO Profile med HTTP Redirect (request) og artifact resolution over SOAP binding (respons) 
* Web Browser SSO Profile med HTTP Redirect (request) og POST Binding (respons)
* Single Logout Profile med HTTP Redirect

Følgende “modes” vil være støttet:
* ID-porten initiert SSO.
* SP initiert SSO.
* ID-porten initiert SLO.
* SP initiert SLO.

### SAML2-bindings

Følgende valg støttes for SAML2-bindings:
* SSO request binding: HTTP Redirect.
* SSO response binding: Artifact resolution over SOAP. (“HTTP-Artifact")
* SSO response binding: HTTP POST (“HTTP-POST”)
* SLO over HTTP Redirect. («HTTP-Redirect»)

### Konfigurering av signering og kryptering

Følgende elementer skal signeres av SP:
* SAML2 assertions
* AuthnRequest, men ikke *Response*
* Ved bruk av Artifact binding: *ArtifactResolve* forespørselen
* Ved bruk av Post binding: Ikke relevant
* Single Logout request og response

Og ID-porten vil selv signere:
* Ved Artifact binding: Artifact response - som inneholder ett kryptert Assertion-element
* Ved Post binding: *Response* - Som inneholder ett kryptert Assertion-element
* SingleLogout request
* SingleLogout response

### Web Browser SSO

Følgende regelsett gjelder for SSO profilen i ID-porten:
* SSO-profil i [SAMLProf](www.oasis-open.org/committees/security/) må være støttet av både tjenesteleverandør og ID-porten. Både IdP- og SP-initiert metode er støttet i denne versjon av ID-porten.

#### **Authentication Request**

* _Må_ kommuniseres via brukerens nettleser
* *ForceAuthn* støttes av ID-porten. Det _kan_ bli brukt til å få ID-porten til å tvinge brukeren til å reautentisere seg.
* *AuthnRequest* _må_ signeres.
* *NameIDPolicy* støttes av ID-porten, både formatene *persistent* og *transient*.
* *RequestedAuthnContext* _må_ støttes. ID-porten gjenkjenner sammenligningsfelter og evaluerer de forespurte kontekstklassene.
* *RequestedAuthnContext* _bør_ inneholde attributtet *Comparison*, og *Comparison* _skal_ være satt til *minimum*. ID-porten vil tolke alle forespørsler til *minimum* og at *AuthnContextClassRef* er urn:oasis:names:tc:SAML:2.0:ac:classes:Unspecified om elementet ikke er inkludert i forespørselen.
* *AuthnRequest* kan inneholde *samlp:Extensions*. 

Følgende *samlp:Extensions* støttes av ID-porten:
* *idpe:OnBehalfOf* Unik identifikator av tjenesteeier. _Må_ kun inneholde følgende tegn: A-Z a-z 0-9  [se XSD-skjema.](https://difi.github.io/idporten-integrasjonsguide//91_metadata_og_mer_saml.html#saml-extension) ID og navnekonvensjon blir satt i samråd med Difi.

#### **Overstyring av NameID**

Tjenesteleverandør kan styre format på NameID ved bruk av NameIDPolicy i AuthnRequest-meldingen. Dette betyr at tjenesteleverandør kan overstyre en tidligere mottatt persistent identifikator ved å oppgi ønske om transient identifikator i autentiseringsforespørselen.
* IDP Authentication Response - "Assertion" _må_ krypteres og signeres.

#### **Assertion**

* Assertion _må_ krypteres og signeres.
* _Må_ ha en *AuthnStatement* verdi. ”SessionIndex” parameter _må_ være tilstede, og “SessionNotOnOrAfter” _må_ _ikke_ være tilstede.
* _Må_ støtte *AttributeStatement* og _kan_ inneholde opptil en *AttributeStatement*.
* _Må_ støtte “NameFormat” av *Attribute* verdier lik “basic”, “uri” og “unspecified”.
* *AttributeStatement* _må_ bruke *Attribute* og _må ikke_ bruke *EncryptedAttribute*.
* *SubjectConfirmationData* attributten NotOnOrAfter _må_ støttes.
* *Conditions* attributtene NotBefore og NotOnOrAfter _må_ støttes.
* *Conditions* elementet *AudienceRestriction* _må_ støttes.

### Artifact resolution protocol

* _må_ kommuniseres over POST eller SOAP beskyttet av SSL/TLS.
* *ArtifactResolve* _må_ signeres.
* *ArtifactResolve* _må_ inneholde en *Artifact* verdi. 
* *ArtifactResponse* _må_ inneholde en *Assertion* som oppfyller kravene til *Assertion* over.
* *Assertion* i *ArtifactResponse* _må_ signeres og krypteres.
* InResponseTo verdi i *Assertion* _må_ være lik verdi i ID-felt i *ArtifactResolve* forespørselen.
* *ArtifactResponse* kan inneholde *Status* og må inneholde *Status* med inntil to *StatusCode* i feilsituasjoner.

#### **ID-porten svarer med ArtifactResponse**

I assertion som sendes tilbake til tjenesteleverandør legger ID-porten med informasjon om autentisert bruker. Dette gjøres i NameID-feltet knyttet til Subject i Assertion. Hvilken verdi som legges her avhenger av Format på NameID-feltet.
* Ved transient format overføres en tilfeldig identifikator som er unik for denne brukeren på denne sesjonen mot denne tjenesteleverandøren.  Identifikatoren kan benyttes ved oppslag mot ID-porten for denne sesjonen for gitt tjenesteleverandør, men vil ikke lenger eksistere når sesjonen opphører.
* Ved persistent format overføres en tilfeldig identifikator som er unik for denne brukeren mot denne tjenesteleverandøren på tvers av alle sesjoner brukeren har mot tjenesteleverandør. Identifikatoren opprettes ved første gangs pålogging for en bruker mot en gitt tjenesteleverandør, og ID-porten tar vare på denne identifikatoren for denne bruker mot gitt tjenesteleverandør for fremtidig bruk.

Om forespørselen er behandlet vellykket, vil responsen oppfylle følgende:
* Issuer elementet kan utelates, men om det inkluderes vil det inneholde en unik angivelse av ID-porten som IdP. Format-attributtet må enten utelates eller ha verdien urn:oasis:names:tc:SAML:2.0:nameid-format:entity.
* En vellykket *Response* vil inneholde nøyaktig en *Assertion* med nøyaktig ett *AuthnStatement* element. Hvert assertions *Issuer* element vil inneholde en unik identifikator som angir ID-porten. Format attributtet vil enten utelates eller ha verdien urn:oasis:names:tc:SAML:2.0:nameid-format:entity. 
* ID-porten signerer og krypterer Assertion. 
* Ved feilmeldinger fra ID-porten vil den ikke returnere en assertion.
* Om ID-porten mottar en forespørsel fra en tjenesteleverandør som den ikke har inngått avtale med, vil forespørselen avvises med en beskrivende responskode. 

Metadata benyttes til å identifisere hvilke tjenesteleverandør avtaler er inngått med.

#### **Status i ArtifactResponse**

ArtifactResponse kan inneholde en *Status* -angivelse og vil inneholde status i de tilfeller håndteringen av forespørselen feiler på ID-porten.  *Status* vil inneholde inntil to *StatusCode* som angir en overordnet og en underordnet feilkode iht. eksempelet under:
```xml
<samlp:Status> 
    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Responder">
      <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:AuthnFailed" />
    </samlp:StatusCode>
    <samlp:StatusMessage>Authentication failed</samlp:StatusMessage>
  <samlp:Status/>
```

Som det vises av eksempelet, kan ID-porten angi en *StatusMessage* som er en tekstmessig indikasjon av feilsituasjonen. Dette er ikke er krav.

```
Følgende overordnede statuskoder kan benyttes i fra ID-porten: 
* urn:oasis:names:tc:SAML:2.0:status:Success – Forespørselen var vellykket.
* urn:oasis:names:tc:SAML:2.0:status:Requester – Forespørselen ble ikke behandlet grunnet en feil hos forespørrende part (SP).
* urn:oasis:names:tc:SAML:2.0:status:Responder – Forespørselen ble ikke behandlet grunnet en feil i ID-porten.
* urn:oasis:names:tc:SAML:2.0:status:VersionMismatch – Forespørselen ble ikke behandlet grunnet feil SAML-versjon i forespørselen.

Følgende underordnede koder kan benyttes til ytterligere spesifisering av feilsituasjonen:
* urn:oasis:names:tc:SAML:2.0:status:AuthnFailed – ID-porten var ikke i stand til å gjennomføre en vellykket autentisering av brukeren.
* urn:oasis:names:tc:SAML:2.0:status:InvalidAttrNameOrValue – Ugyldig innhold ble oppdaget i *saml:Attribute* eller *saml:AttributeValue* elementet.
* urn:oasis:names:tc:SAML:2.0:status:InvalidNameIDPolicy – Ønsket policy er ikke støttet i ID-porten.
* urn:oasis:names:tc:SAML:2.0:status:NoAuthnContext – Angitt autentiseringskontekst kan ikke oppfylles i ID-porten. Kan benyttes til å indikere ulovlig forespurt sikkerhetsnivå. 
* urn:oasis:names:tc:SAML:2.0:status:NoAvailableIDP – Skal ikke være i bruk i ID-porten, som er eneste idp i ID-porten COT.
* urn:oasis:names:tc:SAML:2.0:status:NoPassive – ID-porten tillater ikke passiv pålogging. Denne verdien returneres alltid om dette forespørres.
* urn:oasis:names:tc:SAML:2.0:status:NoSupportedIDP - Kan benyttes til å indikere at en ikke finner en e-ID-leverandør som oppfyller ønsket sikkerhetsnivå, men skal i utgangspunktet ikke være aktuell for bruk i ID-porten.
* urn:oasis:names:tc:SAML:2.0:status:PartialLogout – Benyttes til å indikere at single logout ikke var vellykket (alle sesjoner ble ikke terminert).
* urn:oasis:names:tc:SAML:2.0:status:ProxyCountExceeded – Ikke støttet i ID-porten.
* urn:oasis:names:tc:SAML:2.0:status:RequestDenied – Benyttes i de tilfeller der ID-porten av en eller annen grunn velger å la være å behandle forespørselen. Kan f.eks benyttes ved antatt DOS-angrep.
* urn:oasis:names:tc:SAML:2.0:status:RequestUnsupported – ID-porten støtter ikke/forstår ikke ønsket forespørsel. 
* urn:oasis:names:tc:SAML:2.0:status:RequestVersionDeprecated – ID-porten kan ikke håndtere forespørsler med angitt protokoll-versjon.
* urn:oasis:names:tc:SAML:2.0:status:RequestVersionTooHigh - ID-porten kan ikke håndtere forespørsler med angitt protokoll-versjon..
* urn:oasis:names:tc:SAML:2.0:status:RequestVersionTooLow - ID-porten kan ikke håndtere forespørsler med angitt protokoll-versjon.
* urn:oasis:names:tc:SAML:2.0:status:ResourceNotRecognized – Ressursen angitt i forespørselen er ukjent eller ugyldig.
* urn:oasis:names:tc:SAML:2.0:status:TooManyResponses – Responsen ville inneholdt for mange elementer til at ID-porten kan håndtere det.
* urn:oasis:names:tc:SAML:2.0:status:UnknownAttrProfile – Ikke i bruk i ID-porten.
* urn:oasis:names:tc:SAML:2.0:status:UnknownPrincipal – Brukeren er ikke gjenkjent av ID-porten. Kan komme av at bruker ikke har godtatt vilkår for bruk av ID-porten, eller at dette er en utenlandsk borger.
* urn:oasis:names:tc:SAML:2.0:status:UnsupportedBinding – ID-porten støtter ikke forespurt SAML-binding.
```
### Single Logout

SAML2 støtter konseptet Single Logout og beskriver både en Single Logout protokoll i [SAMLCore](www.oasis-open.org/committees/security/) og en Single Logout profile i [SAMLProf](www.oasis-open.org/committees/security/). Disse gir IDP og SP mulighet til å terminere multiple sesjoner ved å sende *LogoutRequest* og *LogoutResponse* meldinger. På denne måten kan brukeren logge ut fra alle sesjoner som springer ut fra en IDP i noe som for brukeren kan virke som én operasjon.  Brukeren kan initiere prosessen både hos en ønsket SP eller direkte i IdP’en. 
OASIS skiller klart på denne første meldingen og de etterfølgende meldingene. Den første er ønskelig foretatt over en frontkanal, og ID-porten krever at dette er et HTTP redirect kall. Grunnen til dette er at det gir ID-porten mulighet til å samle inn data knyttet til brukerens sesjon, slik som nettleser cookies.

Med andre ord gjelder følgende krav for Single Logout i ID-porten:
* HTTP redirect binding *må* brukes for første kall fra SP til ID-porten.
* HTTP redirect binding *må* benyttes for etterfølgende forespørsler/svar.
* Alle forespørsler og svar skal være signert.

SP må håndtere *LogoutRequest* fra ID-porten for brukere som ikke lenger er innlogget, for eksempel fordi brukeren har logget ut fra denne ene tjenesten tidligere eller fordi levetiden på brukerens sesjon er utløpt. 
* SP-initiert ”Single Logout” og IdP-initiert ”Single Logout” *må* støttes.
* ”Single Logout” binding er HTTP Redirect.
* *LogoutRequest* _må_ signeres.
* *LogoutResponse* _må_ signeres.
* SP _må_ tilby full SLO.

### Metadata 

Valget av metadata-informasjon er i stor grad et implementasjonsvalg. Men alle støttede
SP- og IdP-implementasjoner må støtte korrekt bruk av metadata-elementer, attributter og spesifikasjoner listet i denne seksjonen.

* SP og IdP bør autentisere metadata. 
* _Må_ støtte root-elementene *EntityDescriptor* eller *EntitiesDescriptor*.
* Attributt “validUntil” og “cacheDuration” _må_ støttes.
* Sertifikater i metadata _må_ støttes.
* “Certificate revocation methods of Online Certificate Status Protocol” (OCSP), “Certificate Revocation List” (CRL), “CRL Distribution Point” (CDP) utvidelser _må_ støttes.

**SPSSODescriptor**
* *KeyDescriptor* _må_ støttes.
* *SingleLogOutService> _må_ støttes.
* *AssertionConsumerService> må støttes.
* “WantAssertionSigned” _må_ støttes.
* “AuthnRequestsSigned” _må_ støttes.

#### **SP godkjenner eller avviser forespørsel**

SP skal utføre de sjekker som er påkrevet iht. SAML2-profilen som benyttes. I tillegg må SP sjekke at autentiseringsnivå som returneres fra ID-porten er på et nivå som tjenesten krever. Ved godkjent validering av sesjonsinfo fra ID-porten, opprettes en sesjon for brukeren mot tjenesten. 

Forutsatt at SPs tilgangskontroll aksepterer tilgang fra denne autentiserte brukeren, gis det så tilgang til ønsket tjeneste.

#### **Ikke støttet i ID-porten**

* Identity Provider Discovery profile og IdP Discovery er ikke støttet i ID-porten. ID-porten er eneste IDP
* Attribute Query/Request profile

[Videre lesing: Mer om metadata og SAML](https://difi.github.io/idporten-integrasjonsguide//91_metadata_og_mer_saml.html)
