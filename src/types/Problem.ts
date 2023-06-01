import { Category } from "./Category";

export type ProblemPreview = {
  id: number;
  address: string;
  author: string;
  timestamp: string;
  title: string;
  solved: boolean;
  categories: Category[];
};

export type ProblemPreviewList = {
  total: number;
  solvedFilter: boolean;
  pages: {
    [pageId: string]: ProblemPreview[];
  };
};

export type Problem = ProblemPreview & {
  block: number;
  checker: string;
  deadline: number;
  isWhitelisted: boolean;
  txHash: string;
  description: string;
  gasLimit: number;
  inputFormat: string[];
  outputFormat: string[];
};

export type ProblemListResponse = {
  total: number;
  problems: ProblemPreview[];
};
