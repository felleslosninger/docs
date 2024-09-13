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

## For deg som skal tilby via AWS (Amazon Web Services)

### Oppsett

Prosjektet krever at man har et ekte Maskinporten-token mot det rette miljøet.
[Her er informasjon om hvordan du kommer i gang med Maskinporten]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#tilgang-til-maskinporten).

Du må også ha en AWS konto, og aws CLI-verktøy installert.

### AWS med Maskinporten som OIDC provider

På AWS er det [OIDC identity providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) som brukes for Skyporten sin OIDC-integrasjon.

Nå følger en oppskrift på hvordan du kan gjøre det. [Ta kontakt med oss]({{site.baseurl}}/docs/Maskinporten/maskinporten_skyporten#kontakt) om du vil ha hjelp til å sette i gang.


#### Sett opp AWS på kommandolinjen

[Sett opp AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
Du må også definere et AWS profilnavn, f.eks. 'skyportenprofil'.

#### Definer AWS og Maskinporten variabler

``````bash
# Definer din default AWS region
export AWS_DEFAULT_REGION=eu-west-1
# Velg profil, må være definert i ~/.aws/config eller lignende
export AWSPROFILENAME=skyportenprofil
# Finn id for AWS-kontoen din og eksporter den
export AWS_ACCOUNT=1234567890123
# Velg s3 bøttenavn
export BUCKET_NAME=skyporten-test-bucket
# Maskinporten sitt test miljø
export MASKINPORTEN_URL=test.sky.maskinporten.no
# Må matche audience i token som genereres av maskinporten
export AUDIENCE=https://skyporten.<mydomain>
# Org id for organisasjonen som skal få tilgang til data
export CONSUMER_ORGID="0192:123456789"
# Maskinporten scopet som gir tilgang
export MASKINPORTEN_SCOPE="entur:skyporten.demo"
# Navn på AWS rolle som skal opprettes
export AWS_ROLENAME="skyporten-role"
# Navn på AWS policy som skal opprettes
export AWS_POLICYNAME="skyporten-s3-policy"

``````

#### Lag OIDC provider json

Slett provider hvis den allerede finnes:

```
aws iam --profile $AWSPROFILENAME delete-open-id-connect-provider --open-id-connect-provider-arn "arn:aws:iam::$AWS_ACCOUNT:oidc-provider/$MASKINPORTENURL"
```


#### Obtain the thumbprint of the openid-configuration

We follow this [guide from AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html)

Open https://test.sky.maskinporten.no/.well-known/openid-configuration in a browser.

``````json
{
  "issuer":"https://test.sky.maskinporten.no",
  "token_endpoint":"https://test.sky.maskinporten.no/token",
  "jwks_uri":"https://test.sky.maskinporten.no/jwk",
  "token_endpoint_auth_methods_supported":["private_key_jwt"],
  "grant_types_supported":["urn:ietf:params:oauth:grant-type:jwt-bearer"],
  "token_endpoint_auth_signing_alg_values_supported":["RS256","RS384","RS512"]
}
``````

Copy the _jwks_uri_.

Use the OpenSSL command line tool to run the following command:

``````bash
openssl s_client -servername test.sky.maskinporten.no -showcerts -connect test.sky.maskinporten.no:443
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

Lag en variabel:

```
export THUMBPRINT=990F4193972F2BECF12DDEDA5237F9C952F20D9E
```




Lag json definisjon for OpenID provider:

```
echo "{
    \"Url\": \"https://$MASKINPORTEN_URL\",
    \"ClientIDList\": [
        \"$AUDIENCE\"
    ],
    \"ThumbprintList\": [
        \"$THUMBPRINT\"
    ],
    \"Tags\": [
        {
            \"Key\": \"skyportenpoc\",
            \"Value\": \"created from cli\"
        }
    ]
}
" > ./create-open-id-connect-provider.json
```




#### Opprett provider

Next, to create the OpenID Connect (OIDC) provider, use the create-open-id-connect-provider command again,
this time passing the --cli-input-json parameter to specify your JSON file. The following `create-open-id-connect-provider`
command uses the --cli-input-json parameter with a JSON file called create-open-id-connect-provider.json

``````bash
aws iam --profile $AWSPROFILENAME create-open-id-connect-provider --cli-input-json file://create-open-id-connect-provider.json
Output:
{
    "OpenIDConnectProviderArn": "arn:aws:iam::123456789012:oidc-provider/test.sky.maskinporten.no/",
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

```
echo "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [
    {
      \"Effect\": \"Allow\",
      \"Principal\":{
        \"Federated\": \"arn:aws:iam::$AWS_ACCOUNT:oidc-provider/$MASKINPORTEN_URL\"
      },
      \"Action\": \"sts:AssumeRoleWithWebIdentity\",
      \"Condition\": {
        \"StringEquals\": {
            \"$MASKINPORTEN_URL:sub\": \"$CONSUMER_ORGID;$MASKINPORTEN_SCOPE\"
        }
      }
  }
  ]
}" > web-identity-trust-policy.json
```

Slett gammel attachment, role og policy, om nødvendig:

```
export POLICY_ARN="arn:aws:iam::$AWS_ACCOUNT:policy/$AWS_POLICYNAME"

aws --profile $AWSPROFILENAME iam detach-role-policy --policy-arn "$POLICY_ARN" --role-name $AWS_ROLENAME
aws --profile $AWSPROFILENAME iam delete-policy --policy-arn $POLICY_ARN
aws iam --profile $AWSPROFILENAME delete-role --role-name $AWS_ROLENAME
```

Rollen opprettes slik:

``````bash
aws iam --profile $AWSPROFILENAME create-role --role-name skyporten-role --assume-role-policy-document file://web-identity-trust-policy.json
``````

Expected output:

```
{
    "Role": {
        "Path": "/",
        "RoleName": "AWS_ROLENAME",
        "RoleId": "....",
        "Arn": "arn:aws:iam::AWS_ACCOUNT:role/AWS_ROLENAME",
        "CreateDate": "2024-09-10T11:54:11+00:00",
        "AssumeRolePolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Federated": "arn:aws:iam::AWS_ACCOUNT:oidc-provider/MASKINPORTEN_URL"
                    },
                    "Action": "sts:AssumeRoleWithWebIdentity",
                    "Condition": {
                        "StringEquals": {
                            "MASKINPORTEN_URL:sub": "CONSUMER_ORGID;MASKINPORTEN_SCOPE"
                        }
                    }
                }
            ]
        }
    }
}
```

#### Opprett en s3-bøtte med en test fil


```
aws  --profile $AWSPROFILENAME s3api create-bucket --bucket $BUCKET_NAME --region $AWS_DEFAULT_REGION --create-bucket-configuration LocationConstraint=$AWS_DEFAULT_REGION
```

Push file to s3:

```
echo "foo" > foo.txt
aws  --profile $AWSPROFILENAME s3 cp foo.txt s3://$BUCKET_NAME/foo.txt
```

#### Gi skyporten-rollen lesetilgang til s3-bøtta

Define policy:

```
echo "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
        {
            \"Effect\": \"Allow\",
            \"Action\": [
                \"s3:GetObject\",
                \"s3:List*\"
            ],
            \"Resource\": [
                \"arn:aws:s3:::$BUCKET_NAME\", \"arn:aws:s3:::$BUCKET_NAME/*\"
            ]
        }
    ]
}" > s3-policy.json
```

Create policy:

```
aws --profile $AWSPROFILENAME iam create-policy --policy-name $AWS_POLICYNAME --policy-document file://s3-policy.json
```

Expected output:

```
{
    "Policy": {
        "PolicyName": "AWS_POLICYNAME",
        "PolicyId": "....",
        "Arn": "arn:aws:iam::AWS_ACCOUNT:policy/skyporten-s3-policy",
        "Path": "/",
        "DefaultVersionId": "v1",
        "AttachmentCount": 0,
        "PermissionsBoundaryUsageCount": 0,
        "IsAttachable": true,
        "CreateDate": "2024-09-11T10:45:52+00:00",
        "UpdateDate": "2024-09-11T10:45:52+00:00"
    }
}
```

Attach policy to role:

```
aws --profile $AWSPROFILENAME iam attach-role-policy \
    --policy-arn "$POLICY_ARN" \
    --role-name $AWS_ROLENAME
```


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
export MASKINPORTEN_TOKEN=`cat tmp_maskinporten_access_token.json | jq -r .access_token`
``````

The unpacked token will look something like this:

``````json
{
  "aud": "https://skyporten.<mydomain>",
  "sub": "0192:123456789;entur:skyporten.demo",
  "scope": "entur:skyporten.demo",
  "iss": "test.sky.maskinporten.no",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1694222211,
  "iat": 1694333311,
  "client_id": "abcd1234-1234-abcd-abcd-12341234abcd",
  "jti": "lwlwlwlw4lwlwlwlwl4lwlw4-lw-lwl4lwl4lwl4lwl4",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:123456789"
  }
}
``````


### Authenticate with Maskinporten and copy s3 file

```
aws sts assume-role-with-web-identity --duration-seconds 900 --role-session-name $AWS_ROLENAME-session --role-arn "arn:aws:iam::$AWS_ACCOUNT:role/$AWS_ROLENAME" --web-identity-token "$MASKINPORTEN_TOKEN" --output text > sts-token.txt

read STS_ACCESS_KEY_ID STS_SECRET_ACCESS_KEY STS_SESSION_TOKEN <<< \
   $(more sts-token.txt | awk '/^CREDENTIALS/ { print $2, $4, $5 }')
AWS_ACCESS_KEY_ID=$STS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$STS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN=$STS_SESSION_TOKEN aws s3 cp s3://$BUCKET_NAME/foo.txt foo-remote.txt
```


### Troubleshooting / kjente problemer

Her er noen kjente problemer man kan støte på:

#### Incorrect token audience

```
aws sts assume-role-with-web-identity --duration-seconds 900 --role-session-name $AWS_ROLENAME-session --role-arn "arn:aws:iam::$AWS_ACCOUNT:role/$AWS_ROLENAME" --web-identity-token "$MASKINPORTEN_TOKEN"

An error occurred (InvalidIdentityToken) when calling the AssumeRoleWithWebIdentity operation: Incorrect token audience
```

Dette skjer fordi audience i maskinporten token ikke stemmer med verdien i ClientIDList i open id provider json-definisjon.
