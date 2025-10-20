import type { priorite } from "@/types/priorite";
import type { statut } from "@/types/statut";

export type ApiTaskCreate = {
  titre: string;
  description?: string | null;
  date_echeance?: string | null; 
  priorite?: number;             
  est_termine?: boolean;
};

export type ApiTask = {
  id: string;
  titre: string;
  description: string | null;
  date_creation: string;    
  date_echeance: string | null; 
  priorite: number;
  est_termine: boolean;
};

export type SendFormArgs = {
  date: Date | string | null |  undefined;
  titre: string;
  description: string; 
  priorite: priorite; 
  statut: statut;   
};