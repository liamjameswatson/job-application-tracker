export const useLocalStorage = () => {
  const getItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };

  const setItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const clearItems = (): void => {
    localStorage.clear();
  };

  return { getItem, setItem, clearItems };
};
