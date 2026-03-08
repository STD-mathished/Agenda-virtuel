import { useState } from "react";
import { Type, AlignLeft, Flag, CalendarCheck, Send, X } from "lucide-react";

interface TaskCreateProps {
    date: Date | undefined;
    onClose: () => void; 
}

export default function TaskCreate({ date, onClose }: TaskCreateProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(2);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onClose(); 
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300">
            
            {/* Modale */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Close btn*/}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                        Nouvelle Tâche
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Titre */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 ml-1 tracking-widest uppercase">
                            <Type className="w-3 h-3" /> Titre de la tâche
                        </label>
                        <input
                            required
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Acheter du pain..."
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 ml-1 tracking-widest uppercase">
                            <AlignLeft className="w-3 h-3" /> Description détaillée
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optionnel..."
                            rows={3}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none text-slate-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priorité */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 ml-1 tracking-widest uppercase">
                                <Flag className="w-3 h-3" /> Priorité
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(Number(e.target.value))}
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-bold text-slate-600"
                            >
                                <option value={1}>Faible</option>
                                <option value={2}>Normale</option>
                                <option value={3}>Haute</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 ml-1 tracking-widest uppercase">
                                <CalendarCheck className="w-3 h-3" /> Échéance
                            </label>
                            <div className="w-full p-4 bg-indigo-50 text-indigo-700 rounded-2xl font-bold border-2 border-indigo-100 text-center">
                                {date ? date.toLocaleDateString('fr-FR') : "Non définie"}
                            </div>
                        </div>
                    </div>

                    {/* Bouton d'action */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4"
                    >
                        {isSubmitting ? "Création..." : <><Send className="w-5 h-5" /> Enregistrer la tâche</>}
                    </button>
                </form>
            </div>
        </div>
    );
}