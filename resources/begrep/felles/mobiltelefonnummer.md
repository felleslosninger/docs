---
title: Mobiltelefonnummer

sidebar: begrep_sidebar
redirect_from: /mobiltelefonnummer
---

| ---- | ---- |
| Term | Mobiltelefonnummer |
| Definisjon | Et internasjonalt mobiltelefonnummer |
| Datatype | String |
| Kilde | Digdir |
| Kommentar | Et mobiltelefonnummer lagret i Digital kontaktregister har følgende format: | 

* En tekststreng på formatet:

```
"^\\+?[- _0-9]+$"
```

* Minimum lengde : 8
* Maximum lengde : 20
* Tillatte tegn: 0-9 og eventuelt + som første karakter

I tillegg er det en ekstra validering av norske mobilnummer. Norske mobilnummer er definert som:

* Nummeret starter på 0047,+47 eller er på 8 tegn

For disse mobiltelefonnummer er det følgende validering:
* Første siffer (etter evt. landkode) er 9 eller 4

Dette er i henhold til Nummerplan E.164

### Xml eksempel  

```
<ns2:Mobiltelefonnummer sistOppdatert="2014-02-25T13:08:00.000+01:00" sistVerifisert="2013-10-21T10:09:28.000+02:00">12121212</ns2:Mobiltelefonnummer>
```


