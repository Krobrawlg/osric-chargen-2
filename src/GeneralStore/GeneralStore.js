import { useEffect, useState } from "react";

import SelectionBox from "../SelectionBox/SelectionBox";

const GeneralStore = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      const response = await fetch("http://localhost:4000/generalStore");
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}}`;
        console.log(message);
        return;
      }
      const shopItems = await response.json();
      console.log(shopItems);
      console.log(Array.isArray(shopItems));
      setItems(shopItems);
    }
    getItems();
    setIsLoading(false);
  }, [setIsLoading]);

  const shopContents = items.map((item) => <p key={item._id}>{item.Item}</p>);
  return <div className="item-list">{!isLoading && shopContents}</div>;
};

export default GeneralStore;
