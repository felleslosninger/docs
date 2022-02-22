--- 
title: Varsler  

sidebar: begrep_sidebar
---

|---|---|
| Term | {{page.title}} |
| Definisjon | Informasjon om hvordan postkasseleverandør skal varsle Mottaker om den nye posten. Overstyrer Mottaker sine egne varslingspreferanser |
| Datatype | complexType |
| Kjelde | DIFI |
| Kommentar | Varslingsinformasjonen angitt her vil overstyre Mottaker sine egne varslingspreferanser, det vil kunne komme som tillegg til Mottaker sine varslingvalg. Avsender kan med instillingene her styre både [EpostVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/EpostVarsel) og smsVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/SmsVarsel) helt uavhengig av hverandre. Det vil si at Avsender kan velge å varsle i begge eller en av kanalene.     Avsender kan velge selv hvilken kanal som velges, dette kan de gjøre med bakgrunn i sin egen kanalstrategi, erfaringer i forhold til åpningsgrad og kostnader. Bruk av [SmsVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/SmsVarsel) vil medføre egne kostnader for Avsender |

#### Eigenskapar

| Identifikator              | Kardinalitet | Datatype                       |
| -------------------------- | ------------ | ------------------------------ |
| [epostVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/EpostVarsel) | 0..1         | [sdp:EpostVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/EpostVarsel) |
| [smsVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/SmsVarsel)     | 0..1         | [sdp:SmsVarsel]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/SmsVarsel)     |

#### Xml eksempel - Brev som krever varsling etter eForvaltningsforskriften

``` 
  <varsler>
    <epostVarsel>
      <epostadresse>01012295312_test@minid.difi.no</epostadresse>
      <varslingsTekst>Viktig melding fra Staten</varslingsTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
        <dagerEtter>7</dagerEtter>
      </repetisjoner>
    </epostVarsel>
  </varsler>
```

#### Xml eksempel - Avsender ønsker varsling i begge kanaler ved Levering

```
  <varsler>
    <epostVarsel>
      <epostadresse>01012295312_test@minid.difi.no</epostadresse>
      <varselTekst>Viktig melding fra Staten</varselTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
      </repetisjoner>
    </epostVarsel>
    <smsVarsel>
      <mobiltelefonnummer>12121212</mobiltelefonnummer>
      <varslingsTekst>Viktig melding fra Staten</varslingsTekst>
      <repetisjoner>
        <dagerEtter>0</dagerEtter>
      </repetisjoner>
    </smsVarsel>
  </varsler>
```
