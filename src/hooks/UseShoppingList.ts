import { useReducer } from "react";
import type {
  ShoppingItem,
  ShoppingList,
  ShoppingListItem,
} from "../model/ShoppingItem";

interface ActionType<T extends string> {
  type: T;
}

interface ActionPayload<P> {
  payload: P;
}

type Action<T extends string, P = void> = P extends void
  ? ActionType<T>
  : ActionType<T> & ActionPayload<P>;

export type ShoppingAddActionPayload = ShoppingItem;

export interface ShoppingRemoveActionPayload {
  itemId: string;
}

export type ShoppingAddAction = Action<"add", ShoppingAddActionPayload>;

export type ShoppingRemoveAction = Action<
  "remove",
  ShoppingRemoveActionPayload
>;

export type ShoppingClearAction = Action<"clear">;

export type ShoppingAction =
  | ShoppingAddAction
  | ShoppingRemoveAction
  | ShoppingClearAction;

type MapReducer<S, T extends Action<string, unknown> | Action<string>> =
  T extends Action<string, unknown>
    ? (state: S, payload: T["payload"]) => S
    : (state: S) => S;

type ShoppingListMapReducer<
  T extends Action<string, unknown> | Action<string>,
> = MapReducer<ShoppingList, T>;

const addReducer: ShoppingListMapReducer<ShoppingAddAction> = (
  state,
  payload,
) => {
  const newState = [...state];
  const { itemId } = payload;
  const i = newState.findIndex((item) => item.itemId === itemId);
  if (i === -1) {
    newState.push({ ...payload, qtd: 1 });
    return newState;
  }
  const item = newState[i]!;
  newState[i] = { ...item, qtd: item.qtd + 1 };
  return newState;
};

const removeReducer: ShoppingListMapReducer<ShoppingRemoveAction> = (
  state,
  payload,
) => {
  const newState = [...state];
  const { itemId } = payload;
  const i = newState.findIndex((item) => item.itemId === itemId);
  if (i === -1) {
    return newState;
  }
  newState.splice(i, 1);
  return newState;
};

const clearReducer: ShoppingListMapReducer<ShoppingClearAction> = () => {
  return [];
};

const reducer = (state: ShoppingListItem[], action: ShoppingAction) => {
  switch (action.type) {
    case "add":
      return addReducer(state, action.payload);
    case "remove":
      return removeReducer(state, action.payload);
    case "clear":
      return clearReducer(state);
    default:
      return state;
  }
};

export default function useShoppingList() {
  const [shoppingList, dispatchShoppingAction] = useReducer(reducer, []);
  return { shoppingList, dispatchShoppingAction };
}
