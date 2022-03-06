import Head from "next/head"
import Link from "next/link"
import ContentLink from "../../../components/Link"
import ContentNote from "../../../components/Note"
import { ContentType, fetchBlogContent } from "../../../lib/api"
type Month = {
  year: string
  month: string
}
type PaginationButtonProps = {
  label: string
  month: Month | null
}

function PaginationButton({ label, month }: PaginationButtonProps) {
  if (month) {
    return (
      <Link href={`/archive/${month.year}/${month.month}`}>
        <a className="bg-sky-600 text-white font-bold px-4 py-2 hover:bg-sky-400">{label}</a>
      </Link>
    )
  } else {
    return <div className="bg-gray-100 text-gray-400 font-bold px-4 py-2">{label}</div>
  }
}

type ArchiveProps = {
  contents: ContentType[]
  previous: Month | null
  current: Month
  next: Month | null
}

export default function Archive({ contents, current, previous, next }: ArchiveProps) {
  return (
    <>
      <Head>
        <title>
          Archive {current.year}/{current.month} - kreako
        </title>
        <meta name="description" content="blog page of kreako.fr" />
      </Head>
      <div>
        <div className="mt-2 text-lg">
          Archive of {current.year}/{current.month}
        </div>
        <div className="mt-8">
          {contents.map((c) => {
            if (c.kind === "link") {
              return <ContentLink link={c.link} key={c.id} />
            } else {
              return <ContentNote note={c.note} key={c.id} />
            }
          })}
        </div>
        <div className="flex flex-row space-x-2">
          <PaginationButton label="previous" month={previous} />
          <PaginationButton label="next" month={next} />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const contents = await fetchBlogContent()
  const paths = []
  let previousYear = null
  let previousMonth = null
  for (const content of contents) {
    const year = content.created_at.getFullYear()
    const month = content.created_at.getMonth() + 1
    if (previousYear !== year || previousMonth !== month) {
      paths.push({ params: { year: String(year), month: String(month).padStart(2, "0") } })
      previousYear = year
      previousMonth = month
    }
  }
  return {
    paths,
    fallback: false,
  }
}

type Params = {
  params: {
    year: string
    month: string
  }
}

export async function getStaticProps({ params: { year, month } }: Params) {
  const iyear = parseInt(year)
  const imonth = parseInt(month)
  const allContents = await fetchBlogContent()
  let previous: Month | null = null
  let next: Month | null = null
  const contents = []
  for (const content of allContents) {
    const contentYear = content.created_at.getFullYear()
    const contentMonth = content.created_at.getMonth() + 1
    if (contentYear > iyear || (contentYear === iyear && contentMonth > imonth)) {
      // After the content I'm looking for
      next = { year: String(contentYear), month: String(contentMonth).padStart(2, "0") }
    } else if (contentYear === iyear && contentMonth === imonth) {
      // The content I'm looking for
      contents.push(content)
    } else if (previous == null) {
      // Just before the content I'm looking for
      previous = { year: String(contentYear), month: String(contentMonth).padStart(2, "0") }
      break
    }
  }
  return {
    props: {
      contents,
      previous,
      current: { year, month },
      next,
    },
  }
}
