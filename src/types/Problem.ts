export type ProblemPreview = {
  id: number;
  address: string;
  author: string;
  timestamp: string;
  title: string;
};

export type ProblemPreviewList = {
  total: number;
  itemsPerPage: number;
  page: number;
  problems: ProblemPreview[];
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
