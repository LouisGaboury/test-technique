import { useEffect } from "react";
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const url = "https://newsapi.org/v2/everything";

export default function useNewSearch(query, pageNumber) {
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(url, {
        params: {
          q: query,
          apiKey: key,
          page: pageNumber,
        },
        signal: controller.signal,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // clean-up code when unmount
    return () => {
      // cancel previous request
      controller.abort();
    };
  }, [query, pageNumber]);

  return null;
}
