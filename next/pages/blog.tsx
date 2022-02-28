import { ContentType, fetchBlogContent, LinkType, NoteType } from "../lib/api"
import { convertDescriptionInHtml } from "../lib/markdown"

function Link({ link }: { link: LinkType }) {
  return <div>Link: {link.slug}</div>
}

function Note({ note }: { note: NoteType }) {
  return <div>Note: {note.slug}</div>
}

export default function Blog({ contents }: { contents: ContentType[] }) {
  return (
    <div>
      {contents.map((c) => {
        if (c.kind === "link") {
          return <Link link={c.link} key={c.id} />
        } else {
          return <Note note={c.note} key={c.id} />
        }
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  let contents = await fetchBlogContent()
  contents = contents.slice(0, 5)
  await convertDescriptionInHtml(contents)
  return { props: { contents } }
}
