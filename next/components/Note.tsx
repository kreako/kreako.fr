import { IconNote } from "../icons/icon-note"
import { NoteType } from "../lib/api"
import Tags from "./tags"

export default function ContentNote({ note }: { note: NoteType }) {
  return (
    <div>
      <div className="flex flex-row items-center space-x-4 text-sky-600">
        <div className="font-bold flex-grow-0">{note.title}</div>
        <IconNote />
        <div className="text-right flex-grow text-xs">{note.created_at}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: note.description }} className="prose" />
      <Tags tags={note.tags} />
      <div className="my-8 w-full h-px bg-gradient-to-br from-sky-500 to-sky-600 " />
    </div>
  )
}
