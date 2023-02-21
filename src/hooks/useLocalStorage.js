import { useState, useEffect } from "react";

const useLocalStorage = (props) => {
  const [requiredLsData, setRequiredLsData] = useState(null);

  useEffect(() => setRequiredLsData(localStorage.getItem(props)), []);

  return requiredLsData;
};

export default useLocalStorage;
