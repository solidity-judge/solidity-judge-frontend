import { useNavigate } from "react-router-dom";

import type { Problem } from "types/Problem";

import { useAppDispatch } from "redux/hooks";
import { setSelectedPage } from "redux/slices/selectedPage";
import { setLastProblem } from "redux/slices/lastProblem";

export default function ProblemCard({ problem }: { problem: Problem }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      setLastProblem({
        id: problem.id,
        name: problem.title,
        href: `/problems/${problem.id}`,
      })
    );
    dispatch(
      setSelectedPage({
        id: problem.id,
        name: problem.id + " - " + problem.title,
      })
    );
    navigate(`/problems/${problem.id}`);
  };

  return (
    <div
      className="flex flex-row gap-3 border rounded-md p-3 hover:bg-indigo-700 hover:text-white hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="font-medium">{problem.id}</div>
      <div className="border-l"></div>
      <div className="font-medium">{problem.title}</div>
    </div>
  );
}
