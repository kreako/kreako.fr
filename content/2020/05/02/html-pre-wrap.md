---
type: "note"
title: "Overflow sur un élément wrap"
date: 2020-05-02
tags:
- html
- css
- pre
---

Un élément html `<pre>` a un comportement différent des autres éléments (`<p>` par exemple).

Un `<p>` va insérer des sauts de lignes pour adapter sa taille (en largeur) à son parent.

Un `<pre>` (par défaut) va imposer la largeur de la plus grande ligne qui le
compose.  Sur un petit écran, il va dépasser, il faudra alors scroller
horizontalement.  Ce qui n'est pas très élégant.

En utilisant la propriété [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space), il peut insérer des sauts de ligne (quand nécessaire) et conserver les espaces : 

```css
pre {
  white-space:pre-wrap;
```

