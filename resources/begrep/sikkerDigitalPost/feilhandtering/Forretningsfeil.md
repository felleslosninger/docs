---

title: Forretningsfeil  

sidebar: dpi_sidebar
---


Forretningsfeil er feil som medfører at aktørene i Sikker Digital Post
ikke er i stand til å utføre en operasjon slik som spesifisert i
forretningsmeldinger.

### Manglende mottakskvittering fra Meldingsformidler

Meldingsformidler vil verifisere format og innhold på
[StandardBusinessDocumentHeader]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/StandardBusinessDocumentHeader)
ved mottak av en
[DigitalPostMelding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/DigitalpostMelding.png).  
Dette gjøres for å sikre at meldingen kan rutes videre til en
postkasseleverandør og garantere for at forretningskvitteringer vil
kunne bli returnert til Avsender.

Ved feil i
[StandardBusinessDocumentHeader]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/StandardBusinessDocumentHeader)
vil meldingsformidler returnere en [SignalMessage med
Error](sdp_index_signalmessage.html).

Denne metoden for feilhåndtering fra Meldingsformidler er valgt for å gi
en rask, enkel og sikker feilhåndtering fra Meldingsformidler.  
Meldingsformidler returnerer ingen forretningskvitteringer, men operer
nærmere transportlaget, dette er årsaken til at feil i
adresseringsinformasjonen i
[StandardBusinessDocumentHeader]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/StandardBusinessDocumentHeader)
vil resultere i en [SignalMessage med
Error](sdp_index_signalmessage.html) og ikke en egen forretningsfeil
som Avsender må hente igjennom kvitteringsgrensesnittet.

### Manglende Leveringskvittering

Postkasseleverandør skal returnere en
[Leveringskvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/LeveringsKvittering) til Avsender.  
Dersom denne uteblir lengre enn forventet bør Avsender håndtere dette
igjennom feilhåndteringsprosedyrer etablert med sentralforvalter.  
(Feilhåndteringsprosedyrene etableres som del av bruksvilkår)

#### Hvor lenge skal en Avsender vente på en Leveringskvittering?

Dette avhenger av hva Avsender har sendt.  
Dersom Avsender sender en prioritert digital postmelding skal en
Leveringskvittering leveres i løpet av minutter, mens dersom en Avsender
sender en normal digital postmelding kan det ta et par timer.  
Mer tydelige beskrivelser vil bli utarbeidet i forbindelse
bruksvilkårene.

### Varslingfeilet

Les mer om hvordan Avsender bør håndtere en
[Varslingfeiletkvittering]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/VarslingfeiletKvittering).

### Innholdsfeil i forretningsmeldingen

Dette kan være feil relatert til innholdet i SBD som ugyldig
identifikator på mottaker og/eller feil i Dokumentpakke, for eksempel
relatert til dekryptering/signeringsvalidering gjort av postkassen.

### Mer om forretningsfeil

For mer informasjon om forretningsfeil, se [dokumentasjon av
forretningsmeldingen Feil](sdp_feil.html)
