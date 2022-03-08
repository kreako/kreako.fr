import Image from "next/image"
import { ReactNode } from "react"
import IconGithub from "../icons/icon-github"

type ProjectCardProps = {
  img: string
  name: string
  url: string
  github: string
  children: ReactNode
}

export default function ProjectCard({ img, name, url, github, children }: ProjectCardProps) {
  return (
    <div className="flex flex-col items-center mt-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-md p-2 w-[22.5rem]">
      <div className="flex flex-row space-x-4 items-center mt-4">
        <a href={url} className="font-bold text-white uppercase tracking-wide text-sm">
          {name}
        </a>
        <a href={github}>
          <IconGithub />
        </a>
      </div>
      <a href={url} className="grid items-center justify-center rounded-md relative w-40 h-20 mt-4">
        <Image
          src={img}
          alt={`Screenshot of ${name}`}
          width={320}
          layout="fill"
          objectFit="contain"
        />
      </a>

      <div className="mt-8 text-white">{children}</div>
    </div>
  )
}
