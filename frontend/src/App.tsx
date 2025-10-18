import { useState } from 'react'
import './App.css'
import { Calendar } from './components/ui/calendar'
import Task from './components/own/task'

export default function App() {
    const [date, setDate] = useState<Date | undefined>(new Date())
  

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

      {/* taches */}
      <div className="
        xl:w-1/2 w-full flex-1
        flex 
        items-start justify-start   
        xl:items-center xl:justify-center 
        bg-gray-200 xl:min-h-0

      ">
        
        {date && <Task date={date} />}

      </div>
    </section>
  )
}
