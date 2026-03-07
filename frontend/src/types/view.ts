type ViewMode = 'list' | 'edit' | 'create';

export interface ViewState {
  currentView: ViewMode;
  selectedTaskId: string | null;
  setView: (view: ViewMode, taskId?: string) => void;
}