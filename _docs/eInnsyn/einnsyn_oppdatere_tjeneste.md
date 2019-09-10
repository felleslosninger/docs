---
title: Oppdatere til ny versjon av einnsyn-klient
description: Oppdatere til ny versjon av einnsyn-klient
summary: "Her finner du informasjon om hvordan oppdatere til ny versjon av einnsyn-klient"
permalink: einnsyn_oppdatere_tjeneste.html
sidebar: einnsyn_sidebar
---

Når du skal oppgradere til ny versjon av einnsyn-klienten må du endre versjonsnummeret i einnsyn-klient.xml fila. Nærmere bestemt denne linja ```<argument>sender-2018-04-13.jar</argument>``` . Når du gjør endringer i denne XML-filen så må du reinstallere tjeneste.  Uansett om det er ny versjon eller noe annet som blir endret. 

Etter du er ferdig å redigere einnsyn-klient.xml-fila må du reinstallere tjenesten. For å gjøre dette må du åpne et kommandovindu som administrator. Deretter navigere til einnsyn-mappen (feks: ```C:\einnsyn```)og kjøre følgende kommandoer. 

* einnsyn-klient.exe stop
* einnsyn-klient.exe uninstall
* einnsyn-klient.exe install
* einnsyn-klient.exe start

Disse kommandoene må kjøres uten noe form for skråstrek eller bindestrek foran. Skrives nøyaktig som på bildet under:

![Reinstallere tjeneste](/felleslosninger/images/einnsyn/reinstall_klient.png)

[Nyeste versjon finner du her](https://github.com/difi/einnsyn-klient/releases/)
