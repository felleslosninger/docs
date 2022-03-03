---
title: Sertifikathåndtering
permalink: dpi_sertifikathandtering.html
sidebar: dpi_timo_sidebar
---

<!-- ![](/images/dpi/underarbeide.png) -->

## Sertifikater

Offentlig virksomhet må forholde seg til og validere sertifikater i
følgende tilfeller:

  - Validering av innbyggers sertifikat levert fra oppslagstjenesten
  - Sertifikater og signatur på forretningskvitteringene fra
    postkasseleverandør og utskriftsleverandør
  - Sertifikater og signatur på transportkvitteringene fra
    aksesspunktleverandør
  - Sertifikater brukt for TLS kommunikasjonen mot oppslagstjenesten og
    aksesspunktleverandør
  - Eget sertifikat og signatur på posten de sender

Under er en gjennomgang av de enkelte tilfellene og hvordan offentlig
virksomhet skal validere sertifikater og signaturer.

**Validering av innbyggers sertifikat levert fra oppslagstjenesten**

Innbyggersertifikatene levert fra oppslagstjenesten er
kvalifisertesertifikater. De er enten utsted til Innbygger eller til
postkasseleverandørene.  
Offentlig virksomhet skal validere gyldigheten av
innbyggersertifikatene.  
Men offentlig virksomhet kan ikke gjøre en sjekk om sertifikatet er
utstedt til innbygger, da sertifikatet kan være utstedt som et
virksomhetssertifikat til postkasseleverandør.  
Se under for generell informasjon om kvalifisertesertifikater.

**Sertifikater og signatur på forretningskvitteringene fra postkassene og utskriftsleverandør**

Forretningskvitteringene som sendes fra postkasse- og utskriftleverandør er signert
av et virksomhetssertifikat utstedt til leverandør.  
Se under for generell informasjon om kvalifisertesertifikater.

**Sertifikater og signatur på transportkvitteringene fra
meldingsformidler**

Transportkvitteringene som sendes fra aksesspunktet er
signert av et virksomhetssertifikat utstedt til aksesspunktleverandør.  
Se under for generell informasjon om kvalifisertesertifikater.

**Sertifikater brukt for TLS kommunikasjonene mot oppslagstjenesten og
aksesspunkt**

Alle sertifikater brukt i forbindelse med TLS er vanlige SSL
sertifikater utstedt i markedet.  
Det forventes at offentlig virksomhet har en oppdatert liste over
gyldige CA sertifikater for dette bruket selv.

**Eget sertifikat og signatur på posten de sender**

Offentlig virksomhet skal sikre at all post er signert med gyldige
virksomhetsertifikater utstedt til egen virksomhet eller autorisert
databehandler.  
Se under for generell informasjon om kvalifisertesertifikater.

## Kvalifiserte sertifikater

Kvalifisertesertifikater som er utstedt iht. [Kravspesifikasjon for PKI i offentlig sektor](http://www.regjeringen.no/nb/dep/fad/dok/lover-og-regler/retningslinjer/2010/kravspesifikasjon-for-pki-i-offentlig-se.html?id=611085) leveres fra to leverandører ([Buypass](http://www.buypass.no/produkter-og-tjenester/virksomhetssertifikat)
,
[Commfides](https://www.commfides.com/e-ID/Bestill-Commfides-Virksomhetssertifikat.html)
)  
Her er en oversikt over de CA sertifikater som offentlig virksomhet må forholde seg til for å kunne validere signaturene i sikker digital post.

#### For testing

Følgende rot sertifikater må offentlige virksomhet stole på.  
(Disse sertifikatene må legges inn i truststore)

  - Fra Buypass:
    [Buypass\_Class\_3\_Test4\_Root\_CA]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/sikkerhet/sertifikater/test/Buypass_Class_3_Test4_Root_CA.cer)
  - Fra Commfides: [root - cpn root sha256 ca - test.crt (2.03
    KB)](https://support.commfides.com/index.php?/Knowledgebase/Article/GetAttachment/155/22538)

Følgende mellomliggende CA sertifikater må offentlig virksomhet ha for å
kunne verifisere sertifikatbanen til rot sertifikatet.  
(Disse må ligge i CertStore)

  - Fra Buypass:
    [Buypass\_Class\_3\_Test4\_CA\_3]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/sikkerhet/sertifikater/test/Buypass_Class_3_Test4_CA_3.cer)
  - Fra Commfides: [intermediate - commfides cpn enterprise-norwegian
    sha256 ca - test2.crt (2.23
    KB)](https://support.commfides.com/index.php?/Knowledgebase/Article/GetAttachment/155/22537)

#### For produksjon

Følgende rot sertifikater må offentlige virksomhet stole på.  
(Disse sertifikatene må legges inn i truststore)

  - Fra Buypass: [Rot - Buypass Class 3 Rot
    CA](http://www.buypass.no/cert/BPClass3RootCA.cer)
  - Fra Commfides: [cpn rootca sha256
    class 3.crt](https://support.commfides.com/index.php?/Knowledgebase/Article/GetAttachment/142/17413)

Følgende mellomliggende CA sertifikater må offentlig virksomhet ha for å
kunne verifisere sertifikatbanen til rot sertifikatet.  
(Disse må ligge i CertStore)

  - Fra Buypass: [Utstedende - Buypass Class 3
    CA 3](http://crt.buypass.no/crt/BPClass3CA3.cer)
  - Fra Commfides: [cpn enterprise sha256
    class 3.crt](https://support.commfides.com/index.php?/Knowledgebase/Article/GetAttachment/142/17412)

CA sertfikatene ligger også tilgjengelige her:
[sertifikater](https://github.com/difi/felleslosninger/tree/gh-pages/resources/begrep/sikkerDigitalPost/sikkerhet/sertifikater)
