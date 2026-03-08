import { useState, useEffect } from "react";
import { Sparkles, Type, AlignLeft, Flag, Tag, CalendarCheck, Send, X, AlertCircle } from "lucide-react";
import { useKeycloak } from "@react-keycloak/web";
import { TaskAPI } from "@/services/task.service";
import { CategoryAPI } from "@/services/category.service";

interface TaskCreateProps {
    date: Date | undefined;
    onClose: () => void;
}

export default function TaskCreate({ date, onClose }: TaskCreateProps) {
    const { keycloak } = useKeycloak();
    
    // États du formulaire
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(2); // Défaut à 2
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    
    // États techniques
    const [categories, setCategories] = useState<{id: string, nom: string}[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Charger les catégories disponibles au montage
    useEffect(() => {
        const loadCategories = async () => {
            if (keycloak.token) {
                try {
                    const data = await CategoryAPI.getAll(keycloak.token);
                    setCategories(data);
                } catch (err: unknown) {
                    console.error("Échec du chargement des catégories", err);
                }
            }
        };
        loadCategories();
    }, [keycloak.token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = keycloak.token;
        if (!token) {
            setError("Session expirée. Veuillez vous reconnecter.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await TaskAPI.create(token, {
                titre: title.trim(),
                description: description.trim() || undefined,
                priorite: priority,
                date_echeance: date?.toISOString(),
                // On envoie l'ID de catégorie si sélectionné
                category_ids: selectedCategoryId ? [selectedCategoryId] : []
            });
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Une erreur est survenue lors de la création.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Fermeture */}
                <button onClick={onClose} className="absolute top-5 right-5 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="p-4 bg-indigo-100 rounded-2xl">
                        <Sparkles className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Nouvelle Tâche</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Titre */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <Type className="w-3 h-3" /> Titre
                        </label>
                        <input
                            required
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nommez votre tâche..."
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <AlignLeft className="w-3 h-3" /> Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Détails (optionnel)..."
                            rows={3}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priorité */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                <Flag className="w-3 h-3" /> Priorité
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(Number(e.target.value))}
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-bold text-slate-600 cursor-pointer"
                            >
                                <option value={1}>Faible</option>
                                <option value={2}>Normale</option>
                                <option value={3}>Haute 🔥</option>
                            </select>
                        </div>

                        {/* Catégorie */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                <Tag className="w-3 h-3" /> Catégorie
                            </label>
                            <select
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-bold text-slate-600 cursor-pointer"
                            >
                                <option value="">Aucune</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Échéance (Sécurisée) */}
                    <div className="p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-600">
                            <CalendarCheck className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Échéance</span>
                        </div>
                        <span className="font-bold text-indigo-700">
                            {date ? date.toLocaleDateString('fr-FR') : "Aujourd'hui"}
                        </span>
                    </div>

                    {/* Erreur */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 animate-in shake duration-300">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !title.trim()}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? "Création..." : <><Send className="w-5 h-5" /> Enregistrer la tâche</>}
                    </button>
                </form>
            </div>
        </div>
    );
}