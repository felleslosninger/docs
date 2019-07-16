-----

layout: default  
title: ehf  
headtitle: Begrepskatalog for Sikker digital post -  
group: forretningslag

id: Forretningslag/EHF dokument

next: Forretningslag/Sikkerhet

-----

{% include variables.html %}

  - Identifikator  
    <span style="{ pageUrlMinor ;">[}]({{)</span> pageUrlMinor }}
  - Term  
    {{page.title}}
  - Definisjon  
    EHF faktura fil
  - Datatype  
    fil

Dersom en melding er levert som ren EHF vil denne vises til
posttmottaker uten bruk av nettlesertillegg.  
EHF filen vil konverteres til en HTML visning i henhold til Difi sin mal
for visning av EHF filer til innbyggere.

Postkasseleverandøren kan ha funksjonalitet for å maskinelt behandle EHF
fakturaen for videresending direkte til nettbanken til innbygger.  
En slik tjeneste vil da være priset. Se prisoversikt på
http://samarbeid.difi.no

### Forutsetning ved sending av EHF filer

1.  Det er kun støtte for å sende EHF faktura  
    \#\* Sending av EHF kreditnota er ikke støttet i digital postkasse
    til innbyggere
2.  Mimetype for EHF faktura skal være: “application/ehf+xml”
3.  EHF filen skal alltid være hoveddokument  
    \#\* EHF filen kan sendes som vedlegg, men da er det ikke garantert
    at dette vil kunne vises til innbyggere i annet enn XML format
4.  Det skal kun sendes en EHF fil i en forsendelse
5.  Postkasseleverandør vil kun validere EHF filen i henhold til XSD.  
    \#\* Det er Avsender sitt ansvar at data i EHF filen er korrekt
6.  Det skal ikke være embedded vedlegg i EHF filen.  
    \#\* Eventuelle vedlegg til EHF filen skal legges som ordinære
    vedlegg i dokumentpakken  
    \#\* Difi kan ikke garantere for at embedded vedlegg i EHF faktura
    vil vises i postkassene.

### Forutsetninger for maskinell behandling av EHF fakturaen i digipost:

  - Det må finnes exakt en PaymentMeans.
  - Det må finnes exakt en PaymentId inne i paymentMeans
  - Det må finnes en PaymentMeanDueDate
  - Det må finnes en PayeeFinancialAccount med ID och SchemeID
  - PayeeFinancialAccount SchemeID må være IBAN
  - Valutan må være NOK
