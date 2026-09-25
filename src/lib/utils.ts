export { cn } from 'cn';

// перетворення хвилин у формат ISO 8601 (наприклад: 10 -> "PT10M")
export const toIsoDuration = (minutes: number) => `PT${minutes}M`;
