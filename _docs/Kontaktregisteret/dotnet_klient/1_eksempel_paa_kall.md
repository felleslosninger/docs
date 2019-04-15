---
identifier: eksempelforsending
title: Eksempel på kall
layout: default
---

Det er bare tre kall du kan gjøre mot oppslagstjenesten; 

* hente endringer 
* hente personer 
* hente printsertifikat. 

Først må du sette opp `OppslagstjenesteKonfigurasjon` med virksomhetssertifikat og `Miljø` som skal brukes.

### Sett opp klientkonfigurasjon

Med sertifikat fra thumbprint:

```csharp
const string avsendersertifikatThumbprint = "fe14593dd66b2...";

var konfigurasjon = new OppslagstjenesteKonfigurasjon(
    Miljø.FunksjoneltTestmiljøVerifikasjon1,
    avsendersertifikatThumbprint
);

```

> Vi anbefaler å laste sertifikatet fra _thumbprint_ fordi passordet ikke er i koden. Sertifikat kan installeres i `Personal` for `CurrentUser` eller `LocalMachine`. Se hvordan du installerer sertifikatet [her](#installeresertifikater).

Med sertifikat fra fil:

```csharp
const string avsendersertifikatSti = @"C:\Sti\Til\Sertifikat\Sertifikat.pfx";
var sertifikat = new X509Certificate2(
    File.ReadAllBytes(avsendersertifikatSti),
    "Passord",
    X509KeyStorageFlags.Exportable
);

var konfigurasjon = new OppslagstjenesteKonfigurasjon(
    Miljø.FunksjoneltTestmiljøVerifikasjon1,
    sertifikat
);

```

### Hent endringer

```csharp
string avsendersertifikatThumbprint = null;         //Som initiert tidligere
OppslagstjenesteKonfigurasjon konfigurasjon = null; //Som initiert tidligere

var oppslagstjenesteKlient = new OppslagstjenesteKlient(konfigurasjon);

var personidentifikator = new[] { "08077000292" };
var personer = oppslagstjenesteKlient.HentPersoner(personidentifikator,
    Informasjonsbehov.Kontaktinfo,
    Informasjonsbehov.Sertifikat,
    Informasjonsbehov.SikkerDigitalPost,
    Informasjonsbehov.VarslingsStatus
);
```

### Hent personer

```csharp
string avsendersertifikatThumbprint = null;         //Som initiert tidligere
OppslagstjenesteKonfigurasjon konfigurasjon = null; //Som initiert tidligere

var oppslagstjenesteKlient = new OppslagstjenesteKlient(konfigurasjon);

var personidentifikator = new[] { "08077000292" };
var personer = oppslagstjenesteKlient.HentPersoner(personidentifikator,
    Informasjonsbehov.Kontaktinfo,
    Informasjonsbehov.Sertifikat,
    Informasjonsbehov.SikkerDigitalPost,
    Informasjonsbehov.VarslingsStatus
    );
```

### Hent printsertifikat

```csharp
string avsendersertifikatThumbprint = null;         //Som initiert tidligere
OppslagstjenesteKonfigurasjon konfigurasjon = null; //Som initiert tidligere

var oppslagstjenesteKlient = new OppslagstjenesteKlient(konfigurasjon);

var printSertifikat = oppslagstjenesteKlient.HentPrintSertifikat();
```