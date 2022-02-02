import { useEffect } from "react";
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const url = "https://newsapi.org/v2/everything";

export default function useNewSearch(query, pageNumber) {
  useEffect(() => {
    axios
      .get(url, {
        params: {
          q: query,
          apiKey: key,
          page: pageNumber,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, pageNumber]);

  return null;
}
