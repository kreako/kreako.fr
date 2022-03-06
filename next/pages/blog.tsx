import Head from "next/head"
import Link from "next/link"
import ContentLink from "../components/Link"
import ContentNote from "../components/Note"
import { ContentType, fetchBlogContent, LinkType, NoteType } from "../lib/api"
import { convertDescriptionInHtml } from "../lib/markdown"

type BlogProps = {
  contents: ContentType[]
  archiveLink: string
}

export default function Blog({ contents, archiveLink }: BlogProps) {
  return (
    <>
      <Head>
        <title>blog - kreako</title>
        <meta name="description" content="blog page of kreako.fr" />
      </Head>
      <div className="px-2 mt-8">
        {contents.map((c) => {
          if (c.kind === "link") {
            return <ContentLink link={c.link} key={c.id} />
          } else {
            return <ContentNote note={c.note} key={c.id} />
          }
        })}
      </div>
      <div>
        <Link href={archiveLink}>
          <a className="text-sky-600">Archives</a>
        </Link>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  let allContents = await fetchBlogContent()

  const nextContent = allContents[5]

  const homeContents = allContents.slice(0, 6)
  await convertDescriptionInHtml(homeContents)
  const dt = homeContents[0].created_at
  const year = String(dt.getFullYear())
  const month = String(dt.getMonth() + 1).padStart(2, "0")
  const archiveLink = `/archive/${year}/${month}`
  return { props: { contents: homeContents, archiveLink } }
}
