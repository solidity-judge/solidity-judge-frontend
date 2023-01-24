import { getProblems } from "api/problems";
import SolvedFilter from "components/Filter/SolvedFilter";
import ProblemList from "components/Problem/ProblemList";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setProblemList } from "redux/slices/problemList";

export default function ProblemsPage() {
  const problemList = useAppSelector((state) => state.problemList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const response = getProblems();
    response.then((data) => {
      dispatch(setProblemList(data));
    });
  }, [dispatch]);

  return (
    <div className="flex flex-row grow gap-3">
      <div className="flex flex-col grow-[3]">
        <ProblemList problemsList={problemList} />
      </div>
      <div className="flex flex-col grow max-w-sm">
        <SolvedFilter />
      </div>
    </div>
  );
}
