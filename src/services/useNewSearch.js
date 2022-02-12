import { useEffect, useState } from "react";
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const url = "https://newsapi.org/v2/everything";

export default function useNewSearch(query, pageNumber, options) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hasMore, setHasMore] = useState(false);

  // if query change : reset the previus value
  useEffect(() => {
    setNews([]);
  }, [query, options]);

  useEffect(() => {
    const controller = new AbortController();
    // delay for don't make useless call to API - save some key uses
    const delay = setTimeout(() => {
      if (query) {
        setError(false);
        setLoading(true);
        axios
          .get(url, {
            params: {
              q: query,
              apiKey: key,
              page: pageNumber,
              language: options.language,
              sources: options.source,
              // used for filter unused param in searchIn
              searchIn: [options.title, options.description, options.content]
                .filter(Boolean)
                .join(","),
            },
            signal: controller.signal,
          })
          .then((res) => {
            setHasMore(res.data.totalResults > 0);
            setNews((prevNews) => {
              // using set for ensuring there are no duplicate
              // kinda useless though since Set scan objects reference instead of pure equality
              return [...new Set([].concat(prevNews, res.data.articles))];
            });
            setLoading(false);
          })
          .catch((err) => {
            if (axios.isCancel(err)) return;
            setError(err);
          });
      }
    }, 400);

    // clean-up code when unmount
    return () => {
      // cancel previous request
      controller.abort();
      clearTimeout(delay);
    };
  }, [query, options, pageNumber]);

  return { loading, error, news, hasMore };
}
