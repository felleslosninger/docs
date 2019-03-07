---
title: Elma
description: Elma user manual for service providers
summary: "Elma user manual service providers"
permalink: elma.html
folder: veiledning
---

### Terminology
Here are some terms which will be used throughout this page.

- Service provider = Access point providers. A service provider is associated with a single domain, and participants registered by the provider will only be approved for message exchange within the provider's domain.
- Processes = Standardized, maintained collections of document types used in e-procurement.
- Participants = Are organizations that are connected to a specific endpoint. You can think of this as a "contract" between an organization and a Service provider.
- Endpoint =  Represents a physical access point service endpoint, accessible through one or several URLs.
- Certificates = Your PEPPOL access point certificate.
- Domains = Collections of processes used in e-procurement. 
- Document types = Standardized message types belonging to processes, used in communication between access points.
- Identifier = Consists of a set prefix and a organizational number. e.g. 9908:991825827

## Endpoints
Here you will see all the endpoints linked to you as a service provider

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/endpoints_0.PNG)

### Add endpoint
To add a new endpoint you go to the Endpoint page and click "Add endpoint" just above the title line.

Then you will see new window. Make sure you fill in all text fields. Click save when you're done.

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/ny_endpoint_0.PNG)

After your endpoint is created you will see it in the list of Endpoints. 

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/ny_endpoint_1.PNG)

You may add several endpoints if you wish.

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/ny_endpoint_2.PNG)

---

### Edit endpoint
To edit an endpoint you click on an endpoint and then the "Edit endpoint" button at the top of the page. Make sure you don't leave any text fields empty before you click "Save".

<!--
**add screenshot. Fix MOVE-984 first?**
-->

### Adding endpointURL or participant to endpoint
First you need to choose the endpoint you want and click on it. To add either a endpoint URL or a participant to your endpoint you click the links at the bottom of this window. 

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/endpointurl_add_0.PNG)

See the next two sections for further instructions

### EndpointURL
To add an endpointURL you need to already have uploaded a certificate. Choose a transport profile, your certificate and a URL.

![](/spike-elma/resources/new_endpoint_url_0.png)

After you've added the endpointURL it shows up in endpoint.

![](/spike-elma/resources/new_endpoint_url_1.png)

To edit or delete an endpoint url you click the edit or delete button next to the endpointURL. 

---

### Participant
To add a new participant to your endpoint you first open up the selected endpoint and at the bottom of the page you will see "add participants". 

Fill in the required information

![](/spike-elma/resources/elma/new_participant.PNG)

Confirmation message after you've added a participant to your endpoint

![](/spike-elma/resources/elma/add_participant_successful.PNG)

If you click on a participant you will see the processes connected to this participant. 

![](https://raw.githubusercontent.com/difi/spike-elma/gh-pages/resources/elma/participant.PNG?token=AYn1e2MMnqL-1r_pbKTfz64lyD8CO1-pks5b_-47wA%3D%3D)

### Delete participant
To delete a participant you should be standing in the same window as above. (Endpoints->Your endpoint). From here you can click delete on the selected participant to remove it frmo your endpoint. If you attempt to delete a participant from the Participants view(pressing the home button) you will get an error. This delete button will be removed in a future release as it's not meant to be there.

### Delete endpoint
First choose the endpoint you wish to delete from the Endpoints list. To delete an endpoint you first need to remove all poarticipants and endpoint URL's linked to the endpoint. If you don't, you will receive an error message telling you to remove them.

Click the "delete endpoint" button

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/delete_endpoint_0.PNG)

Carefully read the warning and confirm the delete operation. If you wish to cancel just click anywhere outside of the textbox.

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/delete_endpoint_1.PNG)

Delete ok

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/delete_endpoint_2.PNG)

---

## Processes
Here you see the different processes currently in use as well as deprecated ones. By clicking on either one you can see the document types connected to that process. Only the Elma admins are allowed to add, edit or remove processes. To add a process to a participant you need to go through the Endpoint -> edit/add participant menu.

![](https://raw.githubusercontent.com/difi/move-integrasjonspunkt/gh-pages/resources/elma/process.PNG)

---

## Certificates
This is where you manage your SSL certificates. You may upload a new certificate, edit or delete an existing certificate. 

To delete your certificate you simply click delete and then confirm your action.

### Add certificate
When you add a certificate you need to upload your own certificate and make sure you choose a title and a Certificate type from the drop-down menu. You can choose certificate type "none".

Give the certificate a name and browse through your system and choose the certificate you want to upload.
![](/spike-elma/resources/elma/new_certificate_0.PNG)

This is what it looks like when a certificate is uploaded.
![](/spike-elma/resources/elma/new_certificate_1.PNG)



### Deleting a certificate
To delete a certificate you have to remove it from the endpointURL before you can delete it. This can be done by going to: ```endpoints -> your endpoint -> edit endpointURL -> change certificate to another -> save -> certificates -> delete certificate. ```

If the certificate was not used for an endpointURL you should be able to delete it straight away. ```Certificates -> delete certificate```


## Users 
Whenever you make a new user it will be automatically added to the same Service provider you are logged in as. 

### Add/edit new user
Make sure you fill in all the fields before you click save.

![](/spike-elma/resources/elma/new_user_0.PNG)

After you have succesfully added a new user you can edit this user, add another or view log of the currently added users.

![](/spike-elma/resources/elma/new_user_1.PNG)



If you have any questions don't hesitate to contact us <a href="elma@difi.no">elma@difi.no</a>

---


