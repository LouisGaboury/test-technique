import React, { useState } from "react";
import useNewSearch from "../services/useNewSearch";

export default function Home() {
  const [query, setQuery] = useState("Toto");
  const [pageNumber, setPageNumber] = useState(1);

  useNewSearch(query, pageNumber);

  return (
    <div className="m-8">
      <h1 className="text-4xl mb-4">Ma liste de news</h1>
      <input type="text" className="border-2"></input>
    </div>
  );
}
