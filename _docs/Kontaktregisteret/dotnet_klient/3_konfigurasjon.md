---
title: Konfigurasjon
description: 
summary: ""

sidebar: krr_dotnet
product: KRR
---

OppslagstjenesteKonfigurasjon initieres med hvilket miljø man ønsker å kjøre mot, FunksjoneltTestmiljø eller Produksjonsmiljø, samt tilhørende sertifikat til gitt miljø. 

{% highlight csharp%}

var testmiljøKonfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.FunksjoneltTestmiljø, avsendersertifikatThumbprint);
var produksjonsmiljøKonfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.Produksjonsmiljø, avsendersertifikatThumbprint);

{% endhighlight%}
<h3 id="proxy">Proxy</h3>
For å bruke proxy setter man `ProxyHost`,`ProxyPort` og `ProxyScheme` i konfigurasjonen:
{% highlight csharp%}
var konfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.FunksjoneltTestmiljø, avsendersertifikatThumbprint);
{
    ProxyHost = "proxyhost",
    ProxyPort = 3333,
    ProxyScheme = "https"
};
{% endhighlight%}
<h3 id="sendpaavegneav">På vegne av</h3>

For å gjøre oppslag på vegne av en annen virksomhet settes organisasjonsnummeret til gitt bedrift i `OppslagstjenesteKonfigurasjon.SendPåVegneAv`:
{% highlight csharp%}

var testmiljøKonfigurasjon = new OppslagstjenesteKonfigurasjon(Miljø.FunksjoneltTestmiljø, avsendersertifikatThumbprint);
testmiljøKonfigurasjon.SendPåVegneAv = "984661185";

{% endhighlight%}
