import { TShoppingListCategory } from '@/features/shoppingList/types';
import ShoppingListItem from './ShoppingListItem';

type Props = {
  category: TShoppingListCategory;
};

export default function ShoppingListCategory({ category }: Props) {
  return (
    <section aria-labelledby={`category-${category.categoryId}`}>
      <div className="mb-3 flex items-center gap-3">
        <h2
          id={`category-${category.categoryId}`}
          className="text-lg font-semibold"
        >
          {category.categoryName}
        </h2>

        <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
          {category.items.length}
        </span>
      </div>

      <ul className="space-y-3">
        {category.items.map((item) => (
          <li key={item.productId}>
            <ShoppingListItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
