import React, { useState, useRef, useCallback } from "react";
import useNewSearch from "../services/useNewSearch";
import Card from "../components/Card";

export default function Home() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState({});
  const { news, loading, hasMore, error } = useNewSearch(
    query,
    pageNumber,
    options
  );

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

  const addOption = (event) => {
    let newOptions = options;
    switch (event.target.id) {
      case "lang":
        newOptions.language = null;
        if (event.target.value) newOptions.language = event.target.value;
        break;
      case "title":
        newOptions.title = null;
        if (event.target.checked) newOptions.title = true;
        break;
      case "content":
        newOptions.content = null;
        if (event.target.checked) newOptions.content = true;
        break;
      case "description":
        newOptions.description = null;
        if (event.target.checked) newOptions.description = true;
        break;
      case "source":
        newOptions.source = null;
        if (event.target.value) newOptions.source = event.target.value;
        break;
      default:
    }
    setOptions(newOptions);
    console.log(options);
  };

  return (
    <div className="m-8">
      <div className="border-2 rounded-xl mb-8 p-4">
        <h1 className="text-4xl">Ma liste de news</h1>
        <input
          type="text"
          onChange={handleSearch}
          className="border-2 mt-4 mb-8"
        ></input>
        <p>Filtres supplémentaires :</p>
        <div>
          <select onChange={addOption} id="lang">
            <option value="">Langue</option>
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
            <option value="fr">Français</option>
            <option value="it">Italien</option>
          </select>
          <label className="ml-4">Titre</label>
          <input
            className="mx-2"
            type="checkbox"
            id="title"
            name="title"
            onChange={addOption}
          ></input>
          <label className="ml-4">Description</label>
          <input
            className="mx-2"
            type="checkbox"
            id="description"
            name="description"
            onChange={addOption}
          ></input>
          <label className="ml-4">Contenu</label>
          <input
            className="mx-2"
            type="checkbox"
            id="content"
            name="content"
            onChange={addOption}
          ></input>
          <select className="ml-2" id="source" onChange={addOption}>
            <option value="">Source</option>
            <option value="gb">Angleterre</option>
            <option value="br">Brésil</option>
            <option value="fr">France</option>
            <option value="ch">Suisse</option>
            <option value="us">USA</option>
          </select>
        </div>
      </div>
      <section className="flex flex-wrap justify-around max-w-full px-3">
        {news.map((article, index) => {
          // If last element in array, passing it in useCallback
          if (news.length === index + 1) {
            return (
              <article key={index} ref={lastElementRef} className="mb-6">
                <Card article={article} />
              </article>
            );
          } else {
            return (
              <article key={index} className="mb-6">
                <Card article={article} />
              </article>
            );
          }
        })}
      </section>

      <div>{loading && "Loading..."}</div>
      <div>{error && "Erreur..."}</div>
    </div>
  );
}
