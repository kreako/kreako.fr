import slugify from "slugify"
import Tags from "../../../components/tags"
import { IconNote } from "../../../icons/icon-note"
import { fetchNote, fetchNotes, NoteType } from "../../../lib/api"

type NoteProps = {
  note: NoteType
}

export default function Note({ note }: NoteProps) {
  return (
    <div className="mt-4">
      <div className="flex flex-row items-center space-x-4 text-sky-600">
        <div className="font-bold flex-grow-0">{note.title}</div>
        <IconNote />
        <div className="text-right flex-grow text-xs">{note.created_at}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: note.description }} className="prose" />
      <Tags tags={note.tags} />
    </div>
  )
}

type Params = {
  params: {
    slug: string
    id: string
  }
}

export async function getStaticProps({ params: { slug, id } }: Params) {
  const note = await fetchNote(parseInt(id))
  return {
    props: {
      note,
    },
  }
}

export async function getStaticPaths() {
  const notes = await fetchNotes()
  const paths = notes.map((note) => ({
    params: { slug: slugify(note.title), id: String(note.id) },
  }))
  return {
    paths,
    fallback: false,
  }
}
