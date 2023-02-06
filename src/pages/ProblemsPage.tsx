import { useConnectWallet } from "@web3-onboard/react";
import { getProblems } from "api/problems";
import SolvedFilter from "components/Filter/SolvedFilter";
import ProblemList from "components/Problem/ProblemList";
import React from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setProblemList } from "redux/slices/problemList";
import { setSelectedPage } from "redux/slices/selectedPage";

export default function ProblemsPage() {
  const [{wallet}] = useConnectWallet();
  const problemList = useAppSelector((state) => state.problemList);
  const [currentPage, setCurrentPage] = React.useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPage({ id: "problems", name: "Problems" }));
  });

  useEffect(() => {
    const response = getProblems(currentPage, wallet?.accounts ? wallet.accounts[0].address : "");
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
  }, [currentPage, dispatch, wallet]);

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
