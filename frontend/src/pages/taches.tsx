import { useEffect, useState } from "react"
import type { Tache } from "../types/taches"
import { API_BASE } from "@/lib/api";

export default function Taches() {
    const [taches, setTaches] = useState<Tache[]>([])

    useEffect(()=> {
        const fetchTask = async () => {
            const url = `${API_BASE}/taches`
            const result = await fetch(url)

            if(!result.ok) {
                throw new Error(result.statusText);
            }
            
            const data: Tache[] = await result.json()
            setTaches(data)
        }

        fetchTask()
    },[]);
    return (
        <section className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-blue-500 to-purple-200 pt-10 pb-10">
            {taches.length === 0 ?(
                <p>Aucune taches</p>
            ) : (
                taches.map((tache, index) => (
                    <div 
                        key={tache.id ?? index} 
                        className="p-3 rounded bg-white min-w-xl"
                    >
                       <div className="flex gap-2">
                            <p className="font-bold">titre: </p> {tache.titre ?? "Aucun élément trouvé"}
                       </div>

                       <div className="flex gap-2">
                            <p className="font-bold">description: </p> {tache.description ?? "Aucun élément trouvé"}
                       </div>

                       <div className="flex gap-2">
                            <p className="font-bold">date de creation: </p> {tache.date_creation ?? "Aucun élément trouvé"}
                       </div>
                       <div className="flex gap-2">
                            <p className="font-bold">date d'échéance: </p> {tache.date_echeance ?? "Aucun élément trouvé"}
                       </div>

                       <div className="flex gap-2">
                            <p className="font-bold">priorité: </p> {tache.priorite ?? "Aucun élément trouvé"}
                       </div>
                       <div className="flex gap-2">
                            <p className="font-bold">statut: </p> {tache.est_termine ?? "Aucun élément trouvé"}
                       </div>
                    </div>
                ))
            )}
        </section>
    )
}