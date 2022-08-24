---
title: Informasjonsbehov

sidebar: begrep_sidebar
redirect_from: /informasjonsbehov
---

| ---- | ---- |
| Term | informasjonsbehov |
| Definisjon | Beskriver det opplysningskrav som en Virksomhet har definert |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | informasjonsbehov brukes i forespørsler til Kontakt- og reservasjonsregisteret for å definere hvilke opplysninger som skal utleveres til virksomheten. Forespørselen vil være en [HentPersonerForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPersonerForespoersel) eller en [HentPersonForespoersel]({{site.baseurl}}/resources/begrep/oppslagstjenesten/HentPersonForespoersel) som sendes til kontakt-og reservasjonsregisteret. Det er 1-1 mapping mellom [OAuth2 scopes]({{site.baseurl}}/docs/Kontaktregisteret/oppslagstjenesten_rest#tilgjenglige-scopes) og informasjonsbehov-elementet brukt i SOAP-API’et. | 

#### Kodeverk for informasjonsbehov

| Kodeverdi                          | Beskrivelse                                                                                                                                                                                                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Person]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/begrep/Person)                             | Person gir kun informasjon om Personen finnes i registeret og reservasjonsstatus. Person er implisitt og returneres alltid.                                                                                                                                                |
| [Kontaktinformasjon]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Kontaktinformasjon)                        | Kontaktinfo gir informasjon om Person og Personers kontaktinformasjon, dvs epost-addresse og mobiltelefonnummer                                                                                                                                                            |
| [Sertifikat]({{site.baseurl}}/resources/begrep/oppslagstjenesten/Sertifikat)                         | Sertifikat gir informasjon om Person sitt sertifikat som skal brukes i forbindelse med kryptering av Sikker Digital Post                                                                                                                                                   |
| [SikkerDigitalPost]({{site.baseurl}}/resources/begrep/oppslagstjenesten/SikkerDigitalPostAdresse)                  | SikkerDigitalPost gir informasjon om Person, postkasse og postkasseleverandøren.                                                                                                                                                                                           |
| [VarslingsStatus]({{site.baseurl}}/resources/begrep/felles/varslingsstatus) | VarslingsStatus angir om Person kan varsles ihht eForvaltningsforskriften §32. Dette informasjonsbehovet trigger filtrering i Oppslagstjenesten, dvs. Kontaktinformasjon, Sertifikat og SikkerDigitalPost på personer med utgått kontaktinformasjon vil ikke bli utlevert. |
| [Spraak]({{site.baseurl}}/resources/begrep/felles/spraak)                              | Innbyggers foretrukne språk for kommunikasjon med det offentlige. |


