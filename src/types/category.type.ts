import type { CategoryType } from '@prisma/client';

export interface NavCategory {
  id: string;
  slug: string;
  name: string;
  type: CategoryType;
  order: number;
  isActive: boolean;
  _count: {
    recipes: number;
  };
}
