import type { CreateChoice } from "@/types/create-menu"
import { useState } from "react"
import { ClipboardList, Tag, Calendar } from "lucide-react"
import TaskCreate from "../task/task-create"
import CategoryCreate from "../category/category-create"

export default function CreateMenu({ date }: { date: Date | undefined }) {
    const [choice, setChoice] = useState<CreateChoice>(undefined)

    const handleClose = () => setChoice(undefined)
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-6">
                Nouvel ajout
            </h2>

            {/* Affichage de la date sélectionnée */}
            {date && (
                <div className="mb-8 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <p className="text-sm text-indigo-700 font-semibold">
                        Pour le : {date.toLocaleDateString('fr-FR')} 
                    </p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-10">
                {/* Bouton Tâche */}
                <button
                    onClick={() => setChoice('task')}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 
                        ${choice === 'task' 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md ring-4 ring-indigo-500/10' 
                            : 'border-slate-100 hover:border-indigo-200 text-slate-500 hover:bg-slate-50'}`}
                >
                    <ClipboardList className={`w-8 h-8 transition-transform group-hover:scale-110 ${choice === 'task' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="font-bold">Une tâche</span>
                </button>

                {/* Bouton Catégorie */}
                <button
                    onClick={() => setChoice('category')}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 
                        ${choice === 'category' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md ring-4 ring-emerald-500/10' 
                            : 'border-slate-100 hover:border-emerald-200 text-slate-500 hover:bg-slate-50'}`}
                >
                    <Tag className={`w-8 h-8 transition-transform group-hover:scale-110 ${choice === 'category' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="font-bold">Une catégorie</span>
                </button>
            </div>

            {/* Zone de contenu dynamique */}
            <div className="min-h-[120px] flex items-center justify-center border-t border-slate-100 pt-8">
                {!choice && (
                    <div className="text-center space-y-2">
                        <p className="text-slate-400 text-sm font-medium italic">Choisissez une option pour continuer</p>
                    </div>
                )}

                {choice === 'task' && (
                    <TaskCreate date={date} onClose={handleClose}/>
                )}

                {choice === 'category' && (
                    <CategoryCreate/>
                )}
            </div>
        </div>
    )
}