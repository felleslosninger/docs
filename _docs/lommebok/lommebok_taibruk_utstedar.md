---
title: Ta i bruk som utstedar
description: Ta i bruk som utstedar

sidebar: lommebok
product: lommebok
redirect_from: /lommebok_taibruk_brukarstad
---

Ein [utstedar](https://samarbeid.digdir.no/digital-lommebok/produsere-og-dele-bevis/2911) er ei teneste som produserer digitale bevis og legg dei i den digitale lommeboka. 

Ofte vil ein utstedar vere ein aktør som har spesialisert seg på slik bevis-produksjon, og som utferdar bevis på vegne av ei anna verksemd som er datakjelde (ogso kalla autentisk kjelde).  Ei verksemd kan sjølvsagt vere både datakjelde og utstedar for sine eigne bevis.

{% include note.html content="Dersom du berre ynskjer å prøve ut bevis-produksjon på ein enkel måte, kan du bruke sandkassa sin [Bevisgenerator](https://bevisgenerator.test.eidas2sandkasse.net/)." %}


## Korleis bli ein utstedar ?

Dersom du ynskjer å produsere digitale bevis, må du fyrst bestemme deg for om du ynskjer å :

1. lage utedaren sin sjølv
2. installere ein mellomvare som fungerer som utsteder (som til dømes EUDIPLO)
3. bruke [Digdir sin utstedar Bevisporten](lommebok_digdir_utsteder) (kun for offentlege verksemder)
4. få hjelp av [ein av leverandørane i sandkassa](lommebok_tjenester) 

Ved alternativ 1 og 2 må du utføre dei etterfølgjande stega her:

#### 1. Registrering

[Registere utstedaren](lommebok_taibruk_registrering_utstedar) din i registeret over brukarstader med korrekt rolle.

Som del av registrering må du lage eit access-sertifkat knytta til brukarstaden, som applikasjonen din nyttar for å autentisere seg mot lommeboka.  Du må også registerer eit utstedarsertifikat som du nyttar til å signere bevisa.

Til slutt vert du registert på tillitslista for sandkassen.

#### 2. Lage utstederen

Dette er sopass omfattande at me reknar med at du har kontroll på dette sidan du har tenkt å ta ein utstedar-rolle.


