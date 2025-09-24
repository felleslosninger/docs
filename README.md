## Teknisk dokumentasjon av Digitaliseringsdirektoratet fellesløsninger

Dette er kildekoden til den tekniske dokumentasjonen for Digitaliseringsdirektoratet fellesløsninger.

Du finner en formatert versjon av denne dokumentasjonen på følgende nettside: https://docs.digdir.no

## Køyre DigDirDocs lokalt

### Docker

Stå i repoet og kjør kommandoen:

```docker run --rm -v $(pwd):/srv/jekyll -p 4000:4000 jekyll/jekyll bash -c "gem install webrick && jekyll serve"```

### Uten docker

Om ein har installert Jekyll så vil det vere nok å køyre følgande kommando i repoet:

```jekyll serve```