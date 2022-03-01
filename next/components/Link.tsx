import { IconLink } from "../icons/icon-link"
import { LinkType } from "../lib/api"
import Tags from "./tags"

export default function ContentLink({ link }: { link: LinkType }) {
  return (
    <div>
      <a
        href={link.url}
        className="flex flex-row items-center space-x-4 text-sky-600 hover:text-sky-800"
      >
        <div className="font-bold flex-grow-0">{link.url}</div>
        <IconLink />
        <div className="text-right flex-grow text-xs">{link.created_at}</div>
      </a>
      <div dangerouslySetInnerHTML={{ __html: link.description }} className="prose mt-2" />
      <Tags tags={link.tags} />
      <div className="my-8 w-full h-px bg-gradient-to-br from-sky-500 to-sky-600 " />
    </div>
  )
}
