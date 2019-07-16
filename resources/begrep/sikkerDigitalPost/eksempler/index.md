-----

layout: default  
title: Eksempler  
headtitle: Sikker digital post

id: Eksempler

next: Forretningslag

-----

## {{page.title}}

På denne siden er det samlet eksempler på integrasjoner og meldinger som
finnes tilknyttet sikker digital post.  
Dette er ikke en uttømmende liste, og vi ber alle om å bidra med
relevante eksempler.

### Eksempler på java integrasjonsprosjekt

  - [En testklient utviklet av Difi for funksjonell
    testing](https://github.com/difi/sdp-klient-eksempel-java-webclient)
      - Testklienten viser hvordan integrasjon mot oppslagstjenesten og
        meldingsformidler kan gjøres.
  - [En testklient utviklet av Posten for å vise hvordan offentlige
    virksomheter kan integrere seg mot
    SDP](https://github.com/difi/sdp-klient-eksempel-java-jetty)
      - Prosjektet viser hvordan avsendere kan håndtere tråder og
        vdelikehold av status for sendte brev.
  - [Referanseimplementasjon for bruk av
    oppslagstjenesten](https://github.com/difi/kontaktregisteret-klient)
      - Eksempel kode for hvordan en avsender kan integrere seg mot
        oppslagstjenesten

### Eksempler på .Net integrasjonsprosjekt

  - [Referanseimplementasjon for bruk av
    oppslagstjenesten](https://github.com/difi/kontaktregisteret-klient/tree/master/kontaktinfo-dotNet-sample)
      - Eksempel kode for hvordan en avsender kan integrere seg mot
        oppslagstjenesten

### Eksempler på forretningsmeldinger

  - [Ferdig pakket dokumentpakke](post.asice.zip)
  - [Standard buisness document header](sbdh.xml)
  - [Feil-melding sendt som forretningsmelding](sdpFeil.xml)
  - [Post åpnet kvittering](sdpKvittering-aapnetAvMottaker.xml)
  - [Leveringskvittering](sdpKvittering-levertTilPostkasse.xml)
  - [Varsel feilet melding](sdpKvittering-mottakerVarselFeilet.xml)
  - [Melding om tilbaketrekking av
    post](sdpKvittering-tilbaketrekking.xml)
  - [Mainfest i Dokumentpakke](sdpManifest.xml)
  - [Melding for digital postkasse](sdpMelding-digital.xml)
  - [Melding for print/fysisk brev](sdpMelding-print.xml)

### Eksempler på transportmeldinger (transport + forretningsmelding)

  - [Request\_forretningsmelding\_fra\_postavsender\_til\_meldingsformidler](soap/1_request_forretningsmelding_fra_postavsender_til_meldingsformidler.xml)
  - [Response\_kvittering\_for\_mottatt\_forretningsmelding\_fra\_meldingsformidler\_til\_postavsender](soap/1_response_kvittering_for_mottatt_forretningsmelding_fra_meldingsformidler_til_postavsender.xml)
  - [Request\_forretningsmelding\_fra\_meldingsformidler\_til\_postkasse](soap/3_request_forretningsmelding_fra_meldingsformidler_til_postkasse.xml)
  - [Response\_kvittering\_for\_mottatt\_forretningsmelding\_fra\_postkasse\_til\_meldingsformidler](soap/3_response_kvittering_for_mottatt_forretningsmelding_fra_postkasse_til_meldingsformidler.xml)
  - [Request\_forretningsmelding\_fra\_postkasse\_til\_meldingsformidler](soap/4_request_forretningsmelding_fra_postkasse_til_meldingsformidler.xml)
  - [Response\_kvittering\_for\_mottatt\_forretningsmelding\_fra\_meldingsformidler\_til\_postkasse](soap/4_response_kvittering_for_mottatt_forretningsmelding_fra_meldingsformidler_til_postkasse.xml)
  - [Request\_forespoersel\_om\_forretningskvittering\_fra\_postavsender\_til\_meldingsformidler](soap/5_request_forespoersel_om_forretningskvittering_fra_postavsender_til_meldingsformidler.xml)
  - [Response\_error\_fra\_meldingsformidler\_til\_postavsender](soap/5_response_error_fra_meldingsformidler_til_postavsender.xml)
  - [Response\_forretningskvittering\_fra\_meldingsformidler\_til\_postavsender](soap/5_response_forretningskvittering_fra_meldingsformidler_til_postavsender.xml)
  - [eksempel\_soap\_fault\_med\_ebms\_error](soap/eksempel_soap_fault_med_ebms_error.xml)
