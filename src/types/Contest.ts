export type ContestPreview = {
  id: number;
  name: string;
  description: string;
  title: string;
  problems: number[];
};

export type ContestListResponse = {
  total: number;
  contests: ContestPreview[];
};
