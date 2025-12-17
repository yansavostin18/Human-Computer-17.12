
export interface Quote {
  id: string;
  quote: string;
  author: string;
  era: string;
  category: string;
  context: string;
  timestamp: number;
}

export type Category = 
  | 'Przywództwo' 
  | 'Wytrwałość' 
  | 'Innowacja' 
  | 'Mądrość Życiowa' 
  | 'Odwaga' 
  | 'Filozofia';

export const CATEGORIES: Category[] = [
  'Przywództwo',
  'Wytrwałość',
  'Innowacja',
  'Mądrość Życiowa',
  'Odwaga',
  'Filozofia'
];
