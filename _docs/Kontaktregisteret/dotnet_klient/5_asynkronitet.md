---
title: Async/sync
description: 
summary: ""

sidebar: krr_dotnet
product: KRR
redirect_from: /krr_async
---

Alle operasjonene/metodene i Oppslagstjenesten har både synkrone og asynkrone metoder. Velg det som passer din applikasjon. Klienten initialiserer på samme måte og det er kun gitt metode som styrer hvorvidt den er asynkron eller ikke.

### Asynkrone metoder

Metodene som er asynkrone returnerer en `Task<>` av objektet den synkrone metoden returnerer. Man kan bruke  `await` på svaret direkte eller vente på at `Task`-en skal bli ferdig på annet vis. 

{% highlight csharp %}
var konfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.FunksjoneltTestmiljøVerifikasjon1, avsendersertifikatThumbprint);
var register = new OppslagstjenesteKlient(konfigurasjon);

var endringer = await register.HentEndringerAsynkront(fraEndringsNummer,
	Informasjonsbehov.Person ,
	Informasjonsbehov.Kontaktinfo ,
	Informasjonsbehov.Sertifikat ,
	Informasjonsbehov.SikkerDigitalPost ,
	Informasjonsbehov.VarslingsStatus
	);

//Returnerer Task<> 
var personidentifikator = new[] {"08077000292"};
Task<IEnumerable<Person>> personer = register.HentPersonerAsynkront(personidentifikator,
    Informasjonsbehov.Kontaktinfo ,
    Informasjonsbehov.Sertifikat ,
    Informasjonsbehov.SikkerDigitalPost ,
    Informasjonsbehov.VarslingsStatus
    );

//Vent på at tasken blir ferdig …
var printSertifikat = await register.HentPrintSertifikatAsynkront();

{% endhighlight %}

### Synkrone metoder

{% highlight csharp%}
var konfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.FunksjoneltTestmiljøVerifikasjon1, avsendersertifikatThumbprint);
var register = new OppslagstjenesteKlient(konfigurasjon);

var endringer = register.HentEndringer(fraEndringsNummer,
	Informasjonsbehov.Person ,
	Informasjonsbehov.Kontaktinfo ,
	Informasjonsbehov.Sertifikat ,
	Informasjonsbehov.SikkerDigitalPost ,
	Informasjonsbehov.VarslingsStatus
	);

var personidentifikator = new[] {"08077000292"};
var personer = register.HentPersoner(personidentifikator,
    Informasjonsbehov.Kontaktinfo ,
    Informasjonsbehov.Sertifikat ,
    Informasjonsbehov.SikkerDigitalPost ,
    Informasjonsbehov.VarslingsStatus
    );

var printSertifikat = register.HentPrintSertifikat();

{% endhighlight %}
