export type SubmissionPreview = {
  block: number;
  point: number;
  problem: string;
  solution: string;
  timestamp: string;
  txHash: string;
  version: number;
  user: string;
};

export type SubmissionListPreview = {
  total: number;
  submissions: SubmissionPreview[];
};
