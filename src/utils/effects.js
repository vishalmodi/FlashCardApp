import { useEffect } from "react";
import { readDeck } from "./api";

const useReadDeckEffect = (deckId, callback, dependencies) => {
  useEffect(() => {
    const abortController = new AbortController();

    if (deckId) {
      async function loadDeck() {
        try {
          const data = await readDeck(deckId, abortController.signal);
          callback(data);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("readDeck error for :", deckId);
          } else {
            throw error;
          }
        }
      }

      loadDeck();

      return () => {
        abortController.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export { useReadDeckEffect };
