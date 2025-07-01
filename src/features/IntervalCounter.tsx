import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function IntervalCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Typography>Count: {count}</Typography>;
}
