---
type: "note"
title: "Trier un Array par date en javascript"
date: 2020-05-02
tags:
- javascript
- date
---

Pour trier un `Array` par la propriété `date` des objets qu'il contient, un `Array` comme cela :

```javascript
let array = [{date: new Date(2020, 5, 1)},
             {date: new Date(2018, 4, 3)},
             {date: new Date(2019, 11, 29)}]
```

alors je peux faire :

```javascript
array.sort((a, b) => {
  // Transforme la date en entier exprimé en secondes (~timestamp unix)
  a = a.date.valueOf()
  b = b.date.valueOf()
  // a > b est un booléen,
  // on peut le "coerce" en entier avec l'opération arithmétique "-"
  // true -> 1, false -> 0
  // Donc si a > b : 1 - 0 => 1
  // Donc si a < b : 0 - 1 => -1
  // Donc si a === b : 0 - 0 => 0
  return (a > b) - (a < b)
})
```
