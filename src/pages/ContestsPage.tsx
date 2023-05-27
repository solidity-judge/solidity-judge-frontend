import { getContests } from "api/contest";
import ContestList from "components/Contest/ContestList";
import { useEffect, useReducer } from "react";
import { useAppDispatch } from "redux/hooks";
import { setSelectedPage } from "redux/slices/selectedPage";
import { ContestPreview } from "types/Contest";

type PageState = {
  page: number;
  total: number;
  contests: ContestPreview[];
};
export default function ContestsPage() {
  const dispatch = useAppDispatch();
  const [state, setState] = useReducer(
    (state: PageState, newState: Partial<PageState>) => ({
      ...state,
      ...newState,
    }),
    { page: 1, total: 0, contests: [] }
  );

  useEffect(() => {
    dispatch(setSelectedPage({ id: "contests", name: "Contests" }));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await getContests(state.page);
      setState({ contests: data.contests, total: data.total });
    })();
  }, [state.page]);

  return (
    <>
      <div className="flex grow-[3] flex-col">
        <ContestList
          contests={state.contests}
          total={state.total}
          current={state.page}
          changePage={(page) => setState({ page })}
        />
      </div>
    </>
  );
}
