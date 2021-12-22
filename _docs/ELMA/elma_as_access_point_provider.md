---
title: Elma
description: Elma user manual for access point providers
summary: "Elma user manual access point providers"

product: elma
sidebar: elma_sidebar
---

*Updated: 06.11.2020*

### Terminology
Here are some terms which will be used throughout this page.

- Service provider = A service provider is associated with one or more domains, and participants registered by the provider will only be approved for message exchange within the provider's domain(s).
- Access point provider = An access point provider operates access points that the server providers can use by making an agreement.
- Agreement = An agreement between a service provider and an access point provider for usage of a specific access point.
- Processes = Standardized, maintained collections of document types used in e-procurement.
- Participants = Are organizations that are connected to a specific endpoint. You can think of this as a "contract" between an organization and a Service provider.
- Access point = Represents a physical access point service endpoint, accessible through one or several URLs.
- Endpoint = An access point has one or more endpoints represented by a URL and transport profile.
- Certificates = Your PEPPOL access point certificate.
- Domains = Collections of processes used in e-procurement. 
- Document types = Standardized message types belonging to processes, used in communication between access points.
- Transport profile = The transport method to be used. AS4 is an example of a transport profile.
- Identifier = Consists of a set prefix and a organizational number. e.g. 9908:991825827
- SML (Service Metadata Locator) = A DNS that returns the address to the SMP that holds the metadata of a PEPPOL receiver. The SML is the only centrally operated component in the PEPPOL transport infrastructure. It is managed by OpenPEPPOL and operates out of Brussels by DG/DIGIT.

## Access Points

At the top of the access point page a list of your access points will be displayed. If you have no access points, a 
"Get Started!" box will be displayed, making it easy to initiate the creation of your first access point.  
At the bottom of the page you will see a list of all access points in ELMA.

![](images/elma/app/access_points.PNG)

### Add access point

To add an access point, you can press the "Add Access Point"-button. Then you can choose a title for your access point.

![](images/elma/app/access_point_new.PNG)

After pressing the "Save"-button, you will see access point page.

![](images/elma/app/access_point.PNG)

Please notice the empty Endpoint table. The next task will be to create one or more Endpoints.

### Add endpoint

There can be one Endpoint for each Transport Profile. To add an Endpoint, press the "Add Endpoint"-button.

![](images/elma/app/endpoint_new.PNG)

After pressing the "Save"-button, you will see access point again. This time the Endpoint-table will show the newly 
created Endpoint.  

![](images/elma/app/access_point_with_endpoint.PNG)


## Agreements

Here you will see agreements for usage of your access point by the service providers. 

![](images/elma/app/agreements.PNG)

The service providers initiate an agreement. The service provider will not be able to activate the agreement before you as the access point owner has added the
public key certificate belonging to the service provider. This should only be done after you have installed the key-pair in your access point.

### Adding a public key certificate

Select the agreement you want to add a public key certificate to by clicking the "View"-button. Then you will see the agreement page:

![](images/elma/app/agreement.PNG)

Then you press the "Add Certificate"-button:

![](images/elma/app/agreement_add_certificate.PNG)

Select the correct certificate type and the certificate itself and press the "Save"-button.
 
![](images/elma/app/agreement_certificate_added.PNG)
 
Now the agreement is ready for activation by the service provider.

---

## Certificates

This is where you can see all the certificates belonging to one or more agreements.
To add, update or delete a certificate, you need to go to select an agreement first.

The certificates should be of a PEM format with a .crt or .cer file type.

![](images/elma/app/certificates.PNG)

---

## Service Providers

Here you will find the different Service Providers in ELMA and their contact information.

![](images/elma/app/service_providers.PNG)

## Access Point Providers

Here you will find the different Access Point Providers in ELMA and their contact information and access points.

![](images/elma/app/access_point_providers.PNG)

---

## Users 
Whenever you make a new user it will be automatically added to the same Access Point Provider you are logged in as. 

### Add/edit new user
Make sure you fill in all the fields before you click save.

![](images/elma/app/user_new.PNG)

After you have successfully added a new user you can edit this user, add another or view log of the currently added users.

![](images/elma/app/users.PNG)

---

## Events

Here you will find all the create, update and delete events related to you as an Access Point Provider.   

![](images/elma/app/events.PNG)


If you have any questions don't hesitate to contact us <a href="elma@digdir.no">elma@digdir.no</a>


---


