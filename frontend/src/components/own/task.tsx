import type { Tache } from "@/types/taches";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
        setTaches([]); // optionnel : vide la liste en cas d'erreur
      }
    };

    if (date instanceof Date) {
      fetchTask();
    }
  }, [date]);

  return (
    <div className="w-full h-screen overflow-y-auto">
      {taches.length === 0 ? (
        <p>Aucune tâche</p>
      ) : (
        taches.map((tache, index) => (
          <div key={tache.id ?? index} className="p-3 rounded bg-white min-w-xl">
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
            <div className="flex gap-2">
              <p className="font-bold">priorité:</p> {tache.priorite ?? "Aucun élément trouvé"}
            </div>
            <div className="flex gap-2">
              <p className="font-bold">statut:</p> {tache.est_termine ?? "Aucun élément trouvé"}
            </div>
          </div>
        ))
      )}
    </div>
  );
}