// Annotated Bibliography Types for Alzheimer's Research Timeline
// Each source includes direct citations and documentation of where/how it's used

export interface Citation {
  id: string;
  quote: string;
  page?: string;
  usedIn: string[]; // Components/sections where this citation is used
  context: string; // Editorial note on how/why this quote is used
}

export interface Source {
  id: string;
  type: 'journal' | 'news' | 'book' | 'website' | 'conference';
  authors: string[];
  title: string;
  publication: string;
  year: number;
  volume?: string;
  pages?: string;
  url?: string;
  doi?: string;
  accessDate?: string;
  citations: Citation[];
}
