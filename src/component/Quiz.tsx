import { useState } from "react";
import { QUESTIONS } from "./questions";
import type { AnswerOption } from "./questions";

import { computeNIRDProfile } from "./quizz";
import type { ProfileKey } from "./quizz";

import "./quizz.css";

type QuizProps = {
  onComplete?: () => void;
};

const PROFILE_TEXTS: Record<
  ProfileKey,
  { title: string; description: string; suggestions: string[] }
> = {
  numerique: {
    title: "Priorité : renforcer ton profil Numérique",
    description:
      "Tes réponses montrent que tu laisses beaucoup les outils, les réglages par défaut et les autres décider pour toi. Ça te rend très dépendant·e et ça peut vite te bloquer (ordinateur lent, logiciel imposé, cloud obligatoire…). Il est vraiment conseillé que tu te concentres sur la thématique « Numérique » pour reprendre la main sur tes outils.",
    suggestions: [
      "Commencer par la page « Numérique » : comprendre les bases (système, logiciels, sauvegardes) et tes dépendances actuelles.",
      "Identifier au moins 2 outils que tu subis aujourd’hui (Windows, Google, etc.) et voir quelles alternatives libres existent.",
      "Mettre en place une petite routine d’autonomie : tester un logiciel libre, apprendre à installer/configurer un outil sans appeler quelqu’un à la rescousse.",
    ],
  },
  inclusif: {
    title: "Priorité : consolider ton profil Inclusif",
    description:
      "Tes réponses laissent penser que le numérique peut vite te mettre en difficulté ou te faire sentir « à côté » : besoin d’aide fréquente, tutoriels difficiles à comprendre, blocages récurrents… Il est recommandé que tu te concentres d’abord sur la thématique « Inclusif » pour sécuriser tes usages et ne pas te retrouver exclu·e par les outils.",
    suggestions: [
      "Aller sur la page « Inclusif » pour voir comment être mieux accompagné·e (pas à pas, tutoriels accessibles, vocabulaire expliqué).",
      "Repérer ce qui te bloque le plus aujourd’hui (jargon, interfaces compliquées, manque de temps…) et chercher des solutions adaptées.",
      "Te donner le droit d’apprendre à ton rythme : transformer chaque difficulté en mini-objectif (comprendre une fonction, un bouton, une action).",
    ],
  },
  responsable: {
    title: "Priorité : travailler ton profil Responsable",
    description:
      "Tes réponses montrent une forte dépendance aux solutions des grandes plateformes (clouds, logiciels propriétaires, services par défaut). Ce n’est pas neutre : tu laisses tes données, tes habitudes et parfois même tes choix pédagogiques entre leurs mains. Il est conseillé de te concentrer sur la thématique « Responsable » pour reprendre du contrôle sur tes usages numériques.",
    suggestions: [
      "Visiter la page « Responsable » pour comprendre les enjeux : données, traçage, dépendance aux GAFAM, souveraineté numérique.",
      "Identifier les services Big Tech que tu utilises sans réfléchir (Drive, Docs, Teams, iCloud, etc.) et voir où tu pourrais diversifier.",
      "Commencer par un petit geste concret : tester un moteur de recherche alternatif, un cloud libre ou un service auto-hébergé de ton établissement.",
    ],
  },
  durable: {
    title: "Priorité : renforcer ton profil Durable",
    description:
      "Tes réponses signalent des réflexes qui renforcent l’obsolescence : changer vite de matériel, peu de réemploi, peu de sobriété numérique. À terme, ça coûte cher (en budget, en énergie, en matériel jeté) et ça alimente un modèle peu soutenable. Il est recommandé que tu te concentres sur la thématique « Durable » pour faire évoluer ces pratiques.",
    suggestions: [
      "Aller sur la page « Durable » pour comprendre l’impact réel de tes usages (matériel, stockage, vidéos, renouvellement…).",
      "Te fixer un objectif concret : prolonger la vie d’un appareil (nettoyage, mise à jour, installation d’un système plus léger, réparation).",
      "Réfléchir à tes prochains achats : est-ce que tu peux réparer, emprunter, mutualiser ou passer par du reconditionné plutôt que racheter neuf ?",
    ],
  },
};




export default function Quiz({ onComplete }: QuizProps) {

  const handleSubmit = () => {
    if (!allAnswered) return;
    const typedAnswers = answers as AnswerOption[];
    const res = computeNIRDProfile(typedAnswers);
    setResult(res);
    setSubmitted(true);
  };



  const [answers, setAnswers] = useState<(AnswerOption | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] =
    useState<ReturnType<typeof computeNIRDProfile> | null>(null);

  const allAnswered = answers.every((a) => a !== null);

  const handleAnswerChange = (qIndex: number, value: AnswerOption) => {
    const copy = [...answers];
    copy[qIndex] = value;
    setAnswers(copy);
    setSubmitted(false);
    setResult(null);
  };

  // const handleSubmit = () => {
  //   if (!allAnswered) return;
  //   const typed = answers as AnswerOption[];
  //   const r = computeNIRDProfile(typed);
  //   setResult(r);
  //   setSubmitted(true);
  // };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz NIRD</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="quiz-form"
      >
        {QUESTIONS.map((q, i) => (
          <div key={q.id} className="question-card">
            <h2>
              {i + 1}. {q.text}
            </h2>

            <div className="options">
              {q.options.map((opt) => (
                <label key={opt.value} className="option">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt.value}
                    checked={answers[i] === opt.value}
                    onChange={() => handleAnswerChange(i, opt.value)}
                  />
                  <span className="option-letter">{opt.value}.</span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="quiz-actions">
          <button type="submit" disabled={!allAnswered}>
            Voir mon profil
          </button>
          <button type="button" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </form>

{submitted && result && (
  <div className="result-card">
    <div className="result-details">
      <h3>{PROFILE_TEXTS[result.profilKey].title}</h3>
      <p>{PROFILE_TEXTS[result.profilKey].description}</p>
      <ul>
        {PROFILE_TEXTS[result.profilKey].suggestions.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
    </div>

    {/* Nouveau bloc : bouton pour passer à la suite */}
    {onComplete && (
      <div className="quiz-next">
        <button type="button" onClick={onComplete}>
          Aller à la page suivante
        </button>
      </div>
    )}
  </div>
)}






    </div>
  );
}
