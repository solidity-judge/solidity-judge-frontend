import type { Problem } from "types/Problem";
import ProblemCard from "components/Problem/ProblemCard";

export default function ProblemList({ problems }: { problems: Problem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
