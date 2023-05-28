import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContestPreview } from "types/Contest";

export default function ContestCard({ contest }: { contest: ContestPreview }) {
  const navigate = useNavigate();
  const deadline = contest.deadline;
  const deadlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (deadlineRef.current) {
      const interval = setInterval(() => {
        const secondsRemaining = deadline - Math.floor(Date.now() / 1000);
        const days = Math.floor(secondsRemaining / (3600 * 24));
        const hours = Math.floor((secondsRemaining - days * 3600 * 24) / 3600);
        const minutes = Math.floor(
          (secondsRemaining - days * 3600 * 24 - hours * 3600) / 60
        );
        const seconds = secondsRemaining % 60;
        deadlineRef.current!.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);
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
      <div className="ml-auto flex flex-col justify-center">
        <span className="text-sm font-medium" ref={deadlineRef}></span>
      </div>
    </div>
  );
}
