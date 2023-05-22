---
title: ELMA Terminology
description: ELMA terminology
summary: "ELMA terminology"

product: elma
sidebar: elma_sidebar
redirect_from: /elma_terminology
---

*Updated: 2023-04-11*

### Terminology
Here are some terms which will be used throughout the ELMA manuals.

Service provider (SP)
: A company that connects organizations to the Peppol network. A service provider is associated with one or more domains, and participants registered by the provider will only be approved for message exchange within the provider's domain(s).

Access point (AP)
: Represents a physical access point service endpoint, accessible through one or several URLs.

Endpoint
: An access point has one or more physical endpoints represented by a URL and transport profile.

Transport profile
: The transport method that must be used for communicating with a given AP. AS4 is an example of a transport profile.

Access point provider (APP) 
: An access point provider operates APs that the SPs can use by making an agreement.

Agreement
: An agreement between an SP and an APP for usage of a specific access point.

Processes
: Standardized, maintained collections of document types used in e-procurement.

Participants
: Organizations that are connected to the Peppol network. (An organization might act as its own SP.) You can think of this as a "contract" between an organization and an SP, that connects the SP's customer organizations to the Peppol network by means of the SP's associated APP's AP.

Certificates
: Your PEPPOL AP certificate.

Domains
: Collections of processes used in e-procurement.

Document types
: Standardized message types belonging to processes, used in communication between APs.

Identifier
: Identifier for a participant, consisting of a set prefix and an organization identifier. e.g. 9908:991825827

SML (Service Metadata Locator)
: A DNS that returns the address of the SMP that holds the metadata of a given PEPPOL receiver. The SML is the only centrally operated component in the PEPPOL transport infrastructure. It is managed by OpenPEPPOL and operates out of Brussels by DG/DIGIT.