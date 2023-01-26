import { CompilerResponse } from "types/CompilerResponse";
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

export function compileCode(source: string): Promise<CompilerResponse> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "compile", {
    method: "POST",
    body: JSON.stringify({ source }),
  }).then((res) => res.json());
}
