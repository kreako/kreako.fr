import React from "react";

function LinkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function DocumentIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export function Tags({ content }) {
  const tagsList = content.tags.map((tag) => <div>#{tag.title}</div>);
  return (
    <div class="flex flex-row space-x-2 justify-end text-sm text-purple-600">
      {tagsList}
    </div>
  );
}

export default function Ressource({ content }) {
  const dt = new Date(content.created_at);
  const dtStr = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
  if ("url" in content) {
    return (
      <div>
        <a
          href={content.url}
          class="flex flex-row items-center space-x-4 text-purple-600 hover:text-purple-800"
        >
          <div class="font-bold flex-grow-0">{content.url}</div>
          <LinkIcon />
          <div class="text-right flex-grow text-xs">{dtStr}</div>
        </a>
        <div
          dangerouslySetInnerHTML={content.description_md}
          class="prose mt-2"
        />
        <Tags content={content} />
        <div class="my-8 w-full h-px bg-gradient-to-br from-purple-500 to-purple-600 " />
      </div>
    );
  } else {
    return (
      <div>
        <div class="flex flex-row items-center space-x-4 text-purple-600">
          <div class="font-bold flex-grow-0">{content.title}</div>
          <DocumentIcon />
          <div class="text-right flex-grow text-xs">{dtStr}</div>
        </div>
        <div dangerouslySetInnerHTML={content.description_md} class="prose" />
        <Tags content={content} />
        <div class="my-8 w-full h-px bg-gradient-to-br from-purple-500 to-purple-600 " />
      </div>
    );
  }
}
