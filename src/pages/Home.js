import React, { useState } from "react";
import useNewSearch from "../services/useNewSearch";

export default function Home() {
  const [query, setQuery] = useState("Toto");
  const [pageNumber, setPageNumber] = useState(1);

  useNewSearch(query, pageNumber);

  /**
   * @description Change the querry according to the new one entered by the user
   * @param {Object} event DOM event
   */
  const handleSearch = (event) => {
    setQuery(event.target.value);
    // Reset the page shown by default when a new search is entered
    setPageNumber(1);
  };

  return (
    <div className="m-8">
      <h1 className="text-4xl mb-4">Ma liste de news</h1>
      <input type="text" onChange={handleSearch} className="border-2"></input>
    </div>
  );
}
