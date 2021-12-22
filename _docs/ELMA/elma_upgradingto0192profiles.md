---
title: Updating your participants to PEPPOL Billing 3.0 Profiles
description: Guide on how to upgrade participants to new 0192-Profiles
summary: "Here we’ll outline how you can update your existing norwegian 9908-participants to support PEPPOL BIS 3.0, and what considerations to make.
The main emphasis is on updating via the web services."

product: elma
sidebar: elma_sidebar
---

*Updated: 20.03.2019*

Recommended reading: [explanation of the new ICD (0192), new Profiles and how this works in ELMA]({{site.baseurl}}/docs/ELMA/elma_0192andnewprofiles).

You can either update via ELMA-web (if you have relatively few participants) or via the Web Service.

## Updating via ELMA-web
Add a new participant as usual and select ICD = 0192.

In the list of Processes, you will only see Processes available for the Participant, ICD, and Domain of your endpoint. If the 3.0-profiles are not available, this is probably because they are already registered for the organization on an existing participant.

## Updating via Web Service
There are two ways of adding the new Profiles to existing organizations.

First you need a list of all your organizations you want to update.
You can either get this from your own business systems or get the list from the web service via the getAllParticipants()-operation.

For more information about the web service and it's operations, see the page [web service](webservice.html).

### Method 1) Add new 0192-participants
This is the easiest method, and requires fewer WS-requests.

#### Pseudo-code
```
For each organization in list of organizations in your endpoint
    add 0192-participant with 0192-profile(s)
```

#### Specify ICD when adding
While adding 0192-participants, you must specify the ICD in addition to the organization number. E.g. "0192:123456789".
Not specifying ICD will be interpreted as the ICD being 9908.
Note that if you add 0192-processes to an 9908-participant, a 0192-participant will be created.

Beware: if you perform addParticipant or editParticipant on an existing participant, the specified participant will be replaced, so you must take care to list all profiles that the given participant should have, and not just the new profiles you want to add.

### Method 2) Add new profiles to existing 9908-participants
If you add the new Profiles to an existing 9908-participant, and these new profiles are only supported under ICD 0192, a 0192-participant will be created if it does not already exist, and these profiles will be added to the 0192-participant.

#### Pseudo-code
```
For each organization in list of organizations in your endpoint
    Get existing 9908-participant to get the list of current Profiles.
    Edit 9908-participant and add 0192-profile(s) to the list of current Profiles. Remember to specify all Profiles the 9908-participant should have and not just the new profiles.
```

### Possible errors when adding participant
You may want to check if each add- or edit-operation was successful, and if not manually follow up on errors.
Errors may be that the Process you are trying to add is already served by another endpoint. In which case, you may want to make sure that the organization should be added.

In addition to success = false, the web service will return an error message.
If the 0192-participant already exists on your endpoint, the add-operation will still be successful.

### Corner cases that may apply to you

1. *Participants without any Processes*. If you have any existing Participants which does not have any Processes, you may not want to create a 0192-participant. It is only possible to add participants without processes via elma-web, and not via the web service. If you only use the web service to update your participants, you should not have any such participants registered to your endpoint.

2. *Swedish participants*. For the few who have swedish organizations (ICD 0007) registered in ELMA, you need to keep track of which organization numbers are swedish and which are norwegian. The getAllParticipants()-method only returns organization numbers without ICDs.

3. *You have more than one endpoint*. You should use the endpoint-parameter to define on what endpoint you are operating on when adding a participant. If not endpoint-parameter is given, the web service will add the participant to the endpoint that was first registered in ELMA.

