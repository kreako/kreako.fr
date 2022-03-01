import ContentLink from "../components/Link"
import ContentNote from "../components/Note"
import { ContentType, fetchBlogContent, LinkType, NoteType } from "../lib/api"
import { convertDescriptionInHtml } from "../lib/markdown"

export default function Blog({ contents }: { contents: ContentType[] }) {
  return (
    <div className="px-2 mt-8">
      {contents.map((c) => {
        if (c.kind === "link") {
          return <ContentLink link={c.link} key={c.id} />
        } else {
          return <ContentNote note={c.note} key={c.id} />
        }
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  let allContents = await fetchBlogContent()

  const nextContent = allContents[5]

  const homeContents = allContents.slice(0, 6)
  await convertDescriptionInHtml(homeContents)
  return { props: { contents: homeContents } }
}
