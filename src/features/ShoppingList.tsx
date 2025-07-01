import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import useShoppingList from "../hooks/UseShoppingList";
import type { ShoppingItem } from "../model/ShoppingItem";

const shoppingItems: ShoppingItem[] = [
  { itemId: "A", itemName: "Apple" },
  { itemId: "B", itemName: "Banana" },
  { itemId: "R", itemName: "Rice" },
  { itemId: "M", itemName: "Milk" },
  { itemId: "O", itemName: "Olive oil" },
  { itemId: "S", itemName: "Salt" },
  { itemId: "G", itemName: "Granola bar" },
  { itemId: "C", itemName: "Chicken" },
  { itemId: "E", itemName: "Egg" },
];

export default function ShoppingList() {
  const { shoppingList, dispatchShoppingAction } = useShoppingList();
  const item = useRef<ShoppingItem>(null);

  const onClickAdd = () =>
    item.current &&
    dispatchShoppingAction({ type: "add", payload: item.current });

  const onClickClear = () => dispatchShoppingAction({ type: "clear" });

  const onChangeSelect = (
    _event: React.SyntheticEvent,
    value: ShoppingItem | null,
  ) => {
    item.current = value;
  };

  const onClickRemoveFn = (itemId: string) => () =>
    dispatchShoppingAction({ type: "remove", payload: { itemId } });

  return (
    <Stack spacing={2}>
      <Typography variant="h3" component="div">
        Shopping List
      </Typography>
      <Autocomplete
        onChange={onChangeSelect}
        disablePortal
        options={shoppingItems}
        getOptionLabel={({ itemName }) => itemName}
        isOptionEqualToValue={({ itemId: a }, { itemId: b }) => a === b}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search for an item" />
        )}
      />
      <Button variant="contained" sx={{ width: 300 }} onClick={onClickAdd}>
        Add item
      </Button>
      <Button variant="contained" sx={{ width: 300 }} onClick={onClickClear}>
        Clear <DeleteIcon />
      </Button>
      <List sx={{ width: { sm: 300 } }}>
        {shoppingList.map(({ itemId, itemName, qtd }) => (
          <ListItem
            key={itemId}
            secondaryAction={
              <IconButton onClick={onClickRemoveFn(itemId)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText>
              {itemName} x{qtd}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
