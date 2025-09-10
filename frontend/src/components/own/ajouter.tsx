export default function AjouterForm() {
    return (
        <form 
            className="mt-8 border-black border w-[60vw] h-[80vh] p-4  flex flex-col gap-10"
        >
            {/* Titre */}
            <div 
                className="flex gap-2 flex-col "
            >
                <p
                    className="text-xl font-bold"
                >
                    Titre:
                </p>
                <input type="text" 
                    className="flex-3/4 font-semibold border border-black rounded outline-0 pl-2 hover:border-gray-400 min-h-[5vh]"
                />
            </div>

            {/* Desc */}
            <div 
                className="flex flex-col gap-2"
            >
                <p
                    className="text-xl font-bold"
                >
                    Description:
                </p>
                <textarea  
                    className="flex-3/4 pl-2 border border-black rounded outline-0  hover:border-gray-400 min-h-[20vh]"
                />
            </div>

            {/* priorité */}
            <div 
                className="flex gap-2"
            >
                <p
                    className="text-xl font-bold"
                >
                    Niveau de priorité:
                </p>
                <select  
                    className="flex-1/2 pl-2 border border-black rounded outline-0  hover:border-gray-400"
                >
                    <option value="dog">----Choisir une option----</option>
                    <option value="cat">Faible</option>
                    <option value="dog">Modéré</option>
                    <option value="cat">Urgent</option>
                </select>
            </div>

            {/* statut */}
            <div 
                className="flex gap-2"
            >
                <p
                    className="text-xl font-bold"
                >
                    Niveau de priorité:
                </p>
                <select  
                    className="flex-1/2 pl-2 border border-black rounded outline-0  hover:border-gray-400"
                >
                    <option value="dog">----Choisir une option----</option>
                    <option value="dog">En cours</option>
                    <option value="dog">Terminé</option>
                </select>
            </div>

            <div 
                className="self-end"
            >
                <button
                    className="p-2 rounded bg-blue-500 text-white font-bold transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-700"
                >
                    Envoyer
                </button>
            </div>
        </form>
    )
}