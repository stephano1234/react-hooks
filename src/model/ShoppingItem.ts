export interface ShoppingItem {
  itemId: string;
  itemName: string;
}

export interface ShoppingListItem {
  itemId: string;
  itemName: string;
  qtd: number;
}

export type ShoppingList = ShoppingListItem[];
