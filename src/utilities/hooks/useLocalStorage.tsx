import { useState } from "react";

const useLocalStorage = (key: string, defaultValue: unknown, expiryInHours: number) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item) {
      const { value, expiry } = JSON.parse(item);
      if (Date.now() < expiry) {
        return value;
      }
      localStorage.removeItem(key);
    }
    return defaultValue;
  });

  const setValue = (value: unknown) => {
    const expiry = Date.now() + expiryInHours * 60 * 60 * 1000;
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify({ value, expiry }));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
