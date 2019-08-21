---
title: "JWT grant "
description: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for ID-porten OIDC Provider"
summary: "This page summarizes the protocol options availalbe for on JWT grants on the /token endpoint for ID-porten OIDC Provider"
permalink: oidc_protocol_jwtgrant.html
sidebar: oidc
product: ID-porten
---

## About

JWT grants are documented in [RFC7523](https://tools.ietf.org/html/rfc7523).

## Request



**Header:**

| Claim  | Cardinality | Description  |
| --- | --- | --- |
| alg | required | Must be `RS256` - Only RSA-SHA256 is supported by ID-porten. |   
| x5c | optional | The business certificate/eseal (virksomhetssertifikat) of the organization. Full certificate chain, see [JWK 4.7](https://tools.ietf.org/html/rfc7517#section-4.7). |
| kid |  optional | Key identifier to a previously registered certificate / asymmetric key   bound to the client.     |


Either 'kid' or 'x5c' must be present. If both are present, then 'kid' will take precedence.

Note that production certificates are not supported in test environments.

&nbsp;

**Body:**

| Claim  |  Cardinality | Description  |
| --- | --- |--- |
|aud| Required | Audience - identifier for ID-portens OIDC Provider.  See the  `well-known`-endepunkt for the environment you are using to find correct value.  Typically `https://oidc.difi.no/idporten-oidc-provider` in Prodction.  |
|iss| Required |issuer - Your client ID |
|iss_onbehalfof| Optional | Id-porten proprietary claim.  The onbehalfof-value for the sub-client the client is acting onbehalf of.   (See  [onbehalfof](oidc_func_onbehalfof.html))|
|scope| Required| Whitepace-separated liste over scopes requested |
|iat|| issued at - Timestamp when generating this jwt.  **NOTE:** UTC-time|
|exp|| expiration time - Timestamp for the expiry of this jwt,  in UTC-time. **NOTE:** Maximum 120 seconds allowed. (exp - iat <= 120 )|
|jti|Recommended | JWT ID - unique id for this jwt. **NOTE:** A JWT cannot be reused. |

&nbsp;



### Eksempel på JWT-grant struktur

The final JWT may look like this:
```
eyJ4NWMiOlsiTUlJRkVUQ0NBXC9tZ0F3SUJBZ0lMQVVrblRnempPNTM2MHk4d0RRWUpLb1pJaHZjTkFRRUxCUUF3VVRFTE1Ba0dBMVVFQmhNQ1RrOHhIVEFiQmdOVkJBb01GRUoxZVhCaGMzTWdRVk10T1Rnek1UWXpNekkzTVNNd0lRWURWUVFEREJwQ2RYbHdZWE56SUVOc1lYTnpJRE1nVkdWemREUWdRMEVnTXpBZUZ3MHhOekEyTVRJd09EVTJNVEZhRncweU1EQTJNVEl5TVRVNU1EQmFNSGN4Q3pBSkJnTlZCQVlUQWs1UE1Td3dLZ1lEVlFRS0RDTkVTVkpGUzFSUFVrRlVSVlFnUms5U0lFWlBVbFpCVEZST1NVNUhJRTlISUVsTFZERVNNQkFHQTFVRUN3d0pUMGxFUXlCMFpYTjBNUkl3RUFZRFZRUUREQWxFU1VaSklGUkZVMVF4RWpBUUJnTlZCQVVUQ1RrNU1UZ3lOVGd5TnpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTmduVWJpWFBtZ0E4T0J4blBhNFpsUkhLTlNpUjFPUUlqMXdZS0hyejRVMUhvV21HNStWVFpQWGJobVJ4MjBsR3FRV3JDMG1xVjJsXC9CclNUVHBNdW1vdFBNV01RTW1sVXdXcTBBWGRRRHgzSDVCR1lhNjZzVjU2eEl2QzRsektJMkVBR2pzeGRkZThYdzdheXBFNXVKXC9PVk15Y2JcL3c2bHFvRGlzOHRIeGlOMEs0WitJbFVMdnBmQ1k1NlA3QytjdVN6RlU3VVlramJ6OStYdVdabGdKRmZ3MmpBQVhnNnN6elorbHZsZUFJKzZvVXUzSGZwbnVKZUJST1wveGZEdmtjXC8wY0lQRlJIQUVlWjhuUXdic0VpK09WU0VGeVludFNXM1MwUGI5WW1KazBDSWl1Y0xuVlhKNVZCd3lsNldzYkRyY2tZZDZKT21iWEpHRVRcL050ZWhNQ0F3RUFBYU9DQWNJd2dnRytNQWtHQTFVZEV3UUNNQUF3SHdZRFZSMGpCQmd3Rm9BVVA2NzFlQXVTbzNBZ05WOWErdmNrb0ZJQjhFRXdIUVlEVlIwT0JCWUVGRWV5ZGR0S2tjZGl5RnR5dmIxblp3d0ViblRBTUE0R0ExVWREd0VCXC93UUVBd0lHUURBV0JnTlZIU0FFRHpBTk1Bc0dDV0NFUWdFYUFRQURBakNCdXdZRFZSMGZCSUd6TUlHd01EZWdOYUF6aGpGb2RIUndPaTh2WTNKc0xuUmxjM1EwTG1KMWVYQmhjM011Ym04dlkzSnNMMEpRUTJ4aGMzTXpWRFJEUVRNdVkzSnNNSFdnYzZCeGhtOXNaR0Z3T2k4dmJHUmhjQzUwWlhOME5DNWlkWGx3WVhOekxtNXZMMlJqUFVKMWVYQmhjM01zWkdNOVRrOHNRMDQ5UW5WNWNHRnpjeVV5TUVOc1lYTnpKVEl3TXlVeU1GUmxjM1EwSlRJd1EwRWxNakF6UDJObGNuUnBabWxqWVhSbFVtVjJiMk5oZEdsdmJreHBjM1F3Z1lvR0NDc0dBUVVGQndFQkJINHdmREE3QmdnckJnRUZCUWN3QVlZdmFIUjBjRG92TDI5amMzQXVkR1Z6ZERRdVluVjVjR0Z6Y3k1dWJ5OXZZM053TDBKUVEyeGhjM016VkRSRFFUTXdQUVlJS3dZQkJRVUhNQUtHTVdoMGRIQTZMeTlqY25RdWRHVnpkRFF1WW5WNWNHRnpjeTV1Ynk5amNuUXZRbEJEYkdGemN6TlVORU5CTXk1alpYSXdEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBRWNqS3FKdTNOb2FPRUNZVGVrNjZ3TmZqVzlpUnowVllMbHBiYzVBRkVjMmN1RWlld05SNlNoME1vNFRmeFpEVkFsaTJaaUVXYytybHZGYVMyaGJlYlIrYktVcnlQY1ZGU0NBdEM3MkQ0amE2ek1qdStOcHZFZXRUbjZrODFXZ2ZzZ2p4NlhOakpZY1wvNlFOanZUNE4yMmFkRXd5TXZoRThsamtTZzRkXC91ZFF5aTJEUWRIdDBTaHFcL1dLMDY4TitoS1JnK1JJSWRDdTZJbDlGU25keVlPMGF6V1pwY2p1akhWSDdwOHFLVlo1OEc4N0hEaUM2RmNwZVpCT216VFwvTzdYaVN5MTQxVTQzSmVGS0JYa1Z1cEMwT1lQb3NZR1BubXpFeHFXTHliZ2tiT1wvZFNsOG9EVHpJSWlmdnh5Q2QyaU1FQWMwNytPdUVlZkVUekF4anFCSE09Il0sImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczpcL1wvb2lkYy10ZXN0MS5kaWZpLmVvbi5ub1wvaWRwb3J0ZW4tb2lkYy1wcm92aWRlclwvIiwic2NvcGUiOiJnbG9iYWxcL2tvbnRha3RpbmZvcm1hc2pvbi5yZWFkIGdsb2JhbFwvdmFyc2xpbmdzc3RhdHVzLnJlYWQgZ2xvYmFsXC9uYXZuLnJlYWQgZ2xvYmFsXC9wb3N0YWRyZXNzZS5yZWFkIGdsb2JhbFwvc2VydGlmaWthdC5yZWFkIiwiaXNzIjoidGVzdF9ycCIsImV4cCI6MTUyMDU4OTkyOCwiaWF0IjoxNTIwNTg5ODA4LCJqdGkiOiI0MTVlYzdhYy0zM2ViLTRjZTMtYmM4Ni02YWQ0MGUyOTc2OGYifQ.adPOxFus4Bq5okDfI2dTvmRM6Ip8tZRbJ5FQGUsvj9MCyXJg2eKhsWit99CKAZD9AO3CLNjWmXyXTTjRJiSNNulBqlLdNMByzjV1F_Y8qYNt22Y2X_5TM0gE-44vMoUoRxRW38zebzFVi_EAlbVmOoKnTgpKjREWaFRRZH5BX9l0pgCk9-s6ZazR__zFgdpr28XOzGoZHGLbbac40uXAAJk2qKxatouKybYKLWUwN6Y6gFyqY8-BrX-P-yCGlaj3NUfSiaRODMzVqbxaqW5NuVHpomQU7ycZpKgCd_xm40lohgv-k2z9QfdNXKFwPRD8yE4EGL3KYU9nar1gpcA_Ug
```

which decoded becomes:

```
{
  "x5c": [ "MIIFETCCA/mgAwIB``````EefETzAxjqBHM=" ],
  "alg": "RS256"
}
.
{
  "aud": "https://oidc-test1.difi.eon.no/idporten-oidc-provider/",
  "scope": "global/kontaktinformasjon.read global/varslingsstatus.read global/navn.read global/postadresse.read global/sertifikat.read",
  "iss": "test_rp",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "415ec7ac-33eb-4ce3-bc86-6ad40e29768f"
}
.
<<signature-value>>
```
