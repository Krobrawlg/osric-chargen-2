import { useCallback } from "react";

const useGetData = (url, applyData) => {
  const sendRequest = useCallback(async () => {
    const fetchedData = await fetch(url);
    console.log(fetchedData);
    const parsedData = await fetchedData.json();
    applyData(parsedData);
  }, [url, applyData]);

  return { sendRequest };
};

export default useGetData;
