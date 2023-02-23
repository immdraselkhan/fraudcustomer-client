import { useState, useEffect } from "react";

const useLocalStorage = (props: string) => {
  const [requiredLsData, setRequiredLsData] = useState<string>("");

  useEffect(
    () => setRequiredLsData(localStorage.getItem(props) as string),
    [props]
  );

  return requiredLsData;
};

export default useLocalStorage;
