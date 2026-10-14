'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

type ThumbnailState = 'max' | 'hq' | 'failed';

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailState, setThumbnailState] = useState<ThumbnailState>('max');

  const thumbnailUrl =
    thumbnailState === 'hq'
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          {thumbnailState !== 'failed' && (
            <Image
              src={thumbnailUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              onError={() => {
                setThumbnailState((current) =>
                  current === 'max' ? 'hq' : 'failed'
                );
              }}
            />
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Play video: ${title}`}
            title={`Play video: ${title}`}
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-none bg-black/10 text-white hover:bg-black/25 hover:text-white focus-visible:ring-4 focus-visible:ring-orange-500 focus-visible:ring-inset"
          >
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 shadow-lg transition-transform hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 size-8 fill-current"
                aria-hidden="true"
              >
                <path d="M5 2v20l17-10z" />
              </svg>
            </span>
          </Button>
        </>
      )}
    </div>
  );
}
