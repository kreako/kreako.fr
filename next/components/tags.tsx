import Link from "next/link"
import { TagType } from "../lib/api"

export default function Tags({ tags }: { tags: TagType[] }) {
  return (
    <div className="flex flex-row space-x-2 justify-end text-sm text-sky-600">
      {tags.map((tag) => (
        <Link key={tag.id} href={`/tag-${tag.slug}`}>
          <a>#{tag.title}</a>
        </Link>
      ))}
    </div>
  )
}
