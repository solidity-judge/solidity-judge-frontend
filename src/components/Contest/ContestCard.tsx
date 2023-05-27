import { useNavigate } from "react-router-dom";
import { ContestPreview } from "types/Contest";

export default function ContestCard({ contest }: { contest: ContestPreview }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contests/${contest.id}`);
  };

  return (
    <div
      className={
        "flex flex-row gap-3 rounded-md border p-3 hover:cursor-pointer"
      }
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center">
        <div className="w-6 text-center font-medium">{contest.id}</div>
      </div>
      <div className={"border-l"}></div>
      <div>
        <div className="font-medium">{contest.title}</div>
      </div>
    </div>
  );
}
