import { getContests } from "api/contest";
import ContestList from "components/Contest/ContestList";
import { useEffect, useReducer } from "react";
import { ContestPreview } from "types/Contest";

type PageState = {
  page: number;
  total: number;
  contests: ContestPreview[];
};
export default function ContestsPage() {
  const [state, dispatch] = useReducer(
    (state: PageState, newState: Partial<PageState>) => ({
      ...state,
      ...newState,
    }),
    { page: 1, total: 0, contests: [] }
  );

  useEffect(() => {
    (async () => {
      const data = await getContests(state.page);
      dispatch({ contests: data.contests, total: data.total });
    })();
  }, [state.page]);

  return (
    <>
      <div className="flex grow-[3] flex-col">
        <ContestList
          contests={state.contests}
          total={state.total}
          current={state.page}
          changePage={(page) => dispatch({ page })}
        />
      </div>
    </>
  );
}
