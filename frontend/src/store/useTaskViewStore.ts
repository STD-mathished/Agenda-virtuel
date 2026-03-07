import type { ViewState } from '@/types/view'
import { create } from 'zustand'



export const useTaskViewStore = create<ViewState>((set) => ({
  currentView: 'list',
  selectedTaskId: null,
  setView: (view, taskId) => set({ currentView: view, selectedTaskId: taskId }),
}))