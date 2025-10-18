import type { Tache } from "@/types/taches";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import BadgePriorite from "./badge";
import BadgeTermine from "./badgeTermine";
import AjoutTache from "./ajoutTache";
import { Link } from "react-router";

export default function Task({ date }: { date: Date }) {
  const [taches, setTaches] = useState<Tache[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const url = `http://127.0.0.1:8000/taches/${formattedDate}`;
        const result = await fetch(url);

        if (!result.ok) {
          throw new Error(result.statusText);
        }

        const data: Tache[] = await result.json();
        setTaches(data);
      } catch (error) {
        console.error("Erreur lors du fetch des tâches :", error);
        setTaches([]); 
      }
    };

    if (date instanceof Date) {
      fetchTask();
    }
  }, [date]);

  return (
    <div className="w-full h-screen overflow-y-auto ">
      {taches.length === 0 ? (
        <AjoutTache/>
      ) : (
        taches.map((tache, index) => (
          <div key={tache.id ?? index} className="p-3 rounded bg-gray-200 min-w-xl border-b-2 border-white flex flex-col ">
            <div className="flex gap-2">
              <p className="font-bold">titre:</p> {tache.titre ?? "Aucun élément trouvé"}
            </div>
            <div className="flex gap-2">
              <p className="font-bold">description:</p> {tache.description ?? "Aucun élément trouvé"}
            </div>
            <div className="flex gap-2">
              <p className="font-bold">date de création:</p> {tache.date_creation ?? "Aucun élément trouvé"}
            </div>
            <div className="flex gap-2">
              <p className="font-bold">date d'échéance:</p> {tache.date_echeance ?? "Aucun élément trouvé"}
            </div>
            <div className="flex gap-2 items-center ">
              <p className="font-bold">priorité:</p> { <BadgePriorite priorite={tache.priorite }/>}
            </div>
            <div className="flex gap-2 items-center mt-2">
              <p className="font-bold">statut:</p> {<BadgeTermine statut={tache.est_termine}/>}
            </div>
            <div 
                className="self-end hover:scale-105 transition duration-300"
            >
                <Link 
                    to={"/editer"} 
                    className="pl-3 pr-3 pt-2 pb-2 bg-yellow-400 rounded"
                >
                    Editer
                </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}