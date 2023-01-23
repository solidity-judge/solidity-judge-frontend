import SolvedFilter from "components/Filter/SolvedFilter";
import ProblemList from "components/Problem/ProblemList";
import { Problem } from "types/Problem";

export default function ProblemsPage() {
  return (
    <div className="flex flex-row grow gap-3">
      <div className="flex flex-col grow-[3]">
        <ProblemList problems={problems} />
      </div>
      <div className="flex flex-col grow max-w-sm">
        <SolvedFilter />
      </div>
    </div>
  );
}

const problems = [
  {
    id: "1A",
    title: "Watermelon",
  },
  {
    id: "1B",
    title: "Excel",
  },
  {
    id: "1C",
    title: "Theatre Square",
  },
] as Problem[];
