import axios from "axios";

import { API_URL } from "./constants";
import { Category } from "types/Category";

export async function getCategories(): Promise<Category[]> {
  const res = await axios.get(API_URL("categories"));
  return res.data;
}
