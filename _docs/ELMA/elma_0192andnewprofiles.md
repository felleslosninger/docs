---
title: About the new ICD (0192) and new Profiles
description: Explanation of the new ICD (0192) and how it relates to ned Profiles.
summary: "In this guide, we explain the new International Code Designator (ICD), 0192, for Norway, how the new Profiles relates to this ICD, and an overview of how this works in ELMA."

product: elma
sidebar: elma_sidebar
redirect_from: /elma_icd0192andnewprofiles
---

*Updated: 06.03.2019*

See also [separate page on how to upgrade existing participants to support the new Profiles](upgradeTo0192Profiles.html).

## Norway is migrating from ICD 9908 to 0192
The PEPPOL network is in the process of migrating the ICD for Norwegian organizations from 9908 to 0192. Some years in the future, the 9908-ICD will no longer be used in the PEPPOL network.

As part of the migration process, Norwegian organizations will be identified through two ICDs. Organizations from other countries have been identified as before - no changes.

## New Profiles are only available under the 0192-ICD
Existing Profiles are available using the 9908-ICD as before, but new Profiles will only be available under the 0192-ICD.

Pr. 06.03.2019, the new Profiles available under 0192, and not 9908, are:
- PEPPOLBIS_3_0_BILLING_01_CII
- PEPPOLBIS_3_0_BILLING_01_UBL

## How this works in ELMA
As an access point, you register participants in ELMA by connecting organizations to Profiles. The profiles contain a selection of Document Types and Processes that explain what kind of documents you handle on behalf of the organization and in what context. 

In order to drive the migration forward, new Profiles and Document Types will only be available on 0192-identifiers. In this way, we will eventually migrate to the 0192-identifiers without making any drastic intervention on existing profiles and management routines associated with the 9908-identifiers.

![](images/elma/participant_search_example_of_org_with_two_participants.png)

*Screenshot 1: Example of an organization with two Participants, one for each ICD.*

As a consequence, as an access point you will have to relate to which profiles are new and will be linked to the 0192-identifier, and which ones are old and will be linked to the 9908-identifier. 

## Profile dependencies and automatic creation of participants
In the migration period, Profiles will contain both new and old Document Types. This is done by a new Profile having old Profile(s) as a dependency. If you add a Profile that has a dependency to another Profile, ELMA will make sure that the Dependency is fulfilled.

For example, the new profile “PEPPOLBIS_3_0_BILLING_01_CII” has “BIS05 V2” as a dependency. The former Profile is only available under 0192 and the latter only under 9908. If you create a 0192-participant with the profile “PEPPOLBIS_3_0_BILLING_01_CII”, and if there is not an existing a 9908-participant with the profile “BIS05 V2”, then the 9908-participant will be created and the Profile “BIS05 V2” will be added.

A dependency can also be fulfilled across endpoints and service providers. If a Profile which is a required dependency already exists on another endpoint, even an endpoint from another service provider

![](images/elma/elma/view_process.png)

*Screenshot 2: You can see what dependencies a Profile has under [“Processes” in ELMA-web](https://smp.difi.no/process).*

For a guide on how to upgrade existing participants to support new Profiles, see [this page](upgradeTo0192Profiles.html).
