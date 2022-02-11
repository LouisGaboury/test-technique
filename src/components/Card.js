import React from "react";
import { Link } from "react-router-dom";

function Card({ article }) {
  const toDate = () => {
    const milliseconds = Date.parse(article.publishedAt);
    const newDate = new Date(milliseconds);
    return newDate.toLocaleDateString();
  };

  return (
    <Link to="/article" state={{ article }}>
      <div className="max-w-sm border-2 h-full shadow">
        <img src={article.urlToImage} alt="Illustration de l'article" />
        <div className="m-2 flex flex-col justify-between">
          <h4 className="font-bold mb-2">{article.title}</h4>
          <p>{article.description}</p>
          {
            // display source only if available
            article.source.name && (
              <span className="mt-2 self-end text-sm italic">
                published {toDate()} on {article.source.name}
              </span>
            )
          }
        </div>
      </div>
    </Link>
  );
}

export default Card;
