---
title: Access Point Provider Manual
description: Elma user manual for access point providers
summary: "Elma user manual for access point providers"

product: elma
sidebar: elma_sidebar
redirect_from: /elma_access_point_provider_user_manual
---

*Updated: 03.04.2023*

## Access Points

At the top of the access point page a list of your access points will be displayed. If you have no access points, a 
"Get Started!" box will be displayed, making it easy to initiate the creation of your first access point.  
At the bottom of the page you will see a list of all access points in ELMA.

![]({{site.baseurl}}/images/elma/app/access_points.PNG)

### Add access point

To add an access point, you can press the "Add Access Point"-button. Then you can choose a title for your access point.

![]({{site.baseurl}}/images/elma/app/access_point_new.PNG)

After pressing the "Save"-button, you will see access point page.

![]({{site.baseurl}}/images/elma/app/access_point.PNG)

Please notice the empty Endpoint table. The next task will be to create one or more Endpoints.

### Add endpoint

There can be one Endpoint for each Transport Profile. To add an Endpoint, press the "Add Endpoint"-button.

![]({{site.baseurl}}/images/elma/app/endpoint_new.PNG)

After pressing the "Save"-button, you will see access point again. This time the Endpoint-table will show the newly 
created Endpoint.  

![]({{site.baseurl}}/images/elma/app/access_point_with_endpoint.PNG)


## Agreements

Here you will see agreements for usage of your access point by the service providers. 

![]({{site.baseurl}}/images/elma/app/agreements.PNG)

The service providers initiate an agreement. The service provider will not be able to activate the agreement before you as the access point owner has added the
public key certificate belonging to the service provider. This should only be done after you have installed the key-pair in your access point.

### Adding a public key certificate

Select the agreement you want to add a public key certificate to by clicking the "View"-button. Then you will see the agreement page:

![]({{site.baseurl}}/images/elma/app/agreement.PNG)

Then you press the "Add Certificate"-button:

![]({{site.baseurl}}/images/elma/app/agreement_add_certificate.PNG)

Select the correct certificate type and the certificate itself and press the "Save"-button.
 
![]({{site.baseurl}}/images/elma/app/agreement_certificate_added.PNG)
 
Now the agreement is ready for activation by the service provider.

---

## Certificates

This is where you can see all the certificates belonging to one or more agreements.
To add, update or delete a certificate, you need to go to select an agreement first.

The certificates should be of a PEM format with a .crt or .cer file type.

![]({{site.baseurl}}/images/elma/app/certificates.PNG)

---

## Service Providers

Here you will find the different Service Providers in ELMA and their contact information.

![]({{site.baseurl}}/images/elma/app/service_providers.PNG)

## Access Point Providers

Here you will find the different Access Point Providers in ELMA and their contact information and access points.

![]({{site.baseurl}}/images/elma/app/access_point_providers.PNG)

---

## Users 
Whenever you make a new user it will be automatically added to the same Access Point Provider you are logged in as. 

### Add/edit new user
Make sure you fill in all the fields before you click save.

![]({{site.baseurl}}/images/elma/app/user_new.PNG)

After you have successfully added a new user you can edit this user, add another or view log of the currently added users.

![]({{site.baseurl}}/images/elma/app/users.PNG)

---

## Events

Here you will find all the create, update and delete events related to you as an Access Point Provider.   

![]({{site.baseurl}}/images/elma/app/events.PNG)


If you have any questions don't hesitate to contact us <a href="elma@digdir.no">elma@digdir.no</a>


---


