import { Location } from '@/types/city';

export interface LocationItemProps {
  location: Location;
  onClick: (id: string) => void;
}