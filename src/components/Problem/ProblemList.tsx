import ProblemCard from "components/Problem/ProblemCard";
import React from "react";
import { ProblemPreview } from "types/Problem";

export default function ProblemList({
  problems,
  total,
  current,
  changePage,
}: {
  problems: ProblemPreview[];
  total: number;
  current: number;
  changePage: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / 10);
  const pageNumbers: number[] = []; // [1, 2, ..., current - 2, current - 1, current, current + 1, current + 2, ..., totalPages - 1, totalPages]
  for (let i = 0; i < totalPages; i++) {
    if (
      i === 0 ||
      i === 1 ||
      i === totalPages - 2 ||
      i === totalPages - 1 ||
      Math.abs(i - current) <= 2
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {problems?.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
      <div className="flex flex-row justify-center gap-3">
        {pageNumbers.map((page, id) => (
          <div key={page}>
            {id > 0 && pageNumbers[id - 1] + 1 !== page && (
              <span className="text-gray-500">...</span>
            )}
            <button
              onClick={() => changePage(page)}
              className={
                "w-12 border hover:bg-c1 hover:text-white" +
                (page === current ? " bg-c2 text-white" : "")
              }
            >
              {page + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
