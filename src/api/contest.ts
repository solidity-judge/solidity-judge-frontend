import { ContestListResponse } from "types/Contest";

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
