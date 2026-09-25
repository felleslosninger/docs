---
title: Henting av innsynskrav – API
description: Guide for offentlige virksomheter som ønsker å hente innsynskrav via eInnsyn REST API, med eksempler på autentisering, endepunkter og paginering.
summary: Viser hvordan virksomheter kan integrere mottak av innsynskrav direkte fra eInnsyn API, inkludert statistikk og feilhåndtering.
sidebar: einnsyn_sidebar
redirect_from: /henting_av_innsynskrav_api
---
 
# eInnsyn API - hvordan hente innsynskrav?
 
Denne guiden beskriver hvordan offentlige virksomheter kan hente innsynskrav (FOI-forespørsler) som er rettet mot dem, via eInnsyn REST API. Dette er relevant for virksomheter som ønsker å integrere mottaket av innsynskrav direkte i sitt saksbehandlingssystem, fremfor å bruke e-postvarsler.
 
---
 
## Bakgrunn: hva er et innsynskrav?
 
Et **innsynskrav** (`Innsynskrav`) er en forespørsel fra en innbygger om innsyn i en konkret journalpost. En **innsynskravbestilling** (`InnsynskravBestilling`) er «kurven» som samler ett eller flere innsynskrav i én ordre, og er den primære enheten som sendes til virksomheten.
 
Datamodellen ser slik ut:
 
```
InnsynskravBestilling (ik_...)
├── email          – rekvirentens e-postadresse
├── verified       – om e-post er bekreftet
├── bruker         – koblet brukerkonto, om innlogget
├── language       – foretrukket språk
└── innsynskrav[]  (ikd_...)
    ├── journalpost    – hvilken journalpost det gjelder
    ├── enhet          – ansvarlig enhet
    ├── email          – rekvirentens adresse (lesbart)
    └── sent           – tidspunkt da kravet ble sendt til virksomheten
```
 
---
 
## Autentisering
 
