---
title: Generelt om modellen
description:
summary:
permalink: generelt_om_modellen.html
sidebar: einnsyn_technical_sidebar
---

## Introduksjon
eInnsyn baserar seg på Noark 5 som datamodell. Pr i dag baserar eInnsyn seg på 5.3.1, men vil med tida oppgradere til gjeldande versjon.
Innkommande data som er basert på Noark 4 Offentlig Journal vert mappa om til Noark 5 før sending, og alt vert deretter serialisert til RDF og Json-ld

### Generelle endringar i forhold til Noark 5
I tillegg til eigenskapane som finst i Noark 5, så har vi lagt til peikarar oppover i hierarkiet. Dvs at registrering har ein ‘parent’-eigenskap som viser til mappa den høyrer til. Denne ‘parent-eigenskapen, gjeld for alle klassar med unttak av Arkiv-klassen. Noko av bakgrunnen for dette er at vi ser på modellen som meir sentrert rundt registrering/journalpost med tilhøyrande eigenskapar. Framfor Arkiv med underliggande innhald, slik som typiske avleveringar på Noark5 vil vere.

Ellers så har vi gjort ein del felt ikkje-obligatoriske. Dette er m.a pga at det ikkje er alt i Noark 5 strukturen på mappe og registrering som vi klarere å utleie frå Noark4 Offentlig Journal uttrekket som vi får inn i OEP i dag.

Som tillegg til felta vi har frå Noark 5 datamodellen har vi innført felta tittel_sensitiv og tittel_list. Desse felta vert nytta for å støtte opp om personnavn-tagginga som brukar <pnavn> eller <personavn>-taggar i henholdsvis Noark 4 og Noark 5. JSON-LD støttar ikkje nøstinga av felt på same måte som xml. Vi har derfor innført nye felt, der denne type informasjon kan førekomme. Dvs at tittel_sensitiv er tittel med personnavn lagt inn, medan tittel er «vaska» for informasjon som ikkje skal visast etter 1 år. Tittel_list er orginaltittelen splitta opp. Dvs at “Personalmappe for Ola Normann oppdatering” blir i tittel_list [“Personalmappe for ”,”Ola Norman”, “oppdatering”]
