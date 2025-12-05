export type AnswerOption = "A" | "B" | "C" | "D";

export type Question = {
  id: number;
  text: string;
  options: { value: AnswerOption; label: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Quand ton ordinateur devient lent, tu fais quoi ?',
    options: [
      { value: "A", label: 'J’en achète (ou fais acheter) un autre.' },
      { value: "B", label: 'Je demande à quelqu’un de "réinstaller Windows".' },
      { value: "C", label: 'Je cherche une solution en ligne ou je tente une alternative libre.' },
      { value: "D", label: 'Je prolonge son usage : nettoyage, mise à jour, ou passage à Linux.' },
    ],
  },
  {
    id: 2,
    text: "Pour sauvegarder mes fichiers, j’utilise surtout…",
    options: [
      { value: "A", label: "Google Drive / OneDrive / iCloud par défaut." },
      { value: "B", label: "Une clé USB ou un disque dur… quand j’y pense." },
      { value: "C", label: "Un cloud libre (ex : Nextcloud) ou un serveur local de l’établissement." },
      { value: "D", label: "Plusieurs solutions selon le contexte (j’essaie de diversifier)." },
    ],
  },
  {
    id: 3,
    text: "Quand j’ai besoin d’un logiciel, je fais comment ?",
    options: [
      { value: "A", label: "Je prends le premier logiciel propriétaire que tout le monde utilise." },
      { value: "B", label: "Je cherche une version gratuite… même si je ne comprends pas trop la licence." },
      { value: "C", label: "Je compare avec des logiciels libres." },
      { value: "D", label: "Je privilégie les outils libres / open source." },
    ],
  },
  {
    id: 4,
    text: "Pour réduire mon impact numérique, je…",
    options: [
      { value: "A", label: "Je n’y pense pas vraiment." },
      { value: "B", label: "Je fais quelques efforts mais je ne sais pas quoi faire." },
      { value: "C", label: "Je pratique la sobriété numérique (tri, nettoyage, réemploi)." },
      { value: "D", label: "J’accompagne d’autres personnes sur ces sujets." },
    ],
  },
  {
    id: 5,
    text: "Quand je suis bloqué avec un outil numérique…",
    options: [
      { value: "A", label: "Je dépends totalement du technicien / d’un ami." },
      { value: "B", label: "Je cherche un tuto mais je ne comprends pas tout." },
      { value: "C", label: "J’aime apprendre petit à petit et gagner en autonomie." },
      { value: "D", label: "Je comprends vite et j’aide parfois les autres." },
    ],
  },
];
