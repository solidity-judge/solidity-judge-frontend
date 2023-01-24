import ProblemCard from "components/Problem/ProblemCard";
import { ProblemPreviewList } from "types/Problem";

export default function ProblemList({ problemsList }: { problemsList: ProblemPreviewList }) {
  return (
    <div className="flex flex-col gap-3">
      {problemsList.problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
