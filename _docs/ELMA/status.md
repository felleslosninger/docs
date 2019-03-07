---
title: Status
description: Statuspage for Elma
summary: "Elma status"
permalink: elma_status.html
folder: veiledning
---

## Elma update 07.03.19 (3.0.6)
UPDATED 7/3: added links to new documentation.

### Updated documentation
On the same day as the new version was released, we also added three new pages:
- [About the new ICD (0192) and new Profiles](icd0192andNewProfiles.html)
- [Updating your participants to PEPPOL Billing 3.0 Profiles](upgradeTo0192Profiles.html)
- [Web Service](webservice.html)

### Tasks
```
[MOVE-1281] - Report for organizations with EHF 2.x and BIS Billing 3.0 profiles
[MOVE-1282] - Report for accesspoints with EHF 2.x and BIS Billing 3.0 profiles
[MOVE-1283] - Report for accesspoints with AS2 and AS4 document types
[MOVE-1024] - Confirmation dialog when deleting processes on participants
[MOVE-1041] - Prosess dependency can exist on a participant owned by a different Service Provider
[MOVE-1241] - Bad handling of special characters in organization names
[MOVE-1287] - Less logging of stack traces for handled errors
[MOVE-1288] - Optimize brreg orgname cleaner task and fix escaping
[MOVE-1307] - Add support for UTF8 with BOM for report-downloads and map Download-links in elma-web to use this charset
```

### Bugs
```
[MOVE-1140] - Deleted participants are included in report
[MOVE-1264] - Server-side setting of organization name when adding or editing organization in elma-web
[MOVE-1266] - Should check participant siblings for process dependencies when creating a new 0192 participant
[MOVE-1277] - Statistic task should run async
[MOVE-1306] - Missing dialog for deletion of endpoint url
[MOVE-1308] - Fix errors in reports
[MOVE-1229] - Remove space after org.nr. in DB
```

## Elma update 05.02.19 (3.0.5)

### Tasks
```
[MOVE-1092] - Confirmation when deleting participant on endpoint page
[MOVE-1116] - Automate data import to datahotellet
[MOVE-1153] - WS: Participant operations should support endpoint selection
[MOVE-1247] - Calculate statistics more efficiently
[MOVE-1209] - Trigger batch jobs from endpoint
```

### Bugs
```
[MOVE-1090] - Issues when consuming the SOAP 1.1 service in .NET
[MOVE-1105] - Data migration from Elma 2 caused erroneous registration dates for organizations
[MOVE-1223] - WS: Removed organization number validation for get- and deleteParticipant
[MOVE-1224] - WS: Participants should not be created if process validation fails
[MOVE-1226] - Web - edit participant form validation does not work
[MOVE-1227] - WS: ICD validation in SOAP requests
[MOVE-1228] - Corresponding 9908/0192 participants not updated in SML on creation
[MOVE-1278] - Wrong statistics shown on home page
[MOVE-1244] - Trim orgnr in add participant page
```

## Elma status 18.01.19 (no code changes)

### Problems with lookup of organization number 16-17 January

We experienced errors with lookup of organization numbers, which blocked adding new participants.

The problem lasted from 00:05 - 11:10 (CET) 16.01.2019 and 18:05 - 07:45 17.01.2019.

### Registration dates and organization names

Wrong registration dates in ELMA have now been fixed (15.01.2019). Those who erroneously had 13.11.2018 as a registration date, should now be correct.

Empty organizational names have been fixed (11.01.2019) in the database.

### Hotell.difi.no now updates every hour

Updates are now back to being done every hour. If you wish to download updated datasets as soon as they are available, please do so by checking the ETag HTTP header before downloading the entire dataset.

### Known error - deleted participants in hotell.difi.no

We have a known error where deleted organizations (i.e. organizations with no participants in ELMA) are still present in the datasets. In the dataset, they are specified to have no processes and no capabilities, so this should not interfere with normal business logic.

We plan to fix this in a later release of ELMA.


## Elma update 10.01.19 (version 3.0.4)

### Changes
```
[MOVE-888]  - Remove temporary set-user-password method
[MOVE-1143] - Change how login events are persisted
[MOVE-1207] - Domain identifiers do not support underscore
[MOVE-1046] - WS - add/deleteParticipant: Inconsistent error messages for invalid organization numbers
[MOVE-1132] - Wrong values in participant- and capabilities report
[MOVE-1145] - Encoding issue in registration e-mails
[MOVE-1159] - WS - editParticipant updates regardless of error response
[MOVE-1170] - WS - Businesscard service should expose cards for all recipients in ELMA, regardless of ICD
[MOVE-1202] - Issue with integration tests due to spring-boot-maven-plugin
[MOVE-1204] - Remove encoded carriage return from the endpoint certificate of the SMP response
```

