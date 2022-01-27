import { useCallback } from "react";

const useFetchData = (route, applyData) => {
  const sendRequest = useCallback(async () => {
    const response = await fetch(`http://localhost:4000/${route}`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}}`;
      console.log(message);
      return;
    }
    const parsedData = await response.json();
    applyData(parsedData);
  }, [route, applyData]);
  return { sendRequest };
};

export default useFetchData;
