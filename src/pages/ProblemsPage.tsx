import { useConnectWallet } from "@web3-onboard/react";
import { getCategories } from "api/categories";
import { getProblems } from "api/problems";
import SolvedFilter from "components/Filter/SolvedFilter";
import ProblemList from "components/Problem/ProblemList";
import React from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setProblemList, setSolvedFilter } from "redux/slices/problemList";
import { setSelectedPage } from "redux/slices/selectedPage";
import { Category } from "types/Category";

export default function ProblemsPage() {
  const [{ wallet }] = useConnectWallet();
  const problemList = useAppSelector((state) => state.problemList);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const solvedFilter = useAppSelector(
    (state) => state.problemList.solvedFilter
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPage({ id: "problems", name: "Problems" }));
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    const response = getProblems(
      currentPage,
      wallet?.accounts ? wallet.accounts[0].address : "",
      solvedFilter,
      selectedCategory
    );
    response.then((data) => {
      dispatch(
        setProblemList({
          total: data.total,
          solvedFilter: solvedFilter,
          pages: {
            ...problemList.pages,
            [currentPage]: data.problems,
          },
        })
      );
    });
  }, [currentPage, dispatch, wallet, solvedFilter, selectedCategory]);

  const solvedFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSolvedFilter(e.target.checked));
  };

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
        <div className="rounded-md border">
          <div className="border-b px-3 py-2 font-medium">FILTER PROBLEMS</div>
          <div className="flex flex-col gap-3 py-3 px-5">
            <SolvedFilter value={solvedFilter} onChange={solvedFilterChange} />
            <div className="mt-3">
              <div className="text-sm text-gray-600">Category</div>
              <select
                className="w-full rounded-md py-1 px-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option value={category.key} key={category.key}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
