import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState, type ChangeEvent } from "react";
import withDebouncer from "../hocs/WithDebouncer";
import useIdList from "../hooks/UseIdList";

const TextFieldWithDebouncer = withDebouncer(TextField, 1000);

const validateFn = (value: string) =>
  value.length !== 8
    ? {
        message: "The ID must have 8 characters.",
      }
    : null;

export default function IdsList() {
  const { ids, addId } = useIdList(100);
  const [search, setSearch] = useState("");
  const [searchErrorState, setSearchErrorState] = useState<{
    message: string;
  } | null>(() => validateFn(search));
  const [searchTouchedState, setSearchTouchedState] = useState(false);
  const [addButtonDisabledState, setAddButtonDisabledState] = useState(true);

  const onChangeWithDebouncer = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(target.value);
  };

  const onChange = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchErrorState(validateFn(target.value));
    setAddButtonDisabledState(target.value.length !== 8);
  };

  const onBlur = () => setSearchTouchedState(true);

  const onClick = () => addId(search);

  const filteredIds = useMemo(
    () => ids.filter((id) => id.toUpperCase().startsWith(search.toUpperCase())),
    [ids, search],
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h3" component="div">
        IDs
      </Typography>
      <TextFieldWithDebouncer
        sx={{ width: 300 }}
        label="ID"
        onChangeWithDebouncer={onChangeWithDebouncer}
        onChange={onChange}
        onBlur={onBlur}
        error={searchTouchedState && Boolean(searchErrorState)}
        helperText={(searchTouchedState && searchErrorState?.message) || " "}
      ></TextFieldWithDebouncer>
      <Button
        variant="contained"
        sx={{ width: 300 }}
        onClick={onClick}
        disabled={addButtonDisabledState}
      >
        Add ID
      </Button>
      <List
        sx={{
          width: { sm: 300 },
          ".MuiTypography-root": { fontFamily: "Monospace" },
        }}
      >
        {filteredIds.map((id) => (
          <ListItem key={id}>
            <ListItemText>{id}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
