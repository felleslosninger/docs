---
title: Prosesser og dokumenttyper 
permalink: identifiers.html
sidebar: dpi_sidebar
---

![](/images/dpi/underarbeide.png)

Oversikten under inneholder oversikt over de forskjellige dokumenttypene som vil bli brukt i DPI og prosessene disse brukes under. Frem til identifikatorene er godtkjent av norsk peppolmyndighet og Open Peppol kan det forekome justering på idetifikatorenne.

</br>
</br>
</br>
</br>



# Processes

### INNBYGGERPOST_DIGITAL_1_0
|Title|Description|Domain|Identifier|Schema|
|-|-|-|-|-|
|INNBYGGERPOST_DIGITAL_1_0|Brev til innbyggers digitale postkasse|e-Government|urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0|cenbii-procid-ubl|

Documents
- INNBYGGERPOST_DPI_DIGITAL_1_0
- INNBYGGERPOST_DPI_FEILKVITTERING_1_0
- INNBYGGERPOST_DPI_LEVERINGSKVITTERING_1_0
- INNBYGGERPOST_DPI_AAPNINGSKVITTERING_1_0
- INNBYGGERPOST_DPI_VARSLINGFEILETKVITTERING_1_0


### INNBYGGERPOST_FYSISK_1_0
|Title|Description|Domain|Identifier|Schema|
|-|-|-|-|-|
|INNBYGGERPOST_FYSISK_1_0|Fysisk brev til innbyggere|e-Government|urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:digital:ver1.0|cenbii-procid-ubl|

Documents
- INNBYGGERPOST_DPI_PRINT_1_0
- INNBYGGERPOST_DPI_FEILKVITTERING_1_0
- INNBYGGERPOST_DPI_LEVERINGSKVITTERING_1_0
- INNBYGGERPOST_DPI_MOTTAKSKVITTERING_1_0
- INNBYGGERPOST_DPI_LEVERINGSKVITTERING_1_0
- INNBYGGERPOST_PRINT_RETURPOSTKVITTERING_1_0


### INNBYGGERPOST_FLYTTETPOST_1_0
|Title|Description|Domain|Identifier|Schema|
|-|-|-|-|-|
|INNBYGGERPOST_FLYTTETPOST_1_0|Brev som flyttes fra en digital postkasse til en annen|e-Government|urn:fdc:digdir.no:2020:profile:egovernment:innbyggerpost:flyttet:ver1.0|cenbii-procid-ubl|

Documents
- INNBYGGERPOST_DPI_FLYTTET_1_0
- INNBYGGERPOST_DPI_FEILKVITTERING_1_0
- INNBYGGERPOST_DPI_LEVERINGSKVITTERING_1_0


</br>
</br>
</br>
</br>

# Documents

|Title|Identifier|Schema|XSD|Busniess message schema|
|-|-|-|-|-|
|INNBYGGERPOST_DPI_DIGITAL_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::digital##urn:fdc:digdir.no:2020:innbyggerpost:schema:digital::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/digitalpost.schema.json|
|INNBYGGERPOST_DPI_PRINT_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::fysisk##urn:fdc:digdir.no:2020:innbyggerpost:schema:fysisk::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/digitalpost.schema.json|
|INNBYGGERPOST_DPI_FLYTTET_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::flyttet##urn:fdc:digdir.no:2020:innbyggerpost:schema:flyttet::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/flyttedigitalpost.schema.json|
|INNBYGGERPOST_DPI_LEVERINGSKVITTERING_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::leveringskvittering##urn:fdc:digdir.no:2020:innbyggerpost:schema:leveringskvittering::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/leveringskvittering.schema.json|
|INNBYGGERPOST_DPI_FEILKVITTERING_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::feil##urn:fdc:digdir.no:2020:innbyggerpost:schema:feil::1.0||https://docs.digdir.no/schemas/dpi/feil.schema.json|
|INNBYGGERPOST_DPI_AAPNINGSKVITTERING_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::aapningskvittering##urn:fdc:digdir.no:2020:innbyggerpost:schema:aapningskvittering::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/aapningskvittering.schema.json|
|INNBYGGERPOST_DPI_MOTTAKSKVITTERING_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::mottakskvittering##urn:fdc:digdir.no:2020:innbyggerpost:schema:mottakskvittering::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/mottakskvittering.schema.json|
|INNBYGGERPOST_DPI_VARSLINGFEILETKVITTERING_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::varslingfeiletkvittering##urn:fdc:digdir.no:2020:innbyggerpost:schema:varslingfeiletkvittering::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/varslingfeiletkvittering.schema.json|
|INNBYGGERPOST_PRINT_RETURPOSTKVITTERING_1_0|urn:fdc:digdir.no:2020:innbyggerpost:xsd:digital::urn:fdc:digdir.no:2020:innbyggerpost:schema:returpostkvittering::1.0|busdox-docid-qns|https://docs.digdir.no/resources/begrep/sikkerDigitalPost/nyinf/xsd/digitalpost.xsd|https://docs.digdir.no/schemas/dpi/returpostkvittering.schema.json|




