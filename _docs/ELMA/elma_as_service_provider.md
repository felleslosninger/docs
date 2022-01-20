---
title: Elma
description: Elma user manual for service providers
summary: "Elma user manual service providers"
permalink: elma_service_provider_user_manual.html
product: elma
sidebar: elma_sidebar
---

*Updated: 20.01.2022*

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

## Participants

The participant page shows the participants belonging to the service provider.

![](images/elma/sp/participants.PNG)

### Add participant
 
To add a new participant you can press the "Add participant"-button. 

Fill in the required information

![](images/elma/sp/participant_new.PNG)

If successful the participant detail page will be displayed:

![](images/elma/sp/participant.PNG)

Note that process dependencies are shown. In a special case, when viewing a 0192-participant, profiles 
which are dependencies that are profiles on the 9908-sibling-participant will also be shown. Those dependencies 
are not processes on the 0192-participant, but are still shown in ELMA web. They are not visible in a SMP-lookup. 

### Edit participant

To edit a participant you can press the "Edit participant"-button.

![](images/elma/sp/participant_edit.PNG)


### Delete participant
To delete a participant you should be standing in the same window as above. (Endpoints->Your endpoint). From here you can click delete on the selected participant to remove it from your endpoint. If you attempt to delete a participant from the Participants view(pressing the home button) you will get an error. This delete button will be removed in a future release as it's not meant to be there.

---

## Access Points

Here you will see all the access point that are available. 

![](images/elma/sp/access_points_list.PNG)


### Applying for an Access Point agreement

If you want to use a specific access point, you need to make an agreement with the access point provider.
This can be initiated by pressing the "Apply for agreement"-button on the access point.

Then you will see a the New Agreement screen. You need to specify which domain the agreement is for. Click save when you're done.

![](images/elma/sp/agreement_new.PNG)

After the agreement is created, you will see something like this: 

![](images/elma/sp/agreement_no_certificate.PNG)

Notice that the agreement is not active yet. To activate the agreement you need to give the access point provider your certificate, so 
that they can install it in the access point. Then the access point provider will add the public key to the agreement.
As soon as the public key is added, you as the service provider, will be able to activate the agreement.  

Given that the access point provider has installed the certificate, then you will see something like this:

![](images/elma/sp/agreement_certificate_added.PNG)

You can now activate the agreement so that the participants belonging to the same domain as the agreement will be
recipients of the access point. Activate the agreement by pressing the "Activate"-button and get the following popup:   

![](images/elma/sp/agreement_activate_are_you_sure.PNG)

Confirm by pressing the "Yes, activate it!"-button.

![](images/elma/sp/agreement_activate_success.PNG)

---

## Access Point Providers

Here you will see all the Access Point Providers in ELMA

![](images/elma/sp/access_point_providers.PNG)

Click on any one of them and get contact information and which access points they provide. 

![](images/elma/sp/access_point_provider.PNG)

---

## Processes
Here you see the different processes currently in use as well as deprecated ones. 
By clicking on either one you can see the document types connected to that process. 
Only the Elma admins and peppol authorities are allowed to add, edit or remove processes. 
To add a process to a participant you need to go to the edit/add participant menu.

![](images/elma/sp/processes.PNG)

---

## Users 
Whenever you make a new user it will be automatically added to the same Service provider you are logged in as. 

### Add/edit new user
Make sure you fill in all the fields before you click save.

![](images/elma/sp/user_new.PNG)

After you have succesfully added a new user you can edit this user, add another or view log of the currently added users.

![](images/elma/sp/users.PNG)

---

## Events

Here you will find all the create, update and delete events related to you as an Service Provider.   

![](images/elma/sp/events.PNG)

---

## SML Queue

When adding or deleting a participant there will be sent a request to update the SML (Service Metadata Locator) accordingly.
The requests will be put on a queue and processed as soon as possible. Typically, within a minute. Below is a screenshot
of the SML queue containing one entry that hasn't yet been processed.

![](images/elma/sp/sml_queue.PNG)

There can be situations where the requests can't be processed. I.e. due to planned maintenance of the SML Application server or network problems.
Is such scenarios the operations will fail, but they will automatically be retried later on. The SML Queue screen shows the active queue.
Entries that are successfully executed will get status COMPLETED and will disappear after some time. 
Sometimes the same request will fail over and over again due to a specific problem. Then it is important to check the error message.
You can manually retry the request be pressing the Retry-button or delete the SML request by pressing the Delete-button.

---

## Peppol Directory Queue

When adding or deleting a participant there will be sent a request to update the Peppol Directory accordingly.
Peppol Directory requires that a participant is registered in the SML.
The requests will be put on a queue and processed as soon as possible. Typically, within a minute. Below is a screenshot
of the SML queue containing one entry that hasn't yet been processed.

![](images/elma/sp/peppol_directory_queue.PNG)

There can be situations where the requests can't be processed. I.e. due to planned maintenance of the Peppol Directory application server or network problems.
Is such scenarios the operations will fail, but they will automatically be retried later on. The Peppol Directory Queue screen shows the active queue.
Entries that are successfully executed will get status COMPLETED and will disappear after some time. 
Sometimes the same request will fail over and over again due to a specific problem. Then it is important to check the error message.
You can manually retry the request be pressing the Retry-button or delete the SML request by pressing the Delete-button.


If you have any questions don't hesitate to contact us <a href="elma@digdir.no">elma@digdir.no</a>


---


