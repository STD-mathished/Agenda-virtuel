// src/services/category.service.ts
import { BASE_URL, getHeaders } from "./api.config";

export class CategoryAPI {
    /**
     * Récupère toutes les catégories de l'utilisateur connecté
     */
    static async getAll(token: string) {
        const response = await fetch(`${BASE_URL}/categories/`, {
            headers: getHeaders(token),
        });
        
        if (!response.ok) throw new Error("Impossible de charger les catégories");
        return response.json();
    }

    /**
     * Crée une nouvelle catégorie
     */
    static async create(token: string, nom: string) {
        const response = await fetch(`${BASE_URL}/categories/`, {
            method: "POST",
            headers: getHeaders(token),
            body: JSON.stringify({ nom }), 
        });

        if (response.status === 400) throw new Error("Cette catégorie existe déjà");
        if (!response.ok) throw new Error("Erreur lors de la création");
        
        return response.json();
    }
}