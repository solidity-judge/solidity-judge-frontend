import Pagination from "components/Pagination/Pagination";
import { ContestPreview } from "types/Contest";
import ContestCard from "./ContestCard";

export default function ContestList({
  contests,
  total,
  current,
  changePage,
}: {
  contests: ContestPreview[];
  total: number;
  current: number;
  changePage: (page: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {contests?.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
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
