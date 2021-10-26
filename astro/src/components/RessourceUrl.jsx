import React from "react";
import LinkIcon from "../components/LinkIcon.jsx";
import DocumentIcon from "../components/DocumentIcon.jsx";

export default function RessourceUrl({ content }) {
  let display = null;
  let icon = null;
  if (content.isLink()) {
    display = content.data.url;
    icon = <LinkIcon />;
  } else {
    display = content.data.title;
    icon = <DocumentIcon />;
  }
  return (
    <div className="my-4">
      <a
        href={content.url}
        className="flex flex-row items-center space-x-4 text-purple-600 hover:text-purple-800"
      >
        <div className="font-bold flex-grow-0">{display}</div>
        {icon}
        <div className="text-right flex-grow text-xs">{content.dt_str}</div>
      </a>
    </div>
  );
}
