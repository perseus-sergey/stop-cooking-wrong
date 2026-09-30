import Link from 'next/link';
import { ROUTES } from '@/config/site';

export default function NotFound() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>

      <Link href={ROUTES.home}>Home</Link>
    </div>
  );
}
