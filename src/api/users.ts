import axios from "axios";

import { API_URL } from "./constants";

export async function getUsers() {
  const res = await axios.get(API_URL("users"));
  return res.data;
}
