---
title: Norwegian sandbox for digital wallets

sidebar: lommebok
product: lommebok
redirect_from: /wallet_sandbox_summary
---

These pages contain the technical documentation for the Norwegian sandbox environment for the European Digital Identity Wallet (EUDIW).

## Purpose

The purpose of the sandbox is to build knowledge and gain experience with the EUDIW ecosystem and technology in Norway, so that we are ready when the eIDAS2 regulation is integrated into Norwegian law.

Norwegian public and private sector companies can test the issuance and consumption of verifiable credentials in a controlled environment, to see if the Wallet allows us to build better digital services than the ones we have today.  The sandbox should be leveraged by Norwegian Trust Service industry  to learn what will be required from them in order to take on the new roles introduced by the Regulation. Norwegian businesses in general should use the sandbox to explore the potential opportunities they can have by gaining access to the European Single Digital Market. 

The sandbox will be connected to other countries, as it shall be used by Norwegian particiants in the WeBuild Large Scale Pilot, and will accomodate both Identity Wallets and Business Wallets.

The sandbox was lauched in October 2025.

## Available ecosystem services

The Norwegian Digitalisation Agency (Digdir) develop and operate several of the core components which are needed for the ecosystem to work.  

The sandbox has its own **trust list** following ETSI 119 612.  It can be found at [https://tillitsliste.test.eidas2sandkasse.net/](https://tillitsliste.test.eidas2sandkasse.net/).  The EUDIW-specific parts will be split out into a separate list following ETSI 119 602, see [roadmap-issue #563](https://github.com/orgs/digdir/projects/8/views/41?pane=issue&itemId=141313594&issue=digdir%7Croadmap%7C563).

Digdir operate a central **Relying Party register** for all sandbox participants. There is an [open catalogue of participants and credential types](https://innsyn.test.eidas2sandkasse.net/) (currently only in Norwegian). The standardized API (TS5) is not established yet, nor are registration certificates.  Digdir offer an Access Certificate Authority linked with register.  Norwegian organizations can register their services using [a self-service developer portal](https://sjolvbetening.test.eidas2sandkasse.net/login).

Digdir also operate a **EAA Issuer** called ["Bevisporten"](https://utsteder.test.eidas2sandkasse.net/).  It issues PID and a couple of other credentials.  The purpose of the Issuer is to help public sector bodies and other sandbox participants to create credentials with as little effort as possible, in order to showcase the potential value of sharing person data using verifiable credentials, and "fill" the sandbox quickly.    Bevisporten comes with some rudimentary tools for testing [auth code issuance](https://bevisporten.test.eidas2sandkasse.net/) or [pre-authorization code flow issuance](https://demo-ui-utsteder.test.eidas2sandkasse.net/).

We also offer a [demo verifier / Relying Party ](https://demo-brukersted.test.eidas2sandkasse.net/). 

Currently, the only wallet in the sandbox is the demo reference implementation apps developed by the Commission, modified with a Digdir logo and trust to our access certificates. This app is available for [download here](lommebok_demo_app). Work is ongoing in order to be able to offer other, real wallets in the sandbox. 


## Environments

The sandbox comes in two flavors:

- The **TEST** environment only allows credentials using synthic data about Holders (test users). Relying Parties can however be identified using either their real business identifier or syntethic business identifiers.  

- The **PROD** production enviroment will only allow for real data about real persons.  Similarily, only real business identifiers are allowed, and participant must have legal basis for processing person data as well as follow information security requirements according to existing Norwegian law.  This environment is per december 2025 not operational yet.


## Contact

The sandbox has an open discussion forum on [the Digdir Slack](/docs/general/slack.html). The channel is called #produkt-digital-lommebok. 

You can also contact Digdir tech support email: servicedesk (at) digdir.no .

