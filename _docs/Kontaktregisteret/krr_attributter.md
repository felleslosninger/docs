---
title: Attributter i KRR
description: KRR attributter
summary:

toc: false
sidebar: krr_sidebar
product: KRR

---
Her er en oversikt over attributtene som finnes i KRR sitt REST API og hvilken respons man kan forvente.

| Attributtnavn | Beskrivelse | Mulige responser |
| - | - | - |
| personidentifikator | Gyldig fødselsnummer eller D-nummer | 01048800153 |
| reservasjon | Reservasjon avgitt av Innbygger, brukt i henhold til eForvaltningsforskriften § 15 a. | JA, NEI |
| status | Angir status for brukeren | AKTIV, SLETTET, IKKE_REGISTRERT |
| varslingsstatus | Tekstlig beskrivelse om bruker kan varsles eller ikke | KAN_VARSLES, KAN_IKKE_VARSLES |
| epostadresse | Epostadressen som innbygger har registrert i KRR | Eks. 01012295312_test@minid.difi.no |
| epostadresse_oppdatert | Sist gang epostadressen ble oppdatert | Angis som dato og klokkeslett |
| epostadresse_sist_verifisert | Sist gang epostadressen ble verifisert | Angis som dato og klokkeslett |
| mobiltelefonnummer | Mobilnummer som innbygger har registrert i KRR | Mobilnummer |
| mobiltelefonnummer_oppdatert | Sist gang mobilnummer ble oppdatert | Angis som dato og klokkeslett |
| mobiltelefonnummer_sist_verifisert | Sist gang mobilnummer ble verifisert | Angis som dato og klokkeslett |
| postkasseadresse | Unik adresse for en person sin postkasseadresse hos en postkasseleverandør. | Eks. ola.nordmann#9YDT |
| postkasseleverandoeradresse | Org.nummer til postkasseleverandør | 984661185, 922020175 |
| sertifikat | personsertifikat for Digital Post | X509Certificate |
| spraak | Bruker sitt foretrukne språk for kommunikasjon med det offentlige | nn, nb, en, se |
| spraak_oppdatert | Sist gang språkvalg ble oppdatert | Angis som dato og klokkeslett |

Du kan finne et utvalg testbrukere på siden [Testbrukere i KRR]({{site.baseurl}}/docs/Kontaktregisteret/krr_testbrukere)
