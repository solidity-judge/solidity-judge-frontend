import { useNavigate } from "react-router-dom";

import type { ProblemPreview } from "types/Problem";

export default function ProblemCard({ problem }: { problem: ProblemPreview }) {
  const navigate = useNavigate();

  const handleClick = () => {
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
