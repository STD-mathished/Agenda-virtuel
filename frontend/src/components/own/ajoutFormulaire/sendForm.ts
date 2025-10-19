// envoi du formulaire
import type { priorite } from "@/types/priorite";
import { convertPriorite } from "./convertFunction";
import { convertStatut } from "./convertFunction";
import type { statut } from "@/types/statut";
import { useState } from "react";

export default function sendForm({date, titre, description, priorite, statut}: {date:Date, titre:string, description:string, priorite:priorite, statut:statut}) {
    const [newPriorite, setNewPriorite] = useState<number>();
    const [newStatut, setNewStatut] = useState<boolean>();

    setNewPriorite(convertPriorite(priorite));
    setNewStatut(convertStatut(statut));
    
}