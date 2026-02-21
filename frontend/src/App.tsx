import './App.css';
import { Calendar } from './components/ui/calendar';
import Task from './components/own/task';
import { useDateStore } from './hooks/dataStore';
import { useCallback, useEffect, useState } from 'react';
import type { Tache } from './types/taches';
import { API_BASE } from './lib/api';
import { format } from 'date-fns';

export default function App() {
  const date = useDateStore((s) => s.date);
  const setDate = useDateStore((s) => s.setDate);

  const [taches, setTaches] = useState<Tache[]>([]);
  
  const fetchTasks = useCallback(async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const url = `${API_BASE}/taches/${formattedDate}`;
        console.log("Chargement des tâches pour :", formattedDate);
        const result = await fetch(url);
  
        if (!result.ok) {
          throw new Error(result.statusText);
        }
  
        const data: Tache[] = await result.json();
        setTaches(data);
      } catch (error) {
        console.error("Erreur lors du fetch des tâches :", error);
        setTaches([]);
      }
    }, [date]); 
  
    useEffect(() => {
      if (date instanceof Date) {
        void fetchTasks();
      }
    }, [date, fetchTasks]);

  return (
    <section className="min-h-screen flex flex-col xl:flex-row">
      {/* Calendrier */}
      <div className="
        xl:w-1/2 w-full flex-1
        p-4
        border-gray-200
        xl:border-r border-b xl:border-b-0
        overflow-auto xl:min-h-0
      ">
        <div className="h-full">
          <Calendar
            mode="single"
            numberOfMonths={1}
            selected={date ?? undefined}
            defaultMonth={date ?? new Date()}
            onSelect={(d) => setDate(d ?? null)}
            className="w-full"
          />
        </div>
      </div>

      {/* Tâches */}
      <div className="
        xl:w-1/2 w-full flex-1
        flex items-start justify-start
        xl:items-center xl:justify-center
        bg-gray-200 xl:min-h-0
      ">
        {date && <Task taches={taches} onRefresh={fetchTasks} date={date} />}
      </div>
    </section>
  );
}
