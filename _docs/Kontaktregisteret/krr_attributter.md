---
title: Attributter i KRR
description: KRR attributter
summary:

toc: false
sidebar: krr_sidebar
product: KRR

redirect_from: /krr_attributter
---
Her er en oversikt over attributtene som finnes i KRR sitt REST API og hvilken respons man kan forvente.

| Attributtnavn | Beskrivelse | Mulige responser |
| - | - | - |
| personidentifikator | Gyldig fødselsnummer eller D-nummer | 01048800153 |
| reservasjon | Reservasjon avgitt av person, brukt i henhold til eForvaltningsforskriften § 15 a. | JA, NEI |
| status | Angir status for personen | AKTIV, SLETTET, IKKE_REGISTRERT |
| varslingsstatus | Tekstlig beskrivelse om person kan varsles eller ikke | KAN_VARSLES, KAN_IKKE_VARSLES |
| epostadresse | Epostadressen som person har registrert i KRR | Eks. 01012295312_test@minid.difi.no |
| epostadresse_oppdatert | Sist gang epostadresse ble oppdatert av person. Ny eller endret epostadresse. Dato kan være mer enn 18 måneder tilbake i tid. | Eks. 2016-08-05T10:45:15.768Z |
| epostadresse_sist_verifisert | Sist gang epostadresse ble verifisert av person. Bekreftes av person minst to ganger i året. | Eks. 2022-08-05T10:45:15.768Z |
| mobiltelefonnummer | Mobilnummer som person har registrert i KRR | Mobilnummer |
| mobiltelefonnummer_oppdatert | Sist gang mobiltelefonnummer ble oppdatert av person.  Nytt eller endret mobilnummer. Dato kan være mer enn 18 måneder tilbake i tid. | Eks. 2016-08-05T10:45:15.768Z |
| mobiltelefonnummer_sist_verifisert | Sist gang mobiltelefonnummer ble verifisert av person.  Bekreftes av person minst to ganger i året.| Eks. 2022-08-05T10:45:15.768Z |
| postkasseadresse | Unik adresse for en person sin postkasseadresse hos en postkasseleverandør. | Eks. ola.nordmann#9YDT |
| postkasseleverandoeradresse | Org.nummer til postkasseleverandør | 984661185, 922020175 |
| sertifikat | personsertifikat for Digital Post | X509Certificate |
| spraak | Personen sitt foretrukne språk for kommunikasjon med det offentlige | nn, nb, en, se |
| spraak_oppdatert | Sist gang språkvalg ble oppdatert | Eks. 2022-08-05T10:45:15.768Z |

Du kan finne et utvalg testbrukere på siden [Testbrukere i KRR]({{site.baseurl}}/docs/Kontaktregisteret/krr_testbrukere)


## Kodeverk for `status`

|Kodeverdi|	Beskrivelse|
|-|-|
|AKTIV|	Person finnes i registeret|
|SLETTET|	Person er slettet fra registeret|
|IKKE_REGISTRERT|	Person finnes ikke i registeret|

## Kodeverk for `varslingsstatus`
