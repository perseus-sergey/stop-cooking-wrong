import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';

import { cn } from '@/lib/utils';

export default function YouTubeButton() {
  return (
    <a
      aria-label="Subscribe to our YouTube channel (opens in a new tab)"
      href={siteConfig.links.youtube}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ size: 'sm' }),
        'hidden gap-2 bg-red-600 text-xs font-medium text-white shadow-sm hover:bg-red-700 sm:inline-flex'
      )}
    >
      <YoutubeIcon aria-hidden="true" className="h-4 w-4 fill-current" />
      Subscribe
    </a>
  );
}
