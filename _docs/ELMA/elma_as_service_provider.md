---
title: Service Provider Manual
description: Elma user manual for service providers
summary: "Elma user manual for service providers"

product: elma
sidebar: elma_sidebar
redirect_from: /elma_service_provider_user_manual
---

*Updated: 03.04.2023*

## Participants

The participant page shows the participants belonging to the service provider.

![]({{site.baseurl}}/images/elma/sp/participants.PNG)

### Add participant
 
To add a new participant you can press the "Add participant"-button. 

Fill in the required information

![]({{site.baseurl}}/images/elma/sp/participant_new.PNG)

If successful the participant detail page will be displayed:

![]({{site.baseurl}}/images/elma/sp/participant.PNG)

Note that process dependencies are shown. In a special case, when viewing a 0192-participant, profiles 
which are dependencies that are profiles on the 9908-sibling-participant will also be shown. Those dependencies 
are not processes on the 0192-participant, but are still shown in ELMA web. They are not visible in a SMP-lookup. 

### Edit participant

To edit a participant you can press the "Edit participant"-button.

![]({{site.baseurl}}/images/elma/sp/participant_edit.PNG)


### Delete participant
To delete a participant you should be standing in the same window as above. (Endpoints->Your endpoint). From here you can click delete on the selected participant to remove it from your endpoint. If you attempt to delete a participant from the Participants view(pressing the home button) you will get an error. This delete button will be removed in a future release as it's not meant to be there.

---

## Access Points

Here you will see all the access point that are available. 

![]({{site.baseurl}}/images/elma/sp/access_points_list.PNG)


### Applying for an Access Point agreement

If you want to use a specific access point, you need to make an agreement with the access point provider.
This can be initiated by pressing the "Apply for agreement"-button on the access point.

Then you will see a the New Agreement screen. You need to specify which domain the agreement is for. Click save when you're done.

![]({{site.baseurl}}/images/elma/sp/agreement_new.PNG)

After the agreement is created, you will see something like this: 

![]({{site.baseurl}}/images/elma/sp/agreement_no_certificate.PNG)

Notice that the agreement is not active yet. To activate the agreement you need to give the access point provider your certificate, so 
that they can install it in the access point. Then the access point provider will add the public key to the agreement.
As soon as the public key is added, you as the service provider, will be able to activate the agreement.  

Given that the access point provider has installed the certificate, then you will see something like this:

![]({{site.baseurl}}/images/elma/sp/agreement_certificate_added.PNG)

You can now activate the agreement so that the participants belonging to the same domain as the agreement will be
recipients of the access point. Activate the agreement by pressing the "Activate"-button and get the following popup:   

![]({{site.baseurl}}/images/elma/sp/agreement_activate_are_you_sure.PNG)

Confirm by pressing the "Yes, activate it!"-button.

![]({{site.baseurl}}/images/elma/sp/agreement_activate_success.PNG)

---

## Access Point Providers

Here you will see all the Access Point Providers in ELMA

![]({{site.baseurl}}/images/elma/sp/access_point_providers.PNG)

Click on any one of them and get contact information and which access points they provide. 

![]({{site.baseurl}}/images/elma/sp/access_point_provider.PNG)

---

## Processes
Here you see the different processes currently in use as well as deprecated ones. 
By clicking on either one you can see the document types connected to that process. 
Only the Elma admins and peppol authorities are allowed to add, edit or remove processes. 
To add a process to a participant you need to go to the edit/add participant menu.

![]({{site.baseurl}}/images/elma/sp/processes.PNG)

---

## Users 
Whenever you make a new user it will be automatically added to the same Service provider you are logged in as. 

### Add/edit new user
Make sure you fill in all the fields before you click save.

![]({{site.baseurl}}/images/elma/sp/user_new.PNG)

After you have succesfully added a new user you can edit this user, add another or view log of the currently added users.

![]({{site.baseurl}}/images/elma/sp/users.PNG)

---

## Events

Here you will find all the create, update and delete events related to you as an Service Provider.   

![]({{site.baseurl}}/images/elma/sp/events.PNG)

---

## SML Queue

When adding or deleting a participant there will be sent a request to update the SML (Service Metadata Locator) accordingly.
The requests will be put on a queue and processed as soon as possible. Typically, within a minute. Below is a screenshot
of the SML queue containing one entry that hasn't yet been processed.

![]({{site.baseurl}}/images/elma/sp/sml_queue.PNG)

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

![]({{site.baseurl}}/images/elma/sp/peppol_directory_queue.PNG)

There can be situations where the requests can't be processed. I.e. due to planned maintenance of the Peppol Directory application server or network problems.
Is such scenarios the operations will fail, but they will automatically be retried later on. The Peppol Directory Queue screen shows the active queue.
Entries that are successfully executed will get status COMPLETED and will disappear after some time. 
Sometimes the same request will fail over and over again due to a specific problem. Then it is important to check the error message.
You can manually retry the request be pressing the Retry-button or delete the SML request by pressing the Delete-button.


If you have any questions don't hesitate to contact us <a href="elma@digdir.no">elma@digdir.no</a>


---


