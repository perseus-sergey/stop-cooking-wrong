import 'server-only';

import { getNavCategories } from '@/queries/categories.query';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const categories = await getNavCategories();

  return <NavbarClient categories={categories} />;
}
