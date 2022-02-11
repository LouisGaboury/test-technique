import React, { useState, useRef, useCallback } from "react";
import useNewSearch from "../services/useNewSearch";

export default function Home() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { news, loading, hasMore, error } = useNewSearch(query, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      // if observer already set => clear it for new one
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

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
      {news.map((article, index) => {
        // If last element in array, passing it in useCallback
        if (news.length === index + 1) {
          return (
            <h4 key={index} ref={lastElementRef}>
              {article.title}
            </h4>
          );
        } else {
          return <h4 key={index}>{article.title}</h4>;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Erreur..."}</div>
    </div>
  );
}
