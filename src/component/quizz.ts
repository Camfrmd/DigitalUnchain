import type { AnswerOption } from "./questions";

export type ProfileKey = "numerique" | "inclusif" | "responsable" | "durable";

export function computeNIRDProfile(answers: AnswerOption[]) {
  const score: Record<ProfileKey, number> = {
    numerique: 0,
    inclusif: 0,
    responsable: 0,
    durable: 0,
  };

  // Q1
  switch (answers[0]) {
    case "A": score.durable += 2; score.responsable += 1; break;
    case "B": score.numerique += 2; break;
    case "C": score.numerique += 1; score.responsable += 1; break;
    case "D": score.durable += 1; break;
  }

  // Q2
  switch (answers[1]) {
    case "A": score.responsable += 2; break;
    case "B": score.durable += 1; break;
    case "C": score.responsable += 1; score.numerique += 1; break;
    case "D": score.responsable += 1; break;
  }

  // Q3
  switch (answers[2]) {
    case "A": score.responsable += 2; break;
    case "B": score.responsable += 1; break;
    case "C": score.numerique += 1; score.responsable += 1; break;
    case "D": score.numerique += 2; break;
  }

  // Q4
  switch (answers[3]) {
    case "A": score.durable += 2; break;
    case "B": score.durable += 1; break;
    case "C": score.durable += 1; score.responsable += 1; break;
    case "D": score.durable += 1; score.responsable += 1; break;
  }

  // Q5
  switch (answers[4]) {
    case "A": score.numerique += 2; score.inclusif += 1; break;
    case "B": score.numerique += 1; score.inclusif += 1; break;
    case "C": score.numerique += 1; break;
    case "D": score.inclusif += 2; break;
  }

  const keyMap = {
    numerique: "Numérique",
    inclusif: "Inclusif",
    responsable: "Responsable",
    durable: "Durable",
  };

  const bestKey = (Object.keys(score) as ProfileKey[]).reduce((a, b) =>
    score[b] > score[a] ? b : a
  );

  return { profilKey: bestKey, profilLabel: keyMap[bestKey], scores: score };
}
