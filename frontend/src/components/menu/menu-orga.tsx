import { List, Star, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/useFilterStore";



export default function MenuOrganisation() {
  const { activeFilter, setActiveFilter } = useFilterStore();

  return (
    <nav className="flex items-center gap-6 border-b border-gray-100 pb-4 mb-6">
      
      {/* Bouton : Toutes les tâches */}
      <button 
        onClick={() => setActiveFilter('all')}
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
        onClick={() => setActiveFilter('priority')}
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

      {/* Bouton : Filtrer */}
      <button 
        onClick={() => setActiveFilter('filter')}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-all pb-4 -mb-[18px] border-b-2 ml-auto",
          activeFilter === 'filter' 
            ? "text-blue-600 border-blue-600" 
            : "text-gray-500 border-transparent hover:text-gray-700"
        )}
      >
        <SlidersHorizontal size={18} />
        Filtrer
      </button>
      
    </nav>
  );
}