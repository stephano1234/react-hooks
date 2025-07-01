import { Stack, TextField, Typography } from "@mui/material";
import { memo, useCallback, useState, type ChangeEvent } from "react";
import withDebouncer from "../hocs/WithDebouncer";

const TextFieldWithDebouncer = memo(withDebouncer(TextField, 2000));

export default function DebounceTime() {
  const [value, setValue] = useState("");

  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setValue(target.value),
    [],
  );

  return (
    <Stack spacing={1}>
      <TextFieldWithDebouncer
        label="Label"
        onChangeWithDebouncer={onChange}
      ></TextFieldWithDebouncer>
      <Typography>Value after 2 seconds of no inputs: {value}</Typography>
    </Stack>
  );
}
