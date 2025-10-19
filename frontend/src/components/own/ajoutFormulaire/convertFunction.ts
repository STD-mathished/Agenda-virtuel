//converti les inputs en données recevables par la bdd
import type { priorite } from "@/types/priorite";
import type { statut } from "@/types/statut";

export function convertPriorite(lvlPriorite:priorite) {
    // traduit en champ accessible pour la bd
    if(lvlPriorite === "Faible") {
        return 1;
    }
    if(lvlPriorite === "Modérée") {
        return 2;
    }
    else {
        return 3;
    }
}

export function convertStatut(lvlStatut:statut) {
    // traduit en champ accessible pour la bd
    if(lvlStatut === "En cours") {
        return false;
    }
    else {
        return true;
    }
}