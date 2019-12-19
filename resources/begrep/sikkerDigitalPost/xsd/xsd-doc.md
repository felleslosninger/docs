---

layout: default  
title: Generere dokumentasjon basert på skjema  
headtitle: Sikker digital post  
---

# Generere dokumentasjon basert på XSD

## Generere PNG på bakgrunn av XSD

XML Schema to Graphviz http://sourceforge.net/projects/xmlschematograp/
kan benyttes til å generere dot fil basert på XSD.  
Graphviz kan benyttes til å generere PNG (samt andre formater) basert på
dot fil.

### Generere dot fil fra XSD

``` brush: bash; toolbar: false
java -jar XmlSchemaToGraph.jar -o graph.dot file:///sti/til/sdp-melding.xsd
```

### Generer PNG fil fra dot fil

``` brush: bash; toolbar: false
dot -Tpng -O /sti/til/graph.dot
```

PNG fil havner i samme katalog som graph.dot fil

## Generere HTML fra XSD

Xs3p http://wiki.fiforms.org/index.php/Xs3p kan brukes til å generere
HTML fra XSD slik:

``` brush: bash; toolbar: false
xsltproc xs3p/xs3p.xsl sdp-melding.xsd > output.html
```
