import { List, Star, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/useFilterStore";
import { useTaskViewStore } from "@/store/useTaskViewStore";
import type { FilterType } from "@/types/filter-type";

export default function MenuOrganisation() {
  const { setView } = useTaskViewStore();
  const { activeFilter, setActiveFilter } = useFilterStore();


  const handleNavigation = (filter: FilterType) => {
    setActiveFilter(filter);
    
    if (filter === 'create') {
      setView('create');
    } else {
      setView('list');
    }
  };

  return (
    <nav className="flex items-center gap-6 border-b border-gray-100 pb-4 mb-6">
      
      {/* Bouton : Toutes les tâches */}
      <button 
        onClick={() => handleNavigation('all')}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-all pb-4 -mb-[18px] border-b-2",
          activeFilter === 'all' 
            ? "text-blue-600 border-blue-600" 
            : "text-gray-500 border-transparent hover:text-gray-700"
        )}
      >
        <List size={18} />
        Toutes les tâches
      </button>

      {/* Bouton : Prioritaires */}
      <button 
        onClick={() => handleNavigation('priority')}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-all pb-4 -mb-[18px] border-b-2",
          activeFilter === 'priority' 
            ? "text-blue-600 border-blue-600" 
            : "text-gray-500 border-transparent hover:text-gray-700"
        )}
      >
        <Star size={18} />
        Tâches prioritaires
      </button>

      {/* Bouton : Créer */}
      <button 
        onClick={() => handleNavigation('create')}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-all pb-4 -mb-[18px] border-b-2 ml-auto",
          activeFilter === 'create' 
            ? "text-blue-600 border-blue-600" 
            : "text-gray-500 border-transparent hover:text-gray-700"
        )}
      >
        <CirclePlus size={18} />
        Créer
      </button>
      
    </nav>
  );
}