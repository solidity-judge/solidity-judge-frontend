export type ContestPreview = {
  id: number;
  name: string;
  description: string;
  title: string;
  deadline: number;
  problems: number[];
};

export type ContestListResponse = {
  total: number;
  contests: ContestPreview[];
};

export type Submission = {
  point: number;
  timestamp: string;
  solution: string;
};

export type Ranking = {
  contestant: string;
  address: string;
  submissions: (Submission | null)[];
  totalPoints: number;
};

export type Standings = {
  total: number;
  ranking: Ranking[];
};