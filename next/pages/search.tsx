import { useThrottleCallback } from "@react-hook/throttle"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import slugify from "slugify"
import { IconLink } from "../icons/icon-link"
import { IconNote } from "../icons/icon-note"
import { TagType, urlSlugify } from "../lib/api"
import { markdownToHtml } from "../lib/markdown"

type ContentType = LinkType | NoteType
type LinkType = {
  id: string
  url: string
  slug: string
  description: string
  tags: TagType[]
  publish_on_social: boolean
  created_at: Date
  private: boolean
  kind: "link"
}
type NoteType = {
  id: string
  title: string
  slug: string
  description: string
  tags: TagType[]
  publish_on_social: boolean
  created_at: Date
  private: boolean
  kind: "note"
}

// Search a term with meilisearch rest api
// See ref here : https://docs.meilisearch.com/reference/api/search.html
async function meilisearch(term: string): Promise<ContentType[]> {
  const meiliUrl =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:7700/indexes/ressource/search"
      : "https://kreako.fr/meilisearch/indexes/ressource/search"
  const request = new Request(meiliUrl)
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append(
    "X-Meili-API-Key",
    // public key
    "ba0f30cd9921fa5572c21659c28af7f7e7401233544245d34b396c8e61b87163"
  )
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ q: term, limit: 1000 }),
  }
  const res = await fetch(request, init)
  const jsonres = await res.json()
  // Get contents and filter private out
  const contents: ContentType[] = jsonres.hits.filter((c: ContentType) => c.private !== true)
  for (const content of contents) {
    // markdown
    content.description = await markdownToHtml(content.description)
    // slug
    if (content.kind === "link") {
      content.slug = urlSlugify(content.url)
    } else {
      content.slug = slugify(content.title)
    }
  }
  return contents
}

const useUpdateSearch = (): [ContentType[] | null, (query: string) => void] => {
  // Results of the request
  const [results, setResults] = useState<ContentType[] | null>(null)
  // Store the last query that I launched so I don't fetch it twice if this is the same
  const [lastQuery, setLastQuery] = useState<string | null>(null)

  const updateSearch = useThrottleCallback(
    (query: string) => {
      if (query !== lastQuery) {
        // This is a new query
        ;(async () => {
          setResults(await meilisearch(query))
        })()
        setLastQuery(query)
      }
    },
    2.5, // not more than every 400ms
    true // On leading edge so as soon as possible
  )

  return [results, updateSearch]
}

export default function Search() {
  const [results, updateSearch] = useUpdateSearch()
  // Catch first render so if there is a query string "?q=", move it in query state
  const [first, setFirst] = useState(true)
  // Filter results by query
  const [query, setQuery] = useState("")
  const router = useRouter()

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Push query in state and in url
    const q = event.target.value
    setQuery(q)
    router.push({
      pathname: "/search",
      query: { q },
    })
  }

  useEffect(() => {
    if (first) {
      // First time effect
      // Update query from search params on init
      const params = new URLSearchParams(window.location.search)
      const q = params.get("q")
      // Do not use router.query because it is not ready on page reload
      // const q = router.query.q
      if (q && typeof q === "string" && q !== "") {
        setQuery(q)
        updateSearch(q)
      } else {
        updateSearch("")
      }
      setFirst(false)
    } else {
      // Search for results after query has been debounced
      updateSearch(query)
    }
  }, [query, first, updateSearch])

  return (
    <section className="px-2 mt-8">
      {query === "" ? <h1>No filter</h1> : <h1>Filter for {query}</h1>}
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
      />
      {results && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {results.map((c) => {
            if (c.kind === "link") {
              return <LinkPreview link={c} key={c.id} />
            } else {
              return <NotePreview note={c} key={c.id} />
            }
          })}
        </div>
      )}
    </section>
  )
}

function LinkPreview({ link }: { link: LinkType }) {
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

function NotePreview({ note }: { note: NoteType }) {
  const id = note.id.slice(5)
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
