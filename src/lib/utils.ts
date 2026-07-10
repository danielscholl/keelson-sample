export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function getObjectOfTheDayIndex(date: Date = new Date()): number {
  return (getDayOfYear(date) - 1) % 12; // 0-based, mod 12
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
