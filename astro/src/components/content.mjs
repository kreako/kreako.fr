import { renderMarkdown } from "@astrojs/markdown-support";
const FASTAPI_URL = "http://127.0.0.1:1337";

export const fetchLinks = async () => {
  const response = await fetch(`${FASTAPI_URL}/links?_sort=created_at:DESC`);
  const links = await response.json();
  return links;
};

export const fetchNotes = async () => {
  const response = await fetch(`${FASTAPI_URL}/notes?_sort=created_at:DESC`);
  const links = await response.json();
  return links;
};

export const fetchContent = async () => {
  const data = await Promise.all([fetchLinks(), fetchNotes()]);
  const links = data[0];
  const notes = data[1];

  const contents = links.concat(notes);
  contents.sort((x, y) => new Date(y.created_at) - new Date(x.created_at));
  return contents;
};

export const addMarkdown = async (ressources) => {
  for (const ressource of ressources) {
    const { content } = await renderMarkdown(ressource.description);
    ressource.description_md = { __html: content };
  }
  return ressources;
};
