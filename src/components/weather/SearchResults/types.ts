import { Location } from '@/types/city';

export interface SearchResultsProps {
  locations: Location[];
  onSelectLocation: (locationId: string) => void;
  maxResults?: number;
}