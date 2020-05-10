import fs from "fs"
import glob from "glob"
import path from "path"
import grayMatter from "gray-matter"
import slugify from "slugify"
import marked from "marked"
import hljs from "highlight.js"

const CONTENT = "content/"

function computeSlug(filename) {
  // first split filename in dir / basename . ext
  //
  // Remove CONTENT prefix
  filename = filename.replace(CONTENT, "")
  // Split on dir
  let v = filename.split("/")
  // basename is the last one
  let basename = v.pop()
  // directory part ending with /, "" if not
  let dir = v.length > 0 ? v.join("/") + "/"  : ""

  // Remove extension from basename
  v = basename.split(".")
  v.pop()
  basename = v.join(".")

  // dir + slug
  return dir + slugify(basename)
}

function extractDate(filename) {
  // Remove CONTENT prefix
  filename = filename.replace(CONTENT, "")
  // Split on dir
  let v = filename.split("/")
  // ignore basename
  v.pop()
  // should be year/month/day
  if (v.length !== 3) {
    throw new Error(`Invalid directory hierarchy "${v}", unable to extract year/month/day from it`)
  }

  let year = v[0]
  let month = v[1].padStart(2, "0")
  let day = v[2].padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function getAllPosts () {
  // walk through content and search for markdown files
  let posts = glob.sync(CONTENT + "**/*.md").map(filename => {
    // read post
    const raw = fs.readFileSync(filename, "utf-8")
    let data = grayMatter(raw).data
    // Check for mandatory fields on posts
    if (!data.title) {
      throw new Error(`Unable to find "title" field in front matter of "${filename}"`)
    }
    if (!data.type) {
      throw new Error(`Unable to find "type" field in front matter of "${filename}"`)
    }
    if (data.type !== "article" && data.type !== "note" && data.type !== "link") {
      throw new Error(`Unable to make sense of "type" field in front matter of "${filename}" : "${data.type}"`)
    }
    // auto slug based on filename
    data.slug = computeSlug(filename)
    // auto date based on directory hierarchy
    data.date = extractDate(filename)
    console.log(data.date)
    return data
  }).filter(data => {
    if (data.hasOwnProperty("visible")) {
      return data.visible
    } else {
      return true
    }
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
  return posts
}

export function getPost (dir, basenameSlug) {
  // find filename from dir/basenameSlug
  let completeSlug = dir ? dir + "/" + basenameSlug : basenameSlug
  let filename = glob.sync(CONTENT + "**/*.md").find(filename => computeSlug(filename) === completeSlug)
  if (!filename) {
    throw new Error(`Unable to find a post with "${dir}" and "${basenameSlug}"`)
  }
  // raw content
  let raw = fs.readFileSync(filename, "utf-8")

  // marked renderer options
  const renderer = new marked.Renderer()

  // use hljs for ... highlighting !
  renderer.code = (source, lang) => {
    const { value: highlighted } = hljs.highlight(lang, source)
    return `<pre><code>${highlighted}</code></pre>`
  }

  // get front matter and content
  const { data, content } = grayMatter(raw)

  // auto date based on directory hierarchy
  data.date = extractDate(filename)

  // markdown -> html
  const html = marked(content, { renderer })

  return {html: html, data: data}
}
