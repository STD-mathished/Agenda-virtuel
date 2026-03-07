export type FilterType = 'all' | 'priority' | 'filter';

export interface FilterState {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}