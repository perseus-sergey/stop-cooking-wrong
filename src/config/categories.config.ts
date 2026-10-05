import {
  // Flame,
  // Menu,
  // ChevronRight,
  // Home,
  Egg,
  UtensilsCrossed,
  Cookie,
  Leaf,
  Dumbbell,
  Zap,
  Wallet,
  Wind,
  CakeSlice,
  PartyPopper,
  Globe2,
} from 'lucide-react';

export const CATEGORY_UI = {
  breakfast: {
    icon: Egg,
    badge: 'Quick',
  },
  lunch: {
    icon: UtensilsCrossed,
    badge: '',
  },
  dinner: {
    icon: UtensilsCrossed,
    badge: '',
  },
  desserts: {
    icon: Cookie,
    badge: '',
  },
  vegetarian: {
    icon: Leaf,
    badge: '',
  },
  'high-protein': {
    icon: Dumbbell,
    badge: '',
  },
  'quick-easy': {
    icon: Zap,
    badge: '',
  },
  'budget-friendly': {
    icon: Wallet,
    badge: '',
  },
  'air-fryer': {
    icon: Wind,
    badge: 'Crispy',
  },
  baking: {
    icon: CakeSlice,
    badge: '',
  },
  festive: {
    icon: PartyPopper,
    badge: 'Special',
  },
  authentic: {
    icon: Globe2,
    badge: 'Classic',
  },
} as const;
