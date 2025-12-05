// src/pcComponents.ts

export interface PCComponent {
  id: string;
  label: string;
  x: number; // Position X du point de repère (basé sur image 1024x1024)
  y: number; // Position Y du point de repère (basé sur image 1024x1024)
}

export const components: PCComponent[] = [
  { id: "processeur", label: "Processeur", x: 475, y: 420 }, 
  { id: "ventilateur", label: "Ventilateur", x: 765, y: 518 },
  { id: "ram", label: "RAM", x: 561, y: 434 },
  { id: "carte-graphique", label: "Carte graphique", x: 434, y: 596 },
  { id: "blocAlim", label: "Bloc alimentation", x: 335, y: 801 }, 
  { id: "carte-mere", label: "Carte mère", x: 470, y: 513 },
  { id: "refroidisseur", label: "Refroidisseur", x: 369, y: 338 }, 
];