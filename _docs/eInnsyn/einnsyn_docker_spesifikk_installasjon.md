---
title: Docker-spesifikk installasjon
description: Docker-spesifikk installasjon for einnsynsklienten
summary: "Her finner du informasjon om for docker-spesifikk intallasjon for eInnsynsklienten"

sidebar: einnsyn_sidebar
redirect_from: /einnsyn_docker_spesifikk_installasjon
---

## Docker-spesifikk installasjon

Ved bruk av Docker må eInnsynsklienten konfigureres ved hjelp av miljøvariabler

Hvordan en spesifiserer konfigurasjonen avhenger av hvilke verktøy som brukes: docker-compose, Kubernetes eller andre. 
Et par yaml-eksempler med minimumskonfigurasjon kan en se under:

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: einnsyn-klient
spec:
  replicas: 1
  selector:
    matchLabels:
      app: einnsyn-klient
  template:
    metadata:
      labels:
        app: einnsyn-klient
    spec:
      containers:
        - name: einnsyn-klient
          image: digdir/einnsyn-klient:4.0.0
          env:
            - name: USE_IP
              value: "true"
            - name: RECEIVER_ORGNUMMER
              value: "991825827"
            - name: APPLICATION_MOVE_URL
              value: "http://integrasjonspunkt:9093"
            - name: APPLICATION_INPUT_DIRECTORY
              value: "/input"
            - name: APPLICATION_ORGNUMMER
              value: "123456789"
            - name: SPRING_MAIL_HOST
              value: ""
            - name: SPRING_MAIL_PORT
              value: ""
            - name: SPRING_MAIL_USERNAME
              value: ""
            - name: SPRING_MAIL_PASSWORD
              value: ""
          volumeMounts:
            - name: input-volume
              mountPath: /input
          command: ["/bin/sh", "-c"]
          args:
            - >
              java -jar /app/einnsyn-klient.jar
              -Dapplication.moveUrl=${APPLICATION_MOVE_URL}
              -Dapplication.inputDirectory=${APPLICATION_INPUT_DIRECTORY}
              -Dapplication.orgnummer=${APPLICATION_ORGNUMMER}
              -Dapplication.receiverId=${RECEIVER_ORGNUMMER}
              -Dspring.mail.host=${SPRING_MAIL_HOST}
              -Dspring.mail.port=${SPRING_MAIL_PORT}
              -Dspring.mail.username=${SPRING_MAIL_USERNAME}
              -Dspring.mail.password=${SPRING_MAIL_PASSWORD}
      volumes:
        - name: input-volume
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: einnsyn-klient
spec:
  selector:
    app: einnsyn-klient
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
```

### Docker-compose

```yaml
version: "3.9"

services:
  einnsyn-klient:
    image: digdir/einnsyn-klient:4.0.0
    container_name: einnsyn-klient
    environment:
      USE_IP: "true"
      APPLICATION_MOVE_URL: "http://localhost:9093"
      APPLICATION_INPUT_DIRECTORY: "/input"
      APPLICATION_ORGNUMMER: "123456789"
      APPLICATION_RECEIVER_ID: "991825827"
      SPRING_MAIL_HOST: ""
      SPRING_MAIL_PORT: ""
      SPRING_MAIL_USERNAME: ""
      SPRING_MAIL_PASSWORD: ""
    volumes:
      - ./input:/input
```


