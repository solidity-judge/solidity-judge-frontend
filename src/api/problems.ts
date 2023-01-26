import { CompilerResponse } from "types/CompilerResponse";
import { Problem, ProblemPreviewList } from "types/Problem";

export async function getProblems(): Promise<ProblemPreviewList> {
  const res = await fetch(process.env.REACT_APP_BACKEND_URL + "problems");
  return await res.json();
}

export async function getProblem(id: number): Promise<Problem> {
  const res = await fetch(process.env.REACT_APP_BACKEND_URL + "problems/" + id);
  return await res.json();
}

export async function compileCode(source: string): Promise<CompilerResponse> {
  const res = await fetch(process.env.REACT_APP_BACKEND_URL + "compile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: source,
    }),
  });
  return await res.json();
}
