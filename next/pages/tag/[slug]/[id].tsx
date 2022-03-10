import Head from "next/head"
import LinkPreview from "../../../components/link-preview"
import NotePreview from "../../../components/note-preview"
import { fetchTag, fetchTags, TagType } from "../../../lib/api"

type TagProps = {
  tag: TagType
}

export default function Tag({ tag }: TagProps) {
  return (
    <>
      <Head>
        <title>Tag {tag.title} - kreako</title>
        <meta name="description" content="search page of kreako.fr" />
      </Head>
      <div className="px-2 mt-4 text-xs text-sky-600 font-bold uppercase tracking-wide">
        Tag {tag.title}
      </div>
      <div className="px-2 mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {tag.notes.map((n) => (
          <NotePreview note={n} key={`note-${n.id}`} id={n.id} />
        ))}
        {tag.links.map((l) => (
          <LinkPreview link={l} key={`link-${l.id}`} />
        ))}
      </div>
    </>
  )
}

type Params = {
  params: {
    slug: string
    id: string
  }
}

export async function getStaticProps({ params: { slug, id } }: Params) {
  const tag = await fetchTag(parseInt(id))
  return {
    props: {
      tag,
    },
  }
}

export async function getStaticPaths() {
  const tags = await fetchTags()
  const paths = tags.map((tag) => ({
    params: { slug: tag.slug, id: String(tag.id) },
  }))
  return {
    paths,
    fallback: false,
  }
}
