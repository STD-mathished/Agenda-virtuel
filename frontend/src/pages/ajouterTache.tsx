import AjouterForm from "@/components/own/ajoutFormulaire/ajouterForm";
import Header from "@/components/own/header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";



export default function AjouterTache() {
    const navigate = useNavigate();
    const handleRetour = () => {
        navigate(-1); 
  };
    return (
    <>
        <Header/>
        <button
          onClick={handleRetour}
          className="flex items-center gap-2 px-4 py-2 rounded-lg 
                     bg-gray-100 border border-gray-300 text-gray-700 font-semibold 
                     transition-all duration-200 hover:bg-gray-200 hover:scale-105 
                     active:scale-95 shadow-sm"
        >
          <ArrowLeft size={18} />
          Retourner en arrière
        </button>
        <main className="h-[90vh] flex justify-center">
            <AjouterForm/>
        </main>
        
    </>
    )

}