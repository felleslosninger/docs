---
title: Standard Business Document  

sidebar: dpi_sidebar
redirect_from: /standardbusinessdocument_index
---

|---|---|
| Identifikator | |
| Term          | {{page.title}} |
| Definisjon    | Forretningsmeldingen i en forsendelse inkludert adresseringsinformasjon. |
| Forkortelse   | SBD |
| Kilde         | [GS1](http://www.gs1.org) |

### Standard Business Document (SBD)

[Standard Business
Document](http://www.gs1.org/ecom/standards/guidelines#s2) er en
[GS1](http://www.gs1.org) standard utviklet for å forenkle utveksling av
dokumenter i en B2B kontekst.  
Standardkonvolutten inneholder informasjon for identifisering,
adressering og ruting av forretningsmeldingen. SBD er obligatorisk i
neste versjon av PEPPOL infrastrukturen for fakturaformidling.

I sikker digital post blir Standard Business Document brukt til å sende:

* informasjonen som meldingsformidler trenger for å formidle
meldingen
* identifisering og knytningen mellom forretningsmeldingen
* informasjon som postboksen trenger for å presentere og håndtere
dokumentpakken

### Klassediagram

[![]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/uml_diagram.jpg)]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/uml_diagram.jpg)

### Attributter

| Identifikator                                                    | Kardinalitet | Datatype                    | Kommentar                                                                          |
| ---------------------------------------------------------------- | ------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| [StandardBusinessDocumentHeader]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/StandardBusinessDocumentHeader) | 1..1         | sh:StandardBusinessDocument | Informasjon for å formidle postforsendelsen                                        |
| [Melding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/)      | 0..1         | [Melding]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/meldinger/) | Forretningsmelding identifisert i [DocumentIdentification]({{site.baseurl}}/resources/begrep/sikkerDigitalPost/forretningslag/StandardBusinessDocument/DocumentIdentification) |
