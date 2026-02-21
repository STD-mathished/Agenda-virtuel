import { useState } from "react";
import AjouterForm from "../formulaires/ajoutFormulaire/ajouterForm";

export default function AjoutTache() {
    const [openAddForm, setOpenAddForm] = useState<boolean>(false);

    function handleClick() {
        setOpenAddForm(!openAddForm);
    }

    return (
        /* Ce conteneur principal gère le centrage global */
        <div className="flex flex-col items-center justify-center h-full w-full">
            
            {!openAddForm ? (
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-medium text-gray-700">Aucune tâche, souhaitez-vous en ajouter ?</h2>
                    <button
                        onClick={handleClick} 
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition duration-300"
                    >
                        Oui
                    </button>
                </div>
            ) : (
                <div className="relative flex flex-col items-center justify-center w-full h-full bg-[#e5e7eb]"> 
                    
                    <button
                        onClick={handleClick}
                        className="absolute top-4 left-4 z-10 hover:scale-105 transition duration-300 border rounded bg-white px-4 py-2 text-gray-600 shadow-sm font-semibold"
                    >
                        ← Retour
                    </button>

                    <div className="w-full max-w-2xl">
                        <AjouterForm />
                    </div>
                </div>
            )}
        </div>
    );
}