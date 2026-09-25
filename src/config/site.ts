export const siteConfig = {
  // Базові дані бренду
  name: 'Stop Cooking Wrong',
  shortName: 'SCW',
  handle: '@StopCookingWrong',
  tagline:
    'Master your air fryer with simple, restaurant-quality recipes and the right cooking moves.',
  description:
    'Easy, beginner-friendly air fryer recipes made with simple ingredients. Learn the right moves to transform everyday cooking into restaurant-quality meals.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stopcookingwrong.com',

  // Посилання та канали зв'язку
  links: {
    youtube: 'https://www.youtube.com/@StopCookingWrong',
    youtubeSubscribe:
      'https://www.youtube.com/@StopCookingWrong?sub_confirmation=1',
  },

  // Фірмові тексти та бейджі бренду "Stop Cooking Wrong"
  brand: {
    secretBadge: 'Stop Cooking Wrong: Pro Secret',
    commonMistakeLabel: 'Common Mistake',
    theRightMoveLabel: 'The Right Move',
    printBadge: 'Air Fryer Master Series',
    printFooterNotice: 'For full ASMR cooking video and steps, visit:',
  },
} as const;

// Централізовані маршрути сайту
export const ROUTES = {
  home: '/',
  recipes: '/recipes',
  recipe: (slug: string) => `/recipes/${slug}`,
  category: (category: string) => `/categories/${category.toLowerCase()}`,
  about: '/about',
} as const;
