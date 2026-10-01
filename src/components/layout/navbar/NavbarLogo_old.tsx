import Link from 'next/link';
import { ROUTES } from '@/config/site.config';
import Image from 'next/image';

export default function NavbarLogo() {
  return (
    <Link href={ROUTES.home} className="group flex items-center gap-3">
      {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm transition-transform group-hover:scale-105"> */}
      {/* <Flame className="h-5 w-5 fill-current" /> */}
      <Image
        src="/site-logo.jpeg"
        alt="Stop Cooking Wrong"
        width={80}
        height={80}
        className="w-h-20 mt-5 h-20 rounded-full object-cover"
      />
      {/* </div> */}

      <div className="flex flex-col">
        <span className="text-lg leading-none font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          STOP COOKING WRONG
        </span>

        <span className="text-[10px] font-semibold tracking-widest text-orange-600 uppercase dark:text-orange-400">
          Air Fryer Master
        </span>
      </div>
    </Link>
  );
}
