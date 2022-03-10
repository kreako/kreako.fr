import { IconLink } from "../icons/icon-link"
import { SearchLinkType } from "../pages/search"

export type PreviewLinkType = {
  url: string
  description: string
}

type LinkPreviewProps = {
  link: PreviewLinkType
}

export default function LinkPreview({ link }: LinkPreviewProps) {
  return (
    <a href={link.url}>
      <div className="h-40 p-2 overflow-hidden shadow-md">
        <div className="flex space-x-2 items-center text-sky-600  hover:text-sky-800 ">
          <div className="font-bold">{link.url}</div>
          <IconLink />
        </div>
        <div dangerouslySetInnerHTML={{ __html: link.description }} className="prose mt-2" />
      </div>
    </a>
  )
}
