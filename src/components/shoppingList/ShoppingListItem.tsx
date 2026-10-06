import Link from 'next/link';

import { ExternalLink } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TShoppingListProduct } from '@/features/shoppingList/types';
import { formatShoppingQuantity } from '@/lib/formatters/fraction';

type Props = {
  item: TShoppingListProduct;
};

export default function ShoppingListItem({ item }: Props) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{item.productName}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {item.sources.map((source, index) => (
            <li key={`${source.recipeId}-${index}`}>
              <Link
                href={`/recipes/${source.recipeSlug}`}
                className="group hover:bg-muted -mx-2 flex items-center justify-between gap-4 rounded-md px-2 py-1.5 transition-colors"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium group-hover:underline">
                    {formatShoppingQuantity(source.quantity)}
                  </span>

                  <span className="text-muted-foreground block truncate text-xs">
                    {source.recipeTitle}
                  </span>
                </span>

                <ExternalLink className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t pt-3">
          <p className="text-sm">
            <span className="font-semibold">Total:</span>{' '}
            <span className="text-muted-foreground">
              {item.totals.map(formatShoppingQuantity).join(' + ')}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
