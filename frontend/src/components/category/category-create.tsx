import { useState } from "react";
import { Tag, Send, X } from "lucide-react";

interface CategoryCreateProps {
    onClose: () => void; 
}

export default function CategoryCreate({ onClose }: CategoryCreateProps) {
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        console.log("Envoi de la catégorie :", { nom: name });
        
        setTimeout(() => {
            setIsSubmitting(false);
            onClose(); 
        }, 1000);
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300"
            onClick={onClose}
        >

            <div 
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Bouton de fermeture */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                        Nouvelle Catégorie
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Champ Nom */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 ml-1 tracking-widest uppercase">
                            <Tag className="w-3 h-3" /> Nom de la catégorie
                        </label>
                        <input
                            required
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Travail, Loisirs, Santé..."
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                        />
                        <p className="text-[10px] text-slate-400 ml-1">
                            L'unicité du nom est gérée par utilisateur.
                        </p>
                    </div>

                    {/* Affichage d'erreur éventuelle */}
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Bouton de validation */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !name.trim()}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4"
                    >
                        {isSubmitting ? "Création..." : <><Send className="w-5 h-5" /> Créer la catégorie</>}
                    </button>
                </form>
            </div>
        </div>
    );
}