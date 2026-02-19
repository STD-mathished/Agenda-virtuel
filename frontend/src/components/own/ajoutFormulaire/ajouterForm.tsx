import { useState } from "react";
import { useDateStore } from "@/hooks/dataStore";
import SendForm from "./sendForm";
import type { priorite } from "@/types/priorite";
import type { statut } from "@/types/statut";


const isPriorite = (v: string): v is priorite =>
  v === "Faible" || v === "Modérée" || v === "Urgente";

const isStatut = (v: string): v is statut =>
  v === "en_cours" || v === "terminee";

export default function AjouterForm() {
  const date = useDateStore((s) => s.date); 

  const [titre, setTitre] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [prio, setPrio] = useState<priorite>("Modérée");
  const [stat, setStat] = useState<statut>("En cours");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await SendForm({
      date,
      titre,
      description,
      priorite: prio,
      statut: stat,
    });

    if (result.ok) {
      alert("tache ajoutée avec succès")
    } else {
      console.log("une erreur est survenue")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <form
        onSubmit={handleSubmit}
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
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={prio}
            onChange={(e) => {
              const v = e.target.value;
              if (isPriorite(v)) setPrio(v); 
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
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
            value={stat}
            onChange={(e) => {
              const v = e.target.value;
              if (isStatut(v)) setStat(v); // ✅ typage sûr
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
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
  );
}
