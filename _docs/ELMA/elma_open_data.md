---
title: Elma open data
description: Elma open data
summary: "ELMA provides open datasets containing information about participants and what profiles each participant is registered with."
permalink: elma_open_data.html
product: elma
sidebar: elma_sidebar
---

*Updated: 02.06.2020*

ELMA provides open datasets containing information about participants and what profiles each participant is registered with.

### Important note on use
NB! These datasets must not be used to check if a given norwegian organization is registered in PEPPOL or what documents an organization can receive. This should be done via a lookup via the SML (Service Metadata Locator).

See section below on how to do a proper lookup.

### Datasets
There are currently three datasets which are updated every hour.

#### Participants
Shows all participants and what processes they support.

#### Capabilities
Show all participants in ELMA and their capabilities.
Capabilities is an ELMA-specific grouping of processes, where a participant must have all of a given set of processes to be listed as having a specific capability.
The capability-grouping in ELMA is currently not updated, and this dataset may be removed.

#### Document types
Show all document types in ELMA and what processes they are connected to.

#### Links and documentation
See [links to data and more information at data.norge.no](https://data.norge.no/datasets/5a5374c3-c6a7-49f8-b9cc-0a9e48c1acd7)

[Documentation for the API can be found at hotell.difi.no (in norwegian)](https://hotell.difi.no/api)


### How to lookup participants in PEPPOL

The only valid way to lookup an organization is the PEPPOL way of lookup via the SML.

Previously, ELMA was the only PEPPOL SMP where norwegian organizations were registered. This is no longer the case. A norwegian organization may be registered to an other SMP. A lookup only in ELMA is no longer a valid way to lookup norwegian organizations in PEPPOL.

It is also possible to lookup organizations via PEPPOL Directory. It is currently not mandatory for SMPs to publish information to PEPPOL Directory, so the list there is not complete.

[Recipe for creating the URL to lookup an organization can be found at helger.com](https://peppol.helger.com/public/menuitem-docs-smp-sml-interplay)  
Under the section “Create participant in SMP and SML” at the bullet point “A new DNS entry in the form of …”

See [official PEPPOL Documentation on SML and SMP for more details](https://peppol.eu/downloads/the-peppol-edelivery-network-specifications/)

See the [vefa-peppol lookup library](https://github.com/OxalisCommunity/vefa-peppol/tree/master/peppol-lookup) for a Java implementation.
