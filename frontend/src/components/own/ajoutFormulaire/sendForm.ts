import type { ApiTaskCreate, ApiTask, SendFormArgs} from "@/types/sendForm"
import { convertPriorite, convertStatut } from "./convertFunction";



const API_BASE =
  "http://localhost:8000"; // utiliser un .env

function toIsoOrNull(d: Date | string | null | undefined): string | null {
  if (d == null) return null; 
  const dt = d instanceof Date ? d : new Date(d);
  return isNaN(dt.getTime()) ? null : dt.toISOString();
}


export default async function SendForm({
  date,
  titre,
  description,
  priorite,
  statut,
}: SendFormArgs): Promise<{ ok: true; data: ApiTask } | { ok: false; error: string }> {
  // conversions de convertFunctio
  const prioriteNum = convertPriorite(priorite);  
  const estTermine  = convertStatut(statut);      


  const titreTrim = (titre ?? "").trim();
  if (!titreTrim) {
    return { ok: false, error: "Le titre est requis." };
  }
  if (prioriteNum != null && (prioriteNum < 1 || prioriteNum > 3)) {
    return { ok: false, error: "La priorité doit être comprise entre 1 et 3." };
  }

  const payload: ApiTaskCreate = {
    titre: titreTrim,
    description: description ?? null, 
    date_echeance: toIsoOrNull(date),                   
    priorite: prioriteNum,
    est_termine: estTermine,
  };

  try {
    const res = await fetch(`${API_BASE}/taches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let detail = "";
      try {
        const body = await res.json();
        detail = body?.detail ?? JSON.stringify(body);
      } catch {
        detail = await res.text();
      }
      const msg = detail || `Erreur API (${res.status})`;
      return { ok: false, error: msg };
    }

    const created: ApiTask = await res.json();
    return { ok: true, data: created };
  } catch (e: unknown) {
  if (e instanceof Error) {
    return { ok: false, error: e.message };
  }
  return { ok: false, error: "Échec de la requête." };
}
}
