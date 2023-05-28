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
