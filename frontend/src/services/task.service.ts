import { BASE_URL, getHeaders } from "./api.config";

export interface CreateTaskData {
    titre: string;
    description?: string;
    priorite?: number;
    date_echeance?: string;
}

export class TaskAPI {
    /**
     * Crée une nouvelle tâche
     */
    static async create(token: string, taskData: CreateTaskData) {
        const response = await fetch(`${BASE_URL}/taches/`, {
            method: "POST",
            headers: getHeaders(token),
            body: JSON.stringify(taskData),
        });

        if (!response.ok) throw new Error("Erreur lors de la création de la tâche");
        return response.json();
    }

    /**
     * Récupère les tâches pour une date spécifique
     */
    static async getByDate(token: string, dateIso: string) {
        const response = await fetch(`${BASE_URL}/taches/date/${dateIso}`, {
            headers: getHeaders(token),
        });

        if (!response.ok) throw new Error("Erreur de récupération des tâches");
        return response.json();
    }
}