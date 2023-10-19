---
title: Skyporten med AWS - Maskinporten med for deling av skyressurser
description:  Skyporten med AWS - Maskinporten for deling av skyressurser
summary: 'Oppskrift for å benytte Skyporten med AWS'

sidebar: maskinporten_sidebar
product: Maskinporten
redirect_from: /maskinporten_skyporten
---

---
* TOC
{:toc}

## NB: DENNE INTEGRASJONEN FUNGERER IKKE

Vi jobber med DigDir for å løse de utestående problemene.

## For deg som skal tilby via AWS (Amazon Web Services)

### Oppsett

Prosjektet krever at man har et ekte Maskinporten-token mot det rette miljøet.
[Her er informasjon om hvordan du kommer i gang med Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#tilgang-til-maskinporten).

Du må også ha en AWS konto, og aws CLI-verktøy installert.

### AWS med Maskinporten som OIDC provider

På AWS er det [OIDC identity providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) som brukes for Skyporten sin OIDC-integrasjon.

Nå følger en oppskrift på hvordan du kan gjøre det. [Ta kontakt med oss]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#kontakt) om du vil ha hjelp til å sette i gang.


#### Sett opp AWS på kommandolinjen

(Sett opp AWS CLI)[https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html].
Du må også definere et AWS profilnavn, f.eks. 'skyportenprofil'.

#### Definer konto-variabler

``````bash
export AWSPROFILENAME=skyportenprofil
# Finn id for AWS-kontoen din og eksporter den
export AWS_ACCOUNT=1234567890123
``````

#### Lag OIDC provider json

``````bash
aws iam --profile $AWSPROFILENAME create-open-id-connect-provider --cli-input-json file://create-open-id-connect-provider.json
``````

Den får et tomt innhold, som du kan kan fylle ut.

``````json
{
    "Url": "",
    "ClientIDList": [
        ""
    ],
    "ThumbprintList": [
        ""
    ],
    "Tags": [
        {
            "Key": "",
            "Value": ""
        }
    ]
}
``````


#### Obtain the thumbprint of the openid-configuration

We follow this guide: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html

Open https://sky.maskinporten.dev/.well-known/openid-configuration in a browser.

``````json
{
  "issuer":"https://sky.maskinporten.dev/",
  "token_endpoint":"https://sky.maskinporten.dev/token",
  "jwks_uri":"https://sky.maskinporten.dev/jwk",
  "token_endpoint_auth_methods_supported":["private_key_jwt"],
  "grant_types_supported":["urn:ietf:params:oauth:grant-type:jwt-bearer"],
  "token_endpoint_auth_signing_alg_values_supported":["RS256","RS384","RS512"]
}
```

Copy the jwks_uri `https://sky.maskinporten.dev/jwk`.

Use the OpenSSL command line tool to run the following command. Replace keys.example.com with the domain name you obtained in Step 3.

``````bash
openssl s_client -servername sky.maskinporten.dev -showcerts -connect sky.maskinporten.dev:443
``````

##### Save the last certificate

Copy the certificate (including the -----BEGIN CERTIFICATE----- and -----END CERTIFICATE----- lines) and paste it into a text file. Then save the file with the file name certificate.crt.


##### Get thumbprint

Use the OpenSSL command line tool to run the following command.

```
openssl x509 -in certificate.crt -fingerprint -sha1 -noout
```

Your command window displays the certificate thumbprint, which looks similar to the following example:

SHA1 Fingerprint=99:0F:41:93:97:2F:2B:EC:F1:2D:DE:DA:52:37:F9:C9:52:F2:0D:9E

Then remove the colons:

```
990F4193972F2BECF12DDEDA5237F9C952F20D9E
```


Adjust the create-open-id-connect-provider.json file like this:

``````json
{
    "Url": "https://sky.maskinporten.dev/",
    "ClientIDList": [
        "skyportenpoc"
    ],
    "ThumbprintList": [
        "990F4193972F2BECF12DDEDA5237F9C952F20D9E"
    ],
    "Tags": [
        {
            "Key": "skyportenpoc",
            "Value": "created from cli"
        }
    ]
}
``````


#### Opprett provider

Next, to create the OpenID Connect (OIDC) provider, use the create-open-id-connect-provider command again,
this time passing the --cli-input-json parameter to specify your JSON file. The following `create-open-id-connect-provider`
command uses the --cli-input-json parameter with a JSON file called create-open-id-connect-provider.json

``````bash
aws iam --profile $AWSPROFILENAME create-open-id-connect-provider --cli-input-json file://create-open-id-connect-provider.json
Output:
{
    "OpenIDConnectProviderArn": "arn:aws:iam::123456789012:oidc-provider/sky.maskinporten.dev/",
    "Tags": [
        {
            "Key": "skyportenpoc",
            "Value": "created from cli"
        }
    ]
}
``````


#### Opprett en tilgangsrolle

Definisjon av rollen i filen `web-identity-trust-policy.json`:

``````json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal":{
        "Federated": "arn:aws:iam::123456789012:oidc-provider/sky.maskinporten.dev/"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "sky.maskinporten.dev:scope": "entur:skyss.1"
        }
      }
    }
  ]
}
``````

Rollen opprettes slik:

``````bash
aws iam --profile $AWSPROFILENAME create-role --role-name skyporten-role --assume-role-policy-document file://web-identity-trust-policy.json
``````

Så eksporterer vi rollen:

``````bash
export SKYPORTEN_ROLE_ARN="arn:aws:iam::123456789012:role/skyporten-role"
``````

#### TODO Opprett en s3-bøtte med en test fil

#### TODO Gi skyporten-rollen lesetilgang til s3-bøtta


## For deg som skal konsumere fra AWS

### Oppsett

Prosjektet krever at man har et ekte Maskinporten-token mot det rette miljøet.
[Her er informasjon om hvordan du kommer i gang med Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#tilgang-til-maskinporten).

[Her er et node.js eksempel på token-generering for skyporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#eksempel-kode-for-token-generering).

### Autentisering i AWS med Maskinporten

#### Definer token som miljøvariabel

Her foventes det å finne maskinporten-token i full json i `tmp_maskinporten_access_token.json`. Dette er kan opprettes med et av
[disse kode-eksemplene]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#kode-eksempler-for-maskinporten).

``````bash
export MASKINPORTEN_TOKEN_FILE=tmp_maskinporten_token.txt
export MASKINPORTEN_TOKEN=`cat tmp_maskinporten_access_token.json | jq -r .access_token`
``````

The unpacked token will look something like this:

``````json
{
  "aud": "https://entur.org",
  "sub": "0192:917422575",
  "scope": "entur:foo.1",
  "iss": "https://sky.maskinporten.dev/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1694222211,
  "iat": 1694333311,
  "client_id": "abcd1234-1234-abcd-abcd-12341234abcd",
  "jti": "lwlwlwlw4lwlwlwlwl4lwlw4-lw-lwl4lwl4lwl4lwl4",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:917422575"
  }
}
``````


#### Login with the federated credentials and download a file, to test access

``````bash
aws sts --profile fem-admin assume-role-with-web-identity --duration-seconds 900 --role-session-name skyporten-role-session --role-arn "arn:aws:iam::$AWS_ACCOUNT:role/skyporten-role" --web-identity-token "$MASKINPORTEN_TOKEN"
``````

Vi får fortsatt følgende feil:

``````bash
An error occurred (InvalidIdentityToken) when calling the AssumeRoleWithWebIdentity operation: Couldn't retrieve verification key from your identity provider, please reference AssumeRoleWithWebIdentity documentation for requirements
``````

Vi jobber med DigDir for å fikse problemet.