Innsynskrav-endepunktene er **ikke offentlig tilgjengelige**. For å hente innsynskrav rettet mot din virksomhet trenger du en **API-nøkkel** knyttet til din Enhet. API-nøkler opprettes du (slik.)[https://docs.digdir.no/docs/eInnsyn/publisering_med_api.html#steg-1--generer-api-n%C3%B8kkel]
 
Send nøkkelen i `API-KEY`-headeren på alle kall:
 
```
API-KEY: <din-nøkkel>
```
 
> **Merk:** Ikke bruk `Bearer`-prefix – send nøkkelverdien direkte.
 
 
Bruk `GET /me` for å verifisere at nøkkelen fungerer og hvilken Enhet den er knyttet til:
 
```bash
curl -s https://api.einnsyn.no/me \
  -H "API-KEY: <din-nøkkel>"
```
 
Responsen viser `authType`, `type`, `id` og `orgnummer` – bekreft at dette stemmer med din virksomhet.
 
---
 
## Hente innsynskrav for din Enhet
 
### Finn din Enhet-ID
 
Hvis du ikke kjenner din eInnsyn-enhets-ID, slå den opp med organisasjonsnummer:
 
```bash
curl -s "https://api.einnsyn.no/enhet/<orgnummer>"
```
 
Alternativt med navn:
 
```bash
curl -s "https://api.einnsyn.no/enhet?query=Statens+vegvesen"
```
 
Enhets-ID-er har prefiks `enh_`.
 
### Hent innsynskrav via Enhet
 
```bash
curl -s "https://api.einnsyn.no/enhet/<enhet-id>/innsynskrav" \
  -H "API-KEY: <din-nøkkel>"
```
 
Dette returnerer en paginert liste med `Innsynskrav`-objekter (prefiks `ikd_`). Hvert objekt inneholder referanse til `journalpost`, `enhet`, avsenderens `email`, og tidspunktet `sent`.
 
### Hent innsynskravbestillinger via Bruker (for innloggede brukere)
 
Om du behandler krav fra identifiserte brukere, kan du liste bestillingene deres:
 
```bash
curl -s "https://api.einnsyn.no/bruker/<bruker-id>/innsynskravBestilling" \
  -H "API-KEY: <din-nøkkel>"
```
 
---
 
## Hente detaljer om en bestilling
 
### Hent en InnsynskravBestilling direkte
 
```bash
curl -s "https://api.einnsyn.no/innsynskravBestilling/<bestilling-id>" \
  -H "API-KEY: <din-nøkkel>"
```
 
### List alle Innsynskrav i en bestilling
 
```bash
curl -s "https://api.einnsyn.no/innsynskravBestilling/<bestilling-id>/innsynskrav" \
  -H "API-KEY: <din-nøkkel>"
```
 
### Ekspandere journalpost direkte i svaret
 
Bruk `?expand=journalpost` for å inline journalpost-objektet i stedet for bare ID:
 
```bash
curl -s "https://api.einnsyn.no/innsynskravBestilling/<bestilling-id>/innsynskrav?expand=journalpost" \
  -H "API-KEY: <din-nøkkel>"
```
 
---
 
## Paginering
 
Alle listekall returnerer en `PaginatedList` med feltene `items` og `next`. Bruk `next`-verdien til å hente neste side:
 
```bash
# Første side
curl -s "https://api.einnsyn.no/enhet/<enhet-id>/innsynskrav?limit=50" \
  -H "API-KEY: <din-nøkkel>"
 
# Neste side – bruk next-URL fra forrige svar direkte
curl -s "<next-url>" \
  -H "API-KEY: <din-nøkkel>"
```
 
> **Merk:** `next` er en relativ URL. Bruk `https://api.einnsyn.no` som base, eller bruk den bundlede Python-hjelperen (se nedenfor) som håndterer dette automatisk.
 
---
 
## Statistikk: antall mottatte innsynskrav
 
For aggregerte tall over tid, bruk `/statistics`-endepunktet. Du trenger ikke autentisering for dette:
 
```bash
# Antall innsynskrav mot en enhet i 2024
curl -s "https://api.einnsyn.no/statistics?administrativEnhet=<enhet-id>&aggregateFrom=2024-01-01&aggregateTo=2024-12-31"
```
 
Feltet `summary.createdInnsynskravCount` i responsen gir totalen for perioden. `timeSeries[].createdInnsynskravCount` gir fordelingen per tidsintervall (dag, måned, år).
 
Legg til `query=`-parameter for å avgrense til innsynskrav mot journalposter som matcher et søkeord:
 
```bash
curl -s "https://api.einnsyn.no/statistics?administrativEnhet=<enhet-id>&query=byggesak&aggregateFrom=2024-01-01&aggregateTo=2024-12-31"
```
 
---
 
## Eksempel: hent nye innsynskrav med Python
 
Under er et eksempel som bruker den bundlede `einnsyn_client.py`-hjelperen. Juster `ENHET_ID` og `API_KEY` til dine verdier.
 
```python
import sys
sys.path.insert(0, "/path/to/einnsyn-api-skill/scripts")
 
from einnsyn_client import EInnsynClient
 
BASE_URL = "https://api.einnsyn.no"
ENHET_ID = "enh_..."
API_KEY  = "<din-nøkkel>"
 
client = EInnsynClient(base_url=BASE_URL, api_key=API_KEY)
 
# Hent alle innsynskrav paginert
for ikd in client.paginate(f"/enhet/{ENHET_ID}/innsynskrav"):
    jp = ikd.get("journalpost")
    jp_id = jp if isinstance(jp, str) else jp.get("id")
    print(f"Krav {ikd['id']} – journalpost {jp_id} – sendt {ikd.get('sent')}")
```
 
---
 
## Feilhåndtering
 
| HTTP-statuskode | Typisk årsak | Tiltak |
|---|---|---|
| `401 Unauthorized` | Ugyldig eller manglende `API-KEY` | Sjekk at headeren er satt riktig uten `Bearer`-prefix |
| `403 Forbidden` | Nøkkelen har ikke tilgang til ressursen | Verifiser at nøkkelen er knyttet til riktig Enhet |
| `404 Not Found` | Ukjent ID | Dobbeltsjekk ID-prefiks (`ikd_`, `ik_`, `enh_`) |
| `429 Too Many Requests` | For mange kall | Implementer eksponentiell back-off |
| `422 Validation Error` | Ugyldig parameter | Les `fieldError[]`-arrayet i feilresponsen for detaljer |
 
Feilresponsen har alltid strukturen:
 
```json
{
  "type": "authorizationError",
  "message": "You are not authorized to access this resource."
}
```
 
For `validationError` kommer i tillegg et `fieldError[]`-array med `fieldName`, `value` og `message`.
 
---
 
## Relevante endepunkter – oppsummering
 
| Endepunkt | Metode | Beskrivelse |
|---|---|---|
| `/me` | GET | Verifiser autentisering og hvilken Enhet/Bruker du er |
| `/enhet/{id}/innsynskrav` | GET | List alle innsynskrav for en Enhet |
| `/innsynskrav/{id}` | GET | Hent et enkelt innsynskrav |
| `/innsynskravBestilling/{id}` | GET | Hent en innsynskravbestilling |
| `/innsynskravBestilling/{id}/innsynskrav` | GET | List innsynskrav i en bestilling |
| `/bruker/{id}/innsynskravBestilling` | GET | List bestillinger for en Bruker |
| `/bruker/{id}/innsynskrav` | GET | List enkeltinnsynskrav for en Bruker |
| `/statistics` | GET | Aggregerte telling inkl. `createdInnsynskravCount` |
 
---
 
## Mer informasjon
 
- API-spesifikasjon (TypeSpec): [github.com/felleslosninger/einnsyn-api-spec](https://github.com/felleslosninger/einnsyn-api-spec)
- Klientbibliotek Java: [github.com/felleslosninger/einnsyn-sdk-java](https://github.com/felleslosninger/einnsyn-sdk-java)
- Klientbibliotek TypeScript: [github.com/felleslosninger/einnsyn-sdk-typescript](https://github.com/felleslosninger/einnsyn-sdk-typescript)
- Kontakt og support: [servicedesk@digdir.no](mailto:servicedesk@digdir.no)
