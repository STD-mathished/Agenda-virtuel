export default function AjouterForm() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <form 
                className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-8 border border-gray-200"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Ajouter une nouvelle tâche
                </h2>

                {/* Titre */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="titre" className="text-lg font-semibold text-gray-700">
                        Titre
                    </label>
                    <input 
                        id="titre"
                        type="text"
                        placeholder="Ex : Faire les courses"
                        className="border border-gray-300 rounded-lg px-3 py-2 font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-lg font-semibold text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Ajoute une description de ta tâche..."
                        className="border border-gray-300 rounded-lg px-3 py-2 min-h-[120px] font-medium outline-none resize-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Priorité */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="priorite" className="text-lg font-semibold text-gray-700">
                        Niveau de priorité
                    </label>
                    <select
                        id="priorite"
                        className="border border-gray-300 rounded-lg px-3 py-2 font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">-- Choisir une option --</option>
                        <option value="faible">Faible</option>
                        <option value="moderee">Modérée</option>
                        <option value="urgente">Urgente</option>
                    </select>
                </div>

                {/* Statut */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="statut" className="text-lg font-semibold text-gray-700">
                        Statut de la tâche
                    </label>
                    <select
                        id="statut"
                        className="border border-gray-300 rounded-lg px-3 py-2 font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">-- Choisir une option --</option>
                        <option value="en_cours">En cours</option>
                        <option value="terminee">Terminée</option>
                    </select>
                </div>

                {/* Bouton */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-200 hover:bg-blue-700 hover:scale-105 shadow-md"
                    >
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    )
}
