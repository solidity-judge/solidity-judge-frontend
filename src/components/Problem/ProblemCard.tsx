import Badge from "components/Badge/Badge";
import { useNavigate } from "react-router-dom";

import type { ProblemPreview } from "types/Problem";

export default function ProblemCard({ problem }: { problem: ProblemPreview }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/problems/${problem.id}`);
  };

  return (
    <div
      className={
        "flex flex-row gap-3 rounded-md border p-3 hover:cursor-pointer" +
        (problem.solved
          ? " border-gray-500 bg-c1"
          : " hover:bg-c2 hover:text-white")
      }
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center">
        <div className="w-6 text-center font-medium">{problem.id}</div>
      </div>
      <div
        className={"border-l" + (problem.solved ? " border-gray-500" : "")}
      ></div>
      <div>
        <div className="font-medium">{problem.title}</div>
        {problem.categories.map((category) => (
          <Badge text={category.name} />
        ))}
      </div>

      {problem.solved && (
        <div className="ml-auto flex flex-col justify-center">
          <span className="text-sm font-medium">Solved</span>
        </div>
      )}
    </div>
  );
}
