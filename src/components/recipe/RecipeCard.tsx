import Link from 'next/link';
import Image from 'next/image';
import { RecipeCardData } from '@/types/recipe.type';
import { ROUTES } from '@/config/site.config';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, Sparkles } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface Props {
  recipe: RecipeCardData;
  priority: boolean;
}

export default function RecipeCard({ recipe, priority }: Props) {
  return (
    <Card className="relative flex h-full flex-col overflow-hidden border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <FavoriteButton recipeId={recipe.id} />
      {/* Картинка страви з зум-ефектом */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Link
          href={ROUTES.recipe(recipe.slug)}
          aria-label={`View ${recipe.title} recipe`}
          className="absolute inset-0"
        >
          <Image
            src={recipe.featuredImage}
            alt={recipe.title}
            fill
            loading={priority ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <Badge className="absolute top-3 left-3 border-none bg-zinc-950/80 text-xs font-medium text-white backdrop-blur-md">
          {recipe.categories[0].category.name}
        </Badge>
      </div>

      {/* Контент картки */}
      <Link
        href={ROUTES.recipe(recipe.slug)}
        className="group flex flex-1 flex-col"
      >
        <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5">
          <div className="space-y-2">
            {/* Час і температура */}
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-orange-500" />
                {recipe.cookTimeMinutes} mins
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                Air Fryer
              </span>
            </div>

            <h3 className="line-clamp-2 text-lg leading-snug font-bold transition-colors group-hover:text-orange-600">
              {recipe.title}
            </h3>

            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {recipe.description}
            </p>
          </div>

          {/* Плашка фірмового секрету каналу */}
          <div className="flex items-center gap-1.5 border-t border-zinc-100 pt-2 text-[11px] font-semibold text-orange-600 dark:border-zinc-800 dark:text-orange-400">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{recipe.theRightMove}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
