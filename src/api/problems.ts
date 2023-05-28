import { CompilerResponse } from "types/CompilerResponse";
import { Problem, ProblemListResponse } from "types/Problem";

export async function getProblems(
  pageNumber: number,
  walletAddress: string,
  solvedFilter: boolean,
  category: string
): Promise<ProblemListResponse> {
  const res = await fetch(
    process.env.REACT_APP_BACKEND_URL +
      "problems?" +
      new URLSearchParams({
        skip: ((pageNumber - 1) * 10).toString(),
        user: walletAddress,
        filterSolved: solvedFilter.toString(),
        category: category,
      })
  );
  return await res.json();
}

export async function getContestProblems(
  contest: number
): Promise<ProblemListResponse> {
  const res = await fetch(
    process.env.REACT_APP_BACKEND_URL +
      "problems?" +
      new URLSearchParams({
        contest: contest.toString(),
      })
  );
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
