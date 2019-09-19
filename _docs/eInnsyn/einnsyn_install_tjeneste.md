---
title: Installere einnsyn-klient som Windows-service
description: Installere einnsyn-klient som Windows-service
summary: "Her finner du informasjon om Installere einnsyn-klient som Windows-service"
permalink: einnsyn_install_tjeneste.html
sidebar: einnsyn_sidebar
---


Etter du er ferdig å redigere einnsyn-klient.xml-fila må du installere tjenesten. For å gjøre dette må du åpne et kommandovindu som administrator. Deretter navigere til einnsyn-mappen (feks: ```C:\einnsyn```)og kjøre følgende kommandoer. 

* einnsyn-klient.exe install
* einnsyn-klient.exe start

Disse kommandoene må kjøres uten noe form for skråstrek eller bindestrek foran. Skrives nøyaktig som på bildet under:

![installere einnsyn-klient tjenesten](/felleslosninger/images/einnsyn/install_klient.png)

Du kan sjekke status på tjenesten ved å bruke følgande kommando i samme kommandovindu:

* einnsyn-klient.exe status

### Verifisere at einnsyn-klient tjenesten har startet

Meldinga **no.difi.einnsyn.Application - Started Application in 7.121 seconds (JVM running for 7.951)** bør ligge i einnsyn-klient.out loggen. Denne indikerer at tjenesten har starter og lytter på inputDirectory-mappen.

### Verifisere at klienten har prosessert filene

I loggfilen einnsyn-klient.out vil det komme meldinger som disse:
[Last ned som loggfil](/felleslosninger/resources/einnsyn/einnsyn_sending_eksempel.txt)

```
{"@timestamp":"2017-11-30T12:22:42.812+01:00","@version":1,"message":"Splitting took 0 ms","logger_name":"no.difi.einnsyn.sender.service.AsyncDataSplittingService","thread_name":"main","level":"DEBUG","level_value":10000}
{"@timestamp":"2017-11-30T12:22:42.812+01:00","@version":1,"message":"Splitting serialization took 0 ms","logger_name":"no.difi.einnsyn.sender.service.AsyncDataSplittingService","thread_name":"main","level":"DEBUG","level_value":10000}
{"@timestamp":"2017-11-30T12:22:42.812+01:00","@version":1,"message":"ConversationId \"57e0477e-cec1-476c-9e49-e45734bfc736\"","logger_name":"ipclient_transactionlogger","thread_name":"main","level":"INFO","level_value":20000}
{"@timestamp":"2017-11-30T12:22:42.812+01:00","@version":1,"message":"Create message http://localhost:9093<{\"receiverId\":\"991825827\",\"serviceIdentifier\":\"DPE_DATA\",\"conversationId\":\"57e0477e-cec1-476c-9e49-e45734bfc736\",\"customProperties\":{\"orgnumber\":\"971277882\",\"data_type\":\"journaldata\"}},{Content-Type=[application/json]}>","logger_name":"directorylistener_transactionlogger","thread_name":"main","level":"INFO","level_value":20000}
{"@timestamp":"2017-11-30T12:22:42.828+01:00","@version":1,"message":"Post url http://localhost:9093","logger_name":"ipclient_transactionlogger","thread_name":"main","level":"INFO","level_value":20000}
{"@timestamp":"2017-11-30T12:22:42.828+01:00","@version":1,"message":"Upload message http://localhost:9093/out/messages/57e0477e-cec1-476c-9e49-e45734bfc736
```

Ved opplasting vil det i integrasjonspunktloggen ```application.log``` vil det ligge loggmeldinger som disse:
[Last ned som loggfil](/felleslosninger/resources/einnsyn/ip_sending_eksempel.txt)

```
2017-12-11 11:01:19.538  INFO 14932 --- [ qtp10823740-24] n.d.m.nextmove.MessageOutController      : Created new conversation resource [id=b32ef599-4a2f-41ab-b641-ca29d0d63715, serviceIdentifier=DPE_DATA]
2017-12-11 11:01:20.211  INFO 14932 --- [ qtp10823740-31] AUDIT                                    : Message [id=b32ef599-4a2f-41ab-b641-ca29d0d63715, serviceIdentifier=DPE_DATA] sent to service bus
```


