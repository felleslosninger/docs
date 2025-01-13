---
title: Lokal kopi
description: 

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_lokal_kopi
---

## Lokal kopi
Som hovedregel sier Veiledning for bruk av Kontakt- og reservasjonsregisteret at det IKKE er lov til å bruke kontaktregisteret til å kvalitetssikre e-postadresser i andre registre. Likevel oppfyller noen svært få virksomheter kravet til å ha en lokal kopi av Kontakt- og Reservasjonsregisteret, som er et unntak av dette og ordinær bruk av Oppslagstjenesten.


## Hente endringer
Virksomheter som oppfyller kravet til å ha en lokal kopi må daglig hente endringer som skjer i Kontakt- og Reservasjonsregisteret. For dette trenger virksomheten særskilt tilgang (se avsnittet om Scope under).

## Krav om oppdatert kontaktinfo
For å sikre at kontaktinfoen i lokal kopi er oppdatert, må slike virksomheter hente endringsmeldinger minimum en gang i døgnet.

## Scope
For å hente endringer benyttes Oppslagstjenesten REST og virksomheten må ha fått tildelt scopet krr:global/hentendring.read. Mer dokumentasjon om bruk av scopet finnes i Swagger UI.

## Ny tjeneste for postkasseleverandørendringer
Dersom sertifikatet, navnet eller organisasjonsnummeret til en postkasseleverandør endrer seg, så vil det ikke lenger trigge en endring av alle brukere. I stedet er det opprettet en tilleggstjeneste for å kunne hente endringer for postkasseleverandør. Slike endringer er det svært få av.

Merk! I dag finnes det kun to sertifikater. Ett for Digipost og ett for e-Boks.

Selv om hentEndringer for personer returnerer et sertifikat, så er dette alltid koblet til postkasseleverandøren. Det innebærer at det ikke er noe poeng å lagre sertifikatet for hver bruker.
