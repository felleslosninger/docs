#!/bin/bash

eksempler=$(dirname "$0")
xsds="${eksempler}/../xsd"


function validate {
  local xmlFile="$1"
  local schema="$2"
  xmllint --noout --schema ${schema} ${xmlFile}
}

errors=0
for eksempel in ${eksempler}/sdp*.xml; do
  validate ${eksempel} ${xsds}/sdp.xsd || ((errors++))
done

for eksempel in ${eksempler}/sbdh.xml; do
  validate ${eksempel} ${xsds}/SBDH20040506-02/StandardBusinessDocumentHeader.xsd || ((errors++))
done

validate ${eksempler}/utvidelser/lenke.xml ${xsds}/utvidelser/lenke.xsd || ((errors++))
validate ${eksempler}/utvidelser/arrangement.xml ${xsds}/utvidelser/arrangement.xsd || ((errors++))

if (( errors > 0 )); then
  echo Fant ${errors} filer med valideringsfeil!
  exit 1
fi

