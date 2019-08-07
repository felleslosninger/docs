---

title: Webservice sikkerhet  
permalink: sdp_webservicesecurity.html
sidebar: dpi_sidebar
---


### Webservice security headere

Webservice security header består av følgende elementer:

| Identifikator | Kardinalitet | Datatype |
| --- | --- | --- |
| BinarySecurityToken | 1..1 | [wsse:BinarySecurityToken](http://docs.oasis-open.org/wss/v1.1/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717134) |
| Timestamp | 1..1 | [wsu:Timestamp](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717167) |
| Signature | 1..1 | [ds:Signature](https://www.oasis-open.org/committees/download.php/21256/wss-v1.1-spec-errata-os-SOAPMessageSecurity.htm#_Toc118717148) |

Meldingen er kun signert på SOAP nivå, ikke kryptert.

### Timestamp

  - Time-to-live skal være 120 sekunder

På grunn av den korte Time-to-live så kreves det at alle aktører har
servere med klokker synkronisert med [NTP](http://www.ntp.org/).

### BinarySecurityToken

  - Sertifikat for validering av signatur skal inkluderes i SOAP header
  - Security Token være X509 sertifikater 
  - Sertifikatet som brukes skal være et virksomhetssertifikat
      - sertifikatet skal være utstedt til behandlingsansvarlig eller
        databehandler.
      - I testmiljøet brukes test-virksomhetssertifikat utstedt fra
        samme leverandører som i produksjon

### Signature

  - Signeringsalgoritmen skal være
    <http://www.w3.org/2001/04/xmldsig-more#rsa-sha256>. 
  - Fingeravtrykksalgoritmen i referansene skal være
    <http://www.w3.org/2001/04/xmlenc#sha256>

Følgende elementer i SOAP meldingen signeres:

  - Timestamp
  - Soap body
  - eb:Messaging header
  - Soap attachment

### eksempel

Under kan er det lagt opp en et eksempel på en gyldig Webservice
security header generert fra java klient biblioteket for sending av
digital post:

```xml
 <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" env:mustUnderstand="true">
      <wsse:BinarySecurityToken EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary" ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3" wsu:Id="X509-b1149be9-7b9e-4ce6-8cca-1cd915ae4fe9">MIIFOjCCBCKgAwIBAgIKGQqI22LuZ+0U6TANBgkqhkiG9w0BAQsFADBRMQswCQYDVQQGEwJOTzEdMBsGA1UECgwUQnV5cGFzcyBBUy05ODMxNjMzMjcxIzAhBgNVBAMMGkJ1eXBhc3MgQ2xhc3MgMyBUZXN0NCBDQSAzMB4XDTE0MDYxNjA4NTYyNloXDTE3MDYxNjIxNTkwMFowgaAxCzAJBgNVBAYTAk5PMSwwKgYDVQQKDCNESVJFS1RPUkFURVQgRk9SIEZPUlZBTFROSU5HIE9HIElLVDEhMB8GA1UECwwYU0RQIC0gbWVsZGluZ3N1dHZla3NsaW5nMSwwKgYDVQQDDCNESVJFS1RPUkFURVQgRk9SIEZPUlZBTFROSU5HIE9HIElLVDESMBAGA1UEBRMJOTkxODI1ODI3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx6IPA2KSAkSupen5fFM1LEnW6CRqSK20wjpBnXf414W03eWUvBlw97c6k5sl2tYdn4aVb6Z9GeDaz1bLKN3XwhFGPk9PnjSIhrFJNAPnWVEBDqGqfeMrEsYdOEgM2veBZDYkhVwipjr8AesmptTRAat61q+6hCJe8UZqjXb4Mg6YKSTAHfJdthAG06weBMgVouQkTkeIIawM+QPcKQ3Wao0gIZi17V0+8xzgDu1PXr90eJ/Xjsw9t0C8Ey/3N7n3j3hplsZkjOJMBNHzbeBG/doroC6uzVURiuEn9Bc9Nk224b+7lOBZ1FvNNrJVUu5Ty3xyMDseCV7z1QTwW7wcpwIDAQABo4IBwjCCAb4wCQYDVR0TBAIwADAfBgNVHSMEGDAWgBQ/rvV4C5KjcCA1X1r69ySgUgHwQTAdBgNVHQ4EFgQU6JguiqDjkgjEGRHhzkbeKeqyWQEwDgYDVR0PAQH/BAQDAgSwMBYGA1UdIAQPMA0wCwYJYIRCARoBAAMCMIG7BgNVHR8EgbMwgbAwN6A1oDOGMWh0dHA6Ly9jcmwudGVzdDQuYnV5cGFzcy5uby9jcmwvQlBDbGFzczNUNENBMy5jcmwwdaBzoHGGb2xkYXA6Ly9sZGFwLnRlc3Q0LmJ1eXBhc3Mubm8vZGM9QnV5cGFzcyxkYz1OTyxDTj1CdXlwYXNzJTIwQ2xhc3MlMjAzJTIwVGVzdDQlMjBDQSUyMDM/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlzdDCBigYIKwYBBQUHAQEEfjB8MDsGCCsGAQUFBzABhi9odHRwOi8vb2NzcC50ZXN0NC5idXlwYXNzLm5vL29jc3AvQlBDbGFzczNUNENBMzA9BggrBgEFBQcwAoYxaHR0cDovL2NydC50ZXN0NC5idXlwYXNzLm5vL2NydC9CUENsYXNzM1Q0Q0EzLmNlcjANBgkqhkiG9w0BAQsFAAOCAQEAKOTM1zSdGHWUBKPzDPYCcci9cpbktd2WuBg028bRC0NwKSWUKeuUfWesTiu/P4UlYGe86qd/+z3MNpN89aGA8pr0E0WpI+NM+v+Cb0dQwxHASHtrkVo9CVx6V6/QSBqIUEMfNquDHzxB2/mXbv6GuO5eIl3OSVKg7Ffd/1wdE6zeMmHQO+zRpfj+OVEhNPb5cLa13Ah9+JrMkr1O7VUFbozLQgFPhuI8/5+u8U/6cDOOmcFV4f4IYUmhbcLiW5MQnvaJ8044+uInOQTNtSkKmZAo7Jnm4KUyhFXftJOStOHSlODOQcepVS7csszO5yWQRMTV8doEsaH5p/LBXYF56Q==</wsse:BinarySecurityToken>
      <wsu:Timestamp wsu:Id="TS-08b9bf59-4914-462c-868d-6277a702c578">
        <wsu:Created>2015-09-15T06:47:11.672Z</wsu:Created>
        <wsu:Expires>2015-09-15T06:52:11.672Z</wsu:Expires>
      </wsu:Timestamp>
      <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="SIG-35cb96d4-3a9b-4769-ae2b-5c88391c3c75">
        <ds:SignedInfo>
          <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
            <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="env"/>
          </ds:CanonicalizationMethod>
          <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
          <ds:Reference URI="#soapBody">
            <ds:Transforms>
              <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList=""/>
              </ds:Transform>
            </ds:Transforms>
            <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <ds:DigestValue>FNviz1QfCqb4noYySIXZFsvxjmNuyEEmUcMPAu56p1c=</ds:DigestValue>
          </ds:Reference>
          <ds:Reference URI="#TS-08b9bf59-4914-462c-868d-6277a702c578">
            <ds:Transforms>
              <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="wsse env"/>
              </ds:Transform>
            </ds:Transforms>
            <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <ds:DigestValue>NQxFSon1NctBZOPD+B4Oq4eF7xNOCqBL7ltQGD1wdgQ=</ds:DigestValue>
          </ds:Reference>
          <ds:Reference URI="#id-55daa7c1-e2f8-4026-ae5e-add5643588e0">
            <ds:Transforms>
              <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList=""/>
              </ds:Transform>
            </ds:Transforms>
            <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <ds:DigestValue>o05bS7fdRT9wbANXGz+kRFPfVIgXQct+jaj6wmulQkY=</ds:DigestValue>
          </ds:Reference>
          <ds:Reference URI="cid:cfbb64c8-be18-4a51-98e6-1a9ef85cab5a@meldingsformidler.sdp.difi.no">
            <ds:Transforms>
              <ds:Transform Algorithm="http://docs.oasis-open.org/wss/oasis-wss-SwAProfile-1.1#Attachment-Content-Signature-Transform"/>
            </ds:Transforms>
            <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <ds:DigestValue>lTQzlEnR4v0Dkm+JqZdzStEh2l/z0hqU8D5h3aW1m5w=</ds:DigestValue>
          </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue>vyLuoJf7rjNNuE7EQkOZgj50PkbehFZFP6WAeoJnFsCqUzh8AcSUmussxIgb8hUzKQLkYWlq48+ZPutpufI04j1hak64rphHLYKMqxepaCT4Kwv9mvdSPyTTtPOi3ou3IELF4DSo9rCRevB5CJFwDmT6OGrheBIx3H7GY7pqblpbVDRsh+sCT+5NaFEiysEIIQgnYxM9PDKmXtzcojwDt4QTx3huZ8fl10kPs5PFDZqLh0GQlIjSp9Uqq5ZaLHgbAXbA+lsDbfT5omAzUBTpf7ktrtBTUrOra+BEjSUzz0pGGKnYVAuRhnbkRY2hk2DQFAiv32JXMYevyw8l2RiMZQ==</ds:SignatureValue>
        <ds:KeyInfo Id="KI-d2cd2986-3da9-4127-8523-a8b18197a34d">
          <wsse:SecurityTokenReference wsu:Id="STR-5407ac8e-44a1-42f5-a9c7-aaca98484352">
            <wsse:Reference URI="#X509-b1149be9-7b9e-4ce6-8cca-1cd915ae4fe9" ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509v3"/>
          </wsse:SecurityTokenReference>
        </ds:KeyInfo>
      </ds:Signature>
    </wsse:Security>

```
