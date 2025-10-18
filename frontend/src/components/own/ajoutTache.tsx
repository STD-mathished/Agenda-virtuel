import { Link } from "react-router";

export default function AjoutTache() {
    return (
        <div 
            className="flex flex-col items-center justify-center h-full"
        >
            <h2>Aucune tâche, souhaitez vous en ajouter ?</h2>
            <div
                className="flex gap-2"
            >
                <Link 
                    to={"/ajouter"}
                    className="pl-4 pr-4 pt-2 pb-2 bg-blue-400 rounded hover:scale-105 transition duration-400 ease-in-out "
                >
                    Oui
                </Link>
            </div>
        </div>
    )
}