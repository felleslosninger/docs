---
title: Informasjonsbehov
permalink: informasjonsbehov.html
sidebar: begrep_sidebar
---

| ---- | ---- |
| Term | informasjonsbehov |
| Definisjon | Beskriver det opplysningskrav som en Virksomhet har definert |
| Datatype | string |
| Kilde | DIFI |
| Kommentar | informasjonsbehov brukes i forespørsler til Kontakt- og reservasjonsregisteret for å definere hvilke opplysninger som skal utleveres til virksomheten. Forespørselen vil være en [HentPersonerForespoersel](ot_hentpersonerforespoersel.html) eller en [HentPersonForespoersel](ot_hentpersonforespoersel) som sendes til kontakt-og reservasjonsregisteret. Det er 1-1 mapping mellom [OAuth2 scopes](oppslagstjenesten_rest.html#tilgjenglige-scopes) og informasjonsbehov-elementet brukt i SOAP-API’et. | 

#### Kodeverk for informasjonsbehov

| Kodeverdi                          | Beskrivelse                                                                                                                                                                                                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Person](sdp_person.html)                             | Person gir kun informasjon om Personen finnes i registeret og reservasjonsstatus. Person er implisitt og returneres alltid.                                                                                                                                                |
| [Kontaktinformasjon](ot_kontakinformasjon.html)                        | Kontaktinfo gir informasjon om Person og Personers kontaktinformasjon, dvs epost-addresse og mobiltelefonnummer                                                                                                                                                            |
| [Sertifikat](ot_sertifikat.html)                         | Sertifikat gir informasjon om Person sitt sertifikat som skal brukes i forbindelse med kryptering av Sikker Digital Post                                                                                                                                                   |
| [SikkerDigitalPost](ot_sikkerdigitalpostadresse.html)                  | SikkerDigitalPost gir informasjon om Person, postkasse og postkasseleverandøren.                                                                                                                                                                                           |
| [VarslingsStatus](varslingsstatus.md) | VarslingsStatus angir om Person kan varsles ihht eForvaltningsforskriften §32. Dette informasjonsbehovet trigger filtrering i Oppslagstjenesten, dvs. Kontaktinformasjon, Sertifikat og SikkerDigitalPost på personer med utgått kontaktinformasjon vil ikke bli utlevert. |
| [Spraak](spraak.html)                              | Innbyggers foretrukne språk for kommunikasjon med det offentlige. |


