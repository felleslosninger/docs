---
title: HTML
permalink: dpi_html.html
sidebar: dpi_timo_sidebar
---

![](/images/dpi/underarbeide.png)

 
    |---|---|
| Identifikator | html |
| Term          | HTML |
| Definisjon    | HTML fil |
| Datatype      | fil |

Dersom en melding er levert som ren HTML vil denne vises til
posttmottaker uten bruk av nettlesertillegg.

### Begrensninger

1.  Av sikkerhetsmessige hensyn, og for å sikre korrekt visning i hele
    dokumentets levetid, kan dokumentet ikke inneholde referanser til
    eksternt innhold eller javascript. 
2.  Links til egne sider er unntatt og kan benyttes.  
    \#\* Lenker må ha: target=“\_blank” for å kunne være klikkbare
3.  Bilder som ønskes brukt i HTML-brev skal derfor legges inn i HTML
    encodet etter “”data url scheme“” (RFC 2397).  
    \#\* img src kan ikke være multiline
4.  HTML-dokumenter får ikke inneholder forms av følgende årsaker:  
    \#\* Dersom serveren, som mottar POST fra en form, ikke svarer
    korrekt eller ikke lengre finnes, vil dette resultere i at brukerne
    blir møtt med en feil som ikke kan håndteres av postkassen.  
    \#\* Det vil ikke kunne sende med troverdige opplysninger om hvem
    brukeren er.
5.  Det tillates ikke bruk av Flash, Java, JavaScript eller andre
    tredjepartsløsninger som ikke inngår i HTML-standardene.
6.  hr align-attr er ikke tillatt
7.  Tabeller kan benyttes  
    \#\* td elementer kan ikke være tom

Det anbefales at HTML overholder W3C og WCAG av hensyn til
tilgjengeligheten og for å sikre nettleserkompatibilitet.

Bredden i viewport som er tilgjengelig i postkasse for visning av HTML
brev er i utgangspunktet 793 pixels.  
Dvs. HTML dokumenter som sendes som er større enn 793 pixels vil
resultere i horisontal scrolling (standard nettleser oppførsel).  
Vi oppfordrer Avsendere som sender HTML dokumenter til å ikke benytte
abolutte bredder i dokumentet og tilpasse bilder til å møte denne
bredden.

Postkasseløsningen er reponsiv som betyr at på mobil vises HTML
dokumentet som avsender har sendt helt alene.  
Det anbefales alltid at det ikke benyttes en fast bredde og at innholdet
tilpasser seg browserens størrelse.  
Dvs. bruk av responsiv teknikker i HTML dokumentet (fra avsender) vil
resultere i et mye mer brukervennlig dokument på mobile enheter.

### Feilhåndtering

HTML-meldinger som ikke oppfyller disse kravene blir avvist ved mottak.
Dette vil resultere i en SKAL VÆRE LINK TIL ../../meldinger/FeilMelding.md 
Avsendervirksomheten må korrigere meldingene og sende på nytt.