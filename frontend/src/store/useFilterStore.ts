import type { FilterState } from '@/types/filter-type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      activeFilter: 'all', 
      setActiveFilter: (filter) => set({ activeFilter: filter }),
    }),
    {
      name: 'agendai-filter-storage', 
    }
  )
)