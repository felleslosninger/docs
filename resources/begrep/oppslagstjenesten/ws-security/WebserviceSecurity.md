-----

layout: default  
title: Webservice sikkerhet  
headtitle: Oppslagstjenesten  
group: WS-security

id: WS-security/WebserviceSecurity

-----

## {{page.title}}

### WS-Security headere

Følgende WS-Security elementer skal anvendes:

| Identifikator | Kardinalitet | Datatype                                                                                                                                |
| ------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Timestamp     | 1..1         | [wsu:Timestamp](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717167) |
| Signature     | 1..1         | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148)  |

Forespørsel skal kun signeres på SOAP nivå, ikke krypteres.
Signeringssertifikatet skal representeres som et BinarySecurityToken i
meldinga

| Identifikator       | Kardinalitet | Datatype                                                                                                                      |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| BinarySecurityToken | 1..1         | [wsse:BinarySecurityToken](http://docs.oasis-open.org/wss/v1.1/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717134) |

Respons frå Difi vil vere både signert og kryptert.

### Timestamp

  - Time-to-live skal være 120 sekunder.

### Signature

Følgende elementer i SOAP meldingen signeres:

  - Timestamp
  - Soap body
  - Oppslagstjenesten / Paavegneav - elementet dersom dette benyttes

<!-- end list -->

  - Signeringsalgoritmen skal være
    <http://www.w3.org/2001/04/xmldsig-more#rsa-sha256>. 
  - Fingeravtrykksalgoritmen i referansene skal være
    <http://www.w3.org/2001/04/xmlenc#sha256>
  - Signeringssertifikatet skal representeres som et BinarySecurityToken
    i meldingen. Se spesifikke krav til dette under.

### Krav til signeringssertifikat

  - Sertifikat for validering av signatur skal inkluderes i SOAP header
    representeret som et BinarySecurityToken.
  - Security Token skal være X509 sertifikater
  - Sertifikatet som brukes skal være et virksomhetssertifikat ihht
    PKI-rammeverket for offentlig sektor
      - sertifikatet skal være utstedt til behandlingsansvarlig eller
        databehandler.
      - I testmiljøet brukes test-virksomhetssertifikat utstedt fra
        samme leverandører som i produksjon

### Eksempel

Under kan er det lagt opp en et eksempel på en gyldig WS-Security header
generert fra java klient biblioteket for sending av digital post:

``` brush: xml; toolbar: false
<soap:Header xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" soap:mustUnderstand="true">
        <wsse:BinarySecurityToken EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary" ValueType="http://docs
.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3" wsu:Id="X509-15730854BE4465A46D14538884282111">MIIFOjCCBCKgAwIBAgIKGQqI22LuZ+0U6TANBgkqhkiG9w0BAQsFADBRMQswCQYDVQQGEwJOTzEdMBsGA1UECgwUQnV5cGFzcyBBUy05ODMxNjMzMjcxI
zAhBgNVBAMMGkJ1eXBhc3MgQ2xhc3MgMyBUZXN0NCBDQSAzMB4XDTE0MDYxNjA4NTYyNloXDTE3MDYxNjIxNTkwMFowgaAxCzAJBgNVBAYTAk5PMSwwKgYDVQQKDCNESVJFS1RPUkFURVQgRk9SIEZPUlZBTFROSU5HIE9HIElLVDEhMB8GA1UECwwYU0RQIC0gbWVsZGluZ3N1dHZla3NsaW5nMSwwKgYDVQQDDCNESVJFS
1RPUkFURVQgRk9SIEZPUlZBTFROSU5HIE9HIElLVDESMBAGA1UEBRMJOTkxODI1ODI3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx6IPA2KSAkSupen5fFM1LEnW6CRqSK20wjpBnXf414W03eWUvBlw97c6k5sl2tYdn4aVb6Z9GeDaz1bLKN3XwhFGPk9PnjSIhrFJNAPnWVEBDqGqfeMrEsYdOEgM2veBZ
DYkhVwipjr8AesmptTRAat61q+6hCJe8UZqjXb4Mg6YKSTAHfJdthAG06weBMgVouQkTkeIIawM+QPcKQ3Wao0gIZi17V0+8xzgDu1PXr90eJ/Xjsw9t0C8Ey/3N7n3j3hplsZkjOJMBNHzbeBG/doroC6uzVURiuEn9Bc9Nk224b+7lOBZ1FvNNrJVUu5Ty3xyMDseCV7z1QTwW7wcpwIDAQABo4IBwjCCAb4wCQYDVR0TB
AIwADAfBgNVHSMEGDAWgBQ/rvV4C5KjcCA1X1r69ySgUgHwQTAdBgNVHQ4EFgQU6JguiqDjkgjEGRHhzkbeKeqyWQEwDgYDVR0PAQH/BAQDAgSwMBYGA1UdIAQPMA0wCwYJYIRCARoBAAMCMIG7BgNVHR8EgbMwgbAwN6A1oDOGMWh0dHA6Ly9jcmwudGVzdDQuYnV5cGFzcy5uby9jcmwvQlBDbGFzczNUNENBMy5jcmwwd
aBzoHGGb2xkYXA6Ly9sZGFwLnRlc3Q0LmJ1eXBhc3Mubm8vZGM9QnV5cGFzcyxkYz1OTyxDTj1CdXlwYXNzJTIwQ2xhc3MlMjAzJTIwVGVzdDQlMjBDQSUyMDM/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlzdDCBigYIKwYBBQUHAQEEfjB8MDsGCCsGAQUFBzABhi9odHRwOi8vb2NzcC50ZXN0NC5idXlwYXNzLm5vL29jc
3AvQlBDbGFzczNUNENBMzA9BggrBgEFBQcwAoYxaHR0cDovL2NydC50ZXN0NC5idXlwYXNzLm5vL2NydC9CUENsYXNzM1Q0Q0EzLmNlcjANBgkqhkiG9w0BAQsFAAOCAQEAKOTM1zSdGHWUBKPzDPYCcci9cpbktd2WuBg028bRC0NwKSWUKeuUfWesTiu/P4UlYGe86qd/+z3MNpN89aGA8pr0E0WpI+NM+v+Cb0dQwxHAS
HtrkVo9CVx6V6/QSBqIUEMfNquDHzxB2/mXbv6GuO5eIl3OSVKg7Ffd/1wdE6zeMmHQO+zRpfj+OVEhNPb5cLa13Ah9+JrMkr1O7VUFbozLQgFPhuI8/5+u8U/6cDOOmcFV4f4IYUmhbcLiW5MQnvaJ8044+uInOQTNtSkKmZAo7Jnm4KUyhFXftJOStOHSlODOQcepVS7csszO5yWQRMTV8doEsaH5p/LBXYF56Q==</wss
e:BinarySecurityToken>
        <wsu:Timestamp wsu:Id="TS-1">
            <wsu:Created>2016-01-27T09:53:48.201Z</wsu:Created>
            <wsu:Expires>2016-01-27T09:58:48.201Z</wsu:Expires>
        </wsu:Timestamp>
        <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="SIG-3">
            <ds:SignedInfo>
                <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                    <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="soap"/>
                </ds:CanonicalizationMethod>
                <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
                <ds:Reference URI="#id-2">
                    <ds:Transforms>
                        <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                            <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList=""/>
                        </ds:Transform>
                    </ds:Transforms>
                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                    <ds:DigestValue>q7aba13DrQlwblPtH+u8fkJ2nnVPzOOQVfzk5IOOjpg=</ds:DigestValue>
                </ds:Reference>
                <ds:Reference URI="#TS-1">
                    <ds:Transforms>
                        <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                            <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="wsse soap"/>
                        </ds:Transform>
                    </ds:Transforms>
                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                    <ds:DigestValue>sypzNs+XRwRKoV/cdG0AqdfsoeVz1QnI94dGuUUqI8g=</ds:DigestValue>
                </ds:Reference>
            </ds:SignedInfo>
            <ds:SignatureValue>JOKR3CLGpQnyHQL6oHY7qVhrETfAl8iRzFbYKdWS8jFxTsuH1nVHcFN0tHpHx5NJzx2HB8LmNNlZP
t4HxeZ97dETLRAaI2NUm197Ln8ATAQ23iC2MiVrFdNf2XZjVVd9WWcqdrwQDzDwS5tz78mAd0wL5Tk1fgppEWX1mniYmLrzTJVQQ5tXm8rD0RRKTpgADf+9ZLLj+k6jTBaRvEqKx9DWLOyNv3nAQI8tkGHxMR8vYDjg0pfFPsetaW+D/xLWHNuVZremHFDDHRtbQxp7wGaFLV/5NLYLJmA+oxWYAxlwmxQHPYg+nQMynlhak
D1HopGeX/bGuJc2M8p5vg9I7g==</ds:SignatureValue>
            <ds:KeyInfo Id="KI-15730854BE4465A46D14538884282132">
                <wsse:SecurityTokenReference wsu:Id="STR-15730854BE4465A46D14538884282153">
                    <wsse:Reference URI="#X509-15730854BE4465A46D14538884282111" ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3"/>
                </wsse:SecurityTokenReference>
            </ds:KeyInfo>
        </ds:Signature>
    </wsse:Security>
</soap:Header>
```
