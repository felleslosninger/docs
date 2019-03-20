---
title: Om disse sidene
description: Om disse sidene
summary: "Litt meta-info om disse sidene"
permalink: oidc_about.html

layout: page
sidebar: oidc
---

## Om sidene

Disse sidene er dokumentasjonen av ID-porten sin OpenID Connect provider.  Dokumentasjonen er åpent tilgjenglig og vedlikeholdes på GitHub-repoet [https://github.com/difi/idporten-oidc-dokumentasjon](https://github.com/difi/idporten-oidc-dokumentasjon). Issues og pull requests er velkomne!

## Teknisk

* Sidene publiseres vha [GitHub Pages](https://pages.github.com/) på [https://difi.github.io/idporten-oidc-dokumentasjon/](https://difi.github.io/idporten-oidc-dokumentasjon/)
* Sidene er skrevet i [markdown](https://guides.github.com/features/mastering-markdown/) og benytter et tema/layout basert på [Jekyll Documentation Theme av Tom Johnson](https://github.com/tomjohnson1492/documentation-theme-jekyll).
* Grafer og sekvensdiagram blir generert direkte i brukers browser, basert på  [mermaid](https://knsv.github.io/mermaid/).
* [Atom](https://atom.io/) med [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/)-plugin er anbefalt til å skriving.

### Tilpassingar

For å få ein god arbeidsflyt, har vi gjort følgjande tilpassingar.

#### Mermaid i documentation-theme-jekyll
For å få mermaid-støtte i documentation-theme-jekyll, må følgjande leggast til på høvande plass i  `_layouts/default.html`
```html
<link rel="stylesheet" type="text/css" href="css/mermaid.css">
<script src="{{ site.baseurl }}/js/mermaid.min.js"></script>
```
og så kan grafer defineres mellom `<div class="mermaid">` og `</div>`  .

#### Forhåndsvisning av mermaid i Atom
For at Markdown Preview Enhanced skal kunne forhåndsvise mermaid-syntax, utan å tulle det til for kramdown hos GitHub pages som samstundes skal prosessere og publisere markdown-fila, må følgande halvgrisete hack inn i parser.js i Atom:
```javascript
onWillParseMarkdown: function(markdown) {
  return new Promise((resolve, reject)=> {
    markdown = markdown.replace(/<div class="mermaid"/gm, ($0)=> "```mermaid")
    markdown = markdown.replace(/<\/div>/gm, ($0)=> "```")
    return resolve(markdown)
  })
```
Det gjer ein enklast ved å trykka CTRL+SHIFT+P og søke etter kommandoen "Markdown Preview Enhanced: Extend Parser".

Du skal altså ikkje skrive ` ```mermaid ` taggen direkte slik som dokumentasjonen til Markdown Preview Enhanced seier.

#### Hugse git-passord i Atom
Køyre `git config --global credential.helper wincred` i aktuelt repo.
