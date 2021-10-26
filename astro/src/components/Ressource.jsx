import React from "react";
import LinkIcon from "./LinkIcon";
import DocumentIcon from "./DocumentIcon";

export function Tags({ tags }) {
  const tagsList = tags.datas.map((tag) => (
    <a key={tag.data.id} href={`/tag-${tag.slug}`}>
      #{tag.data.title}
    </a>
  ));
  return (
    <div className="flex flex-row space-x-2 justify-end text-sm text-purple-600">
      {tagsList}
    </div>
  );
}

export default function Ressource({ content }) {
  const dt = content.dt_str;
  if (content.isLink()) {
    return (
      <div>
        <a
          href={content.data.url}
          className="flex flex-row items-center space-x-4 text-purple-600 hover:text-purple-800"
        >
          <div className="font-bold flex-grow-0">{content.data.url}</div>
          <LinkIcon />
          <div className="text-right flex-grow text-xs">{dt}</div>
        </a>
        <div
          dangerouslySetInnerHTML={content.data.description_md}
          className="prose mt-2"
        />
        <Tags tags={content.tags} />
        <div className="my-8 w-full h-px bg-gradient-to-br from-purple-500 to-purple-600 " />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-row items-center space-x-4 text-purple-600">
          <div className="font-bold flex-grow-0">{content.data.title}</div>
          <DocumentIcon />
          <div className="text-right flex-grow text-xs">{dt}</div>
        </div>
        <div
          dangerouslySetInnerHTML={content.data.description_md}
          className="prose"
        />
        <Tags tags={content.tags} />
        <div className="my-8 w-full h-px bg-gradient-to-br from-purple-500 to-purple-600 " />
      </div>
    );
  }
}
