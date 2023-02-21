import { useState, useEffect } from "react";

const useDate = (props) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => setFormattedDate(props), []);

  return formattedDate;
};

export default useDate;
