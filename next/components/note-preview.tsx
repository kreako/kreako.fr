import Link from "next/link"
import { IconNote } from "../icons/icon-note"
import { SearchNoteType } from "../pages/search"

export type PreviewNoteType = {
  title: string
  slug: string
  description: string
}

type NotePreviewProps = {
  id: number
  note: PreviewNoteType
}

export default function NotePreview({ id, note }: NotePreviewProps) {
  return (
    <Link href={`/note/${note.slug}/${id}`}>
      <a>
        <div className="h-40 p-2 overflow-hidden shadow-md">
          <div className="flex space-x-2 items-center text-sky-600  hover:text-sky-800 ">
            <div className="font-bold">{note.title}</div>
            <IconNote />
          </div>
          <div dangerouslySetInnerHTML={{ __html: note.description }} className="prose mt-2" />
        </div>
      </a>
    </Link>
  )
}
