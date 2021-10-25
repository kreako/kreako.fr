import React, { useState, useEffect } from "react";
import LinkIcon from "./LinkIcon";
import DocumentIcon from "./DocumentIcon";

// Search a term with meilisearch rest api
// See ref here : https://docs.meilisearch.com/reference/api/search.html
async function meilisearch(term) {
  const request = new Request(
    "https://kreako.fr/meilisearch/indexes/ressource/search"
  );
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "X-Meili-API-Key",
    // public key
    "ba0f30cd9921fa5572c21659c28af7f7e7401233544245d34b396c8e61b87163"
  );
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ q: term, limit: 1000 }),
  };
  const res = await fetch(request, init);
  const jsonres = await res.json();
  return jsonres.hits;
}

// Hook to debounce a value
// params :
// value : value to debounce
// wait : in milliseconds
function useDebouncedValue(value, wait) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(id);
  }, [value, wait]);

  return debouncedValue;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const debouncedQuery = useDebouncedValue(query, 400);

  const onQueryChange = (event) => setQuery(event.target.value);

  // Get results back from meilisearch when debouncedQuery is stable enough
  useEffect(() => {
    (async () => {
      setResults(await meilisearch(debouncedQuery));
    })();
  }, [debouncedQuery]);

  return (
    <div>
      <h1>Filter for {query}</h1>
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        className="w-full"
      />
      <div>{JSON.stringify(results, null, 2)} </div>
    </div>
  );
}
