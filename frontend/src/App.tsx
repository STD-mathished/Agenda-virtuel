import './App.css';
import { Calendar } from './components/ui/calendar';
import Task from './components/own/task';
import { useDateStore } from './hooks/dataStore';

export default function App() {
  const date = useDateStore((s) => s.date);
  const setDate = useDateStore((s) => s.setDate);

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
        {date && <Task date={date} />}
      </div>
    </section>
  );
}
