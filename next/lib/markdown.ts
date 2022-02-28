import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { ContentType } from "./api"

export const convertDescriptionInHtml = async (contents: ContentType[]) => {
  for (const content of contents) {
    if (content.kind === "link") {
      content.link.description = await markdownToHtml(content.link.description)
    } else {
      content.note.description = await markdownToHtml(content.note.description)
    }
  }
}

export const markdownToHtml = async (source: string) => {
  const r = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(source)
  return String(r)
}
