---
title: Eksempel på installasjon av integrasjonspunktet i Azure Kubernetes Service (AKS)
description: ""
summary: ""
product: eFormidling
sidebar: eformidling_sidebar
redirect_from: /integrasjonspunkt_aks
---

Integrasjonspunktet kan kjøres i AKS eller andre skyplattformer som støter Kubernetes. Azure Key Vault er alternativ for oppbevaring av kryptografiske nøkler.

1. TOC
{:toc}

## Forutsetninger
---
- Kubectl - <https://kubernetes.io/docs/tasks/tools/install-kubectl/>
- Azure CLI - <https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest>
- Helm - <https://helm.sh/>
- Azure Key Vault - <https://docs.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal>

Det forutsettes også at det er satt opp en ressursgruppe, et Azure Kubernetes-cluster, og Azure Key Vault. Dette kan gjøres enten via Azure web
portal, eller via Azure CLI som forklart her: <https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough>

Videre i dokumentasjonen vil ressursgruppen, AKS-clusteret, og Key Vault  bli referert til ved navn `ip-rg`, `ip-akscluster`, og `ip-kv` respektivt.

Steg-for-steg
---

### 1. Logg inn i Azure

```console
$ az login
```

### 2. Sett opp kubectl til å gå mot AKS

```console
$ az aks get-credentials --resource-group ip-rg --name ip-akscluster
```
Verifiser at oppsett for kubectl er riktig:

```console
$ kubectl get all
```

### 3. Installer database

Database installeres via Helm.

```console
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm repo update
$ helm search repo postgresql
NAME                                    CHART VERSION   APP VERSION     DESCRIPTION
bitnami/postgresql                      8.10.5          11.8.0          Chart for PostgreSQL, an object-relational data...
...
$ helm install postgresql bitnami/postgresql
```
Postgresql-instansen kan så nåes fra clusteret på `postgresql.default.svc.cluster.local`.

Installasjonen oppretter en standard database ved navn `postgres`, denne vil bli benyttet videre i guiden.

#### 3.1
Alternativt kan man opprette egen database. Eksporter passord til miljøvariabel, og koble til:

```console
$ export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)
$ kubectl run postgresql-client --rm --tty -i --restart='Never' --namespace default --image docker.io/bitnami/postgresql:11.8.0-debian-10-r19 --env="PGPASSWORD=$POSTGRES_PASSWORD" --command -- psql --host postgresql -U postgres -d postgres -p 5432
postgres=# create database testdb;
CREATE DATABASE
postgres=# exit
pod "postgresql-client" deleted
```

### 4. Sett opp ActiveMQ
*NB - bør settes opp som persistent volume, ikke dekket av guide*

Eksempel på `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: activemq
  name: activemq
spec:
  replicas: 1
  revisionHistoryLimit: 1
  selector:
    matchLabels:
      app: activemq
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: activemq
    spec:
      containers:
      - image: rmohr/activemq:5.15.9
        name: activemq
        resources: {}
status: {}
---
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: activemq
  name: activemq
spec:
  ports:
  - name: 61616-61616
    port: 61616
    protocol: TCP
    targetPort: 61616
  selector:
    app: activemq
  type: ClusterIP
status:
  loadBalancer: {}
```

Deployes med `kubectl`:

```console
$ kubectl apply -f deployment.yaml
```

### 5. Azure Key Vault og Azure Key Vault Env Injector
Azure Key Vault kan brukes til å lagre secrets. Her vil vi lagre passordet til keystoren integrasjonspunktet benytter.

Steget forutsetter at Azure Key Vault er satt opp i Azure portalen. Alternativt kan den opprettes via følgende kommando:

```console
az keyvault create --name "ip-kv" --resource-group "ip-rg" --location norwayeast
```

Legg til secret for keystore passord

```console
az keyvault secret set --vault-name "ip-kv" --name "kspass" --value "hemmelig passord"
```

