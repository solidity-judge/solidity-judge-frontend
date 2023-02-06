export type ProblemPreview = {
  id: number;
  address: string;
  author: string;
  timestamp: string;
  title: string;
  solved: boolean;
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
