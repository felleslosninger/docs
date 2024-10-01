---
title: Elma open data
description: Elma open data
summary: "ELMA provides open datasets containing information about participants and what profiles each participant is registered with."

product: elma
sidebar: elma_sidebar
redirect_from: /elma_open_data
---

*Updated: 19.09.2024*

### Important note on use
NB! These datasets must not be used to check if a given norwegian organization is registered in PEPPOL or what documents an organization can receive. This should be done via a lookup via the SML (Service Metadata Locator).

See section below on how to do a proper lookup.

### Datasets

We have previously published data sets of recipients in Elma at Datahotellet (hotell.difi.no). Datahotellet will be discontinued on 1 October 2024. Elma will stop updating the datasets at 23 September 2024.

We encourage everyone who uses the data set at Datahotellet to use the data set at Peppol Directory. The dataset on Peppol Directory is available as a website, API and files for download. There are some differences between the data sets at Datahotellet and the Peppol Directory:

- The data sets have different technical formats and interfaces
- The data set on the Peppol Directory contains other recipients in addition to those registered in ELMA.
- ELMA continuously publishes the Peppol Directory, so it is more up-to-date than the Datahotellet

Read more about the [discontinuation of Datahotellet](https://hotell.difi.no/avvikling)
 
Read more about [Peppol Directory](https://directory.peppol.eu/public)

### How to lookup participants in PEPPOL

The only valid way to lookup an organization is the PEPPOL way of lookup via the SML.

Previously, ELMA was the only PEPPOL SMP where norwegian organizations were registered. This is no longer the case. A norwegian organization may be registered to an other SMP. A lookup only in ELMA is no longer a valid way to lookup norwegian organizations in PEPPOL.

It is also possible to lookup organizations via PEPPOL Directory. It is currently not mandatory for SMPs to publish information to PEPPOL Directory, so the list there is not complete.

[Recipe for creating the URL to lookup an organization can be found at helger.com](https://peppol.helger.com/public/menuitem-docs-smp-sml-interplay)  
Under the section “Create participant in SMP and SML” at the bullet point “A new DNS entry in the form of …”

See [official PEPPOL Documentation on SML and SMP for more details](https://peppol.org/documentation/technical-documentation/edelivery-documentation/)

See the [vefa-peppol lookup library](https://github.com/OxalisCommunity/vefa-peppol/tree/master/peppol-lookup) for a Java implementation.
