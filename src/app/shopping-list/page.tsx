import ShoppingListView from '@/components/shoppingList/ShoppingListView';
import { getUnits } from '@/queries/recipes.query';

export default async function ShoppingListPage() {
  const units = await getUnits();
  return <ShoppingListView units={units} />;
}
