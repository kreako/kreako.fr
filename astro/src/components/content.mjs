import { renderMarkdown } from "@astrojs/markdown-support";
import slugify from "slugify";

const FASTAPI_URL = "http://127.0.0.1:1337";

export class Contents {
  constructor(links, notes) {
    this.links = links.map((l) => new Link(l));
    this.notes = notes.map((n) => new Note(n));
    this.datas = Contents.mergeNotesLinks(this.links, this.notes);
  }

  static async fetch() {
    const data = await Promise.all([Links.fetch(), Notes.fetch()]);
    return new Contents(data[0], data[1]);
  }

  static mergeNotesLinks(links, notes) {
    const contents = links.concat(notes);
    contents.sort((x, y) => y.dt_created_at - x.dt_created_at);
    return contents;
  }

  async addMarkdownDescription() {
    for (const content of this.datas) {
      await content.addMarkdownDescription();
    }
  }

  firsts(nb) {
    this.datas = this.datas.slice(0, nb);
  }
}

export class Links {
  static async fetch() {
    const response = await fetch(`${FASTAPI_URL}/links?_sort=created_at:DESC`);
    return await response.json();
  }
}

export class Notes {
  static async fetch() {
    const response = await fetch(`${FASTAPI_URL}/notes?_sort=created_at:DESC`);
    return await response.json();
  }
}

export class Tags {
  constructor(tags) {
    this.datas = tags.map((tag) => new Tag(tag));
  }

  static async fetch() {
    const response = await fetch(`${FASTAPI_URL}/tags?_sort=title:ASC`);
    return new Tags(await response.json());
  }
}

export class Content {
  constructor(content) {
    this.data = content;
  }

  async addMarkdownDescription() {
    const { content } = await renderMarkdown(this.data.description);
    this.data.description_md = { __html: content };
  }

  get dt_str() {
    const dt = this.dt_created_at;
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
  }

  get dt_created_at() {
    return new Date(this.data.created_at);
  }

  isLink() {
    return this instanceof Link;
  }

  isNote() {
    return this instanceof Note;
  }

  get tags() {
    return new Tags(this.data.tags);
  }
}

export class Link extends Content {
  constructor(link) {
    super(link);
  }

  get slug() {
    const url = this.data.url.replace("https://", "").replace("www", "");
    return slugify(url);
  }
  get url_data() {
    return `l-${this.data.id}-${this.dt_str}-${this.slug}`;
  }
  get url() {
    return `/ressource/${this.url_data}`;
  }
}

export class Note extends Content {
  constructor(note) {
    super(note);
  }

  get slug() {
    return slugify(this.data.title);
  }
  get url_data() {
    return `n-${this.data.id}-${this.dt_str}-${this.slug}`;
  }
  get url() {
    return `/ressource/${this.url_data}`;
  }
}

export class Tag extends Content {
  constructor(tag) {
    super(tag);
    if ("links" in tag && "notes" in tag) {
      this.contents = new Contents(tag.links, tag.notes);
    }
  }

  get slug() {
    return slugify(this.data.title);
  }
}
