import Pagination from "components/Pagination/Pagination";
import { SubmissionPreview } from "types/Submission";
import SubmissionCard from "./SubmissionCard";

export default function SubmissionList({
  submissions,
  total,
  current,
  changePage,
}: {
  submissions: SubmissionPreview[];
  total: number;
  current: number;
  changePage: (page: number) => void;
}) {
  return (
    <div className="flex grow flex-col gap-3">
      <div className="flex grow flex-col gap-3">
        {submissions.map((submission, idx) => (
          <SubmissionCard key={idx} submission={submission} />
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
