import axios from "axios";

import { API_URL } from "./constants";

export async function getSubmissions() {
  const res = await axios.get(API_URL("submissions"));
  return res.data;
}

export async function getSubmissionsByProblem(
  address: string,
  skip: number = 0,
  limit: number = 10
) {
  const res = await axios.get(API_URL("submissions"), {
    params: {
      skip,
      limit,
      problem: address,
    },
  });

  return res.data;
}
