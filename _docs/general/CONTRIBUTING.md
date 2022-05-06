---
title: "Hvordan bidra"

sidebar: main_sidebar
product: general
redirect_from: /contributing
---

Vi setter pris på at du ønsker å bidra inn i denne dokumentasjonen, og ønsker alle typer tilbakemeldinger velkommen (feilmelding, ny funksjonalitet, korrigering, tilleggsdokumentasjon etc.).

Under finner du informasjon om hvordan du kan bidra.

## Rapportere om feil eller be om ny funksjonalitet

Vi benytter [GitHub issue tracker](https://github.com/difi/felleslosninger/issues) for å rapportere feil eller ønsker om ny funksjonalitet.

Før du legger inn en sak, er det fint om du sjekker raskt gjennom de saker som [allerede er rapportert](https://github.com/difi/felleslosninger/issues),for å sikre at ikke noen andre allerede har rapportert det samme.

## Rask redigering av eksisterende dokumenter

Rask redigering gjør det enklere å rapportere og fikse små feil og utelatelser i dokumentene. Vi har tilrettelagt for dette ved å legge inn en kobling som tar deg direkte til kildefilen i GitHub, slik at små korrigeringer kan gjøres på en enkel måte.

1. Når du står på en side i dokumentasjonen som du ønsker å korrigere, trykker du på lenken "Endre/rediger innhold" øverst på siden:
    {% include image.html file="/docs/images/edit-1.jpg" border="true" alt="Enkel redigering" max-width="90%" %}

2. Du vil da bli sendt til den aktuelle markdown filen i GitHub, og klikk deretter på blyantikonet for å redigere filen. (Du må være innlogget i GitHub for at dette skal fungere)
    {% include image.html file="/docs/images/edit-2.jpg" border="true" alt="Rediger fil i GitHub" max-width="90%" %}

3. Gjør endringene dine direkte i nettleseren, og sjekk *Preview changes* for å se hvordan endringene dine vil se ut.

4. Legg inn en tittel og beskrivelse av endringene, og klikk på *Propose file change*

5. Du blir da sendt til en ny side, og her velger du *Create pull request*, legger inn tittel og beskrivelse for pull forespørselen og trykker på *Create pull request* en gang til.

6. De foreslåtte endringene dine vil nå bli behandlet av Digdir, og det kan eventuelt komme tilbakemeldinger eller kommentarer som du bør følge opp.


## Større endringer ved å lage en forgrening

Endringer eller korrigeringer via pull forespørsel setter vi stor pris på. Før du sender en pull forespørsel ber vi om at du sjekker følgende:

1. Du jobber mot den siste versjonen på *master* branch.
2. Sjekk at det ikke eksisterer åpne, og nylig aksepterte (merged) pull forespørsler som omhandler endringen/feilen allerede.
3. Opprett en issue for å diskutere større endringer du forslår, slik at vi enkelt kan ha en konstruktiv dialog.

For å sende en pull forespørsel, følg stegene under:

1. Lag en forgrening (fork) av repo'et.
2. Gjør endringene/korrigeringene du foreslår.
3. Kontroller at lokale tester kjører feilfritt.
4. Commit til din forgrening, og benytt klare og konsise commit meldinger.
5. Send oss en pull forespørsel
6. Delta aktivt i eventuelle spørsmål, dialoger eller annet vedr. din pull forespørsel.

Videre info om å [lage en forgrening](https://help.github.com/articles/fork-a-repo/) og
[lage en pull forespørsel](https://help.github.com/articles/creating-a-pull-request/).
