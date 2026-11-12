import { useEffect, useState } from "react";

export function useSearch(initialQuery = "", delay = 300) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Update the debounced value after the delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(handler); // cleanup on value change
  }, [query, delay]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return { query, debouncedQuery, handleQueryChange, setQuery };
}
