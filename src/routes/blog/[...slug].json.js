import {getPost} from "./_posts"

export function get(req, res, next) {
  let { slug } = req.params
  slug = slug[0].split(",")
  let basename = slug.pop()
  let dir = slug.join("/")

  // get the markdown text
  const {html, data} = getPost(dir, basename)

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
