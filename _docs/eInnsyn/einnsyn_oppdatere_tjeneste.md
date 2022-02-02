---
title: Oppdatere til ny versjon av einnsyn-klient
description: Oppdatere til ny versjon av einnsyn-klient
summary: "Her finner du informasjon om hvordan oppdatere til ny versjon av einnsyn-klient"

sidebar: einnsyn_sidebar
redirect_from: /einnsyn_oppdatere_tjeneste
---
[Last ned eInnsyn-klient](https://github.com/difi/einnsyn-klient/releases/tag/2.0.4)

Når du skal oppgradere til ny versjon av einnsyn-klienten må du endre versjonsnummeret i einnsyn-klient.xml fila. Nærmere bestemt denne linja ```<argument>sender-2.0.4.jar</argument>``` . Når du gjør endringer i denne XML-filen så må du reinstallere tjeneste.  Uansett om det er ny versjon eller noe annet som blir endret. 

Etter du er ferdig å redigere einnsyn-klient.xml-fila må du reinstallere tjenesten. For å gjøre dette må du åpne et kommandovindu som administrator. Deretter navigere til einnsyn-mappen (feks: ```C:\einnsyn```)og kjøre følgende kommandoer. 

* einnsyn-klient.exe stop
* einnsyn-klient.exe uninstall
* einnsyn-klient.exe install
* einnsyn-klient.exe start

Disse kommandoene må kjøres uten skråstrek eller bindestrek foran. Skrives nøyaktig som på bildet under:

![Reinstallere tjeneste]({{site.baseurl}}/images/einnsyn/reinstall_klient.png)


> Om du bruker mer enn 1 einnsyn-klient på samme server må du også sette et senderId felt i ```einnsyn-klient.xml``` for at adressering til eInnsyn skal bli korrekt. I dette feltet skal samme orgnummer som er brukt i ```integrasjonspunkt-local.properties```. I mange tilfeller er dette organisasjonens hovedorgnummer. [Mer informasjon om propertyen finner du her]({{site.baseurl}}/docs/eInnsyn/einnsyn_flere_klienter)

---

[Informasjon om oppgradering av Integrasjonspunktet]({{site.baseurl}}/docs/eFormidling/installasjon/eformidling_oppgradere)
