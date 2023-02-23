import { useState, useEffect } from "react";

type date = Date | number | string;

const useDate = (props: date) => {
  const [formattedDate, setFormattedDate] = useState<date>();

  useEffect(() => setFormattedDate(props as date), []);

  return formattedDate;
};

export default useDate;
