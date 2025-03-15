import { Location as LocationType } from '@/types/city';

export type Location = LocationType;

export interface PlacesState {
  searchResults: Location[];
  loading: boolean;
  error: string | null;
}