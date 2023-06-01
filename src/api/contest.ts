import { ContestListResponse, Standings } from "types/Contest";

export async function getContests(
  pageNumber: number
): Promise<ContestListResponse> {
  const res = await fetch(
    process.env.REACT_APP_BACKEND_URL +
      "contests?" +
      new URLSearchParams({
        skip: ((pageNumber - 1) * 10).toString(),
      })
  );
  return await res.json();
}

export async function getStandings(
  contestId: number,
  pageNumber: number
): Promise<Standings> {
  const res = await fetch(
    process.env.REACT_APP_BACKEND_URL +
      `contests/${contestId}/ranking?` +
      new URLSearchParams({
        skip: ((pageNumber - 1) * 10).toString(),
      })
  );
  return await res.json();
}
