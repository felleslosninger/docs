---
title: Installasjon
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /eformidling_properties_config
---

Formålet med denne siden er å gjøre det enklest mulig å installere og konfigurere eFormidlings
integrasjonspunkt.

1. TOC
{:toc}

## Forutsetninger

Installasjon av eFormidlings integrasjonspunkt forutsetter at følgende punkt er gjennomført:

- [Forberede installasjon](forberede_installasjon)

## Docker-spesifikk konfigurasjon

Ved bruk av Docker må integrasjonspunktet konfigureres ved hjelp av miljøvariable.

Hvordan en spesifiserer konfigurasjonen avhenger av hvilke verktøy som brukes: docker-compose, Kubernetes
eller andre. Et par eksempler:

- [Eksempel på konfigurasjon med Kubernetes](Eksempel/installasjon_aks#7-integrasjonspunktet)
- [Eksempel på konfigurasjon med docker-compose](https://github.com/felleslosninger/efm-mocks/blob/development/docker-compose.yml) (ekstern lenke)

Integrasjonspunktets Docker-image er uten persistent volum. For å unngå tap av data ved f.eks. omstarter er det derfor
nødvendig å konfigurere:

- [Ekstern database](#ekstern-database)
- [Mellomlagring av meldinger til ekstern database](#mellomlagring-av-meldinger-til-ekstern-database)
- [Ekstern meldingskø](#ekstern-meldingskø)

## Java-spesifikk konfigurasjon

Ved bruk av Java direkte kan integrasjonspunktet konfigureres ved hjelp av en konfigurasjonsfil (anbefalt),
Java-parametere eller miljøvariable.

1. Start med å opprette en mappe, for eksempel `c:\integrasjonspunkt`
2. Last så ned [integrasjonspunkt-local.properties]({{site.baseurl}}/resources/eformidling/integrasjonspunkt-local.txt) og lagre i overnevnte mappe
3. Last ned [integrasjonspunkt-[versjonsnummer].jar](../Introduksjon/last_ned#integrasjonspunktet)

eFormidling anbefaler å verifisere at `integrasjonspunkt-[versjon].jar` er fra Digitaliseringsdirektoratet.

- [Hvordan verifiserer jeg at jar-filen er fra Digitaliseringsdirektoratet?](../Selvhjelp/sporsmal_og_svar#hvordan-verifiserer-jeg-at-jar-filen-er-fra-digitaliseringsdirektoratet)

Når du er ferdig skal strukturen på området se slik ut:

```
c:/
|-- integrasjonspunkt/
   |-- integrasjonspunkt-local.properties
   |-- integrasjonspunkt-[versjon].jar
```

> Du må fjerne bort-kommentering (`#` i starten av en linje) fra `integrasjonspunkt-local.properties` for at
> den aktuelle konfigurasjonsegenskapen skal ha effekt.

I tillegg må integrasjonspunktet kjøres med nødvendige tilganger til å opprette filer og mapper på dette filområdet.

Ved bruk av Java direkte anbefales det at det konfigureres en bakgrunnstjeneste som starter og stopper
integrasjonspunktet når operativsystemet starter og stopper, og som ved behov kan startes og stoppes manuelt. Eksempel:

- [Kjøre integrasjonspunktet som en tjeneste (Windows)](Eksempel/start_og_stopp#alt-1-kjøre-integrasjonspunktet-som-en-tjeneste)
- [Kjøre integrasjonspunktet med task scheduler (Windows)](Eksempel/start_og_stopp#alt-3-kjøre-via-task-scheduler-med-minste-rettigheter)
- `systemctl`, `upstart` eller tilsvarende, avhengig av distribusjon (Linux)

Det er også mulig å starte og stoppe integrasjonspunktet manuelt:

- [Kjøre integrasjonspunktet fra kommandovindu](Eksempel/start_og_stopp#alt-2-kjøre-integrasjonspunktet-fra-kommandovindu)

## Konfigurer integrasjonspunktet

Før integrasjonspunktet kan startes må det konfigureres.

Det brukes ulike konvensjoner for navngiving av konfigurasjonsegenskaper avhengig av hvilke mekanisme som brukes for
konfigurasjon. Følgende varianter tilsvarer samme konfigurasjonsegenskap: 

- `person.firstName`, `person.first-name` eller `person.first_name` (for konfigurasjonsfil og Java-parametere)
- `PERSON_FIRST_NAME` (for miljøvariable)

Ved behov for ekstra beskyttelse av virksomhetssertifikat, passord og andre hemmeligheter er det mulig å ta i bruk
Hashicorp Vault eller mekanismer som injiserer verdier til miljøvariable.

- [HashiCorp Vault](#hashicorp-vault)
- [Eksempel på installasjon av integrasjonspunktet på Azure](Eksempel/installasjon_aks) inneholder et eksempel på en
mekanisme som injiserer verdier til miljøvariable

Vi anbefaler å konfigurere integrasjonspunktet i følgende rekkefølge:

1. Minimumskonfigurasjon for å få starte integrasjonspunktet
2. Frivillig konfigurasjon (f.eks. ekstern database, BEST/EDU-integrasjon, osv.)
3. En og en meldingstjeneste

> Vi anbefaler å konfigurere eFormidlings meldingstjeneste (DPO) før Altinn Digital Post (DPV) og KS SvarUt og SvarInn
> (DPF) for å sikre at virksomheten mottar post i sak- og arkivsystemet (og unngå fallback til Altinn Digital Post og
> KS SvarUt og SvarInn for virksomheter som ikke har konfigurert eFormidligs meldingstjeneste)

### Minimumskonfigurasjon

Integrasjonspunktet krever at virksomhetens virksomhetssertifikat er konfigurert.

I tillegg anbefales det å skru av støtte for eInnsyn, som er den eneste meldingstjenesten som er på som standard. Dersom
en skal bruke eInnsyn kan en heller slå på igjen støtten etter at en har verifisert at minimumskonfigurasjonen er ok.

| Egenskap                        | Beskrivelse                                                        | Standardverdi |
|---------------------------------|--------------------------------------------------------------------|---------------|
| difi.move.org.number            | Organisasjonsnummer til din organisasjon (9 siffer)                | (ingen)       |
| difi.move.org.keystore.alias    | Alias (navn) for virksomhetssertifikat i keystore (case sensitivt) | (ingen)       |
| difi.move.org.keystore.password | Passord for virksomhetssertifikat og keystore                      | (ingen)       |
| difi.move.org.keystore.path     | Sti til keystore                                                   | (ingen)       |
| difi.move.org.keystore.type     | Format for keystore (`PKCS12` eller `JKS`)                         | JKS           |
| difi.move.feature.enableDPE     | Skrur på/av støtte for eInnsyn                                     | true          |

Eksempel:

```
difi.move.org.number=991825827
difi.move.org.keystore.alias=myalias
difi.move.org.keystore.password=mypassword
difi.move.org.keystore.path=file:c:/integrasjonspunkt/keystore.p12
difi.move.org.keystore.type=PKCS12
difi.move.feature.enableDPE=false
```

### Valgfri konfigurasjon

#### Miljø (produksjon eller QA)
*Valgfritt*

Tilgjengelige miljø:

- [eForidling Produksjon](../Miljo/produksjon)
- [eFormidling QA](../Miljo/qa)

| Egenskap               | Beskrivelse                                                                                                                                                  | Standardverdi |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| spring.profiles.active | Produksjon (`production`) eller QA (`staging`). Må spesifiseres som miljøvariabel eller Java-parameter. Kan ikke spesifiseres som del av konfigurasjonsfil.  | production    |

Eksempel:

```
java -jar -Dspring.profiles.active=staging integrasjonspunkt-2.8.3.jar  
```

#### Hashicorp Vault
*Valgfritt*

Hashicorp Vault gjør det mulig å beskytte virksomhetssertifikat, passord og andre hemmeligheter. Dokumentasjon for
HashiCorp Vault finnes på [https://www.vaultproject.io/](https://www.vaultproject.io/).

| Egenskap            | Beskrivelse                                                                                                                         | Standardverdi |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------|---------------|
| vault.uri           | Sti HashiCorp Vaults grensesnitt                                                                                                    | (ingen)       |
| vault.token         | Token for autentisering mot HashiCorp Vaults grensesnitt (integrasjonspunktet støtter bare token-autentisering mot HashiCorp Vault) | (ingen)       |
| vault.path          | Vault-sti til tekstlige hemmeligheter (f.eks. passord)                                                                              | (ingen)       |
| vault.resource-path | Vault-sti til binære hemmeligheter (f.eks. keystore med virksomhetssertifikat)                                                      | (ingen)       |

Eksempel:

```
vault.uri=http://localhost:8200
vault.token=s.7NP3IvIjdpHqaInbNQD4NpIY	
vault.path=secret/move
vault.resource-path=secret/resourceleve
```

For å legge hemmeligheter i HashiCorp Vault kan følgende kommandoer brukes:

```
vault kv put secret/move difi.move.org.keystore.password=mypassword difi.move.dpo.password=mypassword
$ vault kv put secret/resource keystore="$(base64 keystore.jks)"
```

Ved bruk av tekstlige hemmeligheter overstyrer disse eventuelle tilsvarende hemmeligheter satt i konfigurasjon. Ved
bruk av binære hemmeligheter må disse refereres i konfigurasjon som i eksempelet under:

```
difi.move.org.keystore.path=vault:keystore
```

#### Ekstern database
*Valgfritt*

Integrasjonspunktet bruker en intern fildatabase (`H2`) som standard. Denne er mulig å bytte ut med en ekstern database.
MySQL, Postgres og MSSQL støttes. Ved bruk av Docker må en slå på ekstern database for å unngå risiko for datatap ved
f.eks. omstarter.

| Egenskap                                       | Beskrivelse                                                                                                   | Standardverdi                    |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------|
| difi.datasource.url                            | Sti til databasen                                                                                             | jdbc:h2:file:./integrasjonspunkt |
| difi.datasource.username                       | Brukernavn for autentisering mot sak-/arkivsystem (autentisering mot sakarkivsystem benyttes av P360)         | sa                               |
| difi.datasource.password                       | Passord for autentisering mot sak-/arkivsystem (autentisering mot sakarkivsystem benyttes av P360)            | (ingen)                          |

Eksempel (MySQL):

```
difi.datasource.url=jdbc:mysql://mydatabaseserver/mydatabase?serverTimezone=UTC
difi.datasource.username=myuser
difi.datasource.password=mypassword
```

Eksempel (Postgres):

```
difi.datasource.url=jdbc:postgresql://mydatabaseserver:5432/mydatabase
difi.datasource.username=myuser
difi.datasource.password=mypassword
```

Eksempel (MSSQL):

```
difi.datasource.url=jdbc:sqlserver://mydatabaseserver:1433;databaseName=mydatabase
difi.datasource.username=myuser
difi.datasource.password=mypassword
```

#### Mellomlagring av meldinger til ekstern database
*Valgfritt*

Integrasjonspunktet mellomlagrer meldinger til fil som standard. Dette er mulig å bytte ut med mellomlagring til
database. Ved bruk av Docker må en slå på mellomlagring til database for å unngå risiko for datatap ved f.eks.
omstarter.

| Egenskap                            | Beskrivelse                                                                                                             | Standardverdi |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------|---------------|
| difi.move.nextmove.useDbPersistence | Slår på/av mellomlagring av meldinger til database. Meldinger mellomlagres til fil istedenfor dersom denne er slått av. | false         |

Eksempel:

```
difi.move.nextmove.useDbPersistence=true
```

#### Ekstern meldingskø
*Valgfritt*

Integrasjonspunktet bruker en intern meldingskø (`ActiveMQ`) som standard. Denne er mulig å bytte ut med en ekstern
meldingskø. Bare ActiveMQ støttes. Ved bruk av Docker må en slå på ekstern meldingskø for å unngå risiko for datatap ved
f.eks. omstarter.

| Egenskap                 | Beskrivelse             | Standardverdi  |
|--------------------------|-------------------------|----------------|
| difi.activemq.broker-url | Sti til ActiveMQ        | vm://localhost |
| difi.activemq.user       | Brukernavn for ActiveMQ | (ingen)        |
| difi.activemq.password   | Passord for ActiveMQ    | (ingen)        |

Eksempel:

```
difi.activemq.broker-url=tcp://localhost:61616
difi.activemq.user=myuser
difi.activemq.password=mypassword
```

#### Transportsikring
*Valgfritt*

Integrasjonspunktet er designet for å kjøre i et lukket miljø som bare gir autoriserte system og brukere tilgang til
grensesnittene som tilbys av integrasjonspunktet. Integrasjonspunktets grensesnitt er som standard ikke beskyttet av
transportsikring. Det er mulig å slå på støtte for transportsikring.

| Egenskap                    | Beskrivelse                                                               | Standardverdi |
|-----------------------------|---------------------------------------------------------------------------|---------------|
| difi.ssl.enabled            | Skrur på/av `HTTPS` transportsikring for integrasjonspunktets grensesnitt | false         |
| difi.ssl.key-store-type     | Format for keystore (`PKCS12` eller `JKS`)                                | (ingen)       |
| difi.ssl.key-store          | Sti til keystore                                                          | (ingen)       |
| difi.ssl.key-store-password | Passord for keystore                                                      | (ingen)       |
| difi.ssl.key-alias          | Alias (navn) for `TLS`-sertifikat i keystore (case sensitivt)             | (ingen)       |

Eksempel:

```
difi.ssl.enabled=true
difi.ssl.key-store-type=PKCS12
difi.ssl.key-store=file:c:/integrasjonspunkt/https.p12
difi.ssl.key-store-password=mypassword
difi.ssl.key-alias=myalias
```

#### HTTP Basic Auth
*Valgfritt*

Integrasjonspunktet er designet for å kjøre i et lukket miljø som bare gir autoriserte system og brukere tilgang til
grensesnittene som tilbys av integrasjonspunktet. Integrasjonspunktets grensesnitt er som standard ikke beskyttet av
autentisering. Det er mulig å slå på støtte for autentisering. Det er bare autentiseringsmekanismen `HTTP basic auth`
som støttes.

| Egenskap                    | Beskrivelse                                                        | Standardverdi |
|-----------------------------|--------------------------------------------------------------------|---------------|
| difi.security.enable        | Skrur på/av `HTTP basic auth` for integrasjonspunktets grensesnitt | false         |
| difi.security.user.name     | Brukernavn for `HTTP basic auth`                                   | (ingen)       |
| difi.security.user.password | Passord for `HTTP basic auth`                                      | (ingen)       |

Eksempel:

```
difi.security.enable=true
difi.security.user.name=myusername
difi.security.user.password=mypassword
```

#### Levetid for meldinger
*Valgfritt*

Integrasjonspunktet er designet for å tåle at meldingstjenestene som brukes kan ha nedetid og andre driftsproblemer uten
at dette skal medføre at levering av meldinger feiler.
| Egenskap                              | Beskrivelse                                                                                                                                                           | Standardverdi |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| difi.move.nextmove.default-ttl-hours  | Tid i timer integrasjonspunktet prøver å levere en utgående melding før denne får status LEVETID_UTLOPT og må sendes på nytt eller håndteres på annet vis av avsender | 24            |

En kan også sette levetid per meldingstype dersom det er ønskelig:

```
difi.move.dpo.default-ttl-hours  # For meldingstypen DPO
difi.move.dpv.default-ttl-hours  # For meldingstypen DPV
difi.move.dpi.default-ttl-hours  # For meldingstypen DPI
difi.move.fiks.ut.default-ttl-hours  # For meldingstypen DPF
difi.move.fiks.io.default-ttl-hours  # For meldingstypen DPFIO
difi.move.nextmove.serviceBus.default-ttl-hours  # For meldingstypen DPE (einnsyn)
```

#### Kapasitet
*Valgfritt*

Standardoppsettet for integrasjonspunktet har vanligvis god kapasitet. Ved utsending av store volum (fra ~ 50 000 daglige
meldinger) kan det være aktuelt å finjustere integrasjonspunktet for å øke kapasiteten:

- øke samtidigheten for utgående meldinger
- senke hyppighet for innhenting av meldingsstatuser
- slå av oppslag i det sentrale folkeregister (DSF) dersom dette ikke trengs
- øke tilgjengelige ressurser for integrasjonspunktet: minne, disk (IO og kapasitet), CPU og nettverk

| Egenskap                                | Beskrivelse                                                                                                               | Standardverdi |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------|
| difi.move.feature.statusQueueIncludes   | Hvilke meldingstjenester (DPI, DPV, DPF, DPFIO, DPO, DPE) som skal eksponere meldinger til eventuelle Webhook-abonnemenet | (ingen)       |
| difi.move.nextmove.statusPollingCron    | Hvor ofte en sjekker etter meldingsstatus i DPF, DPI og DPV                                                               | 0 * * * * *   |
| difi.move.feature.enableDsfPrintLookup  | Slår på/av oppslag av postadresse i DSF. Kan slås av dersom en ikke trenger postadresse                                   | true          |
| difi.move.queue.concurrency             | Samtidighet ved behandling av utgående meldinger                                                                          | 10            |

Eksempel:

```
difi.move.nextmove.statusPollingCron=0 0/10 * * * *
difi.move.feature.enableDsfPrintLookup=false
difi.move.queue.concurrency=20
```

#### Webhook-abonnement

Som standard blir ingen meldinger videreformidlet til webhook-abonnement. Dette må konfigureres.

| Egenskap                                | Beskrivelse                                                                                                               | Standardverdi |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------|
| difi.move.feature.statusQueueIncludes   | Hvilke meldingstjenester (DPI, DPV, DPF, DPFIO, DPO, DPE) som skal eksponere meldinger til eventuelle Webhook-abonnemenet | (ingen)       |

Eksempel:

```
difi.move.feature.statusQueueIncludes=DPI,DPV
```

#### Port
*Valgfritt*

| Egenskap      | Beskrivelse                                | Standardverdi |
|---------------|--------------------------------------------|---------------|
| server.port   | Port for integrasjonspunktets grensesnitt  | 9093          |

Eksempel:

```
server.port=80
```

#### Støttetjenester
*Valgfritt*

Integrasjonspunktet tilbyr en del støttetjenester som eksponerer helsestatus, konfigurasjon og annet som standard. Disse
kan begrenses eller slås helt av dersom en ønsker dette.

- [Støttetjenester](../Selvhjelp/feilsoking#støttetjenester)

| Egenskap                                  | Beskrivelse                                                                                       | Standardverdi |
|-------------------------------------------|---------------------------------------------------------------------------------------------------|---------------|
| management.endpoints.web.exposure.include | Angir hvilke støttetjenester som skal være tilgjengelige (`*` for alle eller kommaseparert liste) | *             |
| management.endpoint.health.show-details   | Angir om helseendepunktet skal vise detaljer utover enkel status (`always` eller `never`)         | always        |

Dersom en skal bruke automatisk oppgradering av integrasjonspunktet krever dette at støttetjenestene `info`, `health` og
`shutdown` er tilgjengelig.

Eksempel:

```
management.endpoints.web.exposure.include=info,health,shutdown
management.endpoint.health.show-details=never
```

#### BEST/EDU-grensesnittet (under utfasing)
*Valgfritt*

Dersom en skal ta i bruk integrasjonspunktet vha. BEST/EDU-grensesnittet (under utfasing) så må dette konfigureres.
Dette er bare aktuelt for eldre sak- og arkivsystemer.

| Egenskap                          | Beskrivelse                                                            | Standardverdi |
|-----------------------------------|------------------------------------------------------------------------|---------------|
| difi.move.noarkSystem.endpointURL | Sti til sak- og arkivsystemets BEST/EDU-grensesnitt                    | (ingen)       |
| difi.move.noarkSystem.type        | Type sak- og arkivsystem: ePhorte, P360, WebSak eller mail             | (ingen)       |
| difi.move.noarkSystem.username    | Brukernavn for autentisering mot sak-/arkivsystem (benyttes av P360)   | (ingen)       |
| difi.move.noarkSystem.password    | Passord for autentisering mot sak-/arkivsystem (benyttes av P360)      | (ingen)       |
| difi.move.noarkSystem.domain      | Brukerdomene for autentisering mot sak-/arkivsystem (benyttes av P360) | (ingen)       |

For å benytte BEST/EDU kreves det at eFormidlings meldingstjeneste er slått på:

- [Konfigurasjon av eFormidlings meldingstjeneste](#konfigurere-eformidlings-meldingstjeneste-dpo)

Eksempel:

```
difi.move.noarkSystem.endpointURL=http://localhost:8088/testExchangeBinding
difi.move.noarkSystem.type=P360
difi.move.noarkSystem.username=myuser
difi.move.noarkSystem.password=mypassword
difi.move.noarkSystem.domain=MYUSERDOMAIN
```

#### E-post
*Valgfritt*

Ved bruk av KS SvarInn så kan integrasjonspunktet håndtere feil ved behandling av innkommende meldinger ved å sende en
e-post. Dette fordi det kan oppstå uforutsette problem med konvertering av meldinger mellom KS FIKS og
eFormidling.

Ved bruk av BEST/EDU-grensesnittet er det støttet å levere innkommende meldinger på e-post istedenfor en BEST/EDU-
integrasjon. Dette kan slås på ved å sette `difi.move.noarkSystem.type=mail`.

I disse tilfellene er det nødvendig å konfigurere e-post.

| Egenskap                       | Beskrivelse                                       | Standardverdi |
|--------------------------------|---------------------------------------------------|---------------|
| difi.move.mail.smtpHost        | Host navn                                         | (ingen)       |
| difi.move.mail.smtpPort        | Portnummer                                        | (ingen)       |
| difi.move.mail.receiverAddress | E-postadresse til postmottaket                    | (ingen)       |
| difi.move.mail.senderAddress   | E-postadresse for avsender (intern e-postadresse) | (ingen)       |
| difi.move.mail.enableAuth      | Slår på/av autentisering mot epost-server         | false         |
| difi.move.mail.username        | Brukernavn til autentisering mot epost-server     | (ingen)       |
| difi.move.mail.password        | Brukernavn til autentisering mot epost-server     | (ingen)       |
| difi.move.mail.trust           | Må settes til ${difi.move.mail.smtpHost}          | (ingen)       |

Eksempel:

```
difi.move.mail.smtpHost=localhost
difi.move.mail.smtpPort=25
difi.move.mail.receiverAddress=postmottak@virksomheten.no
difi.move.mail.senderAddress=integrasjonspunkt@virksomheten.no
difi.move.mail.trust=${difi.move.mail.smtpHost}
```

### Meldingstjenester

#### Konfigurere eFormidlings meldingstjeneste (DPO)

eFormidlings meldingstjeneste er realisert ved hjelp av Altinn Formidling, og krever bruker for Altinn Formidling.

- [Opprette bruker i Altinn Formidling](opprette_brukere#opprette-bruker-for-altinn-formidling-kreves-av-eformidlings-meldingstjeneste)

> Før eFormidlings meldingstjeneste kan tas i bruk må Digdir aktivere den sentralt.
>
> Send forespørsel om dette til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

| Egenskap                      | Beskrivelse                                                     | Standardverdi |
|-------------------------------|-----------------------------------------------------------------|---------------|
| difi.move.feature.enableDPO   | Slår på/av støtte for eFormidlings meldingstjeneste             | false         |
| difi.move.dpo.username        | Brukernavn for en Altinn Formidling datasystembruker            | (ingen)       |
| difi.move.dpo.password        | Passord for en Altinn Formidling datasystembruker               | (ingen)       |
| difi.move.dpo.message-channel | Identifikator for meldingskanal, maks 25 tegn                   | (ingen)       |
| difi.move.dpo.reportees       | Liste av organisasjonsnummer en skal sende og motta på vegne av | (ingen)       |

Eksempel:

```
difi.move.feature.enableDPO=true
difi.move.dpo.username=1234
difi.move.dpo.password=mypassword
```

#### Konfigurere eInnsyns meldingstjeneste (DPE)

> Før eInnsyns meldingstjeneste kan tas i bruk må Digdir aktivere den sentralt.
>
> Send forespørsel om dette til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

| Egenskap                                | Beskrivelse                                               | Standardverdi |
|-----------------------------------------|-----------------------------------------------------------|---------------|
| difi.move.feature.enableDPE             | Slår på/av støtte for eFormidlings meldingstjeneste       | true          |
| difi.move.nextmove.serviceBus.batchRead | Slår på/av ytelsesforbedring (batch read med AMQP)        | false         |

Eksempel:

```
difi.move.feature.enableDPE=true
```

#### Konfigurere KS SvarUt og SvarInn (DPF)

KS SvarUt og SvarInn krever hver sin bruker:

- [Opprette brukere i KS SvarUt og SvarInn](opprette_brukere#opprette-brukere-for-ks-svarut-og-svarinn)


| Egenskap                                         | Beskrivelse                                                                                                             | Standardverdi |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|---------------|
| difi.move.feature.enableDPF                      | Slår på/av støtte for KS SvarUt og SvarInn                                                                              | false         |
| difi.move.fiks.ut.username                       | Brukernavn for KS SvarUt (avsender)                                                                                     | (ingen)       |
| difi.move.fiks.ut.password                       | Passord for KS SvarUt (avsender)                                                                                        | (ingen)       |
| difi.move.fiks.ut.konteringsKode                 | Kode som beskriver faktureringskonto for forsendelsen                                                                   | (ingen)       |
| difi.move.fiks.ut.ekskluderesFraPrint            | Dette dokumentet blir ikke med i utskrift av forsendelsen. Brukes til filer som kun er interessant for digital levering. Ved å oppgi `*` ekskluderes alle filer bortsett fra PDF fra print. | (ingen)       |
| difi.move.fiks.ut.kunDigitalLevering             | SvarUt leverer kun digitalt, ingen print og postlegging. Hvis dokumentet ikke kan leveres digital blir det ikke levert. | (ingen)       |
| difi.move.fiks.ut.paa-vegne-av.&lt;orgnr&gt;.username  | Brukernavn for KS SvarUt (avsender) for virksomhet gitt organisasjonsnummer (flere virksomheter kan oppgis)             | (ingen)       |
| difi.move.fiks.ut.paa-vegne-av.&lt;orgnr&gt;.password  | Passord for KS SvarUt (avsender) for virksomhet gitt organisasjonsnummer (flere virksomheter kan oppgis)                | (ingen)       |
| difi.move.fiks.inn.username                      | Brukernavn for KS SvarInn (mottakersystem)                                                                              | (ingen)       |
| difi.move.fiks.inn.password                      | Passord for KS SvarInn (mottakersystem)                                                                                 | (ingen)       |
| difi.move.fiks.inn.mailOnError                   | Slår på/av utsending av e-post ved feil (krever at [e-post](#e-post) er konfigurert)                                    | true          |
| difi.move.fiks.inn.fallbackSenderOrgNr           | Organisasjonsnummer som blir brukt når meldinger fra SvarInn mangler organisasjonsnummer (ved bruk av eDialog)          | (ingen)       |
| difi.move.fiks.inn.enable                        | Slår på/av støtte for KS SvarInn                                                                                        | true          |
| difi.move.fiks.inn.mailSubject                   | Melding hentet fra SvarInn med utilstrekkelig metadata for levering via BestEdu                                         | (ingen)       |
| difi.move.fiks.inn.paa-vegne-av.&lt;orgnr&gt;.username | Brukernavn for SvarInn (mottakersystem) for virksomhet gitt organisasjonsnummer (flere virksomheter kan oppgis)         | (ingen)       |
| difi.move.fiks.inn.paa-vegne-av.&lt;orgnr&gt;.password | Passord  for SvarInn (mottakersystem) for virksomhet gitt organisasjonsnummer (flere virksomheter kan oppgis)           | (ingen)       |

Eksempel:

```
difi.move.feature.enableDPF=true
difi.move.fiks.inn.username=myusername
difi.move.fiks.inn.password=mypassword
difi.move.fiks.ut.username=myusername2
difi.move.fiks.ut.password=mypassword2
difi.move.fiks.inn.mailOnError=false
```

Eksempel på oppsett for å sende og motta på vegne av to virksomheter:
```
difi.move.feature.enableDPF=true
difi.move.fiks.ut.paa-vegne-av.991825827.username=myusername
difi.move.fiks.ut.paa-vegne-av.991825827.password=mypassword
difi.move.fiks.inn.paa-vegne-av.991825827.username=myusername2
difi.move.fiks.inn.paa-vegne-av.991825827.password=mypassword2
difi.move.fiks.ut.paa-vegne-av.986252932.username=myusername
difi.move.fiks.ut.paa-vegne-av.986252932.password=mypassword
difi.move.fiks.inn.paa-vegne-av.986252932.username=myusername2
difi.move.fiks.inn.paa-vegne-av.986252932.password=mypassword2
```

#### Konfigurere Altinn Digital Post (DPV)

Altinn Digital Post krever bruker:

- [Opprette bruker i Altinn Digital Post](opprette_brukere#opprette-bruker-for-altinn-digital-post)

| Egenskap                                | Beskrivelse                                                                                               | Standardverdi                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| difi.move.feature.enableDPV             | Slår på/av støtte for Altinn Digital Post                                                                 | false                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| difi.move.dpv.username                  | Brukernavn for Altinn tjenesteeier (Mottas på epost til oppgitt kontaktperson)                            | (ingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| difi.move.dpv.password                  | Passord for overnevnte bruker (Mottas på SMS til oppgitt kontaktperson - TIPS. Kopier og lim)             | (ingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| difi.move.dpv.notificationText          | Standard tekst i epost og mobilvarsel (ikke mulig å skille mellom mobil og epost)                         | $reporteeName$: Du har mottatt en melding fra $reporterName$.                                                                                                                                                                                                                                                                                                                                                                                                  |
| difi.move.dpv.sensitiveNotificationText | Standard tekst i epost og mobilvarsel (ikke mulig å skille mellom mobil og epost) for sensitive meldinger | $reporteeName$, har mottatt en taushetsbelagt melding fra $reporterName$. For \u00E5 f\u00E5 tilgang til meldingen, er det n\u00F8dvendig at noen i $reporteeName$ har f\u00E5tt tildelt rollen \u00ABTaushetsbelagt post fra det offentlige\u00BB i Altinn. Dersom dere er usikre p\u00E5 om noen har slik tilgang, anbefaler vi sterkt at dette sjekkes. Les mer om \u00E5 gi tilgang til rollen \u00ABTaushetsbelagt post\u00BB p\u00E5 Altinns nettsider.  |
| difi.move.dpv.notifyEmail               | Slår på/av varsling til e-post som standard                                                               | true                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| difi.move.dpv.notifySms                 | Slår på/av varsling til SMS som standard                                                                  | true                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| difi.move.dpv.allowForwarding           | Slår på/av støtte for at mottaker kan videresende fra Altinn Digital Post                                 | true                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| difi.move.dpv.enableDueDate             | Slår på/av visuell svarfrist i Altinn Digital Post for sendte meldinger som standard                      | true                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| difi.move.dpv.daysToReply               | Standard antall dager til svarfrist i Altinn Digital Post                                                 | 7                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Eksempel:

```
difi.move.feature.enableDPV=true
difi.move.dpv.username=myusername
difi.move.dpv.password=mypassword
difi.move.dpv.enableDueDate=false
```

#### Konfigurere Digital Post til Innbyggere (DPI)

> Før Digital Post til Innbyggere kan tas i bruk må Digdir aktivere den sentralt.
>
> Send forespørsel om dette til <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>

| Egenskap                                       | Beskrivelse                                                                                                                                                                                               | Standardverdi                                   |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| difi.move.feature.enableDPI                    | Slår på/av støtte for Digital Post til Innbyggere                                                                                                                                                         | false                                           |
| difi.move.dpi.mpcId                            | Kanal for å lese DPI-kvitteringer, bør brukes dersom flere instanser av integrasjonspunktet                                                                                                                                                                         | no.difi.move.integrasjonspunkt                  |
| difi.move.dpi.mpcConcurrency                   | Antall kanaler for å lese DPI-kvitteringer                                                                                                                                                                | 1                                               |
| difi.move.dpi.mpcIdListe                       | Denne overstyrer kombinasjonen av mpcId + mpcConcurrency dersom den er satt. De kanalene som listes opp her vil bli brukt ved polling av DPI-kvitteringer                                                 | difi.move.dpi.mpcIdListe[0]=id1                 |
| difi.move.dpi.avsenderidentifikatorListe       | Ved polling av DPI-kvitteringer brukes denne for å indikere at man kun ønsker kvitteringer med gitt avsenderindikator                                                                                     | difi.move.dpi.avsenderidentifikatorListe[0]=ai1 |
| difi.move.dpi.pollWithoutAvsenderidentifikator | Om det skal polles etter kvitteringer uten bruk av avsenderindikator                                                                                                                                      | true                                            |
| difi.move.dpi.client-type                      | Mulige verdier er: json (Ny DPI), xmlsoap (Gammel DPI) og json+xmlsoap (Ny DPI som også poller etter kvitteringer i gammel løsning).                                                                      | xmlsoap                                         |
| difi.move.dpi.receipt-type                     | Mulige verdier er: json (Ny DPI), xmlsoap (Gammel DPI). Denne brukes kun i ny DPI, men den må settes til xmlsoap for de som bruker proxy-klienten mot IP, da denne krever kvitteringer på gammelt format. | json                                            |
| difi.move.dpi.krr-print-url                    | URL til metadata for utskriftstjeneste. Mulige verdier er Postens utskriftstjeneste (under utfasing) `https://krr.digdir.no/rest/v1/printSertifikat` og Skatteetatens utskriftstjeneste (under innfasing og bare tilgjengelig på ny infrastruktur) `https://krr.digdir.no/rest/v2/printSertifikat`. For testmiljø bruk: `https://krr-ver1.digdir.no/rest/v2/printSertifikat` | https://krr.digdir.no/rest/v1/printSertifikat |

Dersom en skal bruke DPI`s proxy-klientbiblioteket, se gjerne:

- [Hva skal til for at proxy-klientbiblioteket for Digital Post til Innbyggere skal fungere?](../Selvhjelp/sporsmal_og_svar#hva-skal-til-for-at-proxy-klientbiblioteket-for-digital-post-til-innbyggere-skal-fungere)

Eksempel:

```
difi.move.feature.enableDPI=true
difi.move.dpi.mpcId=DigdirSinKø
```

#### Konfigurere KS FIKS IO

KS FIKS IO krever bruker:

- [Hvordan tar man i bruk FIKS IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio/#hvordan-tar-man-i-bruk-fiks-io) (ekstern lenke)

| Egenskap                               | Beskrivelse                                                                                                    | Standardverdi |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------|---------------|
| difi.move.feature.enableDPFIO          | Slår på/av støtte for KS FIKS IO                                                                               | false         |
| difi.move.fiks.io.konto-id             | FIKS IO kontoId                                                                                                | (ingen)       |
| difi.move.fiks.io.integrasjons-id      | Id til valgt integrasjon                                                                                       | (ingen)       |
| difi.move.fiks.io.integrasjons-passord | Passord til valgt integrasjon                                                                                  | (ingen)       |
| difi.move.fiks.io.sender-orgnr         | Statisk avsender-orgnr for mottatte meldinger                                                                  | (ingen)       |

Eksempel:

```
difi.move.feature.enableDPFIO=true
difi.move.fiks.io.konto-id=47b0c75b-ddb5-447b-88d2-c4030d183fb3
difi.move.fiks.io.integrasjons-id=54f9d591-5523-447a-b839-eb5a43bb75ca
difi.move.fiks.io.integrasjons-passord=d9efdc55-a3a3-4b66-8b38-c73202655f2f
difi.move.fiks.io.sender-orgnr=910077473
```

## Neste steg

- [Automatisk oppgradering](automatisk_oppgradering) (anbefalt)
- [Sikkerhetskopi](sikkerhetskopi) (anbefalt)
- [Overvåking](overvaking) (anbefalt)
