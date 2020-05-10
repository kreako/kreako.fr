---
type: "article"
title: 'Un blog avec svelte/sapper'
date: 2020-05-01
tags:
- javascript
- svelte
- sapper
---

# Hello world !

## La base

Ceci est un blog propulsé par svelte/sapper. Il est basé sur le
[getting-started](https://github.com/sveltejs/sapper-template) de sapper.

La différence, c'est que cet article est écrit avec markdown avec un front-matter en yaml.

* [gray-matter](https://github.com/jonschlinkert/gray-matter/) lit le front-matter
* [marked](https://marked.js.org/) transforme le markdown en html
* [highlight.js](https://highlightjs.org/) colorise les blocs de code


## L'adaptation

### L'index des posts

Pour cela,
[`src/routes/blog/index.json.js`](https://github.com/sveltejs/sapper-template/blob/master/src/routes/blog/index.json.js)
est adapté, il ne prend plus ses données d'un module `_posts.js` mais d'un
répertoire `content/`, de cette façon :

```javascript
export function get(req, res) {
  let posts = glob.sync("content/**/*.md").map(filename => {
    // read article from filesystem
    const raw = fs.readFileSync(filename, "utf-8")
    // Read front matter
    let data = grayMatter(raw).data
    // Add a slug (based on filename)
    data.slug = slugify(filename)
    return data
  })

  // sort them by date (newer first)
  posts.sort((a, b) => {
    a = a.date.valueOf()
    b = b.date.valueOf()
    // should return :
    // a > b => -1
    // a < b => 1
    // a === b => 0
    return (a < b) - (a > b)
  })

  // Write back list of posts in json
  res.writeHead(200, {
    "Content-Type": "application/json"
  })
  res.end(JSON.stringify(posts))
}
```

`index.json.js`, c'est le javascript qui est appelé lorsque le composant svelte
demande à accéder à l'url `blog.json`, de cette façon :

```javascript
<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>
```

Le composant exporte une propriété posts :

```javascript
<script>
	export let articles;
</script>
```

qui est automatiquement "remplie" par le résultat de la fonction `preload`.

Ce qui explique aussi pourquoi elle est dans un contexte "module" car ce sont
des données qui sont utilisées pour initialiser le composant (qui n'existe donc
pas encore...)


### Un post


Chaque post est lu dans [`src/routes/blog/[slug].json.js`](https://github.com/sveltejs/sapper-template/blob/master/src/routes/blog/%5Bslug%5D.json.js), de cette façon :

```javascript
export function get(req, res, next) {
  // slug url parameter
  const { slug } = req.params

  // find filename from slug
  let filename = glob.sync("content/**/*.md").find(filename => slugify(filename) === slug)
  // raw content
  let raw = fs.readFileSync(filename, "utf-8")

  // marked renderer options
  // to be passed later to marked
  const renderer = new marked.Renderer()

  // use it to handle code block, highlight them using ... highlighting.js
  renderer.code = (source, lang) => {
    const { value: highlighted } = hljs.highlight(lang, source)
    return `<pre><code>${highlighted}</code></pre>`
  }

  // get front matter and content
  const { data, content } = grayMatter(raw)

  // markdown -> html
  const html = marked(content, { renderer })

  if (html) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    })

    res.end(JSON.stringify({ html, ...data }))
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    })

    res.end(
      JSON.stringify({
        message: `Not found`
      })
    )
  }
}
```

## Un hébergement statique

Et c'est la base. La bonne nouvelle, c'est que tout ça s'héberge très facilement, puisqu'un :

```shell
$ npm run export
```

exporte le site en entier sous forme statique.


## Des sources

Voilà pour les grandes lignes. Quelques détails ont été omis, alors les sources sont ici : TODO
