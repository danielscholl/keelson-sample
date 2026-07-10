export interface CosmicObjectSummary {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  chills: number;
}

export interface CosmicObject extends CosmicObjectSummary {
  description: string;
  stats: Array<{ label: string; value: string }>;
  facts: string[];
  prevSlug: string | null;
  nextSlug: string | null;
}

export interface Category {
  name: string;
  count: number;
}

export interface DbObject {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  stats: string; // JSON
  facts: string; // JSON
  sort_order: number;
}