### Known issues

Wrong registration dates. Due to an error in the migration from ELMA2 to ELMA3, all organizations registered in ELMA before 13.11.2018, have registration date set to 13.11.2018.

Organizations with old or blank organization name. Some organizations have either a blank organization name or an outdated name.

Both these issues are corrected in the export to hotell.difi.no, but are visible in elma-web. Both issues are being worked on.


## Elma update 11.12.18 (version 3.0.3)

### Changes
```
MOVE-1151	- Automatically choose endpoint while registering participants using the WS
MOVE-1149	- Automatically assign processes to logically equivalent participants
MOVE-1148	- Automatically create logically equivalent participants
MOVE-1147	- Registering processes on a valid participants
MOVE-1146	- Registering processes with varied participant requirements
MOVE-1144	- Added frontpage on the provider: http://smp.difi.no
MOVE-1134	- Fixed namespace bug in the Business card service.
MOVE-1101	- Added contact information about other service providers and endpoints
MOVE-1081	- Fixed bug: Organization name was not automatically found from the Brreg.no registry while adding or editing a participant using the WS.
MOVE-1075	- Alphabetical sorting on the "processes" list
MOVE-1064	- Reject attemps of registering a process which has a dependency registered on another endpoint
MOVE-1025	- Additional search functions for pages with long lists
MOVE-647 - Organizational names are now updated periodically from brreg.no
MOVE-1052 - Participants registration date is now visible. (see issue below)
```

### Bug - Registration date field

The participants registration date field is back in Elma, but there is an issue that causes registration dates from *before* 13.11.18 to be shown as registered 13.11.18. Any participant registered after this date has the correct date. We are going to fix this soon, but we didn't have the time to get the fix into this build version.

### Important issue - please read

We have discovered a severe error which unfortunately leads to some complications while registering participants in Elma. This means that if you’re going to register the new ICD 0192 on an already existing participant (ICD 9908) you will need to do it in a certain order for it to work correctly. 

Please follow this order:
1.	Delete the existing 9908 participant.
2.	Create the new 0192 participant with your chosen processes.

This will automatically recreate the 9908 participant. This means you will see both participants in the view, please do not delete this new 9908 participant or any of its processes. 

This is a necessary temporary solution.


---

## Elma update 27.11.18 (version 3.0.2)

### Changes

**Bug fixes:**

- Fixed bug in soap-requests without type namespace
- Fixed bug where participants registered in Elma was not updated in the SML
- Fixed Unexpected EOF bug in the WS
- Fixed IE 11 bug on add participant
- Fixed missing response on getParticipant soap-call
- Fixed bug in the getAllParticipants soap-request
- Fixed bug on the delete participant soap-request

**Features:**

- Added pages and search for the participants list in the endpoint view
- Added a help site and a link to the user guide
- Added functionality to add participant from the Elma frontpage (participants list)
- Search for participant on frontpage is improved. Can now search for title and identifier

## Elma status update 15.11.18 (version 3.0.1)

### Changes 
```
MOVE-1102 - Only showing results for participants for the logged in Service Provider.
          - Restricted access to resources.
MOVE-1080 - No longer able to create user without password.
          - Better errors when trying to log in with wrong info.
MOVE-1084 - Better error message when trying to create a user with a username that already exists.
MOVE-1066 - Fixed pagination on frontpage.
MOVE-1091 - Correct content-type for provider.
MOVE-1103 - Broken delete button removed
```

### Known issues

- Invalid response from SMP error while looking up certain participants on vefa-difi.no
- Invalid organizaton number error while deleting from webservice for certain participants
- SML is not being automatically updated.
- Error verifying signature on metadata downloaded from SMP. 
- Edit button for endpointurl is missing for some users.
- Datasets on hotell.difi.no are not automatically updated every hour. Will temporarily be manually updated less frequently

### Misc and future changes

- Visual changes to some of the information in views will be changed. For instance in the participant view
- Date of registration will be added to participants.
- Please note that our user guide for the Web ui is available here [https://difi.github.io/spike-elma/elma.html](https://difi.github.io/spike-elma/elma.html) 
- When deleting participants from the UI you will be required to confirm this action.

