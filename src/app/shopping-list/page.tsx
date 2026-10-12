import ShoppingListView from '@/components/shoppingList/ShoppingListView';
import { getUnits } from '@/queries/recipes.query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping List',
  description:
    'Manage your shopping list, combine ingredients from recipes, and keep track of what you need to buy.',

  robots: {
    index: false,
    follow: true,
  },
};

export default async function ShoppingListPage() {
  const units = await getUnits();
  return <ShoppingListView units={units} />;
}
