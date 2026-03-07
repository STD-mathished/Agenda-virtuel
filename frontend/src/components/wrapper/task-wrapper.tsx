import { useTaskViewStore } from "@/store/useTaskViewStore";
import TaskList from "../task/task-list";
import TaskEdit from "../task/task-edit";
import TaskCreate from "../task/task-create";
export default function TaskWrapper({ date }: { date: Date | undefined }) {
  const { currentView, selectedTaskId } = useTaskViewStore();

  // Liste des composants à afficher
  const views = {
    list: <TaskList date={date} />,
    edit: <TaskEdit taskId={selectedTaskId} />,
    create: <TaskCreate date={date} />,
  };

  return (
    <div className="w-full h-full p-4 bg-gray-50/50 rounded-xl border border-gray-100">
      {/* afficher dynamiquement le composant*/}
      {views[currentView] || views.list}
    </div>
  );
}