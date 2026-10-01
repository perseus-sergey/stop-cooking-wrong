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
    <Link href={ROUTES.home} className="group flex items-center gap-3">
      <Image
        src="/site-logo.jpeg"
        alt={siteConfig.name}
        width={80}
        height={80}
        className={[
          'w-auto rounded-full object-cover transition-all duration-300 ease-out',
          scrolled ? 'mt-0 h-12' : 'mt-5 h-20',
        ].join(' ')}
      />

      <div className="flex flex-col">
        <span className="text-lg leading-none font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          {siteConfig.name.toUpperCase()}
        </span>

        <span className="text-[10px] font-semibold tracking-widest text-orange-600 uppercase dark:text-orange-400">
          Air Fryer Master
        </span>
      </div>
    </Link>
  );
}
