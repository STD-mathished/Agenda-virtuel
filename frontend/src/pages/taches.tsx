import { useEffect, useState } from "react"
import type { Tache } from "../types/taches"

export default function Taches() {
    const [taches, setTaches] = useState<Tache[]>([])

    useEffect(()=> {
        const fetchTask = async () => {
            const url = "http://127.0.0.1:8000/taches"
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
        <section>
            {taches.length === 0 ?(
                <p>Aucune taches</p>
            ) : (
                taches.map((tache, index) => (
                    <div key={tache.id ?? index}>
                        {tache.titre ?? "Aucun élément trouvé"}
                    </div>
                ))
            )}
        </section>
    )
}