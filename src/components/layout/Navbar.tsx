import { getNavCategories } from '@/queries/categories';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const categories = await getNavCategories();

  return <NavbarClient categories={categories} />;
}
