import slugify from "slugify"
import { markdownToHtml } from "./markdown"

type TagType = {
  id: number
  created_at: string
  title: string
  links: LinkType[]
  notes: NoteType[]
}

type MarkdownHtml = {
  __html: string
}

type LinkType = {
  id: number
  created_at: string
  url: string
  description: string
  description_md?: MarkdownHtml
  tags: TagType[]
  publish_on_social: boolean
  private: boolean
}

type NoteType = {
  id: number
  created_at: string
  title: string
  description: string
  description_md?: MarkdownHtml
  tags: TagType[]
  publish_on_social: boolean
  private: boolean
}

type ContentType = LinkType | NoteType

const FASTAPI_URL = "http://127.0.0.1:1337"

export class Contents {
  links: Link[]
  notes: Note[]
  datas: Content[]

  constructor(links: LinkType[], notes: NoteType[]) {
    this.links = links.map((l) => new Link(l))
    this.notes = notes.map((n) => new Note(n))
    this.datas = Contents.mergeNotesLinks(this.links, this.notes)
  }

  static async fetch() {
    const data = await Promise.all([Links.fetch(), Notes.fetch()])
    return new Contents(data[0], data[1])
  }

  static mergeNotesLinks(links: Link[], notes: Note[]) {
    const contents: Content[] = links.concat(notes)
    contents.sort((x, y) => y.dt_created_at.valueOf() - x.dt_created_at.valueOf())
    return contents
  }

  async addMarkdownDescription() {
    for (const content of this.datas) {
      await content.addMarkdownDescription()
    }
  }

  firsts(nb: number) {
    this.datas = this.datas.slice(0, nb)
  }

  filterPrivate() {
    this.datas = this.datas.filter((x) => x.data.private != true)
  }
}

export class Links {
  static async fetch() {
    const response = await fetch(`${FASTAPI_URL}/links?_sort=created_at:DESC`)
    return await response.json()
  }
}

export class Notes {
  static async fetch() {
    const response = await fetch(`${FASTAPI_URL}/notes?_sort=created_at:DESC`)
    return await response.json()
  }
}

export class Tags {
  datas: Tag[]
  constructor(tags: TagType[]) {
    this.datas = tags.map((tag) => new Tag(tag))
  }

  static async fetch() {
    const response = await fetch(`${FASTAPI_URL}/tags?_sort=title:ASC`)
    return new Tags(await response.json())
  }
}

export class Content {
  data: ContentType
  constructor(content: LinkType | NoteType) {
    this.data = content
  }

  async addMarkdownDescription() {
    const content = await markdownToHtml(this.data.description)
    this.data.description_md = {
      __html: content,
    }
  }

  get dt_str() {
    const dt = this.dt_created_at
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
  }

  get dt_created_at() {
    return new Date(this.data.created_at)
  }

  isLink() {
    return this instanceof Link
  }

  isNote() {
    return this instanceof Note
  }

  get tags() {
    return new Tags(this.data.tags)
  }
}

export class Link extends Content {
  constructor(link: LinkType) {
    super(link)
  }

  get slug(): string {
    if (!(this.data instanceof Link)) {
      throw new Error("Link.slug called on a non-link data")
    }
    const url = this.data.url.replace("https://", "").replace("www", "")
    return slugify(url)
  }
  get url_data() {
    return `l-${this.data.id}-${this.dt_str}-${this.slug}`
  }
  get url() {
    return `/ressource/${this.url_data}`
  }
  get title(): string {
    if (!(this.data instanceof Link)) {
      throw new Error("Link.title called on a non-link data")
    }
    return this.data.url
  }
}

export class Note extends Content {
  constructor(note: NoteType) {
    super(note)
  }

  get slug(): string {
    if (!(this.data instanceof Note)) {
      throw new Error("Note.slug called on a non-note data")
    }
    return slugify(this.data.title)
  }
  get url_data() {
    return `n-${this.data.id}-${this.dt_str}-${this.slug}`
  }
  get url() {
    return `/ressource/${this.url_data}`
  }
  get title(): string {
    if (!(this.data instanceof Note)) {
      throw new Error("Note.title called on a non-note data")
    }
    return this.data.title
  }
}

export class Tag {
  data: TagType
  contents: Contents | null
  constructor(tag: TagType) {
    this.data = tag
    this.contents = null
    if ("links" in tag && "notes" in tag) {
      this.contents = new Contents(tag.links, tag.notes)
    }
  }

  get slug() {
    return slugify(this.data.title)
  }
}
