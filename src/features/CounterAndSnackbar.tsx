import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import useSnackbar from "../providers/snackbar/UseSnackbar";

export default function CounterAndSnackbar() {
  const { show } = useSnackbar();
  const [count, setCount] = useState(0);

  const plus = () => {
    const newCount = count + 1;
    setCount(newCount);
    show({
      message: `Plus one! Count: ${newCount}`,
      actionButton: {
        label: "UNDO",
        onClick: () => setCount(count),
      },
    });
  };
  const minus = () => {
    const newCount = count - 1;
    setCount(newCount);
    show({
      message: `Minus one! Count: ${newCount}`,
      actionButton: {
        label: "UNDO",
        onClick: () => setCount(count),
      },
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography>Count: {count}</Typography>
      </Grid>
      <Grid size="auto">
        <Button variant="contained" onClick={plus}>
          +
        </Button>
      </Grid>
      <Grid size="auto">
        <Button variant="contained" onClick={minus}>
          -
        </Button>
      </Grid>
    </Grid>
  );
}
