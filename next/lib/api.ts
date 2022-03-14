import slugify from "slugify"
import { markdownToHtml } from "./markdown"

export type TagType = {
  id: number
  created_at: string
  title: string
  slug: string
  links: LinkType[]
  notes: NoteType[]
}

export type LinkType = {
  id: number
  created_at: string
  url: string
  slug: string
  description: string
  tags: TagType[]
  publish_on_social: boolean
  private: boolean
}

export type NoteType = {
  id: number
  created_at: string
  title: string
  slug: string
  description: string
  tags: TagType[]
  publish_on_social: boolean
  private: boolean
}

export type ContentType =
  | { kind: "link"; created_at: Date; id: string; link: LinkType }
  | { kind: "note"; created_at: Date; id: string; note: NoteType }

const BASE_URL = "http://127.0.0.1:1337"

const addSlugToTagsContents = (contents: LinkType[] | NoteType[]) => {
  for (const content of contents) {
    addSlugToTagsContent(content)
  }
}

const addSlugToTagsContent = (content: LinkType | NoteType) => {
  for (const tag of content.tags) {
    tag.slug = slugify(tag.title)
  }
}

export const urlSlugify = (url: string): string => {
  return slugify(url.replace("https://", "").replace("www.", ""))
}

export const fetchLinks = async (): Promise<LinkType[]> => {
  const response = await fetch(`${BASE_URL}/links?_sort=created_at:DESC&_limit=-1`)
  let links: LinkType[] = await response.json()
  // Filter out private
  links = links.filter((l) => l.private !== true)
  // slug
  links.forEach((l) => {
    l.slug = urlSlugify(l.url)
  })
  // slug to tags
  addSlugToTagsContents(links)
  // markdown description
  for (const link of links) {
    link.description = await markdownToHtml(link.description)
  }
  return links
}

export const fetchNotes = async (): Promise<NoteType[]> => {
  const response = await fetch(`${BASE_URL}/notes?_sort=created_at:DESC&_limit=-1`)
  let notes: NoteType[] = await response.json()
  // Filter out private
  notes = notes.filter((n) => n.private !== true)
  // slug
  notes.forEach((n) => {
    n.slug = slugify(n.title)
  })
  // slug to notes
  addSlugToTagsContents(notes)
  // markdown description
  for (const note of notes) {
    note.description = await markdownToHtml(note.description)
  }
  return notes
}

export const fetchNote = async (id: number): Promise<NoteType | null> => {
  const response = await fetch(`${BASE_URL}/notes/${id}`)
  let note: NoteType = await response.json()
  // Filter out private
  if (note.private) {
    return null
  }
  // slug
  note.slug = slugify(note.title)
  // slug to notes
  addSlugToTagsContent(note)
  // markdown description
  note.description = await markdownToHtml(note.description)
  return note
}

export const fetchTags = async (): Promise<TagType[]> => {
  const response = await fetch(`${BASE_URL}/tags?_sort=title:ASC`)
  const tags: TagType[] = await response.json()
  for (const tag of tags) {
    tag.slug = slugify(tag.title)
  }
  return tags
}

export const fetchTag = async (id: number): Promise<TagType> => {
  const response = await fetch(`${BASE_URL}/tags/${id}`)
  let tag: TagType = await response.json()
  // tag slug
  tag.slug = slugify(tag.title)
  // filter private
  tag.links = tag.links.filter((l) => l.private !== true)
  tag.notes = tag.notes.filter((n) => n.private !== true)
  // markdown and slug
  for (const link of tag.links) {
    link.description = await markdownToHtml(link.description)
  }
  for (const note of tag.notes) {
    note.description = await markdownToHtml(note.description)
    note.slug = slugify(note.title)
  }
  return tag
}

export const fetchBlogContent = async (): Promise<ContentType[]> => {
  let [links, notes] = await Promise.all([fetchLinks(), fetchNotes()])
  // Merge everything in content array
  const onlyLink: ContentType[] = links.map((l) => ({
    kind: "link",
    created_at: new Date(l.created_at),
    id: `link-${l.id}`,
    link: l,
  }))
  let content = onlyLink.concat(
    notes.map((n) => ({
      kind: "note",
      created_at: new Date(n.created_at),
      id: `note-${n.id}`,
      note: n,
    }))
  )
  // Sort content - more recent first
  content.sort((x, y) => y.created_at.valueOf() - x.created_at.valueOf())
  return content
}
