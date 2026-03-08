import { useState } from "react";
import { Tag, Send, AlertCircle } from "lucide-react";
import { useKeycloak } from "@react-keycloak/web"; // 🔑 Importe ton hook d'auth
import { CategoryAPI } from "@/services/category.service"; // 🛠️ Importe ton service

interface CategoryCreateProps {
    onClose: () => void;
}

export default function CategoryCreate({ onClose }: CategoryCreateProps) {
    const { keycloak } = useKeycloak(); 
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        const token = keycloak.token;
        if (!token) {
            setError("Vous n'êtes pas authentifié.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await CategoryAPI.create(token, name.trim());
            onClose();
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la création.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-md bg-white rounded-3xl p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ... (Header et bouton X inchangés) */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase">
                            <Tag className="w-3 h-3" /> Nom de la catégorie
                        </label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 animate-in shake duration-300">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !name.trim()}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? "Création en cours..." : <><Send className="w-5 h-5" /> Créer la catégorie</>}
                    </button>
                </form>
            </div>
        </div>
    );
}