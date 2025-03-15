import { City } from "src/types/city";

export interface CityItemProps {
  city: City;
  isLoading?: boolean;
  onClick?: (cityId: string) => void;
}