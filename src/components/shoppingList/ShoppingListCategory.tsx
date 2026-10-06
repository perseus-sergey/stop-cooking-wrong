import { TShoppingListCategory } from '@/features/shoppingList/types';
import ShoppingListItem from './ShoppingListItem';
import type { TFormatterUnit } from '@/types/formatter.type';
import type { TUnitSystem } from '@/types/recipe.type';

type Props = {
  category: TShoppingListCategory;
  unitSystem: TUnitSystem;
  units: TFormatterUnit[];
  unitsById: Map<string, TFormatterUnit>;
};

export default function ShoppingListCategory({
  category,
  unitSystem,
  units,
  unitsById,
}: Props) {
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
            <ShoppingListItem
              item={item}
              unitSystem={unitSystem}
              units={units}
              unitsById={unitsById}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
