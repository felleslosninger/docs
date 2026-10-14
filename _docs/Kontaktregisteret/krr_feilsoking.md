---
title: Feilsøking i KRR
description:
summary:

sidebar: krr_sidebar
product: KRR
redirect_from: /krr_feilsoking
---


## Ofte stillte spørsmål

### "Prefiks" feltet er tomt når jeg skal opprette et nytt scope.

Om prefiks feltet er tomt, så har ikke virksomheten din fått opprettet et prefiks. Da får du ikke opprette et scope. Ta kontakt med servicedesk@digdir.no.

### Scopet jeg skal konsumere mangler når jeg trykker på "Legg til scopes".

Mest sannsynlig har ikke API-tilbyder delt tilgang med virksomheten du representerer, eller så har de gitt tilgang i et annet miljø. Kontakt API-tilbyder.

### "Ny integrasjon" er grået ut i produksjonsmiljøet.

For å administrere i produksjonsmiljøet, så må man logge inn med ID-porten. Dette forutsetter at vi har lagt inn personnummeret ditt på forhånd. Om "Ny integrasjon" fortsatt er grået ut etter innlogging med ID-porten. Kontakt servicedesk@digdir.no

### Jeg ser integrasjonene til en annen virksomhet enn det jeg forventer.

Tilgang til Samarbeidsportalen og selvbetjeningsløsningen gis på bakgrunn av epost-domenet ditt, som igjen er koblet til en virksomhet på vår side.  For store virksomheter og selskap, så kan det være at det gjenbrukes epost-domene på tvers av flere virksomheter. Ta kontakt med servicedesk@digdir.no.

### Jeg får ikke token fra Maskinporten når jeg setter consumer_org.

Sjekk at kunden har fått tilgang til delegeringsscopene, at kunden har gitt deg fullmakt i Altinn, og at klienten din er registrert på ditt eget organisasjonsnummer. Se [Oppslag på vegne av annen virksomhet]({{site.baseurl}}/docs/Kontaktregisteret/oppslagstjenesten_rest#oppslag-på-vegne-av-annen-virksomhet).

### KRR svarer med 401 når jeg bruker delegeringsscopene.

Sjekk først at tokenet er gyldig og hentet fra riktig miljø. Hvis tokenet ellers er gyldig, kan årsaken være at det ikke er hentet gjennom delegering i Altinn. Hent token med `consumer_org` satt til kundens organisasjonsnummer, med en klient registrert på ditt eget organisasjonsnummer.

