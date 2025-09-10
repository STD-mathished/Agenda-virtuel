import { useEffect, useState } from 'react'
import './App.css'
import { format } from 'date-fns';
import { Calendar } from './components/ui/calendar'
import Task from './components/own/task'

export default function App() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 8, 1))
    const [formatedDate, setFormatedDate] = useState<string>()


  //Afficher la date à chque fois qu'elle change -- debug
  useEffect(()=>{
    if (date instanceof Date){
      const new_date = format(date, 'yyyy-MM-dd');
      setFormatedDate(new_date)
    }
    
  },[date])

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
        flex items-center justify-center
        bg-gray-100 xl:min-h-0

      ">
        {/*<div className="text-gray-500 text-xl">
          Placeholder
        </div>*/}

        <Task/>
      </div>
    </section>
  )
}
