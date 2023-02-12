import Pagination from "components/Pagination/Pagination";
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
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {problems?.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
      <Pagination
        totalItems={total}
        currentPage={current}
        onSelectPage={changePage}
      />
    </div>
  );
}
