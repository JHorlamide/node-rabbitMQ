import { useEffect, useState } from "react";
import { getBooks } from "../api/axios";

const useBookHandler = (page_number = 0) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);

  console.log("Book State Array: ", books);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    setError({});

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    getBooks(page_number, { signal })
      .then((books) => {
        setBooks((prevBook) => [...prevBook, ...books]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: error.message });
      });

    // Anytime the component unmount it will abort the controller;
    return () => controller.abort();
  }, [page_number]);

  return {
    loading,
    error,
    books,
    isError,
    setBooks,
  };
};

export default useBookHandler;
