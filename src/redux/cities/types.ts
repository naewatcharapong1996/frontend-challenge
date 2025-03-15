import { City as CityType } from '@/types/city';

export type City = CityType;

export interface CitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
}