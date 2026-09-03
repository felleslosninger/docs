---

title: LeveringsKvittering  

sidebar: dpi_sidebar
redirect_from: /sdp_leveringskvittering
---

|---|---|
| Term          | {{page.title}} |
| Definisjon    | Kvittering på at postkassen eller utskriftstjenesten har tatt ansvar for å tilgjengeliggjøre melding til mottaker. Sendes til Avsender via meldingsformideler. |
| Kilde         | DIFI |
| Kommentar     | Denne kvitteringen kan [Behandlingsansvarlig]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) oppbevare som en garanti på at posten vil bli levert til [Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker). |

#### For Digitalpost forsendelser

Kvitteringen sendes fra [Postkasseleverandør]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)
når postforsendelsen er validert og de garanterer for at posten vil bli
tilgjengeliggjort.  
Kvitteringen vil bli sendt så fort
[Postkassleverandør]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer) kan garantere dette,
det vil si at [Leveringskvitteringen]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) vil bli sendt
før (Skal være link til /felles/virkningsdato.md).

#### For Fysiskpost forsendelser

Kvitteringen leveres når brevene er gjort klar for postlegging.
Postleverandøren vil kort tid etterpå komme og hente brevene som er lagt
til postlegging.  
Postlegging gjøres en gang om dagen på hverdager, så denne typen
kvitteringer kan forventes tilgjengelig for Avsender omtrent på samme
tidspunkt for alle meldinger som postlegges samme dag.

#### Arkivering av kvittering

Det anbefales at [Behandlingsansvarlig]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/Aktorer)
arkiverer denne kvitteringen som bevis på at
[posten]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png) er levert til
[Mottaker]({{site.baseurl}}/resources/begrep/felles/Mottaker).

### Attributer

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148), Enveloped XML signatur |
| tidspunkt | 1..1 | [xs:dateTime](http://www.w3.org/TR/xmlschema-2/#dateTime) |
