'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      className="gap-2 text-xs font-medium print:hidden"
    >
      <Printer className="h-4 w-4 text-zinc-500" />
      Print Recipe
    </Button>
  );
}
