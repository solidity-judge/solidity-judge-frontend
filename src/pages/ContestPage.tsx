import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "redux/hooks";
import { ProblemPreview } from "types/Problem";
import { getContestProblems } from "api/problems";
import ProblemCard from "components/Problem/ProblemCard";
import { setSelectedPage } from "redux/slices/selectedPage";

export default function ProblemPage() {
  const [problems, setProblems] = React.useState<ProblemPreview[]>([]);

  const dispatch = useAppDispatch();
  const params = useParams();
  const contestId = parseInt(params.contestId ? params.contestId : "0");

  useEffect(() => {
    const problems = getContestProblems(contestId);
    problems.then((data) => {
      setProblems(data.problems);
      dispatch(
        setSelectedPage({
          id: contestId.toString(),
          name: "Contest problems",
        })
      );
    });
  }, [dispatch, contestId]);

  return (
    <div className="flex grow flex-col gap-3 border-t pt-3">
      <div className="flex grow-[3] flex-col">
        <div className="flex flex-col gap-3">
          {problems?.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
}
