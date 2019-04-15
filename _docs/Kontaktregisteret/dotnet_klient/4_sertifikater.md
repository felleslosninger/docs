---
title: Installere sertifikater
description: 
summary: ""
permalink: krr_sertifikater.html
sidebar: krr_dotnet
product: KRR
---

For å kunne bruke dette biblioteket så trenger du et sertifikat for å kunne autentisere deg mot Oppslagstjenesten. Dette bør installeres på maskinen som skal bruke klientbiblioteket. Grunnen til at vi ønsker å installere det er for å ikke ha passord i klartekst i koden.

Alle sertifikater har en unik identifikator som kalles thumbprint. Hvis du ikke ønsker å håndtere selv i koden hvordan sertifikatene skal lastes, så kan du følge guiden under, steg for steg. Til slutt gjennomgås det hvordan du kan finne thumbprint til det installerte sertifikatet.

### Installere virksomhetssertifikat

> Virksomhetssertifikatet brukes av virksomheten for å signere forespørsler som går til Oppslagstjenesten.

1. Dobbeltklikk på sertifikatet (Sertifikatnavn.p12)
1. Velg at sertifikatet skal lagres i _Current User_ eller _Local Machine_ og trykk _Next_
1. Filnavn skal nå være utfylt. Trykk _Next_
1. Skriv inn passord for privatnøkkel og velg _Mark this key as exportable ..._, trykk _Next_
1. Velg _Automatically select the certificate store based on the type of certificate_
1. Klikk _Next_ og _Finish_
1. Får du spørsmål om å godta sertifikatkjeden så du gjør det.
1. Du skal da få en dialog som sier at importeringen var vellykket. Trykk _OK_.

### Finne thumbprint til installert sertifikat

`OppslagstjenesteKlient` tar inn `OppslagstjenesteKonfigurasjon`, som igjen tar inn `thumbprint` direkte:

{% highlight csharp %}
var konfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.FunksjoneltTestmiljø, avsendersertifikatThumbprint);
var klient = OppslagstjenesteKlient(konfigurasjon);
{% endhighlight %}

Det er enklest å finne thumbprint gjennom _Microsoft Management Console_ (mmc.exe).

1. Velg _File_ -> _Add/Remove Snap-in..._ 
1. Merk _Certificates_ og trykk _Add >_
1. Hvis sertifikatet ble installert i _Current User_ velges _My user account_, hvis det er installert på _Local Machine_ velges _Computer Account_. Klikk _Finish_ og _OK_
1. Ekspander _Certificates_-noden, velg _Personal_ og åpne _Certificates_
1. Dobbeltklikk på sertifikatet du installerte
1. Velg _Details_, scroll ned til _Thumbprint_ og kopier


Ønsker du å sende inn sertifikater du har allerede har initialisert, kan du bruke konstruktøren `OppslagstjenesteKonfigurasjon(Miljø, X509Certificate2)`.
