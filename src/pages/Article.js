import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Article() {
  const location = useLocation();
  const navigate = useNavigate();
  let article = useRef();

  // ensure the Article page is visited with an article
  useEffect(() => {
    if (location.state) {
      article.current = location.state;
    } else {
      navigate("/");
    }
  }, []);

  const toDate = () => {
    const milliseconds = Date.parse(article.current?.publishedAt);
    const newDate = new Date(milliseconds);
    return newDate.toLocaleDateString();
  };

  return (
    <article className="max-w-4xl mx-auto">
      <h2 className="mx-auto text-center font-bold text-2xl">
        {article.current?.title}
      </h2>
      <img
        src={article.current?.urlToImage}
        alt="Illustration de l'article"
        className="mx-auto my-8"
      />
      <p className="text-justify">
        Ici, le contenu complet de la news. Il est malheureusement en accès
        payant, alors...
        <br />
        {article.current?.content} <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        suscipit erat id lorem consectetur feugiat. Proin ultrices risus eu
        ligula sollicitudin cursus. Quisque id lacus porta, aliquet neque nec,
        cursus quam. Duis at lacus vel enim tincidunt posuere. Nunc iaculis,
        ante id hendrerit rhoncus, arcu libero porttitor eros, nec malesuada
        felis velit luctus nisi. Fusce venenatis nunc eros, vel elementum turpis
        ultrices in. Cras consectetur hendrerit convallis. Suspendisse vitae sem
        elit. Donec a eros et augue egestas consectetur vitae et erat. Orci
        varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Morbi in eros sit amet neque posuere porttitor. Mauris
        cursus urna id eros facilisis, in convallis lacus cursus. <br />
      </p>

      {
        // display author only if available
        article.current?.author ? (
          <p className="mt-2 self-end text-sm italic mb-0.5">
            {article.current?.author}
          </p>
        ) : (
          ""
        )
      }

      <p className="mt-2 self-end text-sm italic">
        published {toDate()} on {article.current?.source.name}
      </p>

      <div className="flex justify-around mt-4">
        <button
          className="text-xl border-2 shadow-md rounded-xl h-12 w-60 max-w-md bg-gray-400"
          onClick={() => navigate("/")}
        >
          Revenir aux news
        </button>
        <button
          className="text-xl border-2 shadow-md rounded-xl h-12 w-60 max-w-md bg-gray-400"
          onClick={() => window.open(article.current?.url, "_blank")}
        >
          Article original
        </button>
      </div>
    </article>
  );
}
