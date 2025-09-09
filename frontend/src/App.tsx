import { useState } from 'react'
import './App.css'
import { Calendar } from './components/ui/calendar'

export default function App() {
    const [date, setDate] = useState<Date | undefined>(
    new Date(2025, 8, 1)
  )

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
            defaultMonth={date}
            numberOfMonths={1}
            selected={date}
            onSelect={setDate}
            className="w-full" />
        </div>
      </div>

      {/* Placeholder */}
      <div className="
        xl:w-1/2 w-full flex-1
        flex items-center justify-center
        bg-gray-100 xl:min-h-0
      ">
        <div className="text-gray-500 text-xl">
          Placeholder
        </div>
      </div>
    </section>
  )
}
