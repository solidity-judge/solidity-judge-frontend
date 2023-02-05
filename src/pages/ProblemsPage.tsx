import { getProblems } from "api/problems";
import SolvedFilter from "components/Filter/SolvedFilter";
import ProblemList from "components/Problem/ProblemList";
import React from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setProblemList } from "redux/slices/problemList";

export default function ProblemsPage() {
  const problemList = useAppSelector((state) => state.problemList);
  const [currentPage, setCurrentPage] = React.useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const response = getProblems(currentPage);
    response.then((data) => {
      dispatch(
        setProblemList({
          total: data.total,
          pages: {
            ...problemList.pages,
            [currentPage]: data.problems,
          },
        })
      );
    });
  }, [currentPage, dispatch]);

  return (
    <div className="flex grow flex-row gap-3">
      <div className="flex grow-[3] flex-col">
        <ProblemList
          problems={problemList.pages[currentPage]}
          total={problemList.total}
          current={currentPage}
          changePage={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
      <div className="flex max-w-sm grow flex-col">
        <SolvedFilter />
      </div>
    </div>
  );
}
