---
title: Verifikasjonstestar ID-porten  - SAML og OpenID Connect
description: Verifikasjonstestar
summary: "Verifikasjonstestar"

sidebar: saml_idporten_sidebar
product: ID-porten
redirect_from: /saml_verifikasjonstester
---

### Om testane

Dette dokumentet viser kva testar som skal gjennomførast i samband med ein integrasjon med ID-porten for tenesteleverandørar med krav om sikkerheitsnivå 3 og 4. 

Dei fleste testane må gjennomføras. Nokre er valfrie, avhengig av om ein har støtte for funksjonaliteten eller ikkje.
Detaljert beskriving av kvar enkelt test er gitt i *«Testsett - Verifikasjonstestar for integrasjon med ID-porten»*. 

> URL til test-tenesteeigar til Digitaliseringsdirektoratet <br> 
> <https://idporten-sptest2.difi.no/testsp> <br><br>
> URL til "Dine kontaktopplysninger" ("brukerprofilen") <br> 
> ver1: <https://brukerprofil-ver1.difi.no/minprofil/> <br>
> ver2: <https://brukerprofil-ver2.difi.no/minprofil/>
  
### Testar som må gjennomførast

[Test 1: Single sign-on (SSO) frå eiga teneste med sikkerheitsnivå 3](../96_verifikasjonstest.html#1-single-sign-on-sso-frå-eiga-teneste-med-sikkerheitsnivå-3)

[Test 3: SSO til eiga teneste med sikkerheitsnivå 3](96_verifikasjonstest.html#3-sso-til-eiga-teneste-med-sikkerheitsnivå-3)

[Test 6: Single log-out (SLO) frå eiga teneste](96_verifikasjonstest.html#6-single-log-out-slo-frå-eiga-teneste)

[Test 7: SLO frå anna tjeneste](96_verifikasjonstest.html#7-slo-frå-anna-tjeneste)

[Test 8: SLO etter timeout](96_verifikasjonstest.html#8-test-av-timeout-i--applikasjonen)
  

### Testar som kan gjennomførast
Desse testane skal gjennonførast dersom ein har støtte for funksjonaliteten.

[Test 2: SSO frå eiga teneste med sikkerheitsnivå 4](96_verifikasjonstest.html#2-sso-frå-eiga-teneste-med-sikkerheitsnivå-4)

[Test 4: SSO til eiga teneste med sikkerheitsnivå 4](96_verifikasjonstest.html#4-sso-til-eiga-teneste-med-sikkerheitsnivå-4)

[Test 9: Autentiseringsforespørsel – attributt \<ForceAuth> (tvinga re-autentisering)](96_verifikasjonstest.html#9-autentiseringsforespørsel--tvinga-reautentisering)

[Test 10: Autentiseringsforespørsel – attributt \<OnBehalfOf> («på vegne av»)](96_verifikasjonstest.html#10--autentiseringsforespørsel--onbehalfof-på-vegne-av)

[Test 11: Autentiseringsforespørsel – attributt \<locale> (språk)](96_verifikasjonstest.html#11-autentiseringsforespørsel--språk)


***


## Testsett - Verifikasjonstestar for integrasjon med ID-porten

### 1.	Single sign-on (SSO) frå eiga teneste med sikkerheitsnivå 3

**1.1** - Start ein ny nettlasersesjon og gå til eiga teneste.  
**1.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**1.3** - Vel MinID som innloggingsalternativ og fullfør innlogging.  
**1.4** - Verifiser at du kjem tilbake til eiga teneste.  
**1.5** - Endre URL i nettleser til Digitaliseringsdirektoratet [test-tenesteeigar](https://idporten-sptest2.difi.no/testsp). Vel konfigurasjon «*idporten-ver2*», eller «*idporten-ver1*», alt etter kva verifikasjonsmiljø tenesta er integrert mot.  
**1.6** - Verifiser at du kjem til test-tenesteeigar utan ny pålogging.  
**1.7** - Verifiser i feltet «Dekryptert Assertion fra mottatt ArtifactResponse», at sikkerheitsnivået er 3 og at autentiseringsmetoden er MinID (PIN eller SMS).  

  
### 2.	SSO frå eiga teneste med sikkerheitsnivå 4

**2.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**2.3** - Vel ein eID på nivå 4 som innloggingsalternativ og fullfør innlogging.  
**2.4** - Verifiser at du kjem tilbake til eiga teneste.  
**2.5** - Endre URL i nettleser til Digitaliseringsdirektoratet [test-tenesteeigar](https://idporten-sptest2.difi.no/testsp). Vel konfigurasjon «*idporten-ver2*», eller «*idporten-ver1*», alt etter kva verifikasjonsmiljø tenesta er integrert mot.    
**2.6** - Verifiser at du kjem til test-tenesteeigar utan ny pålogging.  
**2.7** - Verifiser i feltet «Dekryptert Assertion fra mottatt ArtifactResponse» at sikkerheitsnivået er 4 og at autentiseringsmetoden er den aktuelle eID.  
  
### 3.	SSO til eiga teneste med sikkerheitsnivå 3

**3.1** - Start ein ny nettlesarsesjon og gå til "Dine kontaktopplysninger".<br>
**3.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**3.3** - Vel MinID som innloggingsalternativ og fullfør innlogging.  
**3.4** - Verifiser at du er innlogga.  
**3.5** -	Endre URL i nettleser til eiga teneste.  
**3.6** -	Verifiser at du kjem til eiga teneste utan ny pålogging.  
**3.7** -	Verifiser at du er innlogga med sikkerheitsnivå 3.  

### 4.	SSO til eiga teneste med sikkerheitsnivå 4

**4.1** - 	Start ein ny nettlesarsesjon og gå til "Dine kontaktopplysninger". <br> 
**4.2** - 	Verifiser at du blir omdirigert til ID-porten for autentisering.  
**4.3** - 	Vel ein eID på nivå 4 som innloggingsalternativ og fullfør innlogging.  
**4.4** - 	Verifiser at du er innlogga.   
**4.5** - 	Endre URL i nettleser til eiga teneste.  
**4.6** - 	Verifiser at du kjem til eiga teneste utan ny pålogging.  
**4.7** - 	Verifiser at du er innlogga med sikkerheitsnivå 4.  

### 5.	Oppgradering av sikkerheitsnivå

**5.1** - 	Start ein ny nettlesarsesjon og gå til eiga teneste.  
**5.2** - 	Verifiser at du blir omdirigert til ID-porten for autentisering.  
**5.3** - 	Vel MinID som innloggingsalternativ og fullfør innlogging.  
**5.4** - 	Endre URL i nettleser til Digitaliseringsdirektoratetsin test-tenesteeigar.  
**5.5** - 	Vel eID på nivå 4 i konfig.  
**5.6** - 	Verifiser at du blir omdirigert til ID-porten.  
**5.7** - 	Logg inn med nivå 4 eID.  
**5.8** - 	Verifiser at innloggingen var vellykka.  

### 6.	Single log-out (SLO) frå eiga teneste

**6.1** - 	Start ein ny nettlesarsesjon og gå til "Dine kontaktopplysninger"  <br>
**6.2** - 	Verifiser at du blir omdirigert til ID-porten for autentisering.  
**6.3** - 	Logg inn med ein vilkårleg eID.  
**6.4** - 	Verifiser at du er innlogga i "Dine kontaktopplysninger"  .  
**6.5** - 	Endre URL til eiga teneste.  
**6.6** - 	Verifiser at du kjem til eiga teneste utan ny pålogging.  
**6.7** - 	Logg ut.  
**6.8** - Verifiser at du er logga ut hjå eiga teneste.  
**6.9** - Endre URL til ID-porten sin test-tenesteeigar og verifiser at du også er logga ut her.  

*PS: Verifiser i tillegg at det er mogleg med aktiv utlogging for ALLE brukarar som prøver å logge inn til tenesta sjølv om dei ikkje har tilgang til tjenesten.*  
  
### 7.	SLO frå anna tjeneste

*PS. For OpenID Connect-integrasjonar må Front-Channel Logout spesifikasjonen vere støtta (Frontchannel logout uri) for at SLO frå anna til eiga tjeneste skal kunne fungere.*

**7.1** - Start ein ny nettlesarsesjon og gå til eiga teneste.  
**7.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**7.3** - Logg inn med ein vilkårleg eID.  
**7.4** - Verifiser at du er innlogga.  
**7.5** - Endre URL til "Dine kontaktopplysninger".<br>
**7.6** - Verifiser at du kjem til "Dine kontaktopplysninger" utan ny pålogging.  
**7.7** - Logg ut.  
**7.8** - Verifiser at du er logga ut frå "Dine kontaktopplysninger" <br>
**7.9** - Endre URL til eiga teneste og verifiser at du også er logga ut her.  

### 8.	Test av timeout i  applikasjonen

**8.1** - Start ein ny nettlesarsesjon og gå til "Dine kontaktopplysninger". <br>
**8.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**8.3** - Logg inn med ein vilkårleg eID.  
**8.4** - Verifiser at du er innlogga  
**8.5** - Vent i over 30 min.  
**8.6** - Verifiser at du er utlogga av eiga teneste. (Gitt at du har satt 30 min som inaktiv timeout).  


### 9. Autentiseringsforespørsel – (tvinga reautentisering)

**9.1** - 	Start ein ny nettlesarsesjon og gå til Digitaliseringsdirektoratetsin test-tenesteeigar.  
**9.2** - 	Verifiser at du blir omdirigert til ID-porten for autentisering.  
**9.3** - 	Logg inn med ein vilkårleg eID.  
**9.4** - 	Verifiser at du er innlogga.  
**9.5 a)** - For SAML: Endre URL til eiga teneste (må sende med attributt *\<ForceAuth>=true* i autentiseringsforespørsel til ID-porten).  
**9.5 b)** - For OIDC: Endre URL til eiga teneste (må sende med parameter *prompt=login* i autentiseringsforespørsel til ID-porten).  
**9.6** - 	Verifiser at du blir bedt om å logge inn på nytt.  
  
### 10. 	Autentiseringsforespørsel – "OnBehalfOf" («på vegne av»)
**10.1 a)** For SAML: Start ein ny nettlesarsesjon og gå til eiga teneste (må sende med attributt *\<OnBehalfOf=xxx>*, der xxxx er namnet er ID for den som autentiseringsforespørselen er på vegne av.)<br>
**10.1 b)** For OIDC: Start ein ny nettlesarsesjon og gå til eiga teneste ( må sende med ekstra parameter *onbehalfof=xxxx*, der xxxx er ID for den som autentiseringsforespørselen er på vegne av.)   
**10.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**10.3** - Logg inn med ein vilkårleg eID.  
**10.4** - Verifiser at du blir innlogga.  
  
### 11. Autentiseringsforespørsel – (språk)
**11.1 a)** For SAML: - Start ein ny nettlesarsesjon og gå til eiga teneste (må sende med attributt *\<locale=språk>*). <br>
**11.1 b)** For OIDC: - Start ein ny nettlesarsesjon og gå til eiga teneste (må sende med parameter *ui_locales=språk*).<br> 
**11.2** - Verifiser at du blir omdirigert til ID-porten for autentisering.  
**11.3** - Verifiser at ID-porten er på riktig språk (som du sendte med i autentiseringsforespørselen).  
**11.4** - Logg inn med ein vilkårleg eID.  
**11.5** - Verifiser at du blir innlogga.  
