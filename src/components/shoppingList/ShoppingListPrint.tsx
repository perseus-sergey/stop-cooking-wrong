import { TShoppingListCategory } from '@/features/shoppingList/types';
import { formatShoppingQuantity } from '@/lib/formatters/formatShoppingQuantity';
import { TFormatterUnit } from '@/types/formatter.type';
import { TUnitSystem } from '@/types/recipe.type';

type Props = {
  categories: TShoppingListCategory[];
  unitSystem: TUnitSystem;
  units: TFormatterUnit[];
  unitsById: Map<string, TFormatterUnit>;
  checkedProductIds: string[];
};

export default function ShoppingListPrint({
  categories,
  unitSystem,
  units,
  unitsById,
  checkedProductIds,
}: Props) {
  const itemCount = categories.reduce(
    (total, category) => total + category.items.length,
    0
  );

  return (
    <div className="hidden print:block print:bg-white print:text-black">
      <header className="mb-6 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold">Shopping List</h1>

        <p className="mt-2 text-sm">
          {itemCount} {itemCount === 1 ? 'product' : 'products'}
        </p>
      </header>

      <div className="space-y-6">
        {categories.map((category) => (
          <section key={category.categoryId} className="break-inside-avoid">
            <h2 className="mb-3 border-b border-gray-400 pb-1 text-lg font-bold">
              {category.categoryName}
            </h2>

            <ul className="space-y-2">
              {category.items.map((item) => {
                const isChecked = checkedProductIds.includes(item.productId);

                const total = item.totals
                  .map((quantity) =>
                    formatShoppingQuantity(quantity, {
                      unitSystem,
                      units,
                      unitsById,
                    })
                  )
                  .join(' + ');

                return (
                  <li
                    key={item.productId}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-black text-xs leading-none"
                    >
                      {isChecked ? '✓' : ''}
                    </span>

                    <span
                      className={`min-w-0 flex-1 ${
                        isChecked ? 'text-gray-500 line-through' : ''
                      }`}
                    >
                      {item.productName}
                    </span>

                    <span className="shrink-0 text-right">{total}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <footer className="mt-8 border-t border-gray-300 pt-3 text-xs text-gray-500">
        Shopping List
      </footer>
    </div>
  );
}
