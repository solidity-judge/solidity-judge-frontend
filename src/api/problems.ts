import { Problem, ProblemPreviewList } from "types/Problem";

export function getProblems(): Promise<ProblemPreviewList> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "problems").then((res) =>
    res.json()
  );
}

export function getProblem(id: number): Promise<Problem> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "problems/" + id).then(
    (res) => res.json()
  );
}
