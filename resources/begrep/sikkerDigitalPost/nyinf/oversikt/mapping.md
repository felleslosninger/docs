---
title: Mapping XML -> JSON 
permalink: dpi_mapping.html
sidebar: dpi_sidebar
---



Mapping fra gammel XML melding til ny JSON melding

## SBDH

<table>
    <thead>
        <tr>
            <th colspan=4>XML</th>
            <th>JSONPath</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=13>StandardBusinessDocumentHeader</td>
            <td>HeaderVersion</td>
            <td></td>
            <td></td>
            <td>>$.standardBusinessDocument.standardBusinessDocumentHeader.headerVersion</td>
        </tr>
        <tr>            
            <td rowspan=2>Sender</td>
            <td rowspan=2>Identifier</td>
            <td>Authority</td> 
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.sender[0].identifier.authority</td>           
        </tr>
        <tr>            
            <td>Value</td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.sender[0].identifier.value</td>
        </tr>
        <tr>
            <td rowspan=2>Receiver</td>
            <td rowspan=2>Identifier</td>
            <td>Authority</td> 
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.receiver[0].identifier.authority</td>           
        </tr>
        <tr>
            <td>Value</td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.receiver[0].identifier.value</td>
        </tr>
        <tr>
            <td rowspan=5>DocumentIdentification</td>
            <td>Standard</td>
            <td></td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.documentIdentification.standard</td>
        </tr>
        <tr>            
            <td>TypeVersion</td>
            <td></td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.documentIdentification.typeVersion</td>
        </tr>
         <tr>            
            <td>InstanceIdentifier</td>
            <td></td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.documentIdentification.instanceIdentifier</td>
        </tr>
        <tr>            
            <td>Type</td>
            <td></td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.documentIdentification.type</td>
        </tr>
        <tr>            
            <td>CreationDateAndTime</td>
            <td></td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.documentIdentification.creationDateAndTime</td>
        </tr>
        <tr>
            <td rowspan=3>BusinessScope</td>
            <td rowspan=3>Scope</td>
            <td>Type</td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.businessScope.scope[].</td>
        </tr>
        <tr>
        <td>InstanceIdentifier</td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.businessScope.scope[].</td>
        </tr>
        <td>Identifier</td>
            <td>$.standardBusinessDocument.standardBusinessDocumentHeader.businessScope.scope[].</td>
        </tr>
    </tbody>
</table>

## Digitalpost


<table>
    <thead>
        <tr>
            <th colspan=6>XML</th>
            <th>JSONPath</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Signature</td>
        </tr>
        <tr>
            <td rowspan=23>DigitalPostMelding</td>
            <td rowspan=5>Avsender</td>
            <td rowspan=3>Organisasjon</td>
            <td>authority</td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.avsender.virksomhetsidentifikator.authority</td>
        <tr>
        <tr>
            <td>value</td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.avsender.virksomhetsidentifikator.value</td>
        </tr>
        <tr>            
            <td>avsenderidentifikator</td>
            <td></td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.avsender.avsenderidentifikator</td>
        </tr>
        <tr>
            <td>fakturaReferanse</td>
            <td></td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.avsender.fakturaReferanse</td>
        </tr>
        <tr>        
            <td rowspan=2>Mottaker</td>
            <td>Personidentifikator</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Ikke lenger i bruk *</td>
        </tr>
        <tr>
            <td>postkasseadresse</td>
            <td></td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.mottaker.postkasseadresse</td>
        </tr>        
        <tr>
            <td rowspan=16>DigitalpostInfo</td>
            <td>Sikkerhetsnivå<td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.sikkerhetsnivaa</td>
        </tr>
        <tr>
            <td>Virkningsdato</td>
            <td></td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.virkningsdato</td>
        </tr>        
        <tr>
            <td>Virkningstidspunkt</td>
            <td></td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.virkningstidspunkt</td>
        </tr>        
        <tr>
            <td>aapningskvittering</td>
            <td></td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.aapningskvittering</td>
        </tr>        
        <tr>
            <td rowspan=2>ikkeSensitivTittel</td>
            <td>lang</td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.ikkesensitivtittel.spraak</td>
        </tr> 
        <tr>            
            <td>value</td>
            <td></td>
            <td></td>
            <td>$.standardBusinessDocument.digital.ikkesensitivtittel.tittel</td>
        </tr>        
        <tr>
            <td rowspan=10>Varsler</td>
            <td rowspan=5>epostvarsel</td>
            <td>epostadresse</td>
            <td></td>
            <td>$.standardBusinessDocument.digital.epostvarsel.epostadresse</td>
        </tr> 
        <tr>       
            <td rowspan=2>varslingsTekst</td>
            <td>lang</td>   
            <td>$.standardBusinessDocument.digital.epostvarsel.spraak</td>
        </tr>
        <tr>
            <td>value</td>   
            <td>$.standardBusinessDocument.digital.epostvarsel.varslingstekst</td>
        </tr>
        <tr>
            <td rowspan=2>repetisjoner</td>
            <td>dagerEtter</td>   
            <td>$.standardBusinessDocument.digital.epostvarsel.repetisjoner[] **</td>
        </tr> 
        <tr>            
            <td>dagerEtter</td>   
            <td>$.standardBusinessDocument.digital.epostvarsel.repetisjoner[] **</td>
        </tr>    
        <tr>            
            <td rowspan=5>smsVarsel</td>
            <td>mobiltelefonnummer</td>
            <td></td>
            <td>$.standardBusinessDocument.digital.</td>
        </tr> 
        <tr>       
            <td rowspan=2>varslingsTekst</td>
            <td>lang</td>   
            <td>$.standardBusinessDocument.digital.</td>
        </tr>
        <tr>
            <td>value</td>   
            <td>$.standardBusinessDocument.digital.</td>
        </tr>
        <tr>
            <td rowspan=2>repetisjoner</td>
            <td>dagerEtter</td>   
            <td>$.standardBusinessDocument.digital.</td>
        </tr> 
        <tr>            
            <td>dagerEtter</td>   
            <td>$.standardBusinessDocument.digital.</td>
        </tr>    
        <tr>
            <td rowspan=2>Dokumentpakkefingeravtrykk</td> 
            <td></td>   
            <td></td>   
            <td></td>   
            <td></td>   
            <td>$.standardBusinessDocument.digital.</td>    
        </tr>
    </tbody>
<table>

\* adfa

** array der man angir int verdi antal dager man ønsker varselet skal komme etter

## Digitalpost - Utskrift






