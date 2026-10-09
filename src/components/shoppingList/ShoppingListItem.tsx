import Link from 'next/link';

import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Trash2,
  X,
} from 'lucide-react';

import {
  TShoppingListProduct,
  TShoppingListSource,
} from '@/features/shoppingList/types';
import { TUnitSystem } from '@/types/recipe.type';
import { TFormatterUnit } from '@/types/formatter.type';
import { formatShoppingQuantity } from '@/lib/formatters/formatShoppingQuantity';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  removeIngredient,
  removeProduct,
  toggleProductChecked,
} from '@/features/shoppingList/shoppingListSlice';
import { useState } from 'react';
import { selectCheckedProductIds } from '@/features/shoppingList/shoppingListSelectors';

type Props = {
  item: TShoppingListProduct;
  unitSystem: TUnitSystem;
  units: TFormatterUnit[];
  unitsById: Map<string, TFormatterUnit>;
};

export default function ShoppingListItem({
  item,
  unitSystem,
  units,
  unitsById,
}: Props) {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const checkedProductIds = useAppSelector(selectCheckedProductIds);
  const isChecked = checkedProductIds.includes(item.productId);

  const formattedTotal = item.totals
    .map((quantity) =>
      formatShoppingQuantity(quantity, {
        unitSystem,
        units,
        unitsById,
      })
    )
    .join(' + ');

  const handleToggleChecked = () => {
    dispatch(toggleProductChecked({ productId: item.productId }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ productId: item.productId }));
  };

  const handleRemoveIngredient = (source: TShoppingListSource) => {
    dispatch(
      removeIngredient({
        recipeId: source.recipeId,
        ingredientId: source.ingredientId,
      })
    );
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        isChecked ? 'border-muted bg-muted/30' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-center gap-2 p-3 sm:gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleChecked}
          aria-label={`Mark ${item.productName} as ${
            isChecked ? 'not purchased' : 'purchased'
          }`}
          className="accent-primary size-4 shrink-0 cursor-pointer"
        />

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="min-w-0 flex-1">
            <span
              className={`block truncate text-sm font-semibold ${
                isChecked ? 'text-muted-foreground line-through' : ''
              }`}
            >
              {item.productName}
            </span>

            <span
              className={`mt-1 inline-flex rounded-md px-2 py-1 text-sm font-medium ${
                isChecked
                  ? 'bg-muted text-muted-foreground line-through'
                  : 'bg-muted text-foreground'
              }`}
            >
              {formattedTotal}
            </span>
          </span>

          {expanded ? (
            <ChevronDown className="text-muted-foreground size-4 shrink-0" />
          ) : (
            <ChevronRight className="text-muted-foreground size-4 shrink-0" />
          )}
        </button>

        <button
          type="button"
          onClick={handleRemoveProduct}
          aria-label={`Remove ${item.productName} from shopping list`}
          title={`Remove ${item.productName}`}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex size-9 shrink-0 items-center justify-center rounded-md transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      {expanded && (
        <div className="bg-muted/40 border-t px-3 py-2">
          <ul className="divide-y">
            {item.sources.map((source) => (
              <li
                key={`${source.recipeId}-${source.ingredientId}`}
                className="flex items-center gap-2 py-2"
              >
                <Link
                  href={`/recipes/${source.recipeSlug}`}
                  className="group flex min-w-0 flex-1 items-center gap-2 rounded-md py-1"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium group-hover:underline">
                      {formatShoppingQuantity(source.quantity, {
                        unitSystem,
                        units,
                        unitsById,
                      })}
                    </span>

                    <span className="text-muted-foreground block truncate text-xs">
                      {source.recipeTitle}
                    </span>
                  </span>

                  <ExternalLink className="text-muted-foreground size-3.5 shrink-0" />
                </Link>

                {item.sources.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(source)}
                    aria-label={`Remove ${item.productName} from ${source.recipeTitle}`}
                    title={`Remove from ${source.recipeTitle}`}
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex size-9 shrink-0 items-center justify-center rounded-md"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
