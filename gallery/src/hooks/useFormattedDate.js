import { useEffect, useState } from "react";

const useFormattedDate = (dateString) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const dateObj = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formatted = dateObj.toLocaleString("en-US", options);
    setFormattedDate(formatted);
  }, [dateString]);

  return formattedDate;
};

export default useFormattedDate;
