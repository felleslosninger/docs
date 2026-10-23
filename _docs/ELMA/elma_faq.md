---
title: ELMA FAQ
description: Elma Frequently Asked Questions
summary: "A side containing the most frequently asked questions about ELMA."

product: elma
sidebar: elma_sidebar
redirect_from: /elma_faq
---

### Can I as a Service Provider have more than one Access Point agreement per domain?
No, you'll then have use two different Service Providers for that domain.

### How can I deregister as a service provider?
1. Remove all your participants.
2. Deactivate your agreement with an access point provider.
3. If the access point provider is your own, and does not have other agreements, then login to your access point provider account, and delete the certificate and the agreement.
4. Notify the Digdir team, so they can verify and conclude the deregistration.

### How can I set up Maskinporten integration in the REST API?
1. Contact servicedesk@digdir.no to gain access the management portal (Samarbeidsportalen).
2. Create an integration in the management portal.
3. Send the associated `client_id` to Digdir' service desk.
4. The ELMA support team will then register the `client_id` on your user account.

Foreign consumers have to use the EU flow (https://docs.digdir.no/docs/Maskinporten/maskinporten_func_european_eseals.html) in Maskinporten in which `client_id=<eidas-serial-number>`. This will rotate on certificate renewal, and has to be handled in the onboarding process.