For å tilgjengeliggjøre denne secret'en som en miljøvariabel, slik at den kan suppleres til integrasjonspunktet, benytter
vi *akv2k8s (Azure Key Vault to Kubernetes)* (<https://akv2k8s.io/>)

```console
$ kubectl create ns akv2k8s
$ helm repo add spv-charts http://charts.spvapi.no
$ helm repo update
$ helm upgrade --install akv2k8s spv-charts/akv2k8s --namespace akv2k8s
```

akv2k8s trenger lesetilgang til Azure Key Vault for å hente secrets, enten via service principal eller managed identity. Clusteret i dette eksempelet ble satt opp med managed identity:

```console
$ az aks show -n ip-akscluster -g ip-rg | jq .identityProfile.kubeletidentity.objectId -r
7c8ce058-55f0-4ae2-b1f2-c22521ae0893
$ az keyvault set-policy --name ip-kv --object-id 7c8ce058-55f0-4ae2-b1f2-c22521ae0893 --secret-permissions get
```

Alternativt med service principal:

```console
$ az keyvault set-policy --name ip-kv --spn <spn> --secret-permissions get
```


Skru på env-injection for default namespace

```console
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Namespace
metadata:
  name: default
  labels:
    azure-key-vault-env-injection: enabled
EOF
```

Key Vault secret'en må så gjøres tilgjengelig for clusteret:

```console
apiVersion: spv.no/v2beta1
kind: AzureKeyVaultSecret
metadata:
  name: kv-kspass
  namespace: default
spec:
  vault:
    name: ip-kv
    object:
      type: secret
      name: kspass
```

### 6. Java KeyStore
Selve keystoren lagres som en kubernetes secret.

```console
$ kubectl create secret generic keystore.jks --from-file=./keystore.jks
```

Denne vil bli referert i integrasjonspunktets deployment.

### 7. Integrasjonspunktet

Følgende deployment kan brukes som eksempel på å sette opp integrasjonspunktet med DPO i staging-miljøet. Merk at properties
settes som miljøvariable, og må byttes ut med egne verdier.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: ip-staging
  name: ip-staging
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ip-staging
  strategy: {}
  revisionHistoryLimit: 3
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: ip-staging
    spec:
      containers:
      - image: digdir/integrasjonspunkt:2.2.6
        name: integrasjonspunkt
        resources: {}
        volumeMounts:
        - name: keystore
          mountPath: "/etc/keystore"
          readOnly: true
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "staging"
        - name: DIFI_MOVE_ORG_NUMBER
          value: "123123123"
        - name: DIFI_MOVE_ORG_KEYSTORE_ALIAS
          value: "123123123"
        - name: DIFI_MOVE_ORG_KEYSTORE_PATH
          value: "file:/etc/keystore/keystore.jks"
        - name: DIFI_MOVE_ORG_KEYSTORE_PASSWORD
          value: "kv-kspass@azurekeyvault"
        - name: DIFI_MOVE_FEATURE_ENABLEDPO
          value: "true"
        - name: DIFI_MOVE_FEATURE_ENABLEDPE
          value: "false"
        - name: DIFI_MOVE_DPO_USERNAME
          value: "brukernavn"
        - name: DIFI_MOVE_DPO_PASSWORD
          value: "passord"
        - name: DIFI_MOVE_NEXTMOVE_USE_DB_PERSISTENCE
          value: "true"
        - name: SPRING_DATASOURCE_URL
          value: "jdbc:postgresql://postgresql.default.svc.cluster.local:5432/postgres"
        - name: SPRING_DATASOURCE_USERNAME
          value: "postgres"
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql
              key: postgresql-password
        - name: SPRING_ACTIVEMQ_BROKERURL
          value: "tcp://activemq.default.svc.cluster.local:61616"
      volumes:
      - name: keystore
        secret:
          secretName: keystore.jks
          items:
          - key: keystore.jks
            path: keystore.jks
status: {}
---
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: ip-staging
  name: ip-staging
spec:
  ports:
  - name: 9093-9093
    port: 9093
    protocol: TCP
    targetPort: 9093
  selector:
    app: ip-staging
  type: ClusterIP
status:
  loadBalancer: {}
```

Deploy:

```console
$ kubectl apply -f integrasjonspunkt.yaml
```

Servicen er her satt opp med type `ClusterIP` - port 9093 må forwardes for å få kontakt med tjenesten lokalt:

```console
$ kubectl get service ip-staging
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
ip-staging   ClusterIP   10.0.166.107   <none>        9093/TCP   15h

$ kubectl port-forward svc/ip-staging 9093
Forwarding from 127.0.0.1:9093 -> 9093
Forwarding from [::1]:9093 -> 9093
Handling connection for 9093
```

Integrasjonspunktet skal da kunne nåes på følgende adresse (bytt ut med egen ekstern ip):

```console
$ curl http://localhost:9093/manage/health
```
