export type FilterType = 'all' | 'priority' | 'create';

export interface FilterState {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}