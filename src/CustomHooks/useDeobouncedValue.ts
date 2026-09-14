import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
// T means the hook is generic and can delay any data type
// useState tracks that delayed version of the data
// useEffect updates debounced with setDebounced and the latest version of data
