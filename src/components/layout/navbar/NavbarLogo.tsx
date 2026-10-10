'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ROUTES, siteConfig } from '@/config/site.config';

export default function NavbarLogoClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;

      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link
      aria-label={`${siteConfig.name} home`}
      href={ROUTES.home}
      className="group flex min-w-0 items-center gap-2 sm:gap-3"
    >
      <Image
        src="/site-logo.jpeg"
        alt=""
        width={80}
        height={80}
        className={[
          'w-10 shrink-0 rounded-full object-cover transition-all duration-300 ease-out sm:w-auto',
          scrolled ? 'h-10 sm:h-12' : 'h-10 sm:mt-5 sm:h-20',
        ].join(' ')}
      />

      <div className="flex flex-col">
        <span className="text-sm leading-tight font-black tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-50">
          {siteConfig.name.toUpperCase()}
        </span>

        <span className="truncate text-[10px] font-semibold tracking-widest text-orange-600 uppercase dark:text-orange-400">
          Air Fryer Master
        </span>
      </div>
    </Link>
  );
}